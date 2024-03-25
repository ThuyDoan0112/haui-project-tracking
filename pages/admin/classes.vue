<script setup lang="ts">
import type { Class, CreateClassDto } from '~/types'

const {
  rows: classes,
  isLoading,
  columns,
  handleFetchClasses,
} = useClassesTable()

await handleFetchClasses()

function useClassesTable() {
  const isLoading = ref(false)

  const classesStore = useClassesStore()
  const { classes } = storeToRefs(classesStore)

  const handleFetchClasses = async () => {
    isLoading.value = true
    await classesStore.fetchClasses()
    isLoading.value = false
  }

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
      key: 'code',
      label: 'Code',
    },
    {
      key: 'startDate',
      label: 'Start Date',
    },
    {
      key: 'endDate',
      label: 'End Date',
    },
    {
      key: 'teacher.name',
      label: 'Teacher',
    },
    {
      key: 'status',
      label: 'Status',
    },
  ]

  const rows = computed(() => {
    return classes.value.map((classItem: Class) => {
      return {
        ...classItem,
        status: classesStore.getClassStatus(classItem.endDate),
        startDate: formatDate(classItem.startDate),
        endDate: formatDate(classItem.endDate),
        createdAt: formatDate(classItem.createdAt),
        updatedAt: formatDate(classItem.updatedAt),
      }
    })
  })

  return {
    rows,
    columns,
    isLoading,
    handleFetchClasses,
  }
}

const {
  isVisible: isVisibleCreateClassModal,
  title: createClassModalTitle,
  description: createClassModalDescription,
  openModal: openCreateClassModal,
  closeModal: closeCreateClassModal,
  isLoading: isCreatingClass,
  handleCreateClass,
} = useCreateClassModal()

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)
const { fetchUsers } = usersStore

watch(isVisibleCreateClassModal, async () => {
  if (isVisibleCreateClassModal.value && !users.value.length)
    await fetchUsers()
})

function useCreateClassModal() {
  const title = 'New class'
  const description = 'Add a new class to your database'
  const isVisible = ref(false)
  const isLoading = ref(false)

  const openModal = () => {
    isVisible.value = true
  }

  const closeModal = () => {
    isVisible.value = false
  }

  const usersStore = useClassesStore()
  const handleCreateClass = async (createClassDto: CreateClassDto) => {
    if (isLoading.value)
      return

    isLoading.value = true
    const newClass = await usersStore.createClass({
      ...createClassDto,
      startDate: formatISODate(createClassDto.startDate),
      endDate: formatISODate(createClassDto.endDate),
    })
    isLoading.value = false

    if (newClass)
      closeModal()
  }

  return {
    title,
    description,
    isVisible,
    isLoading,
    openModal,
    closeModal,
    handleCreateClass,
  }
}
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar title="Classes" :badge="classes.length">
      <template #right>
        <UButton
          label="New class"
          trailing-icon="i-heroicons-plus"
          color="gray"
          @click="openCreateClassModal"
        />
      </template>
    </UDashboardNavbar>

    <UTable
      :rows="classes"
      :columns="columns"
      :loading="isLoading"
      sort-mode="manual"
      class="w-full"
      :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
    >
      <template #name-data="{ row }">
        <div class="flex items-center gap-3">
          <span class="text-gray-900 dark:text-white font-medium">{{
            row.name
          }}</span>
        </div>
      </template>

      <template #status-data="{ row }">
        <UBadge
          :label="row.status"
          :color="row.status === 'active' ? 'green' : 'orange'"
          variant="subtle"
          class="capitalize"
        />
      </template>
    </UTable>

    <UDashboardModal
      v-model="isVisibleCreateClassModal"
      :title="createClassModalTitle"
      :description="createClassModalDescription"
      :ui="{ width: 'sm:max-w-md' }"
    >
      <ClassesForm
        :loading="isCreatingClass"
        :users="users"
        @close="closeCreateClassModal"
        @submit="handleCreateClass"
      />
    </UDashboardModal>
  </UDashboardPanel>
</template>
