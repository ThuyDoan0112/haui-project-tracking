export const useUsersOnClassesStore = defineStore(
  'users-on-classes',
  () => {
    const toast = useToast()
    const usersOnClasses = ref([])

    const fetchUsersOnClasses = async (classId: number) => {
      const { data } = await useFetch(`/api/users-on-classes`, {
        params: {
          classId,
        },
      })

      usersOnClasses.value = data.value
    }

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
      usersOnClasses,
      uploadStudents,
      fetchUsersOnClasses,
    }
  },
)
