import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    '@/assets/defaults.css',
    '@/assets/style.css',
    '@/assets/transitions.css',
  ],
  pageTransition: { name: 'slide-fade' },
  meta: {
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    title: 'Flock - Focus sessions',
  },
})
