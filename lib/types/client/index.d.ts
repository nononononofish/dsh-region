/**
 * dsh-region client 类型声明（手写，与 src/client/host-api.ts 实现精确对应）。
 *
 * 背景：package.json exports 的 "./client" 声明了 types 指向本文件，
 * 但构建脚本（build-client.mjs）用 esbuild 打包、tsconfig exclude 了 src/client，
 * 导致 lib/types/client/index.d.ts 一直未产出 —— 类型断链。
 * 本文件为人工补齐，保证外部 TS 工程 import 'dsh-region/client' 能正确解析类型。
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

/** 拉取状态。probe=true 时 server 实时探测双源；默认返回缓存，秒回。 */
export function fetchStatus(probe?: boolean): Promise<RegionStatus>

/** 切换模式 auto|main|backup。 */
export function requestMode(mode: 'auto' | 'main' | 'backup'): Promise<UseResult>

/** 设置右上角菜单显隐。 */
export function requestMenuVisible(visible: boolean): Promise<{ ok: boolean; visible: boolean }>