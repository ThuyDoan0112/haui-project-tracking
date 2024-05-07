import type { LoginUserDto, User } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const { $i18n } = useNuxtApp()
  const toast = useToast()

  const user = ref<User>()

  const isAdmin = computed(() => user.value?.role === 'admin')

  const login = async (loginUserDto: LoginUserDto) => {
    const { error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: loginUserDto,
    })

    if (error.value) {
      const errorMessage = error.value.data.message || error.value.data.error
      return toast.add({
        title: $i18n.t('login.message.error'),
        description: errorMessage,
      })
    }

    toast.add({
      title: $i18n.t('login.message.success'),
    })

    return navigateTo('/')
  }

  const getUser = async () => {
    const { data } = await useFetch('/api/auth/user')
    user.value = data.value
  }

  const logout = async () => {
    const { error } = await useFetch('/api/auth/logout')

    if (!error.value) {
      user.value = undefined
      return navigateTo('/login')
    }
  }

  return {
    user,
    isAdmin,
    login,
    logout,
    getUser,
  }
})
