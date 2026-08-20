/**
 * build-client.mjs —— 用 esbuild 打包 client bundle 到 lib/client.js。
 *
 * DSH loader 约定格式：window.__ModuleLoader__.load({ id, factory(require) })
 * esbuild 输出 CJS 内核（module.exports 由 factory 作用域提供），再包一层 loader。
 * react / @deepseek-ai/* 为 external（由 DSH host 提供，factory 的 require 接管）。
 */

import { build } from 'esbuild'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const result = await build({
  entryPoints: [join(root, 'src/client/index.ts')],
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2020',
  external: ['react', 'react-dom', 'react-dom/client', '@deepseek-ai/*'],
  write: false,
  sourcemap: true,
  logLevel: 'info',
})

const files = result.outputFiles
const core = files.find((f) => !f.path.endsWith('.map'))
if (!core) throw new Error('esbuild 未产出 JS')

const wrapped =
  'window.__ModuleLoader__.load({ id: "dsh-region", factory: (require) => {\n' +
  'var module = { exports: {} }; var exports = module.exports;\n' +
  'Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });\n' +
  core.text +
  '\nreturn module.exports; } });'

writeFileSync(join(root, 'lib/client.js'), wrapped, 'utf8')
// sourcemap 单独落地（路径相对 client.js）
const map = result.outputFiles.find((f) => f.path.endsWith('.map'))
if (map) writeFileSync(join(root, 'lib/client.js.map'), map.text, 'utf8')
console.log('[build-client] lib/client.js 已生成:', (wrapped.length / 1024).toFixed(1) + 'KB')
