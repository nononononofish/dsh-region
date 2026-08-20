/**
 * dsh-region client 文案 —— 中英双语集中管理（默认中文，插件面向国内用户）。
 */

export type RegionKey =
  | 'menu.title'
  | 'menu.statusGreen'
  | 'menu.statusYellow'
  | 'menu.statusRed'
  | 'menu.statusUnknown'
  | 'menu.auto'
  | 'menu.main'
  | 'menu.backup'
  | 'menu.probe'
  | 'menu.current'
  | 'menu.hidden'
  | 'card.title'
  | 'card.description'
  | 'card.menuVisible'
  | 'card.menuVisibleDesc'
  | 'card.show'
  | 'card.hide'
  | 'err.fetchFailed'

export const zh: Record<RegionKey, string> = {
  'menu.title': 'dsh-region 源管理',
  'menu.statusGreen': '主源正常，当前使用国内镜像',
  'menu.statusYellow': '主源不可用，已自动切到官方源',
  'menu.statusRed': '国内镜像与官方源均不可用',
  'menu.statusUnknown': '状态未知，点击「立即测速」检测',
  'menu.auto': '自动切换',
  'menu.main': '国内镜像',
  'menu.backup': '官方源',
  'menu.probe': '立即测速',
  'menu.current': '当前',
  'menu.hidden': '（菜单已隐藏，可在设置中开启）',
  'card.title': 'dsh-region 源管理',
  'card.description': 'DSH 下载源主备切换：国内镜像为主、官方源为备，故障自动切换',
  'card.menuVisible': '右上角源管理菜单',
  'card.menuVisibleDesc': '在会话页右上角（下载 Log 左侧）显示源管理下拉菜单',
  'card.show': '显示',
  'card.hide': '隐藏',
  'err.fetchFailed': '连接 dsh-region 服务失败',
}

export const en: Record<RegionKey, string> = {
  'menu.title': 'dsh-region sources',
  'menu.statusGreen': 'Primary healthy, using China mirror',
  'menu.statusYellow': 'Primary down, switched to official registry',
  'menu.statusRed': 'Both registries unreachable',
  'menu.statusUnknown': 'Unknown — click "Probe" to check',
  'menu.auto': 'Auto',
  'menu.main': 'China mirror',
  'menu.backup': 'Official registry',
  'menu.probe': 'Probe now',
  'menu.current': 'current',
  'menu.hidden': '(menu hidden — enable it in settings)',
  'card.title': 'dsh-region source manager',
  'card.description': 'DSH registry failover: China mirror primary, official backup, auto-switch',
  'card.menuVisible': 'Source menu in header',
  'card.menuVisibleDesc': 'Show the source dropdown next to "Session log" in the header',
  'card.show': 'Show',
  'card.hide': 'Hide',
  'err.fetchFailed': 'Failed to reach dsh-region service',
}
