function ForestColumn({ side }: { side: 'left' | 'right' }) {
  // Trees positioned along the bottom, mountains behind
  const trees = [
    { x: 12, h: 90, w: 30 }, { x: 30, h: 130, w: 40 }, { x: 50, h: 80, w: 26 },
    { x: 68, h: 115, w: 36 }, { x: 85, h: 70, w: 24 }, { x: 42, h: 100, w: 32 },
  ];
  const tree = (t: typeof trees[0], i: number) => (
    <g key={i} transform={`translate(${t.x - t.w / 2}, ${260 - t.h})`}>
      <rect x={t.w / 2 - 3} y={t.h - 16} width="6" height="16" fill="hsl(150 30% 9%)" />
      <polygon points={`${t.w / 2},0 ${t.w},${t.h * 0.42} 0,${t.h * 0.42}`} fill="hsl(150 32% 11%)" />
      <polygon points={`${t.w / 2},${t.h * 0.2} ${t.w * 1.1},${t.h * 0.64} ${-t.w * 0.1},${t.h * 0.64}`} fill="hsl(150 35% 13%)" />
      <polygon points={`${t.w / 2},${t.h * 0.42} ${t.w * 1.15},${t.h * 0.9} ${-t.w * 0.15},${t.h * 0.9}`} fill="hsl(150 38% 15%)" />
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
        <pattern id={`forest-${side}`} x="0" y="0" width="100" height="320" patternUnits="userSpaceOnUse">
          {/* mountains */}
          <path d="M-10,260 L25,150 L60,260Z" fill="hsl(150 28% 10% / 0.6)" />
          <path d="M30,260 L70,120 L110,260Z" fill="hsl(150 26% 9% / 0.55)" />
          {/* trees */}
          {trees.map(tree)}
        </pattern>
      </defs>
      <rect width="100" height="600" fill={`url(#forest-${side})`} />
    </svg>
  );
}

export default function SideDecor() {
  const leftSymbols = [
    { char: '△', y: 9, size: 30 }, { char: '✦', y: 22, size: 18 },
    { char: '👁', y: 36, size: 34 }, { char: '⟡', y: 52, size: 24 },
    { char: '☽', y: 68, size: 28 },
  ];
  const rightSymbols = [
    { char: '✦', y: 12, size: 20 }, { char: '◬', y: 26, size: 30 },
    { char: '★', y: 40, size: 22 }, { char: '👁', y: 56, size: 32 },
    { char: '✶', y: 72, size: 18 },
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
              style={{ top: `${s.y}%`, fontSize: s.size, opacity: 0.14 + (i % 3) * 0.05 }}
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
              style={{ top: `${s.y}%`, fontSize: s.size, opacity: 0.14 + (i % 3) * 0.05 }}
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
