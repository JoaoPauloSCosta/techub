// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt'
  ],

  // Motion module configuration
  motion: {
    directives: {
      'pop': {
        initial: { scale: 0.95, opacity: 0 },
        enter: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
      },
      'fade-up': {
        initial: { y: 20, opacity: 0 },
        enter: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 250, damping: 25 } }
      },
      'slide-right': {
        initial: { x: -20, opacity: 0 },
        enter: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 250, damping: 25 } }
      }
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'TechHub - Notícias de Tecnologia',
      meta: [
        { name: 'description', content: 'Seu portal de tecnologia com foco em Vue.js, Nuxt, IA e desenvolvimento moderno.' }
      ]
    }
  }
})