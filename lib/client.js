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
  observer = new MutationObserver(() => {
    if (disposed) return;
    if (document.querySelector(ENTRY_SELECTOR)) return;
    ensureEntry();
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
    if (!document.querySelector(ENTRY_SELECTOR) && attempts < 20) {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NsaWVudC9pbmRleC50cyIsICJzcmMvY2xpZW50L2hvc3QtYXBpLnRzIiwgInNyYy9jbGllbnQvbG9jYWxlcy50cyIsICJzcmMvY2xpZW50L2hlYWRlci1tZW51LnRzIiwgInNyYy9jbGllbnQvc2V0dGluZ3MtY2FyZC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogZHNoLXJlZ2lvbiBjbGllbnQgYnVuZGxlIFx1NTE2NVx1NTNFM1x1MzAwMlxuICpcbiAqIFx1NjMwMlx1OEY3RFx1NEUyNFx1NTkwNCBVSVx1RkYxQVxuICogIDEuIFx1NTNGM1x1NEUwQVx1ODlEMlx1NkU5MFx1N0JBMVx1NzQwNlx1ODNEQ1x1NTM1NVx1RkYwOFx1N0VBRiBET00gXHU2Q0U4XHU1MTY1XHVGRjBDXHU4OUMxIGhlYWRlci1tZW51LnRzXHVGRjA5XG4gKiAgMi4gXHU4QkJFXHU3RjZFXHU5ODc1XHUzMDBDZHNoLXJlZ2lvbiBcdTZFOTBcdTdCQTFcdTc0MDZcdTMwMERcdTUzNjFcdTcyNDdcdUZGMDhSZWFjdFx1RkYwQ1x1NUI5OFx1NjVCOSBzZXR0aW5ncy5wbHVnaW4uaXRlbSBcdTY5RkRcdTRGNERcdUZGMENcbiAqICAgICBcdTVENENcdTU5NTcgaW5qZWN0IHNldHRpbmdzU2NvcGVcdTIwMTRcdTIwMTRcdTY1RTcgaG9zdCBcdTY1RTBcdTZCNjRcdTY3MERcdTUyQTFcdTY1RjZcdTUzNjFcdTcyNDdcdTk3NTlcdTlFRDhcdTRFMERcdTUxRkFcdTczQjBcdUZGMDlcbiAqXG4gKiBcdTk0QzFcdTVGOEJcdUZGMUFcdTRFRkJcdTRGNTVcdTYzMDJcdThGN0RcdTU5MzFcdThEMjVcdTUzRUEgY29uc29sZS53YXJuXHVGRjBDXHU3RUREXHU0RTBEIHRocm93XHVGRjA4XHU1OTE2XHU5MEU4XHU2M0QyXHU0RUY2XHU0RTBEXHU4MEZEXHU2MkQ2XHU1N0FFIERTSCBcdTU0MkZcdTUyQThcdUZGMDlcdTMwMDJcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IGFzIGggfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IG1vdW50SGVhZGVyTWVudSB9IGZyb20gJy4vaGVhZGVyLW1lbnUuanMnXG5pbXBvcnQgeyBSZWdpb25TZXR0aW5nc0NhcmQsIGRpc3BhdGNoVmlzaWJpbGl0eUNoYW5nZWQgfSBmcm9tICcuL3NldHRpbmdzLWNhcmQuanMnXG5cbmV4cG9ydCBjb25zdCBuYW1lID0gJ2RzaC1yZWdpb24nXG5cbi8qKiBcdTU4RjBcdTY2MEVcdTk3MDBcdTg5ODFcdTc2ODQgY2xpZW50IFx1NjcwRFx1NTJBMVx1RkYxQXNsb3RzXHVGRjA4VUkgXHU2Q0U4XHU1MTY1XHU2ODM4XHU1RkMzXHVGRjA5XHUzMDAyXG4gKiAgXHU2Q0U4XHU2MTBGXHVGRjFBc2V0dGluZ3NTY29wZSBcdTRFMERcdTRGNUNcdTRFM0FcdTk4NzZcdTVDNDJcdTc4NkNcdTRGOURcdThENTZcdTIwMTRcdTIwMTRcdTVGNTNcdTUyNEQgZHNoIGhvc3RcdUZGMDgwLjIuMS1yYy4yXHVGRjA5XHU0RTBEXHU2M0QwXHU0RjlCXHU4QkU1XHU2NzBEXHU1MkExXHVGRjBDXG4gKiAgXHU1MTk5XHU1NzI4XHU5ODc2XHU1QzQyXHU0RjFBXHU4QkE5XHU2NTc0XHU0RTJBIGNsaWVudCBcdTY3NjFcdTc2RUVcdTZDMzhcdTRFNDUgcGVuZGluZ1x1RkYwQ1x1OEZEQlx1ODAwQ1x1NjJENlx1NTdBRSB3ZWIgYm9vdFx1RkYwOFwiMSBlbnRyeSBkaWQgbm90IGFjdGl2YXRlXCJcdUZGMDlcdTMwMDJcbiAqICBcdThCQkVcdTdGNkVcdTk4NzVcdTUzNjFcdTcyNDdcdTY1MzlcdTc1MzFcdTRFMEJcdTY1QjkgY3R4LmluamVjdChbJ3NldHRpbmdzU2NvcGUnXSwgLi4uKSBcdThGNkZcdTRGOURcdThENTZcdTVDMURcdThCRDVcdUZGMENcdTdGM0FcdTU5MzFcdTY1RjZcdTk3NTlcdTlFRDhcdThERjNcdThGQzdcdTMwMDIgKi9cbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJ11cblxuLyoqIFx1OTYzMlx1OTFDRFx1NTkwRFx1RkYxQVx1NTQwQ1x1NEUwMFx1OTg3NVx1OTc2Mlx1NzUxRlx1NTQ3RFx1NTQ2OFx1NjcxRlx1NTE4NVx1NTNFQVx1NUU5NFx1NzUyOFx1NEUwMFx1NkIyMVx1MzAwMiAqL1xubGV0IGFwcGxpZWQgPSBmYWxzZVxuXG5pbnRlcmZhY2UgQ2xpZW50Q3R4IHtcbiAgaW5qZWN0PyhkZXBzOiBzdHJpbmdbXSwgY2I6IChzY29wZWQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkKTogdm9pZFxuICBzbG90cz86IHtcbiAgICBpbmplY3Q/KHNsb3Q6IHN0cmluZywgcmVnaXN0ZXI6ICgpID0+IHVua25vd24pOiB2b2lkXG4gICAgcmVnaXN0ZXI/KG1ldGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBjb21wb25lbnQ6ICgpID0+IHVua25vd24pOiB1bmtub3duXG4gIH1cbiAgZWZmZWN0PyhmbjogKCkgPT4gdW5rbm93biwgbGFiZWw6IHN0cmluZyk6IHVua25vd25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KGN0eDogQ2xpZW50Q3R4KTogdm9pZCB7XG4gIGlmIChhcHBsaWVkKSByZXR1cm5cbiAgYXBwbGllZCA9IHRydWVcblxuICAvLyBcdTgzRENcdTUzNTVcdTY2M0VcdTk2OTBcdTc1MzEgc2VydmVyIFx1NzJCNlx1NjAwMVx1OUE3MVx1NTJBOFx1RkYxQlx1OEJCRVx1N0Y2RVx1OTg3NVx1ODBGNlx1NTZDQVx1NTIwN1x1NjM2Mlx1NTQwRVx1N0VDRiB3aW5kb3cgXHU0RThCXHU0RUY2XHU5MDFBXHU3N0U1XHU5MUNEXHU4QkM0XHU0RjMwXHUzMDAyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkc2hyOnZpc2liaWxpdHktY2hhbmdlZCcsICgpID0+IHtcbiAgICAvLyBoZWFkZXItbWVudSBcdTUxODVcdTkwRThcdTVERjJcdTc2RDFcdTU0MkNcdTU0MENcdTU0MERcdTRFOEJcdTRFRjZcdTUwNUEgZW5zdXJlRW50cnlcdUZGMUJcdTZCNjRcdTU5MDRcdTRFQzVcdTUxNUNcdTVFOTVcdTg5RTZcdTUzRDFcdTRFMDBcdTZCMjFcdTMwMDJcbiAgICB2b2lkIDBcbiAgfSlcblxuICB0cnkge1xuICAgIG1vdW50SGVhZGVyTWVudSh7XG4gICAgICBvbk1lbnVWaXNpYmxlQ2hhbmdlOiAoKSA9PiBkaXNwYXRjaFZpc2liaWxpdHlDaGFuZ2VkKCksXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLndhcm4oJ1tkc2gtcmVnaW9uXSBoZWFkZXIgbWVudSBtb3VudCBmYWlsZWQ6JywgZXJyb3IpXG4gIH1cblxuICAvLyBcdThCQkVcdTdGNkVcdTk4NzVcdTUzNjFcdTcyNDdcdUZGMUFcdTc1MjggY3R4LnNsb3RzXHVGRjA4aW5qZWN0IFx1NThGMFx1NjYwRVx1NTQwRVx1NTNFRlx1NzUyOFx1RkYwOVx1NkNFOFx1NTE4Q1x1NTIzMFx1NUI5OFx1NjVCOSBzZXR0aW5ncy5wbHVnaW4uaXRlbSBcdTY5RkRcdTRGNERcdTMwMDJcbiAgLy8gXHU2Q0U4XHVGRjFBXHU1RjUzXHU1MjREIERTSCBcdTcyNDhcdTY3MkNcdTc2ODRcdThCQkVcdTdGNkUgVUkgXHU2NzJBXHU2RTMyXHU2N0QzXHU4QkU1XHU2OUZEXHU0RjREXHVGRjBDXHU1MzYxXHU3MjQ3XHU2NjgyXHU0RTBEXHU1M0VGXHU4OUMxXHVGRjFCXHU0RUUzXHU3ODAxXHU0RkREXHU3NTU5XHVGRjBDXHU2OUZEXHU0RjREXHU1MTdDXHU1QkI5XHU1NDBFXHU4MUVBXHU1MkE4XHU1MUZBXHU3M0IwXHUzMDAyXG4gIGlmIChjdHguc2xvdHM/LmluamVjdCAmJiBjdHguc2xvdHMucmVnaXN0ZXIpIHtcbiAgICB0cnkge1xuICAgICAgY3R4LnNsb3RzLmluamVjdCgnc2V0dGluZ3MucGx1Z2luLml0ZW0nLCAoKSA9PlxuICAgICAgICBjdHguc2xvdHMucmVnaXN0ZXIhKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdzZXR0aW5ncy5wbHVnaW4uaXRlbScsXG4gICAgICAgICAgICBrZXk6ICdyZWdpb24nLFxuICAgICAgICAgICAgbG9jYWxlOiAnZHNoLXJlZ2lvbicsXG4gICAgICAgICAgICBpbmplY3Q6ICgpID0+ICh7fSksXG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiBoKFJlZ2lvblNldHRpbmdzQ2FyZCwge30pLFxuICAgICAgICApLFxuICAgICAgKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tkc2gtcmVnaW9uXSBzZXR0aW5ncyBjYXJkIHJlZ2lzdGVyIGZhaWxlZDonLCBlcnJvcilcbiAgICB9XG4gIH1cbn1cbiIsICIvKipcbiAqIGhvc3QtYXBpIFx1MjAxNFx1MjAxNCBjbGllbnQgXHU0RTBFIGhvc3QgXHU3QUVGIFJlZ2lvblNlcnZpY2UgXHU3Njg0IEhUVFAgXHU5MDFBXHU0RkUxXHUzMDAyXG4gKiBcdThENzBcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcdUZGMDhcdTU0MENcdTZFOTBcdUZGMDlcdUZGMENcdTc1MzEgRFNIIHdlYiBzZXJ2ZXIgXHU4RjZDXHU1M0QxXHU1MjMwXHU2M0QyXHU0RUY2XHU4REVGXHU3NTMxXHUzMDAyXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBQcm9iZVJlc3VsdCB7XG4gIG9rOiBib29sZWFuXG4gIG1zOiBudW1iZXJcbiAgZXJyb3I/OiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWdpb25TdGF0dXMge1xuICBtb2RlOiAnYXV0bycgfCAnbWFpbicgfCAnYmFja3VwJ1xuICBhcHBsaWVkUmVnaXN0cnk6IHN0cmluZyB8IG51bGxcbiAgbWFpblJlZ2lzdHJ5OiBzdHJpbmdcbiAgYmFja3VwUmVnaXN0cnk6IHN0cmluZ1xuICBsYXN0RXJyb3I6IHN0cmluZyB8IG51bGxcbiAgbGFzdFN3aXRjaEF0OiBzdHJpbmcgfCBudWxsXG4gIG1lbnVWaXNpYmxlOiBib29sZWFuXG4gIG1haW46IFByb2JlUmVzdWx0IHwgbnVsbFxuICBiYWNrdXA6IFByb2JlUmVzdWx0IHwgbnVsbFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZVJlc3VsdCB7XG4gIG9rOiBib29sZWFuXG4gIG1lc3NhZ2U6IHN0cmluZ1xufVxuXG4vLyBcdTc1MjggbG9jYXRpb24ub3JpZ2luIFx1NjJGQ1x1N0VERFx1NUJGOSBVUkxcdUZGMUFEU0ggXHU5ODc1XHU5NzYyXHU3M0FGXHU1ODgzXHU0RTBCXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0IGZldGNoIFx1NEYxQVx1NjMwMlx1OEQ3N1x1RkYwOFx1NUI5RVx1NkQ0Qlx1RkYwOVx1RkYwQ1xuLy8gXHU3RUREXHU1QkY5IFVSTCBcdTZCNjNcdTVFMzhcdTMwMDJvcmlnaW4gXHU1MkE4XHU2MDAxXHU4M0I3XHU1M0Q2XHVGRjBDRFNIIFx1NjM2Mlx1N0FFRlx1NTNFM1x1NEU1Rlx1OTAwMlx1OTE0RFx1MzAwMlxuY29uc3QgQkFTRSA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2RzaC1yZWdpb25gXG5cbmFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RKc29uPFQ+KHBhdGg6IHN0cmluZywgaW5pdD86IFJlcXVlc3RJbml0KTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0V9JHtwYXRofWAsIHtcbiAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAuLi5pbml0LFxuICB9KVxuICBpZiAoIXJlcy5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCAke3Jlcy5zdGF0dXN9YClcbiAgfVxuICByZXR1cm4gKGF3YWl0IHJlcy5qc29uKCkpIGFzIFRcbn1cblxuLyoqIFx1NjJDOVx1NTNENlx1NzJCNlx1NjAwMVx1MzAwMnByb2JlPXRydWUgXHU2NUY2IHNlcnZlciBcdTVCOUVcdTY1RjZcdTYzQTJcdTZENEJcdTUzQ0NcdTZFOTBcdUZGMDhcdTgzRENcdTUzNTVcdTMwMENcdTdBQ0JcdTUzNzNcdTZENEJcdTkwMUZcdTMwMERcdUZGMDlcdUZGMUJcdTlFRDhcdThCQTRcdThGRDRcdTU2REVcdTdGMTNcdTVCNThcdUZGMENcdTc5RDJcdTU2REVcdTMwMDIgKi9cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFN0YXR1cyhwcm9iZSA9IGZhbHNlKTogUHJvbWlzZTxSZWdpb25TdGF0dXM+IHtcbiAgcmV0dXJuIHJlcXVlc3RKc29uPFJlZ2lvblN0YXR1cz4oYC9zdGF0dXMke3Byb2JlID8gJz9wcm9iZT0xJyA6ICcnfWApXG59XG5cbi8qKiBcdTUyMDdcdTYzNjJcdTZBMjFcdTVGMEYgYXV0b3xtYWlufGJhY2t1cFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RNb2RlKG1vZGU6ICdhdXRvJyB8ICdtYWluJyB8ICdiYWNrdXAnKTogUHJvbWlzZTxVc2VSZXN1bHQ+IHtcbiAgcmV0dXJuIHJlcXVlc3RKc29uPFVzZVJlc3VsdD4oJy91c2UnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtb2RlIH0pLFxuICB9KVxufVxuXG4vKiogXHU4QkJFXHU3RjZFXHU1M0YzXHU0RTBBXHU4OUQyXHU4M0RDXHU1MzU1XHU2NjNFXHU5NjkwXHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdE1lbnVWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiBQcm9taXNlPHsgb2s6IGJvb2xlYW47IHZpc2libGU6IGJvb2xlYW4gfT4ge1xuICByZXR1cm4gcmVxdWVzdEpzb24oJy9tZW51Jywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdmlzaWJsZSB9KSxcbiAgfSlcbn1cbiIsICIvKipcbiAqIGRzaC1yZWdpb24gY2xpZW50IFx1NjU4N1x1Njg0OCBcdTIwMTRcdTIwMTQgXHU0RTJEXHU4MkYxXHU1M0NDXHU4QkVEXHU5NkM2XHU0RTJEXHU3QkExXHU3NDA2XHVGRjA4XHU5RUQ4XHU4QkE0XHU0RTJEXHU2NTg3XHVGRjBDXHU2M0QyXHU0RUY2XHU5NzYyXHU1NDExXHU1NkZEXHU1MTg1XHU3NTI4XHU2MjM3XHVGRjA5XHUzMDAyXG4gKi9cblxuZXhwb3J0IHR5cGUgUmVnaW9uS2V5ID1cbiAgfCAnbWVudS50aXRsZSdcbiAgfCAnbWVudS5zdGF0dXNHcmVlbidcbiAgfCAnbWVudS5zdGF0dXNZZWxsb3cnXG4gIHwgJ21lbnUuc3RhdHVzUmVkJ1xuICB8ICdtZW51LnN0YXR1c1Vua25vd24nXG4gIHwgJ21lbnUuYXV0bydcbiAgfCAnbWVudS5tYWluJ1xuICB8ICdtZW51LmJhY2t1cCdcbiAgfCAnbWVudS5wcm9iZSdcbiAgfCAnbWVudS5jdXJyZW50J1xuICB8ICdtZW51LmhpZGRlbidcbiAgfCAnY2FyZC50aXRsZSdcbiAgfCAnY2FyZC5kZXNjcmlwdGlvbidcbiAgfCAnY2FyZC5tZW51VmlzaWJsZSdcbiAgfCAnY2FyZC5tZW51VmlzaWJsZURlc2MnXG4gIHwgJ2NhcmQuc2hvdydcbiAgfCAnY2FyZC5oaWRlJ1xuICB8ICdlcnIuZmV0Y2hGYWlsZWQnXG5cbmV4cG9ydCBjb25zdCB6aDogUmVjb3JkPFJlZ2lvbktleSwgc3RyaW5nPiA9IHtcbiAgJ21lbnUudGl0bGUnOiAnZHNoLXJlZ2lvbiBcdTZFOTBcdTdCQTFcdTc0MDYnLFxuICAnbWVudS5zdGF0dXNHcmVlbic6ICdcdTRFM0JcdTZFOTBcdTZCNjNcdTVFMzhcdUZGMENcdTVGNTNcdTUyNERcdTRGN0ZcdTc1MjhcdTU2RkRcdTUxODVcdTk1NUNcdTUwQ0YnLFxuICAnbWVudS5zdGF0dXNZZWxsb3cnOiAnXHU0RTNCXHU2RTkwXHU0RTBEXHU1M0VGXHU3NTI4XHVGRjBDXHU1REYyXHU4MUVBXHU1MkE4XHU1MjA3XHU1MjMwXHU1Qjk4XHU2NUI5XHU2RTkwJyxcbiAgJ21lbnUuc3RhdHVzUmVkJzogJ1x1NTZGRFx1NTE4NVx1OTU1Q1x1NTBDRlx1NEUwRVx1NUI5OFx1NjVCOVx1NkU5MFx1NTc0N1x1NEUwRFx1NTNFRlx1NzUyOCcsXG4gICdtZW51LnN0YXR1c1Vua25vd24nOiAnXHU3MkI2XHU2MDAxXHU2NzJBXHU3N0U1XHVGRjBDXHU3MEI5XHU1MUZCXHUzMDBDXHU3QUNCXHU1MzczXHU2RDRCXHU5MDFGXHUzMDBEXHU2OEMwXHU2RDRCJyxcbiAgJ21lbnUuYXV0byc6ICdcdTgxRUFcdTUyQThcdTUyMDdcdTYzNjInLFxuICAnbWVudS5tYWluJzogJ1x1NTZGRFx1NTE4NVx1OTU1Q1x1NTBDRicsXG4gICdtZW51LmJhY2t1cCc6ICdcdTVCOThcdTY1QjlcdTZFOTAnLFxuICAnbWVudS5wcm9iZSc6ICdcdTdBQ0JcdTUzNzNcdTZENEJcdTkwMUYnLFxuICAnbWVudS5jdXJyZW50JzogJ1x1NUY1M1x1NTI0RCcsXG4gICdtZW51LmhpZGRlbic6ICdcdUZGMDhcdTgzRENcdTUzNTVcdTVERjJcdTk2OTBcdTg1Q0ZcdUZGMENcdTUzRUZcdTU3MjhcdThCQkVcdTdGNkVcdTRFMkRcdTVGMDBcdTU0MkZcdUZGMDknLFxuICAnY2FyZC50aXRsZSc6ICdkc2gtcmVnaW9uIFx1NkU5MFx1N0JBMVx1NzQwNicsXG4gICdjYXJkLmRlc2NyaXB0aW9uJzogJ0RTSCBcdTRFMEJcdThGN0RcdTZFOTBcdTRFM0JcdTU5MDdcdTUyMDdcdTYzNjJcdUZGMUFcdTU2RkRcdTUxODVcdTk1NUNcdTUwQ0ZcdTRFM0FcdTRFM0JcdTMwMDFcdTVCOThcdTY1QjlcdTZFOTBcdTRFM0FcdTU5MDdcdUZGMENcdTY1NDVcdTk2OUNcdTgxRUFcdTUyQThcdTUyMDdcdTYzNjInLFxuICAnY2FyZC5tZW51VmlzaWJsZSc6ICdcdTUzRjNcdTRFMEFcdTg5RDJcdTZFOTBcdTdCQTFcdTc0MDZcdTgzRENcdTUzNTUnLFxuICAnY2FyZC5tZW51VmlzaWJsZURlc2MnOiAnXHU1NzI4XHU0RjFBXHU4QkREXHU5ODc1XHU1M0YzXHU0RTBBXHU4OUQyXHVGRjA4XHU0RTBCXHU4RjdEIExvZyBcdTVERTZcdTRGQTdcdUZGMDlcdTY2M0VcdTc5M0FcdTZFOTBcdTdCQTFcdTc0MDZcdTRFMEJcdTYyQzlcdTgzRENcdTUzNTUnLFxuICAnY2FyZC5zaG93JzogJ1x1NjYzRVx1NzkzQScsXG4gICdjYXJkLmhpZGUnOiAnXHU5NjkwXHU4NUNGJyxcbiAgJ2Vyci5mZXRjaEZhaWxlZCc6ICdcdThGREVcdTYzQTUgZHNoLXJlZ2lvbiBcdTY3MERcdTUyQTFcdTU5MzFcdThEMjUnLFxufVxuXG5leHBvcnQgY29uc3QgZW46IFJlY29yZDxSZWdpb25LZXksIHN0cmluZz4gPSB7XG4gICdtZW51LnRpdGxlJzogJ2RzaC1yZWdpb24gc291cmNlcycsXG4gICdtZW51LnN0YXR1c0dyZWVuJzogJ1ByaW1hcnkgaGVhbHRoeSwgdXNpbmcgQ2hpbmEgbWlycm9yJyxcbiAgJ21lbnUuc3RhdHVzWWVsbG93JzogJ1ByaW1hcnkgZG93biwgc3dpdGNoZWQgdG8gb2ZmaWNpYWwgcmVnaXN0cnknLFxuICAnbWVudS5zdGF0dXNSZWQnOiAnQm90aCByZWdpc3RyaWVzIHVucmVhY2hhYmxlJyxcbiAgJ21lbnUuc3RhdHVzVW5rbm93bic6ICdVbmtub3duIFx1MjAxNCBjbGljayBcIlByb2JlXCIgdG8gY2hlY2snLFxuICAnbWVudS5hdXRvJzogJ0F1dG8nLFxuICAnbWVudS5tYWluJzogJ0NoaW5hIG1pcnJvcicsXG4gICdtZW51LmJhY2t1cCc6ICdPZmZpY2lhbCByZWdpc3RyeScsXG4gICdtZW51LnByb2JlJzogJ1Byb2JlIG5vdycsXG4gICdtZW51LmN1cnJlbnQnOiAnY3VycmVudCcsXG4gICdtZW51LmhpZGRlbic6ICcobWVudSBoaWRkZW4gXHUyMDE0IGVuYWJsZSBpdCBpbiBzZXR0aW5ncyknLFxuICAnY2FyZC50aXRsZSc6ICdkc2gtcmVnaW9uIHNvdXJjZSBtYW5hZ2VyJyxcbiAgJ2NhcmQuZGVzY3JpcHRpb24nOiAnRFNIIHJlZ2lzdHJ5IGZhaWxvdmVyOiBDaGluYSBtaXJyb3IgcHJpbWFyeSwgb2ZmaWNpYWwgYmFja3VwLCBhdXRvLXN3aXRjaCcsXG4gICdjYXJkLm1lbnVWaXNpYmxlJzogJ1NvdXJjZSBtZW51IGluIGhlYWRlcicsXG4gICdjYXJkLm1lbnVWaXNpYmxlRGVzYyc6ICdTaG93IHRoZSBzb3VyY2UgZHJvcGRvd24gbmV4dCB0byBcIlNlc3Npb24gbG9nXCIgaW4gdGhlIGhlYWRlcicsXG4gICdjYXJkLnNob3cnOiAnU2hvdycsXG4gICdjYXJkLmhpZGUnOiAnSGlkZScsXG4gICdlcnIuZmV0Y2hGYWlsZWQnOiAnRmFpbGVkIHRvIHJlYWNoIGRzaC1yZWdpb24gc2VydmljZScsXG59XG4iLCAiLyoqXG4gKiBoZWFkZXItbWVudSBcdTIwMTRcdTIwMTQgXHU1M0YzXHU0RTBBXHU4OUQyXHUzMDBDXHU0RTBCXHU4RjdEIExvZ1x1MzAwRFx1NURFNlx1NEZBN1x1NzY4NFx1NkU5MFx1N0JBMVx1NzQwNlx1NEUwQlx1NjJDOVx1ODNEQ1x1NTM1NVx1MzAwMlxuICpcbiAqIFx1N0VBRiBET00gXHU2Q0U4XHU1MTY1XHVGRjA4XHU0RTBEXHU2MzAyIFJlYWN0IFx1NjgxMVx1RkYwOVx1RkYwQ1x1NkEyMVx1NEVGRiBsaW54aW42NjYvZHNoLXdlYi11aSBcdTc2ODQgc2lkZWJhci1lbnRyeSBcdTZBMjFcdTVGMEZcdUZGMUFcbiAqICAtIFx1NUI5QVx1NEY0RFx1OTUxQVx1NzBCOVx1RkYxQVNlc3Npb24gbG9nIFx1NjMwOVx1OTRBRVx1RkYwOGNsYXNzIFx1NTQyQiBzZXNzaW9uTG9nXHVGRjBDXHU2MjE2XHU2NTg3XHU2NzJDXHU1MzM5XHU5MTREXHVGRjA5XHVGRjBDXHU1NzI4XHU1MTc2XHU1MjREXHU2M0QyXHU1MTY1XG4gKiAgLSBcdTgxRUFcdTYxMDhcdUZGMUFNdXRhdGlvbk9ic2VydmVyIFx1NzZEMVx1NTQyQ1x1RkYwQ1JlYWN0IFx1OTFDRFx1NkUzMlx1NjdEM1x1NzlGQlx1OTY2NFx1NTQwRVx1ODFFQVx1NTJBOFx1OTFDRFx1NjNEMlxuICogIC0gXHU3MkI2XHU2MDAxXHU3MDZGXHVGRjFBXHU3RUZGL1x1OUVDNC9cdTdFQTIgKyB0b29sdGlwIFx1OEJGNFx1NjYwRVxuICogIC0gXHU4M0RDXHU1MzU1XHU5ODc5XHU1RTI2XHU2M0EyXHU2RDRCXHU4MDE3XHU2NUY2XHVGRjBDXHU1MjA3XHU2MzYyXHU4QzAzIGhvc3QgQVBJXG4gKiAgLSBcdTY2M0VcdTk2OTBcdTc1MzEgc2VydmVyIFx1N0FFRiByZWdpb24uanNvbiBcdTYzQTdcdTUyMzZcdUZGMDhtZW51VmlzaWJsZT1mYWxzZSBcdTY1RjZcdTY1NzRcdTRFMkFcdTYzMDlcdTk0QUVcdTRFMERcdTZFMzJcdTY3RDNcdUZGMDlcbiAqXG4gKiBcdTk0QzFcdTVGOEJcdUZGMUFcdTRFRkJcdTRGNTUgRE9NIFx1NjRDRFx1NEY1Q1x1NTkzMVx1OEQyNVx1NTNFQSBjb25zb2xlLndhcm5cdUZGMENcdTdFRERcdTRFMEQgdGhyb3dcdUZGMDhcdTRFMERcdTgwRkRcdTYyRDZcdTU3QUUgRFNIIFx1NTQyRlx1NTJBOFx1RkYwOVx1MzAwMlxuICovXG5cbmltcG9ydCB7IGZldGNoU3RhdHVzLCByZXF1ZXN0TW9kZSwgdHlwZSBSZWdpb25TdGF0dXMgfSBmcm9tICcuL2hvc3QtYXBpLmpzJ1xuaW1wb3J0IHsgemggfSBmcm9tICcuL2xvY2FsZXMuanMnXG5cbmV4cG9ydCBjb25zdCBFTlRSWV9TRUxFQ1RPUiA9ICdbZGF0YS1kc2gtcmVnaW9uLWVudHJ5XSdcblxuY29uc3QgQ1NTID0gYFxuLmRzaHItZW50cnl7ZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoyOHB4O2hlaWdodDoyOHB4O21hcmdpbjowIDJweDtwYWRkaW5nOjA7Ym9yZGVyOm5vbmU7Ym9yZGVyLXJhZGl1czo2cHg7YmFja2dyb3VuZDp0cmFuc3BhcmVudDtjb2xvcjp2YXIoLS1jb2xvci10ZXh0LXNlY29uZGFyeSwjOGI5NDllKTtjdXJzb3I6cG9pbnRlcjtwb3NpdGlvbjpyZWxhdGl2ZX1cbi5kc2hyLWVudHJ5OmhvdmVye2JhY2tncm91bmQ6Y29sb3ItbWl4KGluIHNyZ2IsY3VycmVudENvbG9yIDEyJSx0cmFuc3BhcmVudCl9XG4uZHNoci1lbnRyeSAuZHNoci1kb3R7cG9zaXRpb246YWJzb2x1dGU7dG9wOjRweDtyaWdodDo0cHg7d2lkdGg6N3B4O2hlaWdodDo3cHg7Ym9yZGVyLXJhZGl1czo1MCU7Ym9yZGVyOjEuNXB4IHNvbGlkIHZhcigtLWNvbG9yLWJnLXByaW1hcnksIzBkMTExNyl9XG4uZHNoci1kb3QuZ3JlZW57YmFja2dyb3VuZDojM2ZiOTUwfS5kc2hyLWRvdC55ZWxsb3d7YmFja2dyb3VuZDojZDI5OTIyfS5kc2hyLWRvdC5yZWR7YmFja2dyb3VuZDojZjg1MTQ5fS5kc2hyLWRvdC5ncmF5e2JhY2tncm91bmQ6IzhiOTQ5ZX1cbi5kc2hyLW1lbnV7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDo5OTk5O21pbi13aWR0aDoyMzBweDtwYWRkaW5nOjZweDtib3JkZXItcmFkaXVzOjEwcHg7YmFja2dyb3VuZDp2YXIoLS1jb2xvci1iZy1lbGV2YXRlZCwjMTYxYjIyKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWNvbG9yLWJvcmRlci1kZWZhdWx0LHJnYmEoMjQwLDI0NiwyNTIsLjEyKSk7Ym94LXNoYWRvdzowIDhweCAyNHB4IHJnYmEoMSw0LDksLjQpO2ZvbnQtc2l6ZToxM3B4O2NvbG9yOnZhcigtLWNvbG9yLXRleHQtcHJpbWFyeSwjZTZlZGYzKTthbmltYXRpb246ZHNockluIC4xMnMgZWFzZS1vdXR9XG5Aa2V5ZnJhbWVzIGRzaHJJbntmcm9te29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNHB4KX10b3tvcGFjaXR5OjE7dHJhbnNmb3JtOm5vbmV9fVxuLmRzaHItbWVudS1oZWFke2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDtwYWRkaW5nOjZweCA4cHggOHB4O2ZvbnQtd2VpZ2h0OjYwMDtib3JkZXItYm90dG9tOjFweCBzb2xpZCB2YXIoLS1jb2xvci1ib3JkZXItZGVmYXVsdCxyZ2JhKDI0MCwyNDYsMjUyLC4xKSk7Y3Vyc29yOmhlbHB9XG4uZHNoci1tZW51LWhlYWQgLmRzaHItaGRvdHt3aWR0aDo4cHg7aGVpZ2h0OjhweDtib3JkZXItcmFkaXVzOjUwJTtmbGV4Om5vbmV9XG4uZHNoci1pdGVte2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Z2FwOjhweDt3aWR0aDoxMDAlO3BhZGRpbmc6N3B4IDhweDtib3JkZXI6bm9uZTtib3JkZXItcmFkaXVzOjdweDtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O2NvbG9yOmluaGVyaXQ7Zm9udC1zaXplOjEzcHg7Y3Vyc29yOnBvaW50ZXI7dGV4dC1hbGlnbjpsZWZ0fVxuLmRzaHItaXRlbTpob3ZlcntiYWNrZ3JvdW5kOmNvbG9yLW1peChpbiBzcmdiLGN1cnJlbnRDb2xvciAxMCUsdHJhbnNwYXJlbnQpfVxuLmRzaHItaXRlbSAuZHNoci1tc3tjb2xvcjp2YXIoLS1jb2xvci10ZXh0LXRlcnRpYXJ5LCM2ZTc2ODEpO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtdmFyaWFudC1udW1lcmljOnRhYnVsYXItbnVtc31cbi5kc2hyLWl0ZW0gLmRzaHItY3Vye2NvbG9yOiMzZmI5NTA7Zm9udC1zaXplOjExcHg7bWFyZ2luLWxlZnQ6NHB4fVxuLmRzaHItc2Vwe2hlaWdodDoxcHg7bWFyZ2luOjVweCA2cHg7YmFja2dyb3VuZDp2YXIoLS1jb2xvci1ib3JkZXItZGVmYXVsdCxyZ2JhKDI0MCwyNDYsMjUyLC4wOCkpfVxuLmRzaHItcHJvYmV7anVzdGlmeS1jb250ZW50OmNlbnRlcjtjb2xvcjp2YXIoLS1jb2xvci10ZXh0LXNlY29uZGFyeSwjOGI5NDllKX1cbi5kc2hyLXByb2JlOmhvdmVye2NvbG9yOnZhcigtLWNvbG9yLXRleHQtcHJpbWFyeSwjZTZlZGYzKX1cbi5kc2hyLWZhbGxiYWNrLWhvc3R7cG9zaXRpb246Zml4ZWQ7dG9wOjU2cHg7cmlnaHQ6MTZweDt6LWluZGV4OjIxNDc0ODMwMDA7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6MnB4O3BhZGRpbmc6MnB4O2JvcmRlci1yYWRpdXM6OHB4O2JhY2tncm91bmQ6Y29sb3ItbWl4KGluIHNyZ2IsdmFyKC0tY29sb3ItYmctZWxldmF0ZWQsIzE2MWIyMikgODglLHRyYW5zcGFyZW50KTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWNvbG9yLWJvcmRlci1kZWZhdWx0LHJnYmEoMjQwLDI0NiwyNTIsLjEyKSk7Ym94LXNoYWRvdzowIDJweCA4cHggcmdiYSgxLDQsOSwuMjUpfVxuYFxuXG5pbnRlcmZhY2UgSGVhZGVyTWVudU9wdGlvbnMge1xuICAvKiogXHU1OTE2XHU5MEU4XHU5MDFBXHU3N0U1XHU3MkI2XHU2MDAxXHU1MjM3XHU2NUIwXHVGRjA4XHU4QkJFXHU3RjZFXHU5ODc1XHU4MEY2XHU1NkNBXHU5NzAwXHU4OTgxXHVGRjA5XHUzMDAyICovXG4gIG9uTWVudVZpc2libGVDaGFuZ2U/OiAodmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZFxufVxuXG4vKipcbiAqIFx1NUI5QVx1NEY0RFx1NUJCRlx1NEUzQlx1OTUxQVx1NzBCOVx1NjMwOVx1OTRBRVx1MzAwMlxuICpcbiAqIFx1NTM4Nlx1NTNGMlx1NjU1OVx1OEJBRFx1RkYxQVx1NjVFN1x1NzI0OCBkc2ggXHU1NzI4XHU1M0YzXHU0RTBBXHU4OUQyXHU2NzA5XHUzMDBDXHU0RTBCXHU4RjdEXHU2NUU1XHU1RkQ3XHUzMDBEXHU2MzA5XHU5NEFFXHVGRjBDXHU2NUIwXHU3MjQ4XHU2MjhBXHU1QjgzXHU2MzJBXHU4RkRCXHU0RTg2IGNvbXBvc2VyIFx1NzY4NFxuICogYCtgIC8gYC9gIFx1NTQ3RFx1NEVFNFx1ODNEQ1x1NTM1NVx1RkYwOGxvY2FsZSBcdTk1MkUgbGFiZWwuZXhwb3J0ID0gXHU0RTBCXHU4RjdEXHU2NUU1XHU1RkQ3XHVGRjBDXHU5RUQ4XHU4QkE0XHU0RTBEXHU2RTMyXHU2N0QzXHVGRjA5XHVGRjBDXG4gKiBcdTRFOEVcdTY2MkZcdTgwMDFcdTk1MUFcdTcwQjlcdTZDMzhcdThGRENcdTUzMzlcdTkxNERcdTRFMERcdTUyMzAgXHUyMTkyIFx1NTE2NVx1NTNFM1x1NjU3NFx1NTc1N1x1OTc1OVx1OUVEOFx1NkQ4OFx1NTkzMVx1MzAwMlx1NjU0NVx1OEZEOVx1OTFDQ1x1NTA1QVx1NEUwOVx1N0VBN1x1NUJCRFx1NTMzOVx1OTE0RFx1RkYwQ1xuICogXHU0RTE0XHU4QzAzXHU3NTI4XHU2NUI5XHU1NzI4XHU1MTY4XHU5MEU4XHU4NDNEXHU3QTdBXHU2NUY2XHU1RkM1XHU5ODdCXHU4RDcwIGZhbGxiYWNrSG9zdCgpIFx1NTE1Q1x1NUU5NVx1RkYwQ1x1NEUwRFx1NTE0MVx1OEJCOFx1NzZGNFx1NjNBNSByZXR1cm5cdTMwMDJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRMb2dCdXR0b24oKTogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsIHtcbiAgY29uc3QgYWxsID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxCdXR0b25FbGVtZW50PignYnV0dG9uJykpXG4gIGNvbnN0IFJFID0gL3Nlc3Npb25cXHMqbG9nfFx1NEUwQlx1OEY3RC4qXHU2NUU1XHU1RkQ3L2lcbiAgLy8gMSkgXHU2NUU3XHU3MjQ4XHVGRjFBY2xhc3MgXHU1NDJCIHNlc3Npb25Mb2dcbiAgY29uc3QgYnlDbGFzcyA9IGFsbC5maW5kKChiKSA9PiAvc2Vzc2lvbkxvZy9pLnRlc3QoYi5jbGFzc05hbWUpKVxuICBpZiAoYnlDbGFzcykgcmV0dXJuIGJ5Q2xhc3NcbiAgLy8gMikgXHU2NTg3XHU2NzJDXHU3NkY0XHU2M0E1XHU2MzAyXHU1NzI4IGJ1dHRvbiBcdTRFMEFcdUZGMDhcdTY1QjBcdTcyNDhcdTRFMERcdTUxOERcdTUzMDUgc3Bhblx1RkYwOVxuICBjb25zdCBieVRleHQgPSBhbGwuZmluZCgoYikgPT4gUkUudGVzdChiLnRleHRDb250ZW50ID8/ICcnKSlcbiAgaWYgKGJ5VGV4dCkgcmV0dXJuIGJ5VGV4dFxuICAvLyAzKSBhcmlhLWxhYmVsIC8gdGl0bGUgXHU1MTVDXHU1RTk1XHVGRjA4XHU1NkZFXHU2ODA3XHU2MzA5XHU5NEFFXHU2NUUwXHU1M0VGXHU4QkZCXHU2NTg3XHU1QjU3XHVGRjA5XG4gIHJldHVybiAoXG4gICAgYWxsLmZpbmQoXG4gICAgICAoYikgPT4gUkUudGVzdChiLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpID8/ICcnKSB8fCBSRS50ZXN0KGIuZ2V0QXR0cmlidXRlKCd0aXRsZScpID8/ICcnKSxcbiAgICApID8/IG51bGxcbiAgKVxufVxuXG4vKiogXHU2MjdFXHU0RTBEXHU1MjMwXHU5NTFBXHU3MEI5XHU2NUY2XHU3Njg0XHU1MTVDXHU1RTk1XHU1QkI5XHU1NjY4XHVGRjFBXHU1NkZBXHU1QjlBXHU1QjlBXHU0RjREXHU1NzI4XHU1M0YzXHU0RTBBXHU4OUQyXHVGRjBDXHU0RTBEXHU0RjlEXHU4RDU2XHU1QkJGXHU0RTNCIERPTSBcdTdFRDNcdTY3ODRcdTMwMDIgKi9cbmZ1bmN0aW9uIGZhbGxiYWNrSG9zdCgpOiBIVE1MRWxlbWVudCB7XG4gIGxldCBob3N0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RzaHItZmFsbGJhY2staG9zdCcpXG4gIGlmIChob3N0KSByZXR1cm4gaG9zdFxuICBob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgaG9zdC5pZCA9ICdkc2hyLWZhbGxiYWNrLWhvc3QnXG4gIGhvc3QuY2xhc3NOYW1lID0gJ2RzaHItZmFsbGJhY2staG9zdCdcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChob3N0KVxuICByZXR1cm4gaG9zdFxufVxuXG4vKipcbiAqIFx1NEUzQlx1OTUxQVx1NzBCOVx1RkYxQVx1NTNGM1x1NEUwQVx1ODlEMlx1NURFNVx1NTE3N1x1NjgwRlx1MzAwQ1x1NjU4N1x1NEVGNlx1OEQ0NFx1NkU5MFx1N0JBMVx1NzQwNlx1NTY2OFx1MzAwRFx1NTIwNlx1NkJCNVx1NjMwOVx1OTRBRVx1N0VDNFx1RkYwOFx1OUVDNFx1NjU4N1x1NEVGNlx1NTkzOSArIFx1NEUwQlx1NjJDOVx1N0JBRFx1NTkzNFx1RkYwOVx1MzAwMlxuICpcbiAqIFx1NUI5RVx1NkQ0Qlx1N0VEM1x1Njc4NFx1RkYwOGRzaCAwLjIuMS1yYy4yXHVGRjA5XHVGRjFBXG4gKiAgIERJVltkaXNwbGF5OmNvbnRlbnRzXVxuICogICAgIFx1MjUxNCBTUEFOID4gRElWLnNwbGl0XG4gKiAgICAgICAgICAgICAgICBcdTI1MUMgQlVUVE9OW2FyaWEtbGFiZWw9XCJcdTc1MjggXHU2NTg3XHU0RUY2XHU4RDQ0XHU2RTkwXHU3QkExXHU3NDA2XHU1NjY4IFx1NjI1M1x1NUYwMFwiXSAgIFx1MjE5MCBcdTlFQzRcdTY1ODdcdTRFRjZcdTU5MzlcbiAqICAgICAgICAgICAgICAgIFx1MjUxNCBCVVRUT05bYXJpYS1sYWJlbD1cIlx1NjZGNFx1NTkxQVx1NjI1M1x1NUYwMFx1NjVCOVx1NUYwRlwiXSAgICAgICAgICAgICBcdTIxOTAgXHU0RTBCXHU2MkM5XHU3QkFEXHU1OTM0XG4gKiAgIERJViA+IFNQQU5cdUZGMDhcdTAwQjdcdTAwQjdcdTAwQjcgXHU2NkY0XHU1OTFBXHU2NENEXHU0RjVDXHVGRjA5XG4gKiAgIEJVVFRPTlx1RkYwOFx1NUM1NVx1NUYwMFx1NUU5NVx1OTBFOFx1OTc2Mlx1Njc3Rlx1RkYwOVxuICpcbiAqIFx1NjI4QVx1NTE2NVx1NTNFM1x1NjNEMlx1NTIzMFx1OEJFNSBTUEFOIFx1NEU0Qlx1NTI0RFx1RkYwQ1x1NTM3M1x1NTNFRlx1ODQzRFx1NTcyOFx1OUVDNFx1NjU4N1x1NEVGNlx1NTkzOVx1NURFNlx1NEZBN1x1RkYwQ1x1NEUwRVx1NURFNVx1NTE3N1x1NjgwRlx1NTQwQ1x1NjM5Mlx1MzAwMVx1OTVGNFx1OERERFx1NEUwMFx1ODFGNFx1MzAwMlxuICogXHU1M0VBXHU0RjlEXHU4RDU2IGFyaWEtbGFiZWwgXHU4QkVEXHU0RTQ5XHVGRjA4XHU4REU4XHU3MjQ4XHU2NzJDXHU4RjgzXHU3QTMzXHVGRjA5XHVGRjBDXHU0RTBEXHU0RjlEXHU4RDU2IENTUyBNb2R1bGUgXHU1NEM4XHU1RTBDXHU3QzdCXHU1NDBEXHUzMDAyXG4gKi9cbmZ1bmN0aW9uIGZpbmRUb29sYmFySG9zdCgpOiB7IGhvc3Q6IEhUTUxFbGVtZW50OyBiZWZvcmU6IEVsZW1lbnQgfSB8IG51bGwge1xuICBjb25zdCBhbGwgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdidXR0b25bYXJpYS1sYWJlbF0nKSlcbiAgY29uc3QgZm9sZGVyID0gYWxsLmZpbmQoKGIpID0+XG4gICAgL1x1NjU4N1x1NEVGNlx1OEQ0NFx1NkU5MFx1N0JBMVx1NzQwNlx1NTY2OHxcdThENDRcdTZFOTBcdTdCQTFcdTc0MDZcdTU2Njh8RmlsZSBFeHBsb3Jlci9pLnRlc3QoYi5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSA/PyAnJyksXG4gIClcbiAgaWYgKCFmb2xkZXIpIHJldHVybiBudWxsXG4gIGNvbnN0IHNwbGl0ID0gZm9sZGVyLnBhcmVudEVsZW1lbnRcbiAgY29uc3QgYW5jaG9yU3BhbiA9IHNwbGl0Py5wYXJlbnRFbGVtZW50XG4gIGNvbnN0IGhvc3QgPSBhbmNob3JTcGFuPy5wYXJlbnRFbGVtZW50XG4gIGlmICghaG9zdCB8fCAhYW5jaG9yU3BhbikgcmV0dXJuIG51bGxcbiAgcmV0dXJuIHsgaG9zdCwgYmVmb3JlOiBhbmNob3JTcGFuIH1cbn1cblxuLyoqIFx1ODlFM1x1Njc5MFx1NjMwMlx1OEY3RFx1NzBCOVx1RkYxQVx1NURFNVx1NTE3N1x1NjgwRlx1NEYxOFx1NTE0OCBcdTIxOTIgXHU2NUU3XHUzMDBDXHU0RTBCXHU4RjdEXHU2NUU1XHU1RkQ3XHUzMDBEXHU5NTFBXHU3MEI5IFx1MjE5MiBcdTU2RkFcdTVCOUFcdTZENkVcdTVDNDJcdTUxNUNcdTVFOTVcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlc29sdmVNb3VudCgpOiB7IGhvc3Q6IEhUTUxFbGVtZW50OyBiZWZvcmU6IEVsZW1lbnQgfCBudWxsIH0ge1xuICBjb25zdCB0YiA9IGZpbmRUb29sYmFySG9zdCgpXG4gIGlmICh0YikgcmV0dXJuIHRiXG4gIGNvbnN0IGFuY2hvciA9IGZpbmRMb2dCdXR0b24oKVxuICBjb25zdCBjb250YWluZXIgPSBhbmNob3I/LnBhcmVudEVsZW1lbnRcbiAgaWYgKGNvbnRhaW5lciAmJiBhbmNob3IpIHJldHVybiB7IGhvc3Q6IGNvbnRhaW5lciwgYmVmb3JlOiBhbmNob3IgfVxuICByZXR1cm4geyBob3N0OiBmYWxsYmFja0hvc3QoKSwgYmVmb3JlOiBudWxsIH1cbn1cblxuZnVuY3Rpb24gc3R5bGVUYWcoKTogSFRNTFN0eWxlRWxlbWVudCB7XG4gIGNvbnN0IGV4aXN0aW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RzaHItc3R5bGUnKSBhcyBIVE1MU3R5bGVFbGVtZW50IHwgbnVsbFxuICBpZiAoZXhpc3RpbmcpIHJldHVybiBleGlzdGluZ1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGUuaWQgPSAnZHNoci1zdHlsZSdcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBDU1NcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSlcbiAgcmV0dXJuIHN0eWxlXG59XG5cbmZ1bmN0aW9uIHN0YXR1c0RvdENsYXNzKHN0YXR1czogUmVnaW9uU3RhdHVzKTogJ2dyZWVuJyB8ICd5ZWxsb3cnIHwgJ3JlZCcgfCAnZ3JheScge1xuICBjb25zdCB7IG1haW4sIGJhY2t1cCB9ID0gc3RhdHVzXG4gIGlmICghbWFpbiB8fCAhYmFja3VwKSByZXR1cm4gJ2dyYXknXG4gIGlmIChtYWluLm9rICYmIGJhY2t1cC5vaykgcmV0dXJuICdncmVlbidcbiAgaWYgKG1haW4ub2sgIT09IGJhY2t1cC5vaykgcmV0dXJuICd5ZWxsb3cnXG4gIHJldHVybiBtYWluLm9rID8gJ2dyYXknIDogJ3JlZCdcbn1cblxuZnVuY3Rpb24gc3RhdHVzSGludChzdGF0dXM6IFJlZ2lvblN0YXR1cyk6IHN0cmluZyB7XG4gIGNvbnN0IHsgbWFpbiwgYmFja3VwIH0gPSBzdGF0dXNcbiAgaWYgKCFtYWluIHx8ICFiYWNrdXApIHJldHVybiB6aFsnbWVudS5zdGF0dXNVbmtub3duJ11cbiAgaWYgKG1haW4ub2sgJiYgYmFja3VwLm9rKSByZXR1cm4gemhbJ21lbnUuc3RhdHVzR3JlZW4nXVxuICBpZiAoIW1haW4ub2sgJiYgYmFja3VwLm9rKSByZXR1cm4gemhbJ21lbnUuc3RhdHVzWWVsbG93J11cbiAgaWYgKCFtYWluLm9rICYmICFiYWNrdXAub2spIHJldHVybiB6aFsnbWVudS5zdGF0dXNSZWQnXVxuICByZXR1cm4gemhbJ21lbnUuc3RhdHVzVW5rbm93biddXG59XG5cbmNvbnN0IElDT04gPSAnPHN2ZyB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgd2lkdGg9XCIxNVwiIGhlaWdodD1cIjE1XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIxLjNcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48ZWxsaXBzZSBjeD1cIjhcIiBjeT1cIjRcIiByeD1cIjRcIiByeT1cIjEuOFwiLz48cGF0aCBkPVwiTTQgNHY0YzAgMSAxLjggMS44IDQgMS44czQtLjggNC0xLjhWNFwiLz48cGF0aCBkPVwiTTQgOHY0YzAgMSAxLjggMS44IDQgMS44czQtLjggNC0xLjhWOFwiLz48L3N2Zz4nXG5cbi8qKlxuICogXHU2MzAyXHU4RjdEXHU1M0YzXHU0RTBBXHU4OUQyXHU4M0RDXHU1MzU1XHVGRjBDXHU4RkQ0XHU1NkRFIGRpc3Bvc2VyXHUzMDAyXG4gKiBcdTVFNDJcdTdCNDlcdUZGMUFcdTkxQ0RcdTU5MERcdThDMDNcdTc1MjhcdTUxNDhcdTZFMDVcdTc0MDZcdTY1RTdcdTVCOUVcdTRGOEJcdTUxOERcdTkxQ0RcdTVFRkFcdTMwMDJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vdW50SGVhZGVyTWVudShvcHRpb25zOiBIZWFkZXJNZW51T3B0aW9ucyA9IHt9KTogKCkgPT4gdm9pZCB7XG4gIHN0eWxlVGFnKClcbiAgbGV0IGRpc3Bvc2VkID0gZmFsc2VcbiAgbGV0IG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGxcbiAgbGV0IG1lbnVFbDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbFxuICBsZXQgZW50cnlFbDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsID0gbnVsbFxuICBsZXQgbGF0ZXN0OiBSZWdpb25TdGF0dXMgfCBudWxsID0gbnVsbFxuXG4gIGNvbnN0IGNsZWFudXBNZW51ID0gKCk6IHZvaWQgPT4ge1xuICAgIG1lbnVFbD8ucmVtb3ZlKClcbiAgICBtZW51RWwgPSBudWxsXG4gIH1cblxuICBjb25zdCBjbG9zZU1lbnUgPSAoKTogdm9pZCA9PiBjbGVhbnVwTWVudSgpXG5cbiAgY29uc3QgcmVuZGVyTWVudSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICAgIGNsZWFudXBNZW51KClcbiAgICBsZXQgc3RhdHVzOiBSZWdpb25TdGF0dXNcbiAgICB0cnkge1xuICAgICAgc3RhdHVzID0gYXdhaXQgZmV0Y2hTdGF0dXMoZmFsc2UpXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTY3MERcdTUyQTFcdTRFMERcdTUzRUZcdThGQkVcdUZGMUFcdTgzRENcdTUzNTVcdTkxQ0NcdTc2RjRcdTYzQTVcdTYzRDBcdTc5M0FcbiAgICAgIHN0YXR1cyA9IHtcbiAgICAgICAgbW9kZTogJ2F1dG8nLCBhcHBsaWVkUmVnaXN0cnk6IG51bGwsIG1haW5SZWdpc3RyeTogJycsIGJhY2t1cFJlZ2lzdHJ5OiAnJyxcbiAgICAgICAgbGFzdEVycm9yOiB6aFsnZXJyLmZldGNoRmFpbGVkJ10sIGxhc3RTd2l0Y2hBdDogbnVsbCwgbWVudVZpc2libGU6IHRydWUsXG4gICAgICAgIG1haW46IHsgb2s6IGZhbHNlLCBtczogMCwgZXJyb3I6IHpoWydlcnIuZmV0Y2hGYWlsZWQnXSB9LFxuICAgICAgICBiYWNrdXA6IHsgb2s6IGZhbHNlLCBtczogMCwgZXJyb3I6IHpoWydlcnIuZmV0Y2hGYWlsZWQnXSB9LFxuICAgICAgfVxuICAgIH1cbiAgICBsYXRlc3QgPSBzdGF0dXNcbiAgICBpZiAoIWVudHJ5RWwpIHJldHVyblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZWN0ID0gZW50cnlFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgY29uc3QgZG90ID0gc3RhdHVzRG90Q2xhc3Moc3RhdHVzKVxuICAgIGNvbnN0IGl0ZW1zID0gKFxuICAgICAgW1xuICAgICAgICB7IGtleTogJ2F1dG8nLCBsYWJlbDogemhbJ21lbnUuYXV0byddLCBjbWQ6ICdhdXRvJyB9LFxuICAgICAgICB7IGtleTogJ21haW4nLCBsYWJlbDogemhbJ21lbnUubWFpbiddLCBjbWQ6ICdtYWluJyB9LFxuICAgICAgICB7IGtleTogJ2JhY2t1cCcsIGxhYmVsOiB6aFsnbWVudS5iYWNrdXAnXSwgY21kOiAnYmFja3VwJyB9LFxuICAgICAgXSBhcyBjb25zdFxuICAgIClcblxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHJvb3QuY2xhc3NOYW1lID0gJ2RzaHItbWVudSdcbiAgICByb290LnN0eWxlLmxlZnQgPSBgJHtNYXRoLm1heCg4LCByZWN0LnJpZ2h0IC0gMjQwKX1weGBcbiAgICByb290LnN0eWxlLnRvcCA9IGAke3JlY3QuYm90dG9tICsgNn1weGBcbiAgICByb290LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51JylcblxuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGhlYWQuY2xhc3NOYW1lID0gJ2RzaHItbWVudS1oZWFkJ1xuICAgIGhlYWQudGl0bGUgPSBzdGF0dXNIaW50KHN0YXR1cylcbiAgICBjb25zdCBoZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgaGRvdC5jbGFzc05hbWUgPSBgZHNoci1oZG90ICR7ZG90fWBcbiAgICBoZWFkLmFwcGVuZENoaWxkKGhkb3QpXG4gICAgaGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh6aFsnbWVudS50aXRsZSddKSlcbiAgICByb290LmFwcGVuZENoaWxkKGhlYWQpXG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBidG4uY2xhc3NOYW1lID0gJ2RzaHItaXRlbSdcbiAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWl0ZW0nKVxuICAgICAgY29uc3QgbGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgY29uc3QgaXNDdXJyZW50ID0gc3RhdHVzLm1vZGUgPT09IGl0ZW0uY21kXG4gICAgICBsZWZ0LnRleHRDb250ZW50ID0gYCR7aXRlbS5sYWJlbH1cdUZGMDgke2l0ZW0uY21kfVx1RkYwOWBcbiAgICAgIGlmIChpc0N1cnJlbnQpIHtcbiAgICAgICAgY29uc3QgY3VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGN1ci5jbGFzc05hbWUgPSAnZHNoci1jdXInXG4gICAgICAgIGN1ci50ZXh0Q29udGVudCA9IGBcdTI3MTMke3poWydtZW51LmN1cnJlbnQnXX1gXG4gICAgICAgIGxlZnQuYXBwZW5kQ2hpbGQoY3VyKVxuICAgICAgfVxuICAgICAgYnRuLmFwcGVuZENoaWxkKGxlZnQpXG4gICAgICBjb25zdCBtcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgbXMuY2xhc3NOYW1lID0gJ2RzaHItbXMnXG4gICAgICBjb25zdCBwcm9iZVJlc3VsdCA9IGl0ZW0uY21kID09PSAnbWFpbicgPyBzdGF0dXMubWFpbiA6IGl0ZW0uY21kID09PSAnYmFja3VwJyA/IHN0YXR1cy5iYWNrdXAgOiBudWxsXG4gICAgICBtcy50ZXh0Q29udGVudCA9IHByb2JlUmVzdWx0ID8gYCR7cHJvYmVSZXN1bHQubXN9bXNgIDogJy0tJ1xuICAgICAgYnRuLmFwcGVuZENoaWxkKG1zKVxuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB2b2lkIHJlcXVlc3RNb2RlKGl0ZW0uY21kKVxuICAgICAgICB2b2lkIHJlbmRlck1lbnUoKVxuICAgICAgfSlcbiAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoYnRuKVxuICAgIH1cblxuICAgIGNvbnN0IHNlcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc2VwLmNsYXNzTmFtZSA9ICdkc2hyLXNlcCdcbiAgICByb290LmFwcGVuZENoaWxkKHNlcClcblxuICAgIGNvbnN0IHByb2JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBwcm9iZS5jbGFzc05hbWUgPSAnZHNoci1pdGVtIGRzaHItcHJvYmUnXG4gICAgcHJvYmUudGV4dENvbnRlbnQgPSBgXHUyMUJCICR7emhbJ21lbnUucHJvYmUnXX1gXG4gICAgcHJvYmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAvLyBcdTdBQ0JcdTUzNzNcdTZENEJcdTkwMUZcdUZGMUFcdTVCOUVcdTY1RjZcdTYzQTJcdTZENEJcdTUzQ0NcdTZFOTBcdUZGMDhcdTUzRUZcdTgwRkRcdTY1NzBcdTc5RDJcdUZGMDlcdUZGMENcdTVCOENcdTYyMTBcdTU0MEVcdTUyMzdcdTY1QjBcdTgzRENcdTUzNTVcdTMwMDJcbiAgICAgIHZvaWQgZmV0Y2hTdGF0dXModHJ1ZSkudGhlbigoKSA9PiByZW5kZXJNZW51KCkpXG4gICAgfSlcbiAgICByb290LmFwcGVuZENoaWxkKHByb2JlKVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyb290KVxuICAgIG1lbnVFbCA9IHJvb3RcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gXHU2RTMyXHU2N0QzXHU1OTMxXHU4RDI1XHU1M0VBXHU4QkIwXHU2NUU1XHU1RkQ3XHVGRjBDXHU3RUREXHU0RTBEXHU2MjlCXHVGRjA4XHU1OTE2XHU5MEU4XHU2M0QyXHU0RUY2XHU0RTBEXHU4MEZEXHU2MkQ2XHU1N0FFIERTSFx1RkYwOVx1MzAwMlxuICAgICAgY29uc29sZS5lcnJvcignW2RzaC1yZWdpb25dIG1lbnUgcmVuZGVyIGZhaWxlZDonLCBlcnJvcilcbiAgICB9XG4gIH1cblxuICBjb25zdCBidWlsZEVudHJ5ID0gKCk6IEhUTUxCdXR0b25FbGVtZW50ID0+IHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGJ0bi50eXBlID0gJ2J1dHRvbidcbiAgICBidG4uY2xhc3NOYW1lID0gJ2RzaHItZW50cnknXG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1kc2gtcmVnaW9uLWVudHJ5JywgJycpXG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHpoWydtZW51LnRpdGxlJ10pXG4gICAgYnRuLmlubmVySFRNTCA9IElDT05cbiAgICBjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBkb3QuY2xhc3NOYW1lID0gJ2RzaHItZG90IGdyYXknXG4gICAgYnRuLmFwcGVuZENoaWxkKGRvdClcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBpZiAobWVudUVsKSBjbG9zZU1lbnUoKVxuICAgICAgZWxzZSB2b2lkIHJlbmRlck1lbnUoKVxuICAgIH0pXG4gICAgcmV0dXJuIGJ0blxuICB9XG5cbiAgLy8gXHU5NjMyXHU2Mjk2XHU5NTAxXHVGRjFBTXV0YXRpb25PYnNlcnZlciBcdTlBRDhcdTk4OTFcdTg5RTZcdTUzRDFcdTY1RjZcdTU0MDhcdTVFNzZcdThCRjdcdTZDNDJcdUZGMENcdTkwN0ZcdTUxNERcdTVFNzZcdTUzRDFcdTYyNTNcdTcyMDYgc2VydmVyIFx1NjNBMlx1NkQ0Qlx1MzAwMlxuICBsZXQgZW5zdXJlTG9jayA9IGZhbHNlXG4gIGNvbnN0IGVuc3VyZUVudHJ5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmIChkaXNwb3NlZCB8fCBlbnN1cmVMb2NrKSByZXR1cm5cbiAgICBlbnN1cmVMb2NrID0gdHJ1ZVxuICAgIC8vIFx1ODNEQ1x1NTM1NVx1NjYzRVx1OTY5MFx1NTNENyBzZXJ2ZXIgXHU3MkI2XHU2MDAxXHU2M0E3XHU1MjM2XHVGRjFCXHU2N0U1XHU4QkUyXHU1OTMxXHU4RDI1XHU2NUY2XHU0RkREXHU1Qjg4XHU2NjNFXHU3OTNBXHVGRjA4XHU5RUQ4XHU4QkE0XHU2NjNFXHU3OTNBXHVGRjA5XHUzMDAyXG4gICAgdm9pZCBmZXRjaFN0YXR1cyhmYWxzZSlcbiAgICAgIC50aGVuKChzdGF0dXMpID0+IHtcbiAgICAgICAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgICAgICAgbGF0ZXN0ID0gc3RhdHVzXG4gICAgICAgIGNvbnN0IHRhcmdldFZpc2libGUgPSBzdGF0dXMubWVudVZpc2libGUgIT09IGZhbHNlXG4gICAgICAgIGNvbnN0IG1vdW50ID0gcmVzb2x2ZU1vdW50KClcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihFTlRSWV9TRUxFQ1RPUilcbiAgICAgICAgaWYgKCF0YXJnZXRWaXNpYmxlKSB7XG4gICAgICAgICAgZXhpc3Rpbmc/LnJlbW92ZSgpXG4gICAgICAgICAgY2xlYW51cE1lbnUoKVxuICAgICAgICAgIG9wdGlvbnMub25NZW51VmlzaWJsZUNoYW5nZT8uKGZhbHNlKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChleGlzdGluZyAmJiBleGlzdGluZy5wYXJlbnRFbGVtZW50ID09PSBtb3VudC5ob3N0KSB7XG4gICAgICAgICAgZW50cnlFbCA9IGV4aXN0aW5nXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4aXN0aW5nKSBleGlzdGluZy5yZW1vdmUoKVxuICAgICAgICBjb25zdCBidG4gPSBidWlsZEVudHJ5KClcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2RzaHItZW50cnknKVxuICAgICAgICAvLyBcdTcyQjZcdTYwMDFcdTcwNkZcdTUyMURcdTU5Q0JcdTgyNzJcbiAgICAgICAgY29uc3QgZG90ID0gYnRuLnF1ZXJ5U2VsZWN0b3IoJy5kc2hyLWRvdCcpXG4gICAgICAgIGlmIChkb3QpIGRvdC5jbGFzc0xpc3QuYWRkKHN0YXR1c0RvdENsYXNzKHN0YXR1cykpXG4gICAgICAgIGlmIChtb3VudC5iZWZvcmUpIG1vdW50Lmhvc3QuaW5zZXJ0QmVmb3JlKGJ0biwgbW91bnQuYmVmb3JlKVxuICAgICAgICBlbHNlIG1vdW50Lmhvc3QuYXBwZW5kQ2hpbGQoYnRuKVxuICAgICAgICAvLyBcdTVERjJcdTYzMDJcdThGREJcdTVERTVcdTUxNzdcdTY4MEYvXHU5NTFBXHU3MEI5XHU1NDBFXHVGRjBDXHU2RTA1XHU2Mzg5XHU3QTdBXHU3Njg0XHU1MTVDXHU1RTk1XHU2RDZFXHU1QzQyXG4gICAgICAgIGlmIChtb3VudC5ob3N0LmlkICE9PSAnZHNoci1mYWxsYmFjay1ob3N0Jykge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkc2hyLWZhbGxiYWNrLWhvc3QnKT8ucmVtb3ZlKClcbiAgICAgICAgfVxuICAgICAgICBlbnRyeUVsID0gYnRuXG4gICAgICAgIG9wdGlvbnMub25NZW51VmlzaWJsZUNoYW5nZT8uKHRydWUpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgLy8gXHU3MkI2XHU2MDAxXHU4M0I3XHU1M0Q2XHU1OTMxXHU4RDI1XHVGRjFBXHU0RUNEXHU2NjNFXHU3OTNBXHU1MTY1XHU1M0UzXHVGRjA4XHU0RkREXHU1Qjg4XHU3QjU2XHU3NTY1XHVGRjA5XHVGRjBDXHU3MDcwXHU3MDZGXHUzMDAyXG4gICAgICAgIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gICAgICAgIGNvbnN0IG1vdW50ID0gcmVzb2x2ZU1vdW50KClcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihFTlRSWV9TRUxFQ1RPUilcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgZW50cnlFbCA9IGV4aXN0aW5nXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgZW50cnlFbCA9IGJ1aWxkRW50cnkoKVxuICAgICAgICBpZiAobW91bnQuYmVmb3JlKSBtb3VudC5ob3N0Lmluc2VydEJlZm9yZShlbnRyeUVsLCBtb3VudC5iZWZvcmUpXG4gICAgICAgIGVsc2UgbW91bnQuaG9zdC5hcHBlbmRDaGlsZChlbnRyeUVsKVxuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgZW5zdXJlTG9jayA9IGZhbHNlXG4gICAgICB9KVxuICB9XG5cbiAgLy8gXHU4MUVBXHU2MTA4XHVGRjFBXHU3NkQxXHU1NDJDIERPTVx1RkYwQ1x1NTE2NVx1NTNFM1x1ODhBQlx1NzlGQlx1OTY2NFx1NTQwRVx1OTFDRFx1NjNEMlx1RkYwOFx1OTUxQVx1NzBCOVx1NEUwRVx1NTE1Q1x1NUU5NVx1NUJCOVx1NTY2OFx1NEUwMFx1ODlDNlx1NTQwQ1x1NEVDMVx1RkYwOVx1MzAwMlxuICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKEVOVFJZX1NFTEVDVE9SKSkgcmV0dXJuXG4gICAgZW5zdXJlRW50cnkoKVxuICB9KVxuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pXG5cbiAgLy8gXHU3MEI5XHU1MUZCXHU4M0RDXHU1MzU1XHU1OTE2XHU5MEU4XHU1MTczXHU5NUVEXG4gIGNvbnN0IG9uRG9jQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICBpZiAobWVudUVsICYmICFtZW51RWwuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpICYmICFlbnRyeUVsPy5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgIGNsb3NlTWVudSgpXG4gICAgfVxuICB9XG4gIGNvbnN0IG9uS2V5ID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIGNsb3NlTWVudSgpXG4gIH1cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkRvY0NsaWNrLCB0cnVlKVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXksIHRydWUpXG5cbiAgLy8gXHU4QkJFXHU3RjZFXHU5ODc1XHU4MEY2XHU1NkNBXHU1MjA3XHU2MzYyXHU1NDBFXHVGRjBDXHU5MUNEXHU2NUIwXHU4QkM0XHU0RjMwXHU4M0RDXHU1MzU1XHU2NjNFXHU5NjkwXHUzMDAyXG4gIGNvbnN0IG9uVmlzaWJpbGl0eUV2ZW50ID0gKCk6IHZvaWQgPT4gZW5zdXJlRW50cnkoKVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZHNocjp2aXNpYmlsaXR5LWNoYW5nZWQnLCBvblZpc2liaWxpdHlFdmVudClcblxuICAvLyBcdTk5OTZcdTZCMjFcdTYzMDJcdThGN0RcdUZGMDhcdTUzRUZcdTgwRkQgc2hlbGwgXHU4RkQ4XHU2Q0ExXHU2RTMyXHU2N0QzXHU1QjhDXHVGRjBDXHU4RjZFXHU4QkUyXHU1MUUwXHU2QjIxXHVGRjA5XG4gIGxldCBhdHRlbXB0cyA9IDBcbiAgY29uc3QgdHJ5TW91bnQgPSAoKTogdm9pZCA9PiB7XG4gICAgZW5zdXJlRW50cnkoKVxuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihFTlRSWV9TRUxFQ1RPUikgJiYgYXR0ZW1wdHMgPCAyMCkge1xuICAgICAgYXR0ZW1wdHMgKz0gMVxuICAgICAgc2V0VGltZW91dCh0cnlNb3VudCwgNTAwKVxuICAgIH1cbiAgfVxuICB0cnlNb3VudCgpXG5cbiAgcmV0dXJuICgpID0+IHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgICBvYnNlcnZlcj8uZGlzY29ubmVjdCgpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkRvY0NsaWNrLCB0cnVlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleSwgdHJ1ZSlcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHNocjp2aXNpYmlsaXR5LWNoYW5nZWQnLCBvblZpc2liaWxpdHlFdmVudClcbiAgICBlbnRyeUVsPy5yZW1vdmUoKVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkc2hyLWZhbGxiYWNrLWhvc3QnKT8ucmVtb3ZlKClcbiAgICBjbGVhbnVwTWVudSgpXG4gIH1cbn1cbiIsICIvKipcbiAqIHNldHRpbmdzLWNhcmQgXHUyMDE0XHUyMDE0IFx1OEJCRVx1N0Y2RVx1OTg3NVx1MzAwQ2RzaC1yZWdpb24gXHU2RTkwXHU3QkExXHU3NDA2XHUzMDBEXHU1MzYxXHU3MjQ3XHUzMDAyXG4gKiBcdTYzRDBcdTRGOUJcdTUzRjNcdTRFMEFcdTg5RDJcdTgzRENcdTUzNTVcdTc2ODRcdTY2M0VcdTc5M0EvXHU5NjkwXHU4NUNGXHU4MEY2XHU1NkNBXHU1RjAwXHU1MTczXHVGRjBDXHU3MkI2XHU2MDAxXHU1QjU4IHNlcnZlclx1RkYwOHJlZ2lvbi5qc29uXHVGRjA5XHUzMDAyXG4gKiBSZWFjdCBcdTdFQzRcdTRFRjZcdUZGMDhob3N0IFx1NjNEMFx1NEY5QiByZWFjdFx1RkYwQ2J1bmRsZSBcdTU5MTZcdTdGNkVcdUZGMDlcdTMwMDJcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IGFzIGgsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHR5cGUgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBmZXRjaFN0YXR1cywgcmVxdWVzdE1lbnVWaXNpYmxlIH0gZnJvbSAnLi9ob3N0LWFwaS5qcydcbmltcG9ydCB7IHpoIH0gZnJvbSAnLi9sb2NhbGVzLmpzJ1xuXG4vKiogXHU5MDFBXHU3N0U1IGhlYWRlciBcdTgzRENcdTUzNTVcdTkxQ0RcdTY1QjBcdThCQzRcdTRGMzBcdTY2M0VcdTk2OTBcdUZGMDh3aW5kb3cgXHU0RThCXHU0RUY2XHVGRjBDXHU4OUUzXHU4MDI2IFJlYWN0IFx1NEUwRSBET00gXHU2Q0U4XHU1MTY1XHVGRjA5XHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gZGlzcGF0Y2hWaXNpYmlsaXR5Q2hhbmdlZCgpOiB2b2lkIHtcbiAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdkc2hyOnZpc2liaWxpdHktY2hhbmdlZCcpKVxufVxuXG5pbnRlcmZhY2UgQ2FyZFByb3BzIHtcbiAgdD86IChrZXk6IHN0cmluZykgPT4gc3RyaW5nXG59XG5cbmZ1bmN0aW9uIENhcmRTaGVsbChwcm9wczoge1xuICB0aXRsZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZVxufSk6IFJlYWN0Tm9kZSB7XG4gIHJldHVybiBoKCdkaXYnLCB7IHN0eWxlOiB7IHBhZGRpbmc6ICcxMnB4IDAnIH0gfSxcbiAgICBoKCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRXZWlnaHQ6IDYwMCwgZm9udFNpemU6IDE0LCBtYXJnaW5Cb3R0b206IDQgfSB9LCBwcm9wcy50aXRsZSksXG4gICAgaCgnZGl2JywgeyBzdHlsZTogeyBjb2xvcjogJ3ZhcigtLWNvbG9yLXRleHQtc2Vjb25kYXJ5LCM4Yjk0OWUpJywgZm9udFNpemU6IDEyLCBtYXJnaW5Cb3R0b206IDEwIH0gfSwgcHJvcHMuZGVzY3JpcHRpb24pLFxuICAgIHByb3BzLmNoaWxkcmVuLFxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWdpb25TZXR0aW5nc0NhcmQoX3Byb3BzOiBDYXJkUHJvcHMpOiBSZWFjdE5vZGUge1xuICBjb25zdCBbdmlzaWJsZSwgc2V0VmlzaWJsZV0gPSB1c2VTdGF0ZTxib29sZWFuIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtlcnIsIHNldEVycl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGFsaXZlID0gdHJ1ZVxuICAgIGZldGNoU3RhdHVzKClcbiAgICAgIC50aGVuKChzKSA9PiB7XG4gICAgICAgIGlmIChhbGl2ZSkgc2V0VmlzaWJsZShzLm1lbnVWaXNpYmxlICE9PSBmYWxzZSlcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICBpZiAoYWxpdmUpIHNldFZpc2libGUodHJ1ZSlcbiAgICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFsaXZlID0gZmFsc2VcbiAgICB9XG4gIH0sIFtdKVxuXG4gIGNvbnN0IHRvZ2dsZSA9ICgpOiB2b2lkID0+IHtcbiAgICBpZiAodmlzaWJsZSA9PT0gbnVsbCB8fCBidXN5KSByZXR1cm5cbiAgICBjb25zdCBuZXh0ID0gIXZpc2libGVcbiAgICBzZXRCdXN5KHRydWUpXG4gICAgc2V0RXJyKG51bGwpXG4gICAgcmVxdWVzdE1lbnVWaXNpYmxlKG5leHQpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHNldFZpc2libGUobmV4dClcbiAgICAgICAgZGlzcGF0Y2hWaXNpYmlsaXR5Q2hhbmdlZCgpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlOiB1bmtub3duKSA9PiBzZXRFcnIoZSBpbnN0YW5jZW9mIEVycm9yID8gZS5tZXNzYWdlIDogU3RyaW5nKGUpKSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHNldEJ1c3koZmFsc2UpKVxuICB9XG5cbiAgY29uc3QgY2Fwc3VsZSA9IGgoXG4gICAgJ2J1dHRvbicsXG4gICAge1xuICAgICAgb25DbGljazogdG9nZ2xlLFxuICAgICAgZGlzYWJsZWQ6IHZpc2libGUgPT09IG51bGwgfHwgYnVzeSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDYsXG4gICAgICAgIHBhZGRpbmc6ICc0cHggMTRweCcsIGJvcmRlclJhZGl1czogOTk5LCBmb250U2l6ZTogMTMsIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tY29sb3ItYm9yZGVyLWRlZmF1bHQscmdiYSgyNDAsMjQ2LDI1MiwuMikpJyxcbiAgICAgICAgYmFja2dyb3VuZDogdmlzaWJsZSA/ICdyZ2JhKDYzLDE4NSw4MCwuMTUpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgIGNvbG9yOiB2aXNpYmxlID8gJyMzZmI5NTAnIDogJ3ZhcigtLWNvbG9yLXRleHQtc2Vjb25kYXJ5LCM4Yjk0OWUpJyxcbiAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgfSxcbiAgICAgICdhcmlhLXByZXNzZWQnOiBTdHJpbmcodmlzaWJsZSA9PT0gdHJ1ZSksXG4gICAgfSxcbiAgICBoKCdzcGFuJywge1xuICAgICAgc3R5bGU6IHsgd2lkdGg6IDgsIGhlaWdodDogOCwgYm9yZGVyUmFkaXVzOiAnNTAlJywgYmFja2dyb3VuZDogJ2N1cnJlbnRDb2xvcicsIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snIH0sXG4gICAgfSksXG4gICAgdmlzaWJsZSA/IHpoWydjYXJkLnNob3cnXSA6IHpoWydjYXJkLmhpZGUnXSxcbiAgKVxuXG4gIHJldHVybiBDYXJkU2hlbGwoe1xuICAgIHRpdGxlOiB6aFsnY2FyZC50aXRsZSddLFxuICAgIGRlc2NyaXB0aW9uOiB6aFsnY2FyZC5kZXNjcmlwdGlvbiddLFxuICAgIGNoaWxkcmVuOiBoKCdkaXYnLCB7IHN0eWxlOiB7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogMTIsIGZsZXhXcmFwOiAnd3JhcCcgfSB9LFxuICAgICAgaCgnZGl2JywgeyBzdHlsZTogeyBmb250U2l6ZTogMTMgfSB9LFxuICAgICAgICB6aFsnY2FyZC5tZW51VmlzaWJsZSddLFxuICAgICAgICBoKCdkaXYnLCB7IHN0eWxlOiB7IGNvbG9yOiAndmFyKC0tY29sb3ItdGV4dC10ZXJ0aWFyeSwjNmU3NjgxKScsIGZvbnRTaXplOiAxMiB9IH0sIHpoWydjYXJkLm1lbnVWaXNpYmxlRGVzYyddKSxcbiAgICAgICksXG4gICAgICBjYXBzdWxlLFxuICAgICAgZXJyID8gaCgnc3BhbicsIHsgc3R5bGU6IHsgY29sb3I6ICcjZjg1MTQ5JywgZm9udFNpemU6IDEyIH0gfSwgZXJyKSA6IG51bGwsXG4gICAgKSxcbiAgfSlcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXQSxJQUFBQSxnQkFBbUM7OztBQ21CbkMsSUFBTSxPQUFPLEdBQUcsT0FBTyxTQUFTLE1BQU07QUFFdEMsZUFBZSxZQUFlLE1BQWMsTUFBZ0M7QUFDMUUsUUFBTSxNQUFNLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLElBQUk7QUFBQSxJQUN4QyxTQUFTLEVBQUUsZ0JBQWdCLG1CQUFtQjtBQUFBLElBQzlDLEdBQUc7QUFBQSxFQUNMLENBQUM7QUFDRCxNQUFJLENBQUMsSUFBSSxJQUFJO0FBQ1gsVUFBTSxJQUFJLE1BQU0sUUFBUSxJQUFJLE1BQU0sRUFBRTtBQUFBLEVBQ3RDO0FBQ0EsU0FBUSxNQUFNLElBQUksS0FBSztBQUN6QjtBQUdPLFNBQVMsWUFBWSxRQUFRLE9BQThCO0FBQ2hFLFNBQU8sWUFBMEIsVUFBVSxRQUFRLGFBQWEsRUFB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

return module.exports; } });