<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()

const projectsStore = useProjectStore()
const { project } = storeToRefs(projectsStore)

const classStore = useClassesStore();
const { isTeacher, classDetail } = storeToRefs(classStore);

await projectsStore.fetchProject(+route.params.id)
await classStore.fetchClass(+useRoute().query.classId)

const breadcrumbs = computed(() => {
  return [
    {
      label: classDetail.value?.name,
      to: `/classes/${classDetail.value?.id}/students`,
    },
    {
      label: project.value?.name,
      to: `/projects/${route.params.id}?classId=${route.query.classId}`
    },
  ]
})

const { $i18n } = useNuxtApp()

const links = computed(() => {
  return [
    {
      label: $i18n.t('project.report'),
      icon: 'i-heroicons-calendar',
      to: `/projects/${route.params.id}?classId=${route.query.classId}`,
      exact: true,
    },
    !isTeacher.value &&
    {
      label: $i18n.t('project.document'),
      icon: 'i-heroicons-document-text',
      to: `/projects/${route.params.id}/documents?classId=${route.query.classId}`,
      exact: true,
    },
    {
      label: $i18n.t('project.timeline'),
      icon: 'i-heroicons-chart-bar',
      to: `/projects/${route.params.id}/timeline?classId=${route.query.classId}`,
      exact: true,
    },
    {
      label: $i18n.t('project.source'),
      icon: 'i-heroicons-document-text',
      to: `/projects/${route.params.id}/sources?classId=${route.query.classId}`,
      exact: true,
    },
  ]
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar >

        <template #title>
          <span v-if="!isTeacher">{{ project?.name }}</span>
          <UBreadcrumb v-else :links="breadcrumbs" />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>
</template>
