import React, { useEffect } from "react";
import PlayerInput from "../PlayerInput";
import PlayerList from "../PlayerList";
import { useMUD } from "./MUDContext";

const GameBoard = () => {
  const {
    components: { Player },
    network: { playerEntity, useStore, tables },
    systemCalls: { spawn },
  } = useMUD();

  const records = useStore(state => Object.values(state.getRecords(tables.Player)));
  useEffect(() => {
    if (playerEntity) {
      // const players = useStore.getState();
      console.log("Players", records);

      //return players;
    }
  }, []);

  return (
    <div className="card-body w-full flex flex-row  items-center top-0 justify-center">
      <div className="flex flex-col">
        <PlayerInput />
        <button className="btn w-1/3" onClick={spawn}>
          Spawn
        </button>
      </div>
      <PlayerList players={records} />
    </div>
  );
};

export default GameBoard;
