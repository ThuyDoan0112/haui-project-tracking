<template>
  <div ref="target" class="flex flex-col transition-opacity duration-500" :class="targetIsVisible ? 'opacity-100' : 'opacity-25'">
    <span class="flex-shrink-0 text-sm/6 font-semibold text-gray-500 dark:text-gray-400"> {{ formatDate(new Date(report.startDate)) }} - {{ formatDate(new Date(report.dueDate)) }}</span>

    <span class="text-primary dark:text-white font-bold text-3xl mt-2 group dark:hover:text-primary-400 transition-[color]">
      {{ report.name }}
    </span>
    <ul v-if="report.tasks?.length" class="mt-2 space-y-1 text-gray-600 dark:text-gray-300">
      <li v-for="task in report.tasks" :key="task.id" class="text-sm/6 break-all">
        
        <span class="font-medium text-gray-700 transition-[color]">
           <span class="text-gray-800">{{ task.name }}</span> - {{ task.description }} {{ `${task.isCompleted ? '✅' : '❌' }` }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

defineProps<{
  report: any
}>()

const target = ref(null)
const targetIsVisible = ref(false)

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting
}, {
  rootMargin: '-68px 0px -68px 0px'
})
</script>
