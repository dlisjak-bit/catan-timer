import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartScreen() {
  const [timePerMove, setTimePerMove] = useState(60);
  const [players, setPlayers] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const startGame = () => {
    if (players.some((p) => p.trim() === "")) return alert("Enter all names!");
    navigate("/game", { state: { timePerMove, players } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Catan Timer</h1>
      <label className="mb-2">Time per Move (seconds):</label>
      <input
        type="number"
        className="border p-2 rounded mb-4 w-24 text-center"
        value={timePerMove}
        onChange={(e) => setTimePerMove(Number(e.target.value))}
      />
      <h2 className="text-lg font-semibold mb-2">Enter Player Names</h2>
      {players.map((p, i) => (
        <input
          key={i}
          className="border p-2 rounded w-64 mb-2"
          placeholder={`Player ${i + 1}`}
          value={p}
          onChange={(e) =>
            setPlayers(players.map((p, j) => (i === j ? e.target.value : p)))
          }
        />
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={startGame}
      >
        Start Game
      </button>
    </div>
  );
}