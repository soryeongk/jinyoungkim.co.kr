<script setup lang="ts">
import type { Profile } from '~/types/profile'

defineProps<{
  email: Profile['email']
  instagram: Profile['instagram']
}>()
</script>

<template>
  <section
    class="contact"
    aria-labelledby="contact-heading"
  >
    <h2
      id="contact-heading"
      class="visually-hidden"
    >
      Contact
    </h2>
    <ul class="links">
      <li>
        <a
          class="link"
          :href="`mailto:${email}`"
        >
          <svg
            class="icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
            />
            <path d="m3 7 9 6 9-6" />
          </svg>
          Email
        </a>
      </li>
      <li>
        <a
          class="link"
          :href="instagram.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            class="icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="5"
            />
            <circle
              cx="12"
              cy="12"
              r="4"
            />
            <circle
              cx="17.5"
              cy="6.5"
              r="0.5"
            />
          </svg>
          Instagram
          <span class="visually-hidden">(새 창에서 열림)</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3) var(--space-8);
  padding: 0;
  list-style: none;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) 0;
  font-size: 1rem;
  text-decoration: none;
  text-underline-offset: 4px;
}

.link:hover {
  text-decoration: underline;
}

.icon {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 359px) {
  .links {
    flex-direction: column;
    align-items: center;
  }
}
</style>
