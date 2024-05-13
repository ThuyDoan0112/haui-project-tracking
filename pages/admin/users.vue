<script setup lang="ts">
import type { CreateUserDto } from '~/types'

const { $i18n } = useNuxtApp()

const { users, isLoading, columns, handleFetchUsers } = useUsersTable()

await handleFetchUsers()


function useUsersTable() {
  const isLoading = ref(false)

  const usersStore = useUsersStore()
  const { users } = storeToRefs(usersStore)
  const filteredUsers = computed(() => users.value.filter(user => !user.studentCode))

  const handleFetchUsers = async () => {
    isLoading.value = true
    await usersStore.fetchUsers()
    isLoading.value = false
  }

  const columns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: $i18n.t('dashboard.users.name'),
    },
    {
      key: 'email',
      label: $i18n.t('dashboard.users.email'),
    },
    {
      key: 'role',
      label: $i18n.t('dashboard.users.role'),
    },
  ]

  return {
    users: filteredUsers,
    isLoading,
    columns,
    handleFetchUsers,
  }
}

const {
  isVisible: isVisibleCreateUserModal,
  title: createUserModalTitle,
  openModal: openCreateUserModal,
  closeModal: closeCreateUserModal,
  isLoading: isCreatingUser,
  handleCreateUser,
} = useCreateUserModal()

function useCreateUserModal() {
  const title = $i18n.t('dashboard.users.createModal.title')
  const isVisible = ref(false)
  const isLoading = ref(false)

  const openModal = () => {
    isVisible.value = true
  }

  const closeModal = () => {
    isVisible.value = false
  }

  const usersStore = useUsersStore()
  const handleCreateUser = async (createUserDto: CreateUserDto) => {
    if (isLoading.value)
      return

    isLoading.value = true
    const newUser = await usersStore.createUser({ ...createUserDto })
    isLoading.value = false

    if (newUser)
      closeModal()
  }

  return {
    title,
    isVisible,
    isLoading,
    openModal,
    closeModal,
    handleCreateUser,
  }
}
</script>

<template>
  <UDashboardPanel grow>
    <UDashboardNavbar :title="$t('dashboard.users.title')" :badge="users.length">
      <template #right>
        <UButton
          :label="$t('dashboard.users.createModal.title')"
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
      :ui="{ width: 'sm:max-w-md' }"
    >
      <UsersForm
        :loading="isCreatingUser"
        @close="closeCreateUserModal"
        @submit="handleCreateUser"
      />
    </UDashboardModal>
  </UDashboardPanel>
</template>
