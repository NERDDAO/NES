import React, { useState } from "react";
import { SystemCalls } from "./createSystemCalls";

interface Props {
  systemCalls: SystemCalls;
}

export const QuestComponent: React.FC<Props> = ({ systemCalls }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState<number>();
  const [completeQuestId, setCompleteQuestId] = useState("");

  const handleCreateQuest = async () => {
    if (!name || !reward) {
      alert("Name and reward are required");
      return;
    }
    await systemCalls.createQuest(name, description, reward);
  };

  const handleCompleteQuest = async () => {
    if (!completeQuestId) {
      alert("Quest ID is required");
      return;
    }
    await systemCalls.completeQuest(completeQuestId);
  };

  return (
    <div>
      <h2>Create Quest</h2>
      <input type="text" placeholder="Quest Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="number" placeholder="Reward" value={reward} onChange={e => setReward(Number(e.target.value))} />
      <button onClick={handleCreateQuest}>Create Quest</button>

      <h2>Complete Quest</h2>
      <input
        type="text"
        placeholder="Quest ID"
        value={completeQuestId}
        onChange={e => setCompleteQuestId(e.target.value)}
      />
      <button onClick={handleCompleteQuest}>Complete Quest</button>
    </div>
  );
};
