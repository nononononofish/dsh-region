// dsh-region .npmrc 写入行为实测（证据 + 回归测试）
//
// 覆盖两件事：
//  1. 切换模式会把生效源写入 profile 的 .npmrc；
//  2. 写入只增改 registry= 行，绝不抹掉 .npmrc 中其它配置
//     （proxy= / _authToken / scope registry 等属于用户或其它插件的资产，
//      早期整文件覆写会静默丢失，且不可逆）。
//
// 另外验证多 profile 同时写入：desktop（桌面端实际使用）与 web 都要生效。
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

const HOME = join(tmpdir(), 'dsh-region-npmrc-test')
rmSync(HOME, { recursive: true, force: true })
mkdirSync(HOME, { recursive: true })
process.env.DSH_HOME = HOME

// 预置一个"用户/其它插件"已写入的 .npmrc：含代理 + 旧 registry
const webNpmrc = join(HOME, 'profiles', 'web', '.npmrc')
const desktopNpmrc = join(HOME, 'profiles', 'desktop', '.npmrc')
mkdirSync(join(HOME, 'profiles', 'web'), { recursive: true })
const PREEXISTING = [
  '# 用户原有配置（代理）',
  'proxy=http://127.0.0.1:7890',
  'registry=https://old.example.com',
  '',
].join('\n')
writeFileSync(webNpmrc, PREEXISTING, 'utf8')

const mod = await import(new URL('./lib/index.js', import.meta.url).href)
const apply = mod.default ?? mod.apply
const ctx = {
  provide: (n, v) => {
    globalThis.__region = v
  },
  effect: (fn) => fn(),
  commands: { register: () => {} },
}
apply(ctx, {})
const s = globalThis.__region

await new Promise((r) => setTimeout(r, 300))
console.log('== 切到 main（国内镜像）后写入 .npmrc ==')
s.setMode('main')
await new Promise((r) => setTimeout(r, 300))

const afterWeb = readFileSync(webNpmrc, 'utf8')
console.log('--- web profile .npmrc ---')
console.log(afterWeb)
console.log('-------------------------')
const afterDesktop = existsSync(desktopNpmrc) ? readFileSync(desktopNpmrc, 'utf8') : ''
console.log('--- desktop profile .npmrc ---')
console.log(afterDesktop || '(未创建)')
console.log('-----------------------------')

const checks = [
  ['生效源已写入 web .npmrc', afterWeb.includes('registry=https://registry.npmmirror.com')],
  ['生效源已写入 desktop .npmrc', afterDesktop.includes('registry=https://registry.npmmirror.com')],
  ['🔴 proxy= 行未被抹掉', afterWeb.includes('proxy=http://127.0.0.1:7890')],
  ['🔴 用户注释未被抹掉', afterWeb.includes('# 用户原有配置（代理）')],
  ['旧 registry 被替换（未留两行）', !afterWeb.includes('registry=https://old.example.com')],
  ['registry 行只有一条', (afterWeb.match(/^\s*registry\s*=/gm) ?? []).length === 1],
]

let ok = true
for (const [label, pass] of checks) {
  if (pass) {
    console.log(`  ✅ ${label}`)
  } else {
    console.error(`  ❌ ${label}`)
    ok = false
  }
}
console.log(
  ok
    ? '\n✅ .npmrc 写入回归测试通过：只改 registry 行，其余配置完整保留'
    : '\n❌ .npmrc 写入回归测试失败',
)

s.stop?.()
process.exit(ok ? 0 : 1)
