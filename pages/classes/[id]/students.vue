<script setup lang="ts">
const users = ref([
  {
    id: 1,
    name: 'trankhacbinhduong',
    email: 'trankhacbinhduong@gmail.com',
    studentCode: '2019600234',
    project: {
      name: 'HaUI Project Tracking',
    },
  },
])

const columns = [
  {
    key: 'id',
    label: '#',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'studentCode',
    label: 'Student Code',
  },
  {
    label: 'Project',
    key: 'project.name',
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
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UDashboardSection
      title="Class Students"
      description="All students in this class."
      :ui="{ wrapper: '*:pt-0' }"
      :links="[
        {
          label: `Upload Students`,
          color: 'primary',
          icon: 'i-heroicons-plus',
          click: openUploadStudentsModal,
        },
        {
          label: `${users.length} Students`,
          color: 'gray',
          icon: 'i-heroicons-user-group',
        },
      ]"
    >
      <UTable
        :rows="users"
        :columns="columns"
        :empty-state="{
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'No students.',
        }"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
        sort-mode="manual"
        class="w-full"
      >
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar :alt="row.name" size="xs" />

            <span class="text-gray-900 dark:text-white font-medium">{{
              row.name
            }}</span>
          </div>
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
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
