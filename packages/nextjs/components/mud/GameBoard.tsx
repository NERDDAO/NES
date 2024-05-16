import React, { useEffect } from "react";
import LoreEditor from "../LoreEditor";
import PlayerInput from "../PlayerInput";
import PlayerList from "../PlayerList";
import { useMUD } from "./MUDContext";

const GameBoard = () => {
  const {
    network: { playerEntity, useStore, tables },
    systemCalls: { spawn },
  } = useMUD();

  const records = useStore(state => Object.values(state.getRecords(tables.Player)));

  return (
    <div className="container flex flex-row mx-auto w-full h-full">
      <PlayerInput />
      <button onClick={spawn}>Spawn</button>
      <PlayerList players={records} />
    </div>
  );
};

export default GameBoard;
