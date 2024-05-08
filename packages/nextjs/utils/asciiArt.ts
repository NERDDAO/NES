// utils/asciiArt.ts

export const generateASCIIArt = (artType: string): string => {
  switch (artType) {
    case "item1":
      return `
        ___
    ___/   \\___
   /   '---'   \\
   '--_______--'
        / \\
       /   \\
       /\\O/\\
       / | \\
       // \\\\
      `;
    case "face1":
      return `
        +---+
        |o o|
        | ^ |
        |\_/|
        +---+
      `;
    // Add more cases for different art types
    default:
      return "";
  }
};
