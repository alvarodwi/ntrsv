<!-- components/FilterSection.vue -->
<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <h3
      class="text-charcoal/70 text-[0.7rem] font-semibold tracking-[0.18em] uppercase dark:text-white/70"
    >
      {{ title }}
    </h3>

    <div class="flex flex-wrap gap-2">
      <slot />
    </div>
  </div>
</template>
