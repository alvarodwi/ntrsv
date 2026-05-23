import type { Difficulty } from '@/types/difficulty'

export type FilterSnapshot = {
  difficulties: Difficulty[]
  tags: string[]
  albums: string[]
  minRating: number
  maxRating: number
}
