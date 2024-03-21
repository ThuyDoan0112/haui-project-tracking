import type { User } from '~/types'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])

  const fetchUsers = async () => {
    const { data } = await useFetch<User[]>('/api/users')
    users.value = data.value as User[]
  }

  return { users, fetchUsers }
})
