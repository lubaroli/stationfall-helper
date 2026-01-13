import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Stationfall Helper
        </h1>
        <p className="text-indigo-200 mb-8 text-lg">
          Set up your Stationfall game with secret role distribution.
          Select characters, assign players, and share unique links.
        </p>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-3">How it works:</h2>
          <ol className="text-left text-indigo-100 space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-indigo-400 font-bold">1.</span>
              Select player count and enter names
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-400 font-bold">2.</span>
              Choose which characters to include
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-400 font-bold">3.</span>
              Share unique links with each player
            </li>
            <li className="flex gap-2">
              <span className="text-indigo-400 font-bold">4.</span>
              Players view their secret identity cards
            </li>
          </ol>
        </div>

        <Button
          size="lg"
          onClick={() => navigate('/setup')}
          className="w-full"
        >
          Create New Game
        </Button>
      </div>
    </div>
  );
}
