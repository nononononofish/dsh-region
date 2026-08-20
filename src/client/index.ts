/**
 * dsh-region client bundle 入口。
 *
 * 挂载两处 UI：
 *  1. 右上角源管理菜单（纯 DOM 注入，见 header-menu.ts）
 *  2. 设置页「dsh-region 源管理」卡片（React，官方 settings.plugin.item 槽位，
 *     嵌套 inject settingsScope——旧 host 无此服务时卡片静默不出现）
 *
 * 铁律：任何挂载失败只 console.warn，绝不 throw（外部插件不能拖垮 DSH 启动）。
 */

import { createElement as h } from 'react'
import { mountHeaderMenu } from './header-menu.js'
import { RegionSettingsCard, dispatchVisibilityChanged } from './settings-card.js'

export const name = 'dsh-region'

/** 声明需要的 client 服务：slots（UI 注入核心）、settingsScope（设置页卡片）。 */
export const inject = ['slots', 'settingsScope']

/** 防重复：同一页面生命周期内只应用一次。 */
let applied = false

interface ClientCtx {
  inject?(deps: string[], cb: (scoped: Record<string, unknown>) => void): void
  slots?: {
    inject?(slot: string, register: () => unknown): void
    register?(meta: Record<string, unknown>, component: () => unknown): unknown
  }
  effect?(fn: () => unknown, label: string): unknown
}

export function apply(ctx: ClientCtx): void {
  if (applied) return
  applied = true

  // 菜单显隐由 server 状态驱动；设置页胶囊切换后经 window 事件通知重评估。
  window.addEventListener('dshr:visibility-changed', () => {
    // header-menu 内部已监听同名事件做 ensureEntry；此处仅兜底触发一次。
    void 0
  })

  try {
    mountHeaderMenu({
      onMenuVisibleChange: () => dispatchVisibilityChanged(),
    })
  } catch (error) {
    console.warn('[dsh-region] header menu mount failed:', error)
  }

  // 设置页卡片：用 ctx.slots（inject 声明后可用）注册到官方 settings.plugin.item 槽位。
  // 注：当前 DSH 版本的设置 UI 未渲染该槽位，卡片暂不可见；代码保留，槽位兼容后自动出现。
  if (ctx.slots?.inject && ctx.slots.register) {
    try {
      ctx.slots.inject('settings.plugin.item', () =>
        ctx.slots.register!(
          {
            name: 'settings.plugin.item',
            key: 'region',
            locale: 'dsh-region',
            inject: () => ({}),
          },
          () => h(RegionSettingsCard, {}),
        ),
      )
    } catch (error) {
      console.warn('[dsh-region] settings card register failed:', error)
    }
  }
}
