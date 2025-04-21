export default function PlayerStats({ player }) {
    const formatTime = (ms) => `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`
  
    return (
      <div className="player-stats">
        <h3>{player.name}</h3>
        <p>Score: {player.score}</p>
        <p>Turns: {player.turns}</p>
        <p>Play Time: {formatTime(player.playTime)}</p>
      </div>
    )
  }
  