<script setup lang="ts">
const documentsOnClassesStore = useDocumentsOnClassesStore()
const { fetchDocumentsOnClasses, addDocumentsToClass }
  = documentsOnClassesStore
const { documentsOnClasses } = storeToRefs(documentsOnClassesStore)

const route = useRoute()
await fetchDocumentsOnClasses(+route.params.id)

async function handleAddDocumentToClass(documentIds: number[]) {
  const { count } = await addDocumentsToClass(+route.params.id, documentIds)

  if (count)
    closeSelectDocumentsModal()
}

const {
  isVisibleSelectDocumentsModal,
  selectDocumentsModalTitle,
  openSelectDocumentsModal,
  closeSelectDocumentsModal,
} = useSelectDocumentsModal()

function useSelectDocumentsModal() {
  const selectDocumentsModalTitle = 'Select Documents'
  const isVisibleSelectDocumentsModal = ref(false)

  const openSelectDocumentsModal = () => {
    isVisibleSelectDocumentsModal.value = true
  }

  const closeSelectDocumentsModal = () => {
    isVisibleSelectDocumentsModal.value = false
  }

  return {
    isVisibleSelectDocumentsModal,
    selectDocumentsModalTitle,
    openSelectDocumentsModal,
    closeSelectDocumentsModal,
  }
}
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UDashboardSection
      title="Class Documents"
      description="Documents related to this class."
      :ui="{ wrapper: '*:pt-0' }"
      :links="[
        {
          label: `Documents`,
          color: 'gray',
          icon: 'i-heroicons-plus',
          click: openSelectDocumentsModal,
        },
      ]"
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
      <UDashboardSlideover
        v-model="isVisibleSelectDocumentsModal"
        :title="selectDocumentsModalTitle"
        :ui="{ width: 'w-screen max-w-[70%]' }"
      >
        <DocumentsFormSelect @submit="handleAddDocumentToClass" />
      </UDashboardSlideover>
    </UDashboardSection>
  </UDashboardPanelContent>
</template>

<style scoped></style>
