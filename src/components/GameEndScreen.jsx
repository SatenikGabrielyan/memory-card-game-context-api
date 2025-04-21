import { useGameContext } from "../context/GameContext"
import PlayerStats from "./PlayerStats"

export default function GameEndScreen() {
  const { state, resetGame } = useGameContext()
  const { player1, player2, winner } = state

  return (
    <div className="game-end-screen">
      <h1>Game Over!</h1>
      <h2>{winner === "tie" ? "It's a tie!" : `${state[winner].name} wins!`}</h2>

      <div className="game-stats">
        <PlayerStats player={player1} />
        <PlayerStats player={player2} />
      </div>

      <button onClick={resetGame} className="play-again-button">
        Play Again
      </button>
    </div>
  )
}
