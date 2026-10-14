<script setup lang="ts">
import type { ExternalLink } from '~/types/link'

defineProps<{
  links: ExternalLink[]
}>()

function formatDate(date: string) {
  return date.replaceAll('-', '.')
}
</script>

<template>
  <section
    v-if="links.length > 0"
    class="featured"
    aria-labelledby="featured-heading"
  >
    <h2
      id="featured-heading"
      class="heading"
      lang="en"
    >
      Links
    </h2>
    <ul class="list">
      <li
        v-for="link in links"
        :key="link.url"
        class="item"
      >
        <a
          class="title"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ link.title }}
          <span class="visually-hidden">(새 창에서 열림)</span>
        </a>
        <p class="meta">
          {{ link.source }}
          <template v-if="link.date">
            <span aria-hidden="true">·</span>
            <time :datetime="link.date">{{ formatDate(link.date) }}</time>
          </template>
        </p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.featured {
  width: 100%;
  padding-top: var(--space-8);
  border-top: 1px solid color-mix(in srgb, var(--color-text-muted) 25%, transparent);
}

.heading {
  margin-bottom: var(--space-4);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: 0;
  list-style: none;
}

.title {
  font-size: 0.9375rem;
  text-decoration: none;
  text-underline-offset: 4px;
}

.title:hover {
  text-decoration: underline;
}

.meta {
  display: flex;
  justify-content: center;
  gap: var(--space-1);
  margin-top: 2px;
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}
</style>
