export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  if (!user.value)
    await authStore.getUser()

  if (!user.value)
    return navigateTo('/login')
})
