import type { FilterSnapshot } from './filterSnapshot'

export type LaneEvent =
    | LaneSelectionEvent
    | LaneStateEvent
    | LaneFilterEvent

export type LaneSelectionEvent =
    | {
        type: 'RESULT'
        payload: LaneSelectionPayload
    }
    | {
        type: 'SYNC_RESULT'
        payload: LaneSelectionPayload
    }

export type LaneSelectionPayload = {
    songId: string
    difficulty: string
}

export type LaneStateEvent = {
    type: 'REQUEST_STATE'
}

export type LaneFilterEvent = {
    type: 'SYNC_FILTER'
    payload: FilterSnapshot
}