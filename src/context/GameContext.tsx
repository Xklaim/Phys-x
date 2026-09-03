import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { GameState, ChamberStat } from '../types/gameState';
import { ACT_UNLOCK_THRESHOLDS } from '../types/gameState';
import { saveState, loadState, resetState, defaultGameState } from '../engine/persistence';
import { calcEarnedWeight, calcWrongPenalty, calcStars, clampProgress, computeUnlockedActs } from '../engine/progressEngine';
import { allChambers, chambersByAct } from '../content/chambers/index';
import type { Chamber } from '../types/chamber';

// ─── Action types ─────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_PLAYER_NAME'; name: string }
  | { type: 'START_GAME' }
  | { type: 'DISMISS_INTERSTITIAL' }
  | { type: 'CORRECT_ANSWER'; chamberId: string }
  | { type: 'WRONG_ANSWER'; chamberId: string }
  | { type: 'USE_HINT'; chamberId: string }
  | { type: 'NEXT_CHAMBER' }
  | { type: 'RESET' };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.name };

    case 'START_GAME':
      return { ...state, phase: 'interstitial', pendingInterstitialActId: 'act1' };

    case 'DISMISS_INTERSTITIAL': {
      // Find first unsolved chamber in the pending act
      const actId = state.pendingInterstitialActId;
      if (!actId) return { ...state, phase: 'playing' };
      const actChambers = chambersByAct[actId] ?? [];
      const firstUnsolved = actChambers.find(c => !state.solvedChambers[c.id]?.solved);
      const firstChamber = firstUnsolved ?? actChambers[0];
      return {
        ...state,
        phase: 'playing',
        currentChamberId: firstChamber?.id ?? null,
        pendingInterstitialActId: null,
      };
    }

    case 'CORRECT_ANSWER': {
      const chamber = allChambers.find(c => c.id === action.chamberId);
      if (!chamber) return state;

      const existing = state.solvedChambers[action.chamberId];
      if (existing?.solved) return state; // already solved, no double-credit

      const wrongAttempts = existing?.attempts ?? 0;
      const hintsUsed = state.activeHintIndex[action.chamberId] ?? 0;
      const earned = calcEarnedWeight(chamber, wrongAttempts, hintsUsed);
      const stars = calcStars(wrongAttempts, hintsUsed);

      const newProgress = clampProgress(state.overallProgress + earned);
      const newUnlocked = computeUnlockedActs(newProgress, ACT_UNLOCK_THRESHOLDS);

      const chamberStat: ChamberStat = {
        chamberId: action.chamberId,
        solved: true,
        attempts: wrongAttempts,
        hintsUsed,
        stars,
      };

      return {
        ...state,
        overallProgress: newProgress,
        unlockedActIds: newUnlocked,
        solvedChambers: { ...state.solvedChambers, [action.chamberId]: chamberStat },
      };
    }

    case 'WRONG_ANSWER': {
      const existing = state.solvedChambers[action.chamberId] ?? {
        chamberId: action.chamberId,
        solved: false,
        attempts: 0,
        hintsUsed: 0,
        stars: 1 as const,
      };
      if (existing.solved) return state;

      const penalty = calcWrongPenalty();
      const newProgress = clampProgress(state.overallProgress - penalty);

      return {
        ...state,
        overallProgress: newProgress,
        solvedChambers: {
          ...state.solvedChambers,
          [action.chamberId]: { ...existing, attempts: existing.attempts + 1 },
        },
      };
    }

    case 'USE_HINT': {
      const currentCount = state.activeHintIndex[action.chamberId] ?? 0;
      const chamber = allChambers.find(c => c.id === action.chamberId);
      if (!chamber || currentCount >= chamber.hints.length) return state;

      return {
        ...state,
        overallProgress: clampProgress(state.overallProgress - 1),
        activeHintIndex: {
          ...state.activeHintIndex,
          [action.chamberId]: currentCount + 1,
        },
      };
    }

    case 'NEXT_CHAMBER': {
      const currentChamber = allChambers.find(c => c.id === state.currentChamberId);
      if (!currentChamber) return state;

      // Find next chamber in same act, or first chamber of next unlocked act
      const actChambers = (chambersByAct[currentChamber.actId] ?? []).sort((a, b) => a.order - b.order);
      const currentIdx = actChambers.findIndex(c => c.id === state.currentChamberId);
      const nextInAct = actChambers[currentIdx + 1];

      if (nextInAct) {
        return { ...state, currentChamberId: nextInAct.id };
      }

      // Current act complete — check for next act
      const actOrder = ['act1', 'act2', 'act3', 'act4', 'act5'];
      const currentActIdx = actOrder.indexOf(currentChamber.actId);
      const nextActId = actOrder[currentActIdx + 1];

      if (nextActId && state.unlockedActIds.includes(nextActId)) {
        return { ...state, phase: 'interstitial', pendingInterstitialActId: nextActId };
      }

      if (nextActId && !state.unlockedActIds.includes(nextActId)) {
        // Act not yet unlocked — go back to first unsolved in current act
        const firstUnsolved = actChambers.find(c => !state.solvedChambers[c.id]?.solved);
        return { ...state, currentChamberId: firstUnsolved?.id ?? actChambers[0]?.id ?? null };
      }

      // No more acts — game complete
      return { ...state, phase: 'complete' };
    }

    case 'RESET':
      resetState();
      return defaultGameState();

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<Action>;
  currentChamber: Chamber | null;
  hintsShownCount: number;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, () => loadState() ?? defaultGameState());

  // Persist on every state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const currentChamber = state.currentChamberId
    ? allChambers.find(c => c.id === state.currentChamberId) ?? null
    : null;

  const hintsShownCount = state.currentChamberId
    ? state.activeHintIndex[state.currentChamberId] ?? 0
    : 0;

  return (
    <GameContext.Provider value={{ state, dispatch, currentChamber, hintsShownCount }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
