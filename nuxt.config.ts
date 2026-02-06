// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxtjs/supabase'
  ],
  supabase: {
    redirect: false
  },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY
  },


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
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',

      // SEO Core - Palavras-chave de Identidade e Proposta de Valor
      title: 'TechHub - O Santuário de Foco para Desenvolvedores Vue.js e Nuxt',
      titleTemplate: '%s | TechHub Brasil',

      meta: [
        // Primary Meta Tags
        {
          name: 'description',
          content: 'Centralize seus estudos em Vue.js, Nuxt, IA e Vibe Coding. Um hub de curadoria técnica sem distrações, feito de programador para programador.'
        },
        {
          name: 'keywords',
          content: 'Vue.js tutorial, Nuxt 3, Nuxt 4, desenvolvimento frontend, IA para programadores, copilot tutorial, vibe coding, vagas Vue.js remoto, blog tecnologia focado, curadoria desenvolvedores, estudar programação sem distração'
        },
        { name: 'author', content: 'João Paulo Costa' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },

        // Localização (Foco Brasil)
        { name: 'geo.region', content: 'BR' },
        { name: 'geo.placename', content: 'Brasil' },
        { name: 'language', content: 'Portuguese' },
        { name: 'geo.position', content: '-14.235004;-51.925280' }, // Centro do Brasil

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'TechHub Brasil' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:title', content: 'TechHub - O Santuário de Foco para Desenvolvedores Vue.js e Nuxt' },
        { property: 'og:description', content: 'Centralize seus estudos em Vue.js, Nuxt, IA e Vibe Coding. Um hub de curadoria técnica sem distrações.' },
        { property: 'og:url', content: 'https://techhub.com.br' },
        { property: 'og:image', content: 'https://techhub.com.br/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'TechHub - Portal de Curadoria Técnica para Desenvolvedores' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'TechHub - O Santuário de Foco para Desenvolvedores Vue.js e Nuxt' },
        { name: 'twitter:description', content: 'Centralize seus estudos em Vue.js, Nuxt, IA e Vibe Coding sem distrações.' },
        { name: 'twitter:image', content: 'https://techhub.com.br/og-image.png' },
        { name: 'twitter:image:alt', content: 'TechHub - Portal de Curadoria Técnica' },

        // Theme Color
        { name: 'theme-color', content: '#10b981' },
        { name: 'msapplication-TileColor', content: '#10b981' },

        // Apple
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'TechHub' }
      ],

      link: [
        { rel: 'canonical', href: 'https://techhub.com.br' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  }
})