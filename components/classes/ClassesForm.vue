<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { CreateClassDto, User } from '~/types'

defineProps<{
  loading: boolean
  users: User[]
}>()

const emit = defineEmits<{
  close: []
  submit: [data: CreateClassDto]
}>()

const state = reactive({
  name: undefined,
  description: undefined,
  code: undefined,
  startDate: undefined,
  endDate: undefined,
  teacherId: undefined,
})

function validate(state: CreateClassDto): FormError[] {
  const errors = []

  if (!state.name)
    errors.push({ path: 'name', message: 'Please enter a name.' })

  if (!state.code)
    errors.push({ path: 'code', message: 'Please enter a code.' })

  if (!state.startDate)
    errors.push({ path: 'startDate', message: 'Please enter a start date.' })

  if (!state.endDate)
    errors.push({ path: 'endDate', message: 'Please enter a end date.' })

  return errors
}

function onSubmit(event: FormSubmitEvent<CreateClassDto>) {
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
        placeholder="Enter your class name"
        autofocus
      />
    </UFormGroup>

    <UFormGroup label="Code" name="code">
      <UInput
        v-model="state.code"
        type="text"
        placeholder="Enter your class code"
      />
    </UFormGroup>

    <UFormGroup label="Description" name="description">
      <UTextarea
        v-model="state.description"
        type="text"
        placeholder="Enter your class description"
      />
    </UFormGroup>

    <UFormGroup label="Teacher" name="teacherId">
      <USelectMenu
        v-model="state.teacherId"
        :options="users"
        value-attribute="id"
        option-attribute="name"
      >
        <template #leading>
          <UIcon name="i-heroicons-user-circle" class="w-5 h-5" />
        </template>
        <template #option="{ option: user }">
          <UIcon name="i-heroicons-user-circle" class="w-5 h-5" />
          <span class="truncate">{{ user.name }}</span>
        </template>
      </USelectMenu>
    </UFormGroup>

    <UFormGroup label="Start Date" name="startDate">
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

    <UFormGroup label="End Date" name="endDate">
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton
          icon="i-heroicons-calendar-days-20-solid"
          :label="formatDate(state.endDate)"
        />

        <template #panel="{ close }">
          <DatePicker v-model="state.endDate" @close="close" />
        </template>
      </UPopover>
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
