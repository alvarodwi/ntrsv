import { defineStore } from 'pinia'
import type { Difficulty } from '@/types/difficulty'

export const useFilterStore = defineStore('filters', {
  state: () => ({
    difficulties: new Set<Difficulty>(),
    tags: new Set<string>(),
    albums: new Set<string>(),

    minRating: 1,
    maxRating: 19,
    lastClicked: null as number | null,
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

    applyRating(n: number) {
      const isFullRange =
        this.minRating === 1 && this.maxRating === 19

      const isSameRangeClick =
        this.lastClicked === n &&
        this.minRating === n &&
        this.maxRating === n

      if (isFullRange) {
        this.minRating = 1
        this.maxRating = n
        this.lastClicked = n
        return
      }

      if (isSameRangeClick) {
        this.minRating = 1
        this.maxRating = 19
        this.lastClicked = null
        return
      }

      if (this.lastClicked === n) {
        this.minRating = n
        this.maxRating = n
        return
      }

      const mid = (this.minRating + this.maxRating) / 2

      if (n < mid) {
        this.minRating = n
      } else {
        this.maxRating = n
      }

      this.lastClicked = n
    },
  },
})