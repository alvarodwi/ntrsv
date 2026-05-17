<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useSongStore } from "@/stores/songStore";
import { useFilterStore } from "@/stores/filterStore";
import { loadSongs } from "@/services/songService";
import { DifficultyList, type Difficulty } from "@/types/difficulty";
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

const difficultyFilterClass = (diff: Difficulty) => {
  const active = filter.difficulties.has(diff);

  switch (diff.toLowerCase()) {
    case "casual":
      return active
        ? "border-[#9eac53] bg-[#9eac53]/20 text-[#9eac53]"
        : "border-[#9eac53]/20 bg-white/40 text-charcoal/60 hover:bg-[#9eac53]/10";

    case "normal":
      return active
        ? "border-[#c78a03] bg-[#c78a03]/20 text-[#c78a03]"
        : "border-[#c78a03]/20 bg-white/40 text-charcoal/60 hover:bg-[#c78a03]/10";

    case "hard":
      return active
        ? "border-[#f03055] bg-[#f03055]/20 text-[#f03055]"
        : "border-[#f03055]/20 bg-white/40 text-charcoal/60 hover:bg-[#f03055]/10";

    case "expert":
      return active
        ? "border-[#cc7dfa] bg-[#cc7dfa]/20 text-[#cc7dfa]"
        : "border-[#cc7dfa]/20 bg-white/40 text-charcoal/60 hover:bg-[#cc7dfa]/10";

    default:
      return "border-charcoal/10 bg-white/40 text-charcoal";
  }
};
</script>

<template>
  <section
    class="border-charcoal/5 flex h-full flex-col gap-6 rounded-[24px] border bg-white/55 p-6 backdrop-blur-md"
  >
    <!-- Difficulty -->
    <FilterSection title="Difficulty">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="d in DifficultyList"
          :key="d"
          @click="filter.toggleDifficulty(d)"
          class="rounded-full border px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-150"
          :class="difficultyFilterClass(d)"
        >
          {{ d }}
        </button>
      </div>
    </FilterSection>

    <!-- Rating -->
    <FilterSection title="Rating">
      <div class="flex flex-col gap-5">
        <!-- MIN -->
        <div class="flex items-center gap-3">
          <span class="text-charcoal/60 w-10 text-xs font-medium uppercase">
            Min
          </span>

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
            class="accent-purple w-full"
          />

          <span class="text-charcoal w-6 text-right text-sm font-semibold">
            {{ filter.minRating }}
          </span>
        </div>

        <!-- MAX -->
        <div class="flex items-center gap-3">
          <span class="text-charcoal/60 w-10 text-xs font-medium uppercase">
            Max
          </span>

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
            class="accent-purple w-full"
          />

          <span class="text-charcoal w-6 text-right text-sm font-semibold">
            {{ filter.maxRating }}
          </span>
        </div>

        <!-- RANGE DISPLAY -->
        <div
          class="text-charcoal/50 bg-purple/10 rounded-full px-3 py-1 text-xs tracking-wide"
        >
          ★ {{ filter.minRating }} – {{ filter.maxRating }}
        </div>
      </div>
    </FilterSection>

    <!-- Tags -->
    <FilterSection title="Tags">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="filter.toggleTag(tag)"
          class="border-charcoal/10 text-charcoal/70 rounded-full border bg-white/40 px-3 py-1.5 text-xs transition-all duration-150"
          :class="
            filter.tags.has(tag)
              ? 'border-gold bg-gold/20 text-charcoal'
              : 'hover:bg-gold/10'
          "
        >
          {{ tag }}
        </button>
      </div>
    </FilterSection>

    <!-- Albums -->
    <FilterSection title="Albums">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="album in allAlbums"
          :key="album.code"
          @click="filter.toggleAlbum(album.code)"
          class="border-charcoal/10 text-charcoal/70 rounded-full border bg-white/40 px-3 py-1.5 text-xs transition-all duration-150"
          :class="
            filter.albums.has(album.code)
              ? 'border-purple/30 bg-purple/15 text-purple'
              : 'hover:bg-purple/10'
          "
        >
          {{ album.code }}
        </button>
      </div>
    </FilterSection>
  </section>
</template>
