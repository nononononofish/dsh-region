# Changelog

本项目所有值得记录的变更。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

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
