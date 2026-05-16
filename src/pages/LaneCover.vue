<script setup lang="ts">
import { onMounted } from 'vue'
import { laneChannel } from '@/services/channel'
import { useSongStore } from '@/stores/songStore'
import { useRandomizerStore } from '@/stores/randomizerStore'
import { loadSongs } from '@/services/songService'
import { useLaneSync } from '@/composables/useLaneSync'

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
</script>

<template>
  <div class="h-full w-full flex flex-col text-sm">

    <!-- TITLEBAR -->
    <div class="flex items-center justify-between px-2 py-1 border-b opacity-80">
      <div class="font-medium tracking-wide">
        ntrsv
      </div>

      <button class="opacity-60 hover:opacity-100 transition" @click="randomize" title="Randomize">
        <div class="i-ph-arrow-clockwise text-lg" />
      </button>

    </div>

    <!-- CONTENT -->
    <div class="flex-1 px-3 py-2 flex flex-col justify-center">
      <!-- EMPTY -->
      <div v-if="!lane.selected.value" class="opacity-50 text-center">
        No selection yet
      </div>

      <!-- ACTIVE -->
      <div v-else class="flex flex-col gap-1">
        <!-- TOP ROW -->
        <div class="flex justify-between items-baseline">
          <div class="flex-1 truncate font-medium text-base">
            {{ lane.selected.value?.song.title }}
          </div>

          <div class="shrink-0 font-bold">
            {{ lane.selected.value?.song.maps[lane.selected.value?.difficulty] }}
          </div>
        </div>

        <!-- BOTTOM ROW -->
        <div class="flex justify-between items-baseline text-xs opacity-70">

          <div class="flex gap-2 truncate">
            <span class="truncate">
              {{ lane.selected.value?.song.artists.join(', ') }}
            </span>

            <span> | </span>

            <span class="truncate">
              {{ lane.selected.value?.song.album.code }}
            </span>
          </div>

          <div class="shrink-0 font-medium">
            {{ lane.selected.value?.difficulty }}
          </div>

        </div>

      </div>
    </div>
  </div>
</template>