<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps<{
  isTeacher: boolean
  comment: string
}>()

const emit = defineEmits<{
  submit: [data: any]
}>()

const state = reactive({
  comment: props.comment || '',
})
watchEffect(() => {
  state.comment = props.comment || ''
})

function onSubmit(event: FormSubmitEvent<any>) {
  emit('submit', event.data)
}
</script>

<template>
  <UForm
    :validate-on="['submit']"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Comment" name="comment">
      <UTextarea
        :readonly="!isTeacher"
        v-model="state.comment"
        type="text"
        rows="5"
      />
    </UFormGroup>
    <div class="flex justify-end gap-3">
      <UButton type="submit" label="Save" v-if="isTeacher" :disabled="state.comment === comment"/>
    </div>
  </UForm>
</template>
