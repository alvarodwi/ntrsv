import { defineStore } from 'pinia'
import type { Difficulty } from '@/types/difficulty'

export const useFilterStore = defineStore('filters', {
  state: () => ({
    difficulties: new Set<Difficulty>(),
    tags: new Set<string>(),
    albums: new Set<string>(),

    minRating: 1,
    maxRating: 19,
  }),

  actions: {
    toggleDifficulty(d: Difficulty) {
      this.difficulties.has(d)
        ? this.difficulties.delete(d)
        : this.difficulties.add(d)
    },

    toggleTag(tag: string) {
      this.tags.has(tag)
        ? this.tags.delete(tag)
        : this.tags.add(tag)
    },

    toggleAlbum(album: string) {
      this.albums.has(album)
        ? this.albums.delete(album)
        : this.albums.add(album)
    },
  },
})