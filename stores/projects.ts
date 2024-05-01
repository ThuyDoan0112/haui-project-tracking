export const useProjectStore = defineStore('projects', () => {
  const project = ref()

  const fetchProject = async (id: number) => {
    const { data } = await useFetch(`/api/projects/${id}`)

    project.value = data.value
  }

  return {
    project, 
    fetchProject
  }
})
