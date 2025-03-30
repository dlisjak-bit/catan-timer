import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function GameScreen() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return navigate("/");

  const { timePerMove, players } = state;
  const [activePlayer, setActivePlayer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timePerMove);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!activePlayer || paused) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [activePlayer, paused]);

  const handlePlayerClick = (player) => {
    setActivePlayer(player);
    setTimeLeft(timePerMove);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold">Catan Timer</h1>
      <div className="text-6xl font-bold">
        {activePlayer ? `${timeLeft}s` : "Select a Player"}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {players.map((player, i) => (
          <button
            key={i}
            className={`px-6 py-3 rounded text-white font-semibold ${
              activePlayer === player ? "bg-green-500" : "bg-blue-500"
            }`}
            onClick={() => handlePlayerClick(player)}
          >
            {player}
          </button>
        ))}
      </div>
      <button
        className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded"
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? "Resume" : "Pause"}
      </button>
      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/")}
      >
        Restart
      </button>
    </div>
  );
}
