// components/Game/GameInput.tsx
import React, { useState } from "react";

interface GameInputProps {
  onCommand: (command: string) => void;
}

const GameInput: React.FC<GameInputProps> = ({ onCommand }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCommand(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter your command" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default GameInput;
