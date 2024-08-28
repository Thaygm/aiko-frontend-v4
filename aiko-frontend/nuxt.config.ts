// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt' 
  ],
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@/assets/styles/main.scss'
  ],
  build: {
    transpile: ['pinia', 'bootstrap'],
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
