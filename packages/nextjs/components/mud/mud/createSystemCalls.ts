import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { Has, HasValue, getComponentValue, runQuery } from "@latticexyz/recs";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { uuid } from "@latticexyz/utils";
import { toast } from "react-hot-toast";
import { hexToString, isHex, stringToHex } from "viem";
import { usePlayerStore } from "~~/services/store/playerStore";

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
    const playerName = usePlayerStore.getState().playerName;
    if (!canSpawn) {
      throw new Error("already spawned");
    }

    const playerId = uuid();
    Player.addOverride(playerId, {
      entity: playerEntity,
      value: { value: true },
    });

    const args: PlayerData = {
      x: 0,
      y: 0,
      health: 100,
      name: playerName,
    };
    toast.loading("Spawning player...");

    try {
      const tx = await worldContract.write.spawnPlayer([stringToHex(playerId.slice(4), { size: 32 }), args]);
      await waitForTransaction(tx);
      usePlayerStore.getState().addPlayer({ id: playerId, name: playerName, x: 0, y: 0, health: 100 });
    } catch (error) {
      console.error("Spawn transaction failed:", error);
    } finally {
      setTimeout(() => {
        Player.removeOverride(playerId);
        toast.dismiss();
        toast.success(`Player spawned! ${playerName}`);
      }, 1000);
    }
  };

  const fetchPlayers = async () => {
    try {
      const players = await worldContract.read.getPlayers();
      const formattedPlayers = players.map((player: any) => ({
        id: hexToString(player.id),
        name: hexToString(player.name),
        x: player.x,
        y: player.y,
        health: player.health,
      }));
      usePlayerStore.getState().setPlayers(formattedPlayers);
    } catch (error) {
      console.error("Failed to fetch players:", error);
    }
  };

  return {
    spawn,
    fetchPlayers,
  };
}
