import type { GameConfig } from '@/types';

export const PLAYER_CONFIG: Record<number, GameConfig> = {
  2: { playerCount: 2, requiredCharacters: 12, identityCardsPerPlayer: 3 },
  3: { playerCount: 3, requiredCharacters: 12, identityCardsPerPlayer: 3 },
  4: { playerCount: 4, requiredCharacters: 12, identityCardsPerPlayer: 2 },
  5: { playerCount: 5, requiredCharacters: 14, identityCardsPerPlayer: 2 },
  6: { playerCount: 6, requiredCharacters: 15, identityCardsPerPlayer: 2 },
  7: { playerCount: 7, requiredCharacters: 17, identityCardsPerPlayer: 2 },
  8: { playerCount: 8, requiredCharacters: 19, identityCardsPerPlayer: 2 },
  9: { playerCount: 9, requiredCharacters: 20, identityCardsPerPlayer: 2 },
};

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 9;

export function getGameConfig(playerCount: number): GameConfig | undefined {
  return PLAYER_CONFIG[playerCount];
}

export function getTotalIdentityCardsNeeded(playerCount: number): number {
  const config = PLAYER_CONFIG[playerCount];
  if (!config) return 0;
  return config.playerCount * config.identityCardsPerPlayer;
}
