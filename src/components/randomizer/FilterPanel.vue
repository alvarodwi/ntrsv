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

const allAccess = computed(() =>
  Array.from(new Set(songs.songs.map((s) => s.access))).sort(),
);

const hasActiveFilters = computed(() => {
  return (
    filter.tags.size > 0 ||
    filter.albums.size > 0 ||
    !(filter.access.size === 1 && filter.access.has("free")) ||
    filter.minRating !== 1 ||
    filter.maxRating !== 19 ||
    filter.difficulties.size > 0
  );
});

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
    class="border-charcoal/5 flex h-full flex-col gap-4 rounded-[24px] border bg-white/55 p-4 backdrop-blur-md sm:p-5 md:gap-6 md:p-6"
  >
    <Transition
      enter-active-class="transition-opacity duration-700 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-400 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="hasActiveFilters"
        class="absolute top-4 right-4 flex items-center"
      >
        <button
          @click="filter.reset()"
          class="text-charcoal/50 hover:text-charcoal border-charcoal/10 flex items-center justify-center rounded-full border px-3 py-1 text-[0.7rem] font-medium transition-colors duration-300 hover:border-black/5 hover:bg-black/[0.03]"
        >
          <div class="i-ph-broom mr-2" />
          Reset
        </button>
      </div>
    </Transition>
    <!-- Difficulty -->
    <FilterSection title="Difficulty">
      <div class="grid grid-cols-2 gap-2 md:grid-cols-4">
        <button
          v-for="d in DifficultyList"
          :key="d"
          @click="filter.toggleDifficulty(d)"
          class="rounded-full border px-3 py-1.5 text-[0.7rem] font-semibold tracking-wide uppercase transition-all duration-150 sm:px-4 sm:py-2 sm:text-xs"
          :class="difficultyFilterClass(d)"
        >
          {{ d }}
        </button>
      </div>
    </FilterSection>

    <!-- Rating -->
    <FilterSection title="Rating">
      <div class="flex flex-col gap-4">
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

    <div class="border-charcoal/5 border-t" />

    <!-- Access -->
    <FilterSection title="Access">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="access in allAccess"
          :key="access"
          @click="filter.toggleAccess(access)"
          class="border-charcoal/10 text-charcoal/70 rounded-full border px-2.5 py-1 text-xs transition-[background-color,border-color,color,transform] duration-300 ease-out sm:px-3 sm:py-1.5 sm:text-xs"
          :class="
            filter.access.has(access)
              ? 'border-coral/40 bg-coral/25 text-coral translate-y-[-1px] font-medium'
              : 'hover:bg-coral/10 text-charcoal/50'
          "
        >
          {{ access.toUpperCase() }}
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
          class="border-charcoal/10 text-charcoal/70 rounded-full border px-2.5 py-1 text-xs transition-[background-color,border-color,color,transform] duration-300 ease-out sm:px-3 sm:py-1.5 sm:text-xs"
          :class="
            filter.albums.has(album.code)
              ? 'border-purple/40 bg-purple/25 text-purple translate-y-[-1px] font-medium'
              : 'hover:bg-purple/10 text-charcoal/50'
          "
        >
          {{ album.code }}
        </button>
      </div>
    </FilterSection>

    <!-- Tags -->
    <FilterSection title="Tags">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="filter.toggleTag(tag)"
          class="border-charcoal/10 text-charcoal/70 rounded-full border px-2.5 py-1 text-xs text-[0.7rem] transition-[background-color,border-color,color,transform] duration-300 ease-out sm:px-3 sm:py-1.5"
          :class="
            filter.tags.has(tag)
              ? 'border-gold/40 bg-gold/25 text-charcoal translate-y-[-1px] font-medium'
              : 'hover:bg-gold/10 text-charcoal/50'
          "
        >
          {{ tag }}
        </button>
      </div>
    </FilterSection>
  </section>
</template>
