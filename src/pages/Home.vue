<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useSongStore } from '@/stores/songStore'
import { useFilterStore } from '@/stores/filterStore'
import { useRandomizerStore } from '@/stores/randomizerStore'
import {
  loadSongs,
  loadSongsFromFile,
  clearCustomSongs,
  hasCustomSongs as hasCustomSongsOverride,
} from '@/services/songService'
import { DifficultyList } from '@/types/difficulty'
import FilterSection from '@/components/randomizer/FilterSection.vue'
import { useLaneSync } from '@/composables/useLaneSync'

const songs = useSongStore()
const filter = useFilterStore()
const randomizer = useRandomizerStore()
const selected = computed(() => randomizer.selected)


const activeTab = ref<'randomizer' | 'config'>('randomizer')
const customLoaded = ref(false)
const uploadError = ref<string | null>(null)
const overrideName = ref('')

useLaneSync(selected)

async function reloadSongs() {
  songs.setSongs(await loadSongs())
  customLoaded.value = hasCustomSongsOverride()
}

onMounted(async () => {
  await reloadSongs()
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

const currentSongCount = computed(() => songs.songs.length)
const previewSongs = computed(() => songs.songs.slice(0, 20))

function openLaneCover() {
  window.open(
    '/lane',
    'lane-cover',
    'width=320,height=200,left=100,top=100'
  )
}

async function onSongFileChange(event: Event) {
  uploadError.value = null
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return
  if (!file.name.toLowerCase().endsWith('.json')) {
    uploadError.value = 'Please upload a JSON file.'
    return
  }

  try {
    const loadedSongs = await loadSongsFromFile(file)
    songs.setSongs(loadedSongs)
    customLoaded.value = true
    overrideName.value = file.name
  } catch (error: any) {
    uploadError.value = error?.message ?? 'Invalid song file.'
  }
}

async function resetToBundled() {
  clearCustomSongs()
  await reloadSongs()
  overrideName.value = ''
}
</script>

<template>
  <div class="p-4 h-screen">
    <div class="flex gap-2 mb-4">
      <button type="button" @click="activeTab = 'randomizer'"
        :class="activeTab === 'randomizer' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-slate-700'"
        class="px-4 py-2 rounded">
        Randomizer
      </button>
      <button type="button" @click="activeTab = 'config'"
        :class="activeTab === 'config' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-slate-700'"
        class="px-4 py-2 rounded">
        Songs Config
      </button>
    </div>

    <div v-if="activeTab === 'randomizer'" class="flex gap-4 h-[calc(100%-56px)]">
      <div class="w-1/2 flex flex-col gap-4 overflow-auto">
        <FilterSection title="Difficulty">
          <div class="flex gap-2 flex-wrap">
            <button v-for="d in DifficultyList" :key="d" @click="filter.toggleDifficulty(d)"
              :class="filter.difficulties.has(d) ? 'bg-blue-500' : 'bg-gray-600'" class="px-3 py-2 rounded">
              {{ d }}
            </button>
          </div>
        </FilterSection>

        <FilterSection :title="`Rating: ${filter.minRating} - ${filter.maxRating}`">
          <input type="range" min="1" max="19" v-model.number="filter.minRating" />
          <input type="range" min="1" max="19" v-model.number="filter.maxRating" />
        </FilterSection>

        <FilterSection title="Tags">
          <div class="flex flex-wrap gap-2">
            <button v-for="tag in allTags" :key="tag" @click="filter.toggleTag(tag)"
              :class="filter.tags.has(tag) ? 'bg-green-500' : 'bg-gray-600'" class="px-3 py-2 rounded">
              {{ tag }}
            </button>
          </div>
        </FilterSection>

        <FilterSection title="Albums">
          <div class="flex flex-wrap gap-2">
            <button v-for="album in allAlbums" :key="album.code" @click="filter.toggleAlbum(album.code)"
              :class="filter.albums.has(album.code) ? 'bg-purple-500' : 'bg-gray-600'" class="px-3 py-2 rounded">
              {{ album.code }}
            </button>
          </div>
        </FilterSection>

        <button class="mt-auto bg-red-500 p-2 rounded text-white" @click="randomizer.randomize()">
          Randomize
        </button>

        <button class="bg-slate-700 text-white p-2 rounded" @click="openLaneCover">
          Open Lane Cover
        </button>
      </div>

      <div class="w-1/2 p-4 border rounded overflow-auto">
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

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100%-56px)] overflow-auto">
      <section class="p-4 border rounded">
        <h2 class="text-xl mb-3">Song configuration</h2>
        <p class="mb-3 text-slate-600">
          Upload a custom `songs.json` file to replace the bundled song library.
        </p>

        <label class="block mb-3">
          <span class="sr-only">Upload songs JSON</span>
          <input type="file" accept=".json,application/json" @change="onSongFileChange"
            class="block w-full rounded border p-2" />
        </label>

        <div class="flex flex-wrap gap-2 mb-3">
          <button type="button" class="rounded bg-slate-800 px-4 py-2 text-white" @click="resetToBundled"
            :disabled="!customLoaded">
            Reset to bundled songs
          </button>
        </div>

        <p v-if="uploadError" class="text-red-600 mb-2">{{ uploadError }}</p>
        <p class="text-sm text-slate-600 mb-2">
          <span v-if="customLoaded">
            Using custom song file {{ overrideName || '(custom override)' }}.
          </span>
          <span v-else>
            Using bundled `songs.json`.
          </span>
        </p>
        <p class="text-sm text-slate-600">Loaded songs: {{ currentSongCount }}</p>
      </section>

      <section class="p-4 border rounded overflow-auto">
        <h2 class="text-xl mb-3">Song preview</h2>
        <p class="mb-3 text-slate-600">Showing the first {{ previewSongs.length }} songs from the current library.</p>

        <ul class="list-disc pl-5 space-y-1 text-sm">
          <li v-for="song in previewSongs" :key="song.id">
            <strong>{{ song.title }}</strong>
            <span class="text-slate-600">— {{ song.artists.join(', ') }}</span>
          </li>
        </ul>

        <p v-if="currentSongCount > 20" class="mt-3 text-sm text-slate-600">
          …and {{ currentSongCount - 20 }} more songs.
        </p>
      </section>
    </div>
  </div>
</template>