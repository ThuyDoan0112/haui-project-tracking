<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { format } from "date-fns";

const reportsStore = useReportsStore();
const { fetchReports } = reportsStore;
const { reports } = storeToRefs(reportsStore);

const projectId = computed(() => {
  return useRoute().params.id;
});

await fetchReports(+projectId.value);

const reportItems = computed(() => {
  return reports.value.map((report) => {
    return {
      id: report.id,
      label: `${report.name} (${format(new Date(report.startDate), 'yyyy/MM/dd')} - ${format(new Date(report.dueDate), 'yyyy/MM/dd')})`,
      content: report.description || "No description",
      icon: "i-heroicons-document-text",
      tasks: report.tasks,
    };
  });
});

const { createTask, deleteTask, updateTask } = useTasksStore();
async function handleDeleteTask(taskId: number) {
  await deleteTask(taskId);
  await fetchReports(+projectId.value);
}

async function handleUpdateTask(taskId: number, data: any) {
  await updateTask(taskId, data);
  await fetchReports(+projectId.value);
}

const isLoading = ref(false);
async function handleCreateTask(reportId: number, data: any) {
  if (isLoading.value) return;

  isLoading.value = true;
  await createTask(reportId, data).finally(
    () => (isLoading.value = false)
  );
}
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UAccordion :items="reportItems" multiple>
      <template #item="{ item }">
        <p class="mb-4">
          {{ item.content }}
        </p>
        <UAlert
          v-for="task in item.tasks"
          :description="task.description"
          :actions="[
            {
              variant: 'solid',
              label: `${task.isCompleted ? 'Completed' : 'Mark as Completed'}`,
              icon: `${task.isCompleted ? 'i-heroicons-check' : ''}`,
              color: `${task.isCompleted ? 'green' : 'orange'}`,
              onClick: () =>
                handleUpdateTask(task.id, { isCompleted: !task.isCompleted }),
            },
            {
              variant: 'solid',
              icon: 'i-heroicons-trash',
              color: 'red',
              onClick: () => handleDeleteTask(task.id),
            },
          ]"
          class="mb-4"
        >
            <template #title>
              <span class="font-semibold" :class="{
                'line-through': task.isCompleted,
              }">{{ task.name }}</span>
            </template>
        </UAlert>

        <UDivider class="my-4"/>
        
        <TasksForm :loading="isLoading" @submit="(data) => handleCreateTask(item.id, data)"/>
      </template>
    </UAccordion>
  </UDashboardPanelContent>
</template>
