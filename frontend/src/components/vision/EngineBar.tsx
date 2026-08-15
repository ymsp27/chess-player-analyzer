import React from 'react';

interface EngineBarProps {
  score: number; // e.g. +0.45 or -2.34
  orientation?: 'white' | 'black';
}

export const EngineBar: React.FC<EngineBarProps> = ({ score, orientation = 'white' }) => {
  // Convert score (-8 to +8 range) to height percentage (0 to 100%) using a smooth sigmoid curve.
  // Maps:
  // - 0.00   -> 50%
  // - +1.00  -> ~65%
  // - +2.00  -> ~78%
  // - +3.00  -> ~88%
  // - +5.00  -> ~96%
  // - -1.00  -> ~35%
  // - -2.00  -> ~22%
  // - -3.00  -> ~12%
  // - -5.00  -> ~4%
  const whitePercentage = Math.round(100 / (1 + Math.exp(-0.5 * score)));

  // Format score based on requirements:
  // - White advantage: +2.35
  // - Black advantage: -2.35
  // - Equal: 0.00
  // - White mate: M5 (or M100)
  // - Black mate: -M3 (or -M100)
  const formatScoreLabel = (val: number): string => {
    if (val === 0) return '0.00';
    const absVal = Math.abs(val);

    // If score indicates forced checkmate
    if (absVal >= 95.0) {
      const moves = Math.round((100.0 - absVal) * 100);
      const movesToShow = moves > 0 ? moves : 1;
      return val > 0 ? `M${movesToShow}` : `-M${movesToShow}`;
    }

    const formatted = absVal.toFixed(2);
    return val > 0 ? `+${formatted}` : `-${formatted}`;
  };

  const scoreText = formatScoreLabel(score);
  const isWhiteWinning = score >= 0;

  // Determine placement and color of the score text inside the bar:
  // - White winning: display text in White area (dark text).
  // - Black winning: display text in Black area (light text).
  let labelStyle = '';
  if (orientation === 'white') {
    if (isWhiteWinning) {
      labelStyle = 'bottom-2 text-[#262626]';
    } else {
      labelStyle = 'top-2 text-white';
    }
  } else {
    // Flipped board: Black at bottom, White at top
    if (isWhiteWinning) {
      labelStyle = 'top-2 text-[#262626]';
    } else {
      labelStyle = 'bottom-2 text-white';
    }
  }

  const isFlipped = orientation === 'black';

  return (
    <div className="flex-shrink-0 w-7 sm:w-8 flex flex-col bg-[#262626] rounded-[3px] overflow-hidden relative shadow-lg select-none border border-slate-700/80">
      {isFlipped ? (
        <>
          {/* Flipped Board: White on top, Black on bottom */}
          <div
            className="w-full bg-[#f2f2f2] transition-all duration-[250ms] ease-in-out border-b border-[#262626]/20"
            style={{ height: `${whitePercentage}%` }}
          />
          <div
            className="w-full bg-[#262626] transition-all duration-[250ms] ease-in-out flex-1"
          />
        </>
      ) : (
        <>
          {/* Standard Board: Black on top, White on bottom */}
          <div
            className="w-full bg-[#262626] transition-all duration-[250ms] ease-in-out border-b border-[#f2f2f2]/20"
            style={{ height: `${100 - whitePercentage}%` }}
          />
          <div
            className="w-full bg-[#f2f2f2] transition-all duration-[250ms] ease-in-out flex-1"
          />
        </>
      )}

      {/* Floating score label text on/over the bar */}
      <div className={`absolute inset-x-0 text-center text-[9px] sm:text-[10px] font-sans font-black tracking-tighter leading-none ${labelStyle}`}>
        {scoreText}
      </div>
    </div>
  );
};

