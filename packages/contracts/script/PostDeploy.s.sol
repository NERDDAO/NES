// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;
import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { IWorld } from "../src/codegen/world/IWorld.sol";
import { SpawnPlayerSystem } from "../src/systems/SpawnPlayerSystem.sol";

import { Player, Lore, Inventory } from "../src/codegen/index.sol";

contract PostDeploy is Script {
  function run(address worldAddress) external {
    // Specify a store so that you can use tables directly in PostDeploy
    StoreSwitch.setStoreAddress(worldAddress);

    // Load the private key from the `PRIVATE_KEY` environment variable (in .env)
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    vm.startBroadcast(deployerPrivateKey);

    // Deploy the SpawnPlayerSystem contract
    //SpawnPlayerSystem spawnPlayerSystem = new SpawnPlayerSystem();
    //console.log("SpawnPlayerSystem deployed to:", address(spawnPlayerSystem));

    // Register the SpawnPlayerSystem in the World
    //IWorld(worldAddress).registerSystem("spawnPlayer", address(spawnPlayerSystem));

    // Spawn a player
    bytes32 playerId = keccak256(abi.encodePacked("player1"));
    int32 x = 0;
    int32 y = 0;
    uint32 health = 100;
    string memory name = "PlayerOne";
    Player.set(playerId, x, y, health, name);
    Lore.set(playerId, "chaotic good", "This is the first player.", "save the world");
    Inventory.set(playerId, new uint8[](1));
    //console.log("Player spawned:", playerId, name, x, y, health);

    vm.stopBroadcast();
  }
}
