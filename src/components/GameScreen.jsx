import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function GameScreen() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return navigate("/");

  const { timePerMove = 60 } = state;
  const [timeLeft, setTimeLeft] = useState(timePerMove);
  const [paused, setPaused] = useState(false);
  const ringSound = new Audio("/catan-timer/ring.mp3");

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        if (prev === 1) {
          let playCount = 0;
          const playSound = () => {
            if (playCount < 3) {
              ringSound.play();
              playCount++;
              setTimeout(playSound, 1000);
            }
          };
          playSound();
        }
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paused]);

  const nextPlayer = () => {
    setPaused(true);
    setTimeLeft(timePerMove);
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
      <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>Catan Timer</h3>
      <div style={{ fontSize: "5rem", fontWeight: "bold", margin: "1rem 0" }}>
        {timeLeft}s
      </div>

      <button
        style={{
          fontSize: "2rem",
          padding: "1rem 2rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "8px",
          margin: "1rem",
          cursor: "pointer",
        }}
        onClick={nextPlayer}
      >
        Naslednji igralec
      </button>

      <button
        style={{
          fontSize: "2rem",
          padding: "1rem 2rem",
          backgroundColor: "#ffc107",
          color: "black",
          border: "none",
          borderRadius: "8px",
          margin: "1rem",
          cursor: "pointer",
        }}
        onClick={() => setPaused(false)}
      >
        Konec deljenja
      </button>

      <button
        style={{
          fontSize: "1.5rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "8px",
          marginTop: "2rem",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Začni znova
      </button>
    </div>
  );
}
