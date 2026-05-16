import { ref } from 'vue'
import { laneChannel } from '@/services/channel'
import { useSongStore } from '@/stores/songStore'
import type { SongPick } from '@/types/songPick'
import type { Difficulty } from '@/types/difficulty'
import type { FilterSnapshot } from '@/types/filterSnapshot'
import { useFilterStore } from '@/stores/filterStore'


const selected = ref<SongPick | null>(null)

function serializeFilter(filter: ReturnType<typeof useFilterStore>): FilterSnapshot {
    return {
        difficulties: [...filter.difficulties],
        tags: [...filter.tags],
        albums: [...filter.albums],
        minRating: filter.minRating,
        maxRating: filter.maxRating,
    }
}



export function useLaneSync() {
    const songStore = useSongStore()
    const filterStore = useFilterStore()

    function apply(songId: string, difficulty: Difficulty) {
        const song = songStore.byId(songId)
        if (!song) return

        selected.value = { song, difficulty }
    }

    function init() {
        laneChannel.onmessage = (event) => {
            const { type, payload } = event.data

            switch (type) {
                case 'RESULT':
                case 'SYNC_RESULT':
                    apply(payload.songId, payload.difficulty)
                    break

                case 'REQUEST_STATE':
                    syncState()
                    break

                case 'SYNC_FILTER':
                    applyFilter(payload)
                    break
            }
        }
    }

    function syncState() {
        if (selected.value) {
            laneChannel.postMessage({
                type: 'SYNC_RESULT',
                payload: {
                    songId: selected.value.song.id,
                    difficulty: selected.value.difficulty,
                },
            })
        }

        laneChannel.postMessage({
            type: 'SYNC_FILTER',
            payload: serializeFilter(filterStore),
        })
    }

    function emitSelection(songId: string, difficulty: Difficulty) {
        const payload = { songId, difficulty }

        selected.value = {
            song: songStore.byId(songId)!,
            difficulty,
        }

        laneChannel.postMessage({
            type: 'RESULT',
            payload,
        })
    }

    function emitFilterSync() {
        const filter = useFilterStore()

        laneChannel.postMessage({
            type: 'SYNC_FILTER',
            payload: serializeFilter(filter),
        })
    }


    function applyFilter(payload: FilterSnapshot) {
        filterStore.difficulties = new Set(payload.difficulties)
        filterStore.tags = new Set(payload.tags)
        filterStore.albums = new Set(payload.albums)
        filterStore.minRating = payload.minRating
        filterStore.maxRating = payload.maxRating
    }

    return {
        selected,
        init,
        emitSelection,
        emitFilterSync
    }
}