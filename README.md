# dsh-region

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CI](https://github.com/nononononofish/dsh-region/actions/workflows/ci.yml/badge.svg)](https://github.com/nononononofish/dsh-region/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/dsh-region.svg)](https://www.npmjs.com/package/dsh-region)

> 为 [DeepSeek Harness](https://github.com/deepseek-ai/dsh)（DSH）开发的下载源主备切换插件：**国内镜像为主、官方源为备、故障自动切换。** 已发布到 [npm](https://www.npmjs.com/package/dsh-region)。

**为什么做这个插件？** 用 DSH 安装插件时，国外下载源速率很慢，经常卡顿、无法更新，甚至更新到一半就卡住。这个插件就是为解决这个问题而生：默认使用国内镜像为主，最快地下载和更新插件；国内镜像挂掉时自动切换为官方下载源；主源恢复后自动切回。

> **第三方社区插件，与 DeepSeek 官方无关。**

## 功能特性

- **自动故障切换** —— 每 5 分钟探测主源健康；主源超时（10 秒）或失败时自动切到官方源，主源恢复后自动切回。
- **手动锁定** —— `/region use main|backup` 锁定任意一个源，`/region use auto` 回到自动模式。
- **原生生效** —— 把当前生效源写入 profile 的 `.npmrc`，DSH 原生命令（如 `dsh plugin add ...`）也走该源。
- **状态持久化** —— 模式和切换记录存于 `~/.dsh/region.json`，重启不丢。
- **零运行时依赖** —— 只用 Node 内置模块 + 全局 fetch。

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

DSH 重启后，打开任意会话，**右上角「下载 Log」按钮左侧**会出现源管理菜单：

- 🟢🟡🔴 状态灯实时显示当前源健康（悬停看说明）
- 点击切换：自动切换（auto）/ 国内镜像（main）/ 官方源（backup）
- 每个源后显示最近探测耗时；「立即测速」可实时检测双源
- 当前模式带 ✓ 标记

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
- 健康检查每 5 分钟一轮；切换事件记录在 `~/.dsh/region.json`（保留最近 50 条）。

## 开发

```bash
npm run build        # tsc：src/index.ts → lib/index.js + index.d.ts
npm run typecheck    # 仅类型检查
npm test             # 冒烟测试 + 故障切换测试（用临时 DSH_HOME，会真实请求两个源）
```

## 开源协议

[MIT](LICENSE)
