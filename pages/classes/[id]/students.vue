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
          label: `${usersOnClasses?.length} Students`,
          color: 'gray',
          icon: 'i-heroicons-user-group',
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
          <NuxtLink class="underline text-primary font-semibold" :to="`/classes/${useRoute().params.id}/reports?project=${row.project.id}`">{{row.project.name}}</NuxtLink>
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
