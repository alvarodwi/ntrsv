<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useSongStore } from "@/stores/songStore";
import { useFilterStore } from "@/stores/filterStore";
import { loadSongs } from "@/services/songService";
import { DifficultyList } from "@/types/difficulty";
import FilterSection from "@/components/randomizer/FilterSection.vue";

const songs = useSongStore();
const filter = useFilterStore();

async function reloadSongs() {
  songs.setSongs(await loadSongs());
}

onMounted(async () => {
  await reloadSongs();
});

const allTags = computed(() =>
  [...new Set(songs.songs.flatMap((s) => s.tags))].sort(),
);

const allAlbums = computed(() =>
  Array.from(new Map(songs.songs.map((s) => [s.album.code, s.album])).values()),
);
</script>

<template>
  <section class="flex h-full flex-col gap-4 rounded border p-4">
    <FilterSection title="Difficulty">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="d in DifficultyList"
          :key="d"
          @click="filter.toggleDifficulty(d)"
          class="rounded  px-3 py-2 text-sm text-black border"
          :class="
            filter.difficulties.has(d)
              ? 'bg-amber-500 text-white hover:bg-amber-600'
              : ''
          "
        >
          {{ d }}
        </button>
      </div>
    </FilterSection>
    <FilterSection title="Rating">
      <div class="flex flex-col gap-4">
        <!-- MIN -->
        <div class="flex items-center gap-3">
          <span class="w-10 text-xs opacity-60">Min</span>

          <input
            type="range"
            min="1"
            max="19"
            v-model.number="filter.minRating"
            @input="
              filter.setMinRating(
                Number(($event.target as HTMLInputElement).value),
              )
            "
            class="w-full accent-yellow-400"
          />

          <span class="w-6 text-right text-xs">
            {{ filter.minRating }}
          </span>
        </div>

        <!-- MAX -->
        <div class="flex items-center gap-3">
          <span class="w-10 text-xs opacity-60">Max</span>

          <input
            type="range"
            min="1"
            max="19"
            v-model.number="filter.maxRating"
            @input="
              filter.setMaxRating(
                Number(($event.target as HTMLInputElement).value),
              )
            "
            class="w-full accent-yellow-400"
          />

          <span class="w-6 text-right text-xs">
            {{ filter.maxRating }}
          </span>
        </div>

        <!-- RANGE DISPLAY -->
        <div class="text-left text-xs opacity-50">
          ★ {{ filter.minRating }} – {{ filter.maxRating }}
        </div>
      </div>
    </FilterSection>

    <FilterSection title="Tags">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="filter.toggleTag(tag)"
          :class="
            filter.tags.has(tag)
              ? 'border-yellow-300 bg-yellow-300 text-black'
              : 'border-gray-700 text-black '
          "
          class="rounded-full border px-2 py-1 text-xs transition"
        >
          {{ tag }}
        </button>
      </div>
    </FilterSection>

    <FilterSection title="Albums">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="album in allAlbums"
          :key="album.code"
          @click="filter.toggleAlbum(album.code)"
          :class="
            filter.albums.has(album.code)
              ? 'border-yellow-700 bg-yellow-700 text-white'
              : 'border-gray-700 text-black '
          "
          class="rounded-full border px-2 py-1 text-xs transition"
        >
          {{ album.code }}
        </button>
      </div>
    </FilterSection>
  </section>
</template>
