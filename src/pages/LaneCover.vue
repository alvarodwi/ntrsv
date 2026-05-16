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
  <div class="flex flex-col text-sm relative h-vh">

    <!-- CONTENT -->
    <div class="flex-1 px-3 py-2 flex flex-col justify-center pb-14">

      <!-- EMPTY -->
      <div v-if="!lane.selected.value" class="opacity-50 text-center">
        No selection yet
      </div>

      <!-- ACTIVE -->
      <div v-else class="flex flex-col gap-1">

        <!-- TOP -->
        <div class="flex justify-between items-baseline">
          <div class="flex-1 truncate font-medium text-base">
            {{ lane.selected.value.song.title }}
          </div>

          <div class="shrink-0 font-bold">
            {{ lane.selected.value.song.maps[lane.selected.value.difficulty] }}
          </div>
        </div>

        <!-- BOTTOM -->
        <div class="flex justify-between items-baseline text-xs opacity-70">
          <div class="flex gap-2 truncate">
            <span class="truncate">
              {{ lane.selected.value.song.artists.join(', ') }}
            </span>

            <span>|</span>

            <span class="truncate">
              {{ lane.selected.value.song.album.code }}
            </span>
          </div>

          <div class="shrink-0 font-medium">
            {{ lane.selected.value.difficulty }}
          </div>
        </div>

      </div>
      <!-- FILTER HINT -->
      <div class="mt-4 border-t text-[10px] opacity-50 leading-tight">
        <p>Filter is only applied when randomizing from main page</p>
      </div>
    </div>



    <!-- ACTION BAR -->
    <button
      class="absolute bottom-0 left-0 w-full py-2 border-t bg-white/5 hover:bg-white/10 transition flex items-center justify-center gap-2"
      @click="randomize">
      <div class="i-ph-arrow-clockwise text-lg" />
      <span class="text-xs opacity-80">Randomize</span>
    </button>

  </div>
</template>