<script setup lang="ts">
const documents = ref([
  {
    id: 1,
    title: 'Document 1',
    description: 'This is the first document.',
    links: [
      {
        color: 'gray',
        trailingIcon: 'i-heroicons-arrow-down-tray',
      },
    ],
  },
  {
    id: 2,
    title: 'Document 2',
    description: 'This is the second document.',
    links: [
      {
        color: 'gray',
        trailingIcon: 'i-heroicons-arrow-down-tray',
      },
    ],
  },
  {
    id: 3,
    title: 'Document 3',
    description: 'This is the second document.',
    links: [
      {
        color: 'gray',
        trailingIcon: 'i-heroicons-arrow-down-tray',
      },
    ],
  },
  {
    id: 4,
    title: 'Document 4',
    description: 'This is the second document.',
    links: [
      {
        color: 'gray',
        trailingIcon: 'i-heroicons-arrow-down-tray',
      },
    ],
  },
  {
    id: 5,
    title: 'Document 5',
    description: 'This is the second document.',
    links: [
      {
        color: 'gray',
        trailingIcon: 'i-heroicons-arrow-down-tray',
      },
    ],
  },
])
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UDashboardSection
      title="Class Documents"
      description="Documents related to this class."
      :ui="{ wrapper: '*:pt-0' }"
      :links="[
        {
          label: `${documents.length} Documents`,
          color: 'gray',
          icon: 'i-heroicons-document-text',
        },
      ]"
    >
      <UDashboardCard
        v-for="document in documents"
        :key="document.id"
        icon="i-heroicons-document-text"
        :title="document.title"
        :description="document.description"
        :links="document.links"
      />
    </UDashboardSection>
  </UDashboardPanelContent>
</template>

<style scoped></style>
