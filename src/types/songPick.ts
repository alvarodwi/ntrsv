import type { Difficulty } from "@/types/difficulty"
import type { Song } from "@/types/song"

export interface SongPick {
  song: Song
  difficulty: Difficulty
}