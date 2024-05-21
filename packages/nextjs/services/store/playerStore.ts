import create from "zustand";

interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  health: number;
}

interface Lore {
  id: string;
  alignment: string;
  background: string;
  currentQuest: string;
}

interface PlayerStore {
  playerName: string;
  players: Player[];
  lore: Lore[];
  setPlayerName: (name: string) => void;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  setLore: (lore: Lore[]) => void;
  addLore: (lore: Lore) => void;
  getLore: (playerId: string) => Lore | undefined;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  playerName: "",
  players: [],
  lore: [],
  setPlayerName: name => set({ playerName: name }),
  setPlayers: players => set({ players }),
  addPlayer: player => set(state => ({ players: [...state.players, player] })),
  setLore: lore => set({ lore }),
  addLore: lore => set(state => ({ lore: [...state.lore, lore] })),
  getLore: playerId => get().lore.find(l => l.id === playerId), // Implement this method
}));
