window.__ModuleLoader__.load({ id: "dsh-region", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_react2 = require("react");

// src/client/host-api.ts
var BASE = `${window.location.origin}/dsh-region`;
async function requestJson(path, init) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "content-type": "application/json" },
    ...init
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return await res.json();
}
function fetchStatus(probe = false) {
  return requestJson(`/status${probe ? "?probe=1" : ""}`);
}
function requestMode(mode) {
  return requestJson("/use", {
    method: "POST",
    body: JSON.stringify({ mode })
  });
}
function requestMenuVisible(visible) {
  return requestJson("/menu", {
    method: "POST",
    body: JSON.stringify({ visible })
  });
}

// src/client/locales.ts
var zh = {
  "menu.title": "dsh-region \u6E90\u7BA1\u7406",
  "menu.statusGreen": "\u4E3B\u6E90\u6B63\u5E38\uFF0C\u5F53\u524D\u4F7F\u7528\u56FD\u5185\u955C\u50CF",
  "menu.statusYellow": "\u4E3B\u6E90\u4E0D\u53EF\u7528\uFF0C\u5DF2\u81EA\u52A8\u5207\u5230\u5B98\u65B9\u6E90",
  "menu.statusRed": "\u56FD\u5185\u955C\u50CF\u4E0E\u5B98\u65B9\u6E90\u5747\u4E0D\u53EF\u7528",
  "menu.statusUnknown": "\u72B6\u6001\u672A\u77E5\uFF0C\u70B9\u51FB\u300C\u7ACB\u5373\u6D4B\u901F\u300D\u68C0\u6D4B",
  "menu.auto": "\u81EA\u52A8\u5207\u6362",
  "menu.main": "\u56FD\u5185\u955C\u50CF",
  "menu.backup": "\u5B98\u65B9\u6E90",
  "menu.probe": "\u7ACB\u5373\u6D4B\u901F",
  "menu.current": "\u5F53\u524D",
  "menu.hidden": "\uFF08\u83DC\u5355\u5DF2\u9690\u85CF\uFF0C\u53EF\u5728\u8BBE\u7F6E\u4E2D\u5F00\u542F\uFF09",
  "card.title": "dsh-region \u6E90\u7BA1\u7406",
  "card.description": "DSH \u4E0B\u8F7D\u6E90\u4E3B\u5907\u5207\u6362\uFF1A\u56FD\u5185\u955C\u50CF\u4E3A\u4E3B\u3001\u5B98\u65B9\u6E90\u4E3A\u5907\uFF0C\u6545\u969C\u81EA\u52A8\u5207\u6362",
  "card.menuVisible": "\u53F3\u4E0A\u89D2\u6E90\u7BA1\u7406\u83DC\u5355",
  "card.menuVisibleDesc": "\u5728\u4F1A\u8BDD\u9875\u53F3\u4E0A\u89D2\uFF08\u4E0B\u8F7D Log \u5DE6\u4FA7\uFF09\u663E\u793A\u6E90\u7BA1\u7406\u4E0B\u62C9\u83DC\u5355",
  "card.show": "\u663E\u793A",
  "card.hide": "\u9690\u85CF",
  "err.fetchFailed": "\u8FDE\u63A5 dsh-region \u670D\u52A1\u5931\u8D25"
};

// src/client/header-menu.ts
var ENTRY_SELECTOR = "[data-dsh-region-entry]";
var CSS = `
.dshr-entry{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;margin:0 2px;padding:0;border:none;border-radius:6px;background:transparent;color:var(--color-text-secondary,#8b949e);cursor:pointer;position:relative}
.dshr-entry:hover{background:color-mix(in srgb,currentColor 12%,transparent)}
.dshr-entry .dshr-dot{position:absolute;top:4px;right:4px;width:7px;height:7px;border-radius:50%;border:1.5px solid var(--color-bg-primary,#0d1117)}
.dshr-dot.green{background:#3fb950}.dshr-dot.yellow{background:#d29922}.dshr-dot.red{background:#f85149}.dshr-dot.gray{background:#8b949e}
.dshr-menu{position:fixed;z-index:9999;min-width:230px;padding:6px;border-radius:10px;background:var(--color-bg-elevated,#161b22);border:1px solid var(--color-border-default,rgba(240,246,252,.12));box-shadow:0 8px 24px rgba(1,4,9,.4);font-size:13px;color:var(--color-text-primary,#e6edf3);animation:dshrIn .12s ease-out}
@keyframes dshrIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
.dshr-menu-head{display:flex;align-items:center;gap:8px;padding:6px 8px 8px;font-weight:600;border-bottom:1px solid var(--color-border-default,rgba(240,246,252,.1));cursor:help}
.dshr-menu-head .dshr-hdot{width:8px;height:8px;border-radius:50%;flex:none}
.dshr-item{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;padding:7px 8px;border:none;border-radius:7px;background:transparent;color:inherit;font-size:13px;cursor:pointer;text-align:left}
.dshr-item:hover{background:color-mix(in srgb,currentColor 10%,transparent)}
.dshr-item .dshr-ms{color:var(--color-text-tertiary,#6e7681);font-size:12px;font-variant-numeric:tabular-nums}
.dshr-item .dshr-cur{color:#3fb950;font-size:11px;margin-left:4px}
.dshr-sep{height:1px;margin:5px 6px;background:var(--color-border-default,rgba(240,246,252,.08))}
.dshr-probe{justify-content:center;color:var(--color-text-secondary,#8b949e)}
.dshr-probe:hover{color:var(--color-text-primary,#e6edf3)}
.dshr-fallback-host{position:fixed;top:56px;right:16px;z-index:2147483000;display:flex;align-items:center;gap:2px;padding:2px;border-radius:8px;background:color-mix(in srgb,var(--color-bg-elevated,#161b22) 88%,transparent);border:1px solid var(--color-border-default,rgba(240,246,252,.12));box-shadow:0 2px 8px rgba(1,4,9,.25)}
`;
function findLogButton() {
  const all = Array.from(document.querySelectorAll("button"));
  const RE = /session\s*log|下载.*日志/i;
  const byClass = all.find((b) => /sessionLog/i.test(b.className));
  if (byClass) return byClass;
  const byText = all.find((b) => RE.test(b.textContent ?? ""));
  if (byText) return byText;
  return all.find(
    (b) => RE.test(b.getAttribute("aria-label") ?? "") || RE.test(b.getAttribute("title") ?? "")
  ) ?? null;
}
function fallbackHost() {
  let host = document.getElementById("dshr-fallback-host");
  if (host) return host;
  host = document.createElement("div");
  host.id = "dshr-fallback-host";
  host.className = "dshr-fallback-host";
  document.body.appendChild(host);
  return host;
}
function findToolbarHost() {
  const all = Array.from(document.querySelectorAll("button[aria-label]"));
  const folder = all.find(
    (b) => /文件资源管理器|资源管理器|File Explorer/i.test(b.getAttribute("aria-label") ?? "")
  );
  if (!folder) return null;
  const split = folder.parentElement;
  const anchorSpan = split?.parentElement;
  const host = anchorSpan?.parentElement;
  if (!host || !anchorSpan) return null;
  return { host, before: anchorSpan };
}
function resolveMount() {
  const tb = findToolbarHost();
  if (tb) return tb;
  const anchor = findLogButton();
  const container = anchor?.parentElement;
  if (container && anchor) return { host: container, before: anchor };
  return { host: fallbackHost(), before: null };
}
function styleTag() {
  const existing = document.getElementById("dshr-style");
  if (existing) return existing;
  const style = document.createElement("style");
  style.id = "dshr-style";
  style.textContent = CSS;
  document.head.appendChild(style);
  return style;
}
function statusDotClass(status) {
  const { main, backup } = status;
  if (!main || !backup) return "gray";
  if (main.ok && backup.ok) return "green";
  if (main.ok !== backup.ok) return "yellow";
  return main.ok ? "gray" : "red";
}
function statusHint(status) {
  const { main, backup } = status;
  if (!main || !backup) return zh["menu.statusUnknown"];
  if (main.ok && backup.ok) return zh["menu.statusGreen"];
  if (!main.ok && backup.ok) return zh["menu.statusYellow"];
  if (!main.ok && !backup.ok) return zh["menu.statusRed"];
  return zh["menu.statusUnknown"];
}
var ICON = '<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="8" cy="4" rx="4" ry="1.8"/><path d="M4 4v4c0 1 1.8 1.8 4 1.8s4-.8 4-1.8V4"/><path d="M4 8v4c0 1 1.8 1.8 4 1.8s4-.8 4-1.8V8"/></svg>';
function mountHeaderMenu(options = {}) {
  styleTag();
  let disposed = false;
  let observer = null;
  let menuEl = null;
  let entryEl = null;
  let latest = null;
  const cleanupMenu = () => {
    menuEl?.remove();
    menuEl = null;
  };
  const closeMenu = () => cleanupMenu();
  const renderMenu = async () => {
    if (disposed) return;
    cleanupMenu();
    let status;
    try {
      status = await fetchStatus(false);
    } catch {
      status = {
        mode: "auto",
        appliedRegistry: null,
        mainRegistry: "",
        backupRegistry: "",
        lastError: zh["err.fetchFailed"],
        lastSwitchAt: null,
        menuVisible: true,
        main: { ok: false, ms: 0, error: zh["err.fetchFailed"] },
        backup: { ok: false, ms: 0, error: zh["err.fetchFailed"] }
      };
    }
    latest = status;
    if (!entryEl) return;
    try {
      const rect = entryEl.getBoundingClientRect();
      const dot = statusDotClass(status);
      const items = [
        { key: "auto", label: zh["menu.auto"], cmd: "auto" },
        { key: "main", label: zh["menu.main"], cmd: "main" },
        { key: "backup", label: zh["menu.backup"], cmd: "backup" }
      ];
      const root = document.createElement("div");
      root.className = "dshr-menu";
      root.style.left = `${Math.max(8, rect.right - 240)}px`;
      root.style.top = `${rect.bottom + 6}px`;
      root.setAttribute("role", "menu");
      const head = document.createElement("div");
      head.className = "dshr-menu-head";
      head.title = statusHint(status);
      const hdot = document.createElement("span");
      hdot.className = `dshr-hdot ${dot}`;
      head.appendChild(hdot);
      head.appendChild(document.createTextNode(zh["menu.title"]));
      root.appendChild(head);
      for (const item of items) {
        const btn = document.createElement("button");
        btn.className = "dshr-item";
        btn.setAttribute("role", "menuitem");
        const left = document.createElement("span");
        const isCurrent = status.mode === item.cmd;
        left.textContent = `${item.label}\uFF08${item.cmd}\uFF09`;
        if (isCurrent) {
          const cur = document.createElement("span");
          cur.className = "dshr-cur";
          cur.textContent = `\u2713${zh["menu.current"]}`;
          left.appendChild(cur);
        }
        btn.appendChild(left);
        const ms = document.createElement("span");
        ms.className = "dshr-ms";
        const probeResult = item.cmd === "main" ? status.main : item.cmd === "backup" ? status.backup : null;
        ms.textContent = probeResult ? `${probeResult.ms}ms` : "--";
        btn.appendChild(ms);
        btn.addEventListener("click", () => {
          void requestMode(item.cmd);
          void renderMenu();
        });
        root.appendChild(btn);
      }
      const sep = document.createElement("div");
      sep.className = "dshr-sep";
      root.appendChild(sep);
      const probe = document.createElement("button");
      probe.className = "dshr-item dshr-probe";
      probe.textContent = `\u21BB ${zh["menu.probe"]}`;
      probe.addEventListener("click", () => {
        void fetchStatus(true).then(() => renderMenu());
      });
      root.appendChild(probe);
      document.body.appendChild(root);
      menuEl = root;
    } catch (error) {
      console.error("[dsh-region] menu render failed:", error);
    }
  };
  const buildEntry = () => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dshr-entry";
    btn.setAttribute("data-dsh-region-entry", "");
    btn.setAttribute("aria-label", zh["menu.title"]);
    btn.innerHTML = ICON;
    const dot = document.createElement("span");
    dot.className = "dshr-dot gray";
    btn.appendChild(dot);
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      if (menuEl) closeMenu();
      else void renderMenu();
    });
    return btn;
  };
  let ensureLock = false;
  const ensureEntry = () => {
    if (disposed || ensureLock) return;
    ensureLock = true;
    void fetchStatus(false).then((status) => {
      if (disposed) return;
      latest = status;
      const targetVisible = status.menuVisible !== false;
      const mount = resolveMount();
      const existing = document.querySelector(ENTRY_SELECTOR);
      if (!targetVisible) {
        existing?.remove();
        cleanupMenu();
        options.onMenuVisibleChange?.(false);
        return;
      }
      if (existing && existing.parentElement === mount.host) {
        entryEl = existing;
        return;
      }
      if (existing) existing.remove();
      const btn = buildEntry();
      btn.classList.add("dshr-entry");
      const dot = btn.querySelector(".dshr-dot");
      if (dot) dot.classList.add(statusDotClass(status));
      if (mount.before) mount.host.insertBefore(btn, mount.before);
      else mount.host.appendChild(btn);
      if (mount.host.id !== "dshr-fallback-host") {
        document.getElementById("dshr-fallback-host")?.remove();
      }
      entryEl = btn;
      options.onMenuVisibleChange?.(true);
    }).catch(() => {
      if (disposed) return;
      const mount = resolveMount();
      const existing = document.querySelector(ENTRY_SELECTOR);
      if (existing) {
        entryEl = existing;
        return;
      }
      entryEl = buildEntry();
      if (mount.before) mount.host.insertBefore(entryEl, mount.before);
      else mount.host.appendChild(entryEl);
    }).finally(() => {
      ensureLock = false;
    });
  };
  let relocateAt = 0;
  observer = new MutationObserver(() => {
    if (disposed) return;
    const existing = document.querySelector(ENTRY_SELECTOR);
    if (!existing) {
      ensureEntry();
      return;
    }
    const now = Date.now();
    if (now - relocateAt < 500) return;
    const tb = findToolbarHost();
    if (tb && existing.parentElement !== tb.host) {
      relocateAt = now;
      ensureEntry();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  const onDocClick = (event) => {
    if (menuEl && !menuEl.contains(event.target) && !entryEl?.contains(event.target)) {
      closeMenu();
    }
  };
  const onKey = (event) => {
    if (event.key === "Escape") closeMenu();
  };
  document.addEventListener("click", onDocClick, true);
  document.addEventListener("keydown", onKey, true);
  const onVisibilityEvent = () => ensureEntry();
  window.addEventListener("dshr:visibility-changed", onVisibilityEvent);
  let attempts = 0;
  const tryMount = () => {
    ensureEntry();
    const existing = document.querySelector(ENTRY_SELECTOR);
    const tb = findToolbarHost();
    const inToolbar = !!existing && !!tb && existing.parentElement === tb.host;
    if (!inToolbar && attempts < 60) {
      attempts += 1;
      setTimeout(tryMount, 500);
    }
  };
  tryMount();
  return () => {
    disposed = true;
    observer?.disconnect();
    document.removeEventListener("click", onDocClick, true);
    document.removeEventListener("keydown", onKey, true);
    window.removeEventListener("dshr:visibility-changed", onVisibilityEvent);
    entryEl?.remove();
    document.getElementById("dshr-fallback-host")?.remove();
    cleanupMenu();
  };
}

// src/client/settings-card.tsx
var import_react = require("react");
function dispatchVisibilityChanged() {
  window.dispatchEvent(new CustomEvent("dshr:visibility-changed"));
}
function CardShell(props) {
  return (0, import_react.createElement)(
    "div",
    { style: { padding: "12px 0" } },
    (0, import_react.createElement)("div", { style: { fontWeight: 600, fontSize: 14, marginBottom: 4 } }, props.title),
    (0, import_react.createElement)("div", { style: { color: "var(--color-text-secondary,#8b949e)", fontSize: 12, marginBottom: 10 } }, props.description),
    props.children
  );
}
function RegionSettingsCard(_props) {
  const [visible, setVisible] = (0, import_react.useState)(null);
  const [busy, setBusy] = (0, import_react.useState)(false);
  const [err, setErr] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    let alive = true;
    fetchStatus().then((s) => {
      if (alive) setVisible(s.menuVisible !== false);
    }).catch(() => {
      if (alive) setVisible(true);
    });
    return () => {
      alive = false;
    };
  }, []);
  const toggle = () => {
    if (visible === null || busy) return;
    const next = !visible;
    setBusy(true);
    setErr(null);
    requestMenuVisible(next).then(() => {
      setVisible(next);
      dispatchVisibilityChanged();
    }).catch((e) => setErr(e instanceof Error ? e.message : String(e))).finally(() => setBusy(false));
  };
  const capsule = (0, import_react.createElement)(
    "button",
    {
      onClick: toggle,
      disabled: visible === null || busy,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 14px",
        borderRadius: 999,
        fontSize: 13,
        cursor: "pointer",
        border: "1px solid var(--color-border-default,rgba(240,246,252,.2))",
        background: visible ? "rgba(63,185,80,.15)" : "transparent",
        color: visible ? "#3fb950" : "var(--color-text-secondary,#8b949e)",
        fontWeight: 600
      },
      "aria-pressed": String(visible === true)
    },
    (0, import_react.createElement)("span", {
      style: { width: 8, height: 8, borderRadius: "50%", background: "currentColor", display: "inline-block" }
    }),
    visible ? zh["card.show"] : zh["card.hide"]
  );
  return CardShell({
    title: zh["card.title"],
    description: zh["card.description"],
    children: (0, import_react.createElement)(
      "div",
      { style: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } },
      (0, import_react.createElement)(
        "div",
        { style: { fontSize: 13 } },
        zh["card.menuVisible"],
        (0, import_react.createElement)("div", { style: { color: "var(--color-text-tertiary,#6e7681)", fontSize: 12 } }, zh["card.menuVisibleDesc"])
      ),
      capsule,
      err ? (0, import_react.createElement)("span", { style: { color: "#f85149", fontSize: 12 } }, err) : null
    )
  });
}

// src/client/index.ts
var name = "dsh-region";
var inject = ["slots"];
var applied = false;
function apply(ctx) {
  if (applied) return;
  applied = true;
  window.addEventListener("dshr:visibility-changed", () => {
  });
  try {
    mountHeaderMenu({
      onMenuVisibleChange: () => dispatchVisibilityChanged()
    });
  } catch (error) {
    console.warn("[dsh-region] header menu mount failed:", error);
  }
  if (ctx.slots?.inject && ctx.slots.register) {
    try {
      ctx.slots.inject(
        "settings.plugin.item",
        () => ctx.slots.register(
          {
            name: "settings.plugin.item",
            key: "region",
            locale: "dsh-region",
            inject: () => ({})
          },
          () => (0, import_react2.createElement)(RegionSettingsCard, {})
        )
      );
    } catch (error) {
      console.warn("[dsh-region] settings card register failed:", error);
    }
  }
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NsaWVudC9pbmRleC50cyIsICJzcmMvY2xpZW50L2hvc3QtYXBpLnRzIiwgInNyYy9jbGllbnQvbG9jYWxlcy50cyIsICJzcmMvY2xpZW50L2hlYWRlci1tZW51LnRzIiwgInNyYy9jbGllbnQvc2V0dGluZ3MtY2FyZC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogZHNoLXJlZ2lvbiBjbGllbnQgYnVuZGxlIFx1NTE2NVx1NTNFM1x1MzAwMlxuICpcbiAqIFx1NjMwMlx1OEY3RFx1NEUyNFx1NTkwNCBVSVx1RkYxQVxuICogIDEuIFx1NTNGM1x1NEUwQVx1ODlEMlx1NkU5MFx1N0JBMVx1NzQwNlx1ODNEQ1x1NTM1NVx1RkYwOFx1N0VBRiBET00gXHU2Q0U4XHU1MTY1XHVGRjBDXHU4OUMxIGhlYWRlci1tZW51LnRzXHVGRjA5XG4gKiAgMi4gXHU4QkJFXHU3RjZFXHU5ODc1XHUzMDBDZHNoLXJlZ2lvbiBcdTZFOTBcdTdCQTFcdTc0MDZcdTMwMERcdTUzNjFcdTcyNDdcdUZGMDhSZWFjdFx1RkYwQ1x1NUI5OFx1NjVCOSBzZXR0aW5ncy5wbHVnaW4uaXRlbSBcdTY5RkRcdTRGNERcdUZGMENcbiAqICAgICBcdTVENENcdTU5NTcgaW5qZWN0IHNldHRpbmdzU2NvcGVcdTIwMTRcdTIwMTRcdTY1RTcgaG9zdCBcdTY1RTBcdTZCNjRcdTY3MERcdTUyQTFcdTY1RjZcdTUzNjFcdTcyNDdcdTk3NTlcdTlFRDhcdTRFMERcdTUxRkFcdTczQjBcdUZGMDlcbiAqXG4gKiBcdTk0QzFcdTVGOEJcdUZGMUFcdTRFRkJcdTRGNTVcdTYzMDJcdThGN0RcdTU5MzFcdThEMjVcdTUzRUEgY29uc29sZS53YXJuXHVGRjBDXHU3RUREXHU0RTBEIHRocm93XHVGRjA4XHU1OTE2XHU5MEU4XHU2M0QyXHU0RUY2XHU0RTBEXHU4MEZEXHU2MkQ2XHU1N0FFIERTSCBcdTU0MkZcdTUyQThcdUZGMDlcdTMwMDJcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IGFzIGggfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IG1vdW50SGVhZGVyTWVudSB9IGZyb20gJy4vaGVhZGVyLW1lbnUuanMnXG5pbXBvcnQgeyBSZWdpb25TZXR0aW5nc0NhcmQsIGRpc3BhdGNoVmlzaWJpbGl0eUNoYW5nZWQgfSBmcm9tICcuL3NldHRpbmdzLWNhcmQuanMnXG5cbmV4cG9ydCBjb25zdCBuYW1lID0gJ2RzaC1yZWdpb24nXG5cbi8qKiBcdTU4RjBcdTY2MEVcdTk3MDBcdTg5ODFcdTc2ODQgY2xpZW50IFx1NjcwRFx1NTJBMVx1RkYxQXNsb3RzXHVGRjA4VUkgXHU2Q0U4XHU1MTY1XHU2ODM4XHU1RkMzXHVGRjA5XHUzMDAyXG4gKiAgXHU2Q0U4XHU2MTBGXHVGRjFBc2V0dGluZ3NTY29wZSBcdTRFMERcdTRGNUNcdTRFM0FcdTk4NzZcdTVDNDJcdTc4NkNcdTRGOURcdThENTZcdTIwMTRcdTIwMTRcdTVGNTNcdTUyNEQgZHNoIGhvc3RcdUZGMDgwLjIuMS1yYy4yXHVGRjA5XHU0RTBEXHU2M0QwXHU0RjlCXHU4QkU1XHU2NzBEXHU1MkExXHVGRjBDXG4gKiAgXHU1MTk5XHU1NzI4XHU5ODc2XHU1QzQyXHU0RjFBXHU4QkE5XHU2NTc0XHU0RTJBIGNsaWVudCBcdTY3NjFcdTc2RUVcdTZDMzhcdTRFNDUgcGVuZGluZ1x1RkYwQ1x1OEZEQlx1ODAwQ1x1NjJENlx1NTdBRSB3ZWIgYm9vdFx1RkYwOFwiMSBlbnRyeSBkaWQgbm90IGFjdGl2YXRlXCJcdUZGMDlcdTMwMDJcbiAqICBcdThCQkVcdTdGNkVcdTk4NzVcdTUzNjFcdTcyNDdcdTY1MzlcdTc1MzFcdTRFMEJcdTY1QjkgY3R4LmluamVjdChbJ3NldHRpbmdzU2NvcGUnXSwgLi4uKSBcdThGNkZcdTRGOURcdThENTZcdTVDMURcdThCRDVcdUZGMENcdTdGM0FcdTU5MzFcdTY1RjZcdTk3NTlcdTlFRDhcdThERjNcdThGQzdcdTMwMDIgKi9cbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJ11cblxuLyoqIFx1OTYzMlx1OTFDRFx1NTkwRFx1RkYxQVx1NTQwQ1x1NEUwMFx1OTg3NVx1OTc2Mlx1NzUxRlx1NTQ3RFx1NTQ2OFx1NjcxRlx1NTE4NVx1NTNFQVx1NUU5NFx1NzUyOFx1NEUwMFx1NkIyMVx1MzAwMiAqL1xubGV0IGFwcGxpZWQgPSBmYWxzZVxuXG5pbnRlcmZhY2UgQ2xpZW50Q3R4IHtcbiAgaW5qZWN0PyhkZXBzOiBzdHJpbmdbXSwgY2I6IChzY29wZWQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkKTogdm9pZFxuICBzbG90cz86IHtcbiAgICBpbmplY3Q/KHNsb3Q6IHN0cmluZywgcmVnaXN0ZXI6ICgpID0+IHVua25vd24pOiB2b2lkXG4gICAgcmVnaXN0ZXI/KG1ldGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBjb21wb25lbnQ6ICgpID0+IHVua25vd24pOiB1bmtub3duXG4gIH1cbiAgZWZmZWN0PyhmbjogKCkgPT4gdW5rbm93biwgbGFiZWw6IHN0cmluZyk6IHVua25vd25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KGN0eDogQ2xpZW50Q3R4KTogdm9pZCB7XG4gIGlmIChhcHBsaWVkKSByZXR1cm5cbiAgYXBwbGllZCA9IHRydWVcblxuICAvLyBcdTgzRENcdTUzNTVcdTY2M0VcdTk2OTBcdTc1MzEgc2VydmVyIFx1NzJCNlx1NjAwMVx1OUE3MVx1NTJBOFx1RkYxQlx1OEJCRVx1N0Y2RVx1OTg3NVx1ODBGNlx1NTZDQVx1NTIwN1x1NjM2Mlx1NTQwRVx1N0VDRiB3aW5kb3cgXHU0RThCXHU0RUY2XHU5MDFBXHU3N0U1XHU5MUNEXHU4QkM0XHU0RjMwXHUzMDAyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkc2hyOnZpc2liaWxpdHktY2hhbmdlZCcsICgpID0+IHtcbiAgICAvLyBoZWFkZXItbWVudSBcdTUxODVcdTkwRThcdTVERjJcdTc2RDFcdTU0MkNcdTU0MENcdTU0MERcdTRFOEJcdTRFRjZcdTUwNUEgZW5zdXJlRW50cnlcdUZGMUJcdTZCNjRcdTU5MDRcdTRFQzVcdTUxNUNcdTVFOTVcdTg5RTZcdTUzRDFcdTRFMDBcdTZCMjFcdTMwMDJcbiAgICB2b2lkIDBcbiAgfSlcblxuICB0cnkge1xuICAgIG1vdW50SGVhZGVyTWVudSh7XG4gICAgICBvbk1lbnVWaXNpYmxlQ2hhbmdlOiAoKSA9PiBkaXNwYXRjaFZpc2liaWxpdHlDaGFuZ2VkKCksXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLndhcm4oJ1tkc2gtcmVnaW9uXSBoZWFkZXIgbWVudSBtb3VudCBmYWlsZWQ6JywgZXJyb3IpXG4gIH1cblxuICAvLyBcdThCQkVcdTdGNkVcdTk4NzVcdTUzNjFcdTcyNDdcdUZGMUFcdTc1MjggY3R4LnNsb3RzXHVGRjA4aW5qZWN0IFx1NThGMFx1NjYwRVx1NTQwRVx1NTNFRlx1NzUyOFx1RkYwOVx1NkNFOFx1NTE4Q1x1NTIzMFx1NUI5OFx1NjVCOSBzZXR0aW5ncy5wbHVnaW4uaXRlbSBcdTY5RkRcdTRGNERcdTMwMDJcbiAgLy8gXHU2Q0U4XHVGRjFBXHU1RjUzXHU1MjREIERTSCBcdTcyNDhcdTY3MkNcdTc2ODRcdThCQkVcdTdGNkUgVUkgXHU2NzJBXHU2RTMyXHU2N0QzXHU4QkU1XHU2OUZEXHU0RjREXHVGRjBDXHU1MzYxXHU3MjQ3XHU2NjgyXHU0RTBEXHU1M0VGXHU4OUMxXHVGRjFCXHU0RUUzXHU3ODAxXHU0RkREXHU3NTU5XHVGRjBDXHU2OUZEXHU0RjREXHU1MTdDXHU1QkI5XHU1NDBFXHU4MUVBXHU1MkE4XHU1MUZBXHU3M0IwXHUzMDAyXG4gIGlmIChjdHguc2xvdHM/LmluamVjdCAmJiBjdHguc2xvdHMucmVnaXN0ZXIpIHtcbiAgICB0cnkge1xuICAgICAgY3R4LnNsb3RzLmluamVjdCgnc2V0dGluZ3MucGx1Z2luLml0ZW0nLCAoKSA9PlxuICAgICAgICBjdHguc2xvdHMucmVnaXN0ZXIhKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdzZXR0aW5ncy5wbHVnaW4uaXRlbScsXG4gICAgICAgICAgICBrZXk6ICdyZWdpb24nLFxuICAgICAgICAgICAgbG9jYWxlOiAnZHNoLXJlZ2lvbicsXG4gICAgICAgICAgICBpbmplY3Q6ICgpID0+ICh7fSksXG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiBoKFJlZ2lvblNldHRpbmdzQ2FyZCwge30pLFxuICAgICAgICApLFxuICAgICAgKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tkc2gtcmVnaW9uXSBzZXR0aW5ncyBjYXJkIHJlZ2lzdGVyIGZhaWxlZDonLCBlcnJvcilcbiAgICB9XG4gIH1cbn1cbiIsICIvKipcbiAqIGhvc3QtYXBpIFx1MjAxNFx1MjAxNCBjbGllbnQgXHU0RTBFIGhvc3QgXHU3QUVGIFJlZ2lvblNlcnZpY2UgXHU3Njg0IEhUVFAgXHU5MDFBXHU0RkUxXHUzMDAyXG4gKiBcdThENzBcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcdUZGMDhcdTU0MENcdTZFOTBcdUZGMDlcdUZGMENcdTc1MzEgRFNIIHdlYiBzZXJ2ZXIgXHU4RjZDXHU1M0QxXHU1MjMwXHU2M0QyXHU0RUY2XHU4REVGXHU3NTMxXHUzMDAyXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBQcm9iZVJlc3VsdCB7XG4gIG9rOiBib29sZWFuXG4gIG1zOiBudW1iZXJcbiAgZXJyb3I/OiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWdpb25TdGF0dXMge1xuICBtb2RlOiAnYXV0bycgfCAnbWFpbicgfCAnYmFja3VwJ1xuICBhcHBsaWVkUmVnaXN0cnk6IHN0cmluZyB8IG51bGxcbiAgbWFpblJlZ2lzdHJ5OiBzdHJpbmdcbiAgYmFja3VwUmVnaXN0cnk6IHN0cmluZ1xuICBsYXN0RXJyb3I6IHN0cmluZyB8IG51bGxcbiAgbGFzdFN3aXRjaEF0OiBzdHJpbmcgfCBudWxsXG4gIG1lbnVWaXNpYmxlOiBib29sZWFuXG4gIG1haW46IFByb2JlUmVzdWx0IHwgbnVsbFxuICBiYWNrdXA6IFByb2JlUmVzdWx0IHwgbnVsbFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZVJlc3VsdCB7XG4gIG9rOiBib29sZWFuXG4gIG1lc3NhZ2U6IHN0cmluZ1xufVxuXG4vLyBcdTc1MjggbG9jYXRpb24ub3JpZ2luIFx1NjJGQ1x1N0VERFx1NUJGOSBVUkxcdUZGMUFEU0ggXHU5ODc1XHU5NzYyXHU3M0FGXHU1ODgzXHU0RTBCXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0IGZldGNoIFx1NEYxQVx1NjMwMlx1OEQ3N1x1RkYwOFx1NUI5RVx1NkQ0Qlx1RkYwOVx1RkYwQ1xuLy8gXHU3RUREXHU1QkY5IFVSTCBcdTZCNjNcdTVFMzhcdTMwMDJvcmlnaW4gXHU1MkE4XHU2MDAxXHU4M0I3XHU1M0Q2XHVGRjBDRFNIIFx1NjM2Mlx1N0FFRlx1NTNFM1x1NEU1Rlx1OTAwMlx1OTE0RFx1MzAwMlxuY29uc3QgQkFTRSA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2RzaC1yZWdpb25gXG5cbmFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RKc29uPFQ+KHBhdGg6IHN0cmluZywgaW5pdD86IFJlcXVlc3RJbml0KTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0V9JHtwYXRofWAsIHtcbiAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAuLi5pbml0LFxuICB9KVxuICBpZiAoIXJlcy5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCAke3Jlcy5zdGF0dXN9YClcbiAgfVxuICByZXR1cm4gKGF3YWl0IHJlcy5qc29uKCkpIGFzIFRcbn1cblxuLyoqIFx1NjJDOVx1NTNENlx1NzJCNlx1NjAwMVx1MzAwMnByb2JlPXRydWUgXHU2NUY2IHNlcnZlciBcdTVCOUVcdTY1RjZcdTYzQTJcdTZENEJcdTUzQ0NcdTZFOTBcdUZGMDhcdTgzRENcdTUzNTVcdTMwMENcdTdBQ0JcdTUzNzNcdTZENEJcdTkwMUZcdTMwMERcdUZGMDlcdUZGMUJcdTlFRDhcdThCQTRcdThGRDRcdTU2REVcdTdGMTNcdTVCNThcdUZGMENcdTc5RDJcdTU2REVcdTMwMDIgKi9cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFN0YXR1cyhwcm9iZSA9IGZhbHNlKTogUHJvbWlzZTxSZWdpb25TdGF0dXM+IHtcbiAgcmV0dXJuIHJlcXVlc3RKc29uPFJlZ2lvblN0YXR1cz4oYC9zdGF0dXMke3Byb2JlID8gJz9wcm9iZT0xJyA6ICcnfWApXG59XG5cbi8qKiBcdTUyMDdcdTYzNjJcdTZBMjFcdTVGMEYgYXV0b3xtYWlufGJhY2t1cFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RNb2RlKG1vZGU6ICdhdXRvJyB8ICdtYWluJyB8ICdiYWNrdXAnKTogUHJvbWlzZTxVc2VSZXN1bHQ+IHtcbiAgcmV0dXJuIHJlcXVlc3RKc29uPFVzZVJlc3VsdD4oJy91c2UnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtb2RlIH0pLFxuICB9KVxufVxuXG4vKiogXHU4QkJFXHU3RjZFXHU1M0YzXHU0RTBBXHU4OUQyXHU4M0RDXHU1MzU1XHU2NjNFXHU5NjkwXHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdE1lbnVWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiBQcm9taXNlPHsgb2s6IGJvb2xlYW47IHZpc2libGU6IGJvb2xlYW4gfT4ge1xuICByZXR1cm4gcmVxdWVzdEpzb24oJy9tZW51Jywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdmlzaWJsZSB9KSxcbiAgfSlcbn1cbiIsICIvKipcbiAqIGRzaC1yZWdpb24gY2xpZW50IFx1NjU4N1x1Njg0OCBcdTIwMTRcdTIwMTQgXHU0RTJEXHU4MkYxXHU1M0NDXHU4QkVEXHU5NkM2XHU0RTJEXHU3QkExXHU3NDA2XHVGRjA4XHU5RUQ4XHU4QkE0XHU0RTJEXHU2NTg3XHVGRjBDXHU2M0QyXHU0RUY2XHU5NzYyXHU1NDExXHU1NkZEXHU1MTg1XHU3NTI4XHU2MjM3XHVGRjA5XHUzMDAyXG4gKi9cblxuZXhwb3J0IHR5cGUgUmVnaW9uS2V5ID1cbiAgfCAnbWVudS50aXRsZSdcbiAgfCAnbWVudS5zdGF0dXNHcmVlbidcbiAgfCAnbWVudS5zdGF0dXNZZWxsb3cnXG4gIHwgJ21lbnUuc3RhdHVzUmVkJ1xuICB8ICdtZW51LnN0YXR1c1Vua25vd24nXG4gIHwgJ21lbnUuYXV0bydcbiAgfCAnbWVudS5tYWluJ1xuICB8ICdtZW51LmJhY2t1cCdcbiAgfCAnbWVudS5wcm9iZSdcbiAgfCAnbWVudS5jdXJyZW50J1xuICB8ICdtZW51LmhpZGRlbidcbiAgfCAnY2FyZC50aXRsZSdcbiAgfCAnY2FyZC5kZXNjcmlwdGlvbidcbiAgfCAnY2FyZC5tZW51VmlzaWJsZSdcbiAgfCAnY2FyZC5tZW51VmlzaWJsZURlc2MnXG4gIHwgJ2NhcmQuc2hvdydcbiAgfCAnY2FyZC5oaWRlJ1xuICB8ICdlcnIuZmV0Y2hGYWlsZWQnXG5cbmV4cG9ydCBjb25zdCB6aDogUmVjb3JkPFJlZ2lvbktleSwgc3RyaW5nPiA9IHtcbiAgJ21lbnUudGl0bGUnOiAnZHNoLXJlZ2lvbiBcdTZFOTBcdTdCQTFcdTc0MDYnLFxuICAnbWVudS5zdGF0dXNHcmVlbic6ICdcdTRFM0JcdTZFOTBcdTZCNjNcdTVFMzhcdUZGMENcdTVGNTNcdTUyNERcdTRGN0ZcdTc1MjhcdTU2RkRcdTUxODVcdTk1NUNcdTUwQ0YnLFxuICAnbWVudS5zdGF0dXNZZWxsb3cnOiAnXHU0RTNCXHU2RTkwXHU0RTBEXHU1M0VGXHU3NTI4XHVGRjBDXHU1REYyXHU4MUVBXHU1MkE4XHU1MjA3XHU1MjMwXHU1Qjk4XHU2NUI5XHU2RTkwJyxcbiAgJ21lbnUuc3RhdHVzUmVkJzogJ1x1NTZGRFx1NTE4NVx1OTU1Q1x1NTBDRlx1NEUwRVx1NUI5OFx1NjVCOVx1NkU5MFx1NTc0N1x1NEUwRFx1NTNFRlx1NzUyOCcsXG4gICdtZW51LnN0YXR1c1Vua25vd24nOiAnXHU3MkI2XHU2MDAxXHU2NzJBXHU3N0U1XHVGRjBDXHU3MEI5XHU1MUZCXHUzMDBDXHU3QUNCXHU1MzczXHU2RDRCXHU5MDFGXHUzMDBEXHU2OEMwXHU2RDRCJyxcbiAgJ21lbnUuYXV0byc6ICdcdTgxRUFcdTUyQThcdTUyMDdcdTYzNjInLFxuICAnbWVudS5tYWluJzogJ1x1NTZGRFx1NTE4NVx1OTU1Q1x1NTBDRicsXG4gICdtZW51LmJhY2t1cCc6ICdcdTVCOThcdTY1QjlcdTZFOTAnLFxuICAnbWVudS5wcm9iZSc6ICdcdTdBQ0JcdTUzNzNcdTZENEJcdTkwMUYnLFxuICAnbWVudS5jdXJyZW50JzogJ1x1NUY1M1x1NTI0RCcsXG4gICdtZW51LmhpZGRlbic6ICdcdUZGMDhcdTgzRENcdTUzNTVcdTVERjJcdTk2OTBcdTg1Q0ZcdUZGMENcdTUzRUZcdTU3MjhcdThCQkVcdTdGNkVcdTRFMkRcdTVGMDBcdTU0MkZcdUZGMDknLFxuICAnY2FyZC50aXRsZSc6ICdkc2gtcmVnaW9uIFx1NkU5MFx1N0JBMVx1NzQwNicsXG4gICdjYXJkLmRlc2NyaXB0aW9uJzogJ0RTSCBcdTRFMEJcdThGN0RcdTZFOTBcdTRFM0JcdTU5MDdcdTUyMDdcdTYzNjJcdUZGMUFcdTU2RkRcdTUxODVcdTk1NUNcdTUwQ0ZcdTRFM0FcdTRFM0JcdTMwMDFcdTVCOThcdTY1QjlcdTZFOTBcdTRFM0FcdTU5MDdcdUZGMENcdTY1NDVcdTk2OUNcdTgxRUFcdTUyQThcdTUyMDdcdTYzNjInLFxuICAnY2FyZC5tZW51VmlzaWJsZSc6ICdcdTUzRjNcdTRFMEFcdTg5RDJcdTZFOTBcdTdCQTFcdTc0MDZcdTgzRENcdTUzNTUnLFxuICAnY2FyZC5tZW51VmlzaWJsZURlc2MnOiAnXHU1NzI4XHU0RjFBXHU4QkREXHU5ODc1XHU1M0YzXHU0RTBBXHU4OUQyXHVGRjA4XHU0RTBCXHU4RjdEIExvZyBcdTVERTZcdTRGQTdcdUZGMDlcdTY2M0VcdTc5M0FcdTZFOTBcdTdCQTFcdTc0MDZcdTRFMEJcdTYyQzlcdTgzRENcdTUzNTUnLFxuICAnY2FyZC5zaG93JzogJ1x1NjYzRVx1NzkzQScsXG4gICdjYXJkLmhpZGUnOiAnXHU5NjkwXHU4NUNGJyxcbiAgJ2Vyci5mZXRjaEZhaWxlZCc6ICdcdThGREVcdTYzQTUgZHNoLXJlZ2lvbiBcdTY3MERcdTUyQTFcdTU5MzFcdThEMjUnLFxufVxuXG5leHBvcnQgY29uc3QgZW46IFJlY29yZDxSZWdpb25LZXksIHN0cmluZz4gPSB7XG4gICdtZW51LnRpdGxlJzogJ2RzaC1yZWdpb24gc291cmNlcycsXG4gICdtZW51LnN0YXR1c0dyZWVuJzogJ1ByaW1hcnkgaGVhbHRoeSwgdXNpbmcgQ2hpbmEgbWlycm9yJyxcbiAgJ21lbnUuc3RhdHVzWWVsbG93JzogJ1ByaW1hcnkgZG93biwgc3dpdGNoZWQgdG8gb2ZmaWNpYWwgcmVnaXN0cnknLFxuICAnbWVudS5zdGF0dXNSZWQnOiAnQm90aCByZWdpc3RyaWVzIHVucmVhY2hhYmxlJyxcbiAgJ21lbnUuc3RhdHVzVW5rbm93bic6ICdVbmtub3duIFx1MjAxNCBjbGljayBcIlByb2JlXCIgdG8gY2hlY2snLFxuICAnbWVudS5hdXRvJzogJ0F1dG8nLFxuICAnbWVudS5tYWluJzogJ0NoaW5hIG1pcnJvcicsXG4gICdtZW51LmJhY2t1cCc6ICdPZmZpY2lhbCByZWdpc3RyeScsXG4gICdtZW51LnByb2JlJzogJ1Byb2JlIG5vdycsXG4gICdtZW51LmN1cnJlbnQnOiAnY3VycmVudCcsXG4gICdtZW51LmhpZGRlbic6ICcobWVudSBoaWRkZW4gXHUyMDE0IGVuYWJsZSBpdCBpbiBzZXR0aW5ncyknLFxuICAnY2FyZC50aXRsZSc6ICdkc2gtcmVnaW9uIHNvdXJjZSBtYW5hZ2VyJyxcbiAgJ2NhcmQuZGVzY3JpcHRpb24nOiAnRFNIIHJlZ2lzdHJ5IGZhaWxvdmVyOiBDaGluYSBtaXJyb3IgcHJpbWFyeSwgb2ZmaWNpYWwgYmFja3VwLCBhdXRvLXN3aXRjaCcsXG4gICdjYXJkLm1lbnVWaXNpYmxlJzogJ1NvdXJjZSBtZW51IGluIGhlYWRlcicsXG4gICdjYXJkLm1lbnVWaXNpYmxlRGVzYyc6ICdTaG93IHRoZSBzb3VyY2UgZHJvcGRvd24gbmV4dCB0byBcIlNlc3Npb24gbG9nXCIgaW4gdGhlIGhlYWRlcicsXG4gICdjYXJkLnNob3cnOiAnU2hvdycsXG4gICdjYXJkLmhpZGUnOiAnSGlkZScsXG4gICdlcnIuZmV0Y2hGYWlsZWQnOiAnRmFpbGVkIHRvIHJlYWNoIGRzaC1yZWdpb24gc2VydmljZScsXG59XG4iLCAiLyoqXG4gKiBoZWFkZXItbWVudSBcdTIwMTRcdTIwMTQgXHU1M0YzXHU0RTBBXHU4OUQyXHUzMDBDXHU0RTBCXHU4RjdEIExvZ1x1MzAwRFx1NURFNlx1NEZBN1x1NzY4NFx1NkU5MFx1N0JBMVx1NzQwNlx1NEUwQlx1NjJDOVx1ODNEQ1x1NTM1NVx1MzAwMlxuICpcbiAqIFx1N0VBRiBET00gXHU2Q0U4XHU1MTY1XHVGRjA4XHU0RTBEXHU2MzAyIFJlYWN0IFx1NjgxMVx1RkYwOVx1RkYwQ1x1NkEyMVx1NEVGRiBsaW54aW42NjYvZHNoLXdlYi11aSBcdTc2ODQgc2lkZWJhci1lbnRyeSBcdTZBMjFcdTVGMEZcdUZGMUFcbiAqICAtIFx1NUI5QVx1NEY0RFx1OTUxQVx1NzBCOVx1RkYxQVNlc3Npb24gbG9nIFx1NjMwOVx1OTRBRVx1RkYwOGNsYXNzIFx1NTQyQiBzZXNzaW9uTG9nXHVGRjBDXHU2MjE2XHU2NTg3XHU2NzJDXHU1MzM5XHU5MTREXHVGRjA5XHVGRjBDXHU1NzI4XHU1MTc2XHU1MjREXHU2M0QyXHU1MTY1XG4gKiAgLSBcdTgxRUFcdTYxMDhcdUZGMUFNdXRhdGlvbk9ic2VydmVyIFx1NzZEMVx1NTQyQ1x1RkYwQ1JlYWN0IFx1OTFDRFx1NkUzMlx1NjdEM1x1NzlGQlx1OTY2NFx1NTQwRVx1ODFFQVx1NTJBOFx1OTFDRFx1NjNEMlxuICogIC0gXHU3MkI2XHU2MDAxXHU3MDZGXHVGRjFBXHU3RUZGL1x1OUVDNC9cdTdFQTIgKyB0b29sdGlwIFx1OEJGNFx1NjYwRVxuICogIC0gXHU4M0RDXHU1MzU1XHU5ODc5XHU1RTI2XHU2M0EyXHU2RDRCXHU4MDE3XHU2NUY2XHVGRjBDXHU1MjA3XHU2MzYyXHU4QzAzIGhvc3QgQVBJXG4gKiAgLSBcdTY2M0VcdTk2OTBcdTc1MzEgc2VydmVyIFx1N0FFRiByZWdpb24uanNvbiBcdTYzQTdcdTUyMzZcdUZGMDhtZW51VmlzaWJsZT1mYWxzZSBcdTY1RjZcdTY1NzRcdTRFMkFcdTYzMDlcdTk0QUVcdTRFMERcdTZFMzJcdTY3RDNcdUZGMDlcbiAqXG4gKiBcdTk0QzFcdTVGOEJcdUZGMUFcdTRFRkJcdTRGNTUgRE9NIFx1NjRDRFx1NEY1Q1x1NTkzMVx1OEQyNVx1NTNFQSBjb25zb2xlLndhcm5cdUZGMENcdTdFRERcdTRFMEQgdGhyb3dcdUZGMDhcdTRFMERcdTgwRkRcdTYyRDZcdTU3QUUgRFNIIFx1NTQyRlx1NTJBOFx1RkYwOVx1MzAwMlxuICovXG5cbmltcG9ydCB7IGZldGNoU3RhdHVzLCByZXF1ZXN0TW9kZSwgdHlwZSBSZWdpb25TdGF0dXMgfSBmcm9tICcuL2hvc3QtYXBpLmpzJ1xuaW1wb3J0IHsgemggfSBmcm9tICcuL2xvY2FsZXMuanMnXG5cbmV4cG9ydCBjb25zdCBFTlRSWV9TRUxFQ1RPUiA9ICdbZGF0YS1kc2gtcmVnaW9uLWVudHJ5XSdcblxuY29uc3QgQ1NTID0gYFxuLmRzaHItZW50cnl7ZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoyOHB4O2hlaWdodDoyOHB4O21hcmdpbjowIDJweDtwYWRkaW5nOjA7Ym9yZGVyOm5vbmU7Ym9yZGVyLXJhZGl1czo2cHg7YmFja2dyb3VuZDp0cmFuc3BhcmVudDtjb2xvcjp2YXIoLS1jb2xvci10ZXh0LXNlY29uZGFyeSwjOGI5NDllKTtjdXJzb3I6cG9pbnRlcjtwb3NpdGlvbjpyZWxhdGl2ZX1cbi5kc2hyLWVudHJ5OmhvdmVye2JhY2tncm91bmQ6Y29sb3ItbWl4KGluIHNyZ2IsY3VycmVudENvbG9yIDEyJSx0cmFuc3BhcmVudCl9XG4uZHNoci1lbnRyeSAuZHNoci1kb3R7cG9zaXRpb246YWJzb2x1dGU7dG9wOjRweDtyaWdodDo0cHg7d2lkdGg6N3B4O2hlaWdodDo3cHg7Ym9yZGVyLXJhZGl1czo1MCU7Ym9yZGVyOjEuNXB4IHNvbGlkIHZhcigtLWNvbG9yLWJnLXByaW1hcnksIzBkMTExNyl9XG4uZHNoci1kb3QuZ3JlZW57YmFja2dyb3VuZDojM2ZiOTUwfS5kc2hyLWRvdC55ZWxsb3d7YmFja2dyb3VuZDojZDI5OTIyfS5kc2hyLWRvdC5yZWR7YmFja2dyb3VuZDojZjg1MTQ5fS5kc2hyLWRvdC5ncmF5e2JhY2tncm91bmQ6IzhiOTQ5ZX1cbi5kc2hyLW1lbnV7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDo5OTk5O21pbi13aWR0aDoyMzBweDtwYWRkaW5nOjZweDtib3JkZXItcmFkaXVzOjEwcHg7YmFja2dyb3VuZDp2YXIoLS1jb2xvci1iZy1lbGV2YXRlZCwjMTYxYjIyKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWNvbG9yLWJvcmRlci1kZWZhdWx0LHJnYmEoMjQwLDI0NiwyNTIsLjEyKSk7Ym94LXNoYWRvdzowIDhweCAyNHB4IHJnYmEoMSw0LDksLjQpO2ZvbnQtc2l6ZToxM3B4O2NvbG9yOnZhcigtLWNvbG9yLXRleHQtcHJpbWFyeSwjZTZlZGYzKTthbmltYXRpb246ZHNockluIC4xMnMgZWFzZS1vdXR9XG5Aa2V5ZnJhbWVzIGRzaHJJbntmcm9te29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNHB4KX10b3tvcGFjaXR5OjE7dHJhbnNmb3JtOm5vbmV9fVxuLmRzaHItbWVudS1oZWFke2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDtwYWRkaW5nOjZweCA4cHggOHB4O2ZvbnQtd2VpZ2h0OjYwMDtib3JkZXItYm90dG9tOjFweCBzb2xpZCB2YXIoLS1jb2xvci1ib3JkZXItZGVmYXVsdCxyZ2JhKDI0MCwyNDYsMjUyLC4xKSk7Y3Vyc29yOmhlbHB9XG4uZHNoci1tZW51LWhlYWQgLmRzaHItaGRvdHt3aWR0aDo4cHg7aGVpZ2h0OjhweDtib3JkZXItcmFkaXVzOjUwJTtmbGV4Om5vbmV9XG4uZHNoci1pdGVte2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Z2FwOjhweDt3aWR0aDoxMDAlO3BhZGRpbmc6N3B4IDhweDtib3JkZXI6bm9uZTtib3JkZXItcmFkaXVzOjdweDtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O2NvbG9yOmluaGVyaXQ7Zm9udC1zaXplOjEzcHg7Y3Vyc29yOnBvaW50ZXI7dGV4dC1hbGlnbjpsZWZ0fVxuLmRzaHItaXRlbTpob3ZlcntiYWNrZ3JvdW5kOmNvbG9yLW1peChpbiBzcmdiLGN1cnJlbnRDb2xvciAxMCUsdHJhbnNwYXJlbnQpfVxuLmRzaHItaXRlbSAuZHNoci1tc3tjb2xvcjp2YXIoLS1jb2xvci10ZXh0LXRlcnRpYXJ5LCM2ZTc2ODEpO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtdmFyaWFudC1udW1lcmljOnRhYnVsYXItbnVtc31cbi5kc2hyLWl0ZW0gLmRzaHItY3Vye2NvbG9yOiMzZmI5NTA7Zm9udC1zaXplOjExcHg7bWFyZ2luLWxlZnQ6NHB4fVxuLmRzaHItc2Vwe2hlaWdodDoxcHg7bWFyZ2luOjVweCA2cHg7YmFja2dyb3VuZDp2YXIoLS1jb2xvci1ib3JkZXItZGVmYXVsdCxyZ2JhKDI0MCwyNDYsMjUyLC4wOCkpfVxuLmRzaHItcHJvYmV7anVzdGlmeS1jb250ZW50OmNlbnRlcjtjb2xvcjp2YXIoLS1jb2xvci10ZXh0LXNlY29uZGFyeSwjOGI5NDllKX1cbi5kc2hyLXByb2JlOmhvdmVye2NvbG9yOnZhcigtLWNvbG9yLXRleHQtcHJpbWFyeSwjZTZlZGYzKX1cbi5kc2hyLWZhbGxiYWNrLWhvc3R7cG9zaXRpb246Zml4ZWQ7dG9wOjU2cHg7cmlnaHQ6MTZweDt6LWluZGV4OjIxNDc0ODMwMDA7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6MnB4O3BhZGRpbmc6MnB4O2JvcmRlci1yYWRpdXM6OHB4O2JhY2tncm91bmQ6Y29sb3ItbWl4KGluIHNyZ2IsdmFyKC0tY29sb3ItYmctZWxldmF0ZWQsIzE2MWIyMikgODglLHRyYW5zcGFyZW50KTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWNvbG9yLWJvcmRlci1kZWZhdWx0LHJnYmEoMjQwLDI0NiwyNTIsLjEyKSk7Ym94LXNoYWRvdzowIDJweCA4cHggcmdiYSgxLDQsOSwuMjUpfVxuYFxuXG5pbnRlcmZhY2UgSGVhZGVyTWVudU9wdGlvbnMge1xuICAvKiogXHU1OTE2XHU5MEU4XHU5MDFBXHU3N0U1XHU3MkI2XHU2MDAxXHU1MjM3XHU2NUIwXHVGRjA4XHU4QkJFXHU3RjZFXHU5ODc1XHU4MEY2XHU1NkNBXHU5NzAwXHU4OTgxXHVGRjA5XHUzMDAyICovXG4gIG9uTWVudVZpc2libGVDaGFuZ2U/OiAodmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZFxufVxuXG4vKipcbiAqIFx1NUI5QVx1NEY0RFx1NUJCRlx1NEUzQlx1OTUxQVx1NzBCOVx1NjMwOVx1OTRBRVx1MzAwMlxuICpcbiAqIFx1NTM4Nlx1NTNGMlx1NjU1OVx1OEJBRFx1RkYxQVx1NjVFN1x1NzI0OCBkc2ggXHU1NzI4XHU1M0YzXHU0RTBBXHU4OUQyXHU2NzA5XHUzMDBDXHU0RTBCXHU4RjdEXHU2NUU1XHU1RkQ3XHUzMDBEXHU2MzA5XHU5NEFFXHVGRjBDXHU2NUIwXHU3MjQ4XHU2MjhBXHU1QjgzXHU2MzJBXHU4RkRCXHU0RTg2IGNvbXBvc2VyIFx1NzY4NFxuICogYCtgIC8gYC9gIFx1NTQ3RFx1NEVFNFx1ODNEQ1x1NTM1NVx1RkYwOGxvY2FsZSBcdTk1MkUgbGFiZWwuZXhwb3J0ID0gXHU0RTBCXHU4RjdEXHU2NUU1XHU1RkQ3XHVGRjBDXHU5RUQ4XHU4QkE0XHU0RTBEXHU2RTMyXHU2N0QzXHVGRjA5XHVGRjBDXG4gKiBcdTRFOEVcdTY2MkZcdTgwMDFcdTk1MUFcdTcwQjlcdTZDMzhcdThGRENcdTUzMzlcdTkxNERcdTRFMERcdTUyMzAgXHUyMTkyIFx1NTE2NVx1NTNFM1x1NjU3NFx1NTc1N1x1OTc1OVx1OUVEOFx1NkQ4OFx1NTkzMVx1MzAwMlx1NjU0NVx1OEZEOVx1OTFDQ1x1NTA1QVx1NEUwOVx1N0VBN1x1NUJCRFx1NTMzOVx1OTE0RFx1RkYwQ1xuICogXHU0RTE0XHU4QzAzXHU3NTI4XHU2NUI5XHU1NzI4XHU1MTY4XHU5MEU4XHU4NDNEXHU3QTdBXHU2NUY2XHU1RkM1XHU5ODdCXHU4RDcwIGZhbGxiYWNrSG9zdCgpIFx1NTE1Q1x1NUU5NVx1RkYwQ1x1NEUwRFx1NTE0MVx1OEJCOFx1NzZGNFx1NjNBNSByZXR1cm5cdTMwMDJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRMb2dCdXR0b24oKTogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsIHtcbiAgY29uc3QgYWxsID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxCdXR0b25FbGVtZW50PignYnV0dG9uJykpXG4gIGNvbnN0IFJFID0gL3Nlc3Npb25cXHMqbG9nfFx1NEUwQlx1OEY3RC4qXHU2NUU1XHU1RkQ3L2lcbiAgLy8gMSkgXHU2NUU3XHU3MjQ4XHVGRjFBY2xhc3MgXHU1NDJCIHNlc3Npb25Mb2dcbiAgY29uc3QgYnlDbGFzcyA9IGFsbC5maW5kKChiKSA9PiAvc2Vzc2lvbkxvZy9pLnRlc3QoYi5jbGFzc05hbWUpKVxuICBpZiAoYnlDbGFzcykgcmV0dXJuIGJ5Q2xhc3NcbiAgLy8gMikgXHU2NTg3XHU2NzJDXHU3NkY0XHU2M0E1XHU2MzAyXHU1NzI4IGJ1dHRvbiBcdTRFMEFcdUZGMDhcdTY1QjBcdTcyNDhcdTRFMERcdTUxOERcdTUzMDUgc3Bhblx1RkYwOVxuICBjb25zdCBieVRleHQgPSBhbGwuZmluZCgoYikgPT4gUkUudGVzdChiLnRleHRDb250ZW50ID8/ICcnKSlcbiAgaWYgKGJ5VGV4dCkgcmV0dXJuIGJ5VGV4dFxuICAvLyAzKSBhcmlhLWxhYmVsIC8gdGl0bGUgXHU1MTVDXHU1RTk1XHVGRjA4XHU1NkZFXHU2ODA3XHU2MzA5XHU5NEFFXHU2NUUwXHU1M0VGXHU4QkZCXHU2NTg3XHU1QjU3XHVGRjA5XG4gIHJldHVybiAoXG4gICAgYWxsLmZpbmQoXG4gICAgICAoYikgPT4gUkUudGVzdChiLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpID8/ICcnKSB8fCBSRS50ZXN0KGIuZ2V0QXR0cmlidXRlKCd0aXRsZScpID8/ICcnKSxcbiAgICApID8/IG51bGxcbiAgKVxufVxuXG4vKiogXHU2MjdFXHU0RTBEXHU1MjMwXHU5NTFBXHU3MEI5XHU2NUY2XHU3Njg0XHU1MTVDXHU1RTk1XHU1QkI5XHU1NjY4XHVGRjFBXHU1NkZBXHU1QjlBXHU1QjlBXHU0RjREXHU1NzI4XHU1M0YzXHU0RTBBXHU4OUQyXHVGRjBDXHU0RTBEXHU0RjlEXHU4RDU2XHU1QkJGXHU0RTNCIERPTSBcdTdFRDNcdTY3ODRcdTMwMDIgKi9cbmZ1bmN0aW9uIGZhbGxiYWNrSG9zdCgpOiBIVE1MRWxlbWVudCB7XG4gIGxldCBob3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RzaHItZmFsbGJhY2staG9zdCcpXG4gIGlmIChob3N0KSByZXR1cm4gaG9zdFxuICBob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgaG9zdC5pZCA9ICdkc2hyLWZhbGxiYWNrLWhvc3QnXG4gIGhvc3QuY2xhc3NOYW1lID0gJ2RzaHItZmFsbGJhY2staG9zdCdcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChob3N0KVxuICByZXR1cm4gaG9zdFxufVxuXG4vKipcbiAqIFx1NEUzQlx1OTUxQVx1NzBCOVx1RkYxQVx1NTNGM1x1NEUwQVx1ODlEMlx1NURFNVx1NTE3N1x1NjgwRlx1MzAwQ1x1NjU4N1x1NEVGNlx1OEQ0NFx1NkU5MFx1N0JBMVx1NzQwNlx1NTY2OFx1MzAwRFx1NTIwNlx1NkJCNVx1NjMwOVx1OTRBRVx1N0VDNFx1RkYwOFx1OUVDNFx1NjU4N1x1NEVGNlx1NTkzOSArIFx1NEUwQlx1NjJDOVx1N0JBRFx1NTkzNFx1RkYwOVx1MzAwMlxuICpcbiAqIFx1NUI5RVx1NkQ0Qlx1N0VEM1x1Njc4NFx1RkYwOGRzaCAwLjIuMS1yYy4yXHVGRjA5XHVGRjFBXG4gKiAgIERJVltkaXNwbGF5OmNvbnRlbnRzXVxuICogICAgIFx1MjUxNCBTUEFOID4gRElWLnNwbGl0XG4gKiAgICAgICAgICAgICAgICBcdTI1MUMgQlVUVE9OW2FyaWEtbGFiZWw9XCJcdTc1MjggXHU2NTg3XHU0RUY2XHU4RDQ0XHU2RTkwXHU3QkExXHU3NDA2XHU1NjY4IFx1NjI1M1x1NUYwMFwiXSAgIFx1MjE5MCBcdTlFQzRcdTY1ODdcdTRFRjZcdTU5MzlcbiAqICAgICAgICAgICAgICAgIFx1MjUxNCBCVVRUT05bYXJpYS1sYWJlbD1cIlx1NjZGNFx1NTkxQVx1NjI1M1x1NUYwMFx1NjVCOVx1NUYwRlwiXSAgICAgICAgICAgICBcdTIxOTAgXHU0RTBCXHU2MkM5XHU3QkFEXHU1OTM0XG4gKiAgIERJViA+IFNQQU5cdUZGMDhcdTAwQjdcdTAwQjdcdTAwQjcgXHU2NkY0XHU1OTFBXHU2NENEXHU0RjVDXHVGRjA5XG4gKiAgIEJVVFRPTlx1RkYwOFx1NUM1NVx1NUYwMFx1NUU5NVx1OTBFOFx1OTc2Mlx1Njc3Rlx1RkYwOVxuICpcbiAqIFx1NjI4QVx1NTE2NVx1NTNFM1x1NjNEMlx1NTIzMFx1OEJFNSBTUEFOIFx1NEU0Qlx1NTI0RFx1RkYwQ1x1NTM3M1x1NTNFRlx1ODQzRFx1NTcyOFx1OUVDNFx1NjU4N1x1NEVGNlx1NTkzOVx1NURFNlx1NEZBN1x1RkYwQ1x1NEUwRVx1NURFNVx1NTE3N1x1NjgwRlx1NTQwQ1x1NjM5Mlx1MzAwMVx1OTVGNFx1OERERFx1NEUwMFx1ODFGNFx1MzAwMlxuICogXHU1M0VBXHU0RjlEXHU4RDU2IGFyaWEtbGFiZWwgXHU4QkVEXHU0RTQ5XHVGRjA4XHU4REU4XHU3MjQ4XHU2NzJDXHU4RjgzXHU3QTMzXHVGRjA5XHVGRjBDXHU0RTBEXHU0RjlEXHU4RDU2IENTUyBNb2R1bGUgXHU1NEM4XHU1RTBDXHU3QzdCXHU1NDBEXHUzMDAyXG4gKi9cbmZ1bmN0aW9uIGZpbmRUb29sYmFySG9zdCgpOiB7IGhvc3Q6IEhUTUxFbGVtZW50OyBiZWZvcmU6IEVsZW1lbnQgfSB8IG51bGwge1xuICBjb25zdCBhbGwgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdidXR0b25bYXJpYS1sYWJlbF0nKSlcbiAgY29uc3QgZm9sZGVyID0gYWxsLmZpbmQoKGIpID0+XG4gICAgL1x1NjU4N1x1NEVGNlx1OEQ0NFx1NkU5MFx1N0JBMVx1NzQwNlx1NTY2OHxcdThENDRcdTZFOTBcdTdCQTFcdTc0MDZcdTU2Njh8RmlsZSBFeHBsb3Jlci9pLnRlc3QoYi5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSA/PyAnJyksXG4gIClcbiAgaWYgKCFmb2xkZXIpIHJldHVybiBudWxsXG4gIGNvbnN0IHNwbGl0ID0gZm9sZGVyLnBhcmVudEVsZW1lbnRcbiAgY29uc3QgYW5jaG9yU3BhbiA9IHNwbGl0Py5wYXJlbnRFbGVtZW50XG4gIGNvbnN0IGhvc3QgPSBhbmNob3JTcGFuPy5wYXJlbnRFbGVtZW50XG4gIGlmICghaG9zdCB8fCAhYW5jaG9yU3BhbikgcmV0dXJuIG51bGxcbiAgcmV0dXJuIHsgaG9zdCwgYmVmb3JlOiBhbmNob3JTcGFuIH1cbn1cblxuLyoqIFx1ODlFM1x1Njc5MFx1NjMwMlx1OEY3RFx1NzBCOVx1RkYxQVx1NURFNVx1NTE3N1x1NjgwRlx1NEYxOFx1NTE0OCBcdTIxOTIgXHU2NUU3XHUzMDBDXHU0RTBCXHU4RjdEXHU2NUU1XHU1RkQ3XHUzMDBEXHU5NTFBXHU3MEI5IFx1MjE5MiBcdTU2RkFcdTVCOUFcdTZENkVcdTVDNDJcdTUxNUNcdTVFOTVcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlc29sdmVNb3VudCgpOiB7IGhvc3Q6IEhUTUxFbGVtZW50OyBiZWZvcmU6IEVsZW1lbnQgfCBudWxsIH0ge1xuICBjb25zdCB0YiA9IGZpbmRUb29sYmFySG9zdCgpXG4gIGlmICh0YikgcmV0dXJuIHRiXG4gIGNvbnN0IGFuY2hvciA9IGZpbmRMb2dCdXR0b24oKVxuICBjb25zdCBjb250YWluZXIgPSBhbmNob3I/LnBhcmVudEVsZW1lbnRcbiAgaWYgKGNvbnRhaW5lciAmJiBhbmNob3IpIHJldHVybiB7IGhvc3Q6IGNvbnRhaW5lciwgYmVmb3JlOiBhbmNob3IgfVxuICByZXR1cm4geyBob3N0OiBmYWxsYmFja0hvc3QoKSwgYmVmb3JlOiBudWxsIH1cbn1cblxuZnVuY3Rpb24gc3R5bGVUYWcoKTogSFRNTFN0eWxlRWxlbWVudCB7XG4gIGNvbnN0IGV4aXN0aW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RzaHItc3R5bGUnKSBhcyBIVE1MU3R5bGVFbGVtZW50IHwgbnVsbFxuICBpZiAoZXhpc3RpbmcpIHJldHVybiBleGlzdGluZ1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGUuaWQgPSAnZHNoci1zdHlsZSdcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBDU1NcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSlcbiAgcmV0dXJuIHN0eWxlXG59XG5cbmZ1bmN0aW9uIHN0YXR1c0RvdENsYXNzKHN0YXR1czogUmVnaW9uU3RhdHVzKTogJ2dyZWVuJyB8ICd5ZWxsb3cnIHwgJ3JlZCcgfCAnZ3JheScge1xuICBjb25zdCB7IG1haW4sIGJhY2t1cCB9ID0gc3RhdHVzXG4gIGlmICghbWFpbiB8fCAhYmFja3VwKSByZXR1cm4gJ2dyYXknXG4gIGlmIChtYWluLm9rICYmIGJhY2t1cC5vaykgcmV0dXJuICdncmVlbidcbiAgaWYgKG1haW4ub2sgIT09IGJhY2t1cC5vaykgcmV0dXJuICd5ZWxsb3cnXG4gIHJldHVybiBtYWluLm9rID8gJ2dyYXknIDogJ3JlZCdcbn1cblxuZnVuY3Rpb24gc3RhdHVzSGludChzdGF0dXM6IFJlZ2lvblN0YXR1cyk6IHN0cmluZyB7XG4gIGNvbnN0IHsgbWFpbiwgYmFja3VwIH0gPSBzdGF0dXNcbiAgaWYgKCFtYWluIHx8ICFiYWNrdXApIHJldHVybiB6aFsnbWVudS5zdGF0dXNVbmtub3duJ11cbiAgaWYgKG1haW4ub2sgJiYgYmFja3VwLm9rKSByZXR1cm4gemhbJ21lbnUuc3RhdHVzR3JlZW4nXVxuICBpZiAoIW1haW4ub2sgJiYgYmFja3VwLm9rKSByZXR1cm4gemhbJ21lbnUuc3RhdHVzWWVsbG93J11cbiAgaWYgKCFtYWluLm9rICYmICFiYWNrdXAub2spIHJldHVybiB6aFsnbWVudS5zdGF0dXNSZWQnXVxuICByZXR1cm4gemhbJ21lbnUuc3RhdHVzVW5rbm93biddXG59XG5cbmNvbnN0IElDT04gPSAnPHN2ZyB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgd2lkdGg9XCIxNVwiIGhlaWdodD1cIjE1XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIxLjNcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48ZWxsaXBzZSBjeD1cIjhcIiBjeT1cIjRcIiByeD1cIjRcIiByeT1cIjEuOFwiLz48cGF0aCBkPVwiTTQgNHY0YzAgMSAxLjggMS44IDQgMS44czQtLjggNC0xLjhWNFwiLz48cGF0aCBkPVwiTTQgOHY0YzAgMSAxLjggMS44IDQgMS44czQtLjggNC0xLjhWOFwiLz48L3N2Zz4nXG5cbi8qKlxuICogXHU2MzAyXHU4RjdEXHU1M0YzXHU0RTBBXHU4OUQyXHU4M0RDXHU1MzU1XHVGRjBDXHU4RkQ0XHU1NkRFIGRpc3Bvc2VyXHUzMDAyXG4gKiBcdTVFNDJcdTdCNDlcdUZGMUFcdTkxQ0RcdTU5MERcdThDMDNcdTc1MjhcdTUxNDhcdTZFMDVcdTc0MDZcdTY1RTdcdTVCOUVcdTRGOEJcdTUxOERcdTkxQ0RcdTVFRkFcdTMwMDJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vdW50SGVhZGVyTWVudShvcHRpb25zOiBIZWFkZXJNZW51T3B0aW9ucyA9IHt9KTogKCkgPT4gdm9pZCB7XG4gIHN0eWxlVGFnKClcbiAgbGV0IGRpc3Bvc2VkID0gZmFsc2VcbiAgbGV0IG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGxcbiAgbGV0IG1lbnVFbDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbFxuICBsZXQgZW50cnlFbDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsID0gbnVsbFxuICBsZXQgbGF0ZXN0OiBSZWdpb25TdGF0dXMgfCBudWxsID0gbnVsbFxuXG4gIGNvbnN0IGNsZWFudXBNZW51ID0gKCk6IHZvaWQgPT4ge1xuICAgIG1lbnVFbD8ucmVtb3ZlKClcbiAgICBtZW51RWwgPSBudWxsXG4gIH1cblxuICBjb25zdCBjbG9zZU1lbnUgPSAoKTogdm9pZCA9PiBjbGVhbnVwTWVudSgpXG5cbiAgY29uc3QgcmVuZGVyTWVudSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICAgIGNsZWFudXBNZW51KClcbiAgICBsZXQgc3RhdHVzOiBSZWdpb25TdGF0dXNcbiAgICB0cnkge1xuICAgICAgc3RhdHVzID0gYXdhaXQgZmV0Y2hTdGF0dXMoZmFsc2UpXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTY3MERcdTUyQTFcdTRFMERcdTUzRUZcdThGQkVcdUZGMUFcdTgzRENcdTUzNTVcdTkxQ0NcdTc2RjRcdTYzQTVcdTYzRDBcdTc5M0FcbiAgICAgIHN0YXR1cyA9IHtcbiAgICAgICAgbW9kZTogJ2F1dG8nLCBhcHBsaWVkUmVnaXN0cnk6IG51bGwsIG1haW5SZWdpc3RyeTogJycsIGJhY2t1cFJlZ2lzdHJ5OiAnJyxcbiAgICAgICAgbGFzdEVycm9yOiB6aFsnZXJyLmZldGNoRmFpbGVkJ10sIGxhc3RTd2l0Y2hBdDogbnVsbCwgbWVudVZpc2libGU6IHRydWUsXG4gICAgICAgIG1haW46IHsgb2s6IGZhbHNlLCBtczogMCwgZXJyb3I6IHpoWydlcnIuZmV0Y2hGYWlsZWQnXSB9LFxuICAgICAgICBiYWNrdXA6IHsgb2s6IGZhbHNlLCBtczogMCwgZXJyb3I6IHpoWydlcnIuZmV0Y2hGYWlsZWQnXSB9LFxuICAgICAgfVxuICAgIH1cbiAgICBsYXRlc3QgPSBzdGF0dXNcbiAgICBpZiAoIWVudHJ5RWwpIHJldHVyblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZWN0ID0gZW50cnlFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgY29uc3QgZG90ID0gc3RhdHVzRG90Q2xhc3Moc3RhdHVzKVxuICAgIGNvbnN0IGl0ZW1zID0gKFxuICAgICAgW1xuICAgICAgICB7IGtleTogJ2F1dG8nLCBsYWJlbDogemhbJ21lbnUuYXV0byddLCBjbWQ6ICdhdXRvJyB9LFxuICAgICAgICB7IGtleTogJ21haW4nLCBsYWJlbDogemhbJ21lbnUubWFpbiddLCBjbWQ6ICdtYWluJyB9LFxuICAgICAgICB7IGtleTogJ2JhY2t1cCcsIGxhYmVsOiB6aFsnbWVudS5iYWNrdXAnXSwgY21kOiAnYmFja3VwJyB9LFxuICAgICAgXSBhcyBjb25zdFxuICAgIClcblxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHJvb3QuY2xhc3NOYW1lID0gJ2RzaHItbWVudSdcbiAgICByb290LnN0eWxlLmxlZnQgPSBgJHtNYXRoLm1heCg4LCByZWN0LnJpZ2h0IC0gMjQwKX1weGBcbiAgICByb290LnN0eWxlLnRvcCA9IGAke3JlY3QuYm90dG9tICsgNn1weGBcbiAgICByb290LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51JylcblxuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGhlYWQuY2xhc3NOYW1lID0gJ2RzaHItbWVudS1oZWFkJ1xuICAgIGhlYWQudGl0bGUgPSBzdGF0dXNIaW50KHN0YXR1cylcbiAgICBjb25zdCBoZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgaGRvdC5jbGFzc05hbWUgPSBgZHNoci1oZG90ICR7ZG90fWBcbiAgICBoZWFkLmFwcGVuZENoaWxkKGhkb3QpXG4gICAgaGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh6aFsnbWVudS50aXRsZSddKSlcbiAgICByb290LmFwcGVuZENoaWxkKGhlYWQpXG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBidG4uY2xhc3NOYW1lID0gJ2RzaHItaXRlbSdcbiAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWl0ZW0nKVxuICAgICAgY29uc3QgbGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgY29uc3QgaXNDdXJyZW50ID0gc3RhdHVzLm1vZGUgPT09IGl0ZW0uY21kXG4gICAgICBsZWZ0LnRleHRDb250ZW50ID0gYCR7aXRlbS5sYWJlbH1cdUZGMDgke2l0ZW0uY21kfVx1RkYwOWBcbiAgICAgIGlmIChpc0N1cnJlbnQpIHtcbiAgICAgICAgY29uc3QgY3VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGN1ci5jbGFzc05hbWUgPSAnZHNoci1jdXInXG4gICAgICAgIGN1ci50ZXh0Q29udGVudCA9IGBcdTI3MTMke3poWydtZW51LmN1cnJlbnQnXX1gXG4gICAgICAgIGxlZnQuYXBwZW5kQ2hpbGQoY3VyKVxuICAgICAgfVxuICAgICAgYnRuLmFwcGVuZENoaWxkKGxlZnQpXG4gICAgICBjb25zdCBtcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgbXMuY2xhc3NOYW1lID0gJ2RzaHItbXMnXG4gICAgICBjb25zdCBwcm9iZVJlc3VsdCA9IGl0ZW0uY21kID09PSAnbWFpbicgPyBzdGF0dXMubWFpbiA6IGl0ZW0uY21kID09PSAnYmFja3VwJyA/IHN0YXR1cy5iYWNrdXAgOiBudWxsXG4gICAgICBtcy50ZXh0Q29udGVudCA9IHByb2JlUmVzdWx0ID8gYCR7cHJvYmVSZXN1bHQubXN9bXNgIDogJy0tJ1xuICAgICAgYnRuLmFwcGVuZENoaWxkKG1zKVxuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB2b2lkIHJlcXVlc3RNb2RlKGl0ZW0uY21kKVxuICAgICAgICB2b2lkIHJlbmRlck1lbnUoKVxuICAgICAgfSlcbiAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoYnRuKVxuICAgIH1cblxuICAgIGNvbnN0IHNlcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc2VwLmNsYXNzTmFtZSA9ICdkc2hyLXNlcCdcbiAgICByb290LmFwcGVuZENoaWxkKHNlcClcblxuICAgIGNvbnN0IHByb2JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBwcm9iZS5jbGFzc05hbWUgPSAnZHNoci1pdGVtIGRzaHItcHJvYmUnXG4gICAgcHJvYmUudGV4dENvbnRlbnQgPSBgXHUyMUJCICR7emhbJ21lbnUucHJvYmUnXX1gXG4gICAgcHJvYmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAvLyBcdTdBQ0JcdTUzNzNcdTZENEJcdTkwMUZcdUZGMUFcdTVCOUVcdTY1RjZcdTYzQTJcdTZENEJcdTUzQ0NcdTZFOTBcdUZGMDhcdTUzRUZcdTgwRkRcdTY1NzBcdTc5RDJcdUZGMDlcdUZGMENcdTVCOENcdTYyMTBcdTU0MEVcdTUyMzdcdTY1QjBcdTgzRENcdTUzNTVcdTMwMDJcbiAgICAgIHZvaWQgZmV0Y2hTdGF0dXModHJ1ZSkudGhlbigoKSA9PiByZW5kZXJNZW51KCkpXG4gICAgfSlcbiAgICByb290LmFwcGVuZENoaWxkKHByb2JlKVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyb290KVxuICAgIG1lbnVFbCA9IHJvb3RcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gXHU2RTMyXHU2N0QzXHU1OTMxXHU4RDI1XHU1M0VBXHU4QkIwXHU2NUU1XHU1RkQ3XHVGRjBDXHU3RUREXHU0RTBEXHU2MjlCXHVGRjA4XHU1OTE2XHU5MEU4XHU2M0QyXHU0RUY2XHU0RTBEXHU4MEZEXHU2MkQ2XHU1N0FFIERTSFx1RkYwOVx1MzAwMlxuICAgICAgY29uc29sZS5lcnJvcignW2RzaC1yZWdpb25dIG1lbnUgcmVuZGVyIGZhaWxlZDonLCBlcnJvcilcbiAgICB9XG4gIH1cblxuICBjb25zdCBidWlsZEVudHJ5ID0gKCk6IEhUTUxCdXR0b25FbGVtZW50ID0+IHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGJ0bi50eXBlID0gJ2J1dHRvbidcbiAgICBidG4uY2xhc3NOYW1lID0gJ2RzaHItZW50cnknXG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1kc2gtcmVnaW9uLWVudHJ5JywgJycpXG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHpoWydtZW51LnRpdGxlJ10pXG4gICAgYnRuLmlubmVySFRNTCA9IElDT05cbiAgICBjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBkb3QuY2xhc3NOYW1lID0gJ2RzaHItZG90IGdyYXknXG4gICAgYnRuLmFwcGVuZENoaWxkKGRvdClcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBpZiAobWVudUVsKSBjbG9zZU1lbnUoKVxuICAgICAgZWxzZSB2b2lkIHJlbmRlck1lbnUoKVxuICAgIH0pXG4gICAgcmV0dXJuIGJ0blxuICB9XG5cbiAgLy8gXHU5NjMyXHU2Mjk2XHU5NTAxXHVGRjFBTXV0YXRpb25PYnNlcnZlciBcdTlBRDhcdTk4OTFcdTg5RTZcdTUzRDFcdTY1RjZcdTU0MDhcdTVFNzZcdThCRjdcdTZDNDJcdUZGMENcdTkwN0ZcdTUxNERcdTVFNzZcdTUzRDFcdTYyNTNcdTcyMDYgc2VydmVyIFx1NjNBMlx1NkQ0Qlx1MzAwMlxuICBsZXQgZW5zdXJlTG9jayA9IGZhbHNlXG4gIGNvbnN0IGVuc3VyZUVudHJ5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmIChkaXNwb3NlZCB8fCBlbnN1cmVMb2NrKSByZXR1cm5cbiAgICBlbnN1cmVMb2NrID0gdHJ1ZVxuICAgIC8vIFx1ODNEQ1x1NTM1NVx1NjYzRVx1OTY5MFx1NTNENyBzZXJ2ZXIgXHU3MkI2XHU2MDAxXHU2M0E3XHU1MjM2XHVGRjFCXHU2N0U1XHU4QkUyXHU1OTMxXHU4RDI1XHU2NUY2XHU0RkREXHU1Qjg4XHU2NjNFXHU3OTNBXHVGRjA4XHU5RUQ4XHU4QkE0XHU2NjNFXHU3OTNBXHVGRjA5XHUzMDAyXG4gICAgdm9pZCBmZXRjaFN0YXR1cyhmYWxzZSlcbiAgICAgIC50aGVuKChzdGF0dXMpID0+IHtcbiAgICAgICAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgICAgICAgbGF0ZXN0ID0gc3RhdHVzXG4gICAgICAgIGNvbnN0IHRhcmdldFZpc2libGUgPSBzdGF0dXMubWVudVZpc2libGUgIT09IGZhbHNlXG4gICAgICAgIGNvbnN0IG1vdW50ID0gcmVzb2x2ZU1vdW50KClcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihFTlRSWV9TRUxFQ1RPUilcbiAgICAgICAgaWYgKCF0YXJnZXRWaXNpYmxlKSB7XG4gICAgICAgICAgZXhpc3Rpbmc/LnJlbW92ZSgpXG4gICAgICAgICAgY2xlYW51cE1lbnUoKVxuICAgICAgICAgIG9wdGlvbnMub25NZW51VmlzaWJsZUNoYW5nZT8uKGZhbHNlKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChleGlzdGluZyAmJiBleGlzdGluZy5wYXJlbnRFbGVtZW50ID09PSBtb3VudC5ob3N0KSB7XG4gICAgICAgICAgZW50cnlFbCA9IGV4aXN0aW5nXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4aXN0aW5nKSBleGlzdGluZy5yZW1vdmUoKVxuICAgICAgICBjb25zdCBidG4gPSBidWlsZEVudHJ5KClcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2RzaHItZW50cnknKVxuICAgICAgICAvLyBcdTcyQjZcdTYwMDFcdTcwNkZcdTUyMURcdTU5Q0JcdTgyNzJcbiAgICAgICAgY29uc3QgZG90ID0gYnRuLnF1ZXJ5U2VsZWN0b3IoJy5kc2hyLWRvdCcpXG4gICAgICAgIGlmIChkb3QpIGRvdC5jbGFzc0xpc3QuYWRkKHN0YXR1c0RvdENsYXNzKHN0YXR1cykpXG4gICAgICAgIGlmIChtb3VudC5iZWZvcmUpIG1vdW50Lmhvc3QuaW5zZXJ0QmVmb3JlKGJ0biwgbW91bnQuYmVmb3JlKVxuICAgICAgICBlbHNlIG1vdW50Lmhvc3QuYXBwZW5kQ2hpbGQoYnRuKVxuICAgICAgICAvLyBcdTVERjJcdTYzMDJcdThGREJcdTVERTVcdTUxNzdcdTY4MEYvXHU5NTFBXHU3MEI5XHU1NDBFXHVGRjBDXHU2RTA1XHU2Mzg5XHU3QTdBXHU3Njg0XHU1MTVDXHU1RTk1XHU2RDZFXHU1QzQyXG4gICAgICAgIGlmIChtb3VudC5ob3N0LmlkICE9PSAnZHNoci1mYWxsYmFjay1ob3N0Jykge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkc2hyLWZhbGxiYWNrLWhvc3QnKT8ucmVtb3ZlKClcbiAgICAgICAgfVxuICAgICAgICBlbnRyeUVsID0gYnRuXG4gICAgICAgIG9wdGlvbnMub25NZW51VmlzaWJsZUNoYW5nZT8uKHRydWUpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgLy8gXHU3MkI2XHU2MDAxXHU4M0I3XHU1M0Q2XHU1OTMxXHU4RDI1XHVGRjFBXHU0RUNEXHU2NjNFXHU3OTNBXHU1MTY1XHU1M0UzXHVGRjA4XHU0RkREXHU1Qjg4XHU3QjU2XHU3NTY1XHVGRjA5XHVGRjBDXHU3MDcwXHU3MDZGXHUzMDAyXG4gICAgICAgIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gICAgICAgIGNvbnN0IG1vdW50ID0gcmVzb2x2ZU1vdW50KClcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihFTlRSWV9TRUxFQ1RPUilcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgZW50cnlFbCA9IGV4aXN0aW5nXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZW50cnlFbCA9IGJ1aWxkRW50cnkoKVxuICAgICAgICBpZiAobW91bnQuYmVmb3JlKSBtb3VudC5ob3N0Lmluc2VydEJlZm9yZShlbnRyeUVsLCBtb3VudC5iZWZvcmUpXG4gICAgICAgIGVsc2UgbW91bnQuaG9zdC5hcHBlbmRDaGlsZChlbnRyeUVsKVxuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgZW5zdXJlTG9jayA9IGZhbHNlXG4gICAgICB9KVxuICB9XG5cbiAgLy8gXHU4MUVBXHU2MTA4ICsgXHU4RkMxXHU3OUZCXHVGRjFBXHU0RTBEXHU4MEZEXHU1M0VBXHU1MjI0XHU2NUFEXCJcdTUxNjVcdTUzRTNcdTY2MkZcdTU0MjZcdTVCNThcdTU3MjhcIlx1RkYwQ1x1OEZEOFx1ODk4MVx1NTIyNFx1NjVBRFwiXHU0RjREXHU3RjZFXHU1QkY5XHU0RTBEXHU1QkY5XCJcdTMwMDJcbiAgLy8gXHU2NTU5XHU4QkFEXHVGRjFBXHU1QkJGXHU0RTNCIFVJIFx1ODJFNVx1NTcyOFx1NjNEMlx1NEVGNlx1NjMwMlx1OEY3RFx1NEU0Qlx1NTQwRVx1NjI0RFx1NkUzMlx1NjdEM1x1NUI4Q1x1RkYwQ1x1OTk5Nlx1NkIyMSBlbnN1cmVFbnRyeSBcdTRGMUFcdTg0M0RcdThGREJcdTUxNUNcdTVFOTVcdTZENkVcdTVDNDJcdUZGMUJcbiAgLy8gXHU2NUU3XHU1QjlFXHU3M0IwXHU1M0VBXHU2N0U1IEVOVFJZX1NFTEVDVE9SIFx1NjYyRlx1NTQyNlx1NUI1OFx1NTcyOFx1RkYwQ1x1NEU4RVx1NjYyRlx1NkMzOFx1OEZEQ1x1NEUwRFx1OEZDMVx1NzlGQlx1RkYwQ1x1NzUyOFx1NjIzN1x1NzcwQlx1NTIzMFx1NzY4NFx1NUMzMVx1NjYyRlwiXHU1NkZFXHU2ODA3XHU4REQxXHU1MjMwXHU2RDZFXHU1QzQyXHU5MUNDXCJcdTMwMDJcbiAgbGV0IHJlbG9jYXRlQXQgPSAwXG4gIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gICAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihFTlRSWV9TRUxFQ1RPUilcbiAgICAvLyAxKSBcdTUxNjVcdTUzRTNcdTZEODhcdTU5MzFcdUZGMDhSZWFjdCBcdTkxQ0RcdTZFMzJcdTY3RDNcdUZGMDlcdTIxOTIgXHU3QUNCXHU1MzczXHU5MUNEXHU1RUZBXG4gICAgaWYgKCFleGlzdGluZykge1xuICAgICAgZW5zdXJlRW50cnkoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIDIpIFx1NURFNVx1NTE3N1x1NjgwRlx1OTUxQVx1NzBCOVx1NURGMlx1NTFGQVx1NzNCMFx1MzAwMVx1NEY0Nlx1NTE2NVx1NTNFM1x1NEVDRFx1NjMwMlx1NTcyOFx1NTE1Q1x1NUU5NVx1NkQ2RVx1NUM0MiBcdTIxOTIgXHU4RkMxXHU3OUZCXHU1NkRFXHU1REU1XHU1MTc3XHU2ODBGXG4gICAgLy8gICAgXHU4MjgyXHU2RDQxIDUwMG1zXHVGRjFBRE9NIFx1OUFEOFx1OTg5MVx1NTNEOFx1NTJBOFx1NjVGNlx1NEUwRFx1NUZDNVx1NkJDRlx1NkIyMVx1NjdFNVx1OEJFMlx1NjMwOVx1OTRBRVxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KClcbiAgICBpZiAobm93IC0gcmVsb2NhdGVBdCA8IDUwMCkgcmV0dXJuXG4gICAgY29uc3QgdGIgPSBmaW5kVG9vbGJhckhvc3QoKVxuICAgIGlmICh0YiAmJiBleGlzdGluZy5wYXJlbnRFbGVtZW50ICE9PSB0Yi5ob3N0KSB7XG4gICAgICByZWxvY2F0ZUF0ID0gbm93XG4gICAgICBlbnN1cmVFbnRyeSgpXG4gICAgfVxuICB9KVxuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pXG5cbiAgLy8gXHU3MEI5XHU1MUZCXHU4M0RDXHU1MzU1XHU1OTE2XHU5MEU4XHU1MTczXHU5NUVEXG4gIGNvbnN0IG9uRG9jQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICBpZiAobWVudUVsICYmICFtZW51RWwuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpICYmICFlbnRyeUVsPy5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgIGNsb3NlTWVudSgpXG4gICAgfVxuICB9XG4gIGNvbnN0IG9uS2V5ID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIGNsb3NlTWVudSgpXG4gIH1cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkRvY0NsaWNrLCB0cnVlKVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXksIHRydWUpXG5cbiAgLy8gXHU4QkJFXHU3RjZFXHU5ODc1XHU4MEY2XHU1NkNBXHU1MjA3XHU2MzYyXHU1NDBFXHVGRjBDXHU5MUNEXHU2NUIwXHU4QkM0XHU0RjMwXHU4M0RDXHU1MzU1XHU2NjNFXHU5NjkwXHUzMDAyXG4gIGNvbnN0IG9uVmlzaWJpbGl0eUV2ZW50ID0gKCk6IHZvaWQgPT4gZW5zdXJlRW50cnkoKVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZHNocjp2aXNpYmlsaXR5LWNoYW5nZWQnLCBvblZpc2liaWxpdHlFdmVudClcblxuICAvLyBcdTk5OTZcdTZCMjFcdTYzMDJcdThGN0RcdUZGMDhcdTUzRUZcdTgwRkQgc2hlbGwgXHU4RkQ4XHU2Q0ExXHU2RTMyXHU2N0QzXHU1QjhDXHVGRjBDXHU4RjZFXHU4QkUyXHU1MUUwXHU2QjIxXHVGRjA5XG4gIGxldCBhdHRlbXB0cyA9IDBcbiAgY29uc3QgdHJ5TW91bnQgPSAoKTogdm9pZCA9PiB7XG4gICAgZW5zdXJlRW50cnkoKVxuICAgIC8vIFx1NzZFRVx1NjgwN1x1NjYyRlx1MzAwQ1x1NjMwMlx1OEZEQlx1NURFNVx1NTE3N1x1NjgwRlx1MzAwRFx1RkYwQ1x1NEUwRFx1NjYyRlx1MzAwQ1x1OTg3NVx1OTc2Mlx1NEUwQVx1NjcwOVx1NEUyQVx1NTE2NVx1NTNFM1x1MzAwRFx1MjAxNFx1MjAxNFxuICAgIC8vIFx1NTQyNlx1NTIxOVx1NEUwMFx1NjVFNlx1NTE0OFx1ODQzRFx1OEZEQlx1NTE1Q1x1NUU5NVx1NkQ2RVx1NUM0Mlx1NUMzMVx1NEYxQVx1NjNEMFx1NTI0RFx1NjUzNlx1NURFNVx1MzAwMlx1OTUxQVx1NzBCOVx1OEZERlx1OEZERlx1NEUwRFx1NTFGQVx1NzNCMFx1RkYwOFx1NjVFN1x1NzI0OFx1NUJCRlx1NEUzQlx1RkYwOVx1NjVGNlxuICAgIC8vIFx1NjcwMFx1NTkxQVx1N0E3QVx1OEY2QyAzMCBcdTc5RDJcdUZGMENcdTRFNEJcdTU0MEVcdTRFQTRcdTdFRDkgTXV0YXRpb25PYnNlcnZlciBcdTc2ODRcdTgxRUFcdTYxMDhcdTkwM0JcdThGOTFcdTMwMDJcbiAgICBjb25zdCBleGlzdGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KEVOVFJZX1NFTEVDVE9SKVxuICAgIGNvbnN0IHRiID0gZmluZFRvb2xiYXJIb3N0KClcbiAgICBjb25zdCBpblRvb2xiYXIgPSAhIWV4aXN0aW5nICYmICEhdGIgJiYgZXhpc3RpbmcucGFyZW50RWxlbWVudCA9PT0gdGIuaG9zdFxuICAgIGlmICghaW5Ub29sYmFyICYmIGF0dGVtcHRzIDwgNjApIHtcbiAgICAgIGF0dGVtcHRzICs9IDFcbiAgICAgIHNldFRpbWVvdXQodHJ5TW91bnQsIDUwMClcbiAgICB9XG4gIH1cbiAgdHJ5TW91bnQoKVxuXG4gIHJldHVybiAoKSA9PiB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gICAgb2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Eb2NDbGljaywgdHJ1ZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXksIHRydWUpXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RzaHI6dmlzaWJpbGl0eS1jaGFuZ2VkJywgb25WaXNpYmlsaXR5RXZlbnQpXG4gICAgZW50cnlFbD8ucmVtb3ZlKClcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHNoci1mYWxsYmFjay1ob3N0Jyk/LnJlbW92ZSgpXG4gICAgY2xlYW51cE1lbnUoKVxuICB9XG59XG4iLCAiLyoqXG4gKiBzZXR0aW5ncy1jYXJkIFx1MjAxNFx1MjAxNCBcdThCQkVcdTdGNkVcdTk4NzVcdTMwMENkc2gtcmVnaW9uIFx1NkU5MFx1N0JBMVx1NzQwNlx1MzAwRFx1NTM2MVx1NzI0N1x1MzAwMlxuICogXHU2M0QwXHU0RjlCXHU1M0YzXHU0RTBBXHU4OUQyXHU4M0RDXHU1MzU1XHU3Njg0XHU2NjNFXHU3OTNBL1x1OTY5MFx1ODVDRlx1ODBGNlx1NTZDQVx1NUYwMFx1NTE3M1x1RkYwQ1x1NzJCNlx1NjAwMVx1NUI1OCBzZXJ2ZXJcdUZGMDhyZWdpb24uanNvblx1RkYwOVx1MzAwMlxuICogUmVhY3QgXHU3RUM0XHU0RUY2XHVGRjA4aG9zdCBcdTYzRDBcdTRGOUIgcmVhY3RcdUZGMENidW5kbGUgXHU1OTE2XHU3RjZFXHVGRjA5XHUzMDAyXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCBhcyBoLCB1c2VFZmZlY3QsIHVzZVN0YXRlLCB0eXBlIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgZmV0Y2hTdGF0dXMsIHJlcXVlc3RNZW51VmlzaWJsZSB9IGZyb20gJy4vaG9zdC1hcGkuanMnXG5pbXBvcnQgeyB6aCB9IGZyb20gJy4vbG9jYWxlcy5qcydcblxuLyoqIFx1OTAxQVx1NzdFNSBoZWFkZXIgXHU4M0RDXHU1MzU1XHU5MUNEXHU2NUIwXHU4QkM0XHU0RjMwXHU2NjNFXHU5NjkwXHVGRjA4d2luZG93IFx1NEU4Qlx1NEVGNlx1RkYwQ1x1ODlFM1x1ODAyNiBSZWFjdCBcdTRFMEUgRE9NIFx1NkNFOFx1NTE2NVx1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoVmlzaWJpbGl0eUNoYW5nZWQoKTogdm9pZCB7XG4gIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnZHNocjp2aXNpYmlsaXR5LWNoYW5nZWQnKSlcbn1cblxuaW50ZXJmYWNlIENhcmRQcm9wcyB7XG4gIHQ/OiAoa2V5OiBzdHJpbmcpID0+IHN0cmluZ1xufVxuXG5mdW5jdGlvbiBDYXJkU2hlbGwocHJvcHM6IHtcbiAgdGl0bGU6IHN0cmluZ1xuICBkZXNjcmlwdGlvbjogc3RyaW5nXG4gIGNoaWxkcmVuOiBSZWFjdE5vZGVcbn0pOiBSZWFjdE5vZGUge1xuICByZXR1cm4gaCgnZGl2JywgeyBzdHlsZTogeyBwYWRkaW5nOiAnMTJweCAwJyB9IH0sXG4gICAgaCgnZGl2JywgeyBzdHlsZTogeyBmb250V2VpZ2h0OiA2MDAsIGZvbnRTaXplOiAxNCwgbWFyZ2luQm90dG9tOiA0IH0gfSwgcHJvcHMudGl0bGUpLFxuICAgIGgoJ2RpdicsIHsgc3R5bGU6IHsgY29sb3I6ICd2YXIoLS1jb2xvci10ZXh0LXNlY29uZGFyeSwjOGI5NDllKScsIGZvbnRTaXplOiAxMiwgbWFyZ2luQm90dG9tOiAxMCB9IH0sIHByb3BzLmRlc2NyaXB0aW9uKSxcbiAgICBwcm9wcy5jaGlsZHJlbixcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVnaW9uU2V0dGluZ3NDYXJkKF9wcm9wczogQ2FyZFByb3BzKTogUmVhY3ROb2RlIHtcbiAgY29uc3QgW3Zpc2libGUsIHNldFZpc2libGVdID0gdXNlU3RhdGU8Ym9vbGVhbiB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbZXJyLCBzZXRFcnJdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbClcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBhbGl2ZSA9IHRydWVcbiAgICBmZXRjaFN0YXR1cygpXG4gICAgICAudGhlbigocykgPT4ge1xuICAgICAgICBpZiAoYWxpdmUpIHNldFZpc2libGUocy5tZW51VmlzaWJsZSAhPT0gZmFsc2UpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgaWYgKGFsaXZlKSBzZXRWaXNpYmxlKHRydWUpXG4gICAgICB9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBhbGl2ZSA9IGZhbHNlXG4gICAgfVxuICB9LCBbXSlcblxuICBjb25zdCB0b2dnbGUgPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKHZpc2libGUgPT09IG51bGwgfHwgYnVzeSkgcmV0dXJuXG4gICAgY29uc3QgbmV4dCA9ICF2aXNpYmxlXG4gICAgc2V0QnVzeSh0cnVlKVxuICAgIHNldEVycihudWxsKVxuICAgIHJlcXVlc3RNZW51VmlzaWJsZShuZXh0KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBzZXRWaXNpYmxlKG5leHQpXG4gICAgICAgIGRpc3BhdGNoVmlzaWJpbGl0eUNoYW5nZWQoKVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZTogdW5rbm93bikgPT4gc2V0RXJyKGUgaW5zdGFuY2VvZiBFcnJvciA/IGUubWVzc2FnZSA6IFN0cmluZyhlKSkpXG4gICAgICAuZmluYWxseSgoKSA9PiBzZXRCdXN5KGZhbHNlKSlcbiAgfVxuXG4gIGNvbnN0IGNhcHN1bGUgPSBoKFxuICAgICdidXR0b24nLFxuICAgIHtcbiAgICAgIG9uQ2xpY2s6IHRvZ2dsZSxcbiAgICAgIGRpc2FibGVkOiB2aXNpYmxlID09PSBudWxsIHx8IGJ1c3ksXG4gICAgICBzdHlsZToge1xuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA2LFxuICAgICAgICBwYWRkaW5nOiAnNHB4IDE0cHgnLCBib3JkZXJSYWRpdXM6IDk5OSwgZm9udFNpemU6IDEzLCBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWNvbG9yLWJvcmRlci1kZWZhdWx0LHJnYmEoMjQwLDI0NiwyNTIsLjIpKScsXG4gICAgICAgIGJhY2tncm91bmQ6IHZpc2libGUgPyAncmdiYSg2MywxODUsODAsLjE1KScgOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICBjb2xvcjogdmlzaWJsZSA/ICcjM2ZiOTUwJyA6ICd2YXIoLS1jb2xvci10ZXh0LXNlY29uZGFyeSwjOGI5NDllKScsXG4gICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgIH0sXG4gICAgICAnYXJpYS1wcmVzc2VkJzogU3RyaW5nKHZpc2libGUgPT09IHRydWUpLFxuICAgIH0sXG4gICAgaCgnc3BhbicsIHtcbiAgICAgIHN0eWxlOiB7IHdpZHRoOiA4LCBoZWlnaHQ6IDgsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6ICdjdXJyZW50Q29sb3InLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyB9LFxuICAgIH0pLFxuICAgIHZpc2libGUgPyB6aFsnY2FyZC5zaG93J10gOiB6aFsnY2FyZC5oaWRlJ10sXG4gIClcblxuICByZXR1cm4gQ2FyZFNoZWxsKHtcbiAgICB0aXRsZTogemhbJ2NhcmQudGl0bGUnXSxcbiAgICBkZXNjcmlwdGlvbjogemhbJ2NhcmQuZGVzY3JpcHRpb24nXSxcbiAgICBjaGlsZHJlbjogaCgnZGl2JywgeyBzdHlsZTogeyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDEyLCBmbGV4V3JhcDogJ3dyYXAnIH0gfSxcbiAgICAgIGgoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFNpemU6IDEzIH0gfSxcbiAgICAgICAgemhbJ2NhcmQubWVudVZpc2libGUnXSxcbiAgICAgICAgaCgnZGl2JywgeyBzdHlsZTogeyBjb2xvcjogJ3ZhcigtLWNvbG9yLXRleHQtdGVydGlhcnksIzZlNzY4MSknLCBmb250U2l6ZTogMTIgfSB9LCB6aFsnY2FyZC5tZW51VmlzaWJsZURlc2MnXSksXG4gICAgICApLFxuICAgICAgY2Fwc3VsZSxcbiAgICAgIGVyciA/IGgoJ3NwYW4nLCB7IHN0eWxlOiB7IGNvbG9yOiAnI2Y4NTE0OScsIGZvbnRTaXplOiAxMiB9IH0sIGVycikgOiBudWxsLFxuICAgICksXG4gIH0pXG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBV0EsSUFBQUEsZ0JBQW1DOzs7QUNtQm5DLElBQU0sT0FBTyxHQUFHLE9BQU8sU0FBUyxNQUFNO0FBRXRDLGVBQWUsWUFBZSxNQUFjLE1BQWdDO0FBQzFFLFFBQU0sTUFBTSxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsSUFBSSxJQUFJO0FBQUEsSUFDeEMsU0FBUyxFQUFFLGdCQUFnQixtQkFBbUI7QUFBQSxJQUM5QyxHQUFHO0FBQUEsRUFDTCxDQUFDO0FBQ0QsTUFBSSxDQUFDLElBQUksSUFBSTtBQUNYLFVBQU0sSUFBSSxNQUFNLFFBQVEsSUFBSSxNQUFNLEVBQUU7QUFBQSxFQUN0QztBQUNBLFNBQVEsTUFBTSxJQUFJLEtBQUs7QUFDekI7QUFHTyxTQUFTLFlBQVksUUFBUSxPQUE4QjtBQUNoRSxTQUFPLFlBQTBCLFVBQVUsUUFBUSxhQUFhLEVBQUUsRUFBRTtBQUN0RTtBQUdPLFNBQVMsWUFBWSxNQUFzRDtBQUNoRixTQUFPLFlBQXVCLFFBQVE7QUFBQSxJQUNwQyxRQUFRO0FBQUEsSUFDUixNQUFNLEtBQUssVUFBVSxFQUFFLEtBQUssQ0FBQztBQUFBLEVBQy9CLENBQUM7QUFDSDtBQUdPLFNBQVMsbUJBQW1CLFNBQThEO0FBQy9GLFNBQU8sWUFBWSxTQUFTO0FBQUEsSUFDMUIsUUFBUTtBQUFBLElBQ1IsTUFBTSxLQUFLLFVBQVUsRUFBRSxRQUFRLENBQUM7QUFBQSxFQUNsQyxDQUFDO0FBQ0g7OztBQ3RDTyxJQUFNLEtBQWdDO0FBQUEsRUFDM0MsY0FBYztBQUFBLEVBQ2Qsb0JBQW9CO0FBQUEsRUFDcEIscUJBQXFCO0FBQUEsRUFDckIsa0JBQWtCO0FBQUEsRUFDbEIsc0JBQXNCO0FBQUEsRUFDdEIsYUFBYTtBQUFBLEVBQ2IsYUFBYTtBQUFBLEVBQ2IsZUFBZTtBQUFBLEVBQ2YsY0FBYztBQUFBLEVBQ2QsZ0JBQWdCO0FBQUEsRUFDaEIsZUFBZTtBQUFBLEVBQ2YsY0FBYztBQUFBLEVBQ2Qsb0JBQW9CO0FBQUEsRUFDcEIsb0JBQW9CO0FBQUEsRUFDcEIsd0JBQXdCO0FBQUEsRUFDeEIsYUFBYTtBQUFBLEVBQ2IsYUFBYTtBQUFBLEVBQ2IsbUJBQW1CO0FBQ3JCOzs7QUMzQk8sSUFBTSxpQkFBaUI7QUFFOUIsSUFBTSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWdDTCxTQUFTLGdCQUEwQztBQUN4RCxRQUFNLE1BQU0sTUFBTSxLQUFLLFNBQVMsaUJBQW9DLFFBQVEsQ0FBQztBQUM3RSxRQUFNLEtBQUs7QUFFWCxRQUFNLFVBQVUsSUFBSSxLQUFLLENBQUMsTUFBTSxjQUFjLEtBQUssRUFBRSxTQUFTLENBQUM7QUFDL0QsTUFBSSxRQUFTLFFBQU87QUFFcEIsUUFBTSxTQUFTLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUM7QUFDM0QsTUFBSSxPQUFRLFFBQU87QUFFbkIsU0FDRSxJQUFJO0FBQUEsSUFDRixDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUUsYUFBYSxZQUFZLEtBQUssRUFBRSxLQUFLLEdBQUcsS0FBSyxFQUFFLGFBQWEsT0FBTyxLQUFLLEVBQUU7QUFBQSxFQUM3RixLQUFLO0FBRVQ7QUFHQSxTQUFTLGVBQTRCO0FBQ25DLE1BQUksT0FBTyxTQUFTLGVBQWUsb0JBQW9CO0FBQ3ZELE1BQUksS0FBTSxRQUFPO0FBQ2pCLFNBQU8sU0FBUyxjQUFjLEtBQUs7QUFDbkMsT0FBSyxLQUFLO0FBQ1YsT0FBSyxZQUFZO0FBQ2pCLFdBQVMsS0FBSyxZQUFZLElBQUk7QUFDOUIsU0FBTztBQUNUO0FBZ0JBLFNBQVMsa0JBQWlFO0FBQ3hFLFFBQU0sTUFBTSxNQUFNLEtBQUssU0FBUyxpQkFBb0Msb0JBQW9CLENBQUM7QUFDekYsUUFBTSxTQUFTLElBQUk7QUFBQSxJQUFLLENBQUMsTUFDdkIsK0JBQStCLEtBQUssRUFBRSxhQUFhLFlBQVksS0FBSyxFQUFFO0FBQUEsRUFDeEU7QUFDQSxNQUFJLENBQUMsT0FBUSxRQUFPO0FBQ3BCLFFBQU0sUUFBUSxPQUFPO0FBQ3JCLFFBQU0sYUFBYSxPQUFPO0FBQzFCLFFBQU0sT0FBTyxZQUFZO0FBQ3pCLE1BQUksQ0FBQyxRQUFRLENBQUMsV0FBWSxRQUFPO0FBQ2pDLFNBQU8sRUFBRSxNQUFNLFFBQVEsV0FBVztBQUNwQztBQUdBLFNBQVMsZUFBOEQ7QUFDckUsUUFBTSxLQUFLLGdCQUFnQjtBQUMzQixNQUFJLEdBQUksUUFBTztBQUNmLFFBQU0sU0FBUyxjQUFjO0FBQzdCLFFBQU0sWUFBWSxRQUFRO0FBQzFCLE1BQUksYUFBYSxPQUFRLFFBQU8sRUFBRSxNQUFNLFdBQVcsUUFBUSxPQUFPO0FBQ2xFLFNBQU8sRUFBRSxNQUFNLGFBQWEsR0FBRyxRQUFRLEtBQUs7QUFDOUM7QUFFQSxTQUFTLFdBQTZCO0FBQ3BDLFFBQU0sV0FBVyxTQUFTLGVBQWUsWUFBWTtBQUNyRCxNQUFJLFNBQVUsUUFBTztBQUNyQixRQUFNLFFBQVEsU0FBUyxjQUFjLE9BQU87QUFDNUMsUUFBTSxLQUFLO0FBQ1gsUUFBTSxjQUFjO0FBQ3BCLFdBQVMsS0FBSyxZQUFZLEtBQUs7QUFDL0IsU0FBTztBQUNUO0FBRUEsU0FBUyxlQUFlLFFBQTJEO0FBQ2pGLFFBQU0sRUFBRSxNQUFNLE9BQU8sSUFBSTtBQUN6QixNQUFJLENBQUMsUUFBUSxDQUFDLE9BQVEsUUFBTztBQUM3QixNQUFJLEtBQUssTUFBTSxPQUFPLEdBQUksUUFBTztBQUNqQyxNQUFJLEtBQUssT0FBTyxPQUFPLEdBQUksUUFBTztBQUNsQyxTQUFPLEtBQUssS0FBSyxTQUFTO0FBQzVCO0FBRUEsU0FBUyxXQUFXLFFBQThCO0FBQ2hELFFBQU0sRUFBRSxNQUFNLE9BQU8sSUFBSTtBQUN6QixNQUFJLENBQUMsUUFBUSxDQUFDLE9BQVEsUUFBTyxHQUFHLG9CQUFvQjtBQUNwRCxNQUFJLEtBQUssTUFBTSxPQUFPLEdBQUksUUFBTyxHQUFHLGtCQUFrQjtBQUN0RCxNQUFJLENBQUMsS0FBSyxNQUFNLE9BQU8sR0FBSSxRQUFPLEdBQUcsbUJBQW1CO0FBQ3hELE1BQUksQ0FBQyxLQUFLLE1BQU0sQ0FBQyxPQUFPLEdBQUksUUFBTyxHQUFHLGdCQUFnQjtBQUN0RCxTQUFPLEdBQUcsb0JBQW9CO0FBQ2hDO0FBRUEsSUFBTSxPQUFPO0FBTU4sU0FBUyxnQkFBZ0IsVUFBNkIsQ0FBQyxHQUFlO0FBQzNFLFdBQVM7QUFDVCxNQUFJLFdBQVc7QUFDZixNQUFJLFdBQW9DO0FBQ3hDLE1BQUksU0FBZ0M7QUFDcEMsTUFBSSxVQUFvQztBQUN4QyxNQUFJLFNBQThCO0FBRWxDLFFBQU0sY0FBYyxNQUFZO0FBQzlCLFlBQVEsT0FBTztBQUNmLGFBQVM7QUFBQSxFQUNYO0FBRUEsUUFBTSxZQUFZLE1BQVksWUFBWTtBQUUxQyxRQUFNLGFBQWEsWUFBMkI7QUFDNUMsUUFBSSxTQUFVO0FBQ2QsZ0JBQVk7QUFDWixRQUFJO0FBQ0osUUFBSTtBQUNGLGVBQVMsTUFBTSxZQUFZLEtBQUs7QUFBQSxJQUNsQyxRQUFRO0FBRU4sZUFBUztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQVEsaUJBQWlCO0FBQUEsUUFBTSxjQUFjO0FBQUEsUUFBSSxnQkFBZ0I7QUFBQSxRQUN2RSxXQUFXLEdBQUcsaUJBQWlCO0FBQUEsUUFBRyxjQUFjO0FBQUEsUUFBTSxhQUFhO0FBQUEsUUFDbkUsTUFBTSxFQUFFLElBQUksT0FBTyxJQUFJLEdBQUcsT0FBTyxHQUFHLGlCQUFpQixFQUFFO0FBQUEsUUFDdkQsUUFBUSxFQUFFLElBQUksT0FBTyxJQUFJLEdBQUcsT0FBTyxHQUFHLGlCQUFpQixFQUFFO0FBQUEsTUFDM0Q7QUFBQSxJQUNGO0FBQ0EsYUFBUztBQUNULFFBQUksQ0FBQyxRQUFTO0FBQ2QsUUFBSTtBQUNGLFlBQU0sT0FBTyxRQUFRLHNCQUFzQjtBQUU3QyxZQUFNLE1BQU0sZUFBZSxNQUFNO0FBQ2pDLFlBQU0sUUFDSjtBQUFBLFFBQ0UsRUFBRSxLQUFLLFFBQVEsT0FBTyxHQUFHLFdBQVcsR0FBRyxLQUFLLE9BQU87QUFBQSxRQUNuRCxFQUFFLEtBQUssUUFBUSxPQUFPLEdBQUcsV0FBVyxHQUFHLEtBQUssT0FBTztBQUFBLFFBQ25ELEVBQUUsS0FBSyxVQUFVLE9BQU8sR0FBRyxhQUFhLEdBQUcsS0FBSyxTQUFTO0FBQUEsTUFDM0Q7QUFHRixZQUFNLE9BQU8sU0FBUyxjQUFjLEtBQUs7QUFDekMsV0FBSyxZQUFZO0FBQ2pCLFdBQUssTUFBTSxPQUFPLEdBQUcsS0FBSyxJQUFJLEdBQUcsS0FBSyxRQUFRLEdBQUcsQ0FBQztBQUNsRCxXQUFLLE1BQU0sTUFBTSxHQUFHLEtBQUssU0FBUyxDQUFDO0FBQ25DLFdBQUssYUFBYSxRQUFRLE1BQU07QUFFaEMsWUFBTSxPQUFPLFNBQVMsY0FBYyxLQUFLO0FBQ3pDLFdBQUssWUFBWTtBQUNqQixXQUFLLFFBQVEsV0FBVyxNQUFNO0FBQzlCLFlBQU0sT0FBTyxTQUFTLGNBQWMsTUFBTTtBQUMxQyxXQUFLLFlBQVksYUFBYSxHQUFHO0FBQ2pDLFdBQUssWUFBWSxJQUFJO0FBQ3JCLFdBQUssWUFBWSxTQUFTLGVBQWUsR0FBRyxZQUFZLENBQUMsQ0FBQztBQUMxRCxXQUFLLFlBQVksSUFBSTtBQUVyQixpQkFBVyxRQUFRLE9BQU87QUFDeEIsY0FBTSxNQUFNLFNBQVMsY0FBYyxRQUFRO0FBQzNDLFlBQUksWUFBWTtBQUNoQixZQUFJLGFBQWEsUUFBUSxVQUFVO0FBQ25DLGNBQU0sT0FBTyxTQUFTLGNBQWMsTUFBTTtBQUMxQyxjQUFNLFlBQVksT0FBTyxTQUFTLEtBQUs7QUFDdkMsYUFBSyxjQUFjLEdBQUcsS0FBSyxLQUFLLFNBQUksS0FBSyxHQUFHO0FBQzVDLFlBQUksV0FBVztBQUNiLGdCQUFNLE1BQU0sU0FBUyxjQUFjLE1BQU07QUFDekMsY0FBSSxZQUFZO0FBQ2hCLGNBQUksY0FBYyxTQUFJLEdBQUcsY0FBYyxDQUFDO0FBQ3hDLGVBQUssWUFBWSxHQUFHO0FBQUEsUUFDdEI7QUFDQSxZQUFJLFlBQVksSUFBSTtBQUNwQixjQUFNLEtBQUssU0FBUyxjQUFjLE1BQU07QUFDeEMsV0FBRyxZQUFZO0FBQ2YsY0FBTSxjQUFjLEtBQUssUUFBUSxTQUFTLE9BQU8sT0FBTyxLQUFLLFFBQVEsV0FBVyxPQUFPLFNBQVM7QUFDaEcsV0FBRyxjQUFjLGNBQWMsR0FBRyxZQUFZLEVBQUUsT0FBTztBQUN2RCxZQUFJLFlBQVksRUFBRTtBQUNsQixZQUFJLGlCQUFpQixTQUFTLE1BQU07QUFDbEMsZUFBSyxZQUFZLEtBQUssR0FBRztBQUN6QixlQUFLLFdBQVc7QUFBQSxRQUNsQixDQUFDO0FBQ0QsYUFBSyxZQUFZLEdBQUc7QUFBQSxNQUN0QjtBQUVBLFlBQU0sTUFBTSxTQUFTLGNBQWMsS0FBSztBQUN4QyxVQUFJLFlBQVk7QUFDaEIsV0FBSyxZQUFZLEdBQUc7QUFFcEIsWUFBTSxRQUFRLFNBQVMsY0FBYyxRQUFRO0FBQzdDLFlBQU0sWUFBWTtBQUNsQixZQUFNLGNBQWMsVUFBSyxHQUFHLFlBQVksQ0FBQztBQUN6QyxZQUFNLGlCQUFpQixTQUFTLE1BQU07QUFFcEMsYUFBSyxZQUFZLElBQUksRUFBRSxLQUFLLE1BQU0sV0FBVyxDQUFDO0FBQUEsTUFDaEQsQ0FBQztBQUNELFdBQUssWUFBWSxLQUFLO0FBRXRCLGVBQVMsS0FBSyxZQUFZLElBQUk7QUFDOUIsZUFBUztBQUFBLElBQ1QsU0FBUyxPQUFPO0FBRWQsY0FBUSxNQUFNLG9DQUFvQyxLQUFLO0FBQUEsSUFDekQ7QUFBQSxFQUNGO0FBRUEsUUFBTSxhQUFhLE1BQXlCO0FBQzFDLFVBQU0sTUFBTSxTQUFTLGNBQWMsUUFBUTtBQUMzQyxRQUFJLE9BQU87QUFDWCxRQUFJLFlBQVk7QUFDaEIsUUFBSSxhQUFhLHlCQUF5QixFQUFFO0FBQzVDLFFBQUksYUFBYSxjQUFjLEdBQUcsWUFBWSxDQUFDO0FBQy9DLFFBQUksWUFBWTtBQUNoQixVQUFNLE1BQU0sU0FBUyxjQUFjLE1BQU07QUFDekMsUUFBSSxZQUFZO0FBQ2hCLFFBQUksWUFBWSxHQUFHO0FBQ25CLFFBQUksaUJBQWlCLFNBQVMsQ0FBQyxVQUFVO0FBQ3ZDLFlBQU0sZ0JBQWdCO0FBQ3RCLFVBQUksT0FBUSxXQUFVO0FBQUEsVUFDakIsTUFBSyxXQUFXO0FBQUEsSUFDdkIsQ0FBQztBQUNELFdBQU87QUFBQSxFQUNUO0FBR0EsTUFBSSxhQUFhO0FBQ2pCLFFBQU0sY0FBYyxNQUFZO0FBQzlCLFFBQUksWUFBWSxXQUFZO0FBQzVCLGlCQUFhO0FBRWIsU0FBSyxZQUFZLEtBQUssRUFDbkIsS0FBSyxDQUFDLFdBQVc7QUFDaEIsVUFBSSxTQUFVO0FBQ2QsZUFBUztBQUNULFlBQU0sZ0JBQWdCLE9BQU8sZ0JBQWdCO0FBQzdDLFlBQU0sUUFBUSxhQUFhO0FBQzNCLFlBQU0sV0FBVyxTQUFTLGNBQWlDLGNBQWM7QUFDekUsVUFBSSxDQUFDLGVBQWU7QUFDbEIsa0JBQVUsT0FBTztBQUNqQixvQkFBWTtBQUNaLGdCQUFRLHNCQUFzQixLQUFLO0FBQ25DO0FBQUEsTUFDRjtBQUNBLFVBQUksWUFBWSxTQUFTLGtCQUFrQixNQUFNLE1BQU07QUFDckQsa0JBQVU7QUFDVjtBQUFBLE1BQ0Y7QUFDQSxVQUFJLFNBQVUsVUFBUyxPQUFPO0FBQzlCLFlBQU0sTUFBTSxXQUFXO0FBQ3ZCLFVBQUksVUFBVSxJQUFJLFlBQVk7QUFFOUIsWUFBTSxNQUFNLElBQUksY0FBYyxXQUFXO0FBQ3pDLFVBQUksSUFBSyxLQUFJLFVBQVUsSUFBSSxlQUFlLE1BQU0sQ0FBQztBQUNqRCxVQUFJLE1BQU0sT0FBUSxPQUFNLEtBQUssYUFBYSxLQUFLLE1BQU0sTUFBTTtBQUFBLFVBQ3RELE9BQU0sS0FBSyxZQUFZLEdBQUc7QUFFL0IsVUFBSSxNQUFNLEtBQUssT0FBTyxzQkFBc0I7QUFDMUMsaUJBQVMsZUFBZSxvQkFBb0IsR0FBRyxPQUFPO0FBQUEsTUFDeEQ7QUFDQSxnQkFBVTtBQUNWLGNBQVEsc0JBQXNCLElBQUk7QUFBQSxJQUNwQyxDQUFDLEVBQ0EsTUFBTSxNQUFNO0FBRVgsVUFBSSxTQUFVO0FBQ2QsWUFBTSxRQUFRLGFBQWE7QUFDM0IsWUFBTSxXQUFXLFNBQVMsY0FBaUMsY0FBYztBQUN6RSxVQUFJLFVBQVU7QUFDWixrQkFBVTtBQUNWO0FBQUEsTUFDRjtBQUNBLGdCQUFVLFdBQVc7QUFDckIsVUFBSSxNQUFNLE9BQVEsT0FBTSxLQUFLLGFBQWEsU0FBUyxNQUFNLE1BQU07QUFBQSxVQUMxRCxPQUFNLEtBQUssWUFBWSxPQUFPO0FBQUEsSUFDckMsQ0FBQyxFQUNBLFFBQVEsTUFBTTtBQUNiLG1CQUFhO0FBQUEsSUFDZixDQUFDO0FBQUEsRUFDTDtBQUtBLE1BQUksYUFBYTtBQUNqQixhQUFXLElBQUksaUJBQWlCLE1BQU07QUFDcEMsUUFBSSxTQUFVO0FBQ2QsVUFBTSxXQUFXLFNBQVMsY0FBaUMsY0FBYztBQUV6RSxRQUFJLENBQUMsVUFBVTtBQUNiLGtCQUFZO0FBQ1o7QUFBQSxJQUNGO0FBR0EsVUFBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixRQUFJLE1BQU0sYUFBYSxJQUFLO0FBQzVCLFVBQU0sS0FBSyxnQkFBZ0I7QUFDM0IsUUFBSSxNQUFNLFNBQVMsa0JBQWtCLEdBQUcsTUFBTTtBQUM1QyxtQkFBYTtBQUNiLGtCQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0YsQ0FBQztBQUNELFdBQVMsUUFBUSxTQUFTLE1BQU0sRUFBRSxXQUFXLE1BQU0sU0FBUyxLQUFLLENBQUM7QUFHbEUsUUFBTSxhQUFhLENBQUMsVUFBNEI7QUFDOUMsUUFBSSxVQUFVLENBQUMsT0FBTyxTQUFTLE1BQU0sTUFBYyxLQUFLLENBQUMsU0FBUyxTQUFTLE1BQU0sTUFBYyxHQUFHO0FBQ2hHLGdCQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFDQSxRQUFNLFFBQVEsQ0FBQyxVQUErQjtBQUM1QyxRQUFJLE1BQU0sUUFBUSxTQUFVLFdBQVU7QUFBQSxFQUN4QztBQUNBLFdBQVMsaUJBQWlCLFNBQVMsWUFBWSxJQUFJO0FBQ25ELFdBQVMsaUJBQWlCLFdBQVcsT0FBTyxJQUFJO0FBR2hELFFBQU0sb0JBQW9CLE1BQVksWUFBWTtBQUNsRCxTQUFPLGlCQUFpQiwyQkFBMkIsaUJBQWlCO0FBR3BFLE1BQUksV0FBVztBQUNmLFFBQU0sV0FBVyxNQUFZO0FBQzNCLGdCQUFZO0FBSVosVUFBTSxXQUFXLFNBQVMsY0FBaUMsY0FBYztBQUN6RSxVQUFNLEtBQUssZ0JBQWdCO0FBQzNCLFVBQU0sWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxTQUFTLGtCQUFrQixHQUFHO0FBQ3RFLFFBQUksQ0FBQyxhQUFhLFdBQVcsSUFBSTtBQUMvQixrQkFBWTtBQUNaLGlCQUFXLFVBQVUsR0FBRztBQUFBLElBQzFCO0FBQUEsRUFDRjtBQUNBLFdBQVM7QUFFVCxTQUFPLE1BQU07QUFDWCxlQUFXO0FBQ1gsY0FBVSxXQUFXO0FBQ3JCLGFBQVMsb0JBQW9CLFNBQVMsWUFBWSxJQUFJO0FBQ3RELGFBQVMsb0JBQW9CLFdBQVcsT0FBTyxJQUFJO0FBQ25ELFdBQU8sb0JBQW9CLDJCQUEyQixpQkFBaUI7QUFDdkUsYUFBUyxPQUFPO0FBQ2hCLGFBQVMsZUFBZSxvQkFBb0IsR0FBRyxPQUFPO0FBQ3RELGdCQUFZO0FBQUEsRUFDZDtBQUNGOzs7QUNyWUEsbUJBQXdFO0FBS2pFLFNBQVMsNEJBQWtDO0FBQ2hELFNBQU8sY0FBYyxJQUFJLFlBQVkseUJBQXlCLENBQUM7QUFDakU7QUFNQSxTQUFTLFVBQVUsT0FJTDtBQUNaLGFBQU8sYUFBQUM7QUFBQSxJQUFFO0FBQUEsSUFBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLFNBQVMsRUFBRTtBQUFBLFFBQzdDLGFBQUFBLGVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEtBQUssVUFBVSxJQUFJLGNBQWMsRUFBRSxFQUFFLEdBQUcsTUFBTSxLQUFLO0FBQUEsUUFDbkYsYUFBQUEsZUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sdUNBQXVDLFVBQVUsSUFBSSxjQUFjLEdBQUcsRUFBRSxHQUFHLE1BQU0sV0FBVztBQUFBLElBQ3ZILE1BQU07QUFBQSxFQUNSO0FBQ0Y7QUFFTyxTQUFTLG1CQUFtQixRQUE4QjtBQUMvRCxRQUFNLENBQUMsU0FBUyxVQUFVLFFBQUksdUJBQXlCLElBQUk7QUFDM0QsUUFBTSxDQUFDLE1BQU0sT0FBTyxRQUFJLHVCQUFTLEtBQUs7QUFDdEMsUUFBTSxDQUFDLEtBQUssTUFBTSxRQUFJLHVCQUF3QixJQUFJO0FBRWxELDhCQUFVLE1BQU07QUFDZCxRQUFJLFFBQVE7QUFDWixnQkFBWSxFQUNULEtBQUssQ0FBQyxNQUFNO0FBQ1gsVUFBSSxNQUFPLFlBQVcsRUFBRSxnQkFBZ0IsS0FBSztBQUFBLElBQy9DLENBQUMsRUFDQSxNQUFNLE1BQU07QUFDWCxVQUFJLE1BQU8sWUFBVyxJQUFJO0FBQUEsSUFDNUIsQ0FBQztBQUNILFdBQU8sTUFBTTtBQUNYLGNBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sU0FBUyxNQUFZO0FBQ3pCLFFBQUksWUFBWSxRQUFRLEtBQU07QUFDOUIsVUFBTSxPQUFPLENBQUM7QUFDZCxZQUFRLElBQUk7QUFDWixXQUFPLElBQUk7QUFDWCx1QkFBbUIsSUFBSSxFQUNwQixLQUFLLE1BQU07QUFDVixpQkFBVyxJQUFJO0FBQ2YsZ0NBQTBCO0FBQUEsSUFDNUIsQ0FBQyxFQUNBLE1BQU0sQ0FBQyxNQUFlLE9BQU8sYUFBYSxRQUFRLEVBQUUsVUFBVSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQ3hFLFFBQVEsTUFBTSxRQUFRLEtBQUssQ0FBQztBQUFBLEVBQ2pDO0FBRUEsUUFBTSxjQUFVLGFBQUFBO0FBQUEsSUFDZDtBQUFBLElBQ0E7QUFBQSxNQUNFLFNBQVM7QUFBQSxNQUNULFVBQVUsWUFBWSxRQUFRO0FBQUEsTUFDOUIsT0FBTztBQUFBLFFBQ0wsU0FBUztBQUFBLFFBQWUsWUFBWTtBQUFBLFFBQVUsS0FBSztBQUFBLFFBQ25ELFNBQVM7QUFBQSxRQUFZLGNBQWM7QUFBQSxRQUFLLFVBQVU7QUFBQSxRQUFJLFFBQVE7QUFBQSxRQUM5RCxRQUFRO0FBQUEsUUFDUixZQUFZLFVBQVUsd0JBQXdCO0FBQUEsUUFDOUMsT0FBTyxVQUFVLFlBQVk7QUFBQSxRQUM3QixZQUFZO0FBQUEsTUFDZDtBQUFBLE1BQ0EsZ0JBQWdCLE9BQU8sWUFBWSxJQUFJO0FBQUEsSUFDekM7QUFBQSxRQUNBLGFBQUFBLGVBQUUsUUFBUTtBQUFBLE1BQ1IsT0FBTyxFQUFFLE9BQU8sR0FBRyxRQUFRLEdBQUcsY0FBYyxPQUFPLFlBQVksZ0JBQWdCLFNBQVMsZUFBZTtBQUFBLElBQ3pHLENBQUM7QUFBQSxJQUNELFVBQVUsR0FBRyxXQUFXLElBQUksR0FBRyxXQUFXO0FBQUEsRUFDNUM7QUFFQSxTQUFPLFVBQVU7QUFBQSxJQUNmLE9BQU8sR0FBRyxZQUFZO0FBQUEsSUFDdEIsYUFBYSxHQUFHLGtCQUFrQjtBQUFBLElBQ2xDLGNBQVUsYUFBQUE7QUFBQSxNQUFFO0FBQUEsTUFBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLFFBQVEsWUFBWSxVQUFVLEtBQUssSUFBSSxVQUFVLE9BQU8sRUFBRTtBQUFBLFVBQy9GLGFBQUFBO0FBQUEsUUFBRTtBQUFBLFFBQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxHQUFHLEVBQUU7QUFBQSxRQUNqQyxHQUFHLGtCQUFrQjtBQUFBLFlBQ3JCLGFBQUFBLGVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLHNDQUFzQyxVQUFVLEdBQUcsRUFBRSxHQUFHLEdBQUcsc0JBQXNCLENBQUM7QUFBQSxNQUMvRztBQUFBLE1BQ0E7QUFBQSxNQUNBLFVBQU0sYUFBQUEsZUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sV0FBVyxVQUFVLEdBQUcsRUFBRSxHQUFHLEdBQUcsSUFBSTtBQUFBLElBQ3hFO0FBQUEsRUFDRixDQUFDO0FBQ0g7OztBSmxGTyxJQUFNLE9BQU87QUFNYixJQUFNLFNBQVMsQ0FBQyxPQUFPO0FBRzlCLElBQUksVUFBVTtBQVdQLFNBQVMsTUFBTSxLQUFzQjtBQUMxQyxNQUFJLFFBQVM7QUFDYixZQUFVO0FBR1YsU0FBTyxpQkFBaUIsMkJBQTJCLE1BQU07QUFBQSxFQUd6RCxDQUFDO0FBRUQsTUFBSTtBQUNGLG9CQUFnQjtBQUFBLE1BQ2QscUJBQXFCLE1BQU0sMEJBQTBCO0FBQUEsSUFDdkQsQ0FBQztBQUFBLEVBQ0gsU0FBUyxPQUFPO0FBQ2QsWUFBUSxLQUFLLDBDQUEwQyxLQUFLO0FBQUEsRUFDOUQ7QUFJQSxNQUFJLElBQUksT0FBTyxVQUFVLElBQUksTUFBTSxVQUFVO0FBQzNDLFFBQUk7QUFDRixVQUFJLE1BQU07QUFBQSxRQUFPO0FBQUEsUUFBd0IsTUFDdkMsSUFBSSxNQUFNO0FBQUEsVUFDUjtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sS0FBSztBQUFBLFlBQ0wsUUFBUTtBQUFBLFlBQ1IsUUFBUSxPQUFPLENBQUM7QUFBQSxVQUNsQjtBQUFBLFVBQ0EsVUFBTSxjQUFBQyxlQUFFLG9CQUFvQixDQUFDLENBQUM7QUFBQSxRQUNoQztBQUFBLE1BQ0Y7QUFBQSxJQUNGLFNBQVMsT0FBTztBQUNkLGNBQVEsS0FBSywrQ0FBK0MsS0FBSztBQUFBLElBQ25FO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaCIsICJoIl0KfQo=

return module.exports; } });