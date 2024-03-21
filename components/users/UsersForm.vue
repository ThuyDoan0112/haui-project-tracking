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

const state = reactive({
  name: undefined,
  email: undefined,
  password: undefined,
  studentCode: undefined,
})

function validate(state: CreateUserDto): FormError[] {
  const errors = []

  if (!state.name)
    errors.push({ path: 'name', message: 'Please enter a name.' })

  if (!state.email)
    errors.push({ path: 'email', message: 'Please enter an email.' })

  if (!state.password)
    errors.push({ path: 'password', message: 'Please enter an password.' })

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
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" placeholder="Teacher Mosh" autofocus />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="teacher@gmail.com"
      />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput
        v-model="state.password"
        type="password"
        placeholder="**********"
      />
    </UFormGroup>

    <UFormGroup label="Student Code" name="studentCode">
      <UInput
        v-model="state.studentCode"
        type="text"
        placeholder="2019600234"
      />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton
        label="Cancel"
        color="gray"
        variant="ghost"
        @click="emit('close')"
      />
      <UButton :loading="loading" type="submit" label="Save" color="black" />
    </div>
  </UForm>
</template>
