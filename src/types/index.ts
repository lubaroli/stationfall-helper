export type CharacterType = 'human' | 'robot' | 'data' | 'human-robot';
export type ComplexityTier = 'beginner' | 'middle' | 'high' | 'experienced';
export type AbilityType = 'console' | 'conspirator' | 'offensive' | 'defensive' | 'mobility' | 'utility';

export interface Ability {
  name: string;
  description: string;
  type: AbilityType;
}

export interface Character {
  id: string;
  name: string;
  type: CharacterType; // 'human-robot' for Cyborg (both human and robot)
  tier: ComplexityTier;
  identityCardCount: number; // Usually 1, Doctor has 2, Drones has 0
  startingSection: string;
  influenceLimit: number;
  abilities: Ability[];
  revealPowers: Ability[];
  scoringSummary: string[];
}

export interface GameConfig {
  playerCount: number;
  requiredCharacters: number;
  identityCardsPerPlayer: number;
}

export interface PlayerAssignment {
  token: string;
  name: string;
  identityCards: Character[];
}

export interface GameState {
  id: string;
  playerCount: number;
  characters: Character[];
  players: PlayerAssignment[];
  createdAt: number;
}

export interface PlayerData {
  playerName: string;
  identityCards: Character[];
}
