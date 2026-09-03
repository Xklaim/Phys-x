// ─── Per-chamber stats ────────────────────────────────────────────────────────

export interface ChamberStat {
  chamberId: string;
  solved: boolean;
  attempts: number;         // total wrong attempts before solving
  hintsUsed: number;
  stars: 1 | 2 | 3;        // 3=first try, 2=hints/retry, 1=many attempts
}

// ─── Game state ───────────────────────────────────────────────────────────────

export interface GameState {
  version: number;                           // for future migration
  playerName: string;                        // "" means use "Doctor" default
  phase: 'opening' | 'interstitial' | 'playing' | 'complete';
  currentChamberId: string | null;
  pendingInterstitialActId: string | null;   // which act interstitial to show
  overallProgress: number;                   // 0-100, float
  unlockedActIds: string[];                  // acts the player can access
  solvedChambers: Record<string, ChamberStat>; // keyed by chamber id
  activeHintIndex: Record<string, number>;   // chamberId → how many hints shown
}

// ─── Act unlock thresholds (progress %) for each act ─────────────────────────
// Act I always unlocked; subsequent acts unlock at these cumulative % thresholds.
export const ACT_UNLOCK_THRESHOLDS: Record<string, number> = {
  act1: 0,
  act2: 15,
  act3: 35,
  act4: 55,
  act5: 75,
};

// ─── Default weight by difficulty ────────────────────────────────────────────
export const DIFFICULTY_DEFAULT_WEIGHT: Record<string, number> = {
  intro: 2,
  core: 4,
  advanced: 6,
};

// ─── Progress constants ───────────────────────────────────────────────────────
export const WRONG_ANSWER_PENALTY = 2;        // % deducted on wrong answer
export const HINT_PROGRESS_COST = 1;          // % deducted per hint revealed
