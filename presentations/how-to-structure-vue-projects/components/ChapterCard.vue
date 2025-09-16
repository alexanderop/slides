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
/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Simple fade-in animation */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Main Card - Clean and Minimal */
.chapter-card {
  @apply flex flex-col items-center justify-center h-full text-center;
  background: transparent;
  position: relative;
  padding: 4rem;
  animation: fadeIn 0.8s ease-out;
}

/* Chapter Number - Underlined like Kill Bill */
.chapter-number {
  @apply text-5xl font-bold mb-6;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: #FF6BED;
  letter-spacing: 0.1em;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 8px;
  margin-bottom: 2rem;
}

/* Chapter Title - Clean typography */
.chapter-title {
  @apply text-6xl font-normal mb-4;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  color: #FF6BED;
  letter-spacing: 0.05em;
  line-height: 1.1;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

/* Chapter Subtitle - Smaller, italic */
.chapter-subtitle {
  @apply text-2xl;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  color: #FF6BED;
  font-style: italic;
  letter-spacing: 0.05em;
}
</style>