// https://nuxt.com/docs/api/configuration/nuxt-config
import { BUSINESS } from './app/config/business'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@nuxt/image', '@vueuse/nuxt'],

  // Resolve components by filename (BaseButton, HeroSection) regardless of the
  // subfolder they live in, so nested organization doesn't leak into names.
  components: [{ path: '~/components', pathPrefix: false }],

  // Auto-import our services layer alongside composables/ and utils/.
  imports: {
    dirs: ['services'],
  },

  // Global stylesheets. Component-scoped styles use <style lang="scss"> with
  // design tokens auto-injected via vite.css.preprocessorOptions below.
  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Auto-inject design tokens (variables, mixins, functions) into every
          // component <style lang="scss"> block. Keeps styling centralized and
          // avoids per-file @use boilerplate. These partials emit NO css.
          additionalData: '@use "~/assets/scss/abstracts" as *;',
        },
      },
    },
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'id',
    locales: [
      { code: 'id', language: 'id-ID', name: 'Indonesia', file: 'id.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'bb_lang',
      redirectOn: 'root',
      fallbackLocale: 'id',
    },
    bundle: { optimizeTranslationDirective: false },
  },

  image: {
    quality: 80,
    format: ['webp', 'jpg'],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      titleTemplate: `%s · ${BUSINESS.brandName}`,
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800;900&display=swap',
        },
      ],
      meta: [
        { name: 'theme-color', content: BUSINESS.theme.primary },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: BUSINESS.siteUrl,
      whatsapp: BUSINESS.whatsapp,
    },
  },
})
