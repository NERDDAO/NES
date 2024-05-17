import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";
import { getComponentValue } from "@latticexyz/recs";
import { uuid } from "@latticexyz/utils";
import { toast } from "react-hot-toast";
import { usePlayerStore } from "~~/services/store/playerStore";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { playerEntity, worldContract, waitForTransaction }: SetupNetworkResult,
  { Player, Lore, Inventory, Item, Quest, Trading }: ClientComponents,
) {
  const handleTransaction = async (
    transactionFn: () => Promise<any>,
    loadingMessage: string,
    successMessage: string,
    errorMessage: string,
  ) => {
    toast.loading(loadingMessage);

    try {
      const tx = await transactionFn();
      await waitForTransaction(tx);
      toast.success(successMessage);
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error(errorMessage);
    } finally {
      toast.dismiss();
    }
  };

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

    toast.loading("Spawning player...");

    try {
      const args = {
        x: 0,
        y: 0,
        health: 100,
        name: playerName,
      };
      const tx = await worldContract.write.spawnPlayer([args, lore]);
      await waitForTransaction(tx);
      toast.success(`Player spawned! ${playerName}`);
    } catch (error) {
      console.error("Spawn transaction failed:", error);
      toast.error("Failed to spawn player.");
    } finally {
      setTimeout(() => {
        Player.removeOverride(playerId);
        toast.dismiss();
      }, 1000);
    }
  };

  const addItemToInventory = async () => {
    await handleTransaction(
      () => worldContract.write.addItemToInventory([1]),
      "Adding item...",
      "Item added!",
      "Failed to add item.",
    );
  };

  const removeItemFromInventory = async (ownerId: string, itemId: string) => {
    await handleTransaction(
      () => worldContract.write.removeItemFromInventory([ownerId, itemId]),
      "Removing item...",
      "Item removed!",
      "Failed to remove item.",
    );
  };

  const createQuest = async (name: string, description: string, reward: number) => {
    await handleTransaction(
      () => worldContract.write.createQuest([name, description, reward]),
      "Creating quest...",
      "Quest created!",
      "Failed to create quest.",
    );
  };

  const completeQuest = async (questId: string) => {
    await handleTransaction(
      () => worldContract.write.completeQuest([questId]),
      "Completing quest...",
      "Quest completed!",
      "Failed to complete quest.",
    );
  };

  const tradeItem = async (from: string, to: string, itemId: string) => {
    await handleTransaction(
      () => worldContract.write.tradeItem([from, to, itemId]),
      "Trading item...",
      "Item traded!",
      "Failed to trade item.",
    );
  };

  return {
    spawn,
    addItemToInventory,
    removeItemFromInventory,
    createQuest,
    completeQuest,
    tradeItem,
  };
}
