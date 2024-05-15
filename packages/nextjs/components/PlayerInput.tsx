import React from "react";
import { usePlayerStore } from "~~/services/store/playerStore";

const PlayerInput = () => {
  const playerName = usePlayerStore(state => state.playerName);
  const setPlayerName = usePlayerStore(state => state.setPlayerName);

  return (
    <div className="p-2">
      <input
        type="text"
        value={playerName}
        onChange={e => setPlayerName(e.target.value)}
        placeholder="Enter player name"
      />
    </div>
  );
};

export default PlayerInput;
