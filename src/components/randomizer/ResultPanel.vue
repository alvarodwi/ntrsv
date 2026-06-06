<script setup lang="ts">
import { motion } from 'motion-v'

import { useLaneSync } from '@/composables/useLaneSync'

const lane = useLaneSync()

const selectedDifficultyGlow = (diff: string) => {
  switch (diff.toLowerCase()) {
    case 'casual':
      return 'bg-[#9eac53]/10'
    case 'normal':
      return 'bg-[#c78a03]/10'
    case 'hard':
      return 'bg-[#f03055]/10'
    case 'expert':
      return 'bg-[#cc7dfa]/10'
    default:
      return 'bg-gold/10'
  }
}

const selectedDifficultyText = (diff: string) => {
  switch (diff.toLowerCase()) {
    case 'casual':
      return 'text-[#9eac53]'

    case 'normal':
      return 'text-[#c78a03]'

    case 'hard':
      return 'text-[#f03055]'

    case 'expert':
      return 'text-[#cc7dfa]'

    default:
      return 'text-gold'
  }
}
</script>

<template>
  <section
    class="border-charcoal/5 flex h-full flex-col items-center justify-center rounded-[24px] border bg-white/60 p-6 backdrop-blur-md dark:border-white/5 dark:bg-white/5"
  >
    <!-- EMPTY STATE -->
    <motion.div
      v-if="!lane.selected.value"
      :animate="{ opacity: [0.7, 1, 0.7] }"
      :transition="{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }"
      class="flex flex-col items-center gap-3 text-center"
    >
      <div class="i-ph-waveform text-charcoal/15 text-5xl dark:text-white/15" />

      <div class="text-charcoal/40 text-sm tracking-[0.25em] uppercase dark:text-white/40">
        Ready to Randomize
      </div>

      <p class="text-charcoal/55 text-sm dark:text-white/55">Press randomize to generate a chart</p>
    </motion.div>

    <!-- RESULT STATE -->
    <div v-else class="flex w-full max-w-xl flex-col items-center gap-8 text-center">
      <!-- song info -->
      <div class="flex flex-col gap-2">
        <div
          class="text-[0.7rem] tracking-[0.25em] uppercase transition-colors duration-700 ease-out dark:font-bold"
          :class="selectedDifficultyText(lane.selected.value.difficulty)"
        >
          Selected Track
        </div>

        <motion.h2
          :key="lane.selected.value.song.id"
          :initial="{ opacity: 0, y: 2 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{
            duration: 0.4,
            ease: 'easeOut',
          }"
          class="text-charcoal text-2xl leading-tight font-black font-bold sm:text-3xl md:my-2 md:text-4xl dark:text-white"
        >
          {{ lane.selected.value?.song.title }}
        </motion.h2>

        <div class="flex flex-col items-center gap-2 text-center">
          <!-- mobile -->
          <div class="text-charcoal/60 max-w-full truncate text-sm md:hidden dark:text-white/60">
            {{ lane.selected.value?.song.artists.join(', ') }}
          </div>

          <!-- desktop -->
          <div class="hidden flex-wrap items-center justify-center gap-2 md:flex">
            <!-- artists -->
            <div class="flex flex-wrap justify-center gap-1.5">
              <div
                v-for="artist in lane.selected.value?.song.artists"
                :key="artist"
                class="text-charcoal/70 bg-charcoal/[0.04] rounded-full px-3 py-1 text-xs transition-colors duration-700 ease-out dark:bg-white/[0.04] dark:text-white/70"
              >
                {{ artist }}
              </div>
            </div>

            <!-- separator -->
            <div class="bg-charcoal/20 h-1 w-1 rounded-full dark:bg-white/20" />

            <!-- album -->
            <div
              class="border-purple/10 bg-purple/10 dark:bg-purple/20 dark:border-purple/20 text-purple rounded-full border px-3 py-1 text-xs transition-colors duration-700 ease-out dark:text-white/45"
            >
              {{ lane.selected.value?.song.album.name }}
            </div>
          </div>

          <!-- mobile album -->
          <div
            class="border-purple/10 bg-purple/10 dark:bg-purple/20 dark:border-purple/20 text-purple rounded-full border px-3 py-1 text-[0.7rem] transition-colors duration-700 ease-out md:hidden dark:text-white/45"
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
          class="border-charcoal/5 dark:bg-charcoal/45 relative flex flex-col items-center gap-2 rounded-2xl border bg-white/65 p-4 dark:border-white/5"
          :class="diff === lane.selected.value?.difficulty ? 'z-10' : ''"
        >
          <!-- GPU-friendly glow layer (instead of shadow animation) -->
          <div
            v-if="diff === lane.selected.value?.difficulty"
            class="absolute inset-0 rounded-2xl opacity-100 transition-colors duration-700 ease-out"
            :class="selectedDifficultyGlow(diff)"
          />

          <!-- content wrapper -->
          <div
            class="relative flex flex-col items-center gap-2 transition-transform duration-150 ease-out dark:border-white/10"
            :class="
              diff === lane.selected.value?.difficulty
                ? 'translate-y-[-2px] will-change-transform'
                : ''
            "
          >
            <!-- diff label -->
            <div
              class="text-[0.7rem] tracking-[0.15em] uppercase transition-colors duration-700 ease-out dark:font-medium"
              :class="
                diff === lane.selected.value?.difficulty
                  ? selectedDifficultyText(diff)
                  : 'text-charcoal/70 dark:text-white/70'
              "
            >
              {{ diff }}
            </div>

            <!-- rating -->
            <div
              class="text-3xl font-black transition-colors duration-700 ease-out dark:font-bold"
              :class="
                diff === lane.selected.value?.difficulty
                  ? selectedDifficultyText(diff)
                  : 'text-charcoal dark:text-white'
              "
            >
              {{ rating }}
            </div>

            <!-- selected label -->
            <div
              class="min-h-[1rem] text-[0.65rem] tracking-wide uppercase transition-colors duration-700 ease-out dark:font-bold"
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
