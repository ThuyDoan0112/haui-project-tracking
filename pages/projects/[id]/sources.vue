<script setup lang="ts">
const projectsStore = useProjectStore();

const { sources } = storeToRefs(projectsStore);
const { fetchSources, createSource } = projectsStore;

const classStore = useClassesStore();
const { isTeacher } = storeToRefs(classStore);

await fetchSources(+useRoute().params.id);
await classStore.fetchClass(+useRoute().query.classId);

const {
  isVisibleCreateSourceModal,
  createSourceModalTitle,
  openCreateSourceModal,
  closeCreateSourceModal,
} = useCreateTaskModal();

const isLoading = ref(false);
async function handleCreateSource(data: any) {
  if (isLoading.value) return;

  isLoading.value = true;
  await createSource({ ...data, projectId: +useRoute().params.id }).finally(
    () => (isLoading.value = false)
  );

  closeCreateSourceModal();
}

const links = computed(() => {
  if (isTeacher.value) return [];
  return [
    {
      label: `New`,
      color: "primary",
      icon: "i-heroicons-plus",
      click: openCreateSourceModal,
    },
  ];
});

function useCreateTaskModal() {
  const createSourceModalTitle = "Create Task";
  const isVisibleCreateSourceModal = ref(false);

  const openCreateSourceModal = () => {
    isVisibleCreateSourceModal.value = true;
  };

  const closeCreateSourceModal = () => {
    isVisibleCreateSourceModal.value = false;
  };

  return {
    isVisibleCreateSourceModal,
    createSourceModalTitle,
    openCreateSourceModal,
    closeCreateSourceModal,
  };
}
</script>

<template>
  <UDashboardPanelContent class="pb-12">
    <UDashboardSection
      :title="$t('projectSource.title')"
      :ui="{ wrapper: '*:pt-0' }"
      :links="links"
    >
      <UDashboardCard
        v-for="source in sources"
        :key="source.id"
        :icon="
          source.type === 'code'
            ? 'i-heroicons-code-bracket'
            : 'i-heroicons-document-text'
        "
        :title="source.name"
        :description="source.description"
        :links="[
          {
            color: 'gray',
            trailingIcon: 'i-heroicons-arrow-right-20-solid',
            to: source.path,
            target: '_blank',
          },
        ]"
      />
    </UDashboardSection>
    <UDashboardSlideover
      v-model="isVisibleCreateSourceModal"
      :title="createSourceModalTitle"
    >
      <SourcesForm
        :loading="isLoading"
        @close="closeCreateSourceModal"
        @submit="handleCreateSource"
      />
    </UDashboardSlideover>
  </UDashboardPanelContent>
</template>
