<script setup lang="ts">
import { useLaneSync } from "@/composables/useLaneSync";

const lane = useLaneSync();

const selectedDifficultyClass = (diff: string) => {
  switch (diff.toLowerCase()) {
    case "casual":
      return "scale-[1.1] border-[#9eac53] bg-[#9eac53]/60 shadow-[0_4px_14px_rgba(158,172,83,0.25)]";

    case "normal":
      return "scale-[1.1] border-[#c78a03] bg-[#c78a03]/60 shadow-[0_4px_14px_rgba(199,138,3,0.25)]";

    case "hard":
      return "scale-[1.1] border-[#f03055] bg-[#f03055]/60 shadow-[0_4px_14px_rgba(240,48,85,0.25)]";

    case "expert":
      return "scale-[1.1] border-[#cc7dfa] bg-[#cc7dfa]/60 shadow-[0_4px_14px_rgba(204,125,250,0.25)]";

    default:
      return " border-gold bg-gold/20";
  }
};

const selectedDifficultyText = (diff: string) => {
  switch (diff.toLowerCase()) {
    case "casual":
      return "text-[#9eac53]";

    case "normal":
      return "text-[#c78a03]";

    case "hard":
      return "text-[#f03055]";

    case "expert":
      return "text-[#cc7dfa]";

    default:
      return "text-gold";
  }
};
</script>

<template>
  <section
    class="border-charcoal/5 flex h-full flex-col items-center justify-center rounded-[24px] border bg-white/60 p-6 backdrop-blur-md"
  >
    <!-- EMPTY STATE -->
    <div
      v-if="!lane.selected.value"
      class="flex flex-col items-center gap-2 text-center"
    >
      <div class="text-charcoal/40 text-sm tracking-[0.2em] uppercase">
        No Selection
      </div>

      <p class="text-charcoal/60">Press randomize to generate a chart</p>
    </div>

    <!-- RESULT STATE -->
    <div
      v-else
      class="flex w-full max-w-xl flex-col items-center gap-8 text-center"
    >
      <!-- song info -->
      <div class="flex flex-col gap-2">
        <div
          class="text-[0.7rem] tracking-[0.25em] uppercase"
          :class="selectedDifficultyText(lane.selected.value.difficulty)"
        >
          Selected Track
        </div>

        <h1 class="text-charcoal text-4xl leading-tight font-black font-bold">
          {{ lane.selected.value?.song.title }}
        </h1>

        <div class="flex flex-wrap items-center justify-center gap-2">
          <!-- artists -->
          <div
            class="text-charcoal/60 bg-charcoal/[0.03] rounded-full px-3 py-1 text-xs backdrop-blur-sm"
          >
            {{ lane.selected.value?.song.artists.join(", ") }}
          </div>

          <!-- album -->
          <div
            class="bg-purple/15 text-purple border-purple/10 text-purple rounded-full border px-3 py-1 text-xs"
          >
            {{ lane.selected.value?.song.album.name }}
          </div>
        </div>
      </div>

      <!-- difficulty -->
      <div class="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        <div
          v-for="(rating, diff) in lane.selected.value?.song.maps"
          :key="diff"
          class="border-charcoal/5 flex flex-col items-center gap-2 rounded-2xl border bg-white/65 p-4 transition-all duration-150"
          :class="[
            diff === lane.selected.value?.difficulty
              ? selectedDifficultyClass(diff)
              : 'hover:bg-white/60',
          ]"
        >
          <!-- diff -->
          <div
            class="text-[0.7rem] tracking-[0.15em] uppercase transition-colors"
            :class="
              diff === lane.selected.value?.difficulty
                ? selectedDifficultyText(diff)
                : 'text-charcoal/70'
            "
          >
            {{ diff }}
          </div>

          <!-- rating -->
          <div
            class="text-3xl font-black transition-colors"
            :class="
              diff === lane.selected.value?.difficulty
                ? selectedDifficultyText(diff)
                : 'text-charcoal'
            "
          >
            {{ rating }}
          </div>

          <!-- selected -->
          <div
            class="min-h-[1rem] text-[0.65rem] tracking-wide uppercase"
            :class="
              diff === lane.selected.value?.difficulty
                ? selectedDifficultyText(diff)
                : 'text-transparent'
            "
          >
            selected
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
