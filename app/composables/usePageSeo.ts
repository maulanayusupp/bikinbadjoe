import { BUSINESS } from '~/config/business'

interface PageSeoOptions {
  /** i18n key prefix under `meta`, e.g. "services" -> meta.services.title */
  key?: string
  title?: string
  description?: string
  image?: string
  /** Path (without locale prefix) for canonical + og:url, e.g. "/services" */
  path?: string
}

/**
 * Centralized SEO helper. Resolves title/description from i18n, wires up
 * Open Graph + Twitter cards, canonical URL, and localized <html lang>.
 * Every page calls this once.
 */
export function usePageSeo(options: PageSeoOptions = {}) {
  const { t, locale } = useI18n()
  const localeHead = useLocaleHead({ addSeoAttributes: true })
  const config = useRuntimeConfig()
  const siteUrl = (config.public.siteUrl as string) || BUSINESS.siteUrl
  // Resolve the actual serving origin (SSR request host or window). og:image
  // must be an absolute, reachable URL for WhatsApp/Instagram to render it, so
  // we derive it from where the page is actually served, not a hardcoded domain.
  const origin = useRequestURL().origin || siteUrl

  const resolve = (field: 'title' | 'description') => {
    if (field === 'title' && options.title) return options.title
    if (field === 'description' && options.description) return options.description
    if (options.key) return t(`meta.${options.key}.${field}`)
    return t(`meta.default${field === 'title' ? 'Title' : 'Description'}`)
  }

  const title = resolve('title')
  const description = resolve('description')
  const image = options.image || `${origin}/og-image.png`
  const url = `${siteUrl}${options.path ?? ''}`

  useHead(() => ({
    htmlAttrs: localeHead.value.htmlAttrs,
    link: [...(localeHead.value.link || [])],
    meta: [...(localeHead.value.meta || [])],
  }))

  const ogTitle = `${title} · ${BUSINESS.brandName}`
  const ogLocale = locale.value === 'en' ? 'en_US' : 'id_ID'
  const ogLocaleAlt = locale.value === 'en' ? 'id_ID' : 'en_US'

  useSeoMeta({
    title,
    description,
    ogTitle,
    ogDescription: description,
    ogType: 'website',
    ogUrl: url,
    ogSiteName: BUSINESS.brandName,
    ogLocale,
    ogLocaleAlternate: ogLocaleAlt,
    // Explicit image metadata — WhatsApp & Instagram need an absolute URL plus
    // dimensions/type to render a rich link preview reliably.
    ogImage: image,
    ogImageSecureUrl: image,
    ogImageType: 'image/png',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: ogTitle,
    twitterCard: 'summary_large_image',
    twitterTitle: ogTitle,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: ogTitle,
  })
}
