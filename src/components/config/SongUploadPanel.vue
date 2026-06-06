<script setup lang="ts">
import { ref, onMounted } from 'vue'

import {
  loadSongs,
  loadSongsFromFile,
  clearCustomSongs,
  hasCustomSongs as hasCustomSongsOverride,
} from '@/services/songService'
import { useSongStore } from '@/stores/songStore'

const songs = useSongStore()
const bundledSongsUrl = import.meta.env.BASE_URL + 'songs.json'

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
  <section class="flex h-full flex-col gap-4">
    <!-- compact label -->
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-charcoal text-sm font-semibold dark:text-white">Song Import</h3>
        <p class="text-charcoal/50 mt-0.5 text-xs dark:text-white/50">Load custom datasets</p>
      </div>
    </div>

    <!-- upload workspace -->
    <div
      class="border-charcoal/5 flex flex-1 flex-col gap-4 rounded-[24px] border bg-white/35 p-4 dark:bg-white/5"
    >
      <!-- upload zone -->
      <label
        class="border-charcoal/10 hover:border-purple/30d hover:bg-purple/5 flex flex-1 cursor-pointer flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed bg-white/50 p-6 text-center transition-all duration-150 dark:bg-white/10"
      >
        <div
          class="bg-purple/10 text-purple dark:bg-purple/20 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
        >
          +
        </div>

        <div class="flex flex-col gap-1">
          <div class="text-charcoal text-sm font-semibold dark:text-white">Upload JSON File</div>

          <p class="text-charcoal/50 text-xs dark:text-white/50">
            Select a valid songs.json dataset
          </p>
        </div>

        <input
          type="file"
          accept=".json,application/json"
          class="hidden"
          @change="onSongFileChange"
        />
      </label>

      <!-- footer row -->
      <div class="flex items-center justify-between gap-3">
        <!-- source -->
        <div class="flex flex-col gap-0.5">
          <span class="text-charcoal/50 text-xs dark:text-white/50"> Source </span>

          <span class="text-charcoal text-sm font-medium dark:text-white">
            <template v-if="customLoaded">
              custom :
              <span class="text-purple">
                {{ overrideName || 'override.json' }}
              </span>
            </template>

            <template v-else>
              default :
              <a :href="bundledSongsUrl" target="_blank" class="text-purple hover:underline">
                /songs.json
              </a>
            </template>
          </span>
        </div>

        <!-- reset -->
        <button
          type="button"
          class="border-charcoal/10 text-charcoal hover:border-purple/20 hover:bg-purple/10 dark:hover:border-purple/20 dark:hover:bg-purple/10 rounded-full border bg-white/50 px-4 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-white"
          :disabled="!customLoaded"
          @click="resetToBundled"
        >
          Reset
        </button>
      </div>

      <!-- error -->
      <div
        v-if="uploadError"
        class="border-coral/10 bg-coral/10 text-coral rounded-2xl border px-4 py-3 text-sm"
      >
        {{ uploadError }}
      </div>
    </div>
  </section>
</template>
