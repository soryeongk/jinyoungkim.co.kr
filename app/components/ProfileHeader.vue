<script setup lang="ts">
import type { Profile } from '~/types/profile'

defineProps<{
  name: Profile['name']
  photo: Profile['photo']
}>()
</script>

<template>
  <header class="profile-header">
    <img
      class="photo"
      :src="photo.src"
      :alt="photo.alt"
      :width="photo.width"
      :height="photo.height"
      loading="eager"
      fetchpriority="high"
      decoding="async"
    >
    <h1 class="name">
      <span class="name-ko">{{ name.ko }}</span>
      <span
        class="name-en"
        lang="en"
      >{{ name.en }}</span>
    </h1>
  </header>
</template>

<style scoped>
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.photo {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  font-weight: inherit;
}

.name-ko {
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.name-en {
  font-size: 0.9375rem;
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
}
</style>
