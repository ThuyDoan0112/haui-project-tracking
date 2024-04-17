<script setup lang="ts">
const reportsStore = useReportsStore()
const { fetchReports } = reportsStore
const { reports } = storeToRefs(reportsStore)

const projectId = computed(() => {
  return useRoute().query.projectId
})

await fetchReports(+projectId.value)

const reportItems = computed(() => {
  return reports.value.map((report) => {
    return {
      label: report.name,
      content: report.description || 'No description',
      icon: 'i-heroicons-document-text',
    }
  })
})
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UAccordion :items="reportItems" />
  </UDashboardPanelContent>
</template>
