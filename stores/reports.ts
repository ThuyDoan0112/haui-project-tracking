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

  const commentReport = async (reportId: number, commentData: any) => {
    await useFetch(`/api/reports/${reportId}`, {
      method: 'PUT',
      body: commentData,
    })
  }

  return {
    reports,
    fetchReports,
    createReports,
    commentReport,
  }
})
