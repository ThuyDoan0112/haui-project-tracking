<script setup lang="ts">
const documentsOnClassesStore = useDocumentsOnClassesStore();
const { fetchDocumentsOnClasses } = documentsOnClassesStore;
const { documentsOnClasses } = storeToRefs(documentsOnClassesStore);

const route = useRoute();
await fetchDocumentsOnClasses(+route.params.id);
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UDashboardSection
      title="Class Documents"
      description="Documents related to this class."
      :ui="{ wrapper: '*:pt-0' }"
      :links="[
        {
          label: `${documentsOnClasses.length} Documents`,
          color: 'gray',
          icon: 'i-heroicons-document-text',
        },
      ]"
    >
      <UDashboardCard
        v-for="{ document } in documentsOnClasses"
        :key="document.id"
        icon="i-heroicons-document-text"
        :title="document.name"
        :description="document.description"
      />
    </UDashboardSection>
  </UDashboardPanelContent>
</template>

<style scoped></style>
