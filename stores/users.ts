import type { CreateUserDto, User } from '~/types'

export const useUsersStore = defineStore('users', () => {
  const toast = useToast()

  const users = ref<User[]>([])

  const getUserById = (id: number) => {
    return users.value.find(user => user.id === id)
  }

  const fetchUsers = async () => {
    const { data } = await useFetch<User[]>('/api/users')
    users.value = data.value as User[]
  }

  const createUser = async (createUserDto: CreateUserDto) => {
    const { data: newUser, error } = await useFetch<User>('/api/users', {
      method: 'POST',
      body: createUserDto,
    })

    if (error.value) {
      const errorMessage = error.value.data.message || error.value.data.error
      toast.add({
        title: 'Create user failed',
        description: errorMessage,
      })
    }

    if (newUser.value)
      users.value.push(newUser.value)

    return newUser.value
  }

  return { users, fetchUsers, createUser, getUserById }
})
