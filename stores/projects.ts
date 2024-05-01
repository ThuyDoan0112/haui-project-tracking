export const useProjectStore = defineStore('projects', () => {
  const project = ref()
  const sources = ref([])

  const fetchProject = async (id: number) => {
    const { data } = await useFetch(`/api/projects/${id}`)

    project.value = data.value
  }

  const fetchSources = async (projectId: number) => {
    const { data } = await useFetch(`/api/project-sources`, {
      params: {
        projectId
      }
    })

    sources.value = data.value
  }

  return {
    project, 
    sources,
    fetchProject,
    fetchSources,
  }
})
