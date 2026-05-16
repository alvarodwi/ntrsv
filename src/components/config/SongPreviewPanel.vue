<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useSongStore } from "@/stores/songStore";
import type { Song } from "@/types/song";

const songs = useSongStore();

function getRandomSample<T>(arr: T[], size: number): T[] {
  const copy = [...arr];
  const result: T[] = [];

  while (copy.length && result.length < size) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(index, 1)[0]);
  }

  return result;
}

const previewSongs = ref<Song[]>([]);
const previewSize = 5;

function shufflePreview() {
  previewSongs.value = getRandomSample(songs.songs, previewSize);
}

onMounted(() => {
  shufflePreview();
});

const currentSongCount = computed(() => songs.songs.length);
</script>

<template>
  <section class="flex h-full flex-col gap-4 overflow-auto rounded border p-4">
    <!-- header -->
    <div>
      <h2 class="text-lg font-medium">Song Library Preview</h2>
      <p class="text-xs opacity-60">Random sample from current dataset</p>
    </div>

    <!-- list -->
    <ul class="flex flex-col gap-2 text-sm">
      <li v-for="song in previewSongs" :key="song.id" class="flex flex-col">
        <div class="flex items-baseline justify-between gap-2">
          <strong class="truncate">
            {{ song.title }}
          </strong>

          <span class="shrink-0 text-xs opacity-50">
            {{ song.album.code }}
          </span>
        </div>

        <span class="truncate text-xs opacity-60">
          {{ song.artists.join(", ") }}
        </span>
      </li>
    </ul>

    <!-- footer -->
    <div class="mt-auto flex flex-col gap-2 text-xs opacity-60">
      <div class="flex justify-between">
        <span>Sample size: {{ previewSize }}</span>
        <span>Total: {{ currentSongCount }}</span>
      </div>
    </div>

    <!-- action -->
    <button
      @click="shufflePreview"
      class="rounded border px-2 py-1 text-xs opacity-80"
    >
      Shuffle sample
    </button>
  </section>
</template>
