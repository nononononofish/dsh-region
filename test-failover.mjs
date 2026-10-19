// dsh-region 主源故障自动切换实测（主源指向不可用地址，验证自动切到备用源）
import { tmpdir } from 'node:os'
import { join } from 'node:path'

process.env.DSH_HOME = join(tmpdir(), 'dsh-region-failover-test')

const mod = await import(new URL('./lib/index.js', import.meta.url).href)
const apply = mod.default ?? mod.apply

const ctx = {
  provide: (n, v) => { globalThis.__region = v },
  effect: (fn) => fn(),
  commands: { register: () => {} },
}

// 主源故意配成不可用地址
apply(ctx, { mode: 'auto', mainRegistry: 'http://127.0.0.1:9' })
const s = globalThis.__region

await new Promise((r) => setTimeout(r, 3000))
const st = s.status()
console.log('== 主源故障时的 auto 模式 ==')
console.log('生效源:', st.appliedRegistry)
console.log('最近错误:', st.lastError)
console.log('最近日志:', JSON.stringify(st.recentLog.slice(-3), null, 2))

let ok1 = st.appliedRegistry === 'https://registry.npmjs.org'
if (ok1) {
  console.log('\n✅ 自动切换成功：主源不可用 → 自动切到官方备用源')
} else {
  console.log('\n❌ 未自动切换，生效源为:', st.appliedRegistry)
}

// ---- 场景二：主源、备源双双不可用 → 应保持现状(keep)，不崩溃，且记录错误 ----
process.env.DSH_HOME = join(tmpdir(), 'dsh-region-failover-both')
const ctx2 = {
  provide: (n, v) => { globalThis.__region = v },
  effect: (fn) => fn(),
  commands: { register: () => {} },
}
apply(ctx2, { mode: 'auto', mainRegistry: 'http://127.0.0.1:9', backupRegistry: 'http://127.0.0.1:8' })
const s2 = globalThis.__region
await new Promise((r) => setTimeout(r, 2000))
const st2 = s2.status()
console.log('\n== 双源皆不可用时的 auto 模式 ==')
console.log('生效源:', st2.appliedRegistry)
console.log('最近错误:', st2.lastError)
const ok2 = st2.appliedRegistry === null && !!st2.lastError
if (ok2) {
  console.log('✅ 双源皆失败 → 保持现状(不写 .npmrc)、记录错误、未崩溃')
} else {
  console.log('❌ 双源皆失败场景异常：appliedRegistry=', st2.appliedRegistry, 'lastError=', st2.lastError)
}

s2.stop?.()
s.stop?.()
process.exit(ok1 && ok2 ? 0 : 1)
