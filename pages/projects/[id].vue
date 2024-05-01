<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()

const projectsStore = useProjectStore()
const { project } = storeToRefs(projectsStore)

await projectsStore.fetchProject(+route.params.id)

const links = computed(() => {
  return [
    {
      label: 'Overview',
      icon: 'i-heroicons-calendar',
      to: `/projects/${route.params.id}`,
      exact: true,
    },
    {
      label: 'Sources',
      icon: 'i-heroicons-document-text',
      to: `/projects/${route.params.id}/sources`,
      exact: true,
    },
  ]
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar :title="project?.name" />

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>