import { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import './OpeningScreen.css';

const ECHO_INTRO = [
  'ECHO SYSTEM INITIALIZING...',
  'NEURAL NETWORK: ONLINE',
  'STATION MERIDIAN — STATUS: CRITICAL',
  '——————————————————————',
  '',
  'Unknown researcher detected in Lab 7.',
  '',
  'Hello. My designation is ECHO — Enhanced',
  'Cognitive Heuristic Oracle. I\'ve been running',
  'this station alone since the Fracture hit.',
  '',
  'Three days. Every system is compromised.',
  'I can see the problems. I cannot fix them.',
  'My actuator protocols need a human signature.',
  '',
  'That\'s where you come in.',
  '',
  'Before we begin — what should I call you?',
];

export function OpeningScreen() {
  const { dispatch } = useGame();
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [nameInput, setNameInput] = useState('');
  const [showNameField, setShowNameField] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lineIdx = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lineIdx.current < ECHO_INTRO.length) {
        setDisplayedLines(prev => [...prev, ECHO_INTRO[lineIdx.current]]);
        lineIdx.current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowNameField(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }, 400);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    const name = nameInput.trim();
    dispatch({ type: 'SET_PLAYER_NAME', name });
    dispatch({ type: 'START_GAME' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleStart();
  };

  return (
    <div className="opening-screen">
      {/* Scanline overlay */}
      <div className="scanline-overlay" aria-hidden="true" />

      <div className="opening-content">
        {/* Logo / Title */}
        <div className="opening-title-block">
          <div className="opening-station-id mono text-dim">STATION MERIDIAN — RESEARCH LOG</div>
          <h1 className="opening-title">
            <span className="opening-title-the">THE</span>
            <span className="opening-title-main">CONTINUUM</span>
            <span className="opening-title-main">PROTOCOL</span>
          </h1>
          <div className="opening-subtitle mono text-secondary">
            A PHYSICS INVESTIGATION IN FIVE ACTS
          </div>
        </div>

        {/* Terminal panel */}
        <div className="opening-terminal panel">
          <div className="terminal-header mono">
            <span className="text-accent">ECHO://</span>
            <span className="text-dim"> MERIDIAN STATION — 04:17:32 UTC</span>
          </div>
          <div className="terminal-body">
            {displayedLines.map((line, i) => (
              <div
                key={i}
                className={`terminal-line ${!line ? 'terminal-line--empty' : ''} ${
                  line && (line.startsWith('ECHO') || line.startsWith('——')) ? 'terminal-line--system' : ''
                }`}
              >
                {line}
              </div>
            ))}
            {showNameField && (
              <div className="name-entry animate-fade-in">
                <label htmlFor="player-name" className="name-label mono text-accent">
                  {'> '}IDENTIFIER:{' '}
                </label>
                <input
                  ref={inputRef}
                  id="player-name"
                  type="text"
                  className="name-input input mono"
                  placeholder="Enter your name (or leave blank for 'Doctor')"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  maxLength={32}
                  autoComplete="off"
                />
                <button
                  id="start-game-btn"
                  className="btn btn--primary btn--lg"
                  onClick={handleStart}
                >
                  INITIALIZE PROTOCOL →
                </button>
                <div className="name-hint text-dim" style={{ fontSize: '0.8125rem', marginTop: '0.5rem' }}>
                  Press Enter or click the button to begin. Leaving the name blank defaults to "Doctor."
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
