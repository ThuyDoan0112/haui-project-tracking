<script setup lang="ts">
const title = 'HaUI Project Tracking'

const links = []

const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: links.map(link => ({
      ...link,
      shortcuts: link.tooltip?.shortcuts,
    })),
  },
]
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

        <UDashboardSidebarLinks :links="links" />
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
