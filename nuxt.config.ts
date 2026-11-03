import { profile } from './app/data/profile'
import { getSiteDescription, getSiteTitle } from './app/utils/seo'

const title = getSiteTitle(profile)
const description = getSiteDescription(profile)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],

  devtools: { enabled: true },

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

  css: [
    'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css',
    '~/assets/css/base.css',
  ],

  runtimeConfig: {
    public: {
      // NUXT_PUBLIC_SITE_URL 환경 변수로 덮어쓴다. OG 이미지/URL의 절대 경로 기준.
      siteUrl: 'https://jinyoungkim.co.kr',
    },
  },
  compatibilityDate: '2026-10-01',

  nitro: {
    // Cloudflare 빌드 환경에서는 cloudflare-module 프리셋이 자동 선택되어
    // 서버 진입점(index.mjs)을 요구하는 wrangler 설정이 생성된다. 완전 정적 출력으로 고정한다.
    preset: 'static',
    prerender: {
      routes: ['/'],
      crawlLinks: false,
    },
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
