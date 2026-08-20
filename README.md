# dsh-region

> Download-registry failover plugin for [DeepSeek Harness](https://github.com/deepseek-ai/dsh): **China mirror first, official registry as backup, automatic switching.**

`dsh-region` manages the package download registry of your DSH profile. It keeps the China npm mirror ([npmmirror](https://npmmirror.com)) as the primary source and the official npm registry as the fallback — so plugin installs stay fast inside China, and never hang when the mirror goes down.

> **Third-party community plugin. Not affiliated with or endorsed by DeepSeek.**

## Features

- **Auto failover** — probes the primary mirror every 5 minutes; if it times out (10 s) or fails, the plugin switches to the official registry automatically, and switches back once the mirror recovers.
- **Manual override** — lock to either source with `/region use main|backup`, or return to automatic mode with `/region use auto`.
- **Native integration** — writes the active registry into the profile's `.npmrc`, so native DSH commands (e.g. `dsh plugin add ...`) use it too.
- **Persistent state** — mode and history are stored in `~/.dsh/region.json` and survive restarts.
- **Zero runtime dependencies** — Node built-ins + global `fetch` only.

## Install

### From source (works today)

```bash
git clone https://github.com/nononononofish/dsh-region.git
cd dsh-region
npm install          # or: npx tsc (build lib/ from src/)
dsh plugin --profile web add link:C:\path\to\dsh-region
```

> ⚠️ The path passed to `link:` must **not contain spaces** (DSH splits the argument on spaces).

### From npm (once published)

```bash
dsh plugin --profile web add dsh-region
```

## Usage

In a DSH chat:

| Command | Description |
|---|---|
| `/region status` | Show current mode, active registry and last probe result |
| `/region probe` | Manually test latency of both registries |
| `/region use auto` | Auto failover mode (default) |
| `/region use main` | Lock to the China mirror (npmmirror) |
| `/region use backup` | Lock to the official npm registry |

Default sources:

| Role | Registry |
|---|---|
| Primary (main) | `https://registry.npmmirror.com` |
| Backup | `https://registry.npmjs.org` |

## How it works

- In `auto` mode the plugin probes `registry.npmmirror.com` (falling back to `registry.npmjs.org`) with the stable package `is-number` as the probe target, using a 10 s timeout per request.
- The active registry is written to `<profile>/.npmrc`, which is what native DSH pnpm calls read.
- Health checks run every 5 minutes. Switch events are recorded in `~/.dsh/region.json` (last 50 entries).

## Development

```bash
npm run build        # tsc: src/index.ts -> lib/index.js + index.d.ts
npm run typecheck    # type-check only
npm test             # smoke test + failover test (uses a temp DSH_HOME, touches the real registries)
```

## License

[MIT](LICENSE)
