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
  <div class="flex flex-col gap-6">
    <!-- action -->
    <div class="flex justify-center">
      <button
        class="bg-gold text-charcoal flex flex-row rounded-full px-8 py-3 text-sm font-semibold tracking-[0.15em] uppercase shadow-[0_4px_14px_rgba(244,203,143,0.35)] transition-all duration-150 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(244,203,143,0.45)] active:translate-y-0 active:scale-[0.98]"
        @click="randomize"
      >
        <div class="i-ph-sparkle my-auto mr-2 text-lg" />
        Randomize
      </button>
    </div>

    <!-- content -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-[1.1fr_0.9fr]">
      <!-- result -->
      <div
        class="border-charcoal/5 rounded-[24px] border bg-white/35 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md"
      >
        <ResultPanel />
      </div>

      <!-- filters -->
      <div
        class="border-charcoal/5 rounded-[24px] border bg-white/35 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md"
      >
        <FilterPanel />
      </div>
    </div>
  </div>
</template>
