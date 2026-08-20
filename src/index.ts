/**
 * dsh-region —— DSH 下载源主备切换插件
 *
 * 核心职责：
 *  - 维护下载源状态：auto（自动主备）/ main（锁定国内主源）/ backup（锁定国外备源）
 *  - 将当前生效源写入 web profile 的 .npmrc，使 dsh 原生命令（如 dsh plugin add）也走该源
 *  - auto 模式下定时探测主源健康：主源超时/失败自动切到备用源，主源恢复自动切回
 *  - 手动选择（/region use main|backup）持久化到 ~/.dsh/region.json，重启沿用
 *  - 提供 /region 命令与 'region' 服务（供 P1 Web UI 通过 RPC 调用）
 *  - 提供 HTTP 路由（/dsh-region/status|use|menu）供 Web UI client 调用
 *
 * 零运行时依赖：仅使用 Node 内置模块与全局 fetch。
 */

import { homedir } from 'node:os'
import { join } from 'node:path'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { registerRegionRoutes } from './http.js'

export const name = 'dsh-region'

/** Cordis 依赖注入声明：本插件需要 commands 服务注册 /region 命令 */
export const inject = ['commands']

export type RegionMode = 'auto' | 'main' | 'backup'

interface RegionConfig {
  mode: RegionMode
  /** 主源：国内镜像 */
  mainRegistry: string
  /** 备源：官方源 */
  backupRegistry: string
  /** 健康探测用的样本包（两个源上都长期存在的稳定小包） */
  probePackage: string
  /** 单次探测超时（毫秒） */
  timeoutMs: number
  /** auto 模式定时探测间隔（毫秒） */
  probeIntervalMs: number
}

const DEFAULT_CONFIG: RegionConfig = {
  mode: 'auto',
  mainRegistry: 'https://registry.npmmirror.com',
  backupRegistry: 'https://registry.npmjs.org',
  probePackage: 'is-number',
  timeoutMs: 10000,
  probeIntervalMs: 300000, // 5 分钟
}

interface RegionLogEntry {
  at: string
  message: string
}

interface RegionState {
  mode: RegionMode
  /** 最近一次成功应用的源 */
  appliedRegistry: string | null
  lastProbeAt: string | null
  lastSwitchAt: string | null
  lastError: string | null
  /** 右上角 Web UI 菜单是否显示 */
  menuVisible: boolean
  log: RegionLogEntry[]
}

function dshHome(): string {
  return process.env.DSH_HOME || join(homedir(), '.dsh')
}

function profileDir(): string {
  return join(dshHome(), 'profiles', 'web')
}

function npmrcPath(): string {
  return join(profileDir(), '.npmrc')
}

function statePath(): string {
  return join(dshHome(), 'region.json')
}

function defaultState(): RegionState {
  return {
    mode: 'auto',
    appliedRegistry: null,
    lastProbeAt: null,
    lastSwitchAt: null,
    lastError: null,
    menuVisible: true,
    log: [],
  }
}

function readState(): RegionState {
  try {
    const parsed = JSON.parse(readFileSync(statePath(), 'utf8')) as Partial<RegionState>
    return { ...defaultState(), ...parsed }
  } catch {
    return defaultState()
  }
}

function writeState(state: RegionState): void {
  try {
    mkdirSync(dshHome(), { recursive: true })
  } catch {
    /* 目录已存在时忽略 */
  }
  state.log = state.log.slice(-50)
  writeFileSync(statePath(), JSON.stringify(state, null, 2), 'utf8')
}

/** 读取 .npmrc 中当前 registry（无则返回 null） */
function readAppliedRegistry(): string | null {
  try {
    const raw = readFileSync(npmrcPath(), 'utf8')
    const m = raw.match(/^\s*registry\s*=\s*(\S+)/m)
    return m?.[1] ?? null
  } catch {
    return null
  }
}

/** 将指定源写入 web profile 的 .npmrc，让 dsh 原生 pnpm 调用生效 */
function applyRegistry(registry: string): void {
  try {
    mkdirSync(profileDir(), { recursive: true })
  } catch {
    /* 目录已存在时忽略 */
  }
  writeFileSync(
    npmrcPath(),
    `# 由 dsh-region 插件管理（主备源自动切换）\nregistry=${registry}\n`,
    'utf8',
  )
}

/** 探测一个 registry 的可达性：请求其元数据端点，超时由 AbortController 控制 */
async function probeRegistry(
  url: string,
  probePackage: string,
  timeoutMs: number,
): Promise<{ ok: boolean; ms: number; error?: string }> {
  const started = Date.now()
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(`${url.replace(/\/+$/, '')}/${probePackage}/latest`, {
      signal: controller.signal,
      redirect: 'follow',
    })
    const ms = Date.now() - started
    if (!res.ok) return { ok: false, ms, error: `HTTP ${res.status}` }
    return { ok: true, ms }
  } catch (error) {
    const ms = Date.now() - started
    const message =
      error instanceof Error
        ? error.name === 'AbortError'
          ? `超时(${timeoutMs}ms)`
          : error.message
        : String(error)
    return { ok: false, ms, error: message }
  } finally {
    clearTimeout(timer)
  }
}

class RegionService {
  private state: RegionState
  private timer: number | null = null
  private probing = false
  private lastProbe: {
    main: { ok: boolean; ms: number; error?: string }
    backup: { ok: boolean; ms: number; error?: string }
  } | null = null

  constructor(private readonly config: RegionConfig) {
    if (existsSync(statePath())) {
      this.state = readState()
    } else {
      // 首次运行：采用配置默认模式并初始化状态文件
      this.state = defaultState()
      this.state.mode = config.mode ?? 'auto'
      writeState(this.state)
    }
  }

  private log(message: string): void {
    this.state.log.push({ at: new Date().toISOString(), message })
    writeState(this.state)
  }

  status(): {
    mode: RegionMode
    appliedRegistry: string | null
    mainRegistry: string
    backupRegistry: string
    lastProbeAt: string | null
    lastSwitchAt: string | null
    lastError: string | null
    menuVisible: boolean
    recentLog: RegionLogEntry[]
  } {
    return {
      mode: this.state.mode,
      appliedRegistry: readAppliedRegistry(),
      mainRegistry: this.config.mainRegistry,
      backupRegistry: this.config.backupRegistry,
      lastProbeAt: this.state.lastProbeAt,
      lastSwitchAt: this.state.lastSwitchAt,
      lastError: this.state.lastError,
      menuVisible: this.state.menuVisible,
      recentLog: this.state.log.slice(-10),
    }
  }

  /** 手动切换模式（持久化）。auto=跟随健康自动主备，main/backup=锁定该源 */
  setMode(mode: RegionMode): { ok: boolean; message: string } {
    if (!['auto', 'main', 'backup'].includes(mode)) {
      return { ok: false, message: `非法模式：${mode}` }
    }
    this.state.mode = mode
    this.log(`手动切换模式：${mode}`)
    writeState(this.state)
    void this.sync()
    return { ok: true, message: `已切换为 ${mode} 模式` }
  }

  /** 设置右上角 Web UI 菜单显隐（持久化到 region.json） */
  setMenuVisible(visible: boolean): void {
    this.state.menuVisible = visible
    this.log(visible ? 'Web UI 菜单已显示' : 'Web UI 菜单已隐藏')
    writeState(this.state)
  }

  /** 仅探测两源健康并报告，不改变当前应用状态 */
  async probe(): Promise<{
    main: { ok: boolean; ms: number; error?: string }
    backup: { ok: boolean; ms: number; error?: string }
  }> {
    const [main, backup] = await Promise.all([
      probeRegistry(this.config.mainRegistry, this.config.probePackage, this.config.timeoutMs),
      probeRegistry(this.config.backupRegistry, this.config.probePackage, this.config.timeoutMs),
    ])
    this.state.lastProbeAt = new Date().toISOString()
    writeState(this.state)
    this.lastProbe = { main, backup }
    return { main, backup }
  }

  /** 最近一次探测结果（内存缓存，无则 null）。status 路由用，避免每次请求都实时探测。 */
  getLastProbe(): { main: { ok: boolean; ms: number; error?: string }; backup: { ok: boolean; ms: number; error?: string } } | null {
    return this.lastProbe
  }

  /**
   * 按当前模式同步生效源：
   *  - main/backup：锁定对应源
   *  - auto：探测主源，主源正常用主源；主源不可用则探测备源，备源正常自动切换；都不可用保持现状
   */
  async sync(): Promise<{ applied: 'main' | 'backup' | 'keep'; reason: string }> {
    if (this.state.mode === 'main') {
      this.applyLocked(this.config.mainRegistry, 'main')
      return { applied: 'main', reason: '手动锁定主源' }
    }
    if (this.state.mode === 'backup') {
      this.applyLocked(this.config.backupRegistry, 'backup')
      return { applied: 'backup', reason: '手动锁定备用源' }
    }
    if (this.probing) return { applied: 'keep', reason: '探测进行中' }
    this.probing = true
    try {
      const main = await probeRegistry(
        this.config.mainRegistry,
        this.config.probePackage,
        this.config.timeoutMs,
      )
      const backup = await probeRegistry(
        this.config.backupRegistry,
        this.config.probePackage,
        this.config.timeoutMs,
      )
      this.state.lastProbeAt = new Date().toISOString()
      this.state.lastError =
        main.ok || backup.ok ? null : `主源${main.error ?? ''}；备源${backup.error ?? ''}`
      const before = readAppliedRegistry()

      if (main.ok) {
        applyRegistry(this.config.mainRegistry)
        if (before !== this.config.mainRegistry) {
          this.state.lastSwitchAt = new Date().toISOString()
          this.log(`主源正常(${main.ms}ms)，应用国内镜像`)
        }
        writeState(this.state)
        return { applied: 'main', reason: `主源正常 ${main.ms}ms` }
      }
      if (backup.ok) {
        applyRegistry(this.config.backupRegistry)
        if (before !== this.config.backupRegistry) {
          this.state.lastSwitchAt = new Date().toISOString()
          this.log(`主源不可用(${main.error})，自动切到备用源(${backup.ms}ms)`)
        }
        writeState(this.state)
        return { applied: 'backup', reason: `主源失败(${main.error})，切备用源 ${backup.ms}ms` }
      }
      writeState(this.state)
      return { applied: 'keep', reason: `两源均不可用：主源${main.error}，备源${backup.error}` }
    } finally {
      this.probing = false
    }
  }

  private applyLocked(registry: string, label: 'main' | 'backup'): void {
    const before = readAppliedRegistry()
    applyRegistry(registry)
    if (before !== registry) {
      this.state.lastSwitchAt = new Date().toISOString()
      this.log(`应用${label === 'main' ? '主源' : '备用源'}：${registry}`)
      writeState(this.state)
    }
  }

  /** 启动：立即同步一次 + auto 模式下定时探测 */
  start(): void {
    void this.sync()
    this.timer = setInterval(() => {
      if (this.state.mode === 'auto') void this.sync()
    }, this.config.probeIntervalMs) as unknown as number
  }

  stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}

interface CommandInvocation {
  rawInput: string
  signal: AbortSignal
}

interface CommandResult {
  kind: 'success' | 'error'
  text: string
}

function registerCommand(
  commands: { register: (command: unknown) => unknown },
  service: RegionService,
): void {
  const exec = async (invocation: CommandInvocation): Promise<CommandResult> => {
    const raw = (invocation.rawInput ?? '').trim()
    const [verb, ...rest] = raw.split(/\s+/).filter(Boolean)
    const arg = rest.join(' ')

    try {
      switch (verb ?? '') {
        case '':
        case 'status': {
          const s = service.status()
          const lines = [
            `当前模式：${s.mode}`,
            `生效下载源：${s.appliedRegistry ?? '（尚未写入 .npmrc）'}`,
            `主源（国内镜像）：${s.mainRegistry}`,
            `备源（官方源）：${s.backupRegistry}`,
            s.lastProbeAt ? `上次探测：${s.lastProbeAt}` : '',
            s.lastSwitchAt ? `上次切换：${s.lastSwitchAt}` : '',
            s.lastError ? `最近错误：${s.lastError}` : '',
          ].filter(Boolean)
          return { kind: 'success', text: lines.join('\n') }
        }

        case 'use': {
          if (arg === '') return { kind: 'error', text: '用法：/region use <auto|main|backup>' }
          const result = service.setMode(arg as RegionMode)
          return result.ok
            ? { kind: 'success', text: result.message }
            : { kind: 'error', text: result.message }
        }

        case 'probe': {
          const { main, backup } = await service.probe()
          return {
            kind: 'success',
            text: [
              `主源（国内镜像）：${main.ok ? `✅ 正常 ${main.ms}ms` : `❌ ${main.error}（${main.ms}ms）`}`,
              `备源（官方源）：${backup.ok ? `✅ 正常 ${backup.ms}ms` : `❌ ${backup.error}（${backup.ms}ms）`}`,
            ].join('\n'),
          }
        }

        default:
          return { kind: 'error', text: `未知子命令：${verb}。用法：/region [status|use <auto|main|backup>|probe]` }
      }
    } catch (error) {
      return { kind: 'error', text: error instanceof Error ? error.message : String(error) }
    }
  }

  commands.register({
    name: 'region',
    description: '查看或切换下载源（国内镜像为主、官方源为备，超时自动切换）',
    input: { hint: '[status|use <auto|main|backup>|probe]' },
    handler: (invocation: CommandInvocation) => exec(invocation),
  })
}

export function apply(rawContext: unknown, config: Partial<RegionConfig> = {}): void {
  const ctx = rawContext as {
    provide: (name: string, value: unknown) => unknown
    effect: (fn: () => unknown, label: string) => unknown
    inject: (deps: string[], cb: (ctx: Record<string, unknown>) => void) => unknown
    commands?: { register: (command: unknown) => unknown }
  }
  const resolved: RegionConfig = { ...DEFAULT_CONFIG, ...config }
  const service = new RegionService(resolved)

  ctx.provide('region', service)
  ctx.effect(
    () => {
      service.start()
      return () => service.stop()
    },
    'dsh-region.scheduler',
  )

  if (ctx.commands) registerCommand(ctx.commands, service)

  // HTTP 路由（供 Web UI client 调用）。webServer 缺失时静默跳过，不拖垮启动。
  if (typeof ctx.inject === 'function') {
    ctx.inject(['webServer'], (hostCtx) => {
      const webServer = hostCtx['webServer'] as
        | { register: (route: unknown) => () => void }
        | undefined
      const hostEffect = hostCtx['effect'] as ((fn: () => unknown, label: string) => unknown) | undefined
      if (!webServer) return
      hostEffect?.(
        () => {
          const disposers = registerRegionRoutes(webServer as never, service)
          return () => disposers.forEach((dispose) => dispose())
        },
        'dsh-region.http-routes',
      )
    })
  }
}
// 注意：只提供具名导出，勿加 export default。
// dsh loader 的 unwrapExports 会优先取 exports.default 作为插件对象，
// 那样 inject/name 等具名导出会丢失，导致 "cannot get property X without inject"。
