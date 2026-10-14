<script setup lang="ts">
import { links } from '~/data/links'
import { profile } from '~/data/profile'
</script>

<template>
  <div class="page">
    <main class="card">
      <ProfileHeader
        :name="profile.name"
        :photo="profile.photo"
      />
      <ContactLinks
        :email="profile.email"
        :instagram="profile.instagram"
      />
      <FeaturedLinks :links="links" />
    </main>
    <AppFooter :name="profile.name.en" />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding: var(--space-12) var(--space-6) var(--space-6);
}

.card {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  text-align: center;
}
</style>
