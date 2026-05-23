<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'
import { onMounted } from 'vue'

import { useLaneSync } from '@/composables/useLaneSync'
import { laneChannel } from '@/services/channel'
import { loadSongs } from '@/services/songService'
import { useRandomizerStore } from '@/stores/randomizerStore'
import { useSongStore } from '@/stores/songStore'

const songs = useSongStore()
const randomizer = useRandomizerStore()

const lane = useLaneSync()

onMounted(async () => {
  songs.setSongs(await loadSongs())
  lane.init()

  laneChannel.postMessage({ type: 'REQUEST_STATE' })
})

function randomize() {
  randomizer.randomize()

  const pick = randomizer.selected
  if (!pick) return
  lane.emitSelection(pick.song.id, pick.difficulty)
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
      return 'text-white'
  }
}

const selectedDifficultyCard = (diff: string) => {
  switch (diff.toLowerCase()) {
    case 'casual':
      return 'border-[#9eac53]/30 bg-[#9eac53]/15 text-[#9eac53]'

    case 'normal':
      return 'border-[#c78a03]/30 bg-[#c78a03]/15 text-[#c78a03]'

    case 'hard':
      return 'border-[#f03055]/30 bg-[#f03055]/15 text-[#f03055]'

    case 'expert':
      return 'border-[#cc7dfa]/30 bg-[#cc7dfa]/15 text-[#cc7dfa]'

    default:
      return 'border-white/10 bg-white/5 text-white'
  }
}

const selectedDifficultyButton = (diff: string) => {
  switch (diff.toLowerCase()) {
    case 'casual':
      return 'bg-[#9eac53] text-black hover:brightness-110'

    case 'normal':
      return 'bg-[#c78a03] text-black hover:brightness-110'

    case 'hard':
      return 'bg-[#f03055] text-black hover:brightness-110'

    case 'expert':
      return 'bg-[#cc7dfa] text-black hover:brightness-110'

    default:
      return 'bg-white text-black'
  }
}

const difficultyGlowClass = (diff: string) => {
  switch (diff.toLowerCase()) {
    case 'casual':
      return 'bg-[#9eac53]'

    case 'normal':
      return 'bg-[#c78a03]'

    case 'hard':
      return 'bg-[#f03055]'

    case 'expert':
      return 'bg-[#cc7dfa]'

    default:
      return 'bg-white'
  }
}
</script>

<template>
  <div class="relative flex h-screen flex-col overflow-hidden bg-[#0d0d0f] text-white">
    <!-- glow -->
    <AnimatePresence mode="wait">
      <motion.div
        v-if="lane.selected.value"
        :key="lane.selected.value.difficulty"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 0.15 }"
        :exit="{ opacity: 0 }"
        :transition="{
          duration: 0.35,
          ease: 'easeOut',
        }"
        class="pointer-events-none absolute inset-0 blur-3xl"
        :class="difficultyGlowClass(lane.selected.value.difficulty)"
      />
    </AnimatePresence>

    <!-- content -->
    <div class="relative z-10 flex flex-1 flex-col justify-end p-3">
      <!-- empty -->
      <motion.div
        v-if="!lane.selected.value"
        :animate="{ opacity: [0.45, 0.7, 0.45] }"
        :transition="{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }"
        class="my-2 flex flex-col items-center gap-2 text-center"
      >
        <!-- icon -->
        <div class="i-ph-waveform text-5xl text-white/10" />

        <!-- title -->
        <div class="text-[0.7rem] tracking-[0.28em] text-white/35 uppercase">Standing By</div>

        <!-- hint -->
        <p class="text-sm text-white/25">Randomize from the main window</p>
      </motion.div>

      <!-- active -->
      <motion.div
        v-else
        :key="lane.selected.value.song.id"
        :initial="{ opacity: 0, y: 2 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{
          duration: 0.35,
          ease: 'easeOut',
        }"
        class="rounded-[24px] border border-white/5 bg-white/[0.03] p-3 backdrop-blur-xl"
      >
        <!-- top row -->
        <div class="flex items-start gap-3">
          <!-- rating -->
          <div
            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-2xl font-black"
            :class="selectedDifficultyCard(lane.selected.value.difficulty)"
          >
            {{ lane.selected.value.song.maps[lane.selected.value.difficulty] }}
          </div>

          <!-- info -->
          <div class="min-w-0 flex-1">
            <!-- top metadata -->
            <div class="mb-1 flex items-center gap-2">
              <div
                class="text-[0.6rem] font-semibold tracking-[0.18em] uppercase"
                :class="selectedDifficultyText(lane.selected.value.difficulty)"
              >
                {{ lane.selected.value.difficulty }}
              </div>

              <div class="h-1 w-1 rounded-full bg-white/20" />

              <div class="truncate text-[0.65rem] text-white/40">
                {{ lane.selected.value.song.album.code }}
              </div>
            </div>

            <!-- title -->
            <div class="truncate text-lg leading-tight font-black">
              {{ lane.selected.value.song.title }}
            </div>

            <!-- artists -->
            <div class="mt-1 truncate text-xs text-white/55">
              {{ lane.selected.value.song.artists.join(', ') }}
            </div>
          </div>
        </div>

        <!-- bottom row -->
        <div class="mt-3 flex items-center justify-between gap-3">
          <!-- hint -->
          <div class="text-[0.6rem] text-white/30">
            Randomize from main page after changing filters
          </div>

          <!-- button -->
          <button
            class="flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.7rem] font-semibold tracking-wide uppercase transition-all duration-150 hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]"
            :class="selectedDifficultyButton(lane.selected.value.difficulty)"
            @click="randomize"
          >
            <div class="i-ph-arrow-clockwise text-sm" />

            <span>Randomize</span>
          </button>
        </div>
      </motion.div>
    </div>
  </div>
</template>
