import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartScreen() {
  const [timePerMove, setTimePerMove] = useState(60);
  const navigate = useNavigate();

  const startGame = () => {
    if (timePerMove < 1) return alert("Čas mora biti večji od 0!");
    navigate("/game", { state: { timePerMove } });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "1rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Catan Timer
      </h1>

      <label style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
        Čas na potezo (v sekundah):
      </label>
      <input
        type="number"
        min="1"
        value={timePerMove}
        onChange={(e) => setTimePerMove(Number(e.target.value))}
        style={{
          fontSize: "2rem",
          padding: "0.5rem 1rem",
          textAlign: "center",
          width: "120px",
          marginBottom: "1.5rem",
        }}
      />

      <button
        onClick={startGame}
        style={{
          fontSize: "1.5rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Začni igro
      </button>
    </div>
  );
}
