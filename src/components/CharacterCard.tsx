import type { Character } from '@/types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

interface CharacterCardProps {
  character: Character;
  selected?: boolean;
  onClick?: () => void;
  showDetails?: boolean;
}

export function CharacterCard({
  character,
  selected,
  onClick,
  showDetails = true,
}: CharacterCardProps) {
  const tierLabels = {
    beginner: 'Beginner',
    middle: 'Middle',
    high: 'High',
    experienced: 'Expert',
  };

  const typeLabels: Record<string, string> = {
    human: 'Human',
    robot: 'Robot',
    data: 'Data',
    'human-robot': 'Human/Robot',
  };

  return (
    <Card
      onClick={onClick}
      selected={selected}
      className={`p-3 ${onClick ? 'select-none' : ''}`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
          {character.name}
        </h3>
        {showDetails && (
          <div className="flex flex-wrap gap-1">
            <Badge variant={character.type}>{typeLabels[character.type]}</Badge>
            <Badge variant={character.tier}>{tierLabels[character.tier]}</Badge>
          </div>
        )}
        {character.identityCardCount !== 1 && (
          <p className="text-xs text-gray-500">
            {character.identityCardCount === 0
              ? 'No identity card'
              : `${character.identityCardCount} identity cards`}
          </p>
        )}
      </div>
    </Card>
  );
}
