// types/game.ts

export interface GameState {
  currentRoom: string;
  inventory: Item[];
  characters: Character[];
  output: string[];
}

export interface Room {
  id: string;
  name: string;
  description: string;
  exits?: Exit[];
  items?: Item[];
  characters?: Character[];
}

export interface Exit {
  direction: string;
  roomId: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  isUsable?: boolean;
  useEffect?: (state: GameState) => GameState;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  dialogue?: string[];
  onTalk?: (state: GameState) => GameState;
}
