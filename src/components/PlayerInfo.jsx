export default function PlayerInfo({ player, isActive }) {
    const formatTime = (ms) => {
      const seconds = Math.floor(ms / 1000)
      return `${seconds}s`
    }
    
    return (
      <div className={`player-info ${isActive ? "active" : ""}`}>
        <h3>{player.name}</h3>
        <div className="stats">
          <p>Score: {player.score}</p>
          <p>Turns: {player.turns}</p>
          <p>Play Time: {formatTime(player.playTime)}</p>
        </div>
      </div>
    )
  }
