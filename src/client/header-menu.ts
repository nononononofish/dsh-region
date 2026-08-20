/**
 * header-menu —— 右上角「下载 Log」左侧的源管理下拉菜单。
 *
 * 纯 DOM 注入（不挂 React 树），模仿 linxin666/dsh-web-ui 的 sidebar-entry 模式：
 *  - 定位锚点：Session log 按钮（class 含 sessionLog，或文本匹配），在其前插入
 *  - 自愈：MutationObserver 监听，React 重渲染移除后自动重插
 *  - 状态灯：绿/黄/红 + tooltip 说明
 *  - 菜单项带探测耗时，切换调 host API
 *  - 显隐由 server 端 region.json 控制（menuVisible=false 时整个按钮不渲染）
 *
 * 铁律：任何 DOM 操作失败只 console.warn，绝不 throw（不能拖垮 DSH 启动）。
 */

import { fetchStatus, requestMode, type RegionStatus } from './host-api.js'
import { zh } from './locales.js'

export const ENTRY_SELECTOR = '[data-dsh-region-entry]'

const CSS = `
.dshr-entry{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;margin:0 2px;padding:0;border:none;border-radius:6px;background:transparent;color:var(--color-text-secondary,#8b949e);cursor:pointer;position:relative}
.dshr-entry:hover{background:color-mix(in srgb,currentColor 12%,transparent)}
.dshr-entry .dshr-dot{position:absolute;top:4px;right:4px;width:7px;height:7px;border-radius:50%;border:1.5px solid var(--color-bg-primary,#0d1117)}
.dshr-dot.green{background:#3fb950}.dshr-dot.yellow{background:#d29922}.dshr-dot.red{background:#f85149}.dshr-dot.gray{background:#8b949e}
.dshr-menu{position:fixed;z-index:9999;min-width:230px;padding:6px;border-radius:10px;background:var(--color-bg-elevated,#161b22);border:1px solid var(--color-border-default,rgba(240,246,252,.12));box-shadow:0 8px 24px rgba(1,4,9,.4);font-size:13px;color:var(--color-text-primary,#e6edf3);animation:dshrIn .12s ease-out}
@keyframes dshrIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.dshr-menu-head{display:flex;align-items:center;gap:8px;padding:6px 8px 8px;font-weight:600;border-bottom:1px solid var(--color-border-default,rgba(240,246,252,.1));cursor:help}
.dshr-menu-head .dshr-hdot{width:8px;height:8px;border-radius:50%;flex:none}
.dshr-item{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;padding:7px 8px;border:none;border-radius:7px;background:transparent;color:inherit;font-size:13px;cursor:pointer;text-align:left}
.dshr-item:hover{background:color-mix(in srgb,currentColor 10%,transparent)}
.dshr-item .dshr-ms{color:var(--color-text-tertiary,#6e7681);font-size:12px;font-variant-numeric:tabular-nums}
.dshr-item .dshr-cur{color:#3fb950;font-size:11px;margin-left:4px}
.dshr-sep{height:1px;margin:5px 6px;background:var(--color-border-default,rgba(240,246,252,.08))}
.dshr-probe{justify-content:center;color:var(--color-text-secondary,#8b949e)}
.dshr-probe:hover{color:var(--color-text-primary,#e6edf3)}
`

interface HeaderMenuOptions {
  /** 外部通知状态刷新（设置页胶囊需要）。 */
  onMenuVisibleChange?: (visible: boolean) => void
}

/** 定位 Session log 按钮（稳定锚点：class 含 sessionLog 或文本匹配）。 */
export function findLogButton(): HTMLButtonElement | null {
  const all = Array.from(document.querySelectorAll<HTMLButtonElement>('button'))
  return (
    all.find((b) => /sessionLog/i.test(b.className)) ??
    all.find((b) => {
      const span = b.querySelector('span')
      return !!span && /session\s*log|下载.*日志/i.test(span.textContent ?? '')
    }) ??
    null
  )
}

function styleTag(): HTMLStyleElement {
  const existing = document.getElementById('dshr-style') as HTMLStyleElement | null
  if (existing) return existing
  const style = document.createElement('style')
  style.id = 'dshr-style'
  style.textContent = CSS
  document.head.appendChild(style)
  return style
}

function statusDotClass(status: RegionStatus): 'green' | 'yellow' | 'red' | 'gray' {
  const { main, backup } = status
  if (!main || !backup) return 'gray'
  if (main.ok && backup.ok) return 'green'
  if (main.ok !== backup.ok) return 'yellow'
  return main.ok ? 'gray' : 'red'
}

function statusHint(status: RegionStatus): string {
  const { main, backup } = status
  if (!main || !backup) return zh['menu.statusUnknown']
  if (main.ok && backup.ok) return zh['menu.statusGreen']
  if (!main.ok && backup.ok) return zh['menu.statusYellow']
  if (!main.ok && !backup.ok) return zh['menu.statusRed']
  return zh['menu.statusUnknown']
}

const ICON = '<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="8" cy="4" rx="4" ry="1.8"/><path d="M4 4v4c0 1 1.8 1.8 4 1.8s4-.8 4-1.8V4"/><path d="M4 8v4c0 1 1.8 1.8 4 1.8s4-.8 4-1.8V8"/></svg>'

/**
 * 挂载右上角菜单，返回 disposer。
 * 幂等：重复调用先清理旧实例再重建。
 */
export function mountHeaderMenu(options: HeaderMenuOptions = {}): () => void {
  styleTag()
  let disposed = false
  let observer: MutationObserver | null = null
  let menuEl: HTMLDivElement | null = null
  let entryEl: HTMLButtonElement | null = null
  let latest: RegionStatus | null = null

  const cleanupMenu = (): void => {
    menuEl?.remove()
    menuEl = null
  }

  const closeMenu = (): void => cleanupMenu()

  const renderMenu = async (): Promise<void> => {
    if (disposed) return
    cleanupMenu()
    let status: RegionStatus
    try {
      status = await fetchStatus(false)
    } catch {
      // 服务不可达：菜单里直接提示
      status = {
        mode: 'auto', appliedRegistry: null, mainRegistry: '', backupRegistry: '',
        lastError: zh['err.fetchFailed'], lastSwitchAt: null, menuVisible: true,
        main: { ok: false, ms: 0, error: zh['err.fetchFailed'] },
        backup: { ok: false, ms: 0, error: zh['err.fetchFailed'] },
      }
    }
    latest = status
    if (!entryEl) return
    try {
      const rect = entryEl.getBoundingClientRect()

    const dot = statusDotClass(status)
    const items = (
      [
        { key: 'auto', label: zh['menu.auto'], cmd: 'auto' },
        { key: 'main', label: zh['menu.main'], cmd: 'main' },
        { key: 'backup', label: zh['menu.backup'], cmd: 'backup' },
      ] as const
    )

    const root = document.createElement('div')
    root.className = 'dshr-menu'
    root.style.left = `${Math.max(8, rect.right - 240)}px`
    root.style.top = `${rect.bottom + 6}px`
    root.setAttribute('role', 'menu')

    const head = document.createElement('div')
    head.className = 'dshr-menu-head'
    head.title = statusHint(status)
    const hdot = document.createElement('span')
    hdot.className = `dshr-hdot ${dot}`
    head.appendChild(hdot)
    head.appendChild(document.createTextNode(zh['menu.title']))
    root.appendChild(head)

    for (const item of items) {
      const btn = document.createElement('button')
      btn.className = 'dshr-item'
      btn.setAttribute('role', 'menuitem')
      const left = document.createElement('span')
      const isCurrent = status.mode === item.cmd
      left.textContent = `${item.label}（${item.cmd}）`
      if (isCurrent) {
        const cur = document.createElement('span')
        cur.className = 'dshr-cur'
        cur.textContent = `✓${zh['menu.current']}`
        left.appendChild(cur)
      }
      btn.appendChild(left)
      const ms = document.createElement('span')
      ms.className = 'dshr-ms'
      const probeResult = item.cmd === 'main' ? status.main : item.cmd === 'backup' ? status.backup : null
      ms.textContent = probeResult ? `${probeResult.ms}ms` : '--'
      btn.appendChild(ms)
      btn.addEventListener('click', () => {
        void requestMode(item.cmd)
        void renderMenu()
      })
      root.appendChild(btn)
    }

    const sep = document.createElement('div')
    sep.className = 'dshr-sep'
    root.appendChild(sep)

    const probe = document.createElement('button')
    probe.className = 'dshr-item dshr-probe'
    probe.textContent = `↻ ${zh['menu.probe']}`
    probe.addEventListener('click', () => {
      // 立即测速：实时探测双源（可能数秒），完成后刷新菜单。
      void fetchStatus(true).then(() => renderMenu())
    })
    root.appendChild(probe)

    document.body.appendChild(root)
    menuEl = root
    } catch (error) {
      // 渲染失败只记日志，绝不抛（外部插件不能拖垮 DSH）。
      console.error('[dsh-region] menu render failed:', error)
    }
  }

  const buildEntry = (): HTMLButtonElement => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'dshr-entry'
    btn.setAttribute('data-dsh-region-entry', '')
    btn.setAttribute('aria-label', zh['menu.title'])
    btn.innerHTML = ICON
    const dot = document.createElement('span')
    dot.className = 'dshr-dot gray'
    btn.appendChild(dot)
    btn.addEventListener('click', (event) => {
      event.stopPropagation()
      if (menuEl) closeMenu()
      else void renderMenu()
    })
    return btn
  }

  // 防抖锁：MutationObserver 高频触发时合并请求，避免并发打爆 server 探测。
  let ensureLock = false
  const ensureEntry = (): void => {
    if (disposed || ensureLock) return
    ensureLock = true
    // 菜单显隐受 server 状态控制；查询失败时保守显示（默认显示）。
    void fetchStatus(false)
      .then((status) => {
        if (disposed) return
        latest = status
        const targetVisible = status.menuVisible !== false
        const anchor = findLogButton()
        const container = anchor?.parentElement
        if (!anchor || !container) return
        const existing = container.querySelector<HTMLButtonElement>(ENTRY_SELECTOR)
        if (!targetVisible) {
          existing?.remove()
          cleanupMenu()
          options.onMenuVisibleChange?.(false)
          return
        }
        if (existing && existing.parentElement === container) {
          entryEl = existing
          return
        }
        const btn = buildEntry()
        btn.classList.add('dshr-entry')
        // 状态灯初始色
        const dot = btn.querySelector('.dshr-dot')
        if (dot) dot.classList.add(statusDotClass(status))
        container.insertBefore(btn, anchor)
        entryEl = btn
        options.onMenuVisibleChange?.(true)
      })
      .catch(() => {
        // 状态获取失败：仍显示入口（保守策略），灰灯。
        if (disposed) return
        const anchor = findLogButton()
        const container = anchor?.parentElement
        if (!anchor || !container) return
        const existing = container.querySelector<HTMLButtonElement>(ENTRY_SELECTOR)
        if (existing) {
          entryEl = existing
          return
        }
        entryEl = buildEntry()
        container.insertBefore(entryEl, anchor)
      })
      .finally(() => {
        ensureLock = false
      })
  }

  // 自愈：监听 DOM，入口被移除后重插。
  observer = new MutationObserver(() => {
    const container = findLogButton()?.parentElement
    if (!container) return
    const stillThere = container.querySelector(ENTRY_SELECTOR)
    if (!stillThere) ensureEntry()
  })
  observer.observe(document.body, { childList: true, subtree: true })

  // 点击菜单外部关闭
  const onDocClick = (event: MouseEvent): void => {
    if (menuEl && !menuEl.contains(event.target as Node) && !entryEl?.contains(event.target as Node)) {
      closeMenu()
    }
  }
  const onKey = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') closeMenu()
  }
  document.addEventListener('click', onDocClick, true)
  document.addEventListener('keydown', onKey, true)

  // 设置页胶囊切换后，重新评估菜单显隐。
  const onVisibilityEvent = (): void => ensureEntry()
  window.addEventListener('dshr:visibility-changed', onVisibilityEvent)

  // 首次挂载（可能 shell 还没渲染完，轮询几次）
  let attempts = 0
  const tryMount = (): void => {
    ensureEntry()
    if (!document.querySelector(ENTRY_SELECTOR) && attempts < 20) {
      attempts += 1
      setTimeout(tryMount, 500)
    }
  }
  tryMount()

  return () => {
    disposed = true
    observer?.disconnect()
    document.removeEventListener('click', onDocClick, true)
    document.removeEventListener('keydown', onKey, true)
    window.removeEventListener('dshr:visibility-changed', onVisibilityEvent)
    entryEl?.remove()
    cleanupMenu()
  }
}
