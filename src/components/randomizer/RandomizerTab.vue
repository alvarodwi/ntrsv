<script setup lang="ts">
import FilterPanel from '@/components/randomizer/FilterPanel.vue';
import ResultPanel from '@/components/randomizer/ResultPanel.vue';
</script>

<template>
    <div class="flex gap-4 h-[calc(100%-56px)]">
        <FilterPanel />
        <ResultPanel />
    </div>
</template>