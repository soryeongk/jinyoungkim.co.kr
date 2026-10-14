import { profile } from './app/data/profile'
import { getSiteDescription, getSiteTitle } from './app/utils/seo'

const title = getSiteTitle(profile)
const description = getSiteDescription(profile)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: true },

  css: [
    'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css',
    '~/assets/css/base.css',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'ko' },
      title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: description },
        { name: 'theme-color', content: '#fafaf8', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#111111', media: '(prefers-color-scheme: dark)' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      // NUXT_PUBLIC_SITE_URL 환경 변수로 덮어쓴다. OG 이미지/URL의 절대 경로 기준.
      siteUrl: 'https://jinyoungkim.co.kr',
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: false,
    },
  },
})
