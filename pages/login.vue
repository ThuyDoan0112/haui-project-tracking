<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: 'Login',
})

const { $i18n } = useNuxtApp()

const fields = [
  {
    name: 'email',
    type: 'text',
    label: $i18n.t('login.label.email'),
  },
  {
    name: 'password',
    label: $i18n.t('login.label.password'),
    type: 'password',
  },
]

function validate(state: any) {
  const errors = []
  if (!state.email)
    errors.push({ path: 'email', message: $i18n.t('login.error.email') })
  if (!state.password)
    errors.push({ path: 'password', message: $i18n.t('login.error.password') })
  return errors
}

const authStore = useAuthStore()
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UAuthForm
      :fields="fields"
      :validate="validate"
      :title="$t('login.title')"
      align="top"
      icon="i-heroicons-lock-closed"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid', label: $t('login.label.submit')}"
      @submit="authStore.login"
    />
  </UCard>
</template>
