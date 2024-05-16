import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { getComponentValue } from "@latticexyz/recs";
import { uuid } from "@latticexyz/utils";
import { toast } from "react-hot-toast";
import { hexToString, stringToHex } from "viem";
import { usePlayerStore } from "~~/services/store/playerStore";

export type SystemCalls = ReturnType<typeof createSystemCalls>;
export function createSystemCalls(
  { playerEntity, worldContract, waitForTransaction }: SetupNetworkResult,
  { Player, Lore }: ClientComponents,
) {
  const spawn = async () => {
    if (!playerEntity) {
      throw new Error("no player");
    }
    const canSpawn = getComponentValue(Player, playerEntity)?.value !== true;
    const playerName = usePlayerStore.getState().playerName;

    const lore = usePlayerStore.getState().lore;
    if (!canSpawn) {
      throw new Error("already spawned");
    }
    const playerId = uuid();
    Player.addOverride(playerId, {
      entity: playerEntity,
      value: { value: true },
    });
    const args = {
      x: 0,
      y: 0,
      health: 100,
      name: playerName,
    };
    const loreArgs = {
      alignment: "Good",
      backstory: "Born in the forest",
      currentQuest: "Find the lost sword",
    };
    toast.loading("Spawning player...");
    try {
      const tx = await worldContract.write.spawnPlayer([args, lore]);
      await waitForTransaction(tx);
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

  const updateLore = (playerId: string, lore: Partial<Lore>) => {
    usePlayerStore.getState().setLore(playerId, lore);
  };
  const fetchLore = (playerId: string): Lore | undefined => {
    return usePlayerStore.getState().getLore(playerId);
  };
  return {
    spawn,
    updateLore,
    fetchLore,
  };
}
