<script setup lang="ts">
import type { CreateUserDto } from '~/types'

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

const {
  isVisible: isVisibleCreateUserModal,
  title: createUserModalTitle,
  description: createUserModalDescription,
  openModal: openCreateUserModal,
  closeModal: closeCreateUserModal,
  handleCreateUser,
} = useCreateUserModal()

function useCreateUserModal() {
  const title = 'New user'
  const description = 'Add a new user to your database'
  const isVisible = ref(false)

  const openModal = () => {
    isVisible.value = true
  }

  const closeModal = () => {
    isVisible.value = false
  }

  const handleCreateUser = async (createUserDto: CreateUserDto) => {
    console.log(createUserDto)
  }

  return {
    title,
    description,
    isVisible,
    openModal,
    closeModal,
    handleCreateUser,
  }
}
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar title="Users" :badge="users.length">
      <template #right>
        <UButton
          label="New user"
          trailing-icon="i-heroicons-plus"
          color="gray"
          @click="openCreateUserModal"
        />
      </template>
    </UDashboardNavbar>

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

    <UDashboardModal
      v-model="isVisibleCreateUserModal"
      :title="createUserModalTitle"
      :description="createUserModalDescription"
      :ui="{ width: 'sm:max-w-md' }"
    >
      <UsersForm @close="closeCreateUserModal" @submit="handleCreateUser" />
    </UDashboardModal>
  </UDashboardPanel>
</template>
