
import './FeedbackPanel.css';

interface Props {
  state: 'correct' | 'incorrect';
  message: string;
  successFlavor?: string;
  fieldNote?: string;
  onNext: () => void;
  onRetry: () => void;
}

export function FeedbackPanel({ state, message, successFlavor, fieldNote, onNext, onRetry }: Props) {
  if (state === 'correct') {
    return (
      <div className="feedback--correct animate-fade-in" role="status" aria-live="polite">
        <div className="feedback-header">
          <span className="feedback-icon">✓</span>
          <span className="feedback-title">Correct!</span>
        </div>
        {successFlavor && (
          <p className="echo-dialogue feedback-flavor">{successFlavor}</p>
        )}
        {fieldNote && (
          <div className="feedback-field-note">
            <div className="feedback-field-note-label mono text-dim">// CODEX ENTRY UNLOCKED</div>
            <p className="text-secondary">{fieldNote}</p>
          </div>
        )}
        <button
          id="next-chamber-btn"
          className="btn btn--primary"
          onClick={onNext}
          autoFocus
        >
          NEXT CHAMBER →
        </button>
      </div>
    );
  }

  return (
    <div className="feedback--incorrect animate-fade-in" role="alert" aria-live="assertive">
      <div className="feedback-header">
        <span className="feedback-icon">⚠</span>
        <span className="feedback-title">Not quite</span>
      </div>
      <p className="feedback-message">{message}</p>
      <button
        id="retry-btn"
        className="btn btn--secondary btn--sm"
        onClick={onRetry}
        autoFocus
      >
        TRY AGAIN
      </button>
    </div>
  );
}
