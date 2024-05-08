// components/Game/GameOutput.tsx
import React from "react";
import GameInput from "./GameInput";

interface GameOutputProps {
  output: string[];
}

const GameOutput: React.FC<GameOutputProps> = ({ output, handleCommand }) => {
  return (
    <div className="h-full card bg-black-500 border-2 top-0   ">
      <span className="card-title p-2">Game Output</span>
      <div className="card-body h-fill overflow-y-auto">
        Game
        {output.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <div className="card-footer p-2">
        <GameInput className="p-12" onCommand={handleCommand} />
      </div>
    </div>
  );
};

export default GameOutput;
