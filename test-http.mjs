// dsh-region HTTP 路由对抗测试（Web UI 主卖点，原零覆盖）。
// 用内存 mock 模拟 DSH webServer + RegionService，断言路由行为边界。
import { registerRegionRoutes } from './lib/http.js'

let passed = 0
let failed = 0
function assert(cond, msg) {
  if (cond) {
    passed++
    console.log(`  ✅ ${msg}`)
  } else {
    failed++
    console.error(`  ❌ ${msg}`)
    throw new Error(`HTTP 路由测试失败: ${msg}`)
  }
}

// ---- 内存 mock RegionService ----
const service = {
  _mode: 'auto',
  _menu: true,
  status() {
    return {
      mode: this._mode,
      appliedRegistry: 'https://registry.npmmirror.com',
      mainRegistry: 'https://registry.npmmirror.com',
      backupRegistry: 'https://registry.npmjs.org',
      lastProbeAt: null,
      lastSwitchAt: null,
      lastError: null,
      menuVisible: this._menu,
      recentLog: [],
    }
  },
  setMode(mode) {
    this._mode = mode
    return { ok: true, message: `已切换:${mode}` }
  },
  probe() {
    return Promise.resolve({ main: { ok: true, ms: 20 }, backup: { ok: true, ms: 30 } })
  },
  getLastProbe() {
    return { main: { ok: true, ms: 20 }, backup: { ok: true, ms: 30 } }
  },
  setMenuVisible(v) {
    this._menu = v
  },
}

// ---- 内存 mock WebServer ----
const registered = []
const webServer = {
  register(route) {
    registered.push(route)
    return () => {}
  },
}
const disposers = registerRegionRoutes(webServer, service)
assert(disposers.length === 3, '注册了 3 条路由 (status/use/menu)')
const byPath = Object.fromEntries(registered.map((r) => [r.path, r]))

// ---- 请求/响应 mock 工厂 ----
function makeRes() {
  let statusCode = 200
  const chunks = []
  return {
    writeHead(code) {
      statusCode = code
    },
    end(chunk) {
      if (chunk !== undefined) chunks.push(Buffer.from(chunk))
    },
    get status() {
      return statusCode
    },
    getBody() {
      return Buffer.concat(chunks).toString('utf8')
    },
  }
}
function makeReq(method, url, headers = {}, bodyBuffer = null) {
  return {
    method,
    url,
    headers,
    async *[Symbol.asyncIterator]() {
      if (bodyBuffer) yield bodyBuffer
    },
  }
}
async function call(path, method, headers, bodyObj) {
  const lookupPath = path.split('?')[0]
  const route = byPath[lookupPath]
  if (!route) throw new Error(`路由未注册: ${path}`)
  const res = makeRes()
  const bodyBuffer = bodyObj ? Buffer.from(JSON.stringify(bodyObj)) : null
  await route.handler(makeReq(method, path, headers, bodyBuffer), res)
  let json = null
  try {
    json = res.getBody() ? JSON.parse(res.getBody()) : null
  } catch {
    /* 非 JSON 响应（如 405 空体） */
  }
  return { status: res.status, json }
}

console.log('== HTTP 路由对抗测试 ==')

// 1. GET status 正常
{
  const { status, json } = await call('/dsh-region/status', 'GET')
  assert(status === 200, 'GET /status 返回 200')
  assert(json && json.mode === 'auto', 'status 默认模式为 auto')
  assert(json.mainRegistry.includes('npmmirror'), 'status 含主源地址')
}

// 2. GET status?probe=1 实时探测
{
  const { status, json } = await call('/dsh-region/status?probe=1', 'GET')
  assert(status === 200, 'GET /status?probe=1 返回 200')
  assert(json.main && json.main.ok === true, 'probe=1 返回实时探测结果')
}

// 3. POST use 合法 mode（同源）→ 切换生效
{
  const { status, json } = await call('/dsh-region/use', 'POST', { host: 'localhost' }, { mode: 'backup' })
  assert(status === 200, 'POST /use {mode:backup} 返回 200')
  assert(service._mode === 'backup', '服务内部模式已切到 backup')
  assert(json.ok === true, '响应 ok=true')
}

// 4. POST use 非法 mode → 400
{
  const { status, json } = await call('/dsh-region/use', 'POST', { host: 'localhost' }, { mode: 'invalid' })
  assert(status === 400, 'POST /use 非法 mode 返回 400')
  assert(/auto\|main\|backup/.test(json.error), '错误信息提示合法枚举')
}

// 5. POST use 跨域 → 403（安全边界）
{
  const { status } = await call('/dsh-region/use', 'POST', { host: 'localhost', origin: 'http://evil.example' }, { mode: 'main' })
  assert(status === 403, '跨域 POST /use 返回 403 (同源校验生效)')
}

// 6. POST menu 合法布尔 → 200 且生效
{
  const { status, json } = await call('/dsh-region/menu', 'POST', { host: 'localhost' }, { visible: false })
  assert(status === 200, 'POST /menu {visible:false} 返回 200')
  assert(service._menu === false, '菜单显隐已切到 false')
}

// 7. POST menu 非布尔 → 400
{
  const { status } = await call('/dsh-region/menu', 'POST', { host: 'localhost' }, { visible: 'yes' })
  assert(status === 400, 'POST /menu 非布尔 visible 返回 400')
}

// 8. 错误方法 GET /use → 405
{
  const { status } = await call('/dsh-region/use', 'GET')
  assert(status === 405, 'GET /use (仅 POST) 返回 405')
}

console.log(`\n✅ HTTP 路由对抗测试通过：${passed} 项断言全过`)
