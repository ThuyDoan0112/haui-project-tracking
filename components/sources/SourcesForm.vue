<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [data: any]
}>()

const state = reactive({
  name: undefined,
  description: undefined,
  path: undefined,
})

function validate(state: any): FormError[] {
  const errors = []

  if (!state.name)
    errors.push({ path: 'name', message: 'Please enter a name.' })

  if (!state.description)
    errors.push({ path: 'description', message: 'Please enter a description.' })

  if (!state.path)
    errors.push({ path: 'path', message: 'Please enter a path.' })

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
      <UInput
        v-model="state.name"
        placeholder="Enter source name"
        autofocus
      />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea
        v-model="state.description"
        type="text"
        placeholder="Enter source description"
        rows="5"
      />
    </UFormGroup>

    <UFormGroup label="Path" name="path">
      <UInput
        v-model="state.path"
        placeholder="Enter source path"
        autofocus
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
