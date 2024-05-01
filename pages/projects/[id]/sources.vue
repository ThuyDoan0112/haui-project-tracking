<script setup lang="ts">
const projectsStore = useProjectStore();

const { sources } = storeToRefs(projectsStore);
const { fetchSources } = projectsStore;

await fetchSources(+useRoute().params.id);
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UDashboardSection
      title="Project Sources"
      description="Sources related to this project."
      :ui="{ wrapper: '*:pt-0' }"
      :links="[
        {
          label: `New`,
          color: 'primary',
          icon: 'i-heroicons-plus',
          click: () => {},
        },
      ]"
    >
      <UDashboardCard
        v-for="source in sources"
        :key="source.id"
        :icon="source.type === 'code' ? 'i-heroicons-code-bracket' : 'i-heroicons-document-text'"
        :title="source.name"
        :description="source.description"
        :links="[{ color: 'gray', trailingIcon: 'i-heroicons-arrow-right-20-solid', to: source.path, target: '_blank'}]"
      />
    </UDashboardSection>
  </UDashboardPanelContent>
</template>