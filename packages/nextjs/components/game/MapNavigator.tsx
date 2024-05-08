// components/Game/MapNavigator.tsx
import React, { useEffect, useState } from "react";
import { Room } from "../../types/game";
import { generateRoomASCIIMap } from "../../utils/asciiMap";

interface MapNavigatorProps {
  room: Room;
}

export const MapNavigator: React.FC<MapNavigatorProps> = ({ room }) => {
  const [position, setPosition] = useState({ x: 1, y: 1 });
  const asciiMap = generateRoomASCIIMap(room);
  const mapLines = asciiMap.split("\n");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      const { x, y } = position;

      switch (key) {
        case "w":
          setPosition(prev => ({ ...prev, y: Math.max(2, prev.y - 1) }));
          break;
        case "s":
          setPosition(prev => ({
            ...prev,
            y: Math.min(7, prev.y + 1),
          }));
          break;
        case "a":
          setPosition(prev => ({ ...prev, x: Math.max(1, prev.x - 1) }));
          break;
        case "d":
          setPosition(prev => ({
            ...prev,
            x: Math.min(30, prev.x + 1),
          }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [position]);

  const renderMap = () => {
    const { x, y } = position;
    const mapSquare = mapLines.slice(1, 8);
    const updatedMapSquare = mapSquare.map((line, i) =>
      i === y - 1 ? line.slice(0, x) + "@" + line.slice(x + 1) : line,
    );
    const updatedMapLines = [mapLines[0], ...updatedMapSquare, ...mapLines.slice(8)];
    return <pre>{updatedMapLines.join("\n")}</pre>;
  };

  return <div>{renderMap()}</div>;
};
