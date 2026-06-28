export default function ValleyScene() {
  // Pine trees that sway in the wind (center-left dense forest)
  const forest = [
    { x: 70, y: 560, s: 1.5, c: '#16301a', d: 0 },
    { x: 140, y: 600, s: 1.2, c: '#1d3d22', d: 0.7 },
    { x: 30, y: 620, s: 1.7, c: '#102612', d: 1.3 },
    { x: 210, y: 610, s: 1.1, c: '#234a28', d: 0.4 },
    { x: 120, y: 660, s: 1.4, c: '#16301a', d: 1.0 },
    { x: 270, y: 640, s: 1.0, c: '#1d3d22', d: 0.2 },
    { x: 190, y: 690, s: 1.3, c: '#102612', d: 1.5 },
    { x: 330, y: 600, s: 0.9, c: '#234a28', d: 0.9 },
    { x: 360, y: 660, s: 1.1, c: '#16301a', d: 0.5 },
    { x: 420, y: 630, s: 0.8, c: '#1d3d22', d: 1.2 },
    // far thin forest line
    { x: 300, y: 470, s: 0.5, c: '#2a4e2e', d: 0.3 },
    { x: 360, y: 480, s: 0.45, c: '#305836', d: 0.8 },
    { x: 420, y: 475, s: 0.5, c: '#2a4e2e', d: 1.1 },
    { x: 480, y: 485, s: 0.45, c: '#305836', d: 0.6 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Twilight sky */}
          <linearGradient id="vsky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3a6e" />
            <stop offset="40%" stopColor="#8a5a8e" />
            <stop offset="70%" stopColor="#e09a6a" />
            <stop offset="100%" stopColor="#f5c98a" />
          </linearGradient>
          {/* Golden glow behind mountains */}
          <radialGradient id="vglow" cx="50%" cy="75%" r="55%">
            <stop offset="0%" stopColor="#ffe6a0" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffcf6a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffcf6a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="vriver" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5fe0d8" />
            <stop offset="100%" stopColor="#2a9aa0" />
          </linearGradient>
          <linearGradient id="vRidgeL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2e4a30" />
            <stop offset="100%" stopColor="#162c18" />
          </linearGradient>
          <linearGradient id="vRidgeR" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6a5a6e" />
            <stop offset="100%" stopColor="#3a2c44" />
          </linearGradient>
          <linearGradient id="vFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9a8ab0" />
            <stop offset="100%" stopColor="#6a6a90" />
          </linearGradient>
          <linearGradient id="vRoad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d6b078" />
            <stop offset="100%" stopColor="#a07840" />
          </linearGradient>
          <filter id="vsoft"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>

        {/* SKY */}
        <rect width="1280" height="720" fill="url(#vsky)" />
        <rect width="1280" height="720" fill="url(#vglow)" />

        {/* Drifting twilight clouds */}
        <g opacity="0.8">
          <ellipse cx="280" cy="90" rx="110" ry="20" fill="#f5b88a">
            <animate attributeName="cx" values="-120;1400" dur="55s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="700" cy="60" rx="80" ry="16" fill="#f5cf9a">
            <animate attributeName="cx" values="-200;1480" dur="70s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1000" cy="120" rx="90" ry="18" fill="#e8a87a" opacity="0.7">
            <animate attributeName="cx" values="-300;1580" dur="62s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* FAR MOUNTAIN RANGES in mist */}
        <path d="M380 230 L470 150 L540 210 L620 130 L710 200 L800 150 L860 230 L860 360 L380 360 Z" fill="url(#vFar)" opacity="0.55" />
        <path d="M420 270 L520 200 L600 260 L690 210 L780 270 L780 360 L420 360 Z" fill="#8a82a8" opacity="0.5" />
        {/* Mist between layers */}
        <rect x="380" y="300" width="480" height="60" fill="#cabbd8" opacity="0.3" filter="url(#vsoft)">
          <animate attributeName="opacity" values="0.2;0.4;0.2" dur="8s" repeatCount="indefinite" />
        </rect>

        {/* RIGHT massive snowy mountain */}
        <path d="M1280 90 L1130 50 L980 160 L860 320 L820 460 L820 720 L1280 720 Z" fill="url(#vRidgeR)" />
        {/* Snow cap */}
        <path d="M1130 50 L1080 120 L1110 130 L1150 95 L1190 140 L1220 110 L1170 70 Z" fill="#f4f0ff" opacity="0.95" />
        <path d="M1130 50 L1100 95 L1130 105 L1160 80 Z" fill="#d8d0ee" opacity="0.7" />
        {/* Rock facets */}
        <path d="M980 160 L860 320 L920 340 L1020 220 Z" fill="#4a3a52" opacity="0.5" />

        {/* Hidden Bill Cipher symbol carved on rock (right) */}
        <g opacity="0.35" transform="translate(1090,430)">
          <polygon points="0,-22 -20,16 20,16" fill="none" stroke="#f5c542" strokeWidth="2" />
          <circle cx="0" cy="2" r="5" fill="none" stroke="#f5c542" strokeWidth="1.5" />
          <circle cx="0" cy="2" r="1.5" fill="#f5c542" />
          <line x1="-10" y1="-4" x2="-4" y2="-2" stroke="#f5c542" strokeWidth="1" />
          <line x1="10" y1="-4" x2="4" y2="-2" stroke="#f5c542" strokeWidth="1" />
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="6s" repeatCount="indefinite" />
        </g>

        {/* LEFT ridge with forest */}
        <path d="M0 100 L130 70 L280 160 L400 300 L470 440 L490 720 L0 720 Z" fill="url(#vRidgeL)" />
        <path d="M0 100 L130 70 L280 160 L300 280 L160 320 L40 230 Z" fill="#1e3a22" opacity="0.5" />

        {/* VALLEY floor */}
        <path d="M470 440 L580 360 L740 360 L820 460 L820 720 L490 720 Z" fill="#3a5a2e" />
        <path d="M500 470 L600 400 L720 400 L770 480 L770 720 L520 720 Z" fill="#4a6e38" opacity="0.6" />

        {/* WINDING ROAD up the right slope */}
        <g>
          <path
            d="M780 700 Q900 640 1000 600 Q920 560 1010 520 Q940 480 1050 440 Q980 400 1080 360 Q1020 330 1110 290"
            fill="none" stroke="url(#vRoad)" strokeWidth="14" strokeLinecap="round"
          />
          <path
            d="M780 700 Q900 640 1000 600 Q920 560 1010 520 Q940 480 1050 440 Q980 400 1080 360 Q1020 330 1110 290"
            fill="none" stroke="#c8a868" strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round" opacity="0.6"
          />
          {/* Road dust particles */}
          {[[850,660],[960,590],[1000,510],[1060,430]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="3" fill="#e8d8b0">
              <animate attributeName="cy" values={`${y};${y-20}`} dur={`${2+i*0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur={`${2+i*0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* RIVER turquoise with rapids */}
        <g>
          <path d="M620 360 Q605 430 645 500 Q690 570 655 640 Q635 690 670 720 L590 720 Q560 650 585 580 Q615 510 580 450 Q565 405 590 360 Z" fill="url(#vriver)" />
          {/* Moving current streaks */}
          <g stroke="#eafffe" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.75">
            <path d="M615 380 Q600 450 640 520 Q685 590 650 660 Q632 695 660 720" strokeDasharray="16 20">
              <animate attributeName="stroke-dashoffset" values="0;-72" dur="1.1s" repeatCount="indefinite" />
            </path>
            <path d="M598 380 Q585 450 622 520 Q662 590 632 660" strokeDasharray="10 24">
              <animate attributeName="stroke-dashoffset" values="0;-68" dur="1.4s" repeatCount="indefinite" />
            </path>
            <path d="M635 380 Q622 450 660 520 Q700 590 668 660" strokeDasharray="12 22">
              <animate attributeName="stroke-dashoffset" values="0;-68" dur="0.9s" repeatCount="indefinite" />
            </path>
          </g>
          {/* White rapids foam */}
          {[[615,420],[645,490],[632,560],[660,630],[640,680]].map(([x,y],i)=>(
            <ellipse key={i} cx={x} cy={y} rx="6" ry="3" fill="#ffffff">
              <animate attributeName="opacity" values="0;0.9;0" dur={`${1.2+i*0.25}s`} repeatCount="indefinite" begin={`${i*0.3}s`} />
              <animate attributeName="rx" values="3;8;3" dur={`${1.2+i*0.25}s`} repeatCount="indefinite" begin={`${i*0.3}s`} />
            </ellipse>
          ))}
        </g>

        {/* SWAYING FOREST */}
        {forest.map((t, i) => (
          <g key={i} transform={`translate(${t.x},${t.y}) scale(${t.s})`}>
            <g>
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="-2.5 0 50; 2.5 0 50; -2.5 0 50"
                dur={`${4 + (i % 4)}s`}
                begin={`${t.d}s`}
                repeatCount="indefinite"
              />
              <rect x="-3" y="42" width="6" height="16" fill="#3a2410" />
              <polygon points="0,-54 -20,2 20,2" fill={t.c} />
              <polygon points="0,-36 -23,14 23,14" fill={t.c} />
              <polygon points="0,-16 -26,30 26,30" fill={t.c} />
              <polygon points="0,-54 -20,2 0,2" fill="#000" opacity="0.15" />
            </g>
          </g>
        ))}

        {/* WIND streaks left to right */}
        <g stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4">
          {[180, 320, 450].map((y, i) => (
            <path key={i} d={`M-60 ${y} q40 -12 80 0 q40 12 80 0`}>
              <animateTransform attributeName="transform" type="translate" values="0 0; 1500 0" dur={`${7 + i * 2}s`} begin={`${i * 2.5}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.5;0" dur={`${7 + i * 2}s`} begin={`${i * 2.5}s`} repeatCount="indefinite" />
            </path>
          ))}
        </g>

        {/* GLOWING FIREFLIES near river */}
        {[[560,560],[700,600],[600,640],[680,520],[640,680],[720,560],[580,500]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="2.5" fill="#fff0a0">
            <animate attributeName="cy" values={`${y};${y-40};${y}`} dur={`${5+i}s`} repeatCount="indefinite" begin={`${i*0.6}s`} />
            <animate attributeName="opacity" values="0;1;0" dur={`${3+i*0.4}s`} repeatCount="indefinite" begin={`${i*0.5}s`} />
            <animate attributeName="r" values="1.5;3;1.5" dur={`${3+i*0.4}s`} repeatCount="indefinite" begin={`${i*0.5}s`} />
          </circle>
        ))}

        {/* Bottom fade for text readability */}
        <rect x="0" y="560" width="1280" height="160" fill="#0a160a" opacity="0.4" />
      </svg>
    </div>
  );
}
