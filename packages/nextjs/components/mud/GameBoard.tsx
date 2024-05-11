import { GameMap } from "./GameMap";
import { useMUD } from "./MUDContext";
import { TerrainType, terrainTypes } from "./terrainTypes";
import { useKeyboardMovement } from "./useKeyboardMovement";
import { useComponentValue } from "@latticexyz/react";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { hexToArray } from "@latticexyz/utils";

export const GameBoard = () => {
  useKeyboardMovement();

  const {
    components: { MapConfig, Player, Position },
    network: { playerEntity },
    systemCalls: { spawn },
  } = useMUD();

  const canSpawn = useComponentValue(Player, playerEntity)?.value !== true;

  const playerPosition = useComponentValue(Position, playerEntity);
  const player =
    playerEntity && playerPosition
      ? {
          x: playerPosition.x,
          y: playerPosition.y,
          emoji: "🤠",
          entity: playerEntity,
        }
      : null;

  const mapConfig = useComponentValue(MapConfig, singletonEntity);

  if (mapConfig == null) {
    // Handle the case when mapConfig is not available
    return <div>Loading map...</div>;
  }

  const { width, height, terrain: terrainData } = mapConfig;
  const terrain = Array.from(hexToArray(terrainData)).map((value, index) => {
    const { emoji } = value in TerrainType ? terrainTypes[value as TerrainType] : { emoji: "" };
    return {
      x: index % width,
      y: Math.floor(index / width),
      emoji,
    };
  });

  return (
    <GameMap
      width={width}
      height={height}
      terrain={terrain}
      onTileClick={canSpawn ? spawn : undefined}
      players={player ? [player] : []}
    />
  );
};
