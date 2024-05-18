import { defineWorld } from "@latticexyz/world";

// Define enums for better type safety and readability
const EntityType = ["Player", "Room", "Item", "Character"];

export default defineWorld({
  enums: {
    EntityType,
  },
  tables: {
    TradeRequest: {
      schema: {
        requestId: "bytes32",
        requestedItem: "uint256",
        quantityRequested: "uint32",
        status: "uint8",
        requester: "address",
      },
      key: ["requestId"],
    },
    TradeOffer: {
      schema: {
        offerId: "bytes32",
        requestId: "bytes32",
        offeredItem: "uint256",
        quantityOffered: "uint32",
        offerer: "address",
      },
      key: ["offerId"],
    },
    Quest: {
      schema: {
        questId: "bytes32",
        reward: "uint8",
        isActive: "bool",
        questName: "string",
        description: "string",
      },
      key: ["questId"],
    },
    QuestStatus: {
      schema: {
        questId: "bytes32",
        participant: "address",
        status: "uint8",
      },
      key: ["questId", "participant"],
    },
    Player: {
      schema: {
        id: "bytes32",
        x: "int32",
        y: "int32",
        health: "uint32",
        name: "string",
      },
      key: ["id"],
    },
    Lore: {
      schema: {
        id: "bytes32",
        alignment: "string",
        backstory: "string",
        currentQuest: "string",
      },
      key: ["id"],
    },
    Inventory: {
      schema: {
        ownerId: "bytes32",
        itemIds: "uint8[]",
      },
      key: ["ownerId"],
    },
    Item: {
      schema: {
        itemId: "uint8",
        itemCount: "uint256",
        itemName: "string",
        description: "string",
      },
      key: ["itemId"],
    },
    Room: {
      schema: {
        roomId: "bytes32",
        name: "string",
        description: "string",
      },
      key: ["roomId"],
    },
    Exit: {
      schema: {
        roomId: "bytes32",
        targetRoomId: "bytes32",
        direction: "string",
      },
      key: ["roomId"],
    },
    Character: {
      schema: {
        characterId: "bytes32",
        name: "string",
        description: "string",
      },
      key: ["characterId"],
    },
  },
  deploy: {
    upgradeableWorldImplementation: true,
  },
});
