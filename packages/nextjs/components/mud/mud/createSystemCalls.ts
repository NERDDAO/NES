import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { getComponentValue } from "@latticexyz/recs";
import { uuid } from "@latticexyz/utils";
import { toast } from "react-hot-toast";
import { usePlayerStore } from "~~/services/store/playerStore";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { playerEntity, worldContract, waitForTransaction }: SetupNetworkResult,
  { Player, Lore, Inventory, Item }: ClientComponents,
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

  const addItemToInventory = async () => {
    toast.loading("Adding item...");
    try {
      const tx = await worldContract.write.addItemToInventory([1]);
      await waitForTransaction(tx);
      toast.success("Item added!");
    } catch (error) {
      console.error("Add item transaction failed:", error);
      toast.error("Failed to add item.");
    } finally {
      toast.dismiss();
    }
  };

  const removeItemFromInventory = async (ownerId: string, itemId: string) => {
    toast.loading("Removing item...");
    try {
      const tx = await worldContract.write.removeItemFromInventory([ownerId, itemId]);
      await waitForTransaction(tx);
      toast.success("Item removed!");
    } catch (error) {
      console.error("Remove item transaction failed:", error);
      toast.error("Failed to remove item.");
    } finally {
      toast.dismiss();
    }
  };

  return {
    spawn,
    addItemToInventory,
    removeItemFromInventory,
  };
}
