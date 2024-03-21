export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const { isAdmin } = storeToRefs(authStore)

  if (isAdmin.value)
    return true
})
