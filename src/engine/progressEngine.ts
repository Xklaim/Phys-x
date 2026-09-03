import type { Chamber } from '../types/chamber';
import {
  DIFFICULTY_DEFAULT_WEIGHT,
  WRONG_ANSWER_PENALTY,
} from '../types/gameState';

// ─── Earned weight after penalties ───────────────────────────────────────────

/**
 * Calculate how much progress % a player earns for solving a chamber,
 * after applying wrong-attempt and hint-use penalties.
 *
 * Base weight comes from chamber.progressWeight, or difficulty default.
 * Penalty: -15% of base per wrong attempt, -10% of base per hint used.
 * Floor: 40% of base.
 */
export function calcEarnedWeight(
  chamber: Chamber,
  wrongAttempts: number,
  hintsUsed: number,
): number {
  const base =
    chamber.progressWeight ??
    DIFFICULTY_DEFAULT_WEIGHT[chamber.difficulty] ??
    3;

  const penalty = 0.15 * wrongAttempts + 0.10 * hintsUsed;
  const multiplier = Math.max(0.4, 1 - penalty);
  return parseFloat((base * multiplier).toFixed(4));
}

/**
 * Fixed progress penalty (%) applied on each wrong attempt.
 * Floored at 0 by the state reducer — never goes negative.
 */
export function calcWrongPenalty(): number {
  return WRONG_ANSWER_PENALTY;
}

/**
 * Compute star rating for a completed chamber.
 * 3 stars: solved on first try with no hints
 * 2 stars: solved with hints OR on 2nd try
 * 1 star:  solved with 3+ wrong attempts
 */
export function calcStars(wrongAttempts: number, hintsUsed: number): 1 | 2 | 3 {
  if (wrongAttempts === 0 && hintsUsed === 0) return 3;
  if (wrongAttempts <= 1 && hintsUsed <= 1) return 2;
  return 1;
}

/**
 * Clamp progress to [0, 100].
 */
export function clampProgress(p: number): number {
  return Math.min(100, Math.max(0, p));
}

/**
 * Check whether all chambers belonging to an act are solved.
 */
export function isActComplete(
  actId: string,
  chambers: Chamber[],
  solvedSet: Record<string, { solved: boolean }>,
): boolean {
  return chambers
    .filter(c => c.actId === actId)
    .every(c => solvedSet[c.id]?.solved === true);
}

/**
 * Determine which acts should now be unlocked given current progress %.
 */
export function computeUnlockedActs(
  progressPercent: number,
  thresholds: Record<string, number>,
): string[] {
  return Object.entries(thresholds)
    .filter(([, threshold]) => progressPercent >= threshold)
    .map(([actId]) => actId);
}
