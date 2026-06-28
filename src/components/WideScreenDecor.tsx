export default function WideScreenDecor() {
  const trees = [
    { x: 10, h: 80, w: 18 }, { x: 28, h: 110, w: 22 }, { x: 48, h: 70, w: 16 },
    { x: 64, h: 95, w: 20 }, { x: 80, h: 60, w: 14 }, { x: 92, h: 85, w: 18 },
    { x: 4, h: 55, w: 13 }, { x: 38, h: 100, w: 21 }, { x: 72, h: 75, w: 17 },
  ];

  const mountains = [
    'M0,180 L40,80 L80,180Z',
    'M30,180 L80,50 L130,180Z',
    'M70,180 L110,100 L150,180Z',
    'M100,180 L140,70 L180,180Z',
  ];

  const symbols = [
    { char: '△', y: 8 }, { char: '✦', y: 19 }, { char: '👁', y: 30 },
    { char: '⟡', y: 42 }, { char: '☽', y: 54 }, { char: '★', y: 65 },
    { char: '△', y: 76 }, { char: '✦', y: 87 },
  ];

  const constellations = [
    { x1: 20, y1: 10, x2: 60, y2: 25 }, { x1: 60, y1: 25, x2: 40, y2: 45 },
    { x1: 40, y1: 45, x2: 75, y2: 60 }, { x1: 75, y1: 60, x2: 30, y2: 75 },
    { x1: 30, y1: 75, x2: 65, y2: 88 },
  ];

  const dots = [
    { cx: 20, cy: 10 }, { cx: 60, cy: 25 }, { cx: 40, cy: 45 },
    { cx: 75, cy: 60 }, { cx: 30, cy: 75 }, { cx: 65, cy: 88 },
    { cx: 15, cy: 35 }, { cx: 80, cy: 40 }, { cx: 50, cy: 55 },
    { cx: 25, cy: 68 }, { cx: 70, cy: 15 }, { cx: 45, cy: 80 },
  ];

  return (
    <>
      {/* LEFT — forest silhouettes */}
      <div className="wide-decor wide-decor--left" aria-hidden="true">
        {/* Vignette */}
        <div className="wide-decor-vignette wide-decor-vignette--left" />

        {/* Tree silhouettes — SVG pattern repeating vertically */}
        <svg
          className="wide-decor-svg"
          viewBox="0 0 160 600"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="trees" x="0" y="0" width="160" height="200" patternUnits="userSpaceOnUse">
              {trees.map((t, i) => (
                <g key={i} transform={`translate(${t.x - t.w / 2}, ${200 - t.h})`}>
                  {/* trunk */}
                  <rect x={t.w / 2 - 2} y={t.h - 14} width="4" height="14" fill="hsl(150 30% 12% / 0.55)" />
                  {/* crown layers */}
                  <polygon points={`${t.w / 2},0 ${t.w},${t.h * 0.45} 0,${t.h * 0.45}`} fill="hsl(150 35% 14% / 0.5)" />
                  <polygon points={`${t.w / 2},${t.h * 0.22} ${t.w * 1.1},${t.h * 0.65} ${-t.w * 0.1},${t.h * 0.65}`} fill="hsl(150 38% 16% / 0.6)" />
                  <polygon points={`${t.w / 2},${t.h * 0.44} ${t.w * 1.15},${t.h * 0.88} ${-t.w * 0.15},${t.h * 0.88}`} fill="hsl(150 40% 18% / 0.65)" />
                </g>
              ))}
              {/* mountain silhouette at bottom */}
              {mountains.map((d, i) => (
                <path key={i} d={d} fill={`hsl(150 30% ${10 + i * 2}% / 0.4)`} transform="translate(0, 20)" />
              ))}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#trees)" />
        </svg>
      </div>

      {/* RIGHT — mystic symbols & constellations */}
      <div className="wide-decor wide-decor--right" aria-hidden="true">
        {/* Vignette */}
        <div className="wide-decor-vignette wide-decor-vignette--right" />

        {/* Symbols */}
        <div className="wide-decor-symbols">
          {symbols.map((s, i) => (
            <span
              key={i}
              className="wide-decor-symbol"
              style={{ top: `${s.y}%`, opacity: 0.12 + (i % 3) * 0.06 }}
            >
              {s.char}
            </span>
          ))}
        </div>

        {/* Constellation lines */}
        <svg
          className="wide-decor-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {constellations.map((l, i) => (
            <line
              key={i}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="hsl(40 70% 60% / 0.18)"
              strokeWidth="0.4"
            />
          ))}
          {dots.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r="0.8" fill="hsl(40 80% 70% / 0.35)" />
          ))}
        </svg>
      </div>
    </>
  );
}
