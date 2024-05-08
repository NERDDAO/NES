// utils/gameEngine.ts
import { Character, GameState, Item, Room } from "../types/game";

// Initial game state
export class GameDisk {
  constructor(
    public startingRoom: string,
    public rooms: Room[],
    public items: Item[],
    public characters: Character[],
  ) {}
}

// utils/gameEngine.ts

// ...

export class GameEngine {
  private state: GameState;

  constructor(private gameDisk: GameDisk) {
    this.state = {
      currentRoom: gameDisk.startingRoom,
      inventory: [],
      characters: [],
      output: [],
    };
  }

  public handleCommand(command: string): void {
    // Parse the command and perform corresponding actions
    // Update the game state based on the command
    // Example:
    if (command === "look") {
      const roomDescription = this.getRoomDescription(this.state.currentRoom);
      this.state.output.push(roomDescription);
    }
    // Add more command handling logic here
  }

  public getState(): GameState {
    return this.state;
  }

  private getRoomDescription(roomId: string): string {
    const room = this.getRoomById(roomId);
    return room ? room.description : "Room not found";
  }

  private getRoomById(roomId: string): Room | undefined {
    return this.gameDisk.rooms.find(room => room.id === roomId);
  }

  private getItemById(itemId: string): Item | undefined {
    return this.gameDisk.items.find(item => item.id === itemId);
  }

  private getCharacterById(characterId: string): Character | undefined {
    return this.gameDisk.characters.find(character => character.id === characterId);
  }

  // Add more game engine methods as needed
}

// Function to handle user commands
export const handleCommand = (state: GameState, command: string): GameState => {
  // Parse the command and perform corresponding actions
  // Update the game state based on the command
  // Return the updated game state
  // Example:
  if (command === "look") {
    const roomDescription = getRoomDescription(state.currentRoom);
    return {
      ...state,
      output: [...state.output, roomDescription],
    };
  }
  // Add more command handling logic here
  return state;
};
