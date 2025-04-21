export default function Card({ card, isFlipped, isMatched, onCardClick }) {
    const handleClick = () => {
      if (!isFlipped) {
        onCardClick()
      }
    }
    
    return (
      <div 
        className={`card ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}`} 
        onClick={handleClick}
      >
        <div className="card-inner">
          <div className="card-front">
            <div className="card-back-design">?</div>
          </div>
          <div className="card-back">
            <img 
              src={card.image} 
              alt={`Card by ${card.author}`} 
              className="card-image"
            />
          </div>
        </div>
      </div>
    )
  }
  
 