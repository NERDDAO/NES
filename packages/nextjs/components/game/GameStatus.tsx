// components/Game/GameStatus.tsx
import React from "react";
import { generateASCIIArt } from "../../utils/asciiArt";

interface GameStatusProps {
  inventory: Item[];
  // Add other status properties as needed
}

export const GameStatus: React.FC<GameStatusProps> = ({ inventory }) => {
  return (
    <div className="card">
      <h3>Status:</h3>
      <p>Inventory:</p>
      <ul>
        {inventory.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <pre className="card-content h-[300px] w-[300px]">
        {generateASCIIArt("item1")}
        {/* Add other status information */}
      </pre>
    </div>
  );
};
