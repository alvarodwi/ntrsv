<script setup lang="ts">
import FilterPanel from '@/components/randomizer/FilterPanel.vue';
import ResultPanel from '@/components/randomizer/ResultPanel.vue';
import { useRandomizerStore } from '@/stores/randomizerStore';
import { useLaneSync } from '@/composables/useLaneSync';
import { onMounted } from 'vue';

const randomizer = useRandomizerStore()
const lane = useLaneSync()

onMounted(() => lane.init())

function randomize() {
    randomizer.randomize()

    const pick = randomizer.selected
    if (!pick) return

    lane.emitSelection(pick.song.id, pick.difficulty)
}
</script>

<template>
    <div class="flex justify-center mb-8">
        <button @click="randomize">
            Randomize
        </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <ResultPanel />
        <FilterPanel />
    </div>
</template>