// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

/* Autogenerated file. Do not edit manually. */

// Import store internals
import { IStore } from "@latticexyz/store/src/IStore.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { StoreCore } from "@latticexyz/store/src/StoreCore.sol";
import { Bytes } from "@latticexyz/store/src/Bytes.sol";
import { Memory } from "@latticexyz/store/src/Memory.sol";
import { SliceLib } from "@latticexyz/store/src/Slice.sol";
import { EncodeArray } from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import { FieldLayout } from "@latticexyz/store/src/FieldLayout.sol";
import { Schema } from "@latticexyz/store/src/Schema.sol";
import { EncodedLengths, EncodedLengthsLib } from "@latticexyz/store/src/EncodedLengths.sol";
import { ResourceId } from "@latticexyz/store/src/ResourceId.sol";

struct QuestData {
  uint8 reward;
  bool isActive;
  string questName;
  string description;
}

library Quest {
  // Hex below is the result of `WorldResourceIdLib.encode({ namespace: "", name: "Quest", typeId: RESOURCE_TABLE });`
  ResourceId constant _tableId = ResourceId.wrap(0x7462000000000000000000000000000051756573740000000000000000000000);

  FieldLayout constant _fieldLayout =
    FieldLayout.wrap(0x0002020201010000000000000000000000000000000000000000000000000000);

  // Hex-encoded key schema of (bytes32)
  Schema constant _keySchema = Schema.wrap(0x002001005f000000000000000000000000000000000000000000000000000000);
  // Hex-encoded value schema of (uint8, bool, string, string)
  Schema constant _valueSchema = Schema.wrap(0x000202020060c5c5000000000000000000000000000000000000000000000000);

  /**
   * @notice Get the table's key field names.
   * @return keyNames An array of strings with the names of key fields.
   */
  function getKeyNames() internal pure returns (string[] memory keyNames) {
    keyNames = new string[](1);
    keyNames[0] = "questId";
  }

  /**
   * @notice Get the table's value field names.
   * @return fieldNames An array of strings with the names of value fields.
   */
  function getFieldNames() internal pure returns (string[] memory fieldNames) {
    fieldNames = new string[](4);
    fieldNames[0] = "reward";
    fieldNames[1] = "isActive";
    fieldNames[2] = "questName";
    fieldNames[3] = "description";
  }

  /**
   * @notice Register the table with its config.
   */
  function register() internal {
    StoreSwitch.registerTable(_tableId, _fieldLayout, _keySchema, _valueSchema, getKeyNames(), getFieldNames());
  }

  /**
   * @notice Register the table with its config.
   */
  function _register() internal {
    StoreCore.registerTable(_tableId, _fieldLayout, _keySchema, _valueSchema, getKeyNames(), getFieldNames());
  }

  /**
   * @notice Get reward.
   */
  function getReward(bytes32 questId) internal view returns (uint8 reward) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    bytes32 _blob = StoreSwitch.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (uint8(bytes1(_blob)));
  }

  /**
   * @notice Get reward.
   */
  function _getReward(bytes32 questId) internal view returns (uint8 reward) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    bytes32 _blob = StoreCore.getStaticField(_tableId, _keyTuple, 0, _fieldLayout);
    return (uint8(bytes1(_blob)));
  }

  /**
   * @notice Set reward.
   */
  function setReward(bytes32 questId, uint8 reward) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreSwitch.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((reward)), _fieldLayout);
  }

  /**
   * @notice Set reward.
   */
  function _setReward(bytes32 questId, uint8 reward) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreCore.setStaticField(_tableId, _keyTuple, 0, abi.encodePacked((reward)), _fieldLayout);
  }

  /**
   * @notice Get isActive.
   */
  function getIsActive(bytes32 questId) internal view returns (bool isActive) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    bytes32 _blob = StoreSwitch.getStaticField(_tableId, _keyTuple, 1, _fieldLayout);
    return (_toBool(uint8(bytes1(_blob))));
  }

  /**
   * @notice Get isActive.
   */
  function _getIsActive(bytes32 questId) internal view returns (bool isActive) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    bytes32 _blob = StoreCore.getStaticField(_tableId, _keyTuple, 1, _fieldLayout);
    return (_toBool(uint8(bytes1(_blob))));
  }

  /**
   * @notice Set isActive.
   */
  function setIsActive(bytes32 questId, bool isActive) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreSwitch.setStaticField(_tableId, _keyTuple, 1, abi.encodePacked((isActive)), _fieldLayout);
  }

  /**
   * @notice Set isActive.
   */
  function _setIsActive(bytes32 questId, bool isActive) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreCore.setStaticField(_tableId, _keyTuple, 1, abi.encodePacked((isActive)), _fieldLayout);
  }

  /**
   * @notice Get questName.
   */
  function getQuestName(bytes32 questId) internal view returns (string memory questName) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    bytes memory _blob = StoreSwitch.getDynamicField(_tableId, _keyTuple, 0);
    return (string(_blob));
  }

  /**
   * @notice Get questName.
   */
  function _getQuestName(bytes32 questId) internal view returns (string memory questName) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    bytes memory _blob = StoreCore.getDynamicField(_tableId, _keyTuple, 0);
    return (string(_blob));
  }

  /**
   * @notice Set questName.
   */
  function setQuestName(bytes32 questId, string memory questName) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreSwitch.setDynamicField(_tableId, _keyTuple, 0, bytes((questName)));
  }

  /**
   * @notice Set questName.
   */
  function _setQuestName(bytes32 questId, string memory questName) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreCore.setDynamicField(_tableId, _keyTuple, 0, bytes((questName)));
  }

  /**
   * @notice Get the length of questName.
   */
  function lengthQuestName(bytes32 questId) internal view returns (uint256) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    uint256 _byteLength = StoreSwitch.getDynamicFieldLength(_tableId, _keyTuple, 0);
    unchecked {
      return _byteLength / 1;
    }
  }

  /**
   * @notice Get the length of questName.
   */
  function _lengthQuestName(bytes32 questId) internal view returns (uint256) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    uint256 _byteLength = StoreCore.getDynamicFieldLength(_tableId, _keyTuple, 0);
    unchecked {
      return _byteLength / 1;
    }
  }

  /**
   * @notice Get an item of questName.
   * @dev Reverts with Store_IndexOutOfBounds if `_index` is out of bounds for the array.
   */
  function getItemQuestName(bytes32 questId, uint256 _index) internal view returns (string memory) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    unchecked {
      bytes memory _blob = StoreSwitch.getDynamicFieldSlice(_tableId, _keyTuple, 0, _index * 1, (_index + 1) * 1);
      return (string(_blob));
    }
  }

  /**
   * @notice Get an item of questName.
   * @dev Reverts with Store_IndexOutOfBounds if `_index` is out of bounds for the array.
   */
  function _getItemQuestName(bytes32 questId, uint256 _index) internal view returns (string memory) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    unchecked {
      bytes memory _blob = StoreCore.getDynamicFieldSlice(_tableId, _keyTuple, 0, _index * 1, (_index + 1) * 1);
      return (string(_blob));
    }
  }

  /**
   * @notice Push a slice to questName.
   */
  function pushQuestName(bytes32 questId, string memory _slice) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreSwitch.pushToDynamicField(_tableId, _keyTuple, 0, bytes((_slice)));
  }

  /**
   * @notice Push a slice to questName.
   */
  function _pushQuestName(bytes32 questId, string memory _slice) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreCore.pushToDynamicField(_tableId, _keyTuple, 0, bytes((_slice)));
  }

  /**
   * @notice Pop a slice from questName.
   */
  function popQuestName(bytes32 questId) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreSwitch.popFromDynamicField(_tableId, _keyTuple, 0, 1);
  }

  /**
   * @notice Pop a slice from questName.
   */
  function _popQuestName(bytes32 questId) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreCore.popFromDynamicField(_tableId, _keyTuple, 0, 1);
  }

  /**
   * @notice Update a slice of questName at `_index`.
   */
  function updateQuestName(bytes32 questId, uint256 _index, string memory _slice) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    unchecked {
      bytes memory _encoded = bytes((_slice));
      StoreSwitch.spliceDynamicData(_tableId, _keyTuple, 0, uint40(_index * 1), uint40(_encoded.length), _encoded);
    }
  }

  /**
   * @notice Update a slice of questName at `_index`.
   */
  function _updateQuestName(bytes32 questId, uint256 _index, string memory _slice) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    unchecked {
      bytes memory _encoded = bytes((_slice));
      StoreCore.spliceDynamicData(_tableId, _keyTuple, 0, uint40(_index * 1), uint40(_encoded.length), _encoded);
    }
  }

  /**
   * @notice Get description.
   */
  function getDescription(bytes32 questId) internal view returns (string memory description) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    bytes memory _blob = StoreSwitch.getDynamicField(_tableId, _keyTuple, 1);
    return (string(_blob));
  }

  /**
   * @notice Get description.
   */
  function _getDescription(bytes32 questId) internal view returns (string memory description) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    bytes memory _blob = StoreCore.getDynamicField(_tableId, _keyTuple, 1);
    return (string(_blob));
  }

  /**
   * @notice Set description.
   */
  function setDescription(bytes32 questId, string memory description) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreSwitch.setDynamicField(_tableId, _keyTuple, 1, bytes((description)));
  }

  /**
   * @notice Set description.
   */
  function _setDescription(bytes32 questId, string memory description) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreCore.setDynamicField(_tableId, _keyTuple, 1, bytes((description)));
  }

  /**
   * @notice Get the length of description.
   */
  function lengthDescription(bytes32 questId) internal view returns (uint256) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    uint256 _byteLength = StoreSwitch.getDynamicFieldLength(_tableId, _keyTuple, 1);
    unchecked {
      return _byteLength / 1;
    }
  }

  /**
   * @notice Get the length of description.
   */
  function _lengthDescription(bytes32 questId) internal view returns (uint256) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    uint256 _byteLength = StoreCore.getDynamicFieldLength(_tableId, _keyTuple, 1);
    unchecked {
      return _byteLength / 1;
    }
  }

  /**
   * @notice Get an item of description.
   * @dev Reverts with Store_IndexOutOfBounds if `_index` is out of bounds for the array.
   */
  function getItemDescription(bytes32 questId, uint256 _index) internal view returns (string memory) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    unchecked {
      bytes memory _blob = StoreSwitch.getDynamicFieldSlice(_tableId, _keyTuple, 1, _index * 1, (_index + 1) * 1);
      return (string(_blob));
    }
  }

  /**
   * @notice Get an item of description.
   * @dev Reverts with Store_IndexOutOfBounds if `_index` is out of bounds for the array.
   */
  function _getItemDescription(bytes32 questId, uint256 _index) internal view returns (string memory) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    unchecked {
      bytes memory _blob = StoreCore.getDynamicFieldSlice(_tableId, _keyTuple, 1, _index * 1, (_index + 1) * 1);
      return (string(_blob));
    }
  }

  /**
   * @notice Push a slice to description.
   */
  function pushDescription(bytes32 questId, string memory _slice) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreSwitch.pushToDynamicField(_tableId, _keyTuple, 1, bytes((_slice)));
  }

  /**
   * @notice Push a slice to description.
   */
  function _pushDescription(bytes32 questId, string memory _slice) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreCore.pushToDynamicField(_tableId, _keyTuple, 1, bytes((_slice)));
  }

  /**
   * @notice Pop a slice from description.
   */
  function popDescription(bytes32 questId) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreSwitch.popFromDynamicField(_tableId, _keyTuple, 1, 1);
  }

  /**
   * @notice Pop a slice from description.
   */
  function _popDescription(bytes32 questId) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreCore.popFromDynamicField(_tableId, _keyTuple, 1, 1);
  }

  /**
   * @notice Update a slice of description at `_index`.
   */
  function updateDescription(bytes32 questId, uint256 _index, string memory _slice) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    unchecked {
      bytes memory _encoded = bytes((_slice));
      StoreSwitch.spliceDynamicData(_tableId, _keyTuple, 1, uint40(_index * 1), uint40(_encoded.length), _encoded);
    }
  }

  /**
   * @notice Update a slice of description at `_index`.
   */
  function _updateDescription(bytes32 questId, uint256 _index, string memory _slice) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    unchecked {
      bytes memory _encoded = bytes((_slice));
      StoreCore.spliceDynamicData(_tableId, _keyTuple, 1, uint40(_index * 1), uint40(_encoded.length), _encoded);
    }
  }

  /**
   * @notice Get the full data.
   */
  function get(bytes32 questId) internal view returns (QuestData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    (bytes memory _staticData, EncodedLengths _encodedLengths, bytes memory _dynamicData) = StoreSwitch.getRecord(
      _tableId,
      _keyTuple,
      _fieldLayout
    );
    return decode(_staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Get the full data.
   */
  function _get(bytes32 questId) internal view returns (QuestData memory _table) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    (bytes memory _staticData, EncodedLengths _encodedLengths, bytes memory _dynamicData) = StoreCore.getRecord(
      _tableId,
      _keyTuple,
      _fieldLayout
    );
    return decode(_staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Set the full data using individual values.
   */
  function set(
    bytes32 questId,
    uint8 reward,
    bool isActive,
    string memory questName,
    string memory description
  ) internal {
    bytes memory _staticData = encodeStatic(reward, isActive);

    EncodedLengths _encodedLengths = encodeLengths(questName, description);
    bytes memory _dynamicData = encodeDynamic(questName, description);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreSwitch.setRecord(_tableId, _keyTuple, _staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Set the full data using individual values.
   */
  function _set(
    bytes32 questId,
    uint8 reward,
    bool isActive,
    string memory questName,
    string memory description
  ) internal {
    bytes memory _staticData = encodeStatic(reward, isActive);

    EncodedLengths _encodedLengths = encodeLengths(questName, description);
    bytes memory _dynamicData = encodeDynamic(questName, description);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreCore.setRecord(_tableId, _keyTuple, _staticData, _encodedLengths, _dynamicData, _fieldLayout);
  }

  /**
   * @notice Set the full data using the data struct.
   */
  function set(bytes32 questId, QuestData memory _table) internal {
    bytes memory _staticData = encodeStatic(_table.reward, _table.isActive);

    EncodedLengths _encodedLengths = encodeLengths(_table.questName, _table.description);
    bytes memory _dynamicData = encodeDynamic(_table.questName, _table.description);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreSwitch.setRecord(_tableId, _keyTuple, _staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Set the full data using the data struct.
   */
  function _set(bytes32 questId, QuestData memory _table) internal {
    bytes memory _staticData = encodeStatic(_table.reward, _table.isActive);

    EncodedLengths _encodedLengths = encodeLengths(_table.questName, _table.description);
    bytes memory _dynamicData = encodeDynamic(_table.questName, _table.description);

    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreCore.setRecord(_tableId, _keyTuple, _staticData, _encodedLengths, _dynamicData, _fieldLayout);
  }

  /**
   * @notice Decode the tightly packed blob of static data using this table's field layout.
   */
  function decodeStatic(bytes memory _blob) internal pure returns (uint8 reward, bool isActive) {
    reward = (uint8(Bytes.getBytes1(_blob, 0)));

    isActive = (_toBool(uint8(Bytes.getBytes1(_blob, 1))));
  }

  /**
   * @notice Decode the tightly packed blob of dynamic data using the encoded lengths.
   */
  function decodeDynamic(
    EncodedLengths _encodedLengths,
    bytes memory _blob
  ) internal pure returns (string memory questName, string memory description) {
    uint256 _start;
    uint256 _end;
    unchecked {
      _end = _encodedLengths.atIndex(0);
    }
    questName = (string(SliceLib.getSubslice(_blob, _start, _end).toBytes()));

    _start = _end;
    unchecked {
      _end += _encodedLengths.atIndex(1);
    }
    description = (string(SliceLib.getSubslice(_blob, _start, _end).toBytes()));
  }

  /**
   * @notice Decode the tightly packed blobs using this table's field layout.
   * @param _staticData Tightly packed static fields.
   * @param _encodedLengths Encoded lengths of dynamic fields.
   * @param _dynamicData Tightly packed dynamic fields.
   */
  function decode(
    bytes memory _staticData,
    EncodedLengths _encodedLengths,
    bytes memory _dynamicData
  ) internal pure returns (QuestData memory _table) {
    (_table.reward, _table.isActive) = decodeStatic(_staticData);

    (_table.questName, _table.description) = decodeDynamic(_encodedLengths, _dynamicData);
  }

  /**
   * @notice Delete all data for given keys.
   */
  function deleteRecord(bytes32 questId) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreSwitch.deleteRecord(_tableId, _keyTuple);
  }

  /**
   * @notice Delete all data for given keys.
   */
  function _deleteRecord(bytes32 questId) internal {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    StoreCore.deleteRecord(_tableId, _keyTuple, _fieldLayout);
  }

  /**
   * @notice Tightly pack static (fixed length) data using this table's schema.
   * @return The static data, encoded into a sequence of bytes.
   */
  function encodeStatic(uint8 reward, bool isActive) internal pure returns (bytes memory) {
    return abi.encodePacked(reward, isActive);
  }

  /**
   * @notice Tightly pack dynamic data lengths using this table's schema.
   * @return _encodedLengths The lengths of the dynamic fields (packed into a single bytes32 value).
   */
  function encodeLengths(
    string memory questName,
    string memory description
  ) internal pure returns (EncodedLengths _encodedLengths) {
    // Lengths are effectively checked during copy by 2**40 bytes exceeding gas limits
    unchecked {
      _encodedLengths = EncodedLengthsLib.pack(bytes(questName).length, bytes(description).length);
    }
  }

  /**
   * @notice Tightly pack dynamic (variable length) data using this table's schema.
   * @return The dynamic data, encoded into a sequence of bytes.
   */
  function encodeDynamic(string memory questName, string memory description) internal pure returns (bytes memory) {
    return abi.encodePacked(bytes((questName)), bytes((description)));
  }

  /**
   * @notice Encode all of a record's fields.
   * @return The static (fixed length) data, encoded into a sequence of bytes.
   * @return The lengths of the dynamic fields (packed into a single bytes32 value).
   * @return The dynamic (variable length) data, encoded into a sequence of bytes.
   */
  function encode(
    uint8 reward,
    bool isActive,
    string memory questName,
    string memory description
  ) internal pure returns (bytes memory, EncodedLengths, bytes memory) {
    bytes memory _staticData = encodeStatic(reward, isActive);

    EncodedLengths _encodedLengths = encodeLengths(questName, description);
    bytes memory _dynamicData = encodeDynamic(questName, description);

    return (_staticData, _encodedLengths, _dynamicData);
  }

  /**
   * @notice Encode keys as a bytes32 array using this table's field layout.
   */
  function encodeKeyTuple(bytes32 questId) internal pure returns (bytes32[] memory) {
    bytes32[] memory _keyTuple = new bytes32[](1);
    _keyTuple[0] = questId;

    return _keyTuple;
  }
}

/**
 * @notice Cast a value to a bool.
 * @dev Boolean values are encoded as uint8 (1 = true, 0 = false), but Solidity doesn't allow casting between uint8 and bool.
 * @param value The uint8 value to convert.
 * @return result The boolean value.
 */
function _toBool(uint8 value) pure returns (bool result) {
  assembly {
    result := value
  }
}
