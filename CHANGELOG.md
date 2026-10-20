# Changelog

本项目所有值得记录的变更。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [0.3.2] - 2026-10-20

修掉「新建对话页图标跑到浮层」——挂载策略从「插入宿主 DOM」改为「固定定位 + 锚定按钮」。

### 修复

- **新建对话页图标脱离工具栏**：该页面工具栏内容与有会话时完全不同 ——
  没有「文件资源管理器」黄文件夹、没有 `headerUtilities` 容器、没有「···」，
  只剩一个「打开右侧边栏」按钮。按容器/按钮插入必然找不到锚点，退回兜底浮层。
  进一步实测发现宿主的 `titleRow` 布局本身带溢出的大 margin
  （`headerCorner` 的 `margin-left: 774px`，渲染在 1880 而容器宽仅 1592），
  **往这行里插任何元素都会错位**（实测插进去会与相邻按钮重叠、或被甩到最左 302px）。
- 改为「固定定位 + 锚定到按钮左侧」：入口不再参与宿主布局，只用锚点的
  `getBoundingClientRect()` 算坐标。锚点按优先级：
  `文件资源管理器` → `右侧边栏` → `更多操作`，任一存在即可定位；
  全部不存在时才回到右上角固定点。
- 兜底容器去掉边框/背景/阴影，视觉上与工具栏原生图标一致。
- 新增 `resize` 监听：窗口尺寸变化后重算坐标。
- `MutationObserver` 改为「入口消失则重建、锚点移动则跟随」，节流 200ms。

### 测试

CDP 实测两种页面：
| 页面 | 图标 | 锚点 | 间距 | 垂直偏移 |
|---|---|---|---|---|
| 会话页 | L:1084 | 黄文件夹 L:1118 | 6px | -3px（高度差居中） |
| 新建对话页 | L:1206 | 右栏按钮 L:1240 | 6px | 0 |

## [0.3.1] - 2026-10-20

修掉 0.3.0 遗留的一个启动时序缺陷：宿主渲染稍慢时，图标会永久卡在兜底浮层。

### 修复

- **首次挂载早于宿主渲染 → 永久停在兜底浮层**：`MutationObserver` 的回调只看「入口是否存在」，
  不看「位置对不对」。若插件挂载时工具栏锚点还没渲染出来，入口会先落进兜底浮层；
  之后锚点出现，自愈逻辑仍因「入口已存在」而直接返回，**永不迁移**。
  现象是右上角图标不在工具栏里，而是飘在右侧一个带边框的浮层上（重启不恢复，直到UI再次重建）。
  - `MutationObserver` 改为判断「工具栏锚点已出现但入口不在其中 → 迁移」，并加 500ms 节流；
  - `tryMount` 的重试目标从「页面上有入口」改为「入口已挂进工具栏」，重试窗口由 10 秒延长到 30 秒，
    避免慢启动时提前收工。
- 迁移完成后自动清理空的兜底浮层。

### 测试

- 用 CDP 做破坏性验证：手动把入口移入兜底容器 → 触发 DOM 变更 → 500ms 后自动迁回工具栏，
  兜底容器被清理，位置 `L:1079`、与文件夹按钮间距 11px、父容器 `display:contents`、状态灯 green。

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
