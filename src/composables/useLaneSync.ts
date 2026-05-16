
import { laneChannel } from '@/services/channel'
import type { SongPick } from '@/types/songPick'
import type { Ref } from 'vue'

export function useLaneSync(selected: Ref<SongPick | null>) {
    laneChannel.onmessage = (event) => {
        if (event.data.type === 'REQUEST_STATE' && selected.value) {
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