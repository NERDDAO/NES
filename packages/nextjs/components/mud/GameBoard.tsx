import React, { useEffect, useState } from "react";
import { CharacterComponent } from "../CharacterComponent";
import { ItemComponent } from "../ItemComponent";
import PlayerInput from "../PlayerInput";
import PlayerList from "../PlayerList";
import { QuestComponent } from "../QuestComponent";
import { RoomComponent } from "../RoomComponent";
import { TradingComponent } from "../TradingComponent";
import { useMUD } from "./MUDContext";
import GameMap from "../mud/GameMap"; // Ensure the correct import path
import { Entity } from "@latticexyz/recs";

type Player = {
  x: number;
  y: number;
  emoji: string;
  entity: Entity;
};

const GameBoard = () => {
  const {
    network: { useStore, tables, playerEntity },
  } = useMUD();

  const systemCalls = useMUD().systemCalls;

  const records = useStore(state => Object.values(state.getRecords(tables.Player as any)));

  const [terrain, setTerrain] = useState<{ x: number; y: number; emoji: string; }[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  useEffect(() => {
    // Fetch or set terrain and players data here
    setTerrain([
      { x: 2, y: 2, emoji: "🌳" },
      { x: 1, y: 7, emoji: "🌲" },
      // Add more terrain data as needed
    ]);

    setPlayers([
      { x: 0, y: 0, emoji: "😀", entity: playerEntity },
      // Add more player data as needed
    ]);
  }, [playerEntity]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="grid grid-cols-12 gap-4 w-full h-full max-w-7xl p-4">
        <div className="col-span-3 overflow-auto p-2">
          <PlayerInput />
          <PlayerList players={records} />
        </div>
        <div className="col-span-6 overflow-auto p-2">
          <GameMap
            width={10}
            height={10}
            terrain={terrain}
            players={players}
            onTileClick={(x, y) => console.log(`Tile clicked: ${x}, ${y}`)}
          />
        </div>
        <div className="col-span-3 overflow-auto p-2">
          <QuestComponent systemCalls={systemCalls} />
          <TradingComponent systemCalls={systemCalls} />
          <RoomComponent systemCalls={systemCalls} />
          <ItemComponent systemCalls={systemCalls} />
          <CharacterComponent systemCalls={systemCalls} />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
