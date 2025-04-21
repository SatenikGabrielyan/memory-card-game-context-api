import { useEffect } from "react"
import { useGameContext } from "../context/GameContext"

import { createCardDeck, useFetchImages } from "../api/fetchImage"
import { GAME_STATUS } from "../constants/constants"
import StartScreen from "./StartsScreen"
import RollScreen from "./RollScreen"
import GameBoard from "./GameBoard"
import GameEndScreen from "./GameEndScreen"

export default function GameScreen() {
  const { state, initializeCards } = useGameContext()
  const { difficulty, gameStatus, cards } = state

  const shouldFetch = gameStatus === GAME_STATUS.PLAYING && cards.length === 0
  const { data: images, isLoading, error } = useFetchImages(difficulty, shouldFetch)

  useEffect(() => {
    if (images && shouldFetch) {
      initializeCards(createCardDeck(images))
    }
  }, [images, shouldFetch, initializeCards])

  if (gameStatus === GAME_STATUS.SETUP) return <StartScreen />
  if (gameStatus === GAME_STATUS.ROLLING) return <RollScreen />
  if (gameStatus === GAME_STATUS.PLAYING) {
    if (isLoading) return <div className="loading">Loading cards...</div>
    if (error) return <div className="error">Error loading images: {error.message}</div>
    return <GameBoard />
  }
  if (gameStatus === GAME_STATUS.ENDED) return <GameEndScreen />

  return <div className="error">Unknown game state</div>
}
