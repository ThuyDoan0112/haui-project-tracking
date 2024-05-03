<script setup lang="ts">
const documentsOnClassesStore = useDocumentsOnClassesStore()
const { fetchDocumentsOnClasses }
  = documentsOnClassesStore
const { documentsOnClasses } = storeToRefs(documentsOnClassesStore)

const route = useRoute()
await fetchDocumentsOnClasses(+route.query.classId)
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UDashboardSection
      title="Class Documents"
      :ui="{ wrapper: '*:pt-0' }"
    >
      <UDashboardCard
        v-for="{ document } in documentsOnClasses"
        :key="document.id"
        icon="i-heroicons-document-text"
        :title="document.name"
        :description="document.description"
        :links="[{ label: 'View', color: 'gray', trailingIcon: 'i-heroicons-arrow-right-20-solid', 
        target: '_blank', 
        to:  `http://localhost:8000/${document.path}`
        }]"
      />
    </UDashboardSection>
  </UDashboardPanelContent>
</template>

<style scoped></style>
