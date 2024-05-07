<script setup lang="ts">
import type { User } from '~/types'

defineProps<{
  user: User
}>()

const emit = defineEmits<{
  logout: []
}>()

const { $i18n } = useNuxtApp()

const items = computed(() => [
  [
    {
      slot: 'account',
      label: '',
      disabled: true,
    },
  ],
  [
    {
      label: $i18n.t('sidebar.userDropdown.item.logout'),
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click() {
        emit('logout')
      },
    },
  ],
])
</script>

<template>
  <UDropdown
    mode="hover"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        class="w-full"
        :label="user.name"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template #leading>
          <UAvatar :alt="user.name" size="xs" />
        </template>

        <template #trailing>
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>{{ $t('sidebar.userDropdown.text.login') }}</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ user.email }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>
