import { createContext, useContext, useReducer } from "react"

const GameContext = createContext()

const initialPlayerState = (name) => ({
  name,
  score: 0,
  turns: 0,
  playTime: 0,
  isActive: false,
})

const initialState = {
  player1: initialPlayerState("Player 1"),
  player2: initialPlayerState("Player 2"),
  difficulty: "easy",
  gameStatus: "setup",
  cards: [],
  flippedCards: [],
  matchedCards: [],
  gameStartTime: null,
  turnStartTime: null,
  winner: null,
}

function gameReducer(state, action) {
  const now = Date.now()

  switch (action.type) {
    case "SET_PLAYER_NAMES":
      return {
        ...state,
        player1: { ...state.player1, name: action.payload.player1 || "Player 1" },
        player2: { ...state.player2, name: action.payload.player2 || "Player 2" },
      }

    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload }

    case "START_ROLLING":
      return { ...state, gameStatus: "rolling" }

    case "DETERMINE_FIRST_PLAYER": {
      const first = Math.random() < 0.5 ? "player1" : "player2"
      return {
        ...state,
        player1: { ...state.player1, isActive: first === "player1" },
        player2: { ...state.player2, isActive: first === "player2" },
        gameStatus: "playing",
        gameStartTime: now,
        turnStartTime: now,
      }
    }

    case "INITIALIZE_CARDS":
      return {
        ...state,
        cards: action.payload,
        flippedCards: [],
        matchedCards: [],
      }

    case "FLIP_CARD": {
      const id = action.payload;
      if (
        state.flippedCards.length >= 2 ||
        state.flippedCards.includes(id) ||
        state.matchedCards.includes(id)
      ) return state

      return { ...state, flippedCards: [...state.flippedCards, id] }
    }

    case "CHECK_MATCH": {
      const [id1, id2] = state.flippedCards;
      const card1 = state.cards.find(c => c.id === id1)
      const card2 = state.cards.find(c => c.id === id2)
      if (!card1 || !card2) return state

      const isMatch = card1.pairId === card2.pairId
      const current = state.player1.isActive ? "player1" : "player2"
      const other = current === "player1" ? "player2" : "player1"
      const time = now - state.turnStartTime

      const updateCurrent = {
        ...state[current],
        turns: state[current].turns + 1,
        playTime: state[current].playTime + time,
        score: isMatch ? state[current].score + 1 : state[current].score,
        isActive: !isMatch ? false : true,
      }

      const updateOther = {
        ...state[other],
        isActive: !isMatch,
      }

      return {
        ...state,
        [current]: updateCurrent,
        [other]: updateOther,
        flippedCards: [],
        matchedCards: isMatch ? [...state.matchedCards, id1, id2] : state.matchedCards,
        turnStartTime: now,
      }
    }

    case "END_GAME": {
      const { score: s1 } = state.player1;
      const { score: s2 } = state.player2;
      return {
        ...state,
        gameStatus: "ended",
        winner: s1 > s2 ? "player1" : s2 > s1 ? "player2" : "tie",
      }
    }

    case "RESET_GAME":
      return {
        ...initialState,
        player1: initialPlayerState(state.player1.name),
        player2: initialPlayerState(state.player2.name),
        difficulty: state.difficulty,
      }

    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const actions = {
    setPlayerNames: (player1, player2) =>
      dispatch({ type: "SET_PLAYER_NAMES", payload: { player1, player2 } }),

    setDifficulty: (difficulty) =>
      dispatch({ type: "SET_DIFFICULTY", payload: difficulty }),

    startRolling: () =>
      dispatch({ type: "START_ROLLING" }),

    determineFirstPlayer: () =>
      dispatch({ type: "DETERMINE_FIRST_PLAYER" }),

    initializeCards: (cards) =>
      dispatch({ type: "INITIALIZE_CARDS", payload: cards }),

    flipCard: (id) => {
      if (state.gameStatus !== "playing") return
      dispatch({ type: "FLIP_CARD", payload: id })

      if (state.flippedCards.length === 1) {
        setTimeout(() => dispatch({ type: "CHECK_MATCH" }), 1000)
      }
    },

    checkGameEnd: () => {
      if (state.cards.length && state.matchedCards.length === state.cards.length) {
        dispatch({ type: "END_GAME" })
      }
    },

    resetGame: () => dispatch({ type: "RESET_GAME" }),
  }

  return (
    <GameContext.Provider value={{ state, ...actions }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  const context = useContext(GameContext)
  if (!context) throw new Error("useGameContext must be used within a GameProvider")
  return context
}
