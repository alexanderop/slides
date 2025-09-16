<template>
  <div class="chapter-card">
    <div class="chapter-number">{{ chapterNumber }}</div>
    <div class="chapter-title">{{ title }}</div>
    <div v-if="subtitle" class="chapter-subtitle">{{ subtitle }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  chapterNumber: string
  title: string
  subtitle?: string
}>()
</script>

<style scoped>
.chapter-card {
  @apply flex flex-col items-center justify-center h-full text-center;
  background: radial-gradient(circle at center, rgba(255, 107, 237, 0.1) 0%, transparent 70%);
  position: relative;
}

.chapter-card::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  border: 3px solid rgba(255, 107, 237, 0.3);
  border-radius: 8px;
  z-index: 0;
}

.chapter-number {
  @apply text-6xl font-bold mb-4 text-primary;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  text-shadow: 0 0 20px rgba(255, 107, 237, 0.5);
  z-index: 1;
  position: relative;
}

.chapter-title {
  @apply text-4xl font-bold text-white mb-2;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
  position: relative;
  letter-spacing: 0.1em;
}

.chapter-subtitle {
  @apply text-xl opacity-70 text-white;
  font-style: italic;
  z-index: 1;
  position: relative;
}

/* Kill Bill style film grain effect */
.chapter-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.02) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.01) 1px, transparent 1px);
  background-size: 8px 8px, 12px 12px;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
}
</style>