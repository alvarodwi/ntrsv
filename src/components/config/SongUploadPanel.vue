<script setup lang="ts">
import { computed } from 'vue'
import { useSongStore } from '@/stores/songStore'

const songs = useSongStore()

const previewSongs = computed(() => songs.songs.slice(0, 20))
const currentSongCount = computed(() => songs.songs.length)
</script>

<template>
    <section class="p-4 border rounded overflow-auto">
            <h2 class="text-xl mb-3">Song preview</h2>
            <p class="mb-3 text-slate-600">Showing the first {{ previewSongs.length }} songs from the current library.
            </p>

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
</template>