# AGENTS.md - Stationfall Helper

This file provides guidance for AI coding agents working on this codebase.

## Project Overview

**Stationfall Helper** is a web application for setting up the board game Stationfall.
The app helps with:
- Sampling characters from a pool based on player count
- Secretly assigning 2 roles to each player
- Creating shareable game sessions
- Allowing players to view only their assigned roles via unique links

**Target deployment:** GitHub Pages (static hosting)

## Tech Stack

- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (or CSS Modules)
- **State Management:** React Context or Zustand (lightweight)
- **Routing:** React Router
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint with TypeScript rules
- **Formatting:** Prettier

## Build/Lint/Test Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run all tests
npm test

# Run a single test file
npm test -- path/to/file.test.ts

# Run tests matching a pattern
npm test -- --grep "pattern"

# Run tests in watch mode
npm test -- --watch

# Linting
npm run lint

# Fix lint issues automatically
npm run lint -- --fix

# Format code with Prettier
npm run format

# Type checking only
npm run typecheck
```

## Project Structure

```
stationfall-helper/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   └── ui/             # Base UI components (Button, Card, etc.)
│   ├── pages/              # Page components (routes)
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React context providers
│   ├── services/           # Business logic and data services
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── data/               # Static game data (characters, rules)
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── tests/                  # Test files (mirrors src/ structure)
├── AGENTS.md               # This file
├── README.md               # Project documentation
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── eslint.config.js
```

## Code Style Guidelines

### Imports

Order imports in the following groups, separated by blank lines:
1. React and external libraries
2. Internal components
3. Hooks and utilities
4. Types
5. Styles/CSS

```typescript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import { CharacterCard } from '@/components/CharacterCard';

import { useGame } from '@/hooks/useGame';
import { generateGameId } from '@/utils/gameId';

import type { Character, Player } from '@/types';

import './GameSetup.css';
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `CharacterCard.tsx` |
| Hooks | camelCase with `use` prefix | `useGameState.ts` |
| Utilities | camelCase | `shuffleArray.ts` |
| Types/Interfaces | PascalCase | `GameSession`, `Player` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_PLAYERS` |
| Variables/Functions | camelCase | `playerCount`, `assignRoles()` |
| CSS classes | kebab-case | `character-card` |
| Files | Match export name | `CharacterCard.tsx` for `CharacterCard` |

### TypeScript

- Use explicit return types for functions
- Prefer `interface` for object shapes, `type` for unions/intersections
- Avoid `any` - use `unknown` when type is truly unknown
- Use strict null checks
- Define types in `src/types/` or co-located with components

```typescript
// Good
interface Player {
  id: string;
  name: string;
  characters: Character[];
}

function getPlayerById(players: Player[], id: string): Player | undefined {
  return players.find(player => player.id === id);
}

// Avoid
function getPlayerById(players: any, id: any): any { ... }
```

### React Components

- Use functional components with hooks
- Prefer named exports for components
- Keep components small and focused
- Extract complex logic into custom hooks

```typescript
interface GameSetupProps {
  playerCount: number;
  onStartGame: (config: GameConfig) => void;
}

export function GameSetup({ playerCount, onStartGame }: GameSetupProps): JSX.Element {
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  
  // Component logic...
  
  return (
    <div className="game-setup">
      {/* JSX */}
    </div>
  );
}
```

### Error Handling

- Use try/catch for async operations
- Provide user-friendly error messages
- Log errors for debugging in development
- Use error boundaries for React component errors

```typescript
try {
  const gameData = await loadGame(gameId);
  setGame(gameData);
} catch (error) {
  console.error('Failed to load game:', error);
  setError('Could not load the game. Please check the link and try again.');
}
```

### Comments

- Write self-documenting code; use comments sparingly
- Use JSDoc for public APIs and complex functions
- TODO comments should include context

```typescript
/**
 * Shuffles an array using Fisher-Yates algorithm.
 * Used for randomizing character selection and role assignment.
 */
function shuffleArray<T>(array: T[]): T[] {
  // Implementation...
}

// TODO(setup): Add validation for minimum player count based on game rules
```

## Game-Specific Patterns

### Game Session Management

Games are identified by unique IDs (UUIDs or short codes).
Player role access uses unique per-player tokens within a game.

```
/game/:gameId              - Game overview (host view)
/game/:gameId/player/:token - Player's secret role view
```

### Data Persistence

Since this is hosted on GitHub Pages (static):
- Use localStorage for temporary game state during setup
- Encode game data in URL parameters or use a simple backend service
- Consider using a lightweight BaaS (Firebase, Supabase) for persistence

### Security Considerations

- Player tokens should be unguessable (use crypto.randomUUID())
- Never expose all player roles in client-side state
- Validate all inputs, especially game IDs and player tokens

## Testing Guidelines

- Write tests for utilities and business logic
- Test React components with React Testing Library
- Focus on user behavior, not implementation details
- Name test files with `.test.ts` or `.test.tsx` suffix

```typescript
// shuffleArray.test.ts
describe('shuffleArray', () => {
  it('should return an array of the same length', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result).toHaveLength(input.length);
  });

  it('should contain all original elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result.sort()).toEqual(input.sort());
  });
});
```

## Common Tasks for Agents

1. **Adding a new character:** Update `src/data/characters.ts`
2. **Adding a new page:** Create component in `src/pages/`, add route in `App.tsx`
3. **Modifying game logic:** Work in `src/services/gameService.ts`
4. **Styling changes:** Use Tailwind utilities or edit component CSS
5. **Type changes:** Update definitions in `src/types/`

## Deployment

```bash
# Build and deploy to GitHub Pages
npm run build
# Output will be in dist/, deploy via GitHub Actions or gh-pages
```
