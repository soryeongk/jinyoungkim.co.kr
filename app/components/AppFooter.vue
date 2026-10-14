<script setup lang="ts">
defineProps<{
  name: string
}>()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <small lang="en">&copy; {{ year }} {{ name }}</small>
  </footer>
</template>

<style scoped>
.footer {
  padding-top: var(--space-8);
  text-align: center;
  color: var(--color-text-muted);
}

small {
  font-size: 0.75rem;
}
</style>
