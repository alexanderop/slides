<template>
  <div class="flex items-center gap-2">
    <div :class="[iconClass, 'text-2xl']" :style="{ color }" />
    {{ text }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  iconClass: string
  text: string
  color: string
}>()
</script>