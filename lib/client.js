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
`;
function findLogButton() {
  const all = Array.from(document.querySelectorAll("button"));
  return all.find((b) => /sessionLog/i.test(b.className)) ?? all.find((b) => {
    const span = b.querySelector("span");
    return !!span && /session\s*log|下载.*日志/i.test(span.textContent ?? "");
  }) ?? null;
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
      const anchor = findLogButton();
      const container = anchor?.parentElement;
      if (!anchor || !container) return;
      const existing = container.querySelector(ENTRY_SELECTOR);
      if (!targetVisible) {
        existing?.remove();
        cleanupMenu();
        options.onMenuVisibleChange?.(false);
        return;
      }
      if (existing && existing.parentElement === container) {
        entryEl = existing;
        return;
      }
      const btn = buildEntry();
      btn.classList.add("dshr-entry");
      const dot = btn.querySelector(".dshr-dot");
      if (dot) dot.classList.add(statusDotClass(status));
      container.insertBefore(btn, anchor);
      entryEl = btn;
      options.onMenuVisibleChange?.(true);
    }).catch(() => {
      if (disposed) return;
      const anchor = findLogButton();
      const container = anchor?.parentElement;
      if (!anchor || !container) return;
      const existing = container.querySelector(ENTRY_SELECTOR);
      if (existing) {
        entryEl = existing;
        return;
      }
      entryEl = buildEntry();
      container.insertBefore(entryEl, anchor);
    }).finally(() => {
      ensureLock = false;
    });
  };
  observer = new MutationObserver(() => {
    const container = findLogButton()?.parentElement;
    if (!container) return;
    const stillThere = container.querySelector(ENTRY_SELECTOR);
    if (!stillThere) ensureEntry();
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
var inject = ["slots", "settingsScope"];
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NsaWVudC9pbmRleC50cyIsICJzcmMvY2xpZW50L2hvc3QtYXBpLnRzIiwgInNyYy9jbGllbnQvbG9jYWxlcy50cyIsICJzcmMvY2xpZW50L2hlYWRlci1tZW51LnRzIiwgInNyYy9jbGllbnQvc2V0dGluZ3MtY2FyZC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogZHNoLXJlZ2lvbiBjbGllbnQgYnVuZGxlIFx1NTE2NVx1NTNFM1x1MzAwMlxuICpcbiAqIFx1NjMwMlx1OEY3RFx1NEUyNFx1NTkwNCBVSVx1RkYxQVxuICogIDEuIFx1NTNGM1x1NEUwQVx1ODlEMlx1NkU5MFx1N0JBMVx1NzQwNlx1ODNEQ1x1NTM1NVx1RkYwOFx1N0VBRiBET00gXHU2Q0U4XHU1MTY1XHVGRjBDXHU4OUMxIGhlYWRlci1tZW51LnRzXHVGRjA5XG4gKiAgMi4gXHU4QkJFXHU3RjZFXHU5ODc1XHUzMDBDZHNoLXJlZ2lvbiBcdTZFOTBcdTdCQTFcdTc0MDZcdTMwMERcdTUzNjFcdTcyNDdcdUZGMDhSZWFjdFx1RkYwQ1x1NUI5OFx1NjVCOSBzZXR0aW5ncy5wbHVnaW4uaXRlbSBcdTY5RkRcdTRGNERcdUZGMENcbiAqICAgICBcdTVENENcdTU5NTcgaW5qZWN0IHNldHRpbmdzU2NvcGVcdTIwMTRcdTIwMTRcdTY1RTcgaG9zdCBcdTY1RTBcdTZCNjRcdTY3MERcdTUyQTFcdTY1RjZcdTUzNjFcdTcyNDdcdTk3NTlcdTlFRDhcdTRFMERcdTUxRkFcdTczQjBcdUZGMDlcbiAqXG4gKiBcdTk0QzFcdTVGOEJcdUZGMUFcdTRFRkJcdTRGNTVcdTYzMDJcdThGN0RcdTU5MzFcdThEMjVcdTUzRUEgY29uc29sZS53YXJuXHVGRjBDXHU3RUREXHU0RTBEIHRocm93XHVGRjA4XHU1OTE2XHU5MEU4XHU2M0QyXHU0RUY2XHU0RTBEXHU4MEZEXHU2MkQ2XHU1N0FFIERTSCBcdTU0MkZcdTUyQThcdUZGMDlcdTMwMDJcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IGFzIGggfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IG1vdW50SGVhZGVyTWVudSB9IGZyb20gJy4vaGVhZGVyLW1lbnUuanMnXG5pbXBvcnQgeyBSZWdpb25TZXR0aW5nc0NhcmQsIGRpc3BhdGNoVmlzaWJpbGl0eUNoYW5nZWQgfSBmcm9tICcuL3NldHRpbmdzLWNhcmQuanMnXG5cbmV4cG9ydCBjb25zdCBuYW1lID0gJ2RzaC1yZWdpb24nXG5cbi8qKiBcdTU4RjBcdTY2MEVcdTk3MDBcdTg5ODFcdTc2ODQgY2xpZW50IFx1NjcwRFx1NTJBMVx1RkYxQXNsb3RzXHVGRjA4VUkgXHU2Q0U4XHU1MTY1XHU2ODM4XHU1RkMzXHVGRjA5XHUzMDAxc2V0dGluZ3NTY29wZVx1RkYwOFx1OEJCRVx1N0Y2RVx1OTg3NVx1NTM2MVx1NzI0N1x1RkYwOVx1MzAwMiAqL1xuZXhwb3J0IGNvbnN0IGluamVjdCA9IFsnc2xvdHMnLCAnc2V0dGluZ3NTY29wZSddXG5cbi8qKiBcdTk2MzJcdTkxQ0RcdTU5MERcdUZGMUFcdTU0MENcdTRFMDBcdTk4NzVcdTk3NjJcdTc1MUZcdTU0N0RcdTU0NjhcdTY3MUZcdTUxODVcdTUzRUFcdTVFOTRcdTc1MjhcdTRFMDBcdTZCMjFcdTMwMDIgKi9cbmxldCBhcHBsaWVkID0gZmFsc2VcblxuaW50ZXJmYWNlIENsaWVudEN0eCB7XG4gIGluamVjdD8oZGVwczogc3RyaW5nW10sIGNiOiAoc2NvcGVkOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZCk6IHZvaWRcbiAgc2xvdHM/OiB7XG4gICAgaW5qZWN0PyhzbG90OiBzdHJpbmcsIHJlZ2lzdGVyOiAoKSA9PiB1bmtub3duKTogdm9pZFxuICAgIHJlZ2lzdGVyPyhtZXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwgY29tcG9uZW50OiAoKSA9PiB1bmtub3duKTogdW5rbm93blxuICB9XG4gIGVmZmVjdD8oZm46ICgpID0+IHVua25vd24sIGxhYmVsOiBzdHJpbmcpOiB1bmtub3duXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseShjdHg6IENsaWVudEN0eCk6IHZvaWQge1xuICBpZiAoYXBwbGllZCkgcmV0dXJuXG4gIGFwcGxpZWQgPSB0cnVlXG5cbiAgLy8gXHU4M0RDXHU1MzU1XHU2NjNFXHU5NjkwXHU3NTMxIHNlcnZlciBcdTcyQjZcdTYwMDFcdTlBNzFcdTUyQThcdUZGMUJcdThCQkVcdTdGNkVcdTk4NzVcdTgwRjZcdTU2Q0FcdTUyMDdcdTYzNjJcdTU0MEVcdTdFQ0Ygd2luZG93IFx1NEU4Qlx1NEVGNlx1OTAxQVx1NzdFNVx1OTFDRFx1OEJDNFx1NEYzMFx1MzAwMlxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZHNocjp2aXNpYmlsaXR5LWNoYW5nZWQnLCAoKSA9PiB7XG4gICAgLy8gaGVhZGVyLW1lbnUgXHU1MTg1XHU5MEU4XHU1REYyXHU3NkQxXHU1NDJDXHU1NDBDXHU1NDBEXHU0RThCXHU0RUY2XHU1MDVBIGVuc3VyZUVudHJ5XHVGRjFCXHU2QjY0XHU1OTA0XHU0RUM1XHU1MTVDXHU1RTk1XHU4OUU2XHU1M0QxXHU0RTAwXHU2QjIxXHUzMDAyXG4gICAgdm9pZCAwXG4gIH0pXG5cbiAgdHJ5IHtcbiAgICBtb3VudEhlYWRlck1lbnUoe1xuICAgICAgb25NZW51VmlzaWJsZUNoYW5nZTogKCkgPT4gZGlzcGF0Y2hWaXNpYmlsaXR5Q2hhbmdlZCgpLFxuICAgIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS53YXJuKCdbZHNoLXJlZ2lvbl0gaGVhZGVyIG1lbnUgbW91bnQgZmFpbGVkOicsIGVycm9yKVxuICB9XG5cbiAgLy8gXHU4QkJFXHU3RjZFXHU5ODc1XHU1MzYxXHU3MjQ3XHVGRjFBXHU3NTI4IGN0eC5zbG90c1x1RkYwOGluamVjdCBcdTU4RjBcdTY2MEVcdTU0MEVcdTUzRUZcdTc1MjhcdUZGMDlcdTZDRThcdTUxOENcdTUyMzBcdTVCOThcdTY1Qjkgc2V0dGluZ3MucGx1Z2luLml0ZW0gXHU2OUZEXHU0RjREXHUzMDAyXG4gIC8vIFx1NkNFOFx1RkYxQVx1NUY1M1x1NTI0RCBEU0ggXHU3MjQ4XHU2NzJDXHU3Njg0XHU4QkJFXHU3RjZFIFVJIFx1NjcyQVx1NkUzMlx1NjdEM1x1OEJFNVx1NjlGRFx1NEY0RFx1RkYwQ1x1NTM2MVx1NzI0N1x1NjY4Mlx1NEUwRFx1NTNFRlx1ODlDMVx1RkYxQlx1NEVFM1x1NzgwMVx1NEZERFx1NzU1OVx1RkYwQ1x1NjlGRFx1NEY0RFx1NTE3Q1x1NUJCOVx1NTQwRVx1ODFFQVx1NTJBOFx1NTFGQVx1NzNCMFx1MzAwMlxuICBpZiAoY3R4LnNsb3RzPy5pbmplY3QgJiYgY3R4LnNsb3RzLnJlZ2lzdGVyKSB7XG4gICAgdHJ5IHtcbiAgICAgIGN0eC5zbG90cy5pbmplY3QoJ3NldHRpbmdzLnBsdWdpbi5pdGVtJywgKCkgPT5cbiAgICAgICAgY3R4LnNsb3RzLnJlZ2lzdGVyIShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnc2V0dGluZ3MucGx1Z2luLml0ZW0nLFxuICAgICAgICAgICAga2V5OiAncmVnaW9uJyxcbiAgICAgICAgICAgIGxvY2FsZTogJ2RzaC1yZWdpb24nLFxuICAgICAgICAgICAgaW5qZWN0OiAoKSA9PiAoe30pLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgKCkgPT4gaChSZWdpb25TZXR0aW5nc0NhcmQsIHt9KSxcbiAgICAgICAgKSxcbiAgICAgIClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS53YXJuKCdbZHNoLXJlZ2lvbl0gc2V0dGluZ3MgY2FyZCByZWdpc3RlciBmYWlsZWQ6JywgZXJyb3IpXG4gICAgfVxuICB9XG59XG4iLCAiLyoqXG4gKiBob3N0LWFwaSBcdTIwMTRcdTIwMTQgY2xpZW50IFx1NEUwRSBob3N0IFx1N0FFRiBSZWdpb25TZXJ2aWNlIFx1NzY4NCBIVFRQIFx1OTAxQVx1NEZFMVx1MzAwMlxuICogXHU4RDcwXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0XHVGRjA4XHU1NDBDXHU2RTkwXHVGRjA5XHVGRjBDXHU3NTMxIERTSCB3ZWIgc2VydmVyIFx1OEY2Q1x1NTNEMVx1NTIzMFx1NjNEMlx1NEVGNlx1OERFRlx1NzUzMVx1MzAwMlxuICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvYmVSZXN1bHQge1xuICBvazogYm9vbGVhblxuICBtczogbnVtYmVyXG4gIGVycm9yPzogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVnaW9uU3RhdHVzIHtcbiAgbW9kZTogJ2F1dG8nIHwgJ21haW4nIHwgJ2JhY2t1cCdcbiAgYXBwbGllZFJlZ2lzdHJ5OiBzdHJpbmcgfCBudWxsXG4gIG1haW5SZWdpc3RyeTogc3RyaW5nXG4gIGJhY2t1cFJlZ2lzdHJ5OiBzdHJpbmdcbiAgbGFzdEVycm9yOiBzdHJpbmcgfCBudWxsXG4gIGxhc3RTd2l0Y2hBdDogc3RyaW5nIHwgbnVsbFxuICBtZW51VmlzaWJsZTogYm9vbGVhblxuICBtYWluOiBQcm9iZVJlc3VsdCB8IG51bGxcbiAgYmFja3VwOiBQcm9iZVJlc3VsdCB8IG51bGxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVc2VSZXN1bHQge1xuICBvazogYm9vbGVhblxuICBtZXNzYWdlOiBzdHJpbmdcbn1cblxuLy8gXHU3NTI4IGxvY2F0aW9uLm9yaWdpbiBcdTYyRkNcdTdFRERcdTVCRjkgVVJMXHVGRjFBRFNIIFx1OTg3NVx1OTc2Mlx1NzNBRlx1NTg4M1x1NEUwQlx1NzZGOFx1NUJGOVx1OERFRlx1NUY4NCBmZXRjaCBcdTRGMUFcdTYzMDJcdThENzdcdUZGMDhcdTVCOUVcdTZENEJcdUZGMDlcdUZGMENcbi8vIFx1N0VERFx1NUJGOSBVUkwgXHU2QjYzXHU1RTM4XHUzMDAyb3JpZ2luIFx1NTJBOFx1NjAwMVx1ODNCN1x1NTNENlx1RkYwQ0RTSCBcdTYzNjJcdTdBRUZcdTUzRTNcdTRFNUZcdTkwMDJcdTkxNERcdTMwMDJcbmNvbnN0IEJBU0UgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9kc2gtcmVnaW9uYFxuXG5hc3luYyBmdW5jdGlvbiByZXF1ZXN0SnNvbjxUPihwYXRoOiBzdHJpbmcsIGluaXQ/OiBSZXF1ZXN0SW5pdCk6IFByb21pc2U8VD4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtCQVNFfSR7cGF0aH1gLCB7XG4gICAgaGVhZGVyczogeyAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgLi4uaW5pdCxcbiAgfSlcbiAgaWYgKCFyZXMub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgJHtyZXMuc3RhdHVzfWApXG4gIH1cbiAgcmV0dXJuIChhd2FpdCByZXMuanNvbigpKSBhcyBUXG59XG5cbi8qKiBcdTYyQzlcdTUzRDZcdTcyQjZcdTYwMDFcdTMwMDJwcm9iZT10cnVlIFx1NjVGNiBzZXJ2ZXIgXHU1QjlFXHU2NUY2XHU2M0EyXHU2RDRCXHU1M0NDXHU2RTkwXHVGRjA4XHU4M0RDXHU1MzU1XHUzMDBDXHU3QUNCXHU1MzczXHU2RDRCXHU5MDFGXHUzMDBEXHVGRjA5XHVGRjFCXHU5RUQ4XHU4QkE0XHU4RkQ0XHU1NkRFXHU3RjEzXHU1QjU4XHVGRjBDXHU3OUQyXHU1NkRFXHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hTdGF0dXMocHJvYmUgPSBmYWxzZSk6IFByb21pc2U8UmVnaW9uU3RhdHVzPiB7XG4gIHJldHVybiByZXF1ZXN0SnNvbjxSZWdpb25TdGF0dXM+KGAvc3RhdHVzJHtwcm9iZSA/ICc/cHJvYmU9MScgOiAnJ31gKVxufVxuXG4vKiogXHU1MjA3XHU2MzYyXHU2QTIxXHU1RjBGIGF1dG98bWFpbnxiYWNrdXBcdTMwMDIgKi9cbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0TW9kZShtb2RlOiAnYXV0bycgfCAnbWFpbicgfCAnYmFja3VwJyk6IFByb21pc2U8VXNlUmVzdWx0PiB7XG4gIHJldHVybiByZXF1ZXN0SnNvbjxVc2VSZXN1bHQ+KCcvdXNlJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbW9kZSB9KSxcbiAgfSlcbn1cblxuLyoqIFx1OEJCRVx1N0Y2RVx1NTNGM1x1NEUwQVx1ODlEMlx1ODNEQ1x1NTM1NVx1NjYzRVx1OTY5MFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RNZW51VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKTogUHJvbWlzZTx7IG9rOiBib29sZWFuOyB2aXNpYmxlOiBib29sZWFuIH0+IHtcbiAgcmV0dXJuIHJlcXVlc3RKc29uKCcvbWVudScsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHZpc2libGUgfSksXG4gIH0pXG59XG4iLCAiLyoqXG4gKiBkc2gtcmVnaW9uIGNsaWVudCBcdTY1ODdcdTY4NDggXHUyMDE0XHUyMDE0IFx1NEUyRFx1ODJGMVx1NTNDQ1x1OEJFRFx1OTZDNlx1NEUyRFx1N0JBMVx1NzQwNlx1RkYwOFx1OUVEOFx1OEJBNFx1NEUyRFx1NjU4N1x1RkYwQ1x1NjNEMlx1NEVGNlx1OTc2Mlx1NTQxMVx1NTZGRFx1NTE4NVx1NzUyOFx1NjIzN1x1RkYwOVx1MzAwMlxuICovXG5cbmV4cG9ydCB0eXBlIFJlZ2lvbktleSA9XG4gIHwgJ21lbnUudGl0bGUnXG4gIHwgJ21lbnUuc3RhdHVzR3JlZW4nXG4gIHwgJ21lbnUuc3RhdHVzWWVsbG93J1xuICB8ICdtZW51LnN0YXR1c1JlZCdcbiAgfCAnbWVudS5zdGF0dXNVbmtub3duJ1xuICB8ICdtZW51LmF1dG8nXG4gIHwgJ21lbnUubWFpbidcbiAgfCAnbWVudS5iYWNrdXAnXG4gIHwgJ21lbnUucHJvYmUnXG4gIHwgJ21lbnUuY3VycmVudCdcbiAgfCAnbWVudS5oaWRkZW4nXG4gIHwgJ2NhcmQudGl0bGUnXG4gIHwgJ2NhcmQuZGVzY3JpcHRpb24nXG4gIHwgJ2NhcmQubWVudVZpc2libGUnXG4gIHwgJ2NhcmQubWVudVZpc2libGVEZXNjJ1xuICB8ICdjYXJkLnNob3cnXG4gIHwgJ2NhcmQuaGlkZSdcbiAgfCAnZXJyLmZldGNoRmFpbGVkJ1xuXG5leHBvcnQgY29uc3Qgemg6IFJlY29yZDxSZWdpb25LZXksIHN0cmluZz4gPSB7XG4gICdtZW51LnRpdGxlJzogJ2RzaC1yZWdpb24gXHU2RTkwXHU3QkExXHU3NDA2JyxcbiAgJ21lbnUuc3RhdHVzR3JlZW4nOiAnXHU0RTNCXHU2RTkwXHU2QjYzXHU1RTM4XHVGRjBDXHU1RjUzXHU1MjREXHU0RjdGXHU3NTI4XHU1NkZEXHU1MTg1XHU5NTVDXHU1MENGJyxcbiAgJ21lbnUuc3RhdHVzWWVsbG93JzogJ1x1NEUzQlx1NkU5MFx1NEUwRFx1NTNFRlx1NzUyOFx1RkYwQ1x1NURGMlx1ODFFQVx1NTJBOFx1NTIwN1x1NTIzMFx1NUI5OFx1NjVCOVx1NkU5MCcsXG4gICdtZW51LnN0YXR1c1JlZCc6ICdcdTU2RkRcdTUxODVcdTk1NUNcdTUwQ0ZcdTRFMEVcdTVCOThcdTY1QjlcdTZFOTBcdTU3NDdcdTRFMERcdTUzRUZcdTc1MjgnLFxuICAnbWVudS5zdGF0dXNVbmtub3duJzogJ1x1NzJCNlx1NjAwMVx1NjcyQVx1NzdFNVx1RkYwQ1x1NzBCOVx1NTFGQlx1MzAwQ1x1N0FDQlx1NTM3M1x1NkQ0Qlx1OTAxRlx1MzAwRFx1NjhDMFx1NkQ0QicsXG4gICdtZW51LmF1dG8nOiAnXHU4MUVBXHU1MkE4XHU1MjA3XHU2MzYyJyxcbiAgJ21lbnUubWFpbic6ICdcdTU2RkRcdTUxODVcdTk1NUNcdTUwQ0YnLFxuICAnbWVudS5iYWNrdXAnOiAnXHU1Qjk4XHU2NUI5XHU2RTkwJyxcbiAgJ21lbnUucHJvYmUnOiAnXHU3QUNCXHU1MzczXHU2RDRCXHU5MDFGJyxcbiAgJ21lbnUuY3VycmVudCc6ICdcdTVGNTNcdTUyNEQnLFxuICAnbWVudS5oaWRkZW4nOiAnXHVGRjA4XHU4M0RDXHU1MzU1XHU1REYyXHU5NjkwXHU4NUNGXHVGRjBDXHU1M0VGXHU1NzI4XHU4QkJFXHU3RjZFXHU0RTJEXHU1RjAwXHU1NDJGXHVGRjA5JyxcbiAgJ2NhcmQudGl0bGUnOiAnZHNoLXJlZ2lvbiBcdTZFOTBcdTdCQTFcdTc0MDYnLFxuICAnY2FyZC5kZXNjcmlwdGlvbic6ICdEU0ggXHU0RTBCXHU4RjdEXHU2RTkwXHU0RTNCXHU1OTA3XHU1MjA3XHU2MzYyXHVGRjFBXHU1NkZEXHU1MTg1XHU5NTVDXHU1MENGXHU0RTNBXHU0RTNCXHUzMDAxXHU1Qjk4XHU2NUI5XHU2RTkwXHU0RTNBXHU1OTA3XHVGRjBDXHU2NTQ1XHU5NjlDXHU4MUVBXHU1MkE4XHU1MjA3XHU2MzYyJyxcbiAgJ2NhcmQubWVudVZpc2libGUnOiAnXHU1M0YzXHU0RTBBXHU4OUQyXHU2RTkwXHU3QkExXHU3NDA2XHU4M0RDXHU1MzU1JyxcbiAgJ2NhcmQubWVudVZpc2libGVEZXNjJzogJ1x1NTcyOFx1NEYxQVx1OEJERFx1OTg3NVx1NTNGM1x1NEUwQVx1ODlEMlx1RkYwOFx1NEUwQlx1OEY3RCBMb2cgXHU1REU2XHU0RkE3XHVGRjA5XHU2NjNFXHU3OTNBXHU2RTkwXHU3QkExXHU3NDA2XHU0RTBCXHU2MkM5XHU4M0RDXHU1MzU1JyxcbiAgJ2NhcmQuc2hvdyc6ICdcdTY2M0VcdTc5M0EnLFxuICAnY2FyZC5oaWRlJzogJ1x1OTY5MFx1ODVDRicsXG4gICdlcnIuZmV0Y2hGYWlsZWQnOiAnXHU4RkRFXHU2M0E1IGRzaC1yZWdpb24gXHU2NzBEXHU1MkExXHU1OTMxXHU4RDI1Jyxcbn1cblxuZXhwb3J0IGNvbnN0IGVuOiBSZWNvcmQ8UmVnaW9uS2V5LCBzdHJpbmc+ID0ge1xuICAnbWVudS50aXRsZSc6ICdkc2gtcmVnaW9uIHNvdXJjZXMnLFxuICAnbWVudS5zdGF0dXNHcmVlbic6ICdQcmltYXJ5IGhlYWx0aHksIHVzaW5nIENoaW5hIG1pcnJvcicsXG4gICdtZW51LnN0YXR1c1llbGxvdyc6ICdQcmltYXJ5IGRvd24sIHN3aXRjaGVkIHRvIG9mZmljaWFsIHJlZ2lzdHJ5JyxcbiAgJ21lbnUuc3RhdHVzUmVkJzogJ0JvdGggcmVnaXN0cmllcyB1bnJlYWNoYWJsZScsXG4gICdtZW51LnN0YXR1c1Vua25vd24nOiAnVW5rbm93biBcdTIwMTQgY2xpY2sgXCJQcm9iZVwiIHRvIGNoZWNrJyxcbiAgJ21lbnUuYXV0byc6ICdBdXRvJyxcbiAgJ21lbnUubWFpbic6ICdDaGluYSBtaXJyb3InLFxuICAnbWVudS5iYWNrdXAnOiAnT2ZmaWNpYWwgcmVnaXN0cnknLFxuICAnbWVudS5wcm9iZSc6ICdQcm9iZSBub3cnLFxuICAnbWVudS5jdXJyZW50JzogJ2N1cnJlbnQnLFxuICAnbWVudS5oaWRkZW4nOiAnKG1lbnUgaGlkZGVuIFx1MjAxNCBlbmFibGUgaXQgaW4gc2V0dGluZ3MpJyxcbiAgJ2NhcmQudGl0bGUnOiAnZHNoLXJlZ2lvbiBzb3VyY2UgbWFuYWdlcicsXG4gICdjYXJkLmRlc2NyaXB0aW9uJzogJ0RTSCByZWdpc3RyeSBmYWlsb3ZlcjogQ2hpbmEgbWlycm9yIHByaW1hcnksIG9mZmljaWFsIGJhY2t1cCwgYXV0by1zd2l0Y2gnLFxuICAnY2FyZC5tZW51VmlzaWJsZSc6ICdTb3VyY2UgbWVudSBpbiBoZWFkZXInLFxuICAnY2FyZC5tZW51VmlzaWJsZURlc2MnOiAnU2hvdyB0aGUgc291cmNlIGRyb3Bkb3duIG5leHQgdG8gXCJTZXNzaW9uIGxvZ1wiIGluIHRoZSBoZWFkZXInLFxuICAnY2FyZC5zaG93JzogJ1Nob3cnLFxuICAnY2FyZC5oaWRlJzogJ0hpZGUnLFxuICAnZXJyLmZldGNoRmFpbGVkJzogJ0ZhaWxlZCB0byByZWFjaCBkc2gtcmVnaW9uIHNlcnZpY2UnLFxufVxuIiwgIi8qKlxuICogaGVhZGVyLW1lbnUgXHUyMDE0XHUyMDE0IFx1NTNGM1x1NEUwQVx1ODlEMlx1MzAwQ1x1NEUwQlx1OEY3RCBMb2dcdTMwMERcdTVERTZcdTRGQTdcdTc2ODRcdTZFOTBcdTdCQTFcdTc0MDZcdTRFMEJcdTYyQzlcdTgzRENcdTUzNTVcdTMwMDJcbiAqXG4gKiBcdTdFQUYgRE9NIFx1NkNFOFx1NTE2NVx1RkYwOFx1NEUwRFx1NjMwMiBSZWFjdCBcdTY4MTFcdUZGMDlcdUZGMENcdTZBMjFcdTRFRkYgbGlueGluNjY2L2RzaC13ZWItdWkgXHU3Njg0IHNpZGViYXItZW50cnkgXHU2QTIxXHU1RjBGXHVGRjFBXG4gKiAgLSBcdTVCOUFcdTRGNERcdTk1MUFcdTcwQjlcdUZGMUFTZXNzaW9uIGxvZyBcdTYzMDlcdTk0QUVcdUZGMDhjbGFzcyBcdTU0MkIgc2Vzc2lvbkxvZ1x1RkYwQ1x1NjIxNlx1NjU4N1x1NjcyQ1x1NTMzOVx1OTE0RFx1RkYwOVx1RkYwQ1x1NTcyOFx1NTE3Nlx1NTI0RFx1NjNEMlx1NTE2NVxuICogIC0gXHU4MUVBXHU2MTA4XHVGRjFBTXV0YXRpb25PYnNlcnZlciBcdTc2RDFcdTU0MkNcdUZGMENSZWFjdCBcdTkxQ0RcdTZFMzJcdTY3RDNcdTc5RkJcdTk2NjRcdTU0MEVcdTgxRUFcdTUyQThcdTkxQ0RcdTYzRDJcbiAqICAtIFx1NzJCNlx1NjAwMVx1NzA2Rlx1RkYxQVx1N0VGRi9cdTlFQzQvXHU3RUEyICsgdG9vbHRpcCBcdThCRjRcdTY2MEVcbiAqICAtIFx1ODNEQ1x1NTM1NVx1OTg3OVx1NUUyNlx1NjNBMlx1NkQ0Qlx1ODAxN1x1NjVGNlx1RkYwQ1x1NTIwN1x1NjM2Mlx1OEMwMyBob3N0IEFQSVxuICogIC0gXHU2NjNFXHU5NjkwXHU3NTMxIHNlcnZlciBcdTdBRUYgcmVnaW9uLmpzb24gXHU2M0E3XHU1MjM2XHVGRjA4bWVudVZpc2libGU9ZmFsc2UgXHU2NUY2XHU2NTc0XHU0RTJBXHU2MzA5XHU5NEFFXHU0RTBEXHU2RTMyXHU2N0QzXHVGRjA5XG4gKlxuICogXHU5NEMxXHU1RjhCXHVGRjFBXHU0RUZCXHU0RjU1IERPTSBcdTY0Q0RcdTRGNUNcdTU5MzFcdThEMjVcdTUzRUEgY29uc29sZS53YXJuXHVGRjBDXHU3RUREXHU0RTBEIHRocm93XHVGRjA4XHU0RTBEXHU4MEZEXHU2MkQ2XHU1N0FFIERTSCBcdTU0MkZcdTUyQThcdUZGMDlcdTMwMDJcbiAqL1xuXG5pbXBvcnQgeyBmZXRjaFN0YXR1cywgcmVxdWVzdE1vZGUsIHR5cGUgUmVnaW9uU3RhdHVzIH0gZnJvbSAnLi9ob3N0LWFwaS5qcydcbmltcG9ydCB7IHpoIH0gZnJvbSAnLi9sb2NhbGVzLmpzJ1xuXG5leHBvcnQgY29uc3QgRU5UUllfU0VMRUNUT1IgPSAnW2RhdGEtZHNoLXJlZ2lvbi1lbnRyeV0nXG5cbmNvbnN0IENTUyA9IGBcbi5kc2hyLWVudHJ5e2Rpc3BsYXk6aW5saW5lLWZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7d2lkdGg6MjhweDtoZWlnaHQ6MjhweDttYXJnaW46MCAycHg7cGFkZGluZzowO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6NnB4O2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Y29sb3I6dmFyKC0tY29sb3ItdGV4dC1zZWNvbmRhcnksIzhiOTQ5ZSk7Y3Vyc29yOnBvaW50ZXI7cG9zaXRpb246cmVsYXRpdmV9XG4uZHNoci1lbnRyeTpob3ZlcntiYWNrZ3JvdW5kOmNvbG9yLW1peChpbiBzcmdiLGN1cnJlbnRDb2xvciAxMiUsdHJhbnNwYXJlbnQpfVxuLmRzaHItZW50cnkgLmRzaHItZG90e3Bvc2l0aW9uOmFic29sdXRlO3RvcDo0cHg7cmlnaHQ6NHB4O3dpZHRoOjdweDtoZWlnaHQ6N3B4O2JvcmRlci1yYWRpdXM6NTAlO2JvcmRlcjoxLjVweCBzb2xpZCB2YXIoLS1jb2xvci1iZy1wcmltYXJ5LCMwZDExMTcpfVxuLmRzaHItZG90LmdyZWVue2JhY2tncm91bmQ6IzNmYjk1MH0uZHNoci1kb3QueWVsbG93e2JhY2tncm91bmQ6I2QyOTkyMn0uZHNoci1kb3QucmVke2JhY2tncm91bmQ6I2Y4NTE0OX0uZHNoci1kb3QuZ3JheXtiYWNrZ3JvdW5kOiM4Yjk0OWV9XG4uZHNoci1tZW51e3Bvc2l0aW9uOmZpeGVkO3otaW5kZXg6OTk5OTttaW4td2lkdGg6MjMwcHg7cGFkZGluZzo2cHg7Ym9yZGVyLXJhZGl1czoxMHB4O2JhY2tncm91bmQ6dmFyKC0tY29sb3ItYmctZWxldmF0ZWQsIzE2MWIyMik7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1jb2xvci1ib3JkZXItZGVmYXVsdCxyZ2JhKDI0MCwyNDYsMjUyLC4xMikpO2JveC1zaGFkb3c6MCA4cHggMjRweCByZ2JhKDEsNCw5LC40KTtmb250LXNpemU6MTNweDtjb2xvcjp2YXIoLS1jb2xvci10ZXh0LXByaW1hcnksI2U2ZWRmMyk7YW5pbWF0aW9uOmRzaHJJbiAuMTJzIGVhc2Utb3V0fVxuQGtleWZyYW1lcyBkc2hySW57ZnJvbXtvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoLTRweCl9dG97b3BhY2l0eToxO3RyYW5zZm9ybTpub25lfX1cbi5kc2hyLW1lbnUtaGVhZHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo4cHg7cGFkZGluZzo2cHggOHB4IDhweDtmb250LXdlaWdodDo2MDA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgdmFyKC0tY29sb3ItYm9yZGVyLWRlZmF1bHQscmdiYSgyNDAsMjQ2LDI1MiwuMSkpO2N1cnNvcjpoZWxwfVxuLmRzaHItbWVudS1oZWFkIC5kc2hyLWhkb3R7d2lkdGg6OHB4O2hlaWdodDo4cHg7Ym9yZGVyLXJhZGl1czo1MCU7ZmxleDpub25lfVxuLmRzaHItaXRlbXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2dhcDo4cHg7d2lkdGg6MTAwJTtwYWRkaW5nOjdweCA4cHg7Ym9yZGVyOm5vbmU7Ym9yZGVyLXJhZGl1czo3cHg7YmFja2dyb3VuZDp0cmFuc3BhcmVudDtjb2xvcjppbmhlcml0O2ZvbnQtc2l6ZToxM3B4O2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246bGVmdH1cbi5kc2hyLWl0ZW06aG92ZXJ7YmFja2dyb3VuZDpjb2xvci1taXgoaW4gc3JnYixjdXJyZW50Q29sb3IgMTAlLHRyYW5zcGFyZW50KX1cbi5kc2hyLWl0ZW0gLmRzaHItbXN7Y29sb3I6dmFyKC0tY29sb3ItdGV4dC10ZXJ0aWFyeSwjNmU3NjgxKTtmb250LXNpemU6MTJweDtmb250LXZhcmlhbnQtbnVtZXJpYzp0YWJ1bGFyLW51bXN9XG4uZHNoci1pdGVtIC5kc2hyLWN1cntjb2xvcjojM2ZiOTUwO2ZvbnQtc2l6ZToxMXB4O21hcmdpbi1sZWZ0OjRweH1cbi5kc2hyLXNlcHtoZWlnaHQ6MXB4O21hcmdpbjo1cHggNnB4O2JhY2tncm91bmQ6dmFyKC0tY29sb3ItYm9yZGVyLWRlZmF1bHQscmdiYSgyNDAsMjQ2LDI1MiwuMDgpKX1cbi5kc2hyLXByb2Jle2p1c3RpZnktY29udGVudDpjZW50ZXI7Y29sb3I6dmFyKC0tY29sb3ItdGV4dC1zZWNvbmRhcnksIzhiOTQ5ZSl9XG4uZHNoci1wcm9iZTpob3Zlcntjb2xvcjp2YXIoLS1jb2xvci10ZXh0LXByaW1hcnksI2U2ZWRmMyl9XG5gXG5cbmludGVyZmFjZSBIZWFkZXJNZW51T3B0aW9ucyB7XG4gIC8qKiBcdTU5MTZcdTkwRThcdTkwMUFcdTc3RTVcdTcyQjZcdTYwMDFcdTUyMzdcdTY1QjBcdUZGMDhcdThCQkVcdTdGNkVcdTk4NzVcdTgwRjZcdTU2Q0FcdTk3MDBcdTg5ODFcdUZGMDlcdTMwMDIgKi9cbiAgb25NZW51VmlzaWJsZUNoYW5nZT86ICh2aXNpYmxlOiBib29sZWFuKSA9PiB2b2lkXG59XG5cbi8qKiBcdTVCOUFcdTRGNEQgU2Vzc2lvbiBsb2cgXHU2MzA5XHU5NEFFXHVGRjA4XHU3QTMzXHU1QjlBXHU5NTFBXHU3MEI5XHVGRjFBY2xhc3MgXHU1NDJCIHNlc3Npb25Mb2cgXHU2MjE2XHU2NTg3XHU2NzJDXHU1MzM5XHU5MTREXHVGRjA5XHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gZmluZExvZ0J1dHRvbigpOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwge1xuICBjb25zdCBhbGwgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEJ1dHRvbkVsZW1lbnQ+KCdidXR0b24nKSlcbiAgcmV0dXJuIChcbiAgICBhbGwuZmluZCgoYikgPT4gL3Nlc3Npb25Mb2cvaS50ZXN0KGIuY2xhc3NOYW1lKSkgPz9cbiAgICBhbGwuZmluZCgoYikgPT4ge1xuICAgICAgY29uc3Qgc3BhbiA9IGIucXVlcnlTZWxlY3Rvcignc3BhbicpXG4gICAgICByZXR1cm4gISFzcGFuICYmIC9zZXNzaW9uXFxzKmxvZ3xcdTRFMEJcdThGN0QuKlx1NjVFNVx1NUZENy9pLnRlc3Qoc3Bhbi50ZXh0Q29udGVudCA/PyAnJylcbiAgICB9KSA/P1xuICAgIG51bGxcbiAgKVxufVxuXG5mdW5jdGlvbiBzdHlsZVRhZygpOiBIVE1MU3R5bGVFbGVtZW50IHtcbiAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHNoci1zdHlsZScpIGFzIEhUTUxTdHlsZUVsZW1lbnQgfCBudWxsXG4gIGlmIChleGlzdGluZykgcmV0dXJuIGV4aXN0aW5nXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZS5pZCA9ICdkc2hyLXN0eWxlJ1xuICBzdHlsZS50ZXh0Q29udGVudCA9IENTU1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKVxuICByZXR1cm4gc3R5bGVcbn1cblxuZnVuY3Rpb24gc3RhdHVzRG90Q2xhc3Moc3RhdHVzOiBSZWdpb25TdGF0dXMpOiAnZ3JlZW4nIHwgJ3llbGxvdycgfCAncmVkJyB8ICdncmF5JyB7XG4gIGNvbnN0IHsgbWFpbiwgYmFja3VwIH0gPSBzdGF0dXNcbiAgaWYgKCFtYWluIHx8ICFiYWNrdXApIHJldHVybiAnZ3JheSdcbiAgaWYgKG1haW4ub2sgJiYgYmFja3VwLm9rKSByZXR1cm4gJ2dyZWVuJ1xuICBpZiAobWFpbi5vayAhPT0gYmFja3VwLm9rKSByZXR1cm4gJ3llbGxvdydcbiAgcmV0dXJuIG1haW4ub2sgPyAnZ3JheScgOiAncmVkJ1xufVxuXG5mdW5jdGlvbiBzdGF0dXNIaW50KHN0YXR1czogUmVnaW9uU3RhdHVzKTogc3RyaW5nIHtcbiAgY29uc3QgeyBtYWluLCBiYWNrdXAgfSA9IHN0YXR1c1xuICBpZiAoIW1haW4gfHwgIWJhY2t1cCkgcmV0dXJuIHpoWydtZW51LnN0YXR1c1Vua25vd24nXVxuICBpZiAobWFpbi5vayAmJiBiYWNrdXAub2spIHJldHVybiB6aFsnbWVudS5zdGF0dXNHcmVlbiddXG4gIGlmICghbWFpbi5vayAmJiBiYWNrdXAub2spIHJldHVybiB6aFsnbWVudS5zdGF0dXNZZWxsb3cnXVxuICBpZiAoIW1haW4ub2sgJiYgIWJhY2t1cC5vaykgcmV0dXJuIHpoWydtZW51LnN0YXR1c1JlZCddXG4gIHJldHVybiB6aFsnbWVudS5zdGF0dXNVbmtub3duJ11cbn1cblxuY29uc3QgSUNPTiA9ICc8c3ZnIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjEuM1wiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxlbGxpcHNlIGN4PVwiOFwiIGN5PVwiNFwiIHJ4PVwiNFwiIHJ5PVwiMS44XCIvPjxwYXRoIGQ9XCJNNCA0djRjMCAxIDEuOCAxLjggNCAxLjhzNC0uOCA0LTEuOFY0XCIvPjxwYXRoIGQ9XCJNNCA4djRjMCAxIDEuOCAxLjggNCAxLjhzNC0uOCA0LTEuOFY4XCIvPjwvc3ZnPidcblxuLyoqXG4gKiBcdTYzMDJcdThGN0RcdTUzRjNcdTRFMEFcdTg5RDJcdTgzRENcdTUzNTVcdUZGMENcdThGRDRcdTU2REUgZGlzcG9zZXJcdTMwMDJcbiAqIFx1NUU0Mlx1N0I0OVx1RkYxQVx1OTFDRFx1NTkwRFx1OEMwM1x1NzUyOFx1NTE0OFx1NkUwNVx1NzQwNlx1NjVFN1x1NUI5RVx1NEY4Qlx1NTE4RFx1OTFDRFx1NUVGQVx1MzAwMlxuICovXG5leHBvcnQgZnVuY3Rpb24gbW91bnRIZWFkZXJNZW51KG9wdGlvbnM6IEhlYWRlck1lbnVPcHRpb25zID0ge30pOiAoKSA9PiB2b2lkIHtcbiAgc3R5bGVUYWcoKVxuICBsZXQgZGlzcG9zZWQgPSBmYWxzZVxuICBsZXQgb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgfCBudWxsID0gbnVsbFxuICBsZXQgbWVudUVsOiBIVE1MRGl2RWxlbWVudCB8IG51bGwgPSBudWxsXG4gIGxldCBlbnRyeUVsOiBIVE1MQnV0dG9uRWxlbWVudCB8IG51bGwgPSBudWxsXG4gIGxldCBsYXRlc3Q6IFJlZ2lvblN0YXR1cyB8IG51bGwgPSBudWxsXG5cbiAgY29uc3QgY2xlYW51cE1lbnUgPSAoKTogdm9pZCA9PiB7XG4gICAgbWVudUVsPy5yZW1vdmUoKVxuICAgIG1lbnVFbCA9IG51bGxcbiAgfVxuXG4gIGNvbnN0IGNsb3NlTWVudSA9ICgpOiB2b2lkID0+IGNsZWFudXBNZW51KClcblxuICBjb25zdCByZW5kZXJNZW51ID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gICAgY2xlYW51cE1lbnUoKVxuICAgIGxldCBzdGF0dXM6IFJlZ2lvblN0YXR1c1xuICAgIHRyeSB7XG4gICAgICBzdGF0dXMgPSBhd2FpdCBmZXRjaFN0YXR1cyhmYWxzZSlcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIFx1NjcwRFx1NTJBMVx1NEUwRFx1NTNFRlx1OEZCRVx1RkYxQVx1ODNEQ1x1NTM1NVx1OTFDQ1x1NzZGNFx1NjNBNVx1NjNEMFx1NzkzQVxuICAgICAgc3RhdHVzID0ge1xuICAgICAgICBtb2RlOiAnYXV0bycsIGFwcGxpZWRSZWdpc3RyeTogbnVsbCwgbWFpblJlZ2lzdHJ5OiAnJywgYmFja3VwUmVnaXN0cnk6ICcnLFxuICAgICAgICBsYXN0RXJyb3I6IHpoWydlcnIuZmV0Y2hGYWlsZWQnXSwgbGFzdFN3aXRjaEF0OiBudWxsLCBtZW51VmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgbWFpbjogeyBvazogZmFsc2UsIG1zOiAwLCBlcnJvcjogemhbJ2Vyci5mZXRjaEZhaWxlZCddIH0sXG4gICAgICAgIGJhY2t1cDogeyBvazogZmFsc2UsIG1zOiAwLCBlcnJvcjogemhbJ2Vyci5mZXRjaEZhaWxlZCddIH0sXG4gICAgICB9XG4gICAgfVxuICAgIGxhdGVzdCA9IHN0YXR1c1xuICAgIGlmICghZW50cnlFbCkgcmV0dXJuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlY3QgPSBlbnRyeUVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICBjb25zdCBkb3QgPSBzdGF0dXNEb3RDbGFzcyhzdGF0dXMpXG4gICAgY29uc3QgaXRlbXMgPSAoXG4gICAgICBbXG4gICAgICAgIHsga2V5OiAnYXV0bycsIGxhYmVsOiB6aFsnbWVudS5hdXRvJ10sIGNtZDogJ2F1dG8nIH0sXG4gICAgICAgIHsga2V5OiAnbWFpbicsIGxhYmVsOiB6aFsnbWVudS5tYWluJ10sIGNtZDogJ21haW4nIH0sXG4gICAgICAgIHsga2V5OiAnYmFja3VwJywgbGFiZWw6IHpoWydtZW51LmJhY2t1cCddLCBjbWQ6ICdiYWNrdXAnIH0sXG4gICAgICBdIGFzIGNvbnN0XG4gICAgKVxuXG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgcm9vdC5jbGFzc05hbWUgPSAnZHNoci1tZW51J1xuICAgIHJvb3Quc3R5bGUubGVmdCA9IGAke01hdGgubWF4KDgsIHJlY3QucmlnaHQgLSAyNDApfXB4YFxuICAgIHJvb3Quc3R5bGUudG9wID0gYCR7cmVjdC5ib3R0b20gKyA2fXB4YFxuICAgIHJvb3Quc2V0QXR0cmlidXRlKCdyb2xlJywgJ21lbnUnKVxuXG4gICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaGVhZC5jbGFzc05hbWUgPSAnZHNoci1tZW51LWhlYWQnXG4gICAgaGVhZC50aXRsZSA9IHN0YXR1c0hpbnQoc3RhdHVzKVxuICAgIGNvbnN0IGhkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBoZG90LmNsYXNzTmFtZSA9IGBkc2hyLWhkb3QgJHtkb3R9YFxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoaGRvdClcbiAgICBoZWFkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHpoWydtZW51LnRpdGxlJ10pKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQoaGVhZClcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICAgIGJ0bi5jbGFzc05hbWUgPSAnZHNoci1pdGVtJ1xuICAgICAgYnRuLnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51aXRlbScpXG4gICAgICBjb25zdCBsZWZ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICBjb25zdCBpc0N1cnJlbnQgPSBzdGF0dXMubW9kZSA9PT0gaXRlbS5jbWRcbiAgICAgIGxlZnQudGV4dENvbnRlbnQgPSBgJHtpdGVtLmxhYmVsfVx1RkYwOCR7aXRlbS5jbWR9XHVGRjA5YFxuICAgICAgaWYgKGlzQ3VycmVudCkge1xuICAgICAgICBjb25zdCBjdXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgY3VyLmNsYXNzTmFtZSA9ICdkc2hyLWN1cidcbiAgICAgICAgY3VyLnRleHRDb250ZW50ID0gYFx1MjcxMyR7emhbJ21lbnUuY3VycmVudCddfWBcbiAgICAgICAgbGVmdC5hcHBlbmRDaGlsZChjdXIpXG4gICAgICB9XG4gICAgICBidG4uYXBwZW5kQ2hpbGQobGVmdClcbiAgICAgIGNvbnN0IG1zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICBtcy5jbGFzc05hbWUgPSAnZHNoci1tcydcbiAgICAgIGNvbnN0IHByb2JlUmVzdWx0ID0gaXRlbS5jbWQgPT09ICdtYWluJyA/IHN0YXR1cy5tYWluIDogaXRlbS5jbWQgPT09ICdiYWNrdXAnID8gc3RhdHVzLmJhY2t1cCA6IG51bGxcbiAgICAgIG1zLnRleHRDb250ZW50ID0gcHJvYmVSZXN1bHQgPyBgJHtwcm9iZVJlc3VsdC5tc31tc2AgOiAnLS0nXG4gICAgICBidG4uYXBwZW5kQ2hpbGQobXMpXG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHZvaWQgcmVxdWVzdE1vZGUoaXRlbS5jbWQpXG4gICAgICAgIHZvaWQgcmVuZGVyTWVudSgpXG4gICAgICB9KVxuICAgICAgcm9vdC5hcHBlbmRDaGlsZChidG4pXG4gICAgfVxuXG4gICAgY29uc3Qgc2VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzZXAuY2xhc3NOYW1lID0gJ2RzaHItc2VwJ1xuICAgIHJvb3QuYXBwZW5kQ2hpbGQoc2VwKVxuXG4gICAgY29uc3QgcHJvYmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIHByb2JlLmNsYXNzTmFtZSA9ICdkc2hyLWl0ZW0gZHNoci1wcm9iZSdcbiAgICBwcm9iZS50ZXh0Q29udGVudCA9IGBcdTIxQkIgJHt6aFsnbWVudS5wcm9iZSddfWBcbiAgICBwcm9iZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIC8vIFx1N0FDQlx1NTM3M1x1NkQ0Qlx1OTAxRlx1RkYxQVx1NUI5RVx1NjVGNlx1NjNBMlx1NkQ0Qlx1NTNDQ1x1NkU5MFx1RkYwOFx1NTNFRlx1ODBGRFx1NjU3MFx1NzlEMlx1RkYwOVx1RkYwQ1x1NUI4Q1x1NjIxMFx1NTQwRVx1NTIzN1x1NjVCMFx1ODNEQ1x1NTM1NVx1MzAwMlxuICAgICAgdm9pZCBmZXRjaFN0YXR1cyh0cnVlKS50aGVuKCgpID0+IHJlbmRlck1lbnUoKSlcbiAgICB9KVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQocHJvYmUpXG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJvb3QpXG4gICAgbWVudUVsID0gcm9vdFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBcdTZFMzJcdTY3RDNcdTU5MzFcdThEMjVcdTUzRUFcdThCQjBcdTY1RTVcdTVGRDdcdUZGMENcdTdFRERcdTRFMERcdTYyOUJcdUZGMDhcdTU5MTZcdTkwRThcdTYzRDJcdTRFRjZcdTRFMERcdTgwRkRcdTYyRDZcdTU3QUUgRFNIXHVGRjA5XHUzMDAyXG4gICAgICBjb25zb2xlLmVycm9yKCdbZHNoLXJlZ2lvbl0gbWVudSByZW5kZXIgZmFpbGVkOicsIGVycm9yKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGJ1aWxkRW50cnkgPSAoKTogSFRNTEJ1dHRvbkVsZW1lbnQgPT4ge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgYnRuLnR5cGUgPSAnYnV0dG9uJ1xuICAgIGJ0bi5jbGFzc05hbWUgPSAnZHNoci1lbnRyeSdcbiAgICBidG4uc2V0QXR0cmlidXRlKCdkYXRhLWRzaC1yZWdpb24tZW50cnknLCAnJylcbiAgICBidG4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgemhbJ21lbnUudGl0bGUnXSlcbiAgICBidG4uaW5uZXJIVE1MID0gSUNPTlxuICAgIGNvbnN0IGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIGRvdC5jbGFzc05hbWUgPSAnZHNoci1kb3QgZ3JheSdcbiAgICBidG4uYXBwZW5kQ2hpbGQoZG90KVxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGlmIChtZW51RWwpIGNsb3NlTWVudSgpXG4gICAgICBlbHNlIHZvaWQgcmVuZGVyTWVudSgpXG4gICAgfSlcbiAgICByZXR1cm4gYnRuXG4gIH1cblxuICAvLyBcdTk2MzJcdTYyOTZcdTk1MDFcdUZGMUFNdXRhdGlvbk9ic2VydmVyIFx1OUFEOFx1OTg5MVx1ODlFNlx1NTNEMVx1NjVGNlx1NTQwOFx1NUU3Nlx1OEJGN1x1NkM0Mlx1RkYwQ1x1OTA3Rlx1NTE0RFx1NUU3Nlx1NTNEMVx1NjI1M1x1NzIwNiBzZXJ2ZXIgXHU2M0EyXHU2RDRCXHUzMDAyXG4gIGxldCBlbnN1cmVMb2NrID0gZmFsc2VcbiAgY29uc3QgZW5zdXJlRW50cnkgPSAoKTogdm9pZCA9PiB7XG4gICAgaWYgKGRpc3Bvc2VkIHx8IGVuc3VyZUxvY2spIHJldHVyblxuICAgIGVuc3VyZUxvY2sgPSB0cnVlXG4gICAgLy8gXHU4M0RDXHU1MzU1XHU2NjNFXHU5NjkwXHU1M0Q3IHNlcnZlciBcdTcyQjZcdTYwMDFcdTYzQTdcdTUyMzZcdUZGMUJcdTY3RTVcdThCRTJcdTU5MzFcdThEMjVcdTY1RjZcdTRGRERcdTVCODhcdTY2M0VcdTc5M0FcdUZGMDhcdTlFRDhcdThCQTRcdTY2M0VcdTc5M0FcdUZGMDlcdTMwMDJcbiAgICB2b2lkIGZldGNoU3RhdHVzKGZhbHNlKVxuICAgICAgLnRoZW4oKHN0YXR1cykgPT4ge1xuICAgICAgICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICAgICAgICBsYXRlc3QgPSBzdGF0dXNcbiAgICAgICAgY29uc3QgdGFyZ2V0VmlzaWJsZSA9IHN0YXR1cy5tZW51VmlzaWJsZSAhPT0gZmFsc2VcbiAgICAgICAgY29uc3QgYW5jaG9yID0gZmluZExvZ0J1dHRvbigpXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGFuY2hvcj8ucGFyZW50RWxlbWVudFxuICAgICAgICBpZiAoIWFuY2hvciB8fCAhY29udGFpbmVyKSByZXR1cm5cbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oRU5UUllfU0VMRUNUT1IpXG4gICAgICAgIGlmICghdGFyZ2V0VmlzaWJsZSkge1xuICAgICAgICAgIGV4aXN0aW5nPy5yZW1vdmUoKVxuICAgICAgICAgIGNsZWFudXBNZW51KClcbiAgICAgICAgICBvcHRpb25zLm9uTWVudVZpc2libGVDaGFuZ2U/LihmYWxzZSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXhpc3RpbmcgJiYgZXhpc3RpbmcucGFyZW50RWxlbWVudCA9PT0gY29udGFpbmVyKSB7XG4gICAgICAgICAgZW50cnlFbCA9IGV4aXN0aW5nXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYnRuID0gYnVpbGRFbnRyeSgpXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdkc2hyLWVudHJ5JylcbiAgICAgICAgLy8gXHU3MkI2XHU2MDAxXHU3MDZGXHU1MjFEXHU1OUNCXHU4MjcyXG4gICAgICAgIGNvbnN0IGRvdCA9IGJ0bi5xdWVyeVNlbGVjdG9yKCcuZHNoci1kb3QnKVxuICAgICAgICBpZiAoZG90KSBkb3QuY2xhc3NMaXN0LmFkZChzdGF0dXNEb3RDbGFzcyhzdGF0dXMpKVxuICAgICAgICBjb250YWluZXIuaW5zZXJ0QmVmb3JlKGJ0biwgYW5jaG9yKVxuICAgICAgICBlbnRyeUVsID0gYnRuXG4gICAgICAgIG9wdGlvbnMub25NZW51VmlzaWJsZUNoYW5nZT8uKHRydWUpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgLy8gXHU3MkI2XHU2MDAxXHU4M0I3XHU1M0Q2XHU1OTMxXHU4RDI1XHVGRjFBXHU0RUNEXHU2NjNFXHU3OTNBXHU1MTY1XHU1M0UzXHVGRjA4XHU0RkREXHU1Qjg4XHU3QjU2XHU3NTY1XHVGRjA5XHVGRjBDXHU3MDcwXHU3MDZGXHUzMDAyXG4gICAgICAgIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGFuY2hvciA9IGZpbmRMb2dCdXR0b24oKVxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBhbmNob3I/LnBhcmVudEVsZW1lbnRcbiAgICAgICAgaWYgKCFhbmNob3IgfHwgIWNvbnRhaW5lcikgcmV0dXJuXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KEVOVFJZX1NFTEVDVE9SKVxuICAgICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgICBlbnRyeUVsID0gZXhpc3RpbmdcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbnRyeUVsID0gYnVpbGRFbnRyeSgpXG4gICAgICAgIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoZW50cnlFbCwgYW5jaG9yKVxuICAgICAgfSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgZW5zdXJlTG9jayA9IGZhbHNlXG4gICAgICB9KVxuICB9XG5cbiAgLy8gXHU4MUVBXHU2MTA4XHVGRjFBXHU3NkQxXHU1NDJDIERPTVx1RkYwQ1x1NTE2NVx1NTNFM1x1ODhBQlx1NzlGQlx1OTY2NFx1NTQwRVx1OTFDRFx1NjNEMlx1MzAwMlxuICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBmaW5kTG9nQnV0dG9uKCk/LnBhcmVudEVsZW1lbnRcbiAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuXG4gICAgY29uc3Qgc3RpbGxUaGVyZSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKEVOVFJZX1NFTEVDVE9SKVxuICAgIGlmICghc3RpbGxUaGVyZSkgZW5zdXJlRW50cnkoKVxuICB9KVxuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH0pXG5cbiAgLy8gXHU3MEI5XHU1MUZCXHU4M0RDXHU1MzU1XHU1OTE2XHU5MEU4XHU1MTczXHU5NUVEXG4gIGNvbnN0IG9uRG9jQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICBpZiAobWVudUVsICYmICFtZW51RWwuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpICYmICFlbnRyeUVsPy5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHtcbiAgICAgIGNsb3NlTWVudSgpXG4gICAgfVxuICB9XG4gIGNvbnN0IG9uS2V5ID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIGNsb3NlTWVudSgpXG4gIH1cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkRvY0NsaWNrLCB0cnVlKVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXksIHRydWUpXG5cbiAgLy8gXHU4QkJFXHU3RjZFXHU5ODc1XHU4MEY2XHU1NkNBXHU1MjA3XHU2MzYyXHU1NDBFXHVGRjBDXHU5MUNEXHU2NUIwXHU4QkM0XHU0RjMwXHU4M0RDXHU1MzU1XHU2NjNFXHU5NjkwXHUzMDAyXG4gIGNvbnN0IG9uVmlzaWJpbGl0eUV2ZW50ID0gKCk6IHZvaWQgPT4gZW5zdXJlRW50cnkoKVxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZHNocjp2aXNpYmlsaXR5LWNoYW5nZWQnLCBvblZpc2liaWxpdHlFdmVudClcblxuICAvLyBcdTk5OTZcdTZCMjFcdTYzMDJcdThGN0RcdUZGMDhcdTUzRUZcdTgwRkQgc2hlbGwgXHU4RkQ4XHU2Q0ExXHU2RTMyXHU2N0QzXHU1QjhDXHVGRjBDXHU4RjZFXHU4QkUyXHU1MUUwXHU2QjIxXHVGRjA5XG4gIGxldCBhdHRlbXB0cyA9IDBcbiAgY29uc3QgdHJ5TW91bnQgPSAoKTogdm9pZCA9PiB7XG4gICAgZW5zdXJlRW50cnkoKVxuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihFTlRSWV9TRUxFQ1RPUikgJiYgYXR0ZW1wdHMgPCAyMCkge1xuICAgICAgYXR0ZW1wdHMgKz0gMVxuICAgICAgc2V0VGltZW91dCh0cnlNb3VudCwgNTAwKVxuICAgIH1cbiAgfVxuICB0cnlNb3VudCgpXG5cbiAgcmV0dXJuICgpID0+IHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgICBvYnNlcnZlcj8uZGlzY29ubmVjdCgpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkRvY0NsaWNrLCB0cnVlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleSwgdHJ1ZSlcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHNocjp2aXNpYmlsaXR5LWNoYW5nZWQnLCBvblZpc2liaWxpdHlFdmVudClcbiAgICBlbnRyeUVsPy5yZW1vdmUoKVxuICAgIGNsZWFudXBNZW51KClcbiAgfVxufVxuIiwgIi8qKlxuICogc2V0dGluZ3MtY2FyZCBcdTIwMTRcdTIwMTQgXHU4QkJFXHU3RjZFXHU5ODc1XHUzMDBDZHNoLXJlZ2lvbiBcdTZFOTBcdTdCQTFcdTc0MDZcdTMwMERcdTUzNjFcdTcyNDdcdTMwMDJcbiAqIFx1NjNEMFx1NEY5Qlx1NTNGM1x1NEUwQVx1ODlEMlx1ODNEQ1x1NTM1NVx1NzY4NFx1NjYzRVx1NzkzQS9cdTk2OTBcdTg1Q0ZcdTgwRjZcdTU2Q0FcdTVGMDBcdTUxNzNcdUZGMENcdTcyQjZcdTYwMDFcdTVCNTggc2VydmVyXHVGRjA4cmVnaW9uLmpzb25cdUZGMDlcdTMwMDJcbiAqIFJlYWN0IFx1N0VDNFx1NEVGNlx1RkYwOGhvc3QgXHU2M0QwXHU0RjlCIHJlYWN0XHVGRjBDYnVuZGxlIFx1NTkxNlx1N0Y2RVx1RkYwOVx1MzAwMlxuICovXG5cbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgYXMgaCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdHlwZSBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGZldGNoU3RhdHVzLCByZXF1ZXN0TWVudVZpc2libGUgfSBmcm9tICcuL2hvc3QtYXBpLmpzJ1xuaW1wb3J0IHsgemggfSBmcm9tICcuL2xvY2FsZXMuanMnXG5cbi8qKiBcdTkwMUFcdTc3RTUgaGVhZGVyIFx1ODNEQ1x1NTM1NVx1OTFDRFx1NjVCMFx1OEJDNFx1NEYzMFx1NjYzRVx1OTY5MFx1RkYwOHdpbmRvdyBcdTRFOEJcdTRFRjZcdUZGMENcdTg5RTNcdTgwMjYgUmVhY3QgXHU0RTBFIERPTSBcdTZDRThcdTUxNjVcdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaFZpc2liaWxpdHlDaGFuZ2VkKCk6IHZvaWQge1xuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2RzaHI6dmlzaWJpbGl0eS1jaGFuZ2VkJykpXG59XG5cbmludGVyZmFjZSBDYXJkUHJvcHMge1xuICB0PzogKGtleTogc3RyaW5nKSA9PiBzdHJpbmdcbn1cblxuZnVuY3Rpb24gQ2FyZFNoZWxsKHByb3BzOiB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xuICBjaGlsZHJlbjogUmVhY3ROb2RlXG59KTogUmVhY3ROb2RlIHtcbiAgcmV0dXJuIGgoJ2RpdicsIHsgc3R5bGU6IHsgcGFkZGluZzogJzEycHggMCcgfSB9LFxuICAgIGgoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogMTQsIG1hcmdpbkJvdHRvbTogNCB9IH0sIHByb3BzLnRpdGxlKSxcbiAgICBoKCdkaXYnLCB7IHN0eWxlOiB7IGNvbG9yOiAndmFyKC0tY29sb3ItdGV4dC1zZWNvbmRhcnksIzhiOTQ5ZSknLCBmb250U2l6ZTogMTIsIG1hcmdpbkJvdHRvbTogMTAgfSB9LCBwcm9wcy5kZXNjcmlwdGlvbiksXG4gICAgcHJvcHMuY2hpbGRyZW4sXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlZ2lvblNldHRpbmdzQ2FyZChfcHJvcHM6IENhcmRQcm9wcyk6IFJlYWN0Tm9kZSB7XG4gIGNvbnN0IFt2aXNpYmxlLCBzZXRWaXNpYmxlXSA9IHVzZVN0YXRlPGJvb2xlYW4gfCBudWxsPihudWxsKVxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2Vyciwgc2V0RXJyXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgYWxpdmUgPSB0cnVlXG4gICAgZmV0Y2hTdGF0dXMoKVxuICAgICAgLnRoZW4oKHMpID0+IHtcbiAgICAgICAgaWYgKGFsaXZlKSBzZXRWaXNpYmxlKHMubWVudVZpc2libGUgIT09IGZhbHNlKVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGlmIChhbGl2ZSkgc2V0VmlzaWJsZSh0cnVlKVxuICAgICAgfSlcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWxpdmUgPSBmYWxzZVxuICAgIH1cbiAgfSwgW10pXG5cbiAgY29uc3QgdG9nZ2xlID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh2aXNpYmxlID09PSBudWxsIHx8IGJ1c3kpIHJldHVyblxuICAgIGNvbnN0IG5leHQgPSAhdmlzaWJsZVxuICAgIHNldEJ1c3kodHJ1ZSlcbiAgICBzZXRFcnIobnVsbClcbiAgICByZXF1ZXN0TWVudVZpc2libGUobmV4dClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgc2V0VmlzaWJsZShuZXh0KVxuICAgICAgICBkaXNwYXRjaFZpc2liaWxpdHlDaGFuZ2VkKClcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGU6IHVua25vd24pID0+IHNldEVycihlIGluc3RhbmNlb2YgRXJyb3IgPyBlLm1lc3NhZ2UgOiBTdHJpbmcoZSkpKVxuICAgICAgLmZpbmFsbHkoKCkgPT4gc2V0QnVzeShmYWxzZSkpXG4gIH1cblxuICBjb25zdCBjYXBzdWxlID0gaChcbiAgICAnYnV0dG9uJyxcbiAgICB7XG4gICAgICBvbkNsaWNrOiB0b2dnbGUsXG4gICAgICBkaXNhYmxlZDogdmlzaWJsZSA9PT0gbnVsbCB8fCBidXN5LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1mbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogNixcbiAgICAgICAgcGFkZGluZzogJzRweCAxNHB4JywgYm9yZGVyUmFkaXVzOiA5OTksIGZvbnRTaXplOiAxMywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1jb2xvci1ib3JkZXItZGVmYXVsdCxyZ2JhKDI0MCwyNDYsMjUyLC4yKSknLFxuICAgICAgICBiYWNrZ3JvdW5kOiB2aXNpYmxlID8gJ3JnYmEoNjMsMTg1LDgwLC4xNSknIDogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgY29sb3I6IHZpc2libGUgPyAnIzNmYjk1MCcgOiAndmFyKC0tY29sb3ItdGV4dC1zZWNvbmRhcnksIzhiOTQ5ZSknLFxuICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICB9LFxuICAgICAgJ2FyaWEtcHJlc3NlZCc6IFN0cmluZyh2aXNpYmxlID09PSB0cnVlKSxcbiAgICB9LFxuICAgIGgoJ3NwYW4nLCB7XG4gICAgICBzdHlsZTogeyB3aWR0aDogOCwgaGVpZ2h0OiA4LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiAnY3VycmVudENvbG9yJywgZGlzcGxheTogJ2lubGluZS1ibG9jaycgfSxcbiAgICB9KSxcbiAgICB2aXNpYmxlID8gemhbJ2NhcmQuc2hvdyddIDogemhbJ2NhcmQuaGlkZSddLFxuICApXG5cbiAgcmV0dXJuIENhcmRTaGVsbCh7XG4gICAgdGl0bGU6IHpoWydjYXJkLnRpdGxlJ10sXG4gICAgZGVzY3JpcHRpb246IHpoWydjYXJkLmRlc2NyaXB0aW9uJ10sXG4gICAgY2hpbGRyZW46IGgoJ2RpdicsIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMiwgZmxleFdyYXA6ICd3cmFwJyB9IH0sXG4gICAgICBoKCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRTaXplOiAxMyB9IH0sXG4gICAgICAgIHpoWydjYXJkLm1lbnVWaXNpYmxlJ10sXG4gICAgICAgIGgoJ2RpdicsIHsgc3R5bGU6IHsgY29sb3I6ICd2YXIoLS1jb2xvci10ZXh0LXRlcnRpYXJ5LCM2ZTc2ODEpJywgZm9udFNpemU6IDEyIH0gfSwgemhbJ2NhcmQubWVudVZpc2libGVEZXNjJ10pLFxuICAgICAgKSxcbiAgICAgIGNhcHN1bGUsXG4gICAgICBlcnIgPyBoKCdzcGFuJywgeyBzdHlsZTogeyBjb2xvcjogJyNmODUxNDknLCBmb250U2l6ZTogMTIgfSB9LCBlcnIpIDogbnVsbCxcbiAgICApLFxuICB9KVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVdBLElBQUFBLGdCQUFtQzs7O0FDbUJuQyxJQUFNLE9BQU8sR0FBRyxPQUFPLFNBQVMsTUFBTTtBQUV0QyxlQUFlLFlBQWUsTUFBYyxNQUFnQztBQUMxRSxRQUFNLE1BQU0sTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksSUFBSTtBQUFBLElBQ3hDLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0FBQUEsSUFDOUMsR0FBRztBQUFBLEVBQ0wsQ0FBQztBQUNELE1BQUksQ0FBQyxJQUFJLElBQUk7QUFDWCxVQUFNLElBQUksTUFBTSxRQUFRLElBQUksTUFBTSxFQUFFO0FBQUEsRUFDdEM7QUFDQSxTQUFRLE1BQU0sSUFBSSxLQUFLO0FBQ3pCO0FBR08sU0FBUyxZQUFZLFFBQVEsT0FBOEI7QUFDaEUsU0FBTyxZQUEwQixVQUFVLFFBQVEsYUFBYSxFQUFFLEVBQUU7QUFDdEU7QUFHTyxTQUFTLFlBQVksTUFBc0Q7QUFDaEYsU0FBTyxZQUF1QixRQUFRO0FBQUEsSUFDcEMsUUFBUTtBQUFBLElBQ1IsTUFBTSxLQUFLLFVBQVUsRUFBRSxLQUFLLENBQUM7QUFBQSxFQUMvQixDQUFDO0FBQ0g7QUFHTyxTQUFTLG1CQUFtQixTQUE4RDtBQUMvRixTQUFPLFlBQVksU0FBUztBQUFBLElBQzFCLFFBQVE7QUFBQSxJQUNSLE1BQU0sS0FBSyxVQUFVLEVBQUUsUUFBUSxDQUFDO0FBQUEsRUFDbEMsQ0FBQztBQUNIOzs7QUN0Q08sSUFBTSxLQUFnQztBQUFBLEVBQzNDLGNBQWM7QUFBQSxFQUNkLG9CQUFvQjtBQUFBLEVBQ3BCLHFCQUFxQjtB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ekcsQ0FBQztBQUFBLElBQ0QsVUFBVSxHQUFHLFdBQVcsSUFBSSxHQUFHLFdBQVc7QUFBQSxFQUM1QztBQUVBLFNBQU8sVUFBVTtBQUFBLElBQ2YsT0FBTyxHQUFHLFlBQVk7QUFBQSxJQUN0QixhQUFhLEdBQUcsa0JBQWtCO0FBQUEsSUFDbEMsY0FBVSxhQUFBQTtBQUFBLE1BQUU7QUFBQSxNQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsUUFBUSxZQUFZLFVBQVUsS0FBSyxJQUFJLFVBQVUsT0FBTyxFQUFFO0FBQUEsVUFDL0YsYUFBQUE7QUFBQSxRQUFFO0FBQUEsUUFBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEdBQUcsRUFBRTtBQUFBLFFBQ2pDLEdBQUcsa0JBQWtCO0FBQUEsWUFDckIsYUFBQUEsZUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sc0NBQXNDLFVBQVUsR0FBRyxFQUFFLEdBQUcsR0FBRyxzQkFBc0IsQ0FBQztBQUFBLE1BQy9HO0FBQUEsTUFDQTtBQUFBLE1BQ0EsVUFBTSxhQUFBQSxlQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxXQUFXLFVBQVUsR0FBRyxFQUFFLEdBQUcsR0FBRyxJQUFJO0FBQUEsSUFDeEU7QUFBQSxFQUNGLENBQUM7QUFDSDs7O0FKbEZPLElBQU0sT0FBTztBQUdiLElBQU0sU0FBUyxDQUFDLFNBQVMsZUFBZTtBQUcvQyxJQUFJLFVBQVU7QUFXUCxTQUFTLE1BQU0sS0FBc0I7QUFDMUMsTUFBSSxRQUFTO0FBQ2IsWUFBVTtBQUdWLFNBQU8saUJBQWlCLDJCQUEyQixNQUFNO0FBQUEsRUFHekQsQ0FBQztBQUVELE1BQUk7QUFDRixvQkFBZ0I7QUFBQSxNQUNkLHFCQUFxQixNQUFNLDBCQUEwQjtBQUFBLElBQ3ZELENBQUM7QUFBQSxFQUNILFNBQVMsT0FBTztBQUNkLFlBQVEsS0FBSywwQ0FBMEMsS0FBSztBQUFBLEVBQzlEO0FBSUEsTUFBSSxJQUFJLE9BQU8sVUFBVSxJQUFJLE1BQU0sVUFBVTtBQUMzQyxRQUFJO0FBQ0YsVUFBSSxNQUFNO0FBQUEsUUFBTztBQUFBLFFBQXdCLE1BQ3ZDLElBQUksTUFBTTtBQUFBLFVBQ1I7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLEtBQUs7QUFBQSxZQUNMLFFBQVE7QUFBQSxZQUNSLFFBQVEsT0FBTyxDQUFDO0FBQUEsVUFDbEI7QUFBQSxVQUNBLFVBQU0sY0FBQUMsZUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBQUEsSUFDRixTQUFTLE9BQU87QUFDZCxjQUFRLEtBQUssK0NBQStDLEtBQUs7QUFBQSxJQUNuRTtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImgiLCAiaCJdCn0K

return module.exports; } });