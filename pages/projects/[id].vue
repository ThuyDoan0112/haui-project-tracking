<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()

const projectsStore = useProjectStore()
const { project } = storeToRefs(projectsStore)

const classStore = useClassesStore();
const { isTeacher } = storeToRefs(classStore);

await projectsStore.fetchProject(+route.params.id)

const links = computed(() => {
  return [
    {
      label: 'Overview',
      icon: 'i-heroicons-calendar',
      to: `/projects/${route.params.id}?classId=${route.query.classId}`,
      exact: true,
    },
    {
      label: 'Sources',
      icon: 'i-heroicons-document-text',
      to: `/projects/${route.params.id}/sources?classId=${route.query.classId}`,
      exact: true,
    },
    !isTeacher.value &&
    {
      label: 'Documents',
      icon: 'i-heroicons-document-text',
      to: `/projects/${route.params.id}/documents?classId=${route.query.classId}`,
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
