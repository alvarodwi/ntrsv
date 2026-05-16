export const DifficultyList = [
  'CASUAL',
  'NORMAL',
  'HARD',
  'EXPERT',
] as const

export type Difficulty = typeof DifficultyList[number]