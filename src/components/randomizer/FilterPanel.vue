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
            <div class="flex flex-wrap gap-1">
                <button v-for="n in 19" :key="n" @click="filter.applyRating(n)" class="px-2 py-1 rounded" :class="[
                    n >= filter.minRating && n <= filter.maxRating
                        ? 'bg-yellow-500'
                        : 'bg-gray-600'
                ]">
                    ★
                </button>
            </div>

            <p class="text-xs opacity-50">
                {{ filter.minRating }} – {{ filter.maxRating }}
            </p>
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