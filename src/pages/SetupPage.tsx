import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ComplexityTier } from '@/types';
import { CHARACTERS } from '@/data/characters';
import { PLAYER_CONFIG, MIN_PLAYERS, MAX_PLAYERS } from '@/data/gameRules';
import {
  createGame,
  encodeGameState,
  validateSelection,
  calculateTotalIdentityCards,
} from '@/services/gameService';
import { shuffleArray } from '@/utils/shuffle';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CharacterCard } from '@/components/CharacterCard';

type TierFilter = ComplexityTier | 'all';

const ALL_TIERS: ComplexityTier[] = ['beginner', 'middle', 'high', 'experienced'];

const TIER_LABELS: Record<ComplexityTier, string> = {
  beginner: 'Beginner',
  middle: 'Middle',
  high: 'High',
  experienced: 'Experienced',
};

export function SetupPage() {
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(
    Array(9).fill('').map((_, i) => `Player ${i + 1}`)
  );
  const [selectedCharacters, setSelectedCharacters] = useState<Set<string>>(
    new Set()
  );
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  
  // Tiers to include in random selection
  const [randomTiers, setRandomTiers] = useState<Set<ComplexityTier>>(
    new Set(['beginner'])
  );

  const config = PLAYER_CONFIG[playerCount];
  const requiredCharacters = config?.requiredCharacters || 12;
  const cardsPerPlayer = config?.identityCardsPerPlayer || 2;
  const totalIdentityCardsNeeded = playerCount * cardsPerPlayer;

  const selectedCharacterObjects = useMemo(() => {
    return CHARACTERS.filter((c) => selectedCharacters.has(c.id));
  }, [selectedCharacters]);

  const totalIdentityCards = useMemo(() => {
    return calculateTotalIdentityCards(selectedCharacterObjects);
  }, [selectedCharacterObjects]);

  const validation = useMemo(() => {
    return validateSelection(playerCount, selectedCharacterObjects);
  }, [playerCount, selectedCharacterObjects]);

  const filteredCharacters = useMemo(() => {
    if (tierFilter === 'all') return CHARACTERS;
    return CHARACTERS.filter((c) => c.tier === tierFilter);
  }, [tierFilter]);

  // Count available characters per tier for random selection
  const availablePerTier = useMemo(() => {
    const counts: Record<ComplexityTier, number> = {
      beginner: 0,
      middle: 0,
      high: 0,
      experienced: 0,
    };
    const identityCards: Record<ComplexityTier, number> = {
      beginner: 0,
      middle: 0,
      high: 0,
      experienced: 0,
    };
    CHARACTERS.forEach((c) => {
      counts[c.tier]++;
      identityCards[c.tier] += c.identityCardCount;
    });
    return { counts, identityCards };
  }, []);

  const toggleCharacter = (characterId: string) => {
    setSelectedCharacters((prev) => {
      const next = new Set(prev);
      if (next.has(characterId)) {
        next.delete(characterId);
      } else {
        next.add(characterId);
      }
      return next;
    });
  };

  const toggleRandomTier = (tier: ComplexityTier) => {
    setRandomTiers((prev) => {
      const next = new Set(prev);
      if (next.has(tier)) {
        // Don't allow removing the last tier
        if (next.size > 1) {
          next.delete(tier);
        }
      } else {
        next.add(tier);
      }
      return next;
    });
  };

  const handleRandomSelect = () => {
    // Get characters from selected tiers
    const pool = CHARACTERS.filter((c) => randomTiers.has(c.tier));

    if (pool.length === 0) return;

    // Shuffle and select required number
    const shuffled = shuffleArray(pool);
    const selected = new Set<string>();
    let totalCards = 0;

    for (const char of shuffled) {
      if (
        selected.size >= requiredCharacters &&
        totalCards >= totalIdentityCardsNeeded
      ) {
        break;
      }
      selected.add(char.id);
      totalCards += char.identityCardCount;
    }

    // If we don't have enough, add more from all tiers
    if (selected.size < requiredCharacters || totalCards < totalIdentityCardsNeeded) {
      const remaining = CHARACTERS.filter((c) => !selected.has(c.id));
      const shuffledRemaining = shuffleArray(remaining);
      for (const char of shuffledRemaining) {
        if (
          selected.size >= requiredCharacters &&
          totalCards >= totalIdentityCardsNeeded
        ) {
          break;
        }
        selected.add(char.id);
        totalCards += char.identityCardCount;
      }
    }

    setSelectedCharacters(selected);
  };

  const handleSelectAll = () => {
    setSelectedCharacters(new Set(filteredCharacters.map((c) => c.id)));
  };

  const handleClearAll = () => {
    setSelectedCharacters(new Set());
  };

  const handleCreateGame = () => {
    if (!validation.valid) return;

    const names = playerNames.slice(0, playerCount);
    const game = createGame(playerCount, selectedCharacterObjects, names);
    const encoded = encodeGameState(game);
    navigate(`/game/${encoded}`);
  };

  const updatePlayerName = (index: number, name: string) => {
    setPlayerNames((prev) => {
      const next = [...prev];
      next[index] = name;
      return next;
    });
  };

  // Calculate total available from selected random tiers
  const randomPoolSize = useMemo(() => {
    let chars = 0;
    let cards = 0;
    randomTiers.forEach((tier) => {
      chars += availablePerTier.counts[tier];
      cards += availablePerTier.identityCards[tier];
    });
    return { chars, cards };
  }, [randomTiers, availablePerTier]);

  const canRandomSelect = randomPoolSize.chars >= requiredCharacters && 
    randomPoolSize.cards >= totalIdentityCardsNeeded;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Setup New Game
        </h1>

        {/* Step 1: Player Count */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            1. Number of Players
          </h2>
          <div className="flex flex-wrap gap-2">
            {Array.from(
              { length: MAX_PLAYERS - MIN_PLAYERS + 1 },
              (_, i) => MIN_PLAYERS + i
            ).map((count) => (
              <Button
                key={count}
                variant={playerCount === count ? 'primary' : 'outline'}
                onClick={() => setPlayerCount(count)}
              >
                {count}
              </Button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            {playerCount} players need {requiredCharacters} characters (
            {cardsPerPlayer} identity cards each = {totalIdentityCardsNeeded}{' '}
            total)
          </p>
        </section>

        {/* Step 2: Player Names */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            2. Player Names
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: playerCount }).map((_, i) => (
              <Input
                key={i}
                value={playerNames[i]}
                onChange={(e) => updatePlayerName(i, e.target.value)}
                placeholder={`Player ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Step 3: Character Selection */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              3. Select Characters
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`font-medium ${
                  selectedCharacters.size >= requiredCharacters
                    ? 'text-green-600'
                    : 'text-gray-600'
                }`}
              >
                {selectedCharacters.size}/{requiredCharacters} characters
              </span>
              <span className="text-gray-400">|</span>
              <span
                className={`font-medium ${
                  totalIdentityCards >= totalIdentityCardsNeeded
                    ? 'text-green-600'
                    : 'text-gray-600'
                }`}
              >
                {totalIdentityCards}/{totalIdentityCardsNeeded} identity cards
              </span>
            </div>
          </div>

          {/* Random Selection with Tier Checkboxes */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold text-indigo-900 mb-3">
              Random Selection
            </h3>
            <div className="flex flex-wrap gap-4 mb-3">
              {ALL_TIERS.map((tier) => (
                <label
                  key={tier}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={randomTiers.has(tier)}
                    onChange={() => toggleRandomTier(tier)}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">
                    {TIER_LABELS[tier]}
                    <span className="text-gray-400 ml-1">
                      ({availablePerTier.counts[tier]} chars)
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="primary"
                onClick={handleRandomSelect}
                disabled={!canRandomSelect}
              >
                Randomly Select Characters
              </Button>
              {!canRandomSelect && (
                <span className="text-xs text-amber-700">
                  Not enough characters in selected tiers (need {requiredCharacters} chars, {totalIdentityCardsNeeded} cards)
                </span>
              )}
            </div>
          </div>

          {/* Tier Filter */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-gray-600 mr-2">Filter view:</span>
            {(['all', ...ALL_TIERS] as const).map((tier) => (
              <Button
                key={tier}
                size="sm"
                variant={tierFilter === tier ? 'primary' : 'ghost'}
                onClick={() => setTierFilter(tier)}
              >
                {tier === 'all' ? 'All' : TIER_LABELS[tier as ComplexityTier]}
              </Button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button size="sm" variant="outline" onClick={handleSelectAll}>
              Select All Visible
            </Button>
            <Button size="sm" variant="outline" onClick={handleClearAll}>
              Clear All
            </Button>
          </div>

          {/* Character Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                selected={selectedCharacters.has(character.id)}
                onClick={() => toggleCharacter(character.id)}
              />
            ))}
          </div>
        </section>

        {/* Validation & Submit */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {!validation.valid && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-amber-800 text-sm">{validation.message}</p>
            </div>
          )}

          {/* Show special character warnings */}
          {selectedCharacters.has('doctor') && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 text-sm">
                <strong>Doctor</strong> has 2 identity cards - both cards will be
                dealt (possibly to different players).
              </p>
            </div>
          )}
          {selectedCharacters.has('drones') && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <p className="text-purple-800 text-sm">
                <strong>Drones</strong> has no identity card - it will be an NPC
                only character.
              </p>
            </div>
          )}

          <Button
            size="lg"
            onClick={handleCreateGame}
            disabled={!validation.valid}
            className="w-full"
          >
            Create Game & Generate Links
          </Button>
        </section>
      </div>
    </div>
  );
}
