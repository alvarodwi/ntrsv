<script setup lang="ts">
import { onMounted } from "vue";
import { laneChannel } from "@/services/channel";
import { useSongStore } from "@/stores/songStore";
import { useRandomizerStore } from "@/stores/randomizerStore";
import { loadSongs } from "@/services/songService";
import { useLaneSync } from "@/composables/useLaneSync";

const songs = useSongStore();
const randomizer = useRandomizerStore();

const lane = useLaneSync();

onMounted(async () => {
  songs.setSongs(await loadSongs());
  lane.init();

  laneChannel.postMessage({ type: "REQUEST_STATE" });
});

function randomize() {
  randomizer.randomize();

  const pick = randomizer.selected;
  if (!pick) return;
  lane.emitSelection(pick.song.id, pick.difficulty);
}
</script>

<template>
  <div class="h-vh relative flex flex-col text-sm bg-black text-white">
    <!-- CONTENT -->
    <div class="flex flex-1 flex-col justify-center px-3 py-2 pb-14">
      <!-- EMPTY -->
      <div v-if="!lane.selected.value" class="text-center opacity-50">
        No selection yet
      </div>

      <!-- ACTIVE -->
      <div v-else class="flex flex-col gap-1">
        <!-- TOP -->
        <div class="flex items-baseline justify-between">
          <div class="flex-1 truncate text-base font-medium">
            {{ lane.selected.value.song.title }}
          </div>

          <div class="shrink-0 font-bold">
            {{ lane.selected.value.song.maps[lane.selected.value.difficulty] }}
          </div>
        </div>

        <!-- BOTTOM -->
        <div class="flex items-baseline justify-between text-xs opacity-70">
          <div class="flex gap-2 truncate">
            <span class="truncate">
              {{ lane.selected.value.song.artists.join(", ") }}
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
      <div class="mt-4 border-t text-[10px] leading-tight opacity-50">
        <p>Filter is only applied when randomizing from main page</p>
      </div>
    </div>

    <!-- ACTION BAR -->
    <button
      class="absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 border-t bg-orange/20 py-2 transition hover:bg-orange/10"
      @click="randomize"
    >
      <div class="i-ph-arrow-clockwise text-lg" />
      <span class="text-xs opacity-80">Randomize</span>
    </button>
  </div>
</template>
