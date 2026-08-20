/**
 * settings-card —— 设置页「dsh-region 源管理」卡片。
 * 提供右上角菜单的显示/隐藏胶囊开关，状态存 server（region.json）。
 * React 组件（host 提供 react，bundle 外置）。
 */

import { createElement as h, useEffect, useState, type ReactNode } from 'react'
import { fetchStatus, requestMenuVisible } from './host-api.js'
import { zh } from './locales.js'

/** 通知 header 菜单重新评估显隐（window 事件，解耦 React 与 DOM 注入）。 */
export function dispatchVisibilityChanged(): void {
  window.dispatchEvent(new CustomEvent('dshr:visibility-changed'))
}

interface CardProps {
  t?: (key: string) => string
}

function CardShell(props: {
  title: string
  description: string
  children: ReactNode
}): ReactNode {
  return h('div', { style: { padding: '12px 0' } },
    h('div', { style: { fontWeight: 600, fontSize: 14, marginBottom: 4 } }, props.title),
    h('div', { style: { color: 'var(--color-text-secondary,#8b949e)', fontSize: 12, marginBottom: 10 } }, props.description),
    props.children,
  )
}

export function RegionSettingsCard(_props: CardProps): ReactNode {
  const [visible, setVisible] = useState<boolean | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    fetchStatus()
      .then((s) => {
        if (alive) setVisible(s.menuVisible !== false)
      })
      .catch(() => {
        if (alive) setVisible(true)
      })
    return () => {
      alive = false
    }
  }, [])

  const toggle = (): void => {
    if (visible === null || busy) return
    const next = !visible
    setBusy(true)
    setErr(null)
    requestMenuVisible(next)
      .then(() => {
        setVisible(next)
        dispatchVisibilityChanged()
      })
      .catch((e: unknown) => setErr(e instanceof Error ? e.message : String(e)))
      .finally(() => setBusy(false))
  }

  const capsule = h(
    'button',
    {
      onClick: toggle,
      disabled: visible === null || busy,
      style: {
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 14px', borderRadius: 999, fontSize: 13, cursor: 'pointer',
        border: '1px solid var(--color-border-default,rgba(240,246,252,.2))',
        background: visible ? 'rgba(63,185,80,.15)' : 'transparent',
        color: visible ? '#3fb950' : 'var(--color-text-secondary,#8b949e)',
        fontWeight: 600,
      },
      'aria-pressed': String(visible === true),
    },
    h('span', {
      style: { width: 8, height: 8, borderRadius: '50%', background: 'currentColor', display: 'inline-block' },
    }),
    visible ? zh['card.show'] : zh['card.hide'],
  )

  return CardShell({
    title: zh['card.title'],
    description: zh['card.description'],
    children: h('div', { style: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' } },
      h('div', { style: { fontSize: 13 } },
        zh['card.menuVisible'],
        h('div', { style: { color: 'var(--color-text-tertiary,#6e7681)', fontSize: 12 } }, zh['card.menuVisibleDesc']),
      ),
      capsule,
      err ? h('span', { style: { color: '#f85149', fontSize: 12 } }, err) : null,
    ),
  })
}
