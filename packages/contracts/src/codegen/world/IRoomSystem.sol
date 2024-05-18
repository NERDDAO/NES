// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

/* Autogenerated file. Do not edit manually. */

/**
 * @title IRoomSystem
 * @author MUD (https://mud.dev) by Lattice (https://lattice.xyz)
 * @dev This interface is automatically generated from the corresponding system contract. Do not edit manually.
 */
interface IRoomSystem {
  function createRoom(bytes32 roomId, string memory name, string memory description) external;

  function createExit(bytes32 roomId, string memory direction, bytes32 targetRoomId) external;
}