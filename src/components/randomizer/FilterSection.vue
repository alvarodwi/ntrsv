<!-- components/FilterSection.vue -->
<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <h3 class="text-sm opacity-70">{{ title }}</h3>
    <slot />
  </div>
</template>