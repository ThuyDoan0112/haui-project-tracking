<script setup lang="ts">
const reportsStore = useReportsStore()
const { fetchReports } = reportsStore
const { reports } = storeToRefs(reportsStore)

const projectId = computed(() => {
  return useRoute().query.projectId
})

await fetchReports(+projectId.value)

const reportItems = computed(() => {
  return reports.value.map((report) => {
    return {
      id: report.id,
      label: report.name,
      content: report.description || 'No description',
      icon: 'i-heroicons-document-text',
      tasks: report.tasks,
    }
  })
})

const {
  createTaskModalTitle,
  isVisibleCreateTaskModal,
  openCreateTaskModal,
  closeCreateTaskModal,
} = useCreateTaskModal()

const { createTask } = useTasksStore()

const selectedReportId = ref()
const isLoading = ref(false)
async function handleCreateTask(data: any) {
  if (isLoading.value)
    return

  isLoading.value = true
  await createTask(selectedReportId.value, data).finally(() => isLoading.value = false)

  closeCreateTaskModal()
}

function handleOpenCreateTaskModal(reportId: number) {
  selectedReportId.value = reportId
  openCreateTaskModal()
}

function useCreateTaskModal() {
  const createTaskModalTitle = 'Create Task'
  const isVisibleCreateTaskModal = ref(false)

  const openCreateTaskModal = () => {
    isVisibleCreateTaskModal.value = true
  }

  const closeCreateTaskModal = () => {
    isVisibleCreateTaskModal.value = false
  }

  return {
    isVisibleCreateTaskModal,
    createTaskModalTitle,
    openCreateTaskModal,
    closeCreateTaskModal,
  }
}
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UAccordion :items="reportItems">
      <template #item="{ item }">
        <p class="mb-4">
          {{ item.content }}
        </p>
        <UAlert
          v-for="task in item.tasks"
          :description="task.description"
          :title="task.name"
          class="mb-4"
        />
        <UButton label="Add New Task" icon="i-heroicons-plus" @click="handleOpenCreateTaskModal(item.id)" />
      </template>
    </UAccordion>
    <UDashboardSlideover
      v-model="isVisibleCreateTaskModal"
      :title="createTaskModalTitle"
    >
      <TasksForm
        :loading="isLoading"
        @close="closeCreateTaskModal"
        @submit="handleCreateTask"
      />
    </UDashboardSlideover>
  </UDashboardPanelContent>
</template>
