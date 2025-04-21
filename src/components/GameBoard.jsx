import { useEffect } from "react"
import { useGameContext } from "../context/GameContext"
import Card from "./Card"
import PlayerInfo from "./PlayerInfo"

export default function GameBoard() {
  const { state, flipCard, checkGameEnd } = useGameContext();
  const { player1, player2, cards, flippedCards, matchedCards } = state
  
  const activePlayer = player1.isActive ? player1 : player2
  
  useEffect(() => {
    checkGameEnd()
  }, [matchedCards.length, cards.length, checkGameEnd])
  
  return (
    <div className="game-board">
      <div className="game-header">
        <h1>Memory Game</h1>
        <div className="player-turn">
          <span className={`player-name ${player1.isActive ? "active" : ""}`}>
            {player1.name}
          </span>
          <span> vs </span>
          <span className={`player-name ${player2.isActive ? "active" : ""}`}>
            {player2.name}
          </span>
        </div>
        <h2>{activePlayer.name}"s Turn</h2>
      </div>
      
      <div className="players-info">
        <PlayerInfo player={player1} isActive={player1.isActive} />
        <PlayerInfo player={player2} isActive={player2.isActive} />
      </div>
      
      <div className={`cards-grid difficulty-${state.difficulty}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
            isMatched={matchedCards.includes(card.id)}
            onCardClick={() => flipCard(card.id)}
          />
        ))}
      </div>
    </div>
  )
}

