import React from "react";
import PlayerInput from "../PlayerInput";
import PlayerList from "../PlayerList";
import { useMUD } from "./MUDContext";

const GameBoard = () => {
  const {
    network: { useStore, tables },
  } = useMUD();

  const records = useStore(state => Object.values(state.getRecords(tables.Player)));

  return (
    <div className="container flex flex-row mx-auto w-full h-full">
      <PlayerInput />
      <PlayerList players={records} />
    </div>
  );
};

export default GameBoard;
