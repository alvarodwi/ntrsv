<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useSongStore } from '@/stores/songStore'
import { useFilterStore } from '@/stores/filterStore'
import {
    loadSongs,
} from '@/services/songService'
import { DifficultyList } from '@/types/difficulty'
import FilterSection from '@/components/randomizer/FilterSection.vue'

const songs = useSongStore()
const filter = useFilterStore()

async function reloadSongs() {
    songs.setSongs(await loadSongs())
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

</script>

<template>
    <div class="w-1/2 flex flex-col gap-4 overflow-auto">
        <FilterSection title="Difficulty">
            <div class="flex gap-2 flex-wrap">
                <button v-for="d in DifficultyList" :key="d" @click="filter.toggleDifficulty(d)"
                    :class="filter.difficulties.has(d) ? 'bg-blue-500' : 'bg-gray-600'" class="px-3 py-2 rounded">
                    {{ d }}
                </button>
            </div>
        </FilterSection>
        <FilterSection title="Rating">
            <div class="flex flex-col gap-4">
                <!-- MIN -->
                <div class="flex items-center gap-3">
                    <span class="text-xs w-10 opacity-60">Min</span>

                    <input type="range" min="1" max="19" v-model.number="filter.minRating"
                        @input="filter.setMinRating(Number(($event.target as HTMLInputElement).value))"
                        class="w-full accent-yellow-400" />

                    <span class="text-xs w-6 text-right">
                        {{ filter.minRating }}
                    </span>
                </div>

                <!-- MAX -->
                <div class="flex items-center gap-3">
                    <span class="text-xs w-10 opacity-60">Max</span>

                    <input type="range" min="1" max="19" v-model.number="filter.maxRating"
                        @input="filter.setMaxRating(Number(($event.target as HTMLInputElement).value))"
                        class="w-full accent-yellow-400" />

                    <span class="text-xs w-6 text-right">
                        {{ filter.maxRating }}
                    </span>
                </div>

                <!-- RANGE DISPLAY -->
                <div class="text-xs opacity-50 text-center">
                    {{ filter.minRating }} – {{ filter.maxRating }}
                </div>
            </div>
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
    </div>
</template>