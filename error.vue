<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <div class="error-page">
    <UMain>
      <UContainer>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <UNotifications />
  </div>
</template>
