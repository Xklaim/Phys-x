import React, { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { ACTS } from '../content/acts';
import { interpolate } from '../engine/nameInterpolation';
import './ActInterstitial.css';

export function ActInterstitial() {
  const { state, dispatch } = useGame();
  const actId = state.pendingInterstitialActId;
  const act = ACTS.find(a => a.id === actId);
  const dismissRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t = setTimeout(() => dismissRef.current?.focus(), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') dismiss();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  if (!act) return null;

  const dismiss = () => dispatch({ type: 'DISMISS_INTERSTITIAL' });
  const text = interpolate(act.interstitial, state.playerName);
  const lines = text.split('\n');

  return (
    <div className="interstitial-overlay" role="dialog" aria-modal="true" aria-label={act.title}>
      <div className="interstitial-bg" aria-hidden="true" style={{ '--act-color': act.color } as React.CSSProperties} />

      <div className="interstitial-content animate-fade-in">
        <div className="interstitial-act-number mono text-dim">
          ACT {act.order.toString().padStart(2, '0')} / 05
        </div>
        <h2 className="interstitial-title" style={{ color: act.color }}>
          {act.title}
        </h2>
        <div className="interstitial-theme mono" style={{ color: act.color, opacity: 0.6 }}>
          {act.theme}
        </div>
        <div className="interstitial-divider" style={{ background: act.color }} aria-hidden="true" />

        <div className="interstitial-text">
          {lines.map((line, i) => (
            <p
              key={i}
              className={
                line.startsWith('ECHO') || line.startsWith('SYSTEM') || line.startsWith('ACT')
                  ? 'interstitial-line--system mono'
                  : line === ''
                  ? 'interstitial-line--spacer'
                  : 'interstitial-line echo-dialogue'
              }
            >
              {line || '\u00A0'}
            </p>
          ))}
        </div>

        <button
          ref={dismissRef}
          id={`dismiss-interstitial-${actId}`}
          className="btn btn--primary btn--lg interstitial-btn"
          onClick={dismiss}
          style={{ '--btn-accent': act.color } as React.CSSProperties}
        >
          BEGIN {act.title.split('—')[0].trim()} →
        </button>
        <div className="interstitial-skip text-dim mono">Press Enter or Space to continue</div>
      </div>
    </div>
  );
}
