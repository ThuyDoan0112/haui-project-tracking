import type { Class, ClassStatus, CreateClassDto } from '~/types'

export const useClassesStore = defineStore('classes', () => {
  const toast = useToast()
  const usersStore = useUsersStore()

  const classes = ref<Class[]>([])
  const teacherClasses = ref<Class[]>([])
  const classDetail = ref<Class>()
  const studentClasses = ref([])

  const fetchClasses = async () => {
    const { data } = await useFetch<Class[]>('/api/classes')
    classes.value = data.value as Class[]
  }

  const fetchTeacherClasses = async (userId: number) => {
    const { data } = await useFetch<Class[]>(`/api/users/${userId}/classes/`)
    teacherClasses.value = data.value as Class[]
  }

  const fetchStudentClasses = async (userId: number) => {
    const { data } = await useFetch<Class[]>(`/api/users/${userId}/users-on-classes`)
    studentClasses.value = data.value as any
  }

  const fetchClass = async (classId: number) => {
    const { data, error } = await useFetch<Class>(`/api/classes/${classId}`)

    if (error.value) {
      const errorMessage = error.value.data.message || error.value.data.error
      throw createError(errorMessage)
    }

    classDetail.value = data.value as Class
  }

  const createClass = async (createClassDto: CreateClassDto) => {
    const { data: newClass, error } = await useFetch<Class>('/api/classes', {
      method: 'POST',
      body: createClassDto,
    })

    if (error.value) {
      const errorMessage = error.value.data.message || error.value.data.error
      toast.add({
        title: 'Create class failed',
        description: errorMessage,
      })
    }

    if (newClass.value) {
      const teacher = createClassDto.teacherId
        ? usersStore.getUserById(createClassDto.teacherId)
        : undefined

      classes.value.push({
        ...newClass.value,
        teacher,
      })
    }

    return newClass.value
  }

  const getClassStatus = (endDate: Date): ClassStatus => {
    return new Date(endDate) > new Date() ? 'active' : 'inactive'
  }

  return {
    classes,
    teacherClasses,
    classDetail,
    studentClasses,
    fetchClasses,
    createClass,
    fetchTeacherClasses,
    fetchClass,
    getClassStatus,
    fetchStudentClasses,
  }
})
