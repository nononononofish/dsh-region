# 开发指南

dsh-region 的本地开发说明。

## 环境要求

- Node.js >= 22
- npm

## 安装依赖

```bash
npm install
```

> 国内网络下建议：`npm install --registry=https://registry.npmmirror.com`

## 构建

```bash
npm run build
```

- Server 端：`tsc -p tsconfig.json` → `lib/index.js` + `lib/http.js` + 类型声明
- Client 端：`node scripts/build-client.mjs`（esbuild）→ `lib/client.js`（`__ModuleLoader__` 格式）

## 测试

```bash
npm test
```

- `test-region.mjs`：核心逻辑冒烟测试（模式切换/状态/命令注册）
- `test-failover.mjs`：主源故障自动切换验证（主源指向不可用地址）

两个测试都用临时 `DSH_HOME`，不影响真实配置；会真实请求两个 registry。

## 安装到 DSH（开发模式）

```bash
dsh plugin --profile web add link:E:\myProject\DeepSeekHarness\dsh-region
```

> ⚠️ `link:` 路径不能含空格；安装副本在 `~/.dsh/plugins/dsh-region`（勿直接改，改开发目录后同步或重新 link）。

## 代码结构

```
src/
├── index.ts          # 核心逻辑：RegionService（主备切换/探测/状态持久化）+ /region 命令 + 插件入口
├── http.ts           # HTTP 路由层：/dsh-region/status|use|menu
└── client/           # Web UI client bundle
    ├── index.ts      # 入口：挂载菜单 + 设置卡片
    ├── header-menu.ts # 右上角源管理菜单（DOM 注入 + 自愈）
    ├── settings-card.tsx # 设置页胶囊卡片（显隐开关）
    ├── host-api.ts   # client ↔ server HTTP 通信
    ├── locales.ts    # 中英文案
    └── region.module.css # 样式（内联注入）
```

## 发布流程

1. `npm run build` + `npm test` 全绿
2. 版本号 + `CHANGELOG.md` 更新
3. `git tag vX.Y.Z` + push
4. 同步安装副本（`~/.dsh/plugins/dsh-region`）并重启 DSH 验证
