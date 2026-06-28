function ForestColumn({ side }: { side: 'left' | 'right' }) {
  // Several tree rows with slight color/size variety for a natural look
  const trees = [
    { x: 8, h: 80, w: 26, tone: 14 },
    { x: 22, h: 120, w: 38, tone: 16 },
    { x: 36, h: 70, w: 22, tone: 12 },
    { x: 50, h: 135, w: 42, tone: 17 },
    { x: 64, h: 90, w: 30, tone: 13 },
    { x: 78, h: 110, w: 34, tone: 15 },
    { x: 90, h: 75, w: 24, tone: 12 },
  ];

  const tree = (t: typeof trees[0], i: number) => (
    <g key={i} transform={`translate(${t.x - t.w / 2}, ${300 - t.h})`}>
      <rect x={t.w / 2 - 3} y={t.h - 16} width="6" height="16" fill="hsl(150 30% 8%)" />
      <polygon points={`${t.w / 2},0 ${t.w},${t.h * 0.4} 0,${t.h * 0.4}`} fill={`hsl(150 32% ${t.tone - 3}%)`} />
      <polygon points={`${t.w / 2},${t.h * 0.18} ${t.w * 1.1},${t.h * 0.62} ${-t.w * 0.1},${t.h * 0.62}`} fill={`hsl(150 34% ${t.tone}%)`} />
      <polygon points={`${t.w / 2},${t.h * 0.4} ${t.w * 1.15},${t.h * 0.9} ${-t.w * 0.15},${t.h * 0.9}`} fill={`hsl(150 36% ${t.tone + 2}%)`} />
    </g>
  );

  return (
    <svg
      className="side-decor-svg"
      viewBox="0 0 100 600"
      preserveAspectRatio="xMidYMax slice"
      style={{ transform: side === 'right' ? 'scaleX(-1)' : undefined }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Distant haze gradient for depth */}
        <linearGradient id={`haze-${side}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(155 25% 16%)" stopOpacity="0" />
          <stop offset="100%" stopColor="hsl(155 25% 18%)" stopOpacity="0.35" />
        </linearGradient>

        <pattern id={`forest-${side}`} x="0" y="0" width="100" height="340" patternUnits="userSpaceOnUse">
          {/* far mountains — light, hazy */}
          <path d="M-20,300 L20,160 L60,300Z" fill="hsl(150 22% 13% / 0.45)" />
          <path d="M20,300 L65,130 L115,300Z" fill="hsl(150 24% 11% / 0.5)" />
          {/* mid mountains — darker */}
          <path d="M-10,300 L35,190 L80,300Z" fill="hsl(150 26% 10% / 0.65)" />
          <path d="M50,300 L90,170 L130,300Z" fill="hsl(150 27% 9% / 0.7)" />
          {/* atmospheric haze band */}
          <rect x="0" y="120" width="100" height="180" fill={`url(#haze-${side})`} />
          {/* foreground trees */}
          {trees.map(tree)}
        </pattern>
      </defs>
      <rect width="100" height="600" fill={`url(#forest-${side})`} />
    </svg>
  );
}

export default function SideDecor() {
  const leftSymbols = [
    { char: '△', y: 9, size: 28, dur: 5 }, { char: '✦', y: 22, size: 16, dur: 3.5 },
    { char: '👁', y: 37, size: 32, dur: 6 }, { char: '⟡', y: 53, size: 22, dur: 4 },
    { char: '☽', y: 67, size: 26, dur: 5.5 },
  ];
  const rightSymbols = [
    { char: '✦', y: 12, size: 18, dur: 4 }, { char: '◬', y: 27, size: 28, dur: 5 },
    { char: '★', y: 41, size: 20, dur: 3.8 }, { char: '👁', y: 57, size: 30, dur: 6.2 },
    { char: '✶', y: 71, size: 16, dur: 4.5 },
  ];

  return (
    <>
      {/* LEFT */}
      <div className="side-decor side-decor--left" aria-hidden="true">
        <ForestColumn side="left" />
        <div className="side-decor-symbols">
          {leftSymbols.map((s, i) => (
            <span
              key={i}
              className="side-decor-symbol"
              style={{ top: `${s.y}%`, fontSize: s.size, animationDuration: `${s.dur}s`, animationDelay: `${i * 0.7}s` }}
            >
              {s.char}
            </span>
          ))}
        </div>
        <div className="side-decor-vignette side-decor-vignette--left" />
      </div>

      {/* RIGHT */}
      <div className="side-decor side-decor--right" aria-hidden="true">
        <ForestColumn side="right" />
        <div className="side-decor-symbols">
          {rightSymbols.map((s, i) => (
            <span
              key={i}
              className="side-decor-symbol"
              style={{ top: `${s.y}%`, fontSize: s.size, animationDuration: `${s.dur}s`, animationDelay: `${i * 0.9}s` }}
            >
              {s.char}
            </span>
          ))}
        </div>
        <div className="side-decor-vignette side-decor-vignette--right" />
      </div>
    </>
  );
}
