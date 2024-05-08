// components/Game/GameOutput.tsx
import React from "react";

interface GameOutputProps {
  output: string[];
}

const GameOutput: React.FC<GameOutputProps> = ({ output }) => {
  return (
    <div className="card bg-black-500 border-2">
      <span className="card-title">Game Output</span>
      <div className="card-body">
        Game
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default GameOutput;
