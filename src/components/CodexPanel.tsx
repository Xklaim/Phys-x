import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ACTS } from '../content/acts';
import { chambersByAct } from '../content/chambers/index';
import { StarRating } from './StarRating';
import './CodexPanel.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CodexPanel({ open, onClose }: Props) {
  const { state } = useGame();
  const [searchQuery, setSearchQuery] = useState('');

  const solvedCount = Object.values(state.solvedChambers).filter(s => s.solved).length;
  const totalChambers = Object.values(chambersByAct).flat().length;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="codex-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <aside
        className={`codex-panel ${open ? 'codex-panel--open' : ''}`}
        aria-label="Codex / Logbook"
        role="complementary"
      >
        <div className="codex-header">
          <div>
            <h3 className="codex-title">📚 CODEX</h3>
            <div className="codex-subtitle mono text-dim">
              {solvedCount} / {totalChambers} chambers solved
            </div>
          </div>
          <button
            id="close-codex-btn"
            className="btn btn--ghost btn--sm"
            onClick={onClose}
            aria-label="Close Codex"
          >
            ✕
          </button>
        </div>

        <input
          type="search"
          className="input codex-search"
          placeholder="Search field notes..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          aria-label="Search codex entries"
        />

        <div className="codex-content">
          {ACTS.map(act => {
            const actChambers = (chambersByAct[act.id] ?? []).sort((a, b) => a.order - b.order);
            const solvedInAct = actChambers.filter(c => state.solvedChambers[c.id]?.solved);
            const filteredSolved = solvedInAct.filter(c => {
              if (!searchQuery) return true;
              const q = searchQuery.toLowerCase();
              return (
                c.title.toLowerCase().includes(q) ||
                c.fieldNote.toLowerCase().includes(q)
              );
            });

            if (filteredSolved.length === 0) return null;

            return (
              <div key={act.id} className="codex-act-section">
                <div className="codex-act-header" style={{ color: act.color }}>
                  <span className="codex-act-title">{act.title}</span>
                  <span className="mono text-dim" style={{ fontSize: '0.75rem' }}>
                    {solvedInAct.length}/{actChambers.length}
                  </span>
                </div>

                {filteredSolved.map(chamber => {
                  const stat = state.solvedChambers[chamber.id];
                  return (
                    <div key={chamber.id} className="codex-entry">
                      <div className="codex-entry-header">
                        <div className="codex-entry-title-row">
                          <span className={`badge badge--${chamber.difficulty}`}>
                            {chamber.difficulty}
                          </span>
                          <span className="codex-entry-title">{chamber.title}</span>
                        </div>
                        {stat && <StarRating stars={stat.stars} size="sm" />}
                      </div>
                      <p className="codex-entry-note text-secondary">{chamber.fieldNote}</p>
                      {chamber.callbackRef && (
                        <div className="codex-callback mono text-dim">
                          ↩ References: {chamber.callbackRef}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {solvedCount === 0 && (
            <div className="codex-empty text-secondary">
              <p>No entries yet. Solve chambers to unlock field notes here.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
