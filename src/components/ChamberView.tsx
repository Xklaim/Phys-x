import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { checkAnswer } from '../engine/answerChecker';
import { interpolate } from '../engine/nameInterpolation';
import { ACTS } from '../content/acts';
import { allChambers } from '../content/chambers/index';
import { AnswerInput } from './AnswerInput.tsx';
import { FeedbackPanel } from './FeedbackPanel.tsx';
import { StarRating } from './StarRating.tsx';
import './ChamberView.css';

export function ChamberView() {
  const { state, dispatch, currentChamber, hintsShownCount } = useGame();
  const [inputValue, setInputValue] = useState('');
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [successFlavor, setSuccessFlavor] = useState('');

  if (!currentChamber) return null;

  const chamber = currentChamber;
  const act = ACTS.find(a => a.id === chamber.actId)!;
  const stat = state.solvedChambers[chamber.id];
  const isAlreadySolved = stat?.solved === true;

  // Progress through chambers
  const actChambers = allChambers.filter(c => c.actId === chamber.actId).sort((a, b) => a.order - b.order);
  const chamberIndex = actChambers.findIndex(c => c.id === chamber.id);
  const totalInAct = actChambers.length;

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    const result = checkAnswer(inputValue.trim(), chamber.answer);

    if (result.correct) {
      dispatch({ type: 'CORRECT_ANSWER', chamberId: chamber.id });
      setFeedbackState('correct');
      setSuccessFlavor(interpolate(chamber.successFlavor, state.playerName));
      setFeedbackMessage('');
    } else {
      dispatch({ type: 'WRONG_ANSWER', chamberId: chamber.id });
      setFeedbackState('incorrect');
      setFeedbackMessage(!result.correct ? result.reason : '');
    }
  };

  const handleHint = () => {
    if (hintsShownCount < chamber.hints.length) {
      dispatch({ type: 'USE_HINT', chamberId: chamber.id });
    }
  };

  const handleNext = () => {
    setInputValue('');
    setFeedbackState('idle');
    setFeedbackMessage('');
    setSuccessFlavor('');
    dispatch({ type: 'NEXT_CHAMBER' });
  };

  const handleRetry = () => {
    setFeedbackState('idle');
    setFeedbackMessage('');
    setInputValue('');
  };

  const canShowMoreHints = hintsShownCount < chamber.hints.length;

  return (
    <div className="chamber-view">
      {/* Chamber header */}
      <div className="chamber-header">
        <div className="chamber-meta">
          <span className={`badge badge--${chamber.difficulty}`}>{chamber.difficulty}</span>
          <span className="chamber-progress-label mono text-dim">
            {chamberIndex + 1} / {totalInAct}
          </span>
          {isAlreadySolved && stat && (
            <StarRating stars={stat.stars} size="sm" />
          )}
        </div>
        <h2 className="chamber-title">{chamber.title}</h2>
        <div className="chamber-act-label mono" style={{ color: act.color }}>
          {act.title}
        </div>
      </div>

      {/* Callback notice */}
      {chamber.callbackRef && (
        <div className="callback-notice panel animate-fade-in">
          <span className="mono text-accent">↩ CALLBACK:</span>
          <span className="text-secondary"> This chamber references an earlier problem. Check your Codex for context.</span>
        </div>
      )}

      {/* Backstory */}
      <div className="chamber-backstory panel">
        <p className="echo-dialogue">
          {interpolate(chamber.backstory, state.playerName)}
        </p>
      </div>

      {/* Givens */}
      {chamber.givens && chamber.givens.length > 0 && (
        <div className="chamber-givens panel">
          <div className="givens-title mono text-accent">// GIVEN DATA</div>
          <table className="givens-table" aria-label="Given values">
            <tbody>
              {chamber.givens.map((g, i) => (
                <tr key={i} className="givens-row">
                  <td className="givens-label">{g.label}</td>
                  <td className="givens-value mono">{g.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Question */}
      <div className="chamber-question">
        <div className="question-prefix mono text-dim">{'> QUESTION:'}</div>
        <p className="question-text">{chamber.question}</p>
      </div>

      {/* Answer input + controls */}
      {!isAlreadySolved && feedbackState !== 'correct' && (
        <div className="chamber-answer-section">
          <AnswerInput
            chamber={chamber}
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSubmit}
            disabled={feedbackState !== 'idle'}
          />
          <div className="answer-controls">
            <button
              id={`submit-${chamber.id}`}
              className="btn btn--primary"
              onClick={handleSubmit}
              disabled={!inputValue.trim()}
            >
              SUBMIT ANSWER →
            </button>
            <button
              id={`hint-${chamber.id}`}
              className="btn btn--ghost btn--sm"
              onClick={handleHint}
              disabled={!canShowMoreHints}
              title={canShowMoreHints ? 'Reveal next hint (costs 1% progress)' : 'No more hints available'}
            >
              💡 HINT {hintsShownCount > 0 ? `(${hintsShownCount}/${chamber.hints.length})` : `(${chamber.hints.length} available)`}
            </button>
          </div>
        </div>
      )}

      {/* Hints shown */}
      {hintsShownCount > 0 && (
        <div className="hints-panel animate-fade-in">
          <div className="hints-label mono text-dim">// HINTS REVEALED</div>
          {chamber.hints.slice(0, hintsShownCount).map((hint, i) => (
            <div key={i} className="hint-item">
              <span className="hint-index mono text-accent">{i + 1}.</span>
              <span className="text-secondary">{hint}</span>
            </div>
          ))}
        </div>
      )}

      {/* Feedback */}
      {feedbackState !== 'idle' && (
        <FeedbackPanel
          state={feedbackState}
          message={feedbackMessage}
          successFlavor={successFlavor}
          fieldNote={feedbackState === 'correct' ? chamber.fieldNote : undefined}
          onNext={handleNext}
          onRetry={handleRetry}
        />
      )}

      {/* Already solved state */}
      {isAlreadySolved && stat && feedbackState === 'idle' && (
        <div className="already-solved panel panel--glow animate-fade-in">
          <div className="already-solved-header">
            <StarRating stars={stat.stars} size="lg" />
            <span className="text-accent font-bold">Chamber Solved</span>
          </div>
          <p className="text-secondary" style={{ fontSize: '0.875rem' }}>{chamber.fieldNote}</p>
          <button id={`next-solved-${chamber.id}`} className="btn btn--primary" onClick={handleNext}>
            NEXT CHAMBER →
          </button>
        </div>
      )}
    </div>
  );
}
