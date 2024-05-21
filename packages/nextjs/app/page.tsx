"use client";

import GameBoard from "../components/mud/GameBoard";
import { useMUD } from "../components/mud/MUDContext";
import { useComponentValue } from "@latticexyz/react";
import { SyncStep } from "@latticexyz/store-sync";
import { singletonEntity } from "@latticexyz/store-sync/recs";

export const Home = () => {
  const {
    components: { SyncProgress },
  } = useMUD();

  const loadingState = useComponentValue(SyncProgress, singletonEntity, {
    step: SyncStep.INITIALIZE,
    message: "Connecting",
    percentage: 0,
    latestBlockNumber: 0n,
    lastBlockNumberProcessed: 0n,
  });

  const RenderGameBoard = () => {
    return GameBoard();
  };

  return (
    <div className="w-screen h-screen flex top-0 relative container">
      {loadingState.step !== SyncStep.LIVE ? (
        <div>
          {loadingState.message} ({loadingState.percentage.toFixed(2)}%)
        </div>
      ) : (
        <RenderGameBoard />
      )}
    </div>
  );
};
export default Home;
