<script setup lang="ts">
definePageMeta({
  middleware: () => {
    return navigateTo(`/classes/${useRoute().params.id}/students`)
  }
})

const classesStore = useClassesStore()
const { classDetail } = storeToRefs(classesStore)

const classStatus = computed(() => {
  return classesStore.getClassStatus(classDetail.value!.endDate)
})
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UDashboardSection title="Class Information">
      <div class="grid grid-cols-3 gap-2">
        <UFormGroup
          name="name"
          label="Name"
          class="grid col-span-2 gap-2 items-center"
          :ui="{ container: '' }"
        >
          <UInput
            :model-value="classDetail?.name"
            autocomplete="off"
            icon="i-heroicons-information-circle"
            size="md"
            disabled
          />
        </UFormGroup>

        <UFormGroup
          name="code"
          label="Code"
          class="grid col-span-1 gap-2"
          :ui="{ container: '' }"
        >
          <UInput
            :model-value="classDetail?.code"
            autocomplete="off"
            icon="i-heroicons-information-circle"
            size="md"
            disabled
          />
        </UFormGroup>
      </div>

      <UFormGroup
        name="teacher"
        label="Teacher"
        class="grid col-span-1 gap-2"
        :ui="{ container: '' }"
      >
        <UInput
          :model-value="classDetail?.teacher?.name"
          autocomplete="off"
          icon="i-heroicons-user-circle"
          size="md"
          disabled
        />
      </UFormGroup>

      <div class="grid grid-cols-3 gap-2">
        <UFormGroup
          name="startDate"
          label="Start Date"
          class="grid gap-2 items-center"
          :ui="{ container: '' }"
        >
          <UPopover disabled :popper="{ placement: 'bottom-start' }">
            <UButton
              icon="i-heroicons-calendar-days-20-solid"
              :label="formatDate(classDetail?.startDate)"
            />
            <template #panel>
              <DatePicker :model-value="classDetail?.startDate" disabled />
            </template>
          </UPopover>
        </UFormGroup>

        <UFormGroup
          name="endDate"
          label="End Date"
          class="grid gap-2"
          :ui="{ container: '' }"
        >
          <UPopover disabled :popper="{ placement: 'bottom-start' }">
            <UButton
              icon="i-heroicons-calendar-days-20-solid"
              :label="formatDate(classDetail?.endDate)"
            />

            <template #panel>
              <DatePicker :model-value="classDetail?.endDate" />
            </template>
          </UPopover>
        </UFormGroup>

        <UFormGroup
          name="status"
          label="Status"
          class="grid gap-2"
          :ui="{ container: '' }"
        >
          <UBadge
            :label="classStatus"
            :color="classStatus === 'active' ? 'green' : 'orange'"
            variant="subtle"
            class="capitalize"
            size="lg"
          />
        </UFormGroup>
      </div>

      <UFormGroup
        name="description"
        label="Description"
        class="grid grid-cols-1 gap-2"
        :ui="{ container: '' }"
      >
        <UTextarea
          :model-value="classDetail?.description"
          :rows="8"
          autoresize
          size="md"
          disabled
        />
      </UFormGroup>
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
