import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { OpeningScreen } from './components/OpeningScreen';
import { ActInterstitial } from './components/ActInterstitial';
import { TopBar } from './components/TopBar';
import { ChamberView } from './components/ChamberView';
import { CompletionScreen } from './components/CompletionScreen';
import { useGame as useGameInner } from './context/GameContext';
import './index.css';

function GameRouter() {
  const { state, dispatch } = useGame();

  // Reset button always available during play
  if (state.phase === 'opening') {
    return <OpeningScreen />;
  }

  if (state.phase === 'interstitial') {
    return (
      <>
        <TopBar />
        <ActInterstitial />
      </>
    );
  }

  if (state.phase === 'complete') {
    return (
      <>
        <TopBar />
        <CompletionScreen />
      </>
    );
  }

  // Playing
  return (
    <>
      <TopBar />
      <main id="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ChamberView />
      </main>
      {/* Reset button — accessible footer */}
      <div
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1.5rem',
          zIndex: 50,
        }}
      >
        <button
          id="reset-progress-btn"
          className="btn btn--danger btn--sm"
          style={{ opacity: 0.6, fontSize: '0.6875rem' }}
          onClick={() => {
            if (confirm('Reset ALL progress and start over? This cannot be undone.')) {
              dispatch({ type: 'RESET' });
            }
          }}
          title="Reset all progress"
        >
          ⟳ RESET
        </button>
      </div>
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}
