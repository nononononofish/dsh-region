/**
 * dsh-region HTTP 路由 —— 桥接浏览器 Web UI 与 host 端 RegionService。
 *
 * 只负责解析请求、调用服务、序列化响应；切换/探测逻辑全在 RegionService。
 * 安全：写入型路由仅接受同源 POST（sameOrigin 校验），防恶意页面驱动本地服务。
 */
function sendJson(response, status, payload) {
    response.writeHead(status, {
        'cache-control': 'no-store',
        'content-type': 'application/json; charset=utf-8',
    });
    response.end(JSON.stringify(payload));
}
/** 同源校验：无 Origin（如 `<a download>` 导航）放行；有 Origin 必须与 Host 一致。 */
function sameOrigin(request) {
    const origin = request.headers.origin;
    if (origin === undefined)
        return true;
    try {
        const host = request.headers.host;
        if (host === undefined)
            return false;
        return new URL(origin).host === host;
    }
    catch {
        return false;
    }
}
/** 读取并解析 JSON 请求体，超过上限（默认 4 KiB）拒绝。 */
async function readJsonBody(request, maxBytes = 4096) {
    const chunks = [];
    let size = 0;
    for await (const chunk of request) {
        const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        size += buffer.length;
        if (size > maxBytes)
            throw new Error('request body too large');
        chunks.push(buffer);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}
/** 只接受指定方法的请求，否则 405。 */
function methodGuard(request, response, allowed) {
    if (request.method === allowed)
        return true;
    response.writeHead(405, { allow: allowed });
    response.end();
    return false;
}
const MODES = ['auto', 'main', 'backup'];
/**
 * 注册 dsh-region 的全部 HTTP 路由，返回 disposer 数组。
 * - GET  /dsh-region/status  完整状态（模式/生效源/两源延迟/菜单显隐）
 * - POST /dsh-region/use     { mode } 切换 auto|main|backup
 * - POST /dsh-region/menu    { visible } 右上角菜单显隐开关
 */
export function registerRegionRoutes(webServer, service) {
    const disposers = [];
    disposers.push(webServer.register({
        kind: 'exact',
        path: '/dsh-region/status',
        handler: async (request, response) => {
            if (!methodGuard(request, response, 'GET'))
                return;
            try {
                const s = service.status();
                // 默认用最近一次探测缓存（秒回，避免并发请求打爆双源探测）；
                // 显式 ?probe=1（菜单「立即测速」）才实时探测两源。
                const url = new URL(request.url ?? '/', 'http://localhost');
                const wantProbe = url.searchParams.get('probe') === '1';
                const probe = wantProbe
                    ? await service.probe()
                    : service.getLastProbe();
                sendJson(response, 200, {
                    mode: s.mode,
                    appliedRegistry: s.appliedRegistry,
                    mainRegistry: s.mainRegistry,
                    backupRegistry: s.backupRegistry,
                    lastProbeAt: s.lastProbeAt,
                    lastSwitchAt: s.lastSwitchAt,
                    lastError: s.lastError,
                    menuVisible: s.menuVisible,
                    main: probe?.main ?? null,
                    backup: probe?.backup ?? null,
                });
            }
            catch (error) {
                sendJson(response, 500, { error: error instanceof Error ? error.message : String(error) });
            }
        },
    }));
    disposers.push(webServer.register({
        kind: 'exact',
        path: '/dsh-region/use',
        handler: async (request, response) => {
            if (!methodGuard(request, response, 'POST'))
                return;
            if (!sameOrigin(request))
                return sendJson(response, 403, { error: 'untrusted origin' });
            try {
                const body = (await readJsonBody(request));
                const mode = body.mode;
                if (mode === undefined || !MODES.includes(mode)) {
                    return sendJson(response, 400, { error: `mode 必须是 ${MODES.join('|')}` });
                }
                const result = service.setMode(mode);
                sendJson(response, result.ok ? 200 : 400, result);
            }
            catch (error) {
                sendJson(response, 400, { error: error instanceof Error ? error.message : String(error) });
            }
        },
    }));
    disposers.push(webServer.register({
        kind: 'exact',
        path: '/dsh-region/menu',
        handler: async (request, response) => {
            if (!methodGuard(request, response, 'POST'))
                return;
            if (!sameOrigin(request))
                return sendJson(response, 403, { error: 'untrusted origin' });
            try {
                const body = (await readJsonBody(request));
                if (typeof body.visible !== 'boolean') {
                    return sendJson(response, 400, { error: 'visible 必须是布尔值' });
                }
                service.setMenuVisible(body.visible);
                sendJson(response, 200, { ok: true, visible: body.visible });
            }
            catch (error) {
                sendJson(response, 400, { error: error instanceof Error ? error.message : String(error) });
            }
        },
    }));
    return disposers;
}
