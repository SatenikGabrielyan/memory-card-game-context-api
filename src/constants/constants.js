export const DIFFICULTY = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard"
  }
  
export const GAME_STATUS = {
    SETUP: "setup",
    ROLLING: "rolling",
    PLAYING: "playing",
    ENDED: "ended"
  }
  
export const DIFFICULTY_SETTINGS = {
    easy: { pairs: 6, rows: 3, columns: 4 },
    medium: { pairs: 8, rows: 4, columns: 4 },
    hard: { pairs: 12, rows: 4, columns: 6 }
  }
  

export const DIFFICULTY_CARD_PAIRS = Object.fromEntries(
    Object.entries(DIFFICULTY_SETTINGS).map(([key, { pairs }]) => [key, pairs])
  )
  