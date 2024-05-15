import create from "zustand";

interface Player {
  id: string;
  name: string;
  x: number;
  y: number;
  health: number;
}

interface PlayerStore {
  playerName: string;
  players: Player[];
  setPlayerName: (name: string) => void;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
}

export const usePlayerStore = create<PlayerStore>(set => ({
  playerName: "",
  players: [],
  setPlayerName: name => set({ playerName: name }),
  setPlayers: players => set({ players }),
  addPlayer: player => set(state => ({ players: [...state.players, player] })),
}));
