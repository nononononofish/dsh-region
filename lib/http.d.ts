/**
 * dsh-region HTTP 路由 —— 桥接浏览器 Web UI 与 host 端 RegionService。
 *
 * 只负责解析请求、调用服务、序列化响应；切换/探测逻辑全在 RegionService。
 * 安全：写入型路由仅接受同源 POST（sameOrigin 校验），防恶意页面驱动本地服务。
 */
import type { IncomingMessage, ServerResponse } from 'node:http';
/** RegionService 的结构类型（避免循环依赖，只依赖形状）。 */
export interface RegionServiceLike {
    status(): {
        mode: 'auto' | 'main' | 'backup';
        appliedRegistry: string | null;
        mainRegistry: string;
        backupRegistry: string;
        lastProbeAt: string | null;
        lastSwitchAt: string | null;
        lastError: string | null;
        menuVisible: boolean;
        recentLog: {
            at: string;
            message: string;
        }[];
    };
    setMode(mode: 'auto' | 'main' | 'backup'): {
        ok: boolean;
        message: string;
    };
    probe(): Promise<{
        main: {
            ok: boolean;
            ms: number;
            error?: string;
        };
        backup: {
            ok: boolean;
            ms: number;
            error?: string;
        };
    }>;
    getLastProbe(): {
        main: {
            ok: boolean;
            ms: number;
            error?: string;
        };
        backup: {
            ok: boolean;
            ms: number;
            error?: string;
        };
    } | null;
    setMenuVisible(visible: boolean): void;
}
/** DSH host 提供的 WebServer 服务（dshmarket 同款形状）。 */
export interface WebServerService {
    register(route: {
        kind: 'exact' | 'prefix';
        path: string;
        handler: (request: IncomingMessage, response: ServerResponse) => void | Promise<void>;
    }): () => void;
}
/**
 * 注册 dsh-region 的全部 HTTP 路由，返回 disposer 数组。
 * - GET  /dsh-region/status  完整状态（模式/生效源/两源延迟/菜单显隐）
 * - POST /dsh-region/use     { mode } 切换 auto|main|backup
 * - POST /dsh-region/menu    { visible } 右上角菜单显隐开关
 */
export declare function registerRegionRoutes(webServer: WebServerService, service: RegionServiceLike): Array<() => void>;
