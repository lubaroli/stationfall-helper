import type { Character, GameState, PlayerAssignment, PlayerData } from '@/types';
import { getGameConfig, getTotalIdentityCardsNeeded } from '@/data/gameRules';
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
 * Doctor contributes 2 cards, Drones contributes 0
 */
function createIdentityCardPool(characters: Character[]): Character[] {
  const pool: Character[] = [];
  for (const char of characters) {
    for (let i = 0; i < char.identityCardCount; i++) {
      pool.push(char);
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
    const playerCards: Character[] = [];
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
 * Encode player data for player URL
 */
export function encodePlayerData(player: PlayerAssignment): string {
  const data = createPlayerData(player);
  return encryptForUrl(data);
}

/**
 * Decode player data from player URL
 */
export function decodePlayerData(encoded: string): PlayerData | null {
  return decryptFromUrl<PlayerData>(encoded);
}
