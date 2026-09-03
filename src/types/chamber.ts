// ─── Answer shapes ────────────────────────────────────────────────────────────

export interface NumericAnswer {
  kind: 'numeric';
  value: number;
  unit?: string;
  tolerancePercent?: number; // default 2
}

export interface ExpressionAnswer {
  kind: 'expression';
  expression: string;           // canonical answer, e.g. "d / c"
  variables: string[];          // free variable names present in the expression
  sampleRanges: Record<string, [number, number]>; // { varName: [min, max] }
  tolerancePercent?: number;    // default 1
}

export interface MultipleChoiceOption {
  key: string;
  label: string;
}

export interface MultipleChoiceAnswer {
  kind: 'multiple_choice';
  correctKey: string;
  options: MultipleChoiceOption[];
}

export type ChamberAnswer = NumericAnswer | ExpressionAnswer | MultipleChoiceAnswer;

// ─── Difficulty ────────────────────────────────────────────────────────────────

export type Difficulty = 'intro' | 'core' | 'advanced';

// ─── Input type ───────────────────────────────────────────────────────────────

export type InputType = 'numeric' | 'expression' | 'multiple_choice';

// ─── Given (displayed data) ───────────────────────────────────────────────────

export interface Given {
  label: string;
  value: string;
}

// ─── Chamber ──────────────────────────────────────────────────────────────────

/**
 * A single self-contained puzzle chamber.
 *
 * ADDING CONTENT: The game engine never hardcodes chamber-specific logic.
 * To add a new chamber, append one Chamber object to the relevant act array.
 * No engine changes required.
 *
 * Text fields support {name} placeholder for the player's chosen name.
 */
export interface Chamber {
  id: string;                   // stable unique id, e.g. "act1-03"
  actId: string;                // e.g. "act1"
  order: number;                // 1-based within the act
  difficulty: Difficulty;
  title: string;
  backstory: string;            // in-world flavor, supports {name}
  givens?: Given[];             // known quantities shown to player
  question: string;
  diagram?: string;             // optional key for a diagram component
  inputType: InputType;
  answer: ChamberAnswer;
  hints: string[];              // ordered, 0-2 entries
  fieldNote: string;            // Codex explanation after solving
  callbackRef?: string;         // id of an earlier chamber this references
  successFlavor: string;        // narrative beat after correct answer, supports {name}
  progressWeight?: number;      // overrides difficulty default if set
}
