<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useSongStore } from '@/stores/songStore'
import {
    loadSongs,
    loadSongsFromFile,
    clearCustomSongs,
    hasCustomSongs as hasCustomSongsOverride,
} from '@/services/songService'

const songs = useSongStore()
const currentSongCount = computed(() => songs.songs.length)


const customLoaded = ref(false)
const uploadError = ref<string | null>(null)
const overrideName = ref('')

onMounted(async () => {
    await reloadSongs()
})

async function reloadSongs() {
    songs.setSongs(await loadSongs())
    customLoaded.value = hasCustomSongsOverride()
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
</template>