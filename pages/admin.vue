<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'admin'],
})
</script>

<template>
  <UDashboardPage>
    <NuxtPage />
  </UDashboardPage>
</template>
