export type CharacterType = 'human' | 'robot' | 'data' | 'human-robot';
export type ComplexityTier = 'beginner' | 'middle' | 'high' | 'experienced';
export type AbilityType = 'console' | 'conspirator' | 'offensive' | 'defensive' | 'mobility' | 'utility';
export type BonusCharacterType = 'friend' | 'grudge' | 'none';

export interface Ability {
  name: string;
  description: string;
  type: AbilityType;
}

export interface AgendaItem {
  points: string; // e.g., "3 points", "+2 points", "1 point per..."
  condition: string; // The condition to score
  isBonus?: boolean; // True if this requires a primary condition to be met first
}

export interface Agenda {
  name: string;
  items: AgendaItem[];
  note?: string; // Optional note like "Billionaire doesn't score for Bribes"
}

export interface BonusCharacterRule {
  type: BonusCharacterType;
  points: string;
  condition: string;
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
  bonusCharacterRule?: BonusCharacterRule;
  agenda?: Agenda;
}

// IdentityCard represents a specific card dealt to a player
// For most characters this is the same as Character, but Doctor has 2 variants
export interface IdentityCard extends Character {
  variant?: string; // e.g., 'jekyll' or 'hyde' for Doctor
  variantLabel?: string; // e.g., 'Jekyll' or 'Hyde' for display
}

export interface GameConfig {
  playerCount: number;
  requiredCharacters: number;
  identityCardsPerPlayer: number;
}

export interface PlayerAssignment {
  token: string;
  name: string;
  identityCards: IdentityCard[];
}

export interface GameState {
  id: string;
  playerCount: number;
  characters: Character[];
  players: PlayerAssignment[];
  createdAt: number;
}

// Compact representation for URL encoding
export interface CompactIdentityCard {
  id: string;
  variant?: string; // 'jekyll' or 'hyde' for Doctor
}

export interface PlayerData {
  playerName: string;
  identityCards: IdentityCard[];
}

// Compact version for URL encoding (reduces link size by ~95%)
export interface CompactPlayerData {
  name: string;
  cards: CompactIdentityCard[];
}
