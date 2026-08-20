/**
 * host-api —— client 与 host 端 RegionService 的 HTTP 通信。
 * 走相对路径（同源），由 DSH web server 转发到插件路由。
 */

export interface ProbeResult {
  ok: boolean
  ms: number
  error?: string
}

export interface RegionStatus {
  mode: 'auto' | 'main' | 'backup'
  appliedRegistry: string | null
  mainRegistry: string
  backupRegistry: string
  lastError: string | null
  lastSwitchAt: string | null
  menuVisible: boolean
  main: ProbeResult | null
  backup: ProbeResult | null
}

export interface UseResult {
  ok: boolean
  message: string
}

// 用 location.origin 拼绝对 URL：DSH 页面环境下相对路径 fetch 会挂起（实测），
// 绝对 URL 正常。origin 动态获取，DSH 换端口也适配。
const BASE = `${window.location.origin}/dsh-region`

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'content-type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }
  return (await res.json()) as T
}

/** 拉取状态。probe=true 时 server 实时探测双源（菜单「立即测速」）；默认返回缓存，秒回。 */
export function fetchStatus(probe = false): Promise<RegionStatus> {
  return requestJson<RegionStatus>(`/status${probe ? '?probe=1' : ''}`)
}

/** 切换模式 auto|main|backup。 */
export function requestMode(mode: 'auto' | 'main' | 'backup'): Promise<UseResult> {
  return requestJson<UseResult>('/use', {
    method: 'POST',
    body: JSON.stringify({ mode }),
  })
}

/** 设置右上角菜单显隐。 */
export function requestMenuVisible(visible: boolean): Promise<{ ok: boolean; visible: boolean }> {
  return requestJson('/menu', {
    method: 'POST',
    body: JSON.stringify({ visible }),
  })
}
