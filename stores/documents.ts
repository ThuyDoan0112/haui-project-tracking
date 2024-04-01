import type { Document, UploadDocumentsResponse } from '~/types'

export const useDocumentsStore = defineStore('documents', () => {
  const toast = useToast()

  const documents = ref<Document[]>([])

  const fetchDocuments = async () => {
    const { data } = await useFetch('/api/documents')
    documents.value = data.value
  }

  const uploadDocuments = async (files: FileList) => {
    const formData = new FormData()
    for (const file of files)
      formData.append('documents', file)

    const { data, error } = await useFetch<UploadDocumentsResponse>('/api/documents', {
      method: 'POST',
      body: formData,
    })

    if (error.value) {
      const errorMessage = error.value.data.message || error.value.data.error
      return toast.add({
        title: 'Upload failed',
        description: errorMessage,
      })
    }

    if (data.value?.count)
      await fetchDocuments()

    return data.value
  }

  return {
    documents,
    fetchDocuments,
    uploadDocuments,
  }
})
