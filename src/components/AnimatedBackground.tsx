import React, { useState, useEffect } from 'react';

interface Rune {
  id: number;
  symbol: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  glow: boolean;
}

const RUNE_SYMBOLS = [
  'ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ',
  'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛈ', 'ᛇ', 'ᛉ', 'ᛊ',
  '✦', '✧', '★', '☆', '◆', '◇', '○'
];

/**
 * Full-screen animated rune background that sits behind your app.
 * Optimized for performance with GPU-accelerated CSS animations.
 */
const RuneBackground: React.FC = () => {
  const [runes, setRunes] = useState<Rune[]>([]);

  useEffect(() => {
    const count = 100;
    const generated: Rune[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      symbol: RUNE_SYMBOLS[Math.floor(Math.random() * RUNE_SYMBOLS.length)],
      left: Math.random() * 100,
      size: 1.5 + Math.random() * 1.5,
      duration: 20 + Math.random() * 15,
      delay: -(Math.random() * 35),
      glow: Math.random() > 0.7
    }));
    setRunes(generated);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {runes.map((rune) => (
          <div
            key={rune.id}
            className={`rune ${rune.glow ? 'glow' : ''}`}
            style={{
              left: `${rune.left}%`,
              fontSize: `${rune.size}rem`,
              animationDuration: `${rune.duration}s`,
              animationDelay: `${rune.delay}s`,
            }}
          >
            {rune.symbol}
          </div>
        ))}
      </div>
    </>
  );
};

export default RuneBackground;