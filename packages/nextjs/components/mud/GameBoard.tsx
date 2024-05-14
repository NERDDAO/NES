import { useMUD } from "./MUDContext";
import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import { Entity, Has, getComponentValueStrict } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { hexToArray } from "@latticexyz/utils";

export const GameBoard = () => {
  //useKeyboardMovement();

  const {
    components: { Player },
    network: { playerEntity },
    systemCalls: { spawn },
  } = useMUD();

  const canSpawn = useComponentValue(Player, playerEntity)?.value !== true;
  console.log(playerEntity);

  /*const players = useEntityQuery([Has(Player), Has(Position)]).map(entity => {
    const position = getComponentValueStrict(Position, entity);
    return {
      entity,
      x: position.x,
      y: position.y,
      emoji: entity === playerEntity ? "🤠" : "🥸",
    };
  });
  console.log(players);*/

  return (
    <>
      <button onClick={() => canSpawn && spawn()}>Spawn</button>
    </>
  );
};

export default GameBoard;
