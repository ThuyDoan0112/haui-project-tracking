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
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UDashboardSection
      title="Class Students"
      description="All students in this class."
      :ui="{ wrapper: '*:pt-0' }"
      :links="[
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
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
