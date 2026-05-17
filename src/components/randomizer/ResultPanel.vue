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

        <h1
          class="text-charcoal text-2xl leading-tight font-black font-bold sm:text-3xl md:text-4xl"
        >
          {{ lane.selected.value?.song.title }}
        </h1>

        <div class="flex flex-col items-center gap-2 text-center">
          <!-- mobile -->
          <div class="text-charcoal/60 max-w-full truncate text-sm md:hidden">
            {{ lane.selected.value?.song.artists.join(", ") }}
          </div>

          <!-- desktop -->
          <div
            class="hidden flex-wrap items-center justify-center gap-2 md:flex"
          >
            <!-- artists -->
            <div class="flex flex-wrap justify-center gap-1.5">
              <div
                v-for="artist in lane.selected.value?.song.artists"
                :key="artist"
                class="text-charcoal/70 bg-charcoal/[0.04] rounded-full px-3 py-1 text-xs"
              >
                {{ artist }}
              </div>
            </div>

            <!-- separator -->
            <div class="bg-charcoal/20 h-1 w-1 rounded-full" />

            <!-- album -->
            <div
              class="border-purple/10 bg-purple/10 text-purple rounded-full border px-3 py-1 text-xs"
            >
              {{ lane.selected.value?.song.album.name }}
            </div>
          </div>

          <!-- mobile album -->
          <div
            class="border-purple/10 bg-purple/10 text-purple rounded-full border px-3 py-1 text-[0.7rem] md:hidden"
          >
            {{ lane.selected.value?.song.album.name }}
          </div>
        </div>
      </div>

      <!-- difficulty -->
      <div class="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        <div
          v-for="(rating, diff) in lane.selected.value?.song.maps"
          :key="diff"
          class="border-charcoal/5 flex flex-col items-center justify-center rounded-2xl border bg-white/65 px-3 py-3 transition-all duration-150 sm:gap-2 sm:p-4"
          :class="[
            diff === lane.selected.value?.difficulty
              ? selectedDifficultyClass(diff)
              : 'hover:bg-white/60',
          ]"
        >
          <!-- diff -->
          <div
            class="text-[0.65rem] tracking-[0.12em] uppercase transition-colors sm:text-[0.7rem]"
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
            class="text-2xl font-black transition-colors sm:text-3xl"
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
            class="mt-0.5 min-h-[0.8rem] text-[0.6rem] tracking-wide uppercase sm:text-[0.65rem]"
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
