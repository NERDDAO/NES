// components/Game/GameContainer.tsx
import React, { useState } from "react";
import { GameState } from "../../types/game";
import { GameDisk, GameEngine } from "../../utils/gameEngine";
import GameInput from "./GameInput";
import { GameMap } from "./GameMap";
import GameOutput from "./GameOutput";
import { GameStatus } from "./GameStatus";

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
    <div className="card flex flex-row space-x-6 border-2">
      <GameMap currentRoom={gameState.currentRoom} rooms={gameDiskData.rooms} />
      <div className="flex flex-col">
        <GameOutput output={gameState.output} />

        <GameInput onCommand={handleCommand} />
      </div>
      <GameStatus inventory={gameState.inventory} />
    </div>
  );
};

export default GameContainer;
