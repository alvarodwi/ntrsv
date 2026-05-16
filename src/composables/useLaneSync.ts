import { ref } from 'vue'
import { laneChannel } from '@/services/channel'
import { useSongStore } from '@/stores/songStore'
import type { SongPick } from '@/types/songPick'
import type { Difficulty } from '@/types/difficulty'

const selected = ref<SongPick | null>(null)

export function useLaneSync() {
    const songStore = useSongStore()

    function apply(songId: string, difficulty: Difficulty) {
        const song = songStore.byId(songId)
        if (!song) return

        selected.value = { song, difficulty }
    }

    function init() {
        laneChannel.onmessage = (event) => {
            const { type, payload } = event.data

            if (type === 'RESULT' || type === 'SYNC_RESULT') {
                apply(payload.songId, payload.difficulty)
            }

            if (type === 'REQUEST_STATE' && selected.value) {
                laneChannel.postMessage({
                    type: 'SYNC_RESULT',
                    payload: {
                        songId: selected.value.song.id,
                        difficulty: selected.value.difficulty,
                    },
                })
            }
        }
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

    return {
        selected,
        init,
        emitSelection,
    }
}