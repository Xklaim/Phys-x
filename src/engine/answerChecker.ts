import { parse } from 'mathjs';
import type { MathNode } from 'mathjs';
import type { ChamberAnswer, NumericAnswer, ExpressionAnswer, MultipleChoiceAnswer } from '../types/chamber';

// ─── Result shape ─────────────────────────────────────────────────────────────

export type CheckResult =
  | { correct: true }
  | { correct: false; reason: string };

// ─── Numeric checker ─────────────────────────────────────────────────────────

const UNIT_ALIASES: Record<string, string[]> = {
  'm/s':    ['ms^-1', 'm s^-1', 'meters per second', 'm·s⁻¹'],
  'm/s²':   ['m/s^2', 'ms^-2', 'm s^-2', 'm·s⁻²'],
  'N':      ['kg·m/s²', 'kg m/s^2', 'newtons', 'newton'],
  'J':      ['joules', 'joule', 'kg·m²/s²', 'N·m'],
  'W':      ['watts', 'watt', 'J/s'],
  'Pa':     ['N/m²', 'N/m^2', 'pascals', 'pascal'],
  'K':      ['kelvin'],
  'Hz':     ['s^-1', '1/s', 'hertz'],
  'V':      ['volts', 'volt'],
  'A':      ['amps', 'ampere', 'amperes'],
  'Ω':      ['ohm', 'ohms'],
  'C':      ['coulombs', 'coulomb'],
  'T':      ['tesla', 'teslas'],
  'kg':     ['kilograms', 'kilogram'],
  'm':      ['meters', 'metre', 'metres'],
  's':      ['seconds', 'second'],
  'kg·m/s': ['kg m/s', 'N·s', 'N s'],
  'eV':     ['electron volt', 'electron-volt'],
  'nm':     ['nanometer', 'nanometers', 'nanometre'],
};

function normalizeUnit(raw: string): string {
  const trimmed = raw.trim().toLowerCase();
  for (const [canonical, aliases] of Object.entries(UNIT_ALIASES)) {
    if (canonical.toLowerCase() === trimmed) return canonical;
    if (aliases.some(a => a.toLowerCase() === trimmed)) return canonical;
  }
  return trimmed; // return as-is if not found
}

export function checkNumeric(
  playerInput: string,
  answer: NumericAnswer,
): CheckResult {
  // Player might type "3 m/s" or "3" — split on first space or letter cluster
  const numericPart = playerInput.replace(/[^0-9.\-eE+]/g, ' ').trim().split(/\s+/)[0];
  const parsed = parseFloat(numericPart);

  if (isNaN(parsed)) {
    return { correct: false, reason: 'That doesn\'t look like a number — try entering a numerical value.' };
  }

  const tolerance = (answer.tolerancePercent ?? 2) / 100;
  const expected = answer.value;
  const diff = Math.abs(parsed - expected) / (Math.abs(expected) || 1);

  if (diff > tolerance) {
    if (Math.abs(parsed) > Math.abs(expected) * 2 || Math.abs(parsed) < Math.abs(expected) * 0.1) {
      return {
        correct: false,
        reason: `Not quite — your answer is ${parsed > expected ? 'too high' : 'too low'} by a significant margin. Double-check your formula and given values.`,
      };
    }
    return {
      correct: false,
      reason: `Close, but not within tolerance. Your answer: ${parsed}${answer.unit ? ' ' + answer.unit : ''}. Check your rounding or re-examine the calculation.`,
    };
  }

  // Optional unit check
  if (answer.unit) {
    const unitPart = playerInput.replace(/^[\s\d.\-eE+]+/, '').trim();
    if (unitPart && normalizeUnit(unitPart) !== normalizeUnit(answer.unit)) {
      return {
        correct: false,
        reason: `Your number is right, but check the units — expected ${answer.unit}.`,
      };
    }
  }

  return { correct: true };
}

// ─── Expression checker ───────────────────────────────────────────────────────

const SAMPLE_COUNT = 6;

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function checkExpression(
  playerInput: string,
  answer: ExpressionAnswer,
): CheckResult {
  // Validate that the player input can be parsed
  let playerNode: MathNode;
  let answerNode: MathNode;

  try {
    playerNode = parse(playerInput);
  } catch {
    return { correct: false, reason: 'I couldn\'t parse that expression — check your syntax (use * for multiply, / for divide, ^ for powers).' };
  }

  try {
    answerNode = parse(answer.expression);
  } catch {
    return { correct: false, reason: 'Internal error: answer key unparseable. Report this.' };
  }

  const tolerance = (answer.tolerancePercent ?? 1) / 100;
  let allMatch = true;
  let errorDetail = '';

  for (let i = 0; i < SAMPLE_COUNT; i++) {
    const scope: Record<string, number> = {};
    for (const v of answer.variables) {
      const range = answer.sampleRanges[v];
      scope[v] = range ? randomInRange(range[0], range[1]) : randomInRange(1, 10);
    }

    let playerVal: number;
    let answerVal: number;

    try {
      playerVal = Number(playerNode.evaluate(scope));
      answerVal = Number(answerNode.evaluate(scope));
    } catch {
      return { correct: false, reason: 'Your expression couldn\'t be evaluated — check that you\'re using only the given variables and standard math operators.' };
    }

    if (!isFinite(playerVal) || !isFinite(answerVal)) continue; // skip degenerate sample

    const diff = Math.abs(playerVal - answerVal) / (Math.abs(answerVal) || 1);
    if (diff > tolerance) {
      allMatch = false;
      errorDetail = `At sample values ${JSON.stringify(scope)}: your expression gives ${playerVal.toFixed(4)}, expected ${answerVal.toFixed(4)}.`;
      break;
    }
  }

  if (!allMatch) {
    return {
      correct: false,
      reason: `That expression doesn't give the right result for test values. ${errorDetail} Check your algebra.`,
    };
  }

  return { correct: true };
}

// ─── Multiple choice checker ─────────────────────────────────────────────────

export function checkMultipleChoice(
  selectedKey: string,
  answer: MultipleChoiceAnswer,
): CheckResult {
  if (selectedKey === answer.correctKey) return { correct: true };
  return { correct: false, reason: 'That\'s not the right interpretation — think carefully about the underlying principle, then try again.' };
}

// ─── Unified dispatcher ──────────────────────────────────────────────────────

export function checkAnswer(
  playerInput: string,
  answer: ChamberAnswer,
): CheckResult {
  switch (answer.kind) {
    case 'numeric':
      return checkNumeric(playerInput, answer);
    case 'expression':
      return checkExpression(playerInput, answer);
    case 'multiple_choice':
      return checkMultipleChoice(playerInput, answer);
  }
}
