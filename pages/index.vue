<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const classesStore = useClassesStore()
const { teacherClasses, studentClasses } = storeToRefs(classesStore)
const { fetchTeacherClasses, fetchStudentClasses } = classesStore

await fetchTeacherClasses(user.value!.id)
await fetchStudentClasses(user.value!.id)

const myClasses = computed(() => {
  return [...teacherClasses.value, ...studentClasses.value]
})

const isTeacher = (myClass: any) => myClass.teacherId === user.value!.id
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="My Classes" :badge="myClasses?.length" />

      <UDashboardPanelContent class="pb-24">
        <UAlert
          v-if="!myClasses.length"
          title="You don't have any classes yet!"
          color="amber"
        />
        <template v-else>
          <UDashboardCard
            v-for="myClass in myClasses"
            :key="myClass.id"
            icon="i-heroicons-chart-bar"
            class="mb-4"
            :title="myClass.name"
            :description="myClass.code"
            :links="[
              {
                label: '',
                color: 'gray',
                trailingIcon: 'i-heroicons-arrow-right-20-solid',
                to: `${isTeacher(myClass) ? `/classes/${myClass.id}/students` : `/projects/${myClass.project?.id}?classId=${myClass.id}`}`,
              },
            ]"
          />
        </template>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
