<script setup lang="ts">
const { documents, isLoading, columns, handleFetchDocuments }
  = useDocumentsTable()

await handleFetchDocuments()

function useDocumentsTable() {
  const isLoading = ref(false)

  const documentsStore = useDocumentsStore()
  const { documents } = storeToRefs(documentsStore)

  const handleFetchDocuments = async () => {
    isLoading.value = true
    await documentsStore.fetchDocuments()
    isLoading.value = false
  }

  const columns = [
    {
      key: 'id',
      label: '#',
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'description',
      label: 'Description',
    },
  ]

  return {
    documents,
    columns,
    isLoading,
    handleFetchDocuments,
  }
}
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar title="Documents" :badge="documents.length" />

    <UTable
      :rows="documents"
      :columns="columns"
      :loading="isLoading"
      :empty-state="{
        icon: 'i-heroicons-document-text',
        label: 'No documents.',
      }"
      sort-mode="manual"
      class="w-full"
      :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
    >
      <template #name-data="{ row }">
        <div class="flex items-center gap-3">
          <ULink
            :to="`${useRuntimeConfig().public.apiBaseUrl}/${row.path}`"
            class="text-gray-900 dark:text-white font-medium"
            target="_blank"
          >
            {{ row.name }}
          </ULink>
        </div>
      </template>
    </UTable>
  </UDashboardPanel>
</template>
