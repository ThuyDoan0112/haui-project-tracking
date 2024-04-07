<script setup lang="ts">
const emit = defineEmits<{
  submit: [documentIds: number[]]
}>()

const { selectedDocumentIds, selectedDocuments } = useSelectDocuments()
function useSelectDocuments() {
  const selectedDocuments = ref([])
  const selectedDocumentIds = computed(() => {
    return selectedDocuments.value.map(document => document.id)
  })

  return {
    selectedDocuments,
    selectedDocumentIds,
  }
}

const documentsStore = useDocumentsStore()
const { fetchDocuments } = documentsStore
await fetchDocuments()

const { searchValue, filterDocuments, filteredDocuments }
  = useFilterDocuments()

function useFilterDocuments() {
  const documentsStore = useDocumentsStore()
  const { documents } = storeToRefs(documentsStore)

  const documentsOnClassesStore = useDocumentsOnClassesStore()
  const { documentsOnClasses } = storeToRefs(documentsOnClassesStore)

  const filterDocuments = computed(() => {
    return documents.value.filter((document) => {
      return !documentsOnClasses.value.some(
        documentOnClass => documentOnClass.documentId === document.id,
      )
    })
  })

  const searchValue = ref('')

  const filteredDocuments = computed(() => {
    if (!searchValue.value)
      return filterDocuments.value

    return filterDocuments.value.filter((document) => {
      return document.name
        .toLowerCase()
        .includes(searchValue.value.toLowerCase())
    })
  })

  return {
    searchValue,
    filterDocuments,
    filteredDocuments,
  }
}

const columns = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'description',
    label: 'Description',
  },
]

function handleAddDocuments() {
  emit('submit', selectedDocumentIds.value)
}
</script>

<template>
  <div>
    <div
      class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700"
    >
      <UInput
        v-model="searchValue"
        class="w-[250px]"
        placeholder="Filter documents by name..."
      />
      <UButton
        :disabled="!selectedDocuments.length"
        label="Save"
        @click="handleAddDocuments"
      />
    </div>
    <UTable
      v-model="selectedDocuments"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: 'No documents.',
      }"
      :columns="columns"
      :rows="filteredDocuments"
    />
  </div>
</template>
