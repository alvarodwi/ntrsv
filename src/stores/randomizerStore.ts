import { defineStore } from 'pinia'

import { laneChannel } from '@/services/channel'
import { useFilterStore } from '@/stores/filterStore'
import { useSongStore } from '@/stores/songStore'
import type { Candidate } from '@/types/candidate'
import type { Difficulty } from '@/types/difficulty'
import type { SongPick } from '@/types/songPick'

export const useRandomizerStore = defineStore('randomizer', {
  state: () => ({
    selected: null as SongPick | null,
  }),

  actions: {
    getCandidates(): Candidate[] {
      const songStore = useSongStore()
      const filter = useFilterStore()

      const songs = songStore.songs

      return songs.flatMap((song) => {
        // album filter
        const albumPass = filter.albums.size === 0 || filter.albums.has(song.album.code)

        if (!albumPass) return []

        // tag filter
        const tagPass = filter.tags.size === 0 || song.tags.some((t) => filter.tags.has(t))

        if (!tagPass) return []

        return Object.entries(song.maps)
          .map(([diff, rating]) => ({
            diff: diff as Difficulty,
            rating: rating as number,
          }))
          .filter(({ diff, rating }) => {
            const difficultyPass = filter.difficulties.size === 0 || filter.difficulties.has(diff)

            const ratingPass = rating >= filter.minRating && rating <= filter.maxRating

            return difficultyPass && ratingPass
          })
          .map(({ diff }) => ({
            song,
            difficulty: diff,
          }))
      })
    },

    randomize() {
      const candidates = this.getCandidates()

      if (!candidates.length) {
        this.selected = null
        return
      }

      const pick = candidates[Math.floor(Math.random() * candidates.length)]

      this.selected = pick
      laneChannel.postMessage({
        type: 'RESULT',
        payload: {
          songId: pick.song.id,
          difficulty: pick.difficulty,
        },
      })
    },
  },
})
