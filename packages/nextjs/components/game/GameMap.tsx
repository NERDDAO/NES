// components/Game/GameMap.tsx
import React, { useState } from "react";
import { Room } from "../../types/game";
import { MapNavigator } from "./MapNavigator";

interface GameMapProps {
  currentRoom: string;
  rooms: Room[];
}

export const GameMap: React.FC<GameMapProps> = ({ currentRoom, rooms }) => {
  const [mapView, setMapView] = useState<"overview" | "room">("overview");

  const renderOverviewMap = () => {
    // Implement your overview map rendering logic here
    // You can use ASCII characters or custom icons to represent rooms and connections
    // Example:
    const map = `
      [Room 1] --- [Room 2]
         |
      [Room 3]
    `;
    return <pre>{map}</pre>;
  };

  const renderRoomMap = () => {
    const room = rooms.find(r => r.id === currentRoom);
    if (!room) {
      return <p>Room not found.</p>;
    }
    return (
      <>
        <h3>Map:</h3>
        <MapNavigator room={room} />
      </>
    );
  };

  const toggleMapView = () => {
    setMapView(mapView === "overview" ? "room" : "overview");
  };

  return (
    <div>
      <h3>Map:</h3>
      {mapView === "overview" ? (
        <>
          {renderOverviewMap()}
          <button onClick={toggleMapView}>Show Room</button>
        </>
      ) : (
        <>
          {renderRoomMap()}
          <button onClick={toggleMapView}>Show Overview</button>
        </>
      )}
      <p>Current Room: {currentRoom}</p>
    </div>
  );
};
