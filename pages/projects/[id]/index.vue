<script setup lang="ts">
import { format } from "date-fns";

const reportsStore = useReportsStore();
const { fetchReports } = reportsStore;
const { reports } = storeToRefs(reportsStore);

const classStore = useClassesStore();
const { isTeacher } = storeToRefs(classStore);

await classStore.fetchClass(+useRoute().query.classId)

const projectId = computed(() => {
  return useRoute().params.id;
});

await fetchReports(+projectId.value);

const reportItems = computed(() => {
  return reports.value.map((report) => {
    return {
      id: report.id,
      label: `${report.name} (${format(new Date(report.startDate), 'yyyy/MM/dd')} - ${format(new Date(report.dueDate), 'yyyy/MM/dd')}) (${report.tasks.filter((task) => task.isCompleted).length}/${report.tasks.length} tasks completed)`,
      content: report.description,
      icon: "i-heroicons-document-text",
      tasks: report.tasks,
      comment: report.comment,
      dueDate: report.dueDate,
    };
  });
});

const init = () => {
  const map = {}
  for (const report of reports.value) {
    map[report.id] = undefined
  }
  return map
}
const selectedTask = reactive(init())

const setSelectedTask = (reportId: number,task: any) => {
  selectedTask[reportId] = task;
};

const { createTask, updateTask } = useTasksStore();
const { commentReport} = useReportsStore();

const toast = useToast()

const handleCommentReport = async (reportId: number, data: any) => {
  await commentReport(reportId, data);
  await fetchReports(+projectId.value);
  toast.add({
    title: "Comment success!"
  })
};

async function handleUpdateTask(reportId: number, taskId: number, data: any) {
  await updateTask(taskId, data);
  await fetchReports(+projectId.value);
  selectedTask[reportId] = undefined
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
          v-for="(task, index) in item.tasks"
          :actions="[
            !isTeacher && {
              variant: 'solid',
              icon: 'i-heroicons-pencil-square',
              onClick: () => setSelectedTask(item.id, task),
            },
            {
              variant: 'solid',
              label: `${task.isCompleted ? 'Completed' : 'Mark as Completed'}`,
              icon: `${task.isCompleted ? 'i-heroicons-check' : ''}`,
              color: `${task.isCompleted ? 'green' : 'orange'}`,
              disabled: `${isTeacher || new Date(item.dueDate) < new Date()}`,
              onClick: () => {
                const isOverDueDate = new Date(item.dueDate) < new Date();
                if(isTeacher || isOverDueDate) return;
                handleUpdateTask(item.id, task.id, { isCompleted: !task.isCompleted })
              },
            },
          ]"
          class="mb-4"
        >
            <template #title>
              <span class="font-semibold" :class="{
                'line-through': task.isCompleted,
              }">{{ index + 1 }}. {{ task.name }}</span>
              <br>
              <span v-if="task.description">{{ task.description }}</span>
            </template>
        </UAlert>
        <UDivider v-if="!isTeacher" class="my-4"/>
        <TasksForm :key="item.id" v-if="!isTeacher" :init-values="selectedTask[item.id]" :loading="isLoading" @submit="(data) => selectedTask ? handleUpdateTask(item.id,selectedTask[item.id].id, {...data}) : handleCreateTask(item.id, {...data})"/>
        <UDivider class="my-4"/>
        <ReportsComment :key="item.id" :is-teacher="isTeacher" :comment="item.comment" @submit="(comment) => handleCommentReport(item.id, comment)"/>
      </template>
    </UAccordion>
  </UDashboardPanelContent>
</template>
