import type { Class } from '~/types'

export const useClassesStore = defineStore('classes', () => {
  const classes = ref<Class[]>([])

  const fetchClasses = async () => {
    const { data } = await useFetch<Class[]>('/api/classes')
    classes.value = data.value as Class[]
  }

  return { classes, fetchClasses }
})
