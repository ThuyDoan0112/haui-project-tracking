<script setup lang="ts">
import type { Class, ClassStatus } from '~/types'

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
      const status: ClassStatus
        = new Date(classItem.endDate) > new Date() ? 'active' : 'inactive'

      return {
        ...classItem,
        status,
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
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar title="Classes" :badge="classes.length" />

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
  </UDashboardPanel>
</template>
