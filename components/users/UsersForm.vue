<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { CreateUserDto } from '~/types'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [data: CreateUserDto]
}>()

const { $i18n } = useNuxtApp()

const state = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
})

function validate(state: CreateUserDto): FormError[] {
  const errors = []

  if (!state.name)
    errors.push({ path: 'name', message: $i18n.t('dashboard.users.createModal.required') })

  if (!state.email)
    errors.push({ path: 'email', message: $i18n.t('dashboard.users.createModal.required') })

  if (!state.password)
    errors.push({ path: 'password', message: $i18n.t('dashboard.users.createModal.required') })

  return errors
}

function onSubmit(event: FormSubmitEvent<any>) {
  emit('submit', event.data)
}
</script>

<template>
  <UForm
    :validate="validate"
    :validate-on="['submit']"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup :label="$t('dashboard.users.createModal.name')" name="name">
      <UInput v-model="state.name" autofocus />
    </UFormGroup>

    <UFormGroup :label="$t('dashboard.users.createModal.email')" name="email">
      <UInput
        v-model="state.email"
        type="email"
      />
    </UFormGroup>

    <UFormGroup :label="$t('dashboard.users.createModal.password')"  name="password">
      <UInput
        v-model="state.password"
        type="password"
        placeholder="**********"
      />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton
        :label="$t('dashboard.users.createModal.cancel')"
        color="gray"
        variant="ghost"
        @click="emit('close')"
      />
      <UButton :loading="loading" type="submit" :label="$t('dashboard.users.createModal.save')" color="black" />
    </div>
  </UForm>
</template>
