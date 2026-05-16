<script setup lang="ts">
import FilterPanel from "@/components/randomizer/FilterPanel.vue";
import ResultPanel from "@/components/randomizer/ResultPanel.vue";
import { useRandomizerStore } from "@/stores/randomizerStore";
import { useLaneSync } from "@/composables/useLaneSync";
import { onMounted } from "vue";

const randomizer = useRandomizerStore();
const lane = useLaneSync();

onMounted(() => lane.init());

function randomize() {
  randomizer.randomize();

  const pick = randomizer.selected;
  if (!pick) return;

  lane.emitSelection(pick.song.id, pick.difficulty);
  lane.emitFilterSync();
}
</script>

<template>
  <div class="mb-8 w-full justify-center">
    <button class="bg-orange w-full text-center px-2 py-3 rounded-sm text-black/90 underline" @click="randomize">Randomize</button>
  </div>
  <div class="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
    <ResultPanel />
    <FilterPanel />
  </div>
</template>
