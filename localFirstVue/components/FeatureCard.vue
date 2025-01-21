<template>
  <div class="flex items-start space-x-6">
    <div class="p-4 border rounded-lg">
      <div class="text-3xl">{{ icon }}</div>
    </div>
    <div>
      <h3 class="text-xl font-bold">{{ title }}</h3>
      <div class="text-gray-600">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
}>()
</script> 