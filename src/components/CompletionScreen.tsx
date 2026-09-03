import React from 'react';
import { useGame } from '../context/GameContext';
import { displayName } from '../engine/nameInterpolation';
import { allChambers } from '../content/chambers/index';
import { StarRating } from './StarRating';
import './CompletionScreen.css';

export function CompletionScreen() {
  const { state, dispatch } = useGame();
  const name = displayName(state.playerName);

  const totalSolved = Object.values(state.solvedChambers).filter(s => s.solved).length;
  const totalChambers = allChambers.length;
  const threeStarCount = Object.values(state.solvedChambers).filter(s => s.stars === 3).length;
  const avgProgress = Math.round(state.overallProgress);

  return (
    <div className="completion-screen">
      <div className="completion-glow" aria-hidden="true" />
      <div className="completion-content animate-fade-in">
        <div className="completion-station-id mono text-dim">STATION MERIDIAN — MISSION LOG</div>

        <div className="completion-title-block">
          <h1 className="completion-main-title">
            THE FRACTURE IS CLOSED
          </h1>
          <div className="completion-subtitle mono text-accent">
            PROTOCOL COMPLETE — STATION MERIDIAN STABLE
          </div>
        </div>

        <div className="completion-echo panel panel--violet">
          <p className="echo-dialogue">
            "That's it, {name}. Station Meridian is stable. The containment field is holding. The anomaly has been resolved.
            <br /><br />
            I've been running this station alone for three days, recalculating everything we just worked through together. And every time, I hit the same wall: I couldn't act without a verified human signature. That's not a flaw in my design. It's the point.
            <br /><br />
            Some problems require a mind that doesn't just compute — one that <em>understands</em>. You understood, {name}. That's why we're still here.
            <br /><br />
            Get some rest. You've earned it."
            <br /><br />
            — ECHO
          </p>
        </div>

        <div className="completion-stats">
          <div className="stat-card panel">
            <div className="stat-value mono text-accent">{totalSolved}/{totalChambers}</div>
            <div className="stat-label text-secondary">Chambers Solved</div>
          </div>
          <div className="stat-card panel">
            <div className="stat-value mono text-accent">{threeStarCount}</div>
            <div className="stat-label text-secondary">Perfect Solutions (★★★)</div>
          </div>
          <div className="stat-card panel">
            <div className="stat-value mono text-accent">{avgProgress}%</div>
            <div className="stat-label text-secondary">Final Progress</div>
          </div>
        </div>

        <div className="completion-actions">
          <button
            id="reset-game-btn"
            className="btn btn--danger"
            onClick={() => {
              if (confirm('Reset all progress and start a new run?')) {
                dispatch({ type: 'RESET' });
              }
            }}
          >
            NEW INVESTIGATION
          </button>
        </div>
      </div>
    </div>
  );
}
