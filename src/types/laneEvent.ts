export type LaneEvent =
    | {
        type: 'RESULT'
        payload: {
            songId: string
            difficulty: string
        }
    }
    | {
        type: 'REQUEST_STATE'
    }
    | {
        type: 'SYNC_RESULT'
        payload: {
            songId: string
            difficulty: string
        }
    }