<!-- A reusable card component with motion animation -->
<template>
  <div 
    v-motion
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
    :delay="delay"
    class="px-4 pt-4 pb-2 border rounded-lg transform transition-all duration-500 hover:scale-105"
  >
    <div class="flex items-center space-x-4">
      <div class="text-3xl">{{ icon }}</div>
      <div class="font-bold text-xl">{{ title }}</div>
    </div>
    <p class="mt-4 text-sm">
      <slot></slot>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  delay?: number
}>()
</script> 