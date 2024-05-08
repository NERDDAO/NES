// utils/asciiMap.ts
import { Exit, Room } from "../types/game";

export const generateRoomASCIIMap = (room: Room): string => {
  const { name, exits } = room;
  const map: string[] = [];

  // Add the room name at the top
  map.push(`Room: ${name}`);
  map.push("--------------------------------");

  // Create the ASCII representation of the room
  const asciiRoom = [
    "+------------------------------+",
    "|                              |",
    "|                              |",
    "|                              |",
    "|                              |",
    "|                              |",
    "+------------------------------+",
  ];

  // Add exits to the ASCII representation
  exits?.forEach((exit: Exit) => {
    const { direction } = exit;
    switch (direction) {
      case "north":
        asciiRoom[0] = "+              ^              +";
        break;
      case "east":
        asciiRoom[3] = asciiRoom[3].slice(0, -1) + ">";
        break;
      case "south":
        asciiRoom[6] = "+              v              +";
        break;
      case "west":
        asciiRoom[3] = "<" + asciiRoom[3].slice(1);
        break;
    }
  });

  // Add the ASCII room to the map
  map.push(...asciiRoom);

  // Add exit labels below the room
  exits?.forEach((exit: Exit) => {
    const { direction } = exit;
    map.push(`${direction.toUpperCase()}: ${exit.roomId}`);
  });

  // Join the map elements with newline characters
  return map.join("\n");
};
