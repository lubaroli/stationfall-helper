import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { decodePlayerData } from '@/services/gameService';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { IdentityCard as IdentityCardType, Ability, AbilityType } from '@/types';

// Color styles for each ability type matching the reference document
const ABILITY_STYLES: Record<AbilityType, { bg: string; border: string; text: string; label: string }> = {
  console: {
    bg: 'bg-amber-100',
    border: 'border-amber-500',
    text: 'text-amber-900',
    label: 'Console',
  },
  conspirator: {
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    text: 'text-purple-900',
    label: 'Conspirator',
  },
  offensive: {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-900',
    label: 'Offensive',
  },
  defensive: {
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-900',
    label: 'Defensive',
  },
  mobility: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-400',
    text: 'text-yellow-900',
    label: 'Mobility',
  },
  utility: {
    bg: 'bg-pink-50',
    border: 'border-pink-300',
    text: 'text-pink-900',
    label: 'Utility',
  },
};

function AbilityBox({ ability, isRevealPower = false }: { ability: Ability; isRevealPower?: boolean }) {
  const style = ABILITY_STYLES[ability.type];

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-3`}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <h5 className={`font-semibold ${style.text}`}>
          {isRevealPower && <span className="text-xs mr-1">REVEAL:</span>}
          {ability.name}
        </h5>
        <span className={`text-xs px-1.5 py-0.5 rounded ${style.bg} ${style.text} border ${style.border} whitespace-nowrap`}>
          {style.label}
        </span>
      </div>
      <p className={`text-sm ${style.text} opacity-90`}>{ability.description}</p>
    </div>
  );
}

function IdentityCardDisplay({ character }: { character: IdentityCardType }) {
  const typeLabels: Record<string, string> = {
    human: 'Human',
    robot: 'Robot',
    data: 'Data',
    'human-robot': 'Human/Robot',
  };

  const tierLabels: Record<string, string> = {
    beginner: 'Beginner',
    middle: 'Middle',
    high: 'High',
    experienced: 'Expert',
  };

  const bcTypeLabels: Record<string, { label: string; color: string }> = {
    friend: { label: 'Friend', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' },
    grudge: { label: 'Grudge', color: 'text-rose-700 bg-rose-50 border-rose-300' },
    none: { label: 'N/A', color: 'text-gray-500 bg-gray-50 border-gray-300' },
  };

  return (
    <Card className="p-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{character.name}</h3>
        <div className="flex justify-center gap-2 mb-2">
          <Badge variant={character.type} size="md">
            {typeLabels[character.type]}
          </Badge>
          <Badge variant={character.tier} size="md">
            {tierLabels[character.tier]}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">
          Starting: {character.startingSection} | Influence Limit: {character.influenceLimit}
        </p>
      </div>

      {/* Abilities */}
      {character.abilities.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Abilities
          </h4>
          <div className="space-y-2">
            {character.abilities.map((ability: Ability, idx: number) => (
              <AbilityBox key={idx} ability={ability} />
            ))}
          </div>
        </div>
      )}

      {/* Reveal Powers */}
      {character.revealPowers.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Reveal Powers
          </h4>
          <div className="space-y-2">
            {character.revealPowers.map((power: Ability, idx: number) => (
              <AbilityBox key={idx} ability={power} isRevealPower />
            ))}
          </div>
        </div>
      )}

      {/* Agenda - Primary scoring section */}
      {character.agenda && (
        <div className="bg-indigo-50 border border-indigo-300 rounded-lg p-3 mb-4">
          <h4 className="text-xs font-semibold text-indigo-800 uppercase tracking-wide mb-2">
            Agenda: {character.agenda.name}
          </h4>
          <ul className="space-y-0">
            {character.agenda.items.map((item, idx: number) => (
              <li 
                key={idx} 
                className={`text-sm flex gap-2 py-1 ${item.isBonus ? 'text-indigo-600' : 'text-indigo-900'}`}
              >
                {item.isBonus ? (
                  // Bonus items with rotated L indicator
                  <>
                    <span className="flex-shrink-0 text-indigo-400 font-mono text-xs leading-5 select-none">
                      &nbsp;&nbsp;└─
                    </span>
                    <span className="font-semibold flex-shrink-0 min-w-[70px] text-indigo-500">
                      {item.points}
                    </span>
                    <span>{item.condition}</span>
                  </>
                ) : (
                  // Primary items
                  <>
                    <span className="font-semibold flex-shrink-0 min-w-[70px] text-indigo-700">
                      {item.points}
                    </span>
                    <span>{item.condition}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
          {character.agenda.note && (
            <p className="text-xs text-indigo-600 mt-2 italic border-t border-indigo-200 pt-2">
              Note: {character.agenda.note}
            </p>
          )}
        </div>
      )}

      {/* Bonus Character Rule */}
      {character.bonusCharacterRule && character.bonusCharacterRule.type !== 'none' && (
        <div className={`border rounded-lg p-3 mb-4 ${bcTypeLabels[character.bonusCharacterRule.type].color}`}>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-xs font-semibold uppercase tracking-wide">
              Bonus Character Rule
            </h4>
            <span className={`text-xs px-1.5 py-0.5 rounded border ${bcTypeLabels[character.bonusCharacterRule.type].color}`}>
              {bcTypeLabels[character.bonusCharacterRule.type].label}
            </span>
          </div>
          <p className="text-sm">
            <span className="font-semibold">{character.bonusCharacterRule.points}</span>
            {' '}{character.bonusCharacterRule.condition}
          </p>
        </div>
      )}

      {/* Special case for characters with no BC rule (like Drones) */}
      {character.bonusCharacterRule && character.bonusCharacterRule.type === 'none' && (
        <div className={`border rounded-lg p-3 mb-4 ${bcTypeLabels.none.color}`}>
          <h4 className="text-xs font-semibold uppercase tracking-wide mb-1">
            Bonus Character Rule
          </h4>
          <p className="text-sm">{character.bonusCharacterRule.condition}</p>
        </div>
      )}

      {/* Scoring Summary - kept as quick reference */}
      <div className="bg-slate-100 border border-slate-300 rounded-lg p-3">
        <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
          Quick Reference
        </h4>
        <ul className="space-y-1">
          {character.scoringSummary.map((score: string, idx: number) => (
            <li key={idx} className="text-sm text-slate-700 flex gap-2">
              <span className="text-slate-400 flex-shrink-0">-</span>
              <span>{score}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

export function PlayerPage() {
  const { data } = useParams<{ data: string }>();
  const navigate = useNavigate();

  const playerData = useMemo(() => {
    if (!data) return null;
    return decodePlayerData(data);
  }, [data]);

  if (!playerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            Invalid Player Link
          </h1>
          <p className="text-gray-600 mb-6">
            This link appears to be invalid or corrupted. Please ask the host for
            a new link.
          </p>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  const { playerName, identityCards } = playerData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Hello, {playerName}!
          </h1>
          <p className="text-indigo-200">
            Here are your identity cards for this game.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-6">
          <p className="text-indigo-100 text-sm text-center">
            Choose <strong>one</strong> card as your{' '}
            <span className="text-yellow-300">Secret Identity</span>.
            {identityCards.length > 1 && (
              <>
                {' '}
                The other{identityCards.length > 2 ? 's become your' : ' becomes your'}{' '}
                <span className="text-cyan-300">Bonus Character{identityCards.length > 2 ? 's' : ''}</span>.
              </>
            )}
          </p>
        </div>

        {/* Ability Type Legend */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-3 mb-6">
          <p className="text-xs text-indigo-200 text-center mb-2">Ability Types:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(ABILITY_STYLES).map(([type, style]) => (
              <span
                key={type}
                className={`text-xs px-2 py-1 rounded ${style.bg} ${style.text} border ${style.border}`}
              >
                {style.label}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <h2 className="text-lg font-semibold text-white text-center">
            Your Identity Cards ({identityCards.length})
          </h2>
          {identityCards.map((card, index) => (
            <IdentityCardDisplay key={`${card.id}-${index}`} character={card} />
          ))}
        </div>

        <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-4 text-center">
          <p className="text-amber-200 text-sm">
            Keep your identity secret until you choose to reveal!
          </p>
        </div>
      </div>
    </div>
  );
}
