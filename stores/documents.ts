import type { Document } from '~/types'

export const useDocumentsStore = defineStore('documents', () => {
  const documents = ref<Document[]>([])

  const fetchDocuments = async () => {
    const { data } = await useFetch('/api/documents')
    documents.value = data.value
  }

  return {
    documents,
    fetchDocuments,
  }
})
