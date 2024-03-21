<script setup lang="ts">
const title = 'HaUI Project Tracking'

const authStore = useAuthStore()
const { user, isAdmin } = storeToRefs(authStore)

const links = computed(() => {
  return [
    {
      id: 'home',
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/',
      tooltip: {
        text: 'Home',
        shortcuts: ['G', 'H'],
      },
    },
    ...(isAdmin.value
      ? [
          {
            id: 'admin',
            label: 'Dashboard',
            to: '/admin',
            icon: 'i-heroicons-cog-8-tooth',
            children: [
              {
                label: 'Users',
                to: '/admin/users',
                exact: true,
              },
              {
                label: 'Classes',
                to: '/admin/classes',
                exact: true,
              },
            ],
            tooltip: {
              text: 'Dashboard',
              shortcuts: ['G', 'D'],
            },
          },
        ]
      : []),
  ]
})

const groups = computed(() => {
  return [
    {
      key: 'links',
      label: 'Go to',
      commands: links.value.map(link => ({
        ...link,
        shortcuts: link.tooltip?.shortcuts,
      })),
    },
  ]
})
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
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
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks class="flex-1" :links="links" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <UserDropdown v-if="user" :user="user" @logout="authStore.logout" />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
