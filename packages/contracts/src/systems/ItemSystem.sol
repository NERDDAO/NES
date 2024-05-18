// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { Item, ItemData } from "../codegen/index.sol";
import { addressToEntityKey } from "../addressToEntityKey.sol";

contract ItemSystem is System {
  event ItemCreated(uint8 itemId, string name, string description);

  function createItem(uint8 itemId, string memory name, string memory description, uint256 itemCount) public {
    Item.set(itemId, ItemData({ itemCount: itemCount, itemName: name, description: description }));
    emit ItemCreated(itemId, name, description);
  }
}
