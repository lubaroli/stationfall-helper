import type { Character, GameState, PlayerAssignment, PlayerData, IdentityCard, CompactPlayerData, CompactIdentityCard } from '@/types';
import { getGameConfig, getTotalIdentityCardsNeeded } from '@/data/gameRules';
import { DOCTOR_VARIANTS, getCharacterById } from '@/data/characters';
import { shuffleArray, generateId } from '@/utils/shuffle';
import { encryptForUrl, decryptFromUrl } from './encryption';

/**
 * Calculate total identity cards from selected characters
 */
export function calculateTotalIdentityCards(characters: Character[]): number {
  return characters.reduce((sum, char) => sum + char.identityCardCount, 0);
}

/**
 * Validate character selection for a given player count
 */
export function validateSelection(
  playerCount: number,
  characters: Character[]
): { valid: boolean; message: string } {
  const config = getGameConfig(playerCount);
  if (!config) {
    return { valid: false, message: 'Invalid player count' };
  }

  if (characters.length < config.requiredCharacters) {
    return {
      valid: false,
      message: `Need at least ${config.requiredCharacters} characters, got ${characters.length}`,
    };
  }

  const totalIdentityCards = calculateTotalIdentityCards(characters);
  const requiredIdentityCards = getTotalIdentityCardsNeeded(playerCount);

  if (totalIdentityCards < requiredIdentityCards) {
    return {
      valid: false,
      message: `Need at least ${requiredIdentityCards} identity cards, got ${totalIdentityCards}`,
    };
  }

  return { valid: true, message: 'Valid selection' };
}

/**
 * Create identity card pool from characters
 * Doctor contributes 2 distinct cards (Jekyll and Hyde), Drones contributes 0
 */
function createIdentityCardPool(characters: Character[]): IdentityCard[] {
  const pool: IdentityCard[] = [];
  for (const char of characters) {
    if (char.id === 'doctor') {
      // Doctor has 2 distinct identity cards: Jekyll and Hyde
      const jekyllVariant = DOCTOR_VARIANTS.jekyll;
      const hydeVariant = DOCTOR_VARIANTS.hyde;
      
      pool.push({
        ...char,
        name: 'Doctor (Jekyll)',
        variant: jekyllVariant.variant,
        variantLabel: jekyllVariant.variantLabel,
        revealPowers: [...jekyllVariant.revealPowers],
        bonusCharacterRule: { ...jekyllVariant.bonusCharacterRule },
        agenda: { ...jekyllVariant.agenda, items: [...jekyllVariant.agenda.items] },
        scoringSummary: ['Escape Contaminated and/or w/Artifact', 'News and Authorities do not have Evidence'],
      });
      
      pool.push({
        ...char,
        name: 'Doctor (Hyde)',
        variant: hydeVariant.variant,
        variantLabel: hydeVariant.variantLabel,
        revealPowers: [...hydeVariant.revealPowers],
        bonusCharacterRule: { ...hydeVariant.bonusCharacterRule },
        agenda: { ...hydeVariant.agenda, items: [...hydeVariant.agenda.items] },
        scoringSummary: ['Escape w/briefcase', 'Live in Pod with Down Human'],
      });
    } else {
      // Normal characters: add as many cards as identityCardCount
      for (let i = 0; i < char.identityCardCount; i++) {
        pool.push(char);
      }
    }
  }
  return pool;
}

/**
 * Deal identity cards to players
 */
export function dealCards(
  playerCount: number,
  characters: Character[],
  playerNames: string[]
): PlayerAssignment[] {
  const config = getGameConfig(playerCount);
  if (!config) throw new Error('Invalid player count');

  // Create pool of identity cards
  const pool = createIdentityCardPool(characters);
  const shuffledPool = shuffleArray(pool);

  // Deal cards to each player
  const players: PlayerAssignment[] = [];
  let cardIndex = 0;

  for (let i = 0; i < playerCount; i++) {
    const playerCards: IdentityCard[] = [];
    for (let j = 0; j < config.identityCardsPerPlayer; j++) {
      if (cardIndex < shuffledPool.length) {
        playerCards.push(shuffledPool[cardIndex]);
        cardIndex++;
      }
    }

    players.push({
      token: generateId(12),
      name: playerNames[i] || `Player ${i + 1}`,
      identityCards: playerCards,
    });
  }

  return players;
}

/**
 * Create a new game
 */
export function createGame(
  playerCount: number,
  characters: Character[],
  playerNames: string[]
): GameState {
  const players = dealCards(playerCount, characters, playerNames);

  return {
    id: generateId(8),
    playerCount,
    characters,
    players,
    createdAt: Date.now(),
  };
}

/**
 * Encode game state for host URL
 */
export function encodeGameState(game: GameState): string {
  return encryptForUrl(game);
}

/**
 * Decode game state from host URL
 */
export function decodeGameState(encoded: string): GameState | null {
  return decryptFromUrl<GameState>(encoded);
}

/**
 * Create player-specific data for their unique link
 */
export function createPlayerData(player: PlayerAssignment): PlayerData {
  return {
    playerName: player.name,
    identityCards: player.identityCards,
  };
}

/**
 * Convert IdentityCard to compact format (ID + variant only)
 */
function toCompactCard(card: IdentityCard): CompactIdentityCard {
  const compact: CompactIdentityCard = { id: card.id };
  if (card.variant) {
    compact.variant = card.variant;
  }
  return compact;
}

/**
 * Reconstruct full IdentityCard from compact format
 */
function fromCompactCard(compact: CompactIdentityCard): IdentityCard | null {
  const baseChar = getCharacterById(compact.id);
  if (!baseChar) return null;

  // Handle Doctor variants
  if (compact.id === 'doctor' && compact.variant) {
    const variant = DOCTOR_VARIANTS[compact.variant as 'jekyll' | 'hyde'];
    if (!variant) return null;

    return {
      ...baseChar,
      name: `Doctor (${variant.variantLabel})`,
      variant: variant.variant,
      variantLabel: variant.variantLabel,
      revealPowers: [...variant.revealPowers],
      bonusCharacterRule: { ...variant.bonusCharacterRule },
      agenda: { ...variant.agenda, items: [...variant.agenda.items] },
      scoringSummary: compact.variant === 'jekyll' 
        ? ['Escape Contaminated and/or w/Artifact', 'News and Authorities do not have Evidence']
        : ['Escape w/briefcase', 'Live in Pod with Down Human'],
    };
  }

  // Regular characters: return as-is
  return baseChar as IdentityCard;
}

/**
 * Encode player data for player URL (using compact format)
 */
export function encodePlayerData(player: PlayerAssignment): string {
  const compactData: CompactPlayerData = {
    name: player.name,
    cards: player.identityCards.map(toCompactCard),
  };
  return encryptForUrl(compactData);
}

/**
 * Decode player data from player URL (reconstructing full cards from IDs)
 */
export function decodePlayerData(encoded: string): PlayerData | null {
  const compactData = decryptFromUrl<CompactPlayerData>(encoded);
  if (!compactData) return null;

  const identityCards: IdentityCard[] = [];
  for (const compactCard of compactData.cards) {
    const card = fromCompactCard(compactCard);
    if (!card) return null; // Invalid character ID
    identityCards.push(card);
  }

  return {
    playerName: compactData.name,
    identityCards,
  };
}
