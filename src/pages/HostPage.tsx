import { useParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { decodeGameState, encodePlayerData } from '@/services/gameService';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function HostPage() {
  const { data } = useParams<{ data: string }>();
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const game = useMemo(() => {
    if (!data) return null;
    return decodeGameState(data);
  }, [data]);

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            Invalid Game Link
          </h1>
          <p className="text-gray-600 mb-6">
            This game link appears to be invalid or corrupted.
          </p>
          <Button onClick={() => navigate('/')}>Create New Game</Button>
        </Card>
      </div>
    );
  }

  const baseUrl = window.location.origin + import.meta.env.BASE_URL;

  const getPlayerLink = (playerIndex: number): string => {
    const player = game.players[playerIndex];
    const encoded = encodePlayerData(player);
    return `${baseUrl}play/${encoded}`;
  };

  const copyLink = async (index: number) => {
    const link = getPlayerLink(index);
    try {
      await navigator.clipboard.writeText(link);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = link;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const shareWhatsApp = (index: number) => {
    const player = game.players[index];
    const link = getPlayerLink(index);
    const message = encodeURIComponent(
      `${player.name}, here's your secret identity for Stationfall!\n\n${link}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const copyAllLinks = async () => {
    const allLinks = game.players
      .map((player, i) => `${player.name}:\n${getPlayerLink(i)}`)
      .join('\n\n');
    try {
      await navigator.clipboard.writeText(allLinks);
      alert('All links copied to clipboard!');
    } catch {
      alert('Failed to copy. Please copy links individually.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Game Created!
        </h1>
        <p className="text-gray-600 mb-8">
          Share these unique links with each player. Each link reveals only that
          player's identity cards.
        </p>

        {/* Game Summary */}
        <Card className="p-4 mb-6">
          <h2 className="font-semibold text-gray-900 mb-2">Game Summary</h2>
          <p className="text-sm text-gray-600">
            {game.playerCount} players | {game.characters.length} characters
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {game.characters.map((char) => (
              <span
                key={char.id}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
              >
                {char.name}
              </span>
            ))}
          </div>
        </Card>

        {/* Player Links */}
        <div className="space-y-3 mb-6">
          {game.players.map((player, index) => (
            <Card key={player.token} className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900">{player.name}</h3>
                  <p className="text-xs text-gray-500 truncate">
                    {player.identityCards.length} identity card
                    {player.identityCards.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant={copiedIndex === index ? 'secondary' : 'outline'}
                    onClick={() => copyLink(index)}
                  >
                    {copiedIndex === index ? 'Copied!' : 'Copy Link'}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => shareWhatsApp(index)}
                    title="Share via WhatsApp"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={copyAllLinks} className="flex-1">
            Copy All Links
          </Button>
          <Button variant="ghost" onClick={() => navigate('/')}>
            New Game
          </Button>
        </div>
      </div>
    </div>
  );
}
