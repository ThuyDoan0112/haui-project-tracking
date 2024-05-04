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
  startDate: undefined,
  dueDate: undefined,
})

function validate(state: any): FormError[] {
  const errors = []

  if (!state.name)
    errors.push({ path: 'name', message: 'Please enter a name.' })

  if (!state.startDate)
    errors.push({ path: 'startDate', message: 'Please enter a start date.' })

  if (!state.dueDate)
    errors.push({ path: 'dueDate', message: 'Please enter a due date.' })

  if (new Date(state.startDate) >= new Date(state.dueDate)) {
    errors.push({
      path: 'dueDate',
      message: 'Due date must be greater than start date.',
    })
  }

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
        placeholder="Enter report name"
        autofocus
      />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea
        v-model="state.description"
        type="text"
        placeholder="Enter report description"
        rows="5"
      />
    </UFormGroup>

    <div class="flex justify-between">
      <UFormGroup label="Start Date" name="startDate" class="flex-1">
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="formatDate(state.startDate)"
          />

          <template #panel="{ close }">
            <DatePicker v-model="state.startDate" @close="close" />
          </template>
        </UPopover>
      </UFormGroup>

      <UFormGroup label="Due Date" name="dueDate" class="flex-1">
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="formatDate(state.dueDate)"
          />

          <template #panel="{ close }">
            <DatePicker v-model="state.dueDate" @close="close" />
          </template>
        </UPopover>
      </UFormGroup>
    </div>

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
