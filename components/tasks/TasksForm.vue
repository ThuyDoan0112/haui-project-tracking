<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const props = defineProps<{
  initValues?: any
  loading: boolean
}>()

const emit = defineEmits<{
  submit: [data: any]
}>()

const state = reactive({
  name: props.initValues?.name || undefined, 
  description: props.initValues?.description || undefined,
})
watchEffect(() => {
  state.name = props.initValues?.name || undefined
  state.description = props.initValues?.description || undefined
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
  state.description = undefined
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
    <UFormGroup label="Task" name="name" class="w-1/2">
      <UInput
        v-model="state.name"
        autofocus
      />
    </UFormGroup>
    <UFormGroup label="Output" name="description" class="w-1/2">
      <UInput
        v-model="state.description"
        autofocus
      />
    </UFormGroup>

    <UButton
      label="Save"
      type="submit"
    />
  </UForm>
</template>
