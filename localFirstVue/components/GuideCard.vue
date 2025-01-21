<template>
  <a :href="href" target="_blank" class="p-6 border rounded-lg hover:border-primary transition-colors">
    <div class="flex items-center space-x-4 mb-4">
      <div class="text-3xl">{{ icon }}</div>
      <h3 class="text-xl font-bold">{{ title }}</h3>
    </div>
    <p class="opacity-80">
      <slot></slot>
    </p>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  icon: string
  title: string
}>()
</script> 