export const useTasksStore = defineStore('tasks', () => {
  const reportsStore = useReportsStore()
  const { reports } = storeToRefs(reportsStore)

  const createTask = async (reportId: number, data: any) => {
    const { data: task } = await useFetch('/api/tasks', {
      method: 'post',
      body: {
        reportId,
        ...data,
      },
    })

    if (task.value) {
      reports.value = reports.value.map((report) => {
        if (report.id === reportId) {
          return {
            ...report,
            tasks: [...report.tasks, task.value],
          }
        }

        return report
      })
    }
  }

  return {
    createTask,
  }
})
