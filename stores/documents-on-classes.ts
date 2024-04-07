import type { DocumentsOnClasses } from '~/types'

export const useDocumentsOnClassesStore = defineStore(
  'documents-on-classes',
  () => {
    const documentsOnClasses = ref<DocumentsOnClasses[]>([])

    const fetchDocumentsOnClasses = async (classId: number) => {
      const { data } = await useFetch(
        '/api/documents-on-classes',
        {
          params: {
            classId,
          },
        },
      )
      documentsOnClasses.value = data.value
    }

    const addDocumentsToClass = async (classId: number, documentIds: number[]) => {
      const { data } = await useFetch(
        '/api/documents-on-classes',
        {
          method: 'POST',
          body: {
            classId,
            documentIds,
          },
        },
      )

      if (data.value)
        await fetchDocumentsOnClasses(classId)

      return data.value
    }

    return {
      documentsOnClasses,
      addDocumentsToClass,
      fetchDocumentsOnClasses,
    }
  },
)
