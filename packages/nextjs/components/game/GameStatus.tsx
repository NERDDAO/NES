// components/Game/GameStatus.tsx
import React from "react";

interface GameStatusProps {
  inventory: Item[];
  // Add other status properties as needed
}

export const GameStatus: React.FC<GameStatusProps> = ({ inventory }) => {
  return (
    <div>
      <h3>Status:</h3>
      <p>Inventory:</p>
      <ul>
        {inventory.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      {/* Add other status information */}
    </div>
  );
};
