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
/* \u56FA\u5B9A\u5B9A\u4F4D\u7684\u627F\u8F7D\u5BB9\u5668\uFF1A\u53EA\u8D1F\u8D23\u5750\u6807\uFF0C\u89C6\u89C9\u4E0A\u4E0D\u7559\u4EFB\u4F55\u5916\u6846\uFF0C
   \u770B\u8D77\u6765\u5C31\u662F\u5DE5\u5177\u680F\u4E0A\u7684\u4E00\u4E2A\u666E\u901A\u56FE\u6807\u6309\u94AE\uFF08\u4F4D\u7F6E\u7531 placeNearAnchor \u8BA1\u7B97\uFF09\u3002 */
.dshr-fallback-host{position:fixed;z-index:2147483000;display:flex;align-items:center;line-height:0}
`;
function fallbackHost() {
  let host = document.getElementById("dshr-fallback-host");
  if (host) return host;
  host = document.createElement("div");
  host.id = "dshr-fallback-host";
  host.className = "dshr-fallback-host";
  document.body.appendChild(host);
  return host;
}
function findAnchorButton() {
  const btns = Array.from(document.querySelectorAll("button[aria-label]"));
  const byAria = (re) => btns.find((b) => re.test(b.getAttribute("aria-label") ?? "")) ?? null;
  return byAria(/文件资源管理器|资源管理器|File Explorer/i) ?? byAria(/右侧边栏|Right sidebar/i) ?? byAria(/更多操作|More actions/i) ?? null;
}
function applyDefaultSpot(host) {
  host.style.top = "56px";
  host.style.left = "auto";
  host.style.right = "16px";
  host.style.bottom = "auto";
}
function placeNearAnchor(host, btn) {
  if (!btn || !btn.isConnected) {
    applyDefaultSpot(host);
    return false;
  }
  const r = btn.getBoundingClientRect();
  if (r.width === 0 || r.height === 0) {
    applyDefaultSpot(host);
    return false;
  }
  host.style.top = `${Math.round(r.top + (r.height - 28) / 2)}px`;
  host.style.left = `${Math.round(r.left - 36)}px`;
  host.style.right = "auto";
  host.style.bottom = "auto";
  return true;
}
function resolveMount() {
  return { host: fallbackHost(), anchor: findAnchorButton() };
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
        placeNearAnchor(mount.host, mount.anchor);
        entryEl = existing;
        return;
      }
      if (existing) existing.remove();
      const btn = buildEntry();
      btn.classList.add("dshr-entry");
      const dot = btn.querySelector(".dshr-dot");
      if (dot) dot.classList.add(statusDotClass(status));
      mount.host.appendChild(btn);
      placeNearAnchor(mount.host, mount.anchor);
      entryEl = btn;
      options.onMenuVisibleChange?.(true);
    }).catch(() => {
      if (disposed) return;
      const mount = resolveMount();
      const existing = document.querySelector(ENTRY_SELECTOR);
      if (existing) {
        entryEl = existing;
        placeNearAnchor(mount.host, mount.anchor);
        return;
      }
      entryEl = buildEntry();
      mount.host.appendChild(entryEl);
      placeNearAnchor(mount.host, mount.anchor);
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
    if (now - relocateAt < 200) return;
    const anchor = findAnchorButton();
    if (anchor && existing.parentElement) {
      relocateAt = now;
      placeNearAnchor(existing.parentElement, anchor);
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
  const onResize = () => ensureEntry();
  window.addEventListener("resize", onResize);
  let attempts = 0;
  const tryMount = () => {
    ensureEntry();
    const existing = document.querySelector(ENTRY_SELECTOR);
    const anchor = findAnchorButton();
    let placed = false;
    if (existing?.parentElement && anchor) {
      placed = placeNearAnchor(existing.parentElement, anchor);
    }
    if (!placed && attempts < 60) {
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
    window.removeEventListener("resize", onResize);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NsaWVudC9pbmRleC50cyIsICJzcmMvY2xpZW50L2hvc3QtYXBpLnRzIiwgInNyYy9jbGllbnQvbG9jYWxlcy50cyIsICJzcmMvY2xpZW50L2hlYWRlci1tZW51LnRzIiwgInNyYy9jbGllbnQvc2V0dGluZ3MtY2FyZC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogZHNoLXJlZ2lvbiBjbGllbnQgYnVuZGxlIFx1NTE2NVx1NTNFM1x1MzAwMlxuICpcbiAqIFx1NjMwMlx1OEY3RFx1NEUyNFx1NTkwNCBVSVx1RkYxQVxuICogIDEuIFx1NTNGM1x1NEUwQVx1ODlEMlx1NkU5MFx1N0JBMVx1NzQwNlx1ODNEQ1x1NTM1NVx1RkYwOFx1N0VBRiBET00gXHU2Q0U4XHU1MTY1XHVGRjBDXHU4OUMxIGhlYWRlci1tZW51LnRzXHVGRjA5XG4gKiAgMi4gXHU4QkJFXHU3RjZFXHU5ODc1XHUzMDBDZHNoLXJlZ2lvbiBcdTZFOTBcdTdCQTFcdTc0MDZcdTMwMERcdTUzNjFcdTcyNDdcdUZGMDhSZWFjdFx1RkYwQ1x1NUI5OFx1NjVCOSBzZXR0aW5ncy5wbHVnaW4uaXRlbSBcdTY5RkRcdTRGNERcdUZGMENcbiAqICAgICBcdTVENENcdTU5NTcgaW5qZWN0IHNldHRpbmdzU2NvcGVcdTIwMTRcdTIwMTRcdTY1RTcgaG9zdCBcdTY1RTBcdTZCNjRcdTY3MERcdTUyQTFcdTY1RjZcdTUzNjFcdTcyNDdcdTk3NTlcdTlFRDhcdTRFMERcdTUxRkFcdTczQjBcdUZGMDlcbiAqXG4gKiBcdTk0QzFcdTVGOEJcdUZGMUFcdTRFRkJcdTRGNTVcdTYzMDJcdThGN0RcdTU5MzFcdThEMjVcdTUzRUEgY29uc29sZS53YXJuXHVGRjBDXHU3RUREXHU0RTBEIHRocm93XHVGRjA4XHU1OTE2XHU5MEU4XHU2M0QyXHU0RUY2XHU0RTBEXHU4MEZEXHU2MkQ2XHU1N0FFIERTSCBcdTU0MkZcdTUyQThcdUZGMDlcdTMwMDJcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IGFzIGggfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IG1vdW50SGVhZGVyTWVudSB9IGZyb20gJy4vaGVhZGVyLW1lbnUuanMnXG5pbXBvcnQgeyBSZWdpb25TZXR0aW5nc0NhcmQsIGRpc3BhdGNoVmlzaWJpbGl0eUNoYW5nZWQgfSBmcm9tICcuL3NldHRpbmdzLWNhcmQuanMnXG5cbmV4cG9ydCBjb25zdCBuYW1lID0gJ2RzaC1yZWdpb24nXG5cbi8qKiBcdTU4RjBcdTY2MEVcdTk3MDBcdTg5ODFcdTc2ODQgY2xpZW50IFx1NjcwRFx1NTJBMVx1RkYxQXNsb3RzXHVGRjA4VUkgXHU2Q0U4XHU1MTY1XHU2ODM4XHU1RkMzXHVGRjA5XHUzMDAyXG4gKiAgXHU2Q0U4XHU2MTBGXHVGRjFBc2V0dGluZ3NTY29wZSBcdTRFMERcdTRGNUNcdTRFM0FcdTk4NzZcdTVDNDJcdTc4NkNcdTRGOURcdThENTZcdTIwMTRcdTIwMTRcdTVGNTNcdTUyNEQgZHNoIGhvc3RcdUZGMDgwLjIuMS1yYy4yXHVGRjA5XHU0RTBEXHU2M0QwXHU0RjlCXHU4QkU1XHU2NzBEXHU1MkExXHVGRjBDXG4gKiAgXHU1MTk5XHU1NzI4XHU5ODc2XHU1QzQyXHU0RjFBXHU4QkE5XHU2NTc0XHU0RTJBIGNsaWVudCBcdTY3NjFcdTc2RUVcdTZDMzhcdTRFNDUgcGVuZGluZ1x1RkYwQ1x1OEZEQlx1ODAwQ1x1NjJENlx1NTdBRSB3ZWIgYm9vdFx1RkYwOFwiMSBlbnRyeSBkaWQgbm90IGFjdGl2YXRlXCJcdUZGMDlcdTMwMDJcbiAqICBcdThCQkVcdTdGNkVcdTk4NzVcdTUzNjFcdTcyNDdcdTY1MzlcdTc1MzFcdTRFMEJcdTY1QjkgY3R4LmluamVjdChbJ3NldHRpbmdzU2NvcGUnXSwgLi4uKSBcdThGNkZcdTRGOURcdThENTZcdTVDMURcdThCRDVcdUZGMENcdTdGM0FcdTU5MzFcdTY1RjZcdTk3NTlcdTlFRDhcdThERjNcdThGQzdcdTMwMDIgKi9cbmV4cG9ydCBjb25zdCBpbmplY3QgPSBbJ3Nsb3RzJ11cblxuLyoqIFx1OTYzMlx1OTFDRFx1NTkwRFx1RkYxQVx1NTQwQ1x1NEUwMFx1OTg3NVx1OTc2Mlx1NzUxRlx1NTQ3RFx1NTQ2OFx1NjcxRlx1NTE4NVx1NTNFQVx1NUU5NFx1NzUyOFx1NEUwMFx1NkIyMVx1MzAwMiAqL1xubGV0IGFwcGxpZWQgPSBmYWxzZVxuXG5pbnRlcmZhY2UgQ2xpZW50Q3R4IHtcbiAgaW5qZWN0PyhkZXBzOiBzdHJpbmdbXSwgY2I6IChzY29wZWQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkKTogdm9pZFxuICBzbG90cz86IHtcbiAgICBpbmplY3Q/KHNsb3Q6IHN0cmluZywgcmVnaXN0ZXI6ICgpID0+IHVua25vd24pOiB2b2lkXG4gICAgcmVnaXN0ZXI/KG1ldGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBjb21wb25lbnQ6ICgpID0+IHVua25vd24pOiB1bmtub3duXG4gIH1cbiAgZWZmZWN0PyhmbjogKCkgPT4gdW5rbm93biwgbGFiZWw6IHN0cmluZyk6IHVua25vd25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KGN0eDogQ2xpZW50Q3R4KTogdm9pZCB7XG4gIGlmIChhcHBsaWVkKSByZXR1cm5cbiAgYXBwbGllZCA9IHRydWVcblxuICAvLyBcdTgzRENcdTUzNTVcdTY2M0VcdTk2OTBcdTc1MzEgc2VydmVyIFx1NzJCNlx1NjAwMVx1OUE3MVx1NTJBOFx1RkYxQlx1OEJCRVx1N0Y2RVx1OTg3NVx1ODBGNlx1NTZDQVx1NTIwN1x1NjM2Mlx1NTQwRVx1N0VDRiB3aW5kb3cgXHU0RThCXHU0RUY2XHU5MDFBXHU3N0U1XHU5MUNEXHU4QkM0XHU0RjMwXHUzMDAyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkc2hyOnZpc2liaWxpdHktY2hhbmdlZCcsICgpID0+IHtcbiAgICAvLyBoZWFkZXItbWVudSBcdTUxODVcdTkwRThcdTVERjJcdTc2RDFcdTU0MkNcdTU0MENcdTU0MERcdTRFOEJcdTRFRjZcdTUwNUEgZW5zdXJlRW50cnlcdUZGMUJcdTZCNjRcdTU5MDRcdTRFQzVcdTUxNUNcdTVFOTVcdTg5RTZcdTUzRDFcdTRFMDBcdTZCMjFcdTMwMDJcbiAgICB2b2lkIDBcbiAgfSlcblxuICB0cnkge1xuICAgIG1vdW50SGVhZGVyTWVudSh7XG4gICAgICBvbk1lbnVWaXNpYmxlQ2hhbmdlOiAoKSA9PiBkaXNwYXRjaFZpc2liaWxpdHlDaGFuZ2VkKCksXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLndhcm4oJ1tkc2gtcmVnaW9uXSBoZWFkZXIgbWVudSBtb3VudCBmYWlsZWQ6JywgZXJyb3IpXG4gIH1cblxuICAvLyBcdThCQkVcdTdGNkVcdTk4NzVcdTUzNjFcdTcyNDdcdUZGMUFcdTc1MjggY3R4LnNsb3RzXHVGRjA4aW5qZWN0IFx1NThGMFx1NjYwRVx1NTQwRVx1NTNFRlx1NzUyOFx1RkYwOVx1NkNFOFx1NTE4Q1x1NTIzMFx1NUI5OFx1NjVCOSBzZXR0aW5ncy5wbHVnaW4uaXRlbSBcdTY5RkRcdTRGNERcdTMwMDJcbiAgLy8gXHU2Q0U4XHVGRjFBXHU1RjUzXHU1MjREIERTSCBcdTcyNDhcdTY3MkNcdTc2ODRcdThCQkVcdTdGNkUgVUkgXHU2NzJBXHU2RTMyXHU2N0QzXHU4QkU1XHU2OUZEXHU0RjREXHVGRjBDXHU1MzYxXHU3MjQ3XHU2NjgyXHU0RTBEXHU1M0VGXHU4OUMxXHVGRjFCXHU0RUUzXHU3ODAxXHU0RkREXHU3NTU5XHVGRjBDXHU2OUZEXHU0RjREXHU1MTdDXHU1QkI5XHU1NDBFXHU4MUVBXHU1MkE4XHU1MUZBXHU3M0IwXHUzMDAyXG4gIGlmIChjdHguc2xvdHM/LmluamVjdCAmJiBjdHguc2xvdHMucmVnaXN0ZXIpIHtcbiAgICB0cnkge1xuICAgICAgY3R4LnNsb3RzLmluamVjdCgnc2V0dGluZ3MucGx1Z2luLml0ZW0nLCAoKSA9PlxuICAgICAgICBjdHguc2xvdHMucmVnaXN0ZXIhKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdzZXR0aW5ncy5wbHVnaW4uaXRlbScsXG4gICAgICAgICAgICBrZXk6ICdyZWdpb24nLFxuICAgICAgICAgICAgbG9jYWxlOiAnZHNoLXJlZ2lvbicsXG4gICAgICAgICAgICBpbmplY3Q6ICgpID0+ICh7fSksXG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiBoKFJlZ2lvblNldHRpbmdzQ2FyZCwge30pLFxuICAgICAgICApLFxuICAgICAgKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1tkc2gtcmVnaW9uXSBzZXR0aW5ncyBjYXJkIHJlZ2lzdGVyIGZhaWxlZDonLCBlcnJvcilcbiAgICB9XG4gIH1cbn1cbiIsICIvKipcbiAqIGhvc3QtYXBpIFx1MjAxNFx1MjAxNCBjbGllbnQgXHU0RTBFIGhvc3QgXHU3QUVGIFJlZ2lvblNlcnZpY2UgXHU3Njg0IEhUVFAgXHU5MDFBXHU0RkUxXHUzMDAyXG4gKiBcdThENzBcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcdUZGMDhcdTU0MENcdTZFOTBcdUZGMDlcdUZGMENcdTc1MzEgRFNIIHdlYiBzZXJ2ZXIgXHU4RjZDXHU1M0QxXHU1MjMwXHU2M0QyXHU0RUY2XHU4REVGXHU3NTMxXHUzMDAyXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBQcm9iZVJlc3VsdCB7XG4gIG9rOiBib29sZWFuXG4gIG1zOiBudW1iZXJcbiAgZXJyb3I/OiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWdpb25TdGF0dXMge1xuICBtb2RlOiAnYXV0bycgfCAnbWFpbicgfCAnYmFja3VwJ1xuICBhcHBsaWVkUmVnaXN0cnk6IHN0cmluZyB8IG51bGxcbiAgbWFpblJlZ2lzdHJ5OiBzdHJpbmdcbiAgYmFja3VwUmVnaXN0cnk6IHN0cmluZ1xuICBsYXN0RXJyb3I6IHN0cmluZyB8IG51bGxcbiAgbGFzdFN3aXRjaEF0OiBzdHJpbmcgfCBudWxsXG4gIG1lbnVWaXNpYmxlOiBib29sZWFuXG4gIG1haW46IFByb2JlUmVzdWx0IHwgbnVsbFxuICBiYWNrdXA6IFByb2JlUmVzdWx0IHwgbnVsbFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVzZVJlc3VsdCB7XG4gIG9rOiBib29sZWFuXG4gIG1lc3NhZ2U6IHN0cmluZ1xufVxuXG4vLyBcdTc1MjggbG9jYXRpb24ub3JpZ2luIFx1NjJGQ1x1N0VERFx1NUJGOSBVUkxcdUZGMUFEU0ggXHU5ODc1XHU5NzYyXHU3M0FGXHU1ODgzXHU0RTBCXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0IGZldGNoIFx1NEYxQVx1NjMwMlx1OEQ3N1x1RkYwOFx1NUI5RVx1NkQ0Qlx1RkYwOVx1RkYwQ1xuLy8gXHU3RUREXHU1QkY5IFVSTCBcdTZCNjNcdTVFMzhcdTMwMDJvcmlnaW4gXHU1MkE4XHU2MDAxXHU4M0I3XHU1M0Q2XHVGRjBDRFNIIFx1NjM2Mlx1N0FFRlx1NTNFM1x1NEU1Rlx1OTAwMlx1OTE0RFx1MzAwMlxuY29uc3QgQkFTRSA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2RzaC1yZWdpb25gXG5cbmFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RKc29uPFQ+KHBhdGg6IHN0cmluZywgaW5pdD86IFJlcXVlc3RJbml0KTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke0JBU0V9JHtwYXRofWAsIHtcbiAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAuLi5pbml0LFxuICB9KVxuICBpZiAoIXJlcy5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihgSFRUUCAke3Jlcy5zdGF0dXN9YClcbiAgfVxuICByZXR1cm4gKGF3YWl0IHJlcy5qc29uKCkpIGFzIFRcbn1cblxuLyoqIFx1NjJDOVx1NTNENlx1NzJCNlx1NjAwMVx1MzAwMnByb2JlPXRydWUgXHU2NUY2IHNlcnZlciBcdTVCOUVcdTY1RjZcdTYzQTJcdTZENEJcdTUzQ0NcdTZFOTBcdUZGMDhcdTgzRENcdTUzNTVcdTMwMENcdTdBQ0JcdTUzNzNcdTZENEJcdTkwMUZcdTMwMERcdUZGMDlcdUZGMUJcdTlFRDhcdThCQTRcdThGRDRcdTU2REVcdTdGMTNcdTVCNThcdUZGMENcdTc5RDJcdTU2REVcdTMwMDIgKi9cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFN0YXR1cyhwcm9iZSA9IGZhbHNlKTogUHJvbWlzZTxSZWdpb25TdGF0dXM+IHtcbiAgcmV0dXJuIHJlcXVlc3RKc29uPFJlZ2lvblN0YXR1cz4oYC9zdGF0dXMke3Byb2JlID8gJz9wcm9iZT0xJyA6ICcnfWApXG59XG5cbi8qKiBcdTUyMDdcdTYzNjJcdTZBMjFcdTVGMEYgYXV0b3xtYWlufGJhY2t1cFx1MzAwMiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcXVlc3RNb2RlKG1vZGU6ICdhdXRvJyB8ICdtYWluJyB8ICdiYWNrdXAnKTogUHJvbWlzZTxVc2VSZXN1bHQ+IHtcbiAgcmV0dXJuIHJlcXVlc3RKc29uPFVzZVJlc3VsdD4oJy91c2UnLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtb2RlIH0pLFxuICB9KVxufVxuXG4vKiogXHU4QkJFXHU3RjZFXHU1M0YzXHU0RTBBXHU4OUQyXHU4M0RDXHU1MzU1XHU2NjNFXHU5NjkwXHUzMDAyICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdE1lbnVWaXNpYmxlKHZpc2libGU6IGJvb2xlYW4pOiBQcm9taXNlPHsgb2s6IGJvb2xlYW47IHZpc2libGU6IGJvb2xlYW4gfT4ge1xuICByZXR1cm4gcmVxdWVzdEpzb24oJy9tZW51Jywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdmlzaWJsZSB9KSxcbiAgfSlcbn1cbiIsICIvKipcbiAqIGRzaC1yZWdpb24gY2xpZW50IFx1NjU4N1x1Njg0OCBcdTIwMTRcdTIwMTQgXHU0RTJEXHU4MkYxXHU1M0NDXHU4QkVEXHU5NkM2XHU0RTJEXHU3QkExXHU3NDA2XHVGRjA4XHU5RUQ4XHU4QkE0XHU0RTJEXHU2NTg3XHVGRjBDXHU2M0QyXHU0RUY2XHU5NzYyXHU1NDExXHU1NkZEXHU1MTg1XHU3NTI4XHU2MjM3XHVGRjA5XHUzMDAyXG4gKi9cblxuZXhwb3J0IHR5cGUgUmVnaW9uS2V5ID1cbiAgfCAnbWVudS50aXRsZSdcbiAgfCAnbWVudS5zdGF0dXNHcmVlbidcbiAgfCAnbWVudS5zdGF0dXNZZWxsb3cnXG4gIHwgJ21lbnUuc3RhdHVzUmVkJ1xuICB8ICdtZW51LnN0YXR1c1Vua25vd24nXG4gIHwgJ21lbnUuYXV0bydcbiAgfCAnbWVudS5tYWluJ1xuICB8ICdtZW51LmJhY2t1cCdcbiAgfCAnbWVudS5wcm9iZSdcbiAgfCAnbWVudS5jdXJyZW50J1xuICB8ICdtZW51LmhpZGRlbidcbiAgfCAnY2FyZC50aXRsZSdcbiAgfCAnY2FyZC5kZXNjcmlwdGlvbidcbiAgfCAnY2FyZC5tZW51VmlzaWJsZSdcbiAgfCAnY2FyZC5tZW51VmlzaWJsZURlc2MnXG4gIHwgJ2NhcmQuc2hvdydcbiAgfCAnY2FyZC5oaWRlJ1xuICB8ICdlcnIuZmV0Y2hGYWlsZWQnXG5cbmV4cG9ydCBjb25zdCB6aDogUmVjb3JkPFJlZ2lvbktleSwgc3RyaW5nPiA9IHtcbiAgJ21lbnUudGl0bGUnOiAnZHNoLXJlZ2lvbiBcdTZFOTBcdTdCQTFcdTc0MDYnLFxuICAnbWVudS5zdGF0dXNHcmVlbic6ICdcdTRFM0JcdTZFOTBcdTZCNjNcdTVFMzhcdUZGMENcdTVGNTNcdTUyNERcdTRGN0ZcdTc1MjhcdTU2RkRcdTUxODVcdTk1NUNcdTUwQ0YnLFxuICAnbWVudS5zdGF0dXNZZWxsb3cnOiAnXHU0RTNCXHU2RTkwXHU0RTBEXHU1M0VGXHU3NTI4XHVGRjBDXHU1REYyXHU4MUVBXHU1MkE4XHU1MjA3XHU1MjMwXHU1Qjk4XHU2NUI5XHU2RTkwJyxcbiAgJ21lbnUuc3RhdHVzUmVkJzogJ1x1NTZGRFx1NTE4NVx1OTU1Q1x1NTBDRlx1NEUwRVx1NUI5OFx1NjVCOVx1NkU5MFx1NTc0N1x1NEUwRFx1NTNFRlx1NzUyOCcsXG4gICdtZW51LnN0YXR1c1Vua25vd24nOiAnXHU3MkI2XHU2MDAxXHU2NzJBXHU3N0U1XHVGRjBDXHU3MEI5XHU1MUZCXHUzMDBDXHU3QUNCXHU1MzczXHU2RDRCXHU5MDFGXHUzMDBEXHU2OEMwXHU2RDRCJyxcbiAgJ21lbnUuYXV0byc6ICdcdTgxRUFcdTUyQThcdTUyMDdcdTYzNjInLFxuICAnbWVudS5tYWluJzogJ1x1NTZGRFx1NTE4NVx1OTU1Q1x1NTBDRicsXG4gICdtZW51LmJhY2t1cCc6ICdcdTVCOThcdTY1QjlcdTZFOTAnLFxuICAnbWVudS5wcm9iZSc6ICdcdTdBQ0JcdTUzNzNcdTZENEJcdTkwMUYnLFxuICAnbWVudS5jdXJyZW50JzogJ1x1NUY1M1x1NTI0RCcsXG4gICdtZW51LmhpZGRlbic6ICdcdUZGMDhcdTgzRENcdTUzNTVcdTVERjJcdTk2OTBcdTg1Q0ZcdUZGMENcdTUzRUZcdTU3MjhcdThCQkVcdTdGNkVcdTRFMkRcdTVGMDBcdTU0MkZcdUZGMDknLFxuICAnY2FyZC50aXRsZSc6ICdkc2gtcmVnaW9uIFx1NkU5MFx1N0JBMVx1NzQwNicsXG4gICdjYXJkLmRlc2NyaXB0aW9uJzogJ0RTSCBcdTRFMEJcdThGN0RcdTZFOTBcdTRFM0JcdTU5MDdcdTUyMDdcdTYzNjJcdUZGMUFcdTU2RkRcdTUxODVcdTk1NUNcdTUwQ0ZcdTRFM0FcdTRFM0JcdTMwMDFcdTVCOThcdTY1QjlcdTZFOTBcdTRFM0FcdTU5MDdcdUZGMENcdTY1NDVcdTk2OUNcdTgxRUFcdTUyQThcdTUyMDdcdTYzNjInLFxuICAnY2FyZC5tZW51VmlzaWJsZSc6ICdcdTUzRjNcdTRFMEFcdTg5RDJcdTZFOTBcdTdCQTFcdTc0MDZcdTgzRENcdTUzNTUnLFxuICAnY2FyZC5tZW51VmlzaWJsZURlc2MnOiAnXHU1NzI4XHU0RjFBXHU4QkREXHU5ODc1XHU1M0YzXHU0RTBBXHU4OUQyXHVGRjA4XHU0RTBCXHU4RjdEIExvZyBcdTVERTZcdTRGQTdcdUZGMDlcdTY2M0VcdTc5M0FcdTZFOTBcdTdCQTFcdTc0MDZcdTRFMEJcdTYyQzlcdTgzRENcdTUzNTUnLFxuICAnY2FyZC5zaG93JzogJ1x1NjYzRVx1NzkzQScsXG4gICdjYXJkLmhpZGUnOiAnXHU5NjkwXHU4NUNGJyxcbiAgJ2Vyci5mZXRjaEZhaWxlZCc6ICdcdThGREVcdTYzQTUgZHNoLXJlZ2lvbiBcdTY3MERcdTUyQTFcdTU5MzFcdThEMjUnLFxufVxuXG5leHBvcnQgY29uc3QgZW46IFJlY29yZDxSZWdpb25LZXksIHN0cmluZz4gPSB7XG4gICdtZW51LnRpdGxlJzogJ2RzaC1yZWdpb24gc291cmNlcycsXG4gICdtZW51LnN0YXR1c0dyZWVuJzogJ1ByaW1hcnkgaGVhbHRoeSwgdXNpbmcgQ2hpbmEgbWlycm9yJyxcbiAgJ21lbnUuc3RhdHVzWWVsbG93JzogJ1ByaW1hcnkgZG93biwgc3dpdGNoZWQgdG8gb2ZmaWNpYWwgcmVnaXN0cnknLFxuICAnbWVudS5zdGF0dXNSZWQnOiAnQm90aCByZWdpc3RyaWVzIHVucmVhY2hhYmxlJyxcbiAgJ21lbnUuc3RhdHVzVW5rbm93bic6ICdVbmtub3duIFx1MjAxNCBjbGljayBcIlByb2JlXCIgdG8gY2hlY2snLFxuICAnbWVudS5hdXRvJzogJ0F1dG8nLFxuICAnbWVudS5tYWluJzogJ0NoaW5hIG1pcnJvcicsXG4gICdtZW51LmJhY2t1cCc6ICdPZmZpY2lhbCByZWdpc3RyeScsXG4gICdtZW51LnByb2JlJzogJ1Byb2JlIG5vdycsXG4gICdtZW51LmN1cnJlbnQnOiAnY3VycmVudCcsXG4gICdtZW51LmhpZGRlbic6ICcobWVudSBoaWRkZW4gXHUyMDE0IGVuYWJsZSBpdCBpbiBzZXR0aW5ncyknLFxuICAnY2FyZC50aXRsZSc6ICdkc2gtcmVnaW9uIHNvdXJjZSBtYW5hZ2VyJyxcbiAgJ2NhcmQuZGVzY3JpcHRpb24nOiAnRFNIIHJlZ2lzdHJ5IGZhaWxvdmVyOiBDaGluYSBtaXJyb3IgcHJpbWFyeSwgb2ZmaWNpYWwgYmFja3VwLCBhdXRvLXN3aXRjaCcsXG4gICdjYXJkLm1lbnVWaXNpYmxlJzogJ1NvdXJjZSBtZW51IGluIGhlYWRlcicsXG4gICdjYXJkLm1lbnVWaXNpYmxlRGVzYyc6ICdTaG93IHRoZSBzb3VyY2UgZHJvcGRvd24gbmV4dCB0byBcIlNlc3Npb24gbG9nXCIgaW4gdGhlIGhlYWRlcicsXG4gICdjYXJkLnNob3cnOiAnU2hvdycsXG4gICdjYXJkLmhpZGUnOiAnSGlkZScsXG4gICdlcnIuZmV0Y2hGYWlsZWQnOiAnRmFpbGVkIHRvIHJlYWNoIGRzaC1yZWdpb24gc2VydmljZScsXG59XG4iLCAiLyoqXG4gKiBoZWFkZXItbWVudSBcdTIwMTRcdTIwMTQgXHU1M0YzXHU0RTBBXHU4OUQyXHUzMDBDXHU0RTBCXHU4RjdEIExvZ1x1MzAwRFx1NURFNlx1NEZBN1x1NzY4NFx1NkU5MFx1N0JBMVx1NzQwNlx1NEUwQlx1NjJDOVx1ODNEQ1x1NTM1NVx1MzAwMlxuICpcbiAqIFx1N0VBRiBET00gXHU2Q0U4XHU1MTY1XHVGRjA4XHU0RTBEXHU2MzAyIFJlYWN0IFx1NjgxMVx1RkYwOVx1RkYwQ1x1NkEyMVx1NEVGRiBsaW54aW42NjYvZHNoLXdlYi11aSBcdTc2ODQgc2lkZWJhci1lbnRyeSBcdTZBMjFcdTVGMEZcdUZGMUFcbiAqICAtIFx1NUI5QVx1NEY0RFx1OTUxQVx1NzBCOVx1RkYxQVNlc3Npb24gbG9nIFx1NjMwOVx1OTRBRVx1RkYwOGNsYXNzIFx1NTQyQiBzZXNzaW9uTG9nXHVGRjBDXHU2MjE2XHU2NTg3XHU2NzJDXHU1MzM5XHU5MTREXHVGRjA5XHVGRjBDXHU1NzI4XHU1MTc2XHU1MjREXHU2M0QyXHU1MTY1XG4gKiAgLSBcdTgxRUFcdTYxMDhcdUZGMUFNdXRhdGlvbk9ic2VydmVyIFx1NzZEMVx1NTQyQ1x1RkYwQ1JlYWN0IFx1OTFDRFx1NkUzMlx1NjdEM1x1NzlGQlx1OTY2NFx1NTQwRVx1ODFFQVx1NTJBOFx1OTFDRFx1NjNEMlxuICogIC0gXHU3MkI2XHU2MDAxXHU3MDZGXHVGRjFBXHU3RUZGL1x1OUVDNC9cdTdFQTIgKyB0b29sdGlwIFx1OEJGNFx1NjYwRVxuICogIC0gXHU4M0RDXHU1MzU1XHU5ODc5XHU1RTI2XHU2M0EyXHU2RDRCXHU4MDE3XHU2NUY2XHVGRjBDXHU1MjA3XHU2MzYyXHU4QzAzIGhvc3QgQVBJXG4gKiAgLSBcdTY2M0VcdTk2OTBcdTc1MzEgc2VydmVyIFx1N0FFRiByZWdpb24uanNvbiBcdTYzQTdcdTUyMzZcdUZGMDhtZW51VmlzaWJsZT1mYWxzZSBcdTY1RjZcdTY1NzRcdTRFMkFcdTYzMDlcdTk0QUVcdTRFMERcdTZFMzJcdTY3RDNcdUZGMDlcbiAqXG4gKiBcdTk0QzFcdTVGOEJcdUZGMUFcdTRFRkJcdTRGNTUgRE9NIFx1NjRDRFx1NEY1Q1x1NTkzMVx1OEQyNVx1NTNFQSBjb25zb2xlLndhcm5cdUZGMENcdTdFRERcdTRFMEQgdGhyb3dcdUZGMDhcdTRFMERcdTgwRkRcdTYyRDZcdTU3QUUgRFNIIFx1NTQyRlx1NTJBOFx1RkYwOVx1MzAwMlxuICovXG5cbmltcG9ydCB7IGZldGNoU3RhdHVzLCByZXF1ZXN0TW9kZSwgdHlwZSBSZWdpb25TdGF0dXMgfSBmcm9tICcuL2hvc3QtYXBpLmpzJ1xuaW1wb3J0IHsgemggfSBmcm9tICcuL2xvY2FsZXMuanMnXG5cbmV4cG9ydCBjb25zdCBFTlRSWV9TRUxFQ1RPUiA9ICdbZGF0YS1kc2gtcmVnaW9uLWVudHJ5XSdcblxuY29uc3QgQ1NTID0gYFxuLmRzaHItZW50cnl7ZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjt3aWR0aDoyOHB4O2hlaWdodDoyOHB4O21hcmdpbjowIDJweDtwYWRkaW5nOjA7Ym9yZGVyOm5vbmU7Ym9yZGVyLXJhZGl1czo2cHg7YmFja2dyb3VuZDp0cmFuc3BhcmVudDtjb2xvcjp2YXIoLS1jb2xvci10ZXh0LXNlY29uZGFyeSwjOGI5NDllKTtjdXJzb3I6cG9pbnRlcjtwb3NpdGlvbjpyZWxhdGl2ZX1cbi5kc2hyLWVudHJ5OmhvdmVye2JhY2tncm91bmQ6Y29sb3ItbWl4KGluIHNyZ2IsY3VycmVudENvbG9yIDEyJSx0cmFuc3BhcmVudCl9XG4uZHNoci1lbnRyeSAuZHNoci1kb3R7cG9zaXRpb246YWJzb2x1dGU7dG9wOjRweDtyaWdodDo0cHg7d2lkdGg6N3B4O2hlaWdodDo3cHg7Ym9yZGVyLXJhZGl1czo1MCU7Ym9yZGVyOjEuNXB4IHNvbGlkIHZhcigtLWNvbG9yLWJnLXByaW1hcnksIzBkMTExNyl9XG4uZHNoci1kb3QuZ3JlZW57YmFja2dyb3VuZDojM2ZiOTUwfS5kc2hyLWRvdC55ZWxsb3d7YmFja2dyb3VuZDojZDI5OTIyfS5kc2hyLWRvdC5yZWR7YmFja2dyb3VuZDojZjg1MTQ5fS5kc2hyLWRvdC5ncmF5e2JhY2tncm91bmQ6IzhiOTQ5ZX1cbi5kc2hyLW1lbnV7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDo5OTk5O21pbi13aWR0aDoyMzBweDtwYWRkaW5nOjZweDtib3JkZXItcmFkaXVzOjEwcHg7YmFja2dyb3VuZDp2YXIoLS1jb2xvci1iZy1lbGV2YXRlZCwjMTYxYjIyKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWNvbG9yLWJvcmRlci1kZWZhdWx0LHJnYmEoMjQwLDI0NiwyNTIsLjEyKSk7Ym94LXNoYWRvdzowIDhweCAyNHB4IHJnYmEoMSw0LDksLjQpO2ZvbnQtc2l6ZToxM3B4O2NvbG9yOnZhcigtLWNvbG9yLXRleHQtcHJpbWFyeSwjZTZlZGYzKTthbmltYXRpb246ZHNockluIC4xMnMgZWFzZS1vdXR9XG5Aa2V5ZnJhbWVzIGRzaHJJbntmcm9te29wYWNpdHk6MDt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNHB4KX10b3tvcGFjaXR5OjE7dHJhbnNmb3JtOm5vbmV9fVxuLmRzaHItbWVudS1oZWFke2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDtwYWRkaW5nOjZweCA4cHggOHB4O2ZvbnQtd2VpZ2h0OjYwMDtib3JkZXItYm90dG9tOjFweCBzb2xpZCB2YXIoLS1jb2xvci1ib3JkZXItZGVmYXVsdCxyZ2JhKDI0MCwyNDYsMjUyLC4xKSk7Y3Vyc29yOmhlbHB9XG4uZHNoci1tZW51LWhlYWQgLmRzaHItaGRvdHt3aWR0aDo4cHg7aGVpZ2h0OjhweDtib3JkZXItcmFkaXVzOjUwJTtmbGV4Om5vbmV9XG4uZHNoci1pdGVte2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Z2FwOjhweDt3aWR0aDoxMDAlO3BhZGRpbmc6N3B4IDhweDtib3JkZXI6bm9uZTtib3JkZXItcmFkaXVzOjdweDtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O2NvbG9yOmluaGVyaXQ7Zm9udC1zaXplOjEzcHg7Y3Vyc29yOnBvaW50ZXI7dGV4dC1hbGlnbjpsZWZ0fVxuLmRzaHItaXRlbTpob3ZlcntiYWNrZ3JvdW5kOmNvbG9yLW1peChpbiBzcmdiLGN1cnJlbnRDb2xvciAxMCUsdHJhbnNwYXJlbnQpfVxuLmRzaHItaXRlbSAuZHNoci1tc3tjb2xvcjp2YXIoLS1jb2xvci10ZXh0LXRlcnRpYXJ5LCM2ZTc2ODEpO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtdmFyaWFudC1udW1lcmljOnRhYnVsYXItbnVtc31cbi5kc2hyLWl0ZW0gLmRzaHItY3Vye2NvbG9yOiMzZmI5NTA7Zm9udC1zaXplOjExcHg7bWFyZ2luLWxlZnQ6NHB4fVxuLmRzaHItc2Vwe2hlaWdodDoxcHg7bWFyZ2luOjVweCA2cHg7YmFja2dyb3VuZDp2YXIoLS1jb2xvci1ib3JkZXItZGVmYXVsdCxyZ2JhKDI0MCwyNDYsMjUyLC4wOCkpfVxuLmRzaHItcHJvYmV7anVzdGlmeS1jb250ZW50OmNlbnRlcjtjb2xvcjp2YXIoLS1jb2xvci10ZXh0LXNlY29uZGFyeSwjOGI5NDllKX1cbi5kc2hyLXByb2JlOmhvdmVye2NvbG9yOnZhcigtLWNvbG9yLXRleHQtcHJpbWFyeSwjZTZlZGYzKX1cbi8qIFx1NTZGQVx1NUI5QVx1NUI5QVx1NEY0RFx1NzY4NFx1NjI3Rlx1OEY3RFx1NUJCOVx1NTY2OFx1RkYxQVx1NTNFQVx1OEQxRlx1OEQyM1x1NTc1MFx1NjgwN1x1RkYwQ1x1ODlDNlx1ODlDOVx1NEUwQVx1NEUwRFx1NzU1OVx1NEVGQlx1NEY1NVx1NTkxNlx1Njg0Nlx1RkYwQ1xuICAgXHU3NzBCXHU4RDc3XHU2NzY1XHU1QzMxXHU2NjJGXHU1REU1XHU1MTc3XHU2ODBGXHU0RTBBXHU3Njg0XHU0RTAwXHU0RTJBXHU2NjZFXHU5MDFBXHU1NkZFXHU2ODA3XHU2MzA5XHU5NEFFXHVGRjA4XHU0RjREXHU3RjZFXHU3NTMxIHBsYWNlTmVhckFuY2hvciBcdThCQTFcdTdCOTdcdUZGMDlcdTMwMDIgKi9cbi5kc2hyLWZhbGxiYWNrLWhvc3R7cG9zaXRpb246Zml4ZWQ7ei1pbmRleDoyMTQ3NDgzMDAwO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7bGluZS1oZWlnaHQ6MH1cbmBcblxuaW50ZXJmYWNlIEhlYWRlck1lbnVPcHRpb25zIHtcbiAgLyoqIFx1NTkxNlx1OTBFOFx1OTAxQVx1NzdFNVx1NzJCNlx1NjAwMVx1NTIzN1x1NjVCMFx1RkYwOFx1OEJCRVx1N0Y2RVx1OTg3NVx1ODBGNlx1NTZDQVx1OTcwMFx1ODk4MVx1RkYwOVx1MzAwMiAqL1xuICBvbk1lbnVWaXNpYmxlQ2hhbmdlPzogKHZpc2libGU6IGJvb2xlYW4pID0+IHZvaWRcbn1cblxuLyoqXG4gKiBcdTVCOUFcdTRGNERcdTVCQkZcdTRFM0JcdTk1MUFcdTcwQjlcdTYzMDlcdTk0QUVcdTMwMDJcbiAqXG4gKiBcdTUzODZcdTUzRjJcdTY1NTlcdThCQURcdUZGMUFcdTY1RTdcdTcyNDggZHNoIFx1NTcyOFx1NTNGM1x1NEUwQVx1ODlEMlx1NjcwOVx1MzAwQ1x1NEUwQlx1OEY3RFx1NjVFNVx1NUZEN1x1MzAwRFx1NjMwOVx1OTRBRVx1RkYwQ1x1NjVCMFx1NzI0OFx1NjI4QVx1NUI4M1x1NjMyQVx1OEZEQlx1NEU4NiBjb21wb3NlciBcdTc2ODRcbiAqIGArYCAvIGAvYCBcdTU0N0RcdTRFRTRcdTgzRENcdTUzNTVcdUZGMDhsb2NhbGUgXHU5NTJFIGxhYmVsLmV4cG9ydCA9IFx1NEUwQlx1OEY3RFx1NjVFNVx1NUZEN1x1RkYwQ1x1OUVEOFx1OEJBNFx1NEUwRFx1NkUzMlx1NjdEM1x1RkYwOVx1RkYwQ1xuICogXHU0RThFXHU2NjJGXHU4MDAxXHU5NTFBXHU3MEI5XHU2QzM4XHU4RkRDXHU1MzM5XHU5MTREXHU0RTBEXHU1MjMwIFx1MjE5MiBcdTUxNjVcdTUzRTNcdTY1NzRcdTU3NTdcdTk3NTlcdTlFRDhcdTZEODhcdTU5MzFcdTMwMDJcdTY1NDVcdThGRDlcdTkxQ0NcdTUwNUFcdTRFMDlcdTdFQTdcdTVCQkRcdTUzMzlcdTkxNERcdUZGMENcbiAqIFx1NEUxNFx1OEMwM1x1NzUyOFx1NjVCOVx1NTcyOFx1NTE2OFx1OTBFOFx1ODQzRFx1N0E3QVx1NjVGNlx1NUZDNVx1OTg3Qlx1OEQ3MCBmYWxsYmFja0hvc3QoKSBcdTUxNUNcdTVFOTVcdUZGMENcdTRFMERcdTUxNDFcdThCQjhcdTc2RjRcdTYzQTUgcmV0dXJuXHUzMDAyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTG9nQnV0dG9uKCk6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbCB7XG4gIGNvbnN0IGFsbCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MQnV0dG9uRWxlbWVudD4oJ2J1dHRvbicpKVxuICBjb25zdCBSRSA9IC9zZXNzaW9uXFxzKmxvZ3xcdTRFMEJcdThGN0QuKlx1NjVFNVx1NUZENy9pXG4gIC8vIDEpIFx1NjVFN1x1NzI0OFx1RkYxQWNsYXNzIFx1NTQyQiBzZXNzaW9uTG9nXG4gIGNvbnN0IGJ5Q2xhc3MgPSBhbGwuZmluZCgoYikgPT4gL3Nlc3Npb25Mb2cvaS50ZXN0KGIuY2xhc3NOYW1lKSlcbiAgaWYgKGJ5Q2xhc3MpIHJldHVybiBieUNsYXNzXG4gIC8vIDIpIFx1NjU4N1x1NjcyQ1x1NzZGNFx1NjNBNVx1NjMwMlx1NTcyOCBidXR0b24gXHU0RTBBXHVGRjA4XHU2NUIwXHU3MjQ4XHU0RTBEXHU1MThEXHU1MzA1IHNwYW5cdUZGMDlcbiAgY29uc3QgYnlUZXh0ID0gYWxsLmZpbmQoKGIpID0+IFJFLnRlc3QoYi50ZXh0Q29udGVudCA/PyAnJykpXG4gIGlmIChieVRleHQpIHJldHVybiBieVRleHRcbiAgLy8gMykgYXJpYS1sYWJlbCAvIHRpdGxlIFx1NTE1Q1x1NUU5NVx1RkYwOFx1NTZGRVx1NjgwN1x1NjMwOVx1OTRBRVx1NjVFMFx1NTNFRlx1OEJGQlx1NjU4N1x1NUI1N1x1RkYwOVxuICByZXR1cm4gKFxuICAgIGFsbC5maW5kKFxuICAgICAgKGIpID0+IFJFLnRlc3QoYi5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSA/PyAnJykgfHwgUkUudGVzdChiLmdldEF0dHJpYnV0ZSgndGl0bGUnKSA/PyAnJyksXG4gICAgKSA/PyBudWxsXG4gIClcbn1cblxuLyoqIFx1NjI3RVx1NEUwRFx1NTIzMFx1OTUxQVx1NzBCOVx1NjVGNlx1NzY4NFx1NTE1Q1x1NUU5NVx1NUJCOVx1NTY2OFx1RkYxQVx1NTZGQVx1NUI5QVx1NUI5QVx1NEY0RFx1NTcyOFx1NTNGM1x1NEUwQVx1ODlEMlx1RkYwQ1x1NEUwRFx1NEY5RFx1OEQ1Nlx1NUJCRlx1NEUzQiBET00gXHU3RUQzXHU2Nzg0XHUzMDAyICovXG5mdW5jdGlvbiBmYWxsYmFja0hvc3QoKTogSFRNTEVsZW1lbnQge1xuICBsZXQgaG9zdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkc2hyLWZhbGxiYWNrLWhvc3QnKVxuICBpZiAoaG9zdCkgcmV0dXJuIGhvc3RcbiAgaG9zdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGhvc3QuaWQgPSAnZHNoci1mYWxsYmFjay1ob3N0J1xuICBob3N0LmNsYXNzTmFtZSA9ICdkc2hyLWZhbGxiYWNrLWhvc3QnXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaG9zdClcbiAgcmV0dXJuIGhvc3Rcbn1cblxuLyoqXG4gKiBcdTkwMDlcdTYyRTlcdTk1MUFcdTcwQjlcdTYzMDlcdTk0QUVcdUZGMUFcdTUxNjVcdTUzRTNcdTU2RkFcdTVCOUFcdTVCOUFcdTRGNERcdTU3MjhcdTVCODNcdTVERTZcdTRGQTdcdTMwMDJcbiAqXG4gKiBcdTRFM0FcdTRFQzBcdTRFNDhcdTRFMERcdTUxOERcdTMwMENcdTYzRDJcdTUxNjVcdTVCQkZcdTRFM0IgRE9NXHUzMDBEXHVGRjFBXG4gKiAgMS4gXHU1QkJGXHU0RTNCIHRpdGxlUm93IFx1NzY4NFx1NUUwM1x1NUM0MFx1NUUyNlx1NkVBMlx1NTFGQVx1NzY4NFx1NTkyNyBtYXJnaW4gXHUyMDE0XHUyMDE0IFx1NUI5RVx1NkQ0QiBoZWFkZXJDb3JuZXIgXHU3Njg0XG4gKiAgICAgYG1hcmdpbi1sZWZ0OiA3NzRweGBcdUZGMENcdTVCOUVcdTk2NDVcdTZFMzJcdTY3RDNcdTU3MjggMTg4MFx1RkYwQ1x1ODAwQ1x1NUJCOVx1NTY2OFx1NUJCRFx1NTNFQVx1NjcwOSAxNTkyXHVGRjA4XHU2RUEyXHU1MUZBXHVGRjA5XHVGRjBDXG4gKiAgICAgXHU1RjgwXHU4RkQ5XHU3OUNEIGZsZXggXHU4ODRDXHU5MUNDXHU2M0QyXHU1MTQzXHU3RDIwXHU1RkM1XHU3MTM2XHU5NTE5XHU0RjREXHVGRjFCXG4gKiAgMi4gXHU0RTBEXHU1NDBDXHU5ODc1XHU5NzYyXHU1REU1XHU1MTc3XHU2ODBGXHU1MTg1XHU1QkI5XHU0RTBEXHU1NDBDXHVGRjFBXHU2NzA5XHU0RjFBXHU4QkREXHU2NUY2XHU2NjJGXHUzMDBDXHU5RUM0XHU2NTg3XHU0RUY2XHU1OTM5ICsgXHU0RTBCXHU2MkM5ICsgXHUwMEI3XHUwMEI3XHUwMEI3ICsgXHU1RTk1XHU5MEU4XHU5NzYyXHU2NzdGXHUzMDBEXHVGRjBDXG4gKiAgICAgXHU2NUIwXHU1RUZBXHU1QkY5XHU4QkREXHU2NUY2XHU1M0VBXHU2NzA5XHUzMDBDXHU2MjUzXHU1RjAwXHU1M0YzXHU0RkE3XHU4RkI5XHU2ODBGXHUzMDBEXHVGRjBDXHU2MzA5XHU1QkI5XHU1NjY4XHU2MjdFXHU0RjFBXHU3NkY0XHU2M0E1XHU2MjdFXHU0RTBEXHU1MjMwXHUzMDAyXG4gKlxuICogXHU2MjQwXHU0RUU1XHU3RURGXHU0RTAwXHU2NTM5XHU0RTNBXHUzMDBDXHU1NkZBXHU1QjlBXHU1QjlBXHU0RjREICsgXHU5NTFBXHU1QjlBXHU1MjMwXHU2MzA5XHU5NEFFXHU1REU2XHU0RkE3XHUzMDBEXHVGRjFBXHU0RjREXHU3RjZFXHU3Q0JFXHU3ODZFXHUzMDAxXHU0RTBFXHU1QkJGXHU0RTNCXHU1RTAzXHU1QzQwXHU1QjhDXHU1MTY4XHU4OUUzXHU4MDI2XHUzMDAyXG4gKiBcdTk1MUFcdTcwQjlcdTYzMDlcdTRGMThcdTUxNDhcdTdFQTdcdUZGMUFcdTY1ODdcdTRFRjZcdThENDRcdTZFOTBcdTdCQTFcdTc0MDZcdTU2NjggXHUyMTkyIFx1NTNGM1x1NEZBN1x1OEZCOVx1NjgwRiBcdTIxOTIgXHU2NkY0XHU1OTFBXHU2NENEXHU0RjVDXHUzMDAyXG4gKi9cbmZ1bmN0aW9uIGZpbmRBbmNob3JCdXR0b24oKTogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsIHtcbiAgY29uc3QgYnRucyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MQnV0dG9uRWxlbWVudD4oJ2J1dHRvblthcmlhLWxhYmVsXScpKVxuICBjb25zdCBieUFyaWEgPSAocmU6IFJlZ0V4cCk6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbCA9PlxuICAgIGJ0bnMuZmluZCgoYikgPT4gcmUudGVzdChiLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpID8/ICcnKSkgPz8gbnVsbFxuICByZXR1cm4gKFxuICAgIGJ5QXJpYSgvXHU2NTg3XHU0RUY2XHU4RDQ0XHU2RTkwXHU3QkExXHU3NDA2XHU1NjY4fFx1OEQ0NFx1NkU5MFx1N0JBMVx1NzQwNlx1NTY2OHxGaWxlIEV4cGxvcmVyL2kpID8/XG4gICAgYnlBcmlhKC9cdTUzRjNcdTRGQTdcdThGQjlcdTY4MEZ8UmlnaHQgc2lkZWJhci9pKSA/P1xuICAgIGJ5QXJpYSgvXHU2NkY0XHU1OTFBXHU2NENEXHU0RjVDfE1vcmUgYWN0aW9ucy9pKSA/P1xuICAgIG51bGxcbiAgKVxufVxuXG4vKiogXHU5NTFBXHU3MEI5XHU0RTBEXHU1M0VGXHU3NTI4XHU2NUY2XHU3Njg0XHU0RkREXHU1RTk1XHU0RjREXHU3RjZFXHVGRjFBXHU1M0YzXHU0RTBBXHU4OUQyXHU1NkZBXHU1QjlBXHU3MEI5XHVGRjBDXHU0RkREXHU4QkMxXHU1MTY1XHU1M0UzXHU1OUNCXHU3RUM4XHU1M0VGXHU4OUMxXHUzMDAyICovXG5mdW5jdGlvbiBhcHBseURlZmF1bHRTcG90KGhvc3Q6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIGhvc3Quc3R5bGUudG9wID0gJzU2cHgnXG4gIGhvc3Quc3R5bGUubGVmdCA9ICdhdXRvJ1xuICBob3N0LnN0eWxlLnJpZ2h0ID0gJzE2cHgnXG4gIGhvc3Quc3R5bGUuYm90dG9tID0gJ2F1dG8nXG59XG5cbi8qKiBcdTYyOEFcdTVCQjlcdTU2NjhcdTVCOUFcdTRGNERcdTUyMzBcdTk1MUFcdTcwQjlcdTYzMDlcdTk0QUVcdTVERTZcdTRGQTdcdUZGMUFcdTk1RjRcdThEREQgOHB4XHUzMDAxXHU1NzgyXHU3NkY0XHU1QzQ1XHU0RTJEXHU1QkY5XHU5RjUwXHUzMDAyICovXG5mdW5jdGlvbiBwbGFjZU5lYXJBbmNob3IoaG9zdDogSFRNTEVsZW1lbnQsIGJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsKTogYm9vbGVhbiB7XG4gIGlmICghYnRuIHx8ICFidG4uaXNDb25uZWN0ZWQpIHtcbiAgICBhcHBseURlZmF1bHRTcG90KGhvc3QpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgY29uc3QgciA9IGJ0bi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICBpZiAoci53aWR0aCA9PT0gMCB8fCByLmhlaWdodCA9PT0gMCkge1xuICAgIGFwcGx5RGVmYXVsdFNwb3QoaG9zdClcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBob3N0LnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQoci50b3AgKyAoci5oZWlnaHQgLSAyOCkgLyAyKX1weGBcbiAgaG9zdC5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChyLmxlZnQgLSAzNil9cHhgXG4gIGhvc3Quc3R5bGUucmlnaHQgPSAnYXV0bydcbiAgaG9zdC5zdHlsZS5ib3R0b20gPSAnYXV0bydcbiAgcmV0dXJuIHRydWVcbn1cblxuLyoqIFx1ODlFM1x1Njc5MFx1NjMwMlx1OEY3RFx1NzBCOVx1RkYxQVx1NURFNVx1NTE3N1x1NjgwRlx1NEYxOFx1NTE0OCBcdTIxOTIgXHU2NUU3XHUzMDBDXHU0RTBCXHU4RjdEXHU2NUU1XHU1RkQ3XHUzMDBEXHU5NTFBXHU3MEI5IFx1MjE5MiBcdTU2RkFcdTVCOUFcdTZENkVcdTVDNDJcdTUxNUNcdTVFOTVcdTMwMDIgKi9cbi8qKiBcdTg5RTNcdTY3OTBcdTYzMDJcdThGN0RcdTcwQjlcdUZGMUFcdTdFREZcdTRFMDBcdTc1MjhcdTUxNUNcdTVFOTVcdTVCQjlcdTU2NjhcdUZGMDhcdTU2RkFcdTVCOUFcdTVCOUFcdTRGNERcdUZGMDlcdUZGMENcdTk1MUFcdTcwQjlcdTYzMDlcdTk0QUVcdTUzRUFcdThEMUZcdThEMjNcdTUxQjNcdTVCOUFcdTU3NTBcdTY4MDdcdTMwMDIgKi9cbmZ1bmN0aW9uIHJlc29sdmVNb3VudCgpOiB7IGhvc3Q6IEhUTUxFbGVtZW50OyBhbmNob3I6IEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbCB9IHtcbiAgcmV0dXJuIHsgaG9zdDogZmFsbGJhY2tIb3N0KCksIGFuY2hvcjogZmluZEFuY2hvckJ1dHRvbigpIH1cbn1cblxuZnVuY3Rpb24gc3R5bGVUYWcoKTogSFRNTFN0eWxlRWxlbWVudCB7XG4gIGNvbnN0IGV4aXN0aW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RzaHItc3R5bGUnKSBhcyBIVE1MU3R5bGVFbGVtZW50IHwgbnVsbFxuICBpZiAoZXhpc3RpbmcpIHJldHVybiBleGlzdGluZ1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGUuaWQgPSAnZHNoci1zdHlsZSdcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBDU1NcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSlcbiAgcmV0dXJuIHN0eWxlXG59XG5cbmZ1bmN0aW9uIHN0YXR1c0RvdENsYXNzKHN0YXR1czogUmVnaW9uU3RhdHVzKTogJ2dyZWVuJyB8ICd5ZWxsb3cnIHwgJ3JlZCcgfCAnZ3JheScge1xuICBjb25zdCB7IG1haW4sIGJhY2t1cCB9ID0gc3RhdHVzXG4gIGlmICghbWFpbiB8fCAhYmFja3VwKSByZXR1cm4gJ2dyYXknXG4gIGlmIChtYWluLm9rICYmIGJhY2t1cC5vaykgcmV0dXJuICdncmVlbidcbiAgaWYgKG1haW4ub2sgIT09IGJhY2t1cC5vaykgcmV0dXJuICd5ZWxsb3cnXG4gIHJldHVybiBtYWluLm9rID8gJ2dyYXknIDogJ3JlZCdcbn1cblxuZnVuY3Rpb24gc3RhdHVzSGludChzdGF0dXM6IFJlZ2lvblN0YXR1cyk6IHN0cmluZyB7XG4gIGNvbnN0IHsgbWFpbiwgYmFja3VwIH0gPSBzdGF0dXNcbiAgaWYgKCFtYWluIHx8ICFiYWNrdXApIHJldHVybiB6aFsnbWVudS5zdGF0dXNVbmtub3duJ11cbiAgaWYgKG1haW4ub2sgJiYgYmFja3VwLm9rKSByZXR1cm4gemhbJ21lbnUuc3RhdHVzR3JlZW4nXVxuICBpZiAoIW1haW4ub2sgJiYgYmFja3VwLm9rKSByZXR1cm4gemhbJ21lbnUuc3RhdHVzWWVsbG93J11cbiAgaWYgKCFtYWluLm9rICYmICFiYWNrdXAub2spIHJldHVybiB6aFsnbWVudS5zdGF0dXNSZWQnXVxuICByZXR1cm4gemhbJ21lbnUuc3RhdHVzVW5rbm93biddXG59XG5cbmNvbnN0IElDT04gPSAnPHN2ZyB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgd2lkdGg9XCIxNVwiIGhlaWdodD1cIjE1XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIxLjNcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48ZWxsaXBzZSBjeD1cIjhcIiBjeT1cIjRcIiByeD1cIjRcIiByeT1cIjEuOFwiLz48cGF0aCBkPVwiTTQgNHY0YzAgMSAxLjggMS44IDQgMS44czQtLjggNC0xLjhWNFwiLz48cGF0aCBkPVwiTTQgOHY0YzAgMSAxLjggMS44IDQgMS44czQtLjggNC0xLjhWOFwiLz48L3N2Zz4nXG5cbi8qKlxuICogXHU2MzAyXHU4RjdEXHU1M0YzXHU0RTBBXHU4OUQyXHU4M0RDXHU1MzU1XHVGRjBDXHU4RkQ0XHU1NkRFIGRpc3Bvc2VyXHUzMDAyXG4gKiBcdTVFNDJcdTdCNDlcdUZGMUFcdTkxQ0RcdTU5MERcdThDMDNcdTc1MjhcdTUxNDhcdTZFMDVcdTc0MDZcdTY1RTdcdTVCOUVcdTRGOEJcdTUxOERcdTkxQ0RcdTVFRkFcdTMwMDJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vdW50SGVhZGVyTWVudShvcHRpb25zOiBIZWFkZXJNZW51T3B0aW9ucyA9IHt9KTogKCkgPT4gdm9pZCB7XG4gIHN0eWxlVGFnKClcbiAgbGV0IGRpc3Bvc2VkID0gZmFsc2VcbiAgbGV0IG9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGxcbiAgbGV0IG1lbnVFbDogSFRNTERpdkVsZW1lbnQgfCBudWxsID0gbnVsbFxuICBsZXQgZW50cnlFbDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsID0gbnVsbFxuICBsZXQgbGF0ZXN0OiBSZWdpb25TdGF0dXMgfCBudWxsID0gbnVsbFxuXG4gIGNvbnN0IGNsZWFudXBNZW51ID0gKCk6IHZvaWQgPT4ge1xuICAgIG1lbnVFbD8ucmVtb3ZlKClcbiAgICBtZW51RWwgPSBudWxsXG4gIH1cblxuICBjb25zdCBjbG9zZU1lbnUgPSAoKTogdm9pZCA9PiBjbGVhbnVwTWVudSgpXG5cbiAgY29uc3QgcmVuZGVyTWVudSA9IGFzeW5jICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICAgIGNsZWFudXBNZW51KClcbiAgICBsZXQgc3RhdHVzOiBSZWdpb25TdGF0dXNcbiAgICB0cnkge1xuICAgICAgc3RhdHVzID0gYXdhaXQgZmV0Y2hTdGF0dXMoZmFsc2UpXG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBcdTY3MERcdTUyQTFcdTRFMERcdTUzRUZcdThGQkVcdUZGMUFcdTgzRENcdTUzNTVcdTkxQ0NcdTc2RjRcdTYzQTVcdTYzRDBcdTc5M0FcbiAgICAgIHN0YXR1cyA9IHtcbiAgICAgICAgbW9kZTogJ2F1dG8nLCBhcHBsaWVkUmVnaXN0cnk6IG51bGwsIG1haW5SZWdpc3RyeTogJycsIGJhY2t1cFJlZ2lzdHJ5OiAnJyxcbiAgICAgICAgbGFzdEVycm9yOiB6aFsnZXJyLmZldGNoRmFpbGVkJ10sIGxhc3RTd2l0Y2hBdDogbnVsbCwgbWVudVZpc2libGU6IHRydWUsXG4gICAgICAgIG1haW46IHsgb2s6IGZhbHNlLCBtczogMCwgZXJyb3I6IHpoWydlcnIuZmV0Y2hGYWlsZWQnXSB9LFxuICAgICAgICBiYWNrdXA6IHsgb2s6IGZhbHNlLCBtczogMCwgZXJyb3I6IHpoWydlcnIuZmV0Y2hGYWlsZWQnXSB9LFxuICAgICAgfVxuICAgIH1cbiAgICBsYXRlc3QgPSBzdGF0dXNcbiAgICBpZiAoIWVudHJ5RWwpIHJldHVyblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZWN0ID0gZW50cnlFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgY29uc3QgZG90ID0gc3RhdHVzRG90Q2xhc3Moc3RhdHVzKVxuICAgIGNvbnN0IGl0ZW1zID0gKFxuICAgICAgW1xuICAgICAgICB7IGtleTogJ2F1dG8nLCBsYWJlbDogemhbJ21lbnUuYXV0byddLCBjbWQ6ICdhdXRvJyB9LFxuICAgICAgICB7IGtleTogJ21haW4nLCBsYWJlbDogemhbJ21lbnUubWFpbiddLCBjbWQ6ICdtYWluJyB9LFxuICAgICAgICB7IGtleTogJ2JhY2t1cCcsIGxhYmVsOiB6aFsnbWVudS5iYWNrdXAnXSwgY21kOiAnYmFja3VwJyB9LFxuICAgICAgXSBhcyBjb25zdFxuICAgIClcblxuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHJvb3QuY2xhc3NOYW1lID0gJ2RzaHItbWVudSdcbiAgICByb290LnN0eWxlLmxlZnQgPSBgJHtNYXRoLm1heCg4LCByZWN0LnJpZ2h0IC0gMjQwKX1weGBcbiAgICByb290LnN0eWxlLnRvcCA9IGAke3JlY3QuYm90dG9tICsgNn1weGBcbiAgICByb290LnNldEF0dHJpYnV0ZSgncm9sZScsICdtZW51JylcblxuICAgIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGhlYWQuY2xhc3NOYW1lID0gJ2RzaHItbWVudS1oZWFkJ1xuICAgIGhlYWQudGl0bGUgPSBzdGF0dXNIaW50KHN0YXR1cylcbiAgICBjb25zdCBoZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgaGRvdC5jbGFzc05hbWUgPSBgZHNoci1oZG90ICR7ZG90fWBcbiAgICBoZWFkLmFwcGVuZENoaWxkKGhkb3QpXG4gICAgaGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh6aFsnbWVudS50aXRsZSddKSlcbiAgICByb290LmFwcGVuZENoaWxkKGhlYWQpXG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBidG4uY2xhc3NOYW1lID0gJ2RzaHItaXRlbSdcbiAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnbWVudWl0ZW0nKVxuICAgICAgY29uc3QgbGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgY29uc3QgaXNDdXJyZW50ID0gc3RhdHVzLm1vZGUgPT09IGl0ZW0uY21kXG4gICAgICBsZWZ0LnRleHRDb250ZW50ID0gYCR7aXRlbS5sYWJlbH1cdUZGMDgke2l0ZW0uY21kfVx1RkYwOWBcbiAgICAgIGlmIChpc0N1cnJlbnQpIHtcbiAgICAgICAgY29uc3QgY3VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIGN1ci5jbGFzc05hbWUgPSAnZHNoci1jdXInXG4gICAgICAgIGN1ci50ZXh0Q29udGVudCA9IGBcdTI3MTMke3poWydtZW51LmN1cnJlbnQnXX1gXG4gICAgICAgIGxlZnQuYXBwZW5kQ2hpbGQoY3VyKVxuICAgICAgfVxuICAgICAgYnRuLmFwcGVuZENoaWxkKGxlZnQpXG4gICAgICBjb25zdCBtcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgbXMuY2xhc3NOYW1lID0gJ2RzaHItbXMnXG4gICAgICBjb25zdCBwcm9iZVJlc3VsdCA9IGl0ZW0uY21kID09PSAnbWFpbicgPyBzdGF0dXMubWFpbiA6IGl0ZW0uY21kID09PSAnYmFja3VwJyA/IHN0YXR1cy5iYWNrdXAgOiBudWxsXG4gICAgICBtcy50ZXh0Q29udGVudCA9IHByb2JlUmVzdWx0ID8gYCR7cHJvYmVSZXN1bHQubXN9bXNgIDogJy0tJ1xuICAgICAgYnRuLmFwcGVuZENoaWxkKG1zKVxuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB2b2lkIHJlcXVlc3RNb2RlKGl0ZW0uY21kKVxuICAgICAgICB2b2lkIHJlbmRlck1lbnUoKVxuICAgICAgfSlcbiAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoYnRuKVxuICAgIH1cblxuICAgIGNvbnN0IHNlcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc2VwLmNsYXNzTmFtZSA9ICdkc2hyLXNlcCdcbiAgICByb290LmFwcGVuZENoaWxkKHNlcClcblxuICAgIGNvbnN0IHByb2JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBwcm9iZS5jbGFzc05hbWUgPSAnZHNoci1pdGVtIGRzaHItcHJvYmUnXG4gICAgcHJvYmUudGV4dENvbnRlbnQgPSBgXHUyMUJCICR7emhbJ21lbnUucHJvYmUnXX1gXG4gICAgcHJvYmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAvLyBcdTdBQ0JcdTUzNzNcdTZENEJcdTkwMUZcdUZGMUFcdTVCOUVcdTY1RjZcdTYzQTJcdTZENEJcdTUzQ0NcdTZFOTBcdUZGMDhcdTUzRUZcdTgwRkRcdTY1NzBcdTc5RDJcdUZGMDlcdUZGMENcdTVCOENcdTYyMTBcdTU0MEVcdTUyMzdcdTY1QjBcdTgzRENcdTUzNTVcdTMwMDJcbiAgICAgIHZvaWQgZmV0Y2hTdGF0dXModHJ1ZSkudGhlbigoKSA9PiByZW5kZXJNZW51KCkpXG4gICAgfSlcbiAgICByb290LmFwcGVuZENoaWxkKHByb2JlKVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyb290KVxuICAgIG1lbnVFbCA9IHJvb3RcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gXHU2RTMyXHU2N0QzXHU1OTMxXHU4RDI1XHU1M0VBXHU4QkIwXHU2NUU1XHU1RkQ3XHVGRjBDXHU3RUREXHU0RTBEXHU2MjlCXHVGRjA4XHU1OTE2XHU5MEU4XHU2M0QyXHU0RUY2XHU0RTBEXHU4MEZEXHU2MkQ2XHU1N0FFIERTSFx1RkYwOVx1MzAwMlxuICAgICAgY29uc29sZS5lcnJvcignW2RzaC1yZWdpb25dIG1lbnUgcmVuZGVyIGZhaWxlZDonLCBlcnJvcilcbiAgICB9XG4gIH1cblxuICBjb25zdCBidWlsZEVudHJ5ID0gKCk6IEhUTUxCdXR0b25FbGVtZW50ID0+IHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGJ0bi50eXBlID0gJ2J1dHRvbidcbiAgICBidG4uY2xhc3NOYW1lID0gJ2RzaHItZW50cnknXG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnZGF0YS1kc2gtcmVnaW9uLWVudHJ5JywgJycpXG4gICAgYnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHpoWydtZW51LnRpdGxlJ10pXG4gICAgYnRuLmlubmVySFRNTCA9IElDT05cbiAgICBjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICBkb3QuY2xhc3NOYW1lID0gJ2RzaHItZG90IGdyYXknXG4gICAgYnRuLmFwcGVuZENoaWxkKGRvdClcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBpZiAobWVudUVsKSBjbG9zZU1lbnUoKVxuICAgICAgZWxzZSB2b2lkIHJlbmRlck1lbnUoKVxuICAgIH0pXG4gICAgcmV0dXJuIGJ0blxuICB9XG5cbiAgLy8gXHU5NjMyXHU2Mjk2XHU5NTAxXHVGRjFBTXV0YXRpb25PYnNlcnZlciBcdTlBRDhcdTk4OTFcdTg5RTZcdTUzRDFcdTY1RjZcdTU0MDhcdTVFNzZcdThCRjdcdTZDNDJcdUZGMENcdTkwN0ZcdTUxNERcdTVFNzZcdTUzRDFcdTYyNTNcdTcyMDYgc2VydmVyIFx1NjNBMlx1NkQ0Qlx1MzAwMlxuICBsZXQgZW5zdXJlTG9jayA9IGZhbHNlXG4gIGNvbnN0IGVuc3VyZUVudHJ5ID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmIChkaXNwb3NlZCB8fCBlbnN1cmVMb2NrKSByZXR1cm5cbiAgICBlbnN1cmVMb2NrID0gdHJ1ZVxuICAgIC8vIFx1ODNEQ1x1NTM1NVx1NjYzRVx1OTY5MFx1NTNENyBzZXJ2ZXIgXHU3MkI2XHU2MDAxXHU2M0E3XHU1MjM2XHVGRjFCXHU2N0U1XHU4QkUyXHU1OTMxXHU4RDI1XHU2NUY2XHU0RkREXHU1Qjg4XHU2NjNFXHU3OTNBXHVGRjA4XHU5RUQ4XHU4QkE0XHU2NjNFXHU3OTNBXHVGRjA5XHUzMDAyXG4gICAgdm9pZCBmZXRjaFN0YXR1cyhmYWxzZSlcbiAgICAgIC50aGVuKChzdGF0dXMpID0+IHtcbiAgICAgICAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgICAgICAgbGF0ZXN0ID0gc3RhdHVzXG4gICAgICAgIGNvbnN0IHRhcmdldFZpc2libGUgPSBzdGF0dXMubWVudVZpc2libGUgIT09IGZhbHNlXG4gICAgICAgIGNvbnN0IG1vdW50ID0gcmVzb2x2ZU1vdW50KClcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihFTlRSWV9TRUxFQ1RPUilcbiAgICAgICAgaWYgKCF0YXJnZXRWaXNpYmxlKSB7XG4gICAgICAgICAgZXhpc3Rpbmc/LnJlbW92ZSgpXG4gICAgICAgICAgY2xlYW51cE1lbnUoKVxuICAgICAgICAgIG9wdGlvbnMub25NZW51VmlzaWJsZUNoYW5nZT8uKGZhbHNlKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmIChleGlzdGluZyAmJiBleGlzdGluZy5wYXJlbnRFbGVtZW50ID09PSBtb3VudC5ob3N0KSB7XG4gICAgICAgICAgLy8gXHU0RjREXHU3RjZFXHU2QjYzXHU3ODZFXHU3Njg0XHU3NkY0XHU2M0E1XHU1OTBEXHU3NTI4XHVGRjBDXHU0RjQ2XHU0RUNEXHU2MzA5XHU5NTFBXHU3MEI5XHU5MUNEXHU1QjlBXHU0RjREXHU0RTAwXHU2QjIxXHVGRjA4XHU3QTk3XHU1M0UzXHU1QzNBXHU1QkY4L1x1NEZBN1x1OEZCOVx1NjgwRlx1NzJCNlx1NjAwMVx1NTNFRlx1ODBGRFx1NTNEOFx1OEZDN1x1RkYwOVxuICAgICAgICAgIHBsYWNlTmVhckFuY2hvcihtb3VudC5ob3N0LCBtb3VudC5hbmNob3IpXG4gICAgICAgICAgZW50cnlFbCA9IGV4aXN0aW5nXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4aXN0aW5nKSBleGlzdGluZy5yZW1vdmUoKVxuICAgICAgICBjb25zdCBidG4gPSBidWlsZEVudHJ5KClcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2RzaHItZW50cnknKVxuICAgICAgICAvLyBcdTcyQjZcdTYwMDFcdTcwNkZcdTUyMURcdTU5Q0JcdTgyNzJcbiAgICAgICAgY29uc3QgZG90ID0gYnRuLnF1ZXJ5U2VsZWN0b3IoJy5kc2hyLWRvdCcpXG4gICAgICAgIGlmIChkb3QpIGRvdC5jbGFzc0xpc3QuYWRkKHN0YXR1c0RvdENsYXNzKHN0YXR1cykpXG4gICAgICAgIG1vdW50Lmhvc3QuYXBwZW5kQ2hpbGQoYnRuKVxuICAgICAgICBwbGFjZU5lYXJBbmNob3IobW91bnQuaG9zdCwgbW91bnQuYW5jaG9yKVxuICAgICAgICBlbnRyeUVsID0gYnRuXG4gICAgICAgIG9wdGlvbnMub25NZW51VmlzaWJsZUNoYW5nZT8uKHRydWUpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgLy8gXHU3MkI2XHU2MDAxXHU4M0I3XHU1M0Q2XHU1OTMxXHU4RDI1XHVGRjFBXHU0RUNEXHU2NjNFXHU3OTNBXHU1MTY1XHU1M0UzXHVGRjA4XHU0RkREXHU1Qjg4XHU3QjU2XHU3NTY1XHVGRjA5XHVGRjBDXHU3MDcwXHU3MDZGXHUzMDAyXG4gICAgICAgIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gICAgICAgIGNvbnN0IG1vdW50ID0gcmVzb2x2ZU1vdW50KClcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihFTlRSWV9TRUxFQ1RPUilcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgZW50cnlFbCA9IGV4aXN0aW5nXG4gICAgICAgICAgcGxhY2VOZWFyQW5jaG9yKG1vdW50Lmhvc3QsIG1vdW50LmFuY2hvcilcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBlbnRyeUVsID0gYnVpbGRFbnRyeSgpXG4gICAgICAgIG1vdW50Lmhvc3QuYXBwZW5kQ2hpbGQoZW50cnlFbClcbiAgICAgICAgcGxhY2VOZWFyQW5jaG9yKG1vdW50Lmhvc3QsIG1vdW50LmFuY2hvcilcbiAgICAgIH0pXG4gICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgIGVuc3VyZUxvY2sgPSBmYWxzZVxuICAgICAgfSlcbiAgfVxuXG4gIC8vIFx1ODFFQVx1NjEwOCArIFx1OERERlx1OTY4Rlx1RkYxQVx1NTE2NVx1NTNFM1x1NkQ4OFx1NTkzMVx1NUMzMVx1OTFDRFx1NUVGQVx1RkYxQlx1OTUxQVx1NzBCOVx1NEY0RFx1N0Y2RVx1NTNEOFx1NEU4Nlx1NUMzMVx1OTFDRFx1NUI5QVx1NEY0RFx1MzAwMlxuICAvLyBcdTc1MzFcdTRFOEVcdTUxNjVcdTUzRTNcdTY2MkZcdTU2RkFcdTVCOUFcdTVCOUFcdTRGNERcdTMwMDFcdTRFMERcdTUzQzJcdTRFMEVcdTVCQkZcdTRFM0JcdTVFMDNcdTVDNDBcdUZGMENcdTk4NzVcdTk3NjJcdTUyMDdcdTYzNjIvXHU0RkE3XHU4RkI5XHU2ODBGXHU1RjAwXHU1NDA4L1x1N0E5N1x1NTNFM1x1N0YyOVx1NjUzRVxuICAvLyBcdTkwRkRcdTUzRUFcdTRGMUFcdTY1MzlcdTUzRDhcdTk1MUFcdTcwQjlcdTU3NTBcdTY4MDdcdUZGMENcdTkxQ0RcdTVCOUFcdTRGNERcdTRFMDBcdTZCMjFcdTUzNzNcdTUzRUZcdTMwMDJcbiAgbGV0IHJlbG9jYXRlQXQgPSAwXG4gIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gICAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihFTlRSWV9TRUxFQ1RPUilcbiAgICAvLyAxKSBcdTUxNjVcdTUzRTNcdTZEODhcdTU5MzFcdUZGMDhSZWFjdCBcdTkxQ0RcdTZFMzJcdTY3RDNcdUZGMDlcdTIxOTIgXHU3QUNCXHU1MzczXHU5MUNEXHU1RUZBXG4gICAgaWYgKCFleGlzdGluZykge1xuICAgICAgZW5zdXJlRW50cnkoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIDIpIFx1OTUxQVx1NzBCOVx1NjM2Mlx1NEY0RFx1N0Y2RVx1NEU4NiBcdTIxOTIgXHU4RERGXHU3NzQwXHU4RDcwXHVGRjA4XHU4MjgyXHU2RDQxIDIwMG1zXHVGRjBDRE9NIFx1OUFEOFx1OTg5MVx1NTNEOFx1NTJBOFx1NjVGNlx1NEUwRFx1NUZDNVx1NkJDRlx1NkIyMVx1OTBGRFx1N0I5N1x1RkYwOVxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KClcbiAgICBpZiAobm93IC0gcmVsb2NhdGVBdCA8IDIwMCkgcmV0dXJuXG4gICAgY29uc3QgYW5jaG9yID0gZmluZEFuY2hvckJ1dHRvbigpXG4gICAgaWYgKGFuY2hvciAmJiBleGlzdGluZy5wYXJlbnRFbGVtZW50KSB7XG4gICAgICByZWxvY2F0ZUF0ID0gbm93XG4gICAgICBwbGFjZU5lYXJBbmNob3IoZXhpc3RpbmcucGFyZW50RWxlbWVudCwgYW5jaG9yKVxuICAgIH1cbiAgfSlcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KVxuXG4gIC8vIFx1NzBCOVx1NTFGQlx1ODNEQ1x1NTM1NVx1NTkxNlx1OTBFOFx1NTE3M1x1OTVFRFxuICBjb25zdCBvbkRvY0NsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKG1lbnVFbCAmJiAhbWVudUVsLmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBOb2RlKSAmJiAhZW50cnlFbD8uY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpKSB7XG4gICAgICBjbG9zZU1lbnUoKVxuICAgIH1cbiAgfVxuICBjb25zdCBvbktleSA9IChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQgPT4ge1xuICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSBjbG9zZU1lbnUoKVxuICB9XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Eb2NDbGljaywgdHJ1ZSlcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5LCB0cnVlKVxuXG4gIC8vIFx1OEJCRVx1N0Y2RVx1OTg3NVx1ODBGNlx1NTZDQVx1NTIwN1x1NjM2Mlx1NTQwRVx1RkYwQ1x1OTFDRFx1NjVCMFx1OEJDNFx1NEYzMFx1ODNEQ1x1NTM1NVx1NjYzRVx1OTY5MFx1MzAwMlxuICBjb25zdCBvblZpc2liaWxpdHlFdmVudCA9ICgpOiB2b2lkID0+IGVuc3VyZUVudHJ5KClcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RzaHI6dmlzaWJpbGl0eS1jaGFuZ2VkJywgb25WaXNpYmlsaXR5RXZlbnQpXG4gIC8vIFx1N0E5N1x1NTNFM1x1NUMzQVx1NUJGOFx1NTNEOFx1NTMxNlx1NEYxQVx1OEJBOVx1OTUxQVx1NzBCOVx1NjM2Mlx1NEY0RFx1N0Y2RVx1RkYwQ1x1NTZGQVx1NUI5QVx1NUI5QVx1NEY0RFx1NzY4NFx1NTE2NVx1NTNFM1x1ODk4MVx1OERERlx1Nzc0MFx1OEQ3MFxuICBjb25zdCBvblJlc2l6ZSA9ICgpOiB2b2lkID0+IGVuc3VyZUVudHJ5KClcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKVxuXG4gIC8vIFx1OTk5Nlx1NkIyMVx1NjMwMlx1OEY3RFx1RkYwOFx1NTNFRlx1ODBGRCBzaGVsbCBcdThGRDhcdTZDQTFcdTZFMzJcdTY3RDNcdTVCOENcdUZGMENcdThGNkVcdThCRTJcdTUxRTBcdTZCMjFcdUZGMDlcbiAgbGV0IGF0dGVtcHRzID0gMFxuICBjb25zdCB0cnlNb3VudCA9ICgpOiB2b2lkID0+IHtcbiAgICBlbnN1cmVFbnRyeSgpXG4gICAgLy8gXHU3NkVFXHU2ODA3XHU2NjJGXHUzMDBDXHU1REYyXHU3RUNGXHU1QjlBXHU0RjREXHU1MjMwXHU5NTFBXHU3MEI5XHU1REU2XHU0RkE3XHUzMDBEXHVGRjBDXHU4MDBDXHU0RTBEXHU2NjJGXHUzMDBDXHU5ODc1XHU5NzYyXHU0RTBBXHU2NzA5XHU0RTJBXHU1MTY1XHU1M0UzXHUzMDBEXHUzMDAyXG4gICAgLy8gXHU5NTFBXHU3MEI5XHU1QzFBXHU2NzJBXHU2RTMyXHU2N0QzXHU1MUZBXHU2NzY1XHU2NUY2XHU3RUU3XHU3RUVEXHU5MUNEXHU4QkQ1XHVGRjBDXHU2NzAwXHU1OTFBIDMwIFx1NkIyMSBcdTAwRDcgNTAwbXNcdTMwMDJcbiAgICBjb25zdCBleGlzdGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KEVOVFJZX1NFTEVDVE9SKVxuICAgIGNvbnN0IGFuY2hvciA9IGZpbmRBbmNob3JCdXR0b24oKVxuICAgIGxldCBwbGFjZWQgPSBmYWxzZVxuICAgIGlmIChleGlzdGluZz8ucGFyZW50RWxlbWVudCAmJiBhbmNob3IpIHtcbiAgICAgIHBsYWNlZCA9IHBsYWNlTmVhckFuY2hvcihleGlzdGluZy5wYXJlbnRFbGVtZW50LCBhbmNob3IpXG4gICAgfVxuICAgIGlmICghcGxhY2VkICYmIGF0dGVtcHRzIDwgNjApIHtcbiAgICAgIGF0dGVtcHRzICs9IDFcbiAgICAgIHNldFRpbWVvdXQodHJ5TW91bnQsIDUwMClcbiAgICB9XG4gIH1cbiAgdHJ5TW91bnQoKVxuXG4gIHJldHVybiAoKSA9PiB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gICAgb2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Eb2NDbGljaywgdHJ1ZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXksIHRydWUpXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RzaHI6dmlzaWJpbGl0eS1jaGFuZ2VkJywgb25WaXNpYmlsaXR5RXZlbnQpXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKVxuICAgIGVudHJ5RWw/LnJlbW92ZSgpXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RzaHItZmFsbGJhY2staG9zdCcpPy5yZW1vdmUoKVxuICAgIGNsZWFudXBNZW51KClcbiAgfVxufVxuIiwgIi8qKlxuICogc2V0dGluZ3MtY2FyZCBcdTIwMTRcdTIwMTQgXHU4QkJFXHU3RjZFXHU5ODc1XHUzMDBDZHNoLXJlZ2lvbiBcdTZFOTBcdTdCQTFcdTc0MDZcdTMwMERcdTUzNjFcdTcyNDdcdTMwMDJcbiAqIFx1NjNEMFx1NEY5Qlx1NTNGM1x1NEUwQVx1ODlEMlx1ODNEQ1x1NTM1NVx1NzY4NFx1NjYzRVx1NzkzQS9cdTk2OTBcdTg1Q0ZcdTgwRjZcdTU2Q0FcdTVGMDBcdTUxNzNcdUZGMENcdTcyQjZcdTYwMDFcdTVCNTggc2VydmVyXHVGRjA4cmVnaW9uLmpzb25cdUZGMDlcdTMwMDJcbiAqIFJlYWN0IFx1N0VDNFx1NEVGNlx1RkYwOGhvc3QgXHU2M0QwXHU0RjlCIHJlYWN0XHVGRjBDYnVuZGxlIFx1NTkxNlx1N0Y2RVx1RkYwOVx1MzAwMlxuICovXG5cbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgYXMgaCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdHlwZSBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGZldGNoU3RhdHVzLCByZXF1ZXN0TWVudVZpc2libGUgfSBmcm9tICcuL2hvc3QtYXBpLmpzJ1xuaW1wb3J0IHsgemggfSBmcm9tICcuL2xvY2FsZXMuanMnXG5cbi8qKiBcdTkwMUFcdTc3RTUgaGVhZGVyIFx1ODNEQ1x1NTM1NVx1OTFDRFx1NjVCMFx1OEJDNFx1NEYzMFx1NjYzRVx1OTY5MFx1RkYwOHdpbmRvdyBcdTRFOEJcdTRFRjZcdUZGMENcdTg5RTNcdTgwMjYgUmVhY3QgXHU0RTBFIERPTSBcdTZDRThcdTUxNjVcdUZGMDlcdTMwMDIgKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaFZpc2liaWxpdHlDaGFuZ2VkKCk6IHZvaWQge1xuICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2RzaHI6dmlzaWJpbGl0eS1jaGFuZ2VkJykpXG59XG5cbmludGVyZmFjZSBDYXJkUHJvcHMge1xuICB0PzogKGtleTogc3RyaW5nKSA9PiBzdHJpbmdcbn1cblxuZnVuY3Rpb24gQ2FyZFNoZWxsKHByb3BzOiB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xuICBjaGlsZHJlbjogUmVhY3ROb2RlXG59KTogUmVhY3ROb2RlIHtcbiAgcmV0dXJuIGgoJ2RpdicsIHsgc3R5bGU6IHsgcGFkZGluZzogJzEycHggMCcgfSB9LFxuICAgIGgoJ2RpdicsIHsgc3R5bGU6IHsgZm9udFdlaWdodDogNjAwLCBmb250U2l6ZTogMTQsIG1hcmdpbkJvdHRvbTogNCB9IH0sIHByb3BzLnRpdGxlKSxcbiAgICBoKCdkaXYnLCB7IHN0eWxlOiB7IGNvbG9yOiAndmFyKC0tY29sb3ItdGV4dC1zZWNvbmRhcnksIzhiOTQ5ZSknLCBmb250U2l6ZTogMTIsIG1hcmdpbkJvdHRvbTogMTAgfSB9LCBwcm9wcy5kZXNjcmlwdGlvbiksXG4gICAgcHJvcHMuY2hpbGRyZW4sXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlZ2lvblNldHRpbmdzQ2FyZChfcHJvcHM6IENhcmRQcm9wcyk6IFJlYWN0Tm9kZSB7XG4gIGNvbnN0IFt2aXNpYmxlLCBzZXRWaXNpYmxlXSA9IHVzZVN0YXRlPGJvb2xlYW4gfCBudWxsPihudWxsKVxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2Vyciwgc2V0RXJyXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgYWxpdmUgPSB0cnVlXG4gICAgZmV0Y2hTdGF0dXMoKVxuICAgICAgLnRoZW4oKHMpID0+IHtcbiAgICAgICAgaWYgKGFsaXZlKSBzZXRWaXNpYmxlKHMubWVudVZpc2libGUgIT09IGZhbHNlKVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIGlmIChhbGl2ZSkgc2V0VmlzaWJsZSh0cnVlKVxuICAgICAgfSlcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWxpdmUgPSBmYWxzZVxuICAgIH1cbiAgfSwgW10pXG5cbiAgY29uc3QgdG9nZ2xlID0gKCk6IHZvaWQgPT4ge1xuICAgIGlmICh2aXNpYmxlID09PSBudWxsIHx8IGJ1c3kpIHJldHVyblxuICAgIGNvbnN0IG5leHQgPSAhdmlzaWJsZVxuICAgIHNldEJ1c3kodHJ1ZSlcbiAgICBzZXRFcnIobnVsbClcbiAgICByZXF1ZXN0TWVudVZpc2libGUobmV4dClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgc2V0VmlzaWJsZShuZXh0KVxuICAgICAgICBkaXNwYXRjaFZpc2liaWxpdHlDaGFuZ2VkKClcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGU6IHVua25vd24pID0+IHNldEVycihlIGluc3RhbmNlb2YgRXJyb3IgPyBlLm1lc3NhZ2UgOiBTdHJpbmcoZSkpKVxuICAgICAgLmZpbmFsbHkoKCkgPT4gc2V0QnVzeShmYWxzZSkpXG4gIH1cblxuICBjb25zdCBjYXBzdWxlID0gaChcbiAgICAnYnV0dG9uJyxcbiAgICB7XG4gICAgICBvbkNsaWNrOiB0b2dnbGUsXG4gICAgICBkaXNhYmxlZDogdmlzaWJsZSA9PT0gbnVsbCB8fCBidXN5LFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1mbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogNixcbiAgICAgICAgcGFkZGluZzogJzRweCAxNHB4JywgYm9yZGVyUmFkaXVzOiA5OTksIGZvbnRTaXplOiAxMywgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1jb2xvci1ib3JkZXItZGVmYXVsdCxyZ2JhKDI0MCwyNDYsMjUyLC4yKSknLFxuICAgICAgICBiYWNrZ3JvdW5kOiB2aXNpYmxlID8gJ3JnYmEoNjMsMTg1LDgwLC4xNSknIDogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgY29sb3I6IHZpc2libGUgPyAnIzNmYjk1MCcgOiAndmFyKC0tY29sb3ItdGV4dC1zZWNvbmRhcnksIzhiOTQ5ZSknLFxuICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICB9LFxuICAgICAgJ2FyaWEtcHJlc3NlZCc6IFN0cmluZyh2aXNpYmxlID09PSB0cnVlKSxcbiAgICB9LFxuICAgIGgoJ3NwYW4nLCB7XG4gICAgICBzdHlsZTogeyB3aWR0aDogOCwgaGVpZ2h0OiA4LCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiAnY3VycmVudENvbG9yJywgZGlzcGxheTogJ2lubGluZS1ibG9jaycgfSxcbiAgICB9KSxcbiAgICB2aXNpYmxlID8gemhbJ2NhcmQuc2hvdyddIDogemhbJ2NhcmQuaGlkZSddLFxuICApXG5cbiAgcmV0dXJuIENhcmRTaGVsbCh7XG4gICAgdGl0bGU6IHpoWydjYXJkLnRpdGxlJ10sXG4gICAgZGVzY3JpcHRpb246IHpoWydjYXJkLmRlc2NyaXB0aW9uJ10sXG4gICAgY2hpbGRyZW46IGgoJ2RpdicsIHsgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMiwgZmxleFdyYXA6ICd3cmFwJyB9IH0sXG4gICAgICBoKCdkaXYnLCB7IHN0eWxlOiB7IGZvbnRTaXplOiAxMyB9IH0sXG4gICAgICAgIHpoWydjYXJkLm1lbnVWaXNpYmxlJ10sXG4gICAgICAgIGgoJ2RpdicsIHsgc3R5bGU6IHsgY29sb3I6ICd2YXIoLS1jb2xvci10ZXh0LXRlcnRpYXJ5LCM2ZTc2ODEpJywgZm9udFNpemU6IDEyIH0gfSwgemhbJ2NhcmQubWVudVZpc2libGVEZXNjJ10pLFxuICAgICAgKSxcbiAgICAgIGNhcHN1bGUsXG4gICAgICBlcnIgPyBoKCdzcGFuJywgeyBzdHlsZTogeyBjb2xvcjogJyNmODUxNDknLCBmb250U2l6ZTogMTIgfSB9LCBlcnIpIDogbnVsbCxcbiAgICApLFxuICB9KVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7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UUFDQSxhQUFBQSxlQUFFLFFBQVE7QUFBQSxNQUNSLE9BQU8sRUFBRSxPQUFPLEdBQUcsUUFBUSxHQUFHLGNBQWMsT0FBTyxZQUFZLGdCQUFnQixTQUFTLGVBQWU7QUFBQSxJQUN6RyxDQUFDO0FBQUEsSUFDRCxVQUFVLEdBQUcsV0FBVyxJQUFJLEdBQUcsV0FBVztBQUFBLEVBQzVDO0FBRUEsU0FBTyxVQUFVO0FBQUEsSUFDZixPQUFPLEdBQUcsWUFBWTtBQUFBLElBQ3RCLGFBQWEsR0FBRyxrQkFBa0I7QUFBQSxJQUNsQyxjQUFVLGFBQUFBO0FBQUEsTUFBRTtBQUFBLE1BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxRQUFRLFlBQVksVUFBVSxLQUFLLElBQUksVUFBVSxPQUFPLEVBQUU7QUFBQSxVQUMvRixhQUFBQTtBQUFBLFFBQUU7QUFBQSxRQUFPLEVBQUUsT0FBTyxFQUFFLFVBQVUsR0FBRyxFQUFFO0FBQUEsUUFDakMsR0FBRyxrQkFBa0I7QUFBQSxZQUNyQixhQUFBQSxlQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxzQ0FBc0MsVUFBVSxHQUFHLEVBQUUsR0FBRyxHQUFHLHNCQUFzQixDQUFDO0FBQUEsTUFDL0c7QUFBQSxNQUNBO0FBQUEsTUFDQSxVQUFNLGFBQUFBLGVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLFdBQVcsVUFBVSxHQUFHLEVBQUUsR0FBRyxHQUFHLElBQUk7QUFBQSxJQUN4RTtBQUFBLEVBQ0YsQ0FBQztBQUNIOzs7QUpsRk8sSUFBTSxPQUFPO0FBTWIsSUFBTSxTQUFTLENBQUMsT0FBTztBQUc5QixJQUFJLFVBQVU7QUFXUCxTQUFTLE1BQU0sS0FBc0I7QUFDMUMsTUFBSSxRQUFTO0FBQ2IsWUFBVTtBQUdWLFNBQU8saUJBQWlCLDJCQUEyQixNQUFNO0FBQUEsRUFHekQsQ0FBQztBQUVELE1BQUk7QUFDRixvQkFBZ0I7QUFBQSxNQUNkLHFCQUFxQixNQUFNLDBCQUEwQjtBQUFBLElBQ3ZELENBQUM7QUFBQSxFQUNILFNBQVMsT0FBTztBQUNkLFlBQVEsS0FBSywwQ0FBMEMsS0FBSztBQUFBLEVBQzlEO0FBSUEsTUFBSSxJQUFJLE9BQU8sVUFBVSxJQUFJLE1BQU0sVUFBVTtBQUMzQyxRQUFJO0FBQ0YsVUFBSSxNQUFNO0FBQUEsUUFBTztBQUFBLFFBQXdCLE1BQ3ZDLElBQUksTUFBTTtBQUFBLFVBQ1I7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLEtBQUs7QUFBQSxZQUNMLFFBQVE7QUFBQSxZQUNSLFFBQVEsT0FBTyxDQUFDO0FBQUEsVUFDbEI7QUFBQSxVQUNBLFVBQU0sY0FBQUMsZUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBQUEsSUFDRixTQUFTLE9BQU87QUFDZCxjQUFRLEtBQUssK0NBQStDLEtBQUs7QUFBQSxJQUNuRTtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImgiLCAiaCJdCn0K

return module.exports; } });