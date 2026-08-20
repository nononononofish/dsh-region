/**
 * dsh-region —— DSH 下载源主备切换插件
 *
 * 核心职责：
 *  - 维护下载源状态：auto（自动主备）/ main（锁定国内主源）/ backup（锁定国外备源）
 *  - 将当前生效源写入 web profile 的 .npmrc，使 dsh 原生命令（如 dsh plugin add）也走该源
 *  - auto 模式下定时探测主源健康：主源超时/失败自动切到备用源，主源恢复自动切回
 *  - 手动选择（/region use main|backup）持久化到 ~/.dsh/region.json，重启沿用
 *  - 提供 /region 命令与 'region' 服务（供 P1 Web UI 通过 RPC 调用）
 *
 * 零运行时依赖：仅使用 Node 内置模块与全局 fetch。
 */
export declare const name = "dsh-region";
/** Cordis 依赖注入声明：本插件需要 commands 服务注册 /region 命令 */
export declare const inject: string[];
export type RegionMode = 'auto' | 'main' | 'backup';
interface RegionConfig {
    mode: RegionMode;
    /** 主源：国内镜像 */
    mainRegistry: string;
    /** 备源：官方源 */
    backupRegistry: string;
    /** 健康探测用的样本包（两个源上都长期存在的稳定小包） */
    probePackage: string;
    /** 单次探测超时（毫秒） */
    timeoutMs: number;
    /** auto 模式定时探测间隔（毫秒） */
    probeIntervalMs: number;
}
export declare function apply(rawContext: unknown, config?: Partial<RegionConfig>): void;
export {};
