<script setup lang="ts">
const authStore = useAuthStore()
const { user, isAdmin } = storeToRefs(authStore)

const { $i18n } = useNuxtApp()
const title = computed(() => $i18n.t('sidebar.title'))

const links = computed(() => {
  return [
    {
      id: 'home',
      label: $i18n.t('sidebar.item.home'),
      icon: 'i-heroicons-home',
      to: '/',
    },
    ...(isAdmin.value
      ? [
          {
            id: 'admin',
            label: $i18n.t('sidebar.item.dashboard'),
            to: '/admin',
            icon: 'i-heroicons-cog-8-tooth',
            children: [
              {
                label: $i18n.t('sidebar.item.users'),
                to: '/admin/users',
                exact: true,
              },
              {
                label: $i18n.t('sidebar.item.classes'),
                to: '/admin/classes',
                exact: true,
              },
              {
                label: $i18n.t('sidebar.item.documents'),
                to: '/admin/documents',
                exact: true,
              },
            ],
          },
        ]
      : []),
  ]
})

const locales = ref([
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Vietnamese' },
])

const { locale } = useI18n()
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="300"
      collapsible
    >
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <h1 class="text-xl font-bold text-primary">
            {{ title }}
          </h1>
        </template>
      </UDashboardNavbar>
      <UDivider class="sticky top-0" />
      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="links" />

        <UDivider class="sticky bottom-0" />

        <USelect v-model="locale" :options="locales" >
          <template #leading>
            <UIcon name="i-heroicons-language" class="w-5 h-5" />
          </template>
        </USelect>

        <template #footer>
          <UserDropdown v-if="user" :user="user" @logout="authStore.logout" />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />
  </UDashboardLayout>
</template>
