<!-- A reusable progress tracker component -->
<template>
  <div class="progress-track" :class="{ 'all-complete': isComplete }">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="progress-item"
      v-click="item.clickIndex"
    >
      <div class="progress-line"></div>
      <div class="stage">{{ item.stage }}</div>
      <div class="percentage">{{ item.percentage }}</div>
      <div class="description">{{ item.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ProgressItem {
  stage: string
  percentage: string
  description: string
  clickIndex: number
}

defineProps<{
  items: ProgressItem[]
  isComplete?: boolean
}>()
</script>

<style scoped>
.progress-track {
  position: relative;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 8rem;
}

.progress-track::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: rgba(255, 255, 255, 0.1);
  opacity: 1;
  transition: opacity 0.5s ease;
}

.progress-track.all-complete::before {
  opacity: 0;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 3rem;
  opacity: 0.5;
  transition: opacity 0.5s ease;
}

.progress-item.slidev-vclick-current {
  opacity: 1;
}

.progress-line {
  position: absolute;
  left: 0;
  width: 4px;
  height: 8rem;
  background: var(--slidev-theme-primary);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.5s ease;
}

.progress-item.slidev-vclick-current .progress-line,
.progress-item.slidev-vclick-prior .progress-line {
  transform: scaleY(1);
}

.stage {
  font-size: 2.5rem;
  font-weight: 500;
  min-width: 20rem;
}

.percentage {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--slidev-theme-primary);
}

.description {
  font-size: 1.2rem;
  opacity: 0.8;
  max-width: 25rem;
}

.slidev-vclick-hidden {
  transform: translateY(10px);
  opacity: 0;
}
</style> 