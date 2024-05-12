<script setup lang="ts">
const { $i18n } = useNuxtApp()

const columns = [
  {
    key: 'user.name',
    label: $i18n.t('class.students.name'),
  },
  {
    key: 'user.email',
    label: $i18n.t('class.students.email'),
  },
  {
    key: 'user.studentCode',
    label: $i18n.t('class.students.studentCode'),
  },
  {
    label: $i18n.t('class.students.project'),
    key: 'project',
  },
  {
    label: $i18n.t('class.students.progress'),
    key: 'progress',
  },
]

const {
  importStudentModalTitle,
  isVisibleUploadStudentsModal,
  openUploadStudentsModal,
  closeUploadStudentsModal,
} = useUploadStudentsModal()

const route = useRoute()
const isLoading = ref(false)
const usersOnClassesStore = useUsersOnClassesStore()
const { usersOnClasses } = storeToRefs(usersOnClassesStore)
const { fetchUsersOnClasses } = usersOnClassesStore

const rows = computed(() => {
  return usersOnClasses.value.map((userOnClass: any) => {
    const taskCount = userOnClass.project.reports.reduce((acc: number, report: any) => {
      return acc + report.tasks.length
    }, 0)

    const doneTaskCount = userOnClass.project.reports.reduce((acc: number, report: any) => {
      return acc + report.tasks.filter((task: any) => task.isCompleted).length
    }, 0)
    return {
      ...userOnClass,
      progress: `${doneTaskCount}/${taskCount}`,
    }
  })
})

await fetchUsersOnClasses(+route.params.id)

const toast = useToast()

async function handleUploadStudents(file: File) {
  if (isLoading.value)
    return

  isLoading.value = true
  const { count } = await usersOnClassesStore.uploadStudents(
    +route.params.id,
    file,
  )
  isLoading.value = false

  closeUploadStudentsModal()
}

const reportsStore = useReportsStore()
const { createReports } = reportsStore

async function handleCreateReports(data: any) {
  if (isLoading.value)
    return

  const projectIds = usersOnClasses.value.map((userOnClass: any) => userOnClass.project.id)

  isLoading.value = true
  const { count } = await createReports(projectIds, data)
  isLoading.value = false

  if (count) {
    closeCreateReportsModal()
    toast.add({
      title: $i18n.t('class.students.message'),
    })
  }
}

function useUploadStudentsModal() {
  const importStudentModalTitle = $i18n.t('class.students.uploadStudentsModal.title')
  const isVisibleUploadStudentsModal = ref(false)

  const openUploadStudentsModal = () => {
    isVisibleUploadStudentsModal.value = true
  }

  const closeUploadStudentsModal = () => {
    isVisibleUploadStudentsModal.value = false
  }

  return {
    isVisibleUploadStudentsModal,
    importStudentModalTitle,
    openUploadStudentsModal,
    closeUploadStudentsModal,
  }
}

const {
  createReportsModalTitle,
  isVisibleCreateReportsModal,
  openCreateReportsModal,
  closeCreateReportsModal,
} = useCreateReportModal()

function useCreateReportModal() {
  const createReportsModalTitle = $i18n.t('class.students.createReportModal.title')
  const isVisibleCreateReportsModal = ref(false)

  const openCreateReportsModal = () => {
    isVisibleCreateReportsModal.value = true
  }

  const closeCreateReportsModal = () => {
    isVisibleCreateReportsModal.value = false
  }

  return {
    isVisibleCreateReportsModal,
    createReportsModalTitle,
    openCreateReportsModal,
    closeCreateReportsModal,
  }
}
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UDashboardSection
      :title="$t('class.students.title')"
      :description="`${usersOnClasses?.length} ${$t('class.students.description')}`"
      :ui="{ wrapper: '*:pt-0' }"
      :links="[
        {
          label: $t('class.students.report'),
          color: 'primary',
          icon: 'i-heroicons-plus',
          click: openCreateReportsModal,
        },
        {
          label: $t('class.students.description'),
          color: 'gray',
          icon: 'i-heroicons-arrow-up-on-square',
          click: openUploadStudentsModal,
        },
      ]"
    >
      <UTable
        :rows="rows"
        :columns="columns"
        :empty-state="{
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'No students.',
        }"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
        sort-mode="manual"
        class="w-full"
      >
        <template #project-data="{ row }">
          <NuxtLink class="underline text-primary font-semibold" :to="`/projects/${row.project.id}?classId=${row.classId}`">
            {{ row.project.name }}
          </NuxtLink>
        </template>
        <template #progress-data="{ row }">
          <UBadge> {{ row.progress }}</UBadge>
        </template>
      </UTable>

      <UDashboardSlideover
        v-model="isVisibleUploadStudentsModal"
        :title="importStudentModalTitle"
      >
        <UsersOnClassesFormUpload
          :loading="isLoading"
          @close="closeUploadStudentsModal"
          @submit="handleUploadStudents"
        />
      </UDashboardSlideover>

      <UDashboardSlideover
        v-model="isVisibleCreateReportsModal"
        :title="createReportsModalTitle"
      >
        <ReportsForm
          :loading="isLoading"
          @close="closeCreateReportsModal"
          @submit="handleCreateReports"
        />
      </UDashboardSlideover>
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
