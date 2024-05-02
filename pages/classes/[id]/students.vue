<script setup lang="ts">
const columns = [
  {
    key: 'user.name',
    label: 'Name',
  },
  {
    key: 'user.email',
    label: 'Email',
  },
  {
    key: 'user.studentCode',
    label: 'Student Code',
  },
  {
    label: 'Project',
    key: 'project',
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

  if (count)
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
      title: 'Create reports successfully',
    })
  }
}

function useUploadStudentsModal() {
  const importStudentModalTitle = 'Upload Students'
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
  const createReportsModalTitle = 'Create Reports'
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
      title="Class Students"
      :description="`${usersOnClasses?.length} students.`"
      :ui="{ wrapper: '*:pt-0' }"
      :links="[
        {
          label: `Reports`,
          color: 'primary',
          icon: 'i-heroicons-plus',
          click: openCreateReportsModal,
        },
        {
          label: `Students`,
          color: 'gray',
          icon: 'i-heroicons-arrow-up-on-square',
          click: openUploadStudentsModal,
        },
      ]"
    >
      <UTable
        :rows="usersOnClasses"
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
