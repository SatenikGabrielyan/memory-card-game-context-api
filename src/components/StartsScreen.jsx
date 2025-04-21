import { useState } from "react"
import { useGameContext } from "../context/GameContext"

export default function StartScreen() {
  const { state, setPlayerNames, setDifficulty, startRolling } = useGameContext()
  
  const [player1Name, setPlayer1Name] = useState(state.player1.name)
  const [player2Name, setPlayer2Name] = useState(state.player2.name)
  const [selectedDifficulty, setSelectedDifficulty] = useState(state.difficulty)
  
  const handleStartGame = (e) => {
    e.preventDefault()
    setPlayerNames(player1Name, player2Name)
    setDifficulty(selectedDifficulty)
    startRolling()
  }
  
  return (
    <div className="start-screen">
      <h1>Memory Card Game</h1>
      <form onSubmit={handleStartGame}>
        <div className="player-inputs">
          <div className="input-group">
            <label htmlFor="player1">Player 1 Name:</label>
            <input
              type="text"
              id="player1"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              placeholder="Player 1"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="player2">Player 2 Name:</label>
            <input
              type="text"
              id="player2"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              placeholder="Player 2"
            />
          </div>
        </div>
        
        <div className="difficulty-selection">
          <h3>Select Difficulty:</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="difficulty"
                value="easy"
                checked={selectedDifficulty === "easy"}
                onChange={() => setSelectedDifficulty("easy")}
              />
              Easy (6 pairs)
            </label>
            
            <label>
              <input
                type="radio"
                name="difficulty"
                value="medium"
                checked={selectedDifficulty === "medium"}
                onChange={() => setSelectedDifficulty("medium")}
              />
              Medium (8 pairs)
            </label>
            
            <label>
              <input
                type="radio"
                name="difficulty"
                value="hard"
                checked={selectedDifficulty === "hard"}
                onChange={() => setSelectedDifficulty("hard")}
              />
              Hard (12 pairs)
            </label>
          </div>
        </div>
        
        <button type="submit" className="play-button">
          Play Game
        </button>
      </form>
    </div>
  )
}

