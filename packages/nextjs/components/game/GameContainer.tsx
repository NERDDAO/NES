// components/Game/GameContainer.tsx
import React, { useEffect, useState } from "react";
import { GameState } from "../../types/game";
import { GameDisk, GameEngine } from "../../utils/gameEngine";
import { GameMap } from "./GameMap";
import GameOutput from "./GameOutput";
import { GameStatus } from "./GameStatus";

// Create a database connection

// Define your game disk data
const gameDiskData: GameDisk = {
  startingRoom: "room1",
  rooms: [
    {
      id: "room1",
      name: "Living Room",
      description: "A cozy living room with a fireplace.",
      exits: [
        { direction: "north", roomId: "room2" },
        { direction: "east", roomId: "room3" },
      ],
    }, // Add more rooms
  ],
  items: [
    { id: "key", name: "Rusty Key", description: "An old rusty key." },
    // Add more items
  ],
  characters: [
    { id: "npc1", name: "John", description: "A friendly NPC." },
    // Add more characters
  ],
};

const GameContainer: React.FC = () => {
  const [gameEngine] = useState(() => new GameEngine(gameDiskData));

  const handleCommand = (command: string) => {
    gameEngine.handleCommand(command);
    // Force re-render to update the game state
    setGameState({ ...gameEngine.getState() });
  };

  const [gameState, setGameState] = useState<GameState>(gameEngine.getState());

  return (
    // Render your game components and pass the gameState and handleCommand as props
    // Example:
    <div className="card flex flex-row space-x-6 border-2 h-full max-h-192 container mx-auto p-4">
      <GameMap currentRoom={gameState.currentRoom} rooms={gameDiskData.rooms} />
      <div className="relative container flex flex-col justify-center items-center">
        <GameOutput output={gameState.output} handleCommand={handleCommand} />
      </div>
      <GameStatus inventory={gameState.inventory} />
    </div>
  );
};

export default GameContainer;
