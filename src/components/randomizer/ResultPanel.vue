<script setup lang="ts">
import { useLaneSync } from "@/composables/useLaneSync";

const lane = useLaneSync();

const selectedDifficultyGlow = (diff: string) => {
  switch (diff.toLowerCase()) {
    case "casual":
      return "bg-[#9eac53]/10";
    case "normal":
      return "bg-[#c78a03]/10";
    case "hard":
      return "bg-[#f03055]/10";
    case "expert":
      return "bg-[#cc7dfa]/10";
    default:
      return "bg-gold/10";
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
      <div class="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
        <div
          v-for="(rating, diff) in lane.selected.value?.song.maps"
          :key="diff"
          class="border-charcoal/5 relative flex flex-col items-center gap-2 rounded-2xl border bg-white/65 p-4"
          :class="diff === lane.selected.value?.difficulty ? 'z-10' : ''"
        >
          <!-- GPU-friendly glow layer (instead of shadow animation) -->
          <div
            v-if="diff === lane.selected.value?.difficulty"
            class="absolute inset-0 rounded-2xl opacity-100"
            :class="selectedDifficultyGlow(diff)"
          />

          <!-- content wrapper -->
          <div
            class="relative flex flex-col items-center gap-2 transition-transform duration-150 ease-out"
            :class="
              diff === lane.selected.value?.difficulty
                ? 'translate-y-[-2px] will-change-transform'
                : ''
            "
          >
            <!-- diff label -->
            <div
              class="text-[0.7rem] tracking-[0.15em] uppercase"
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
              class="text-3xl font-black"
              :class="
                diff === lane.selected.value?.difficulty
                  ? selectedDifficultyText(diff)
                  : 'text-charcoal'
              "
            >
              {{ rating }}
            </div>

            <!-- selected label -->
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
    </div>
  </section>
</template>
