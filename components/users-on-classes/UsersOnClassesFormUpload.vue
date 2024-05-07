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

const {$i18n} = useNuxtApp()

const state = reactive<UploadStudentsDto>({
  sheet: undefined,
})

function validate(state: UploadStudentsDto): FormError[] {
  const errors = []

  if (!state.sheet)
    errors.push({ path: 'sheet', message: $i18n.t('class.students.uploadStudentsModal.error') })

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
      :label="$i18n.t('class.students.uploadStudentsModal.label')"
      name="sheet"
      :help="$i18n.t('class.students.uploadStudentsModal.helper')"
    >
      <UInput type="file" @change="onFileChange" />
    </UFormGroup>

    <div class="flex justify-end gap-3">
      <UButton
        :label="$i18n.t('class.students.uploadStudentsModal.cancel')"
        color="gray"
        variant="ghost"
        @click="emit('close')"
      />
      <UButton :loading="loading" type="submit" :label="$i18n.t('class.students.uploadStudentsModal.save')" color="black" />
    </div>
  </UForm>
</template>
