export const useReportsStore = defineStore('reports', () => {
  const createReports = async (projectIds: number[], createReportsData: any) => {
    const { data } = await useFetch('/api/reports', {
      method: 'POST',
      body: { projectIds, ...createReportsData },
    })

    return data.value
  }

  return {
    createReports,
  }
})
