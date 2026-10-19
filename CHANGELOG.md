# Changelog

本项目所有值得记录的变更。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [0.3.0] - 2026-10-20

适配 dsh 0.2.1-rc.2 的破坏性变化，并修掉三个会导致实际故障的缺陷。

### 修复

- **dsh 启动失败（严重）**：client 端把 `settingsScope` 写在顶层 `inject` 里作为硬依赖，而 dsh 0.2.1-rc.2 不再提供该服务，客户端条目永久 pending，宿主启动校验报
  `Error: web boot: 1 entry did not activate` / `dsh-region: pending (waiting for service: settingsScope)`，导致**整个 dsh 起不来**。
  改为只硬依赖 `slots`，`settingsScope` 降级为 `ctx.inject()` 软依赖（缺失则跳过设置页卡片）。
- **右上角图标不显示**：新宿主把「下载日志」按钮移入输入框的 `+` / `/` 命令菜单，旧锚点（`class` 含 `sessionLog`、或 `span` 文本含「下载日志」）永远匹配不到，`ensureEntry()` 首行直接 `return` 且不报任何错。
  锚点改为三级回退：工具栏「文件资源管理器」→ 旧「下载日志」→ 右上角固定浮层；同时放宽匹配（`button.textContent`、`aria-label`、`title`）。
- **镜像切换对桌面端不生效**：`.npmrc` 路径硬编码为 `profiles/web`，而 dsh 桌面端实际使用 `profiles/desktop`；实测 desktop 下 `npm config get registry` 仍是 `registry.npmjs.org`，等于镜像配置白写。
  改为遍历 `desktop` / `web` 两个 profile 逐一写入。
- **状态灯永远灰色**：`sync()` 每 5 分钟自动探测主备源，但从不写入 `this.lastProbe`（只有手动「立即测速」的 `probe()` 才写），导致 `status` 路由的 `main` / `backup` 恒为 `null`，`statusDotClass()` 永远返回 `gray`。
  自动探测结果同样写入内存缓存。

### 变更

- **`.npmrc` 不再整文件覆写**：改为只增改 `registry=` 行，其余内容（`proxy=`、`_authToken`、scope registry 等）原样保留。
  旧实现会把这些配置静默抹掉且不可逆；同时写多个 profile 后影响面更大。
- 客户端定位改用 `aria-label` 等语义标识，不再依赖构建生成的 CSS Module 哈希类名。
- Web UI 菜单挂载位置随宿主改版调整，兼容策略见 README「兼容性」。

### 测试

- `test-npmrc.mjs` 由「打印风险证据」升级为「回归断言」：6 项断言覆盖 `proxy=` 保留、用户注释保留、旧 registry 被替换、`registry` 行唯一、desktop + web 双写入。
- 全套通过：`test-region` / `test-failover` / `test-http`（16 项断言）/ `test-npmrc`（6 项断言）。

## [0.2.0] - 2026-08-20

### 新增

- **Web UI 源管理菜单**：会话页右上角（下载 Log 左侧）新增下拉菜单
  - 状态灯（绿/黄/红）实时显示当前源健康状态，悬停查看说明
  - 一键切换：自动切换（auto）/ 国内镜像（main）/ 官方源（backup）
  - 每个源选项后显示最近探测耗时，支持「立即测速」
- **HTTP 路由**：`/dsh-region/status`、`/dsh-region/use`、`/dsh-region/menu`，桥接 Web UI 与核心服务
- **菜单显隐状态**：持久化到 `~/.dsh/region.json`（`menuVisible`），重启保留
- **探测结果缓存**：status 默认秒回最近探测结果，显式 `?probe=1` 才实时探测

### 内部

- Server 端拆分 `src/http.ts`（路由层），核心逻辑保持零依赖
- Client 端新增 `src/client/`（入口/菜单/设置卡片/API/文案/样式）
- client bundle 通过 esbuild 打包为 `lib/client.js`（`__ModuleLoader__` 格式）
- 测试文件路径改为相对定位（`import.meta.url`），clone 后可直接 `npm test`

## [0.1.0] - 2026-08-20

### 新增

- 初始版本：DSH 下载源主备切换插件
  - auto 模式：5 分钟探测主源健康，主源超时/失败自动切到官方源，恢复自动切回
  - main/backup 手动锁定模式
  - `/region` 命令（status/use/probe），状态持久化到 `~/.dsh/region.json`
  - 生效源写入 web profile 的 `.npmrc`，DSH 原生命令同步生效
  - 零运行时依赖
