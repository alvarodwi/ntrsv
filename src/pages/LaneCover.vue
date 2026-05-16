<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { SongPick } from '@/types/songPick'
import { laneChannel } from '@/services/channel'
import { useSongStore } from '@/stores/songStore'
import { loadSongs } from '@/services/songService'

const songs = useSongStore()
const selected = ref<SongPick | null>(null)

onMounted(async () => {
  songs.setSongs(await loadSongs())

  laneChannel.onmessage = (event) => {
    if (event.data.type === 'RESULT') {
      const { songId, difficulty } = event.data.payload

      const song = songs.byId(songId)
      if (!song) return

      selected.value = {
        song,
        difficulty,
      }
    }
    if (event.data.type === 'SYNC_RESULT') {
      const { songId, difficulty } = event.data.payload

      const song = songs.byId(songId)
      if (!song) return

      selected.value = { song, difficulty }
    }
  }

  laneChannel.postMessage({ type: 'REQUEST_STATE' })
})
</script>

<template>
  <div>
    <div v-if="!selected">No selection yet</div>

    <div v-else>
      <h2>{{ selected.song.title }}</h2>
      <p>{{ selected.song.artists.join(', ') }}</p>
      <h1>{{ selected.difficulty }}</h1>
    </div>
  </div>
</template>