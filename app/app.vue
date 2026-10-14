<script setup lang="ts">
import { profile } from '~/data/profile'
import { getSiteDescription, getSiteTitle } from '~/utils/seo'

const { siteUrl } = useRuntimeConfig().public
const route = useRoute()

const title = getSiteTitle(profile)
const description = getSiteDescription(profile)
const absoluteUrl = (path: string) => new URL(path, siteUrl).href

useSeoMeta({
  ogType: 'website',
  ogTitle: title,
  ogDescription: description,
  ogUrl: () => absoluteUrl(route.path),
  ogImage: absoluteUrl('/og.jpg'),
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: title,
  ogLocale: 'ko_KR',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: absoluteUrl('/og.jpg'),
})

useHead({
  link: [{ rel: 'canonical', href: () => absoluteUrl(route.path) }],
})
</script>

<template>
  <NuxtPage />
</template>
