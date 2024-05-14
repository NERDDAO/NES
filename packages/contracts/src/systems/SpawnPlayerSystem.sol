// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import { System } from "@latticexyz/world/src/System.sol";
import { Player, PlayerData } from "../codegen/index.sol";

contract SpawnPlayerSystem is System {
  function spawnPlayer(bytes32 id, PlayerData calldata data) public {
    // Ensure the player does not already exist
    PlayerData memory existingPlayer = Player.get(id);
    require(existingPlayer.health == 0, "Player already exists"); // Assuming health is 0 for non-existent players

    // Create the player
    Player.set(id, PlayerData({ x: data.x, y: data.y, health: data.health, name: data.name }));
  }
}

