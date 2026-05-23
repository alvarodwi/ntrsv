import { defineStore } from 'pinia'

import type { Song } from '@/types/song'

export const useSongStore = defineStore('songs', {
  state: () => ({
    songs: [] as Song[],
  }),

  getters: {
    byId: (state) => {
      return (id: string) => state.songs.find((s) => s.id === id)
    },

    allTags: (state) => [...new Set(state.songs.flatMap((s) => s.tags))].sort(),

    allAlbums: (state) => [...new Map(state.songs.map((s) => [s.album.code, s.album])).values()],
  },

  actions: {
    setSongs(songs: Song[]) {
      this.songs = songs
    },
  },
})
