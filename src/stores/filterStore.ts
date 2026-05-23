import { defineStore } from 'pinia'

import type { Difficulty } from '@/types/difficulty'

function toggleSetValue<T>(set: Set<T>, value: T) {
  if (set.has(value)) {
    set.delete(value)
  } else {
    set.add(value)
  }
}

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
      toggleSetValue(this.difficulties, d)
    },

    toggleTag(tag: string) {
      toggleSetValue(this.tags, tag)
    },

    toggleAlbum(album: string) {
      toggleSetValue(this.albums, album)
    },

    toggleAccess(access: string) {
      toggleSetValue(this.access, access)
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
      this.access.add('free')
    },
  },
})
