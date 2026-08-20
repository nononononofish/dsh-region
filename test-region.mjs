// dsh-region 核心逻辑独立实测（DSH_HOME 指向临时目录，不影响真实配置）
import { tmpdir } from 'node:os'
import { join } from 'node:path'

process.env.DSH_HOME = join(tmpdir(), 'dsh-region-test')

const mod = await import(new URL('./lib/index.js', import.meta.url).href)
const apply = mod.default ?? mod.apply

const commands = []
const ctx = {
  provide: (n, v) => { globalThis.__region = v },
  effect: (fn) => fn(),
  commands: { register: (c) => commands.push(c) },
}

apply(ctx, {})
const s = globalThis.__region

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

console.log('== 启动后 status ==')
console.log(JSON.stringify(s.status(), null, 2))

await wait(2000)
console.log('== auto 模式同步后（应自动写入 .npmrc） ==')
console.log('status:', JSON.stringify(s.status(), null, 2))

console.log('== probe 两源 ==')
console.log(JSON.stringify(await s.probe(), null, 2))

console.log('== 手动切 main ==')
console.log(s.setMode('main'))
await wait(800)
console.log('status:', JSON.stringify(s.status(), null, 2))

console.log('== 手动切 backup ==')
console.log(s.setMode('backup'))
await wait(800)
console.log('status:', JSON.stringify(s.status(), null, 2))

console.log('== 切回 auto ==')
console.log(s.setMode('auto'))
await wait(2500)
console.log('status:', JSON.stringify(s.status(), null, 2))

console.log('== 命令注册 ==')
console.log(commands.map((c) => c.name).join(', '))

s.stop?.()
process.exit(0)
