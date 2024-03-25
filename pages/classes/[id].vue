<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()

const classesStore = useClassesStore()
const { fetchClass } = classesStore
const { classDetail } = storeToRefs(classesStore)

await fetchClass(+route.params.id)

const links = computed(() => {
  return [
    {
      label: 'General',
      icon: 'i-heroicons-information-circle',
      to: `/classes/${route.params.id}`,
      exact: true,
    },
  ]
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="classDetail?.name" />

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
