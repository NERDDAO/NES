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
  },
  deploy: {
    upgradeableWorldImplementation: true,
  },
});
