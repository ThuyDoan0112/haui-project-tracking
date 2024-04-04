import type { DocumentsOnClasses } from "~/types";

export const useDocumentsOnClassesStore = defineStore(
  "documents-on-classes",
  () => {
    const documentsOnClasses = ref<DocumentsOnClasses[]>([]);

    const fetchDocumentsOnClasses = async (classId: number) => {
      const { data } = await useFetch(
        '/api/documents-on-classes',
        {
          params: {
            classId
          }
        }
      );
      documentsOnClasses.value = data.value;
    };

    return {
      documentsOnClasses,
      fetchDocumentsOnClasses,
    };
  }
);
