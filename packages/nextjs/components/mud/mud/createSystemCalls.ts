import { Direction } from "../direction";
import { MonsterCatchResult } from "../monsterCatchResult";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { Has, HasValue, getComponentValue, runQuery } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { uuid } from "@latticexyz/utils";
import { hexToString, isHex, stringToHex } from "viem";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { playerEntity, worldContract, waitForTransaction }: SetupNetworkResult,
  { Player }: ClientComponents,
) {
  const spawn = async () => {
    if (!playerEntity) {
      throw new Error("no player");
    }

    const canSpawn = getComponentValue(Player, playerEntity)?.value !== true;
    if (!canSpawn) {
      throw new Error("already spawned");
    }

    const positionId = uuid();
    /*Position.addOverride(positionId, {
      entity: playerEntity,
      value: { x, y },
    });*/
    const playerId = uuid();
    Player.addOverride(playerId, {
      entity: playerEntity,
      value: { value: true },
    });

    const args: PlayerData = {
      x: 0,
      y: 0,
      health: 100,
      name: "Player",
    };

    try {
      const tx = await worldContract.write.spawnPlayer([stringToHex(playerId.slice(4), { size: 32 }), args]);
      await waitForTransaction(tx);
    } catch (error) {
      // Handle the error if the transaction fails
      console.error("Spawn transaction failed:", error);
    } finally {
      setTimeout(() => {
        //Position.removeOverride(positionId);
        Player.removeOverride(playerId);
      }, 1000);
    }
  };

  return {
    spawn,
  };
}
