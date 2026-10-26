import "./MusicPlayer.css";

function MusicPlayer({ isPlaying, onToggle }) {
  return (
    <button
      className={`music-button ${isPlaying ? "playing" : ""}`}
      onClick={onToggle}
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      <span>{isPlaying ? "♫" : "♪"}</span>
    </button>
  );
}

export default MusicPlayer;
