<script setup lang="ts">
const { users, isLoading, columns, handleFetchUsers } = useUsersTable()

await handleFetchUsers()

function useUsersTable() {
  const isLoading = ref(false)

  const usersStore = useUsersStore()
  const { users } = storeToRefs(usersStore)

  const handleFetchUsers = async () => {
    isLoading.value = true
    await usersStore.fetchUsers()
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
      key: 'email',
      label: 'Email',
    },
    {
      key: 'studentCode',
      label: 'Student Code',
    },
    {
      key: 'role',
      label: 'Role',
    },
  ]

  return {
    users,
    isLoading,
    columns,
    handleFetchUsers,
  }
}
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar title="Users" :badge="users.length" />

    <UTable
      :rows="users"
      :columns="columns"
      :loading="isLoading"
      sort-mode="manual"
      class="w-full"
      :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
    >
      <template #name-data="{ row }">
        <div class="flex items-center gap-3">
          <UAvatar :alt="row.name" size="xs" />

          <span class="text-gray-900 dark:text-white font-medium">{{
            row.name
          }}</span>
        </div>
      </template>

      <template #role-data="{ row }">
        <UBadge
          :label="row.role"
          :color="row.role === 'admin' ? 'green' : 'orange'"
          variant="subtle"
          class="capitalize"
        />
      </template>
    </UTable>
  </UDashboardPanel>
</template>
