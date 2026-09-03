import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ACTS } from '../content/acts';
import { allChambers } from '../content/chambers/index';
import { displayName } from '../engine/nameInterpolation';
import { CodexPanel } from './CodexPanel.tsx';
import './TopBar.css';

export function TopBar() {
  const { state } = useGame();
  const [codexOpen, setCodexOpen] = useState(false);

  const currentAct = ACTS.find(a => {
    const chamber = allChambers.find(c => c.id === state.currentChamberId);
    return chamber?.actId === a.id;
  }) ?? ACTS[0];

  const progress = Math.min(100, Math.max(0, state.overallProgress));
  const name = displayName(state.playerName);

  return (
    <>
      <header className="top-bar" role="banner">
        <div className="top-bar-left">
          <div className="top-bar-logo">
            <span className="top-bar-logo-text">TCP</span>
            <span className="top-bar-logo-divider" aria-hidden="true">|</span>
            <span className="top-bar-title mono">THE CONTINUUM PROTOCOL</span>
          </div>
        </div>

        <div className="top-bar-center">
          <div className="top-bar-act-label text-secondary mono">
            {currentAct.title}
          </div>
          <div className="top-bar-progress" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Overall progress">
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="top-bar-progress-pct mono text-accent">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <div className="top-bar-right">
          <span className="top-bar-name text-secondary mono">
            DR. {name.toUpperCase()}
          </span>
          <button
            id="codex-toggle-btn"
            className="btn btn--ghost btn--sm"
            onClick={() => setCodexOpen(o => !o)}
            aria-expanded={codexOpen}
            aria-label="Toggle Codex / Logbook"
          >
            📚 CODEX
          </button>
        </div>
      </header>

      <CodexPanel open={codexOpen} onClose={() => setCodexOpen(false)} />
    </>
  );
}
