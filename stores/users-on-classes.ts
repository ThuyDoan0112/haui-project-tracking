export const useUsersOnClassesStore = defineStore(
  'users-on-classes',
  () => {
    const toast = useToast()

    const uploadStudents = async (classId: number, file: File) => {
      const formData = new FormData()
      formData.append('sheet', file)

      const { data, error } = await useFetch(`/api/classes/${classId}/users-on-classes`, {
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

      return data.value
    }

    return {
      uploadStudents,
    }
  },
)
