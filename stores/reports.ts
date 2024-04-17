export const useReportsStore = defineStore('reports', () => {
  const reports = ref([])

  const fetchReports = async (projectId: number) => {
    const { data } = await useFetch(`/api/projects/${projectId}/reports`)

    if (data.value)
      reports.value = data.value
  }

  const createReports = async (projectIds: number[], createReportsData: any) => {
    const { data } = await useFetch('/api/reports', {
      method: 'POST',
      body: { projectIds, ...createReportsData },
    })

    return data.value
  }

  return {
    reports,
    fetchReports,
    createReports,
  }
})
