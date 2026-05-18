import { defineStore } from 'pinia'
import type { Difficulty } from '@/types/difficulty'

export const useFilterStore = defineStore('filters', {
  state: () => ({
    difficulties: new Set<Difficulty>(),
    tags: new Set<string>(),
    albums: new Set<string>(),
    access: new Set<string>(),

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

    toggleAccess(access: string) {
      this.access.has(access)
        ? this.access.delete(access)
        : this.access.add(access)
    },

    setMinRating(v: number) {
      this.minRating = v
      if (this.maxRating < v) this.maxRating = v
    },

    setMaxRating(v: number) {
      this.maxRating = v
      if (this.minRating > v) this.minRating = v
    },

    reset() {
      this.difficulties.clear()
      this.tags.clear()
      this.albums.clear()
      this.minRating = 1
      this.maxRating = 19
      this.access.clear()
      this.access.add("free")
    },
  },
})