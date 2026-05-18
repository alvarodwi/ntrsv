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
const previewSize = 3;

function shufflePreview() {
  previewSongs.value = getRandomSample(songs.songs, previewSize);
}

onMounted(() => {
  shufflePreview();
});

const currentSongCount = computed(() => songs.songs.length);
</script>

<template>
  <section class="flex h-full flex-col gap-4">
    <!-- top bar -->
    <div class="flex items-center justify-between gap-3">
      <div>
        <div class="text-charcoal text-sm font-semibold dark:text-white">
          Library Preview
        </div>

        <p class="text-charcoal/50 mt-0.5 text-xs dark:text-white/50">
          Random sample from current dataset
        </p>
      </div>

      <button
        @click="shufflePreview"
        class="border-charcoal/10 text-charcoal hover:border-purple/20 hover:bg-purple/10 dark:bg-charcoal/50 flex flex-row rounded-full border bg-white/50 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-150 dark:border-white/10 dark:text-white"
      >
        <div class="i-ph-shuffle-angular my-auto mr-2" />
        Shuffle
      </button>
    </div>

    <!-- preview list -->

    <div
      v-for="song in previewSongs"
      :key="song.id"
      class="group hover:border-purple/10 dark:bg-white/5 dark:hover:bg-white/10 rounded-[18px] border border-transparent bg-white/45 p-4 transition-all duration-150 hover:bg-white/70"
    >
      <!-- top row -->
      <div class="flex items-start justify-between gap-2">
        <!-- title -->
        <div class="min-w-0 flex-1">
          <div
            class="text-charcoal max-w-75% truncate text-sm font-semibold dark:text-white"
          >
            {{ song.title }}
          </div>

          <div class="text-charcoal/55 dark:text-white/55 mt-1 truncate text-xs">
            {{ song.artists.join(", ") }}
          </div>
        </div>

        <!-- album -->
        <div
          class="bg-purple/10 text-purple shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide uppercase"
        >
          {{ song.album.code }}
        </div>
        <div
          class="bg-coral/10 text-coral shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide uppercase"
        >
          {{ song.access }}
        </div>
      </div>

      <!-- difficulties -->
      <div class="mt-3 flex flex-wrap gap-1.5">
        <div
          v-for="(rating, diff) in song.maps"
          :key="diff"
          class="bg-charcoal/[0.04] dark:bg-white/[0.04] text-charcoal/70 dark:text-white/70 rounded-full px-2 py-1 text-[0.65rem] font-medium"
        >
          {{ diff }} {{ rating }}
        </div>
      </div>
    </div>

    <!-- footer -->
    <div
      class="bg-charcoal/[0.03] dark:bg-white/[0.03] text-charcoal/60 dark:text-white/60 flex items-center justify-between rounded-full px-4 py-2 text-xs"
    >
      <span>Sample size: {{ previewSize }}</span>

      <span class="text-purple font-semibold">
        {{ currentSongCount }} total
      </span>
    </div>
  </section>
</template>
