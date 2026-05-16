import type { Album } from "@/types/album"
import type { Difficulty } from "@/types/difficulty"

export interface Song {
    id: string
    title: string
    artists: string[]
    album: Album
    maps: Partial<Record<Difficulty, number>>
    sortNumber: number
    tags: string[]
}