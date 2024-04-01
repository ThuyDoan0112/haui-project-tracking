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

const {
  isVisible: isVisibleUploadDocumentModal,
  title: uploadDocumentModalTitle,
  description: uploadDocumentModalDescription,
  openModal: openUploadDocumentModal,
  closeModal: closeUploadDocumentModal,
  isLoading: isCreatingUser,
  handleUploadDocument,
} = useUploadDocumentModal()

function useUploadDocumentModal() {
  const title = 'New documents'
  const description = 'Add a new documents to your database'
  const isVisible = ref(false)
  const isLoading = ref(false)

  const openModal = () => {
    isVisible.value = true
  }

  const closeModal = () => {
    isVisible.value = false
  }

  const documentsStore = useDocumentsStore()
  const handleUploadDocument = async (files: FileList) => {
    if (isLoading.value)
      return

    isLoading.value = true
    const { count } = await documentsStore.uploadDocuments(files)
    isLoading.value = false

    if (count)
      closeModal()
  }

  return {
    title,
    description,
    isVisible,
    isLoading,
    openModal,
    closeModal,
    handleUploadDocument,
  }
}
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar title="Documents" :badge="documents.length">
      <template #right>
        <UButton
          label="Upload documents"
          trailing-icon="i-heroicons-plus"
          color="gray"
          @click="openUploadDocumentModal"
        />
      </template>
    </UDashboardNavbar>

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

    <UDashboardModal
      v-model="isVisibleUploadDocumentModal"
      :title="uploadDocumentModalTitle"
      :description="uploadDocumentModalDescription"
      :ui="{ width: 'sm:max-w-md lg:max-w-lg' }"
    >
      <DocumentsFormUpload
        :loading="isCreatingUser"
        @close="closeUploadDocumentModal"
        @submit="handleUploadDocument"
      />
    </UDashboardModal>
  </UDashboardPanel>
</template>
