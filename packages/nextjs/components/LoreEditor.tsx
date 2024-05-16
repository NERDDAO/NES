import React, { useState } from "react";
import { useMUD } from "./mud/MUDContext";
import { usePlayerStore } from "~~/services/store/playerStore";

const LoreEditor = () => {
  const { lore, setLore } = usePlayerStore();

  const {
    systemCalls: { spawn },
  } = useMUD();

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-bold text-gray-800">Edit Lore:</h2>
      <div>
        <label>Alignment:</label>
        <input value={lore.alignment} onChange={e => setLore({ ...lore, alignment: e.target.value })} />
      </div>
      <div>
        <label>Backstory:</label>
        <textarea value={lore.backstory} onChange={e => setLore({ ...lore, backstory: e.target.value })} />
      </div>
      <div>
        <label>Current Quest:</label>
        <input value={lore.currentQuest} onChange={e => setLore({ ...lore, currentQuest: e.target.value })} />
      </div>
      <button className="btn" onClick={spawn}>
        spawn
      </button>
    </div>
  );
};
export default LoreEditor;
