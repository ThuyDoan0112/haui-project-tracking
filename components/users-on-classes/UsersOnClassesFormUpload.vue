<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { UploadStudentsDto } from '~/types'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [file: File]
}>()

const state = reactive<UploadStudentsDto>({
  sheet: undefined,
})

function validate(state: UploadStudentsDto): FormError[] {
  const errors = []

  if (!state.sheet)
    errors.push({ path: 'sheet', message: 'Please upload file.' })

  return errors
}

function onFileChange(event: InputEvent) {
  const target = event.target as HTMLInputElement
  const file = target.files[0]

  if (!file)
    return
  state.sheet = file
}

function onSubmit(event: FormSubmitEvent<any>) {
  emit('submit', event.data.sheet)
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
    <UFormGroup
      label="Student Sheet"
      name="sheet"
      help="Only excel file is allowed."
    >
      <UInput type="file" @change="onFileChange" />
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
