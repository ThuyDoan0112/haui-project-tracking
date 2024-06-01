// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@nuxt/fonts', '@vueuse/nuxt', '@pinia/nuxt', "@nuxtjs/i18n"],
  ui: {
    icons: ['heroicons', 'simple-icons'],
    safelistColors: ['primary', 'red', 'orange', 'green'],
  },
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  routeRules: {
    '/api/**': {
      proxy: `${process.env.API_BASE_URL}/api/v1/**`
    }
  }
})