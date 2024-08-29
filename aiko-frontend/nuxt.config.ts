// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt'
  ],
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    '@/assets/styles/main.scss'
  ],
  build: {
    transpile: ['pinia', 'bootstrap', 'vue-gtag'],
  },
  plugins: [
    '~/plugins/leaflet.client.ts'
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true
})
