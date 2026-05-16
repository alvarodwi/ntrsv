<!-- components/FilterSection.vue -->
<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <h3 class="text-xs md:text-sm opacity-70">
      {{ title }}
    </h3>

    <div class="flex flex-wrap gap-2">
      <slot />
    </div>
  </div>
</template>