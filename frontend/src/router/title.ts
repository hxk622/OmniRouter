import { i18n } from '@/i18n'

export const DEFAULT_DOCUMENT_TITLE_BASE = '世界级大模型聚合平台'

/**
 * 统一生成页面标题，避免多处写入 document.title 产生覆盖冲突。
 * 优先使用 titleKey 通过 i18n 翻译，fallback 到静态 routeTitle。
 */
export function resolveDocumentTitle(routeTitle: unknown, titleBase?: string, titleKey?: string): string {
  const normalizedTitleBase = typeof titleBase === 'string' && titleBase.trim()
    ? titleBase.trim()
    : DEFAULT_DOCUMENT_TITLE_BASE

  if (typeof titleKey === 'string' && titleKey.trim()) {
    const translated = i18n.global.t(titleKey)
    if (translated && translated !== titleKey) {
      return `${translated} - ${normalizedTitleBase}`
    }
  }

  if (typeof routeTitle === 'string' && routeTitle.trim()) {
    return `${routeTitle.trim()} - ${normalizedTitleBase}`
  }

  return normalizedTitleBase
}
