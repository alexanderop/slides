<!-- /components/InteractiveComposablesDemo.vue -->
<template>
    <div class="rounded-2xl shadow p-6 backdrop-blur">
      <!-- 🤔 What's a composable? -->
      <h2 class="text-xl font-semibold mb-2">What are composables?</h2>
      <p class="mb-4">
        A <strong>composable</strong> is just a function that uses Vue's
        <code>ref / reactive / computed / watch</code>, lifecycle hooks, and <code>provide / inject</code> APIs and returns
        reactive state so multiple components can share it—think "Vue hooks".
      </p>
  
      <!-- 📈 Live reactivity demo -->
      <h2 class="text-xl font-semibold mb-2">Reactivity in action</h2>
      <div class="flex items-center gap-4 mb-2 select-none">
        <button class="px-3 py-1 rounded" @click="inc">＋</button>
        <button class="px-3 py-1 rounded" @click="dec">－</button>
        <span class="text-lg">count = <code>{{ count }}</code></span>
        <span class="opacity-70">(double: {{ double }})</span>
      </div>
  
      <!-- 🔍 Show the actual composable source -->
      <details class="mt-4 cursor-pointer">
        <summary class="font-semibold mb-2">View <code>useCounter()</code> source</summary>
        <pre class="mt-2 rounded p-4 overflow-x-auto">
  {{ composableSrc }}
        </pre>
      </details>
    </div>
  </template>
  
  <script setup lang="ts">
  /* ----------------------------------------------------------------------
     A simple composable: useCounter()
  ---------------------------------------------------------------------- */
  import { ref, computed } from 'vue'
  
  function useCounter(initial = 0) {
    const count = ref(initial)
    const inc   = () => ++count.value
    const dec   = () => --count.value
    const double = computed(() => count.value * 2)
  
    // 🔑  Return reactive state & helpers
    return { count, inc, dec, double }
  }
  
  /* ----------------------------------------------------------------------
     Use the composable inside this demo component
  ---------------------------------------------------------------------- */
  const { count, inc, dec, double } = useCounter()
  
  // for displaying the source inside <pre>
  const composableSrc = `
  function useCounter(initial = 0) {
    const count = ref(initial)
    const inc   = () => ++count.value
    const dec   = () => --count.value
    const double = computed(() => count.value * 2)
    return { count, inc, dec, double }
  }
  `.trim()
  </script>
  
  <style scoped>
  /* extra breathing room when it's embedded in a slide */
  :host, :root {
    max-width: 480px;
    margin-inline: auto;
  }
  </style>
  