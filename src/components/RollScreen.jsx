import { useState } from "react"
import { useGameContext } from "../context/GameContext"

export default function RollScreen() {
  const { state, determineFirstPlayer } = useGameContext()
  const [isRolling, setIsRolling] = useState(false)
  const [coinState, setCoinState] = useState("heads")
  
  const handleRoll = () => {
    setIsRolling(true)
    let flips = 0;
    const maxFlips = 10 + Math.floor(Math.random() * 5)
    const flipInterval = setInterval(() => {
      setCoinState(prev => prev === "heads" ? "tails" : "heads")
      flips++
      
      if (flips >= maxFlips) {
        clearInterval(flipInterval)
        setIsRolling(false)
        setTimeout(() => {
          determineFirstPlayer()
        }, 1000)
      }
    }, 150)
  }
  
  return (
    <div className="roll-screen">
      <h2>Who Goes First?</h2>
      <p>Click the button to determine who starts first!</p>
      
      <div className={`coin ${isRolling ? "flipping" : ""} ${coinState}`}>
        <div className="coin-side heads">
          {state.player1.name}
        </div>
        <div className="coin-side tails">
          {state.player2.name}
        </div>
      </div>
      
      <button 
        onClick={handleRoll} 
        disabled={isRolling}
        className="roll-button"
      >
        {isRolling ? "Rolling..." : "Roll to Start"}
      </button>
    </div>
  )
}
