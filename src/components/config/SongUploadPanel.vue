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
    <section class="p-4 border rounded flex flex-col gap-4 h-full">
        <!-- header -->
        <div>
            <h2 class="text-lg font-medium">Song Library</h2>
            <p class="text-xs opacity-60">
                Load custom JSON or use bundled dataset
            </p>
        </div>

        <!-- upload area -->
        <div class="flex flex-col gap-2">
            <input type="file" accept=".json,application/json" @change="onSongFileChange"
                class="block w-full rounded border p-2" />

            <button type="button" class="px-3 py-2 rounded border" @click="resetToBundled" :disabled="!customLoaded">
                Reset to bundled
            </button>
        </div>

        <!-- status panel (important for “tool feel”) -->
        <div class="mt-auto flex flex-col gap-1 text-xs opacity-70">
            <p v-if="uploadError" class="text-red-500">
                {{ uploadError }}
            </p>
            <p>
                Source:
                <span v-if="customLoaded">
                    custom ({{ overrideName || 'override' }})
                </span>
                <span v-else>
                    bundled songs.json
                </span>
                <br>
                Loaded songs: {{ currentSongCount }}
            </p>
        </div>
    </section>
</template>