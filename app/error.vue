<script setup lang="ts">
import type { NuxtError } from '#app'
import { profile } from '~/data/profile'

const props = defineProps<{
  error: NuxtError
}>()

const isNotFound = computed(() => props.error.statusCode === 404)
const title = computed(() => (isNotFound.value ? '페이지를 찾을 수 없습니다' : '문제가 발생했습니다'))

useHead({
  title: () => `${title.value} · ${profile.name.ko}`,
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <div class="page">
    <main class="content">
      <p class="code">
        {{ error.statusCode }}
      </p>
      <h1 class="title">
        {{ title }}
      </h1>
      <NuxtLink
        class="home"
        to="/"
        @click.prevent="clearError({ redirect: '/' })"
      >
        홈으로 돌아가기
      </NuxtLink>
    </main>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: var(--space-6);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
}

.code {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
}

.home {
  margin-top: var(--space-4);
  text-underline-offset: 4px;
}
</style>
