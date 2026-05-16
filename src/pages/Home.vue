<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useSongStore } from '@/stores/songStore'
import { useFilterStore } from '@/stores/filterStore'
import { useRandomizerStore } from '@/stores/randomizerStore'
import { loadSongs } from '@/services/songService'
import { DifficultyList } from '@/types/difficulty'
import FilterSection from '@/components/FilterSection.vue'
import { laneChannel } from '@/services/channel'

const songs = useSongStore()
const filter = useFilterStore()
const randomizer = useRandomizerStore()
const selected = computed(() => randomizer.selected)

laneChannel.onmessage = (event) => {
  if (event.data.type === 'REQUEST_STATE' && selected.value) {
    laneChannel.postMessage({
      type: 'SYNC_RESULT',
      payload: {
        songId: selected.value.song.id,
        difficulty: selected.value.difficulty,
      },
    })
  }
}

onMounted(async () => {
  songs.setSongs(await loadSongs())
})

const allTags = computed(() =>
  [...new Set(songs.songs.flatMap(s => s.tags))].sort()
)

const allAlbums = computed(() =>
  Array.from(
    new Map(
      songs.songs.map(s => [s.album.code, s.album])
    ).values()
  )
)

function openLaneCover() {
  window.open(
    '/lane',
    'lane-cover',
    'width=320,height=200,left=100,top=100'
  )
}
</script>

<template>
  <div class="flex gap-4 p-4 h-screen">

    <!-- LEFT: FILTERS -->
    <div class="w-1/2 flex flex-col gap-4 overflow-auto">

      <!-- Difficulty -->
      <FilterSection title="Difficulty">
        <div class="flex gap-2 flex-wrap">
          <button v-for="d in DifficultyList" :key="d" @click="filter.toggleDifficulty(d)"
            :class="filter.difficulties.has(d) ? 'bg-blue-500' : 'bg-gray-600'">
            {{ d }}
          </button>
        </div>
      </FilterSection>

      <!-- Rating -->
      <FilterSection :title="`Rating: ${filter.minRating} - ${filter.maxRating}`">
        <input type="range" min="1" max="19" v-model.number="filter.minRating" />
        <input type="range" min="1" max="19" v-model.number="filter.maxRating" />
      </FilterSection>

      <!-- Tags -->
      <FilterSection title="Tags">
        <div class="flex flex-wrap gap-2">
          <button v-for="tag in allTags" :key="tag" @click="filter.toggleTag(tag)"
            :class="filter.tags.has(tag) ? 'bg-green-500' : 'bg-gray-600'">
            {{ tag }}
          </button>
        </div>
      </FilterSection>

      <!-- Albums -->
      <FilterSection title="Albums">
        <div class="flex flex-wrap gap-2">
          <button v-for="album in allAlbums" :key="album.code" @click="filter.toggleAlbum(album.code)"
            :class="filter.albums.has(album.code) ? 'bg-purple-500' : 'bg-gray-600'">
            {{ album.code }}
          </button>
        </div>
      </FilterSection>

      <!-- Randomize -->
      <button class="mt-auto bg-red-500 p-2" @click="randomizer.randomize()">
        Randomize
      </button>

      <button @click="openLaneCover">
        Open Lane Cover
      </button>
    </div>

    <!-- RIGHT: RESULT -->
    <div class="w-1/2 p-4 border rounded">
      <div v-if="!randomizer.selected">
        Hit Randomize
      </div>

      <div v-else>
        <h1 class="text-xl">{{ randomizer.selected.song.title }}</h1>
        <p>{{ randomizer.selected.song.artists.join(', ') }}</p>
        <p>
          {{ randomizer.selected.difficulty }}
          · {{ randomizer.selected.song.maps[randomizer.selected.difficulty] }}
        </p>
      </div>
    </div>

  </div>
</template>