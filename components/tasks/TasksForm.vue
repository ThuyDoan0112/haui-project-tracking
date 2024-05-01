<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  submit: [data: any]
}>()

const state = reactive({
  name: undefined,
  description: undefined,
})

function validate(state: any): FormError[] {
  const errors = []

  if (!state.name)
    errors.push({ path: 'name', message: 'Please enter a name.' })

  return errors
}

function onSubmit(event: FormSubmitEvent<any>) {
  emit('submit', event.data)

  // Reset the form
  state.name = undefined
}
</script>

<template>
  <UForm
    :validate="validate"
    :validate-on="['submit']"
    :state="state"
    class="space-y-4 flex items-end gap-4"
    @submit="onSubmit"
  >
    <UFormGroup label="New Task" name="name" class="w-1/2">
      <UInput
        v-model="state.name"
        autofocus
      />
    </UFormGroup>

    <UButton
      label="Save"
      icon="i-heroicons-plus"
      type="submit"
    />
  </UForm>
</template>
