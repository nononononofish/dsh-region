# dsh-region

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CI](https://github.com/nononononofish/dsh-region/actions/workflows/ci.yml/badge.svg)](https://github.com/nononononofish/dsh-region/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/dsh-region.svg)](https://www.npmjs.com/package/dsh-region)

> 还在为下插件经常卡住或失败而烦恼么？下载本插件即可。全自动在国内镜像和官方源间换路续下，还带面板能手动查看与切换。没啦！

**为什么做这个插件？** 用 DSH 安装插件时，国外下载源速率很慢，经常卡顿、无法更新，甚至更新到一半就卡住。这个插件就是为解决这个问题而生：默认使用国内镜像为主，最快地下载和更新插件；国内镜像挂掉时自动切换为官方下载源；主源恢复后自动切回。

> **第三方社区插件，与 DeepSeek 官方无关。**

## 功能特性

- **自动故障切换** —— 每 5 分钟探测主源健康；主源超时（10 秒）或失败时自动切到官方源，主源恢复后自动切回。
- **手动锁定** —— `/region use main|backup` 锁定任意一个源，`/region use auto` 回到自动模式。
- **原生生效** —— 把当前生效源写入 profile 的 `.npmrc`，DSH 原生命令（如 `dsh plugin add ...`）也走该源。
- **状态持久化** —— 模式和切换记录存于 `~/.dsh/region.json`，重启不丢。
- **零运行时依赖** —— 运行期只用 Node 内置模块 + 全局 fetch，无需插件自带任何第三方包（构建期用 react 作 devDependency，由 DSH host 运行时按需提供，不计入发布体积）。

## 兼容性

| dsh 版本 | 本插件 ≤ 0.2.1 | 本插件 0.3.0+ |
|---|---|---|
| dsh ≤ 0.2.1（旧版） | ✅ 正常 | ✅ 正常 |
| dsh 0.2.1-rc.2 及更新 | ❌ **dsh 启动失败** | ✅ 正常 |

**dsh 升级后如果突然起不来，先升级本插件。**

原因（0.2.1-rc.2 起的宿主变化）：

1. 宿主不再提供 `settingsScope` 客户端服务，而旧版插件把它写进了顶层 `inject` 硬依赖 → 客户端条目永久 pending → 启动校验报 `web boot: 1 entry did not activate`。
2. 宿主把右上角「下载日志」按钮挪进了输入框的 `+` / `/` 命令菜单，旧版插件靠这个按钮当挂载锚点 → 找不到锚点后静默放弃，图标不出现。

0.3.0 的处理方式：

- `settingsScope` 降级为软依赖（`ctx.inject()` 回调内尝试），宿主没有就跳过设置页卡片，**绝不再拖垮启动**；
- 挂载锚点改为三级回退：工具栏「文件资源管理器」→ 旧「下载日志」→ 右上角固定浮层；
- 定位只用 `aria-label` 等语义标识，不依赖构建生成的哈希类名；
- `.npmrc` 同时写入 `desktop` 与 `web` 两个 profile（不同启动方式各用一个），且**只增改 `registry=` 行**，不再整文件覆写，避免抹掉 `proxy=` / `_authToken` 等既有配置。

## 安装

### 从源码安装（当前可用）

```bash
git clone https://github.com/nononononofish/dsh-region.git
cd dsh-region
npm install          # 或 npx tsc（由 src/ 构建 lib/）
dsh plugin --profile web add link:C:\path\to\dsh-region
```

> ⚠️ `link:` 后面的路径**不能包含空格**（DSH 会按空格拆分参数）。

### 从 npm 安装（已发布，推荐）

> 已实测通过：DSH 的 `plugin add` 本质是 pnpm 转发器，`dsh plugin --profile web add dsh-region` 会直接从 npm registry 拉取并自动激活为 bundle，无需 git/link。

```bash
dsh plugin --profile web add dsh-region
```

## 使用方法

### Web UI 菜单（推荐）

DSH 重启后，打开任意会话，**右上角工具栏「文件资源管理器」按钮（黄色文件夹）左侧**会出现源管理菜单：

- 🟢🟡🔴 状态灯实时显示当前源健康（悬停看说明）
- 点击切换：自动切换（auto）/ 国内镜像（main）/ 官方源（backup）
- 每个源后显示最近探测耗时；「立即测速」可实时检测双源
- 当前模式带 ✓ 标记

> 挂载位置按三级回退，兼容不同 dsh 版本：
> ① 新版工具栏「文件资源管理器」左侧 → ② 旧版「下载 Log」左侧 → ③ 右上角固定浮层（前两者都不存在时）。

### 对话框命令

在 DSH 对话框里输入：

| 命令 | 作用 |
|---|---|
| `/region status` | 查看当前模式、生效源、最近探测结果 |
| `/region probe` | 手动测两个源各自的延迟 |
| `/region use auto` | 自动主备模式（默认） |
| `/region use main` | 锁定国内镜像（npmmirror） |
| `/region use backup` | 锁定官方 npm 源 |

默认源配置：

| 角色 | 源地址 |
|---|---|
| 主源（国内镜像） | `https://registry.npmmirror.com` |
| 备源（官方源） | `https://registry.npmjs.org` |

## 工作原理

- auto 模式下，插件用稳定小包 `is-number` 作为探测目标，请求其元数据接口（单次 10 秒超时），探测 `registry.npmmirror.com`，失败则测 `registry.npmjs.org`。
- 生效源写入 `<profile>/.npmrc`，DSH 原生 pnpm 调用读取的就是它。
- 健康检查每 5 分钟一轮；切换事件记录在 `~/.dsh/region.json`（保留最近 200 条）。

## 开发

```bash
npm run build        # tsc：src/index.ts → lib/index.js + index.d.ts
npm run typecheck    # 仅类型检查
npm test             # 三套测试：核心逻辑 + 主源故障切换 + HTTP 路由对抗（用临时 DSH_HOME，会真实请求两个源）
```

## 维护者备忘

> DSH 是快速迭代的宿主。**每次宿主大版本更新，都可能同时打断「插件启动」和「客户端挂载」两条链路。**
> 以下是 0.3.0 实际踩过的坑，DSH 升级后按下面的自查顺序逐条过一遍。

### 四条硬规矩

| # | 规矩 | 违反的后果 |
|---|---|---|
| 1 | client 端顶层 `export const inject` 只写宿主**必然提供**的核心服务（如 `slots`）。可选服务一律用 `ctx.inject([...], cb)` 回调式软依赖 | 宿主移除该服务 → 条目永久 `pending` → 启动校验失败 → **DSH 整个起不来** |
| 2 | 挂载必须有兜底，**不允许「找不到锚点就 return」**；定位只用 `aria-label` / 文本等语义标识 | UI 改版后锚点消失 → 插件市场显示「运行中」，界面却什么都没有，而且**不报错** |
| 3 | 写 `<profile>` 下任何文件都要**遍历所有 profile**（`desktop` 与 `web` 各用一个） | 硬编码某一个 → 另一半场景静默失效（例如 `.npmrc` 写到 web，桌面端仍走官方源） |
| 4 | 写 `.npmrc` **只增改 `registry=` 一行**，绝不整文件覆写 | 把用户的 `proxy=`、`_authToken`、scope registry 静默抹掉，**不可逆** |

另外：**绝不要用构建生成的 CSS Module 哈希类名当选择器**（形如 `WgQWqa_main`），前缀每次构建都可能变；
`aria-label` 这类语义属性才跨版本稳定。

### DSH 升级后自查顺序

1. **DSH 能起来吗？**
   起不来先看 `%APPDATA%\@deepseek-ai\dsh-desktop\logs\crash-*-web-boot.log`。
   出现 `web boot: N entry did not activate` + `xxx: pending (waiting for service: yyy)`，就是违反了规矩 1。
2. **起来了但插件没反应？** → 按「本地调试」读真实 DOM，查挂载锚点（规矩 2）。
3. **镜像不生效？** → `cd ~/.dsh/profiles/<profile> && npm config get registry`，
   看到的不是镜像就查规矩 3、4。
4. **状态灯一直是灰的？** → 抓 `/dsh-region/status`。`main` / `backup` 为 `null` 说明自动探测结果
   没写进 `lastProbe`（原实现只有手动「立即测速」才写，0.3.0 已修）。

### 本地调试（读宿主真实 DOM）

宿主界面元素随时会变，**不要猜**。用 Chrome DevTools Protocol 直接读渲染进程：

```bash
# 1) 先关掉已运行的 DSH —— Electron 有单实例锁，否则调试端口不生效
# 2) 带调试端口启动
"D:\Program Files (x86)\DeepSeek Harness\DeepSeek Harness.exe" --no-sandbox --remote-debugging-port=9222

# 3) 取页面的 webSocketDebuggerUrl
curl http://127.0.0.1:9222/json

# 4) 连上该 ws，发 Runtime.evaluate 执行 JS，例如：
#    [...document.querySelectorAll('button')].map(b => b.getAttribute('aria-label'))
```

> 0.3.0 就是用这个方法定位到「文件资源管理器」按钮的 `aria-label="用 文件资源管理器 打开"`，
> 并确认工具栏那一行是个 `display: contents` 容器（所以插入子元素能自然参与父级 flex 排布）。

### 环境坑

- **从 AI 工具 / IDE 的集成终端启动 Electron 会静默失败**：父进程若注入了 `ELECTRON_RUN_AS_NODE=1`，
  Electron 会退化成纯 Node —— 不开窗口、不写日志、进程秒退。排查前先 `set ELECTRON_RUN_AS_NODE=` 再启动。
- **`npm publish` 需要 2FA**：在非交互式环境（CI / 自动化脚本）里会直接 `EOTP` 失败，
  连授权链接都拿不到，必须在真实终端人工执行 —— CLI 会打印 `https://www.npmjs.com/auth/cli/<id>`，
  浏览器授权后自动继续。
- npm 自 2026-08 起限制绕过 2FA 的 token，**2027-01 起禁止免 2FA 直接发布**，发布流程只会越来越严。

## 开源协议

[MIT](LICENSE)
