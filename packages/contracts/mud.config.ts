import { defineWorld } from "@latticexyz/world";

// Define enums for better type safety and readability
const EntityType = ["Player"];

export default defineWorld({
  enums: {
    EntityType,
  },
  tables: {
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
        itemIds: "uint8[]", // Changed to bytes32[] for dynamic length
      },
      key: ["ownerId"],
    },
    Item: {
      schema: {
        itemId: "bytes8", // Changed to bytes32 for a more consistent key type
        itemCount: "uint256",
        itemName: "string",
      },
      key: ["itemId"],
    },
  },
  deploy: {
    upgradeableWorldImplementation: true,
  },
});
