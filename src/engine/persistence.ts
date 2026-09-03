import type { GameState } from '../types/gameState';
import { ACT_UNLOCK_THRESHOLDS } from '../types/gameState';

const STORAGE_KEY = 'continuum_v1';
const CURRENT_VERSION = 1;

export function defaultGameState(): GameState {
  return {
    version: CURRENT_VERSION,
    playerName: '',
    phase: 'opening',
    currentChamberId: null,
    pendingInterstitialActId: 'act1',
    overallProgress: 0,
    unlockedActIds: ['act1'],
    solvedChambers: {},
    activeHintIndex: {},
  };
}

export function saveState(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable — silent fail
  }
}

export function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    if (parsed.version !== CURRENT_VERSION) return null; // version mismatch → fresh start
    return parsed;
  } catch {
    return null;
  }
}

export function resetState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silent fail
  }
}

export { ACT_UNLOCK_THRESHOLDS };
