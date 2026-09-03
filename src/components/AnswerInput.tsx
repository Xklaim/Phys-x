import React from 'react';
import type { Chamber } from '../types/chamber';
import './AnswerInput.css';

interface Props {
  chamber: Chamber;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export function AnswerInput({ chamber, value, onChange, onSubmit, disabled }: Props) {
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  if (chamber.inputType === 'multiple_choice' && chamber.answer.kind === 'multiple_choice') {
    const { options } = chamber.answer;
    return (
      <fieldset className="mc-fieldset" disabled={disabled}>
        <legend className="mc-legend mono text-dim">// SELECT YOUR ANSWER</legend>
        <div className="mc-options" role="radiogroup">
          {options.map(opt => (
            <label
              key={opt.key}
              className={`mc-option ${value === opt.key ? 'mc-option--selected' : ''}`}
              htmlFor={`opt-${chamber.id}-${opt.key}`}
            >
              <input
                id={`opt-${chamber.id}-${opt.key}`}
                type="radio"
                name={`mc-${chamber.id}`}
                value={opt.key}
                checked={value === opt.key}
                onChange={() => onChange(opt.key)}
                className="mc-radio"
              />
              <span className="mc-key mono">{opt.key.toUpperCase()}</span>
              <span className="mc-label">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (chamber.inputType === 'expression') {
    return (
      <div className="expr-input-wrap">
        <label htmlFor={`answer-${chamber.id}`} className="expr-label mono text-dim">
          // ENTER EXPRESSION (use *, /, ^, sqrt(), standard math notation)
        </label>
        <input
          id={`answer-${chamber.id}`}
          type="text"
          className="input"
          placeholder="e.g. d / c or sqrt(2 * g * h)"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          disabled={disabled}
          autoComplete="off"
          spellCheck={false}
        />
        <div className="expr-hint text-dim" style={{ fontSize: '0.75rem' }}>
          Use variable names exactly as given. Tip: * for multiply, / for divide, ^ for power.
        </div>
      </div>
    );
  }

  // Default: numeric
  return (
    <div className="numeric-input-wrap">
      <label htmlFor={`answer-${chamber.id}`} className="numeric-label mono text-dim">
        // ENTER YOUR ANSWER
      </label>
      <input
        id={`answer-${chamber.id}`}
        type="text"
        inputMode="decimal"
        className="input"
        placeholder="e.g. 42 or 3.14e-9"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKey}
        disabled={disabled}
        autoComplete="off"
        spellCheck={false}
      />
      <div className="numeric-hint text-dim" style={{ fontSize: '0.75rem' }}>
        You can include units (e.g. "42 m/s") or just the number. Scientific notation accepted (e.g. 3.5e-10).
      </div>
    </div>
  );
}
