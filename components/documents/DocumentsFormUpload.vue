<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { UploadDocumentDto } from '~/types'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [data: UploadDocumentDto]
}>()

const state = reactive<UploadDocumentDto>({
  documents: undefined,
})

const MAX_FILE_COUNT = 5
function validate(state: UploadDocumentDto): FormError[] {
  const errors = []

  if (!state.documents)
    errors.push({ path: 'documents', message: 'Please upload documents.' })

  if (state.documents?.length > MAX_FILE_COUNT) {
    errors.push({
      path: 'documents',
      message: 'Please upload max 5 documents.',
    })
  }

  return errors
}

function onFilesChange(event: InputEvent) {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (!files?.length)
    return
  state.documents = files as FileList
}

function onSubmit(event: FormSubmitEvent<any>) {
  emit('submit', event.data.documents)
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
      label="Files"
      name="documents"
      help="Max file size 10MB, max count 5 files."
    >
      <UInput type="file" multiple @change="onFilesChange" />
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
