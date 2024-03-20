import type { LoginUserDto, User } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast()

  const user = ref<User>()

  const login = async (loginUserDto: LoginUserDto) => {
    const { error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: loginUserDto,
    })

    if (error.value) {
      const errorMessage = error.value.data.message || error.value.data.error
      return toast.add({
        title: 'Login failed',
        description: errorMessage,
      })
    }

    toast.add({
      title: 'Login success',
    })

    return navigateTo('/')
  }

  const getUser = async () => {
    const { data } = await useFetch('/api/auth/user')
    user.value = data.value
  }

  return {
    user,
    login,
    getUser,
  }
})
