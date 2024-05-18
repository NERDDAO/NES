import React from "react";
import { CharacterComponent } from "../CharacterComponent";
import { ItemComponent } from "../ItemComponent";
import PlayerInput from "../PlayerInput";
import PlayerList from "../PlayerList";
import { QuestComponent } from "../QuestComponent";
import { RoomComponent } from "../RoomComponent";
import { TradingComponent } from "../TradingComponent";
import { useMUD } from "./MUDContext";

const GameBoard = () => {
  const {
    network: { useStore, tables },
  } = useMUD();

  const systemCalls = useMUD().systemCalls;

  const records = useStore(state => Object.values(state.getRecords(tables.Player)));

  return (
    <div className="container flex flex-row mx-auto w-full h-full">
      <PlayerInput />
      <PlayerList players={records} />
      <QuestComponent systemCalls={systemCalls} />
      <TradingComponent systemCalls={systemCalls} />
      <RoomComponent systemCalls={systemCalls} />
      <ItemComponent systemCalls={systemCalls} />
      <CharacterComponent systemCalls={systemCalls} />
    </div>
  );
};

export default GameBoard;
