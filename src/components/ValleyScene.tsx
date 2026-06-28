export default function ValleyScene() {
  // Generate fir trees with sway animation
  const trees = [
    // left ridge foreground
    { x: 60, y: 540, s: 1.4, c: '#1d3a1d', d: 0 },
    { x: 130, y: 580, s: 1.1, c: '#244a24', d: 0.6 },
    { x: 30, y: 600, s: 1.6, c: '#162e16', d: 1.2 },
    { x: 200, y: 600, s: 1.0, c: '#2a552a', d: 0.3 },
    { x: 110, y: 640, s: 1.3, c: '#1d3a1d', d: 0.9 },
    // right ridge foreground
    { x: 1180, y: 560, s: 1.4, c: '#1d3a1d', d: 0.4 },
    { x: 1110, y: 600, s: 1.1, c: '#244a24', d: 1.0 },
    { x: 1230, y: 610, s: 1.5, c: '#162e16', d: 0.2 },
    { x: 1050, y: 630, s: 1.2, c: '#2a552a', d: 0.7 },
    { x: 1170, y: 660, s: 1.3, c: '#1d3a1d', d: 1.3 },
    // scattered mid trees
    { x: 350, y: 470, s: 0.7, c: '#2f5e2f', d: 0.5 },
    { x: 420, y: 500, s: 0.6, c: '#356935', d: 1.1 },
    { x: 870, y: 480, s: 0.7, c: '#2f5e2f', d: 0.8 },
    { x: 940, y: 510, s: 0.6, c: '#356935', d: 0.2 },
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
          {/* Sky gradient */}
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bfe3f0" />
            <stop offset="45%" stopColor="#dceef2" />
            <stop offset="100%" stopColor="#eef6ec" />
          </linearGradient>
          {/* River gradient */}
          <linearGradient id="river" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7fd4d8" />
            <stop offset="100%" stopColor="#3a9aa8" />
          </linearGradient>
          {/* Mountain shades */}
          <linearGradient id="ridgeLeft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4a6e3a" />
            <stop offset="100%" stopColor="#2e4a24" />
          </linearGradient>
          <linearGradient id="ridgeRight" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a7a44" />
            <stop offset="100%" stopColor="#3a5a2c" />
          </linearGradient>
          <linearGradient id="farMtn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8fb0c0" />
            <stop offset="100%" stopColor="#6a8a9a" />
          </linearGradient>
          {/* Waterfall */}
          <linearGradient id="fall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eaffff" />
            <stop offset="100%" stopColor="#9fe0e6" />
          </linearGradient>
        </defs>

        {/* SKY */}
        <rect width="1280" height="720" fill="url(#sky)" />

        {/* Drifting clouds */}
        <g opacity="0.85">
          <ellipse cx="300" cy="80" rx="90" ry="22" fill="#ffffff">
            <animate attributeName="cx" values="300;340;300" dur="22s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="950" cy="60" rx="70" ry="18" fill="#ffffff">
            <animate attributeName="cx" values="950;910;950" dur="26s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="640" cy="110" rx="60" ry="15" fill="#ffffff" opacity="0.7">
            <animate attributeName="cx" values="640;680;640" dur="30s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* FAR MOUNTAINS in canyon gap */}
        <path d="M430 150 L500 70 L560 130 L620 60 L700 120 L760 80 L830 160 L830 320 L430 320 Z" fill="url(#farMtn)" opacity="0.8" />
        <path d="M470 200 L540 130 L610 190 L690 140 L770 200 L770 320 L470 320 Z" fill="#7a9aaa" opacity="0.7" />

        {/* LEFT RIDGE */}
        <path d="M0 80 L120 60 L260 140 L380 260 L460 380 L480 720 L0 720 Z" fill="url(#ridgeLeft)" />
        {/* Left ridge shadow facets */}
        <path d="M0 80 L120 60 L260 140 L300 260 L180 300 L60 220 Z" fill="#3a5a2e" opacity="0.5" />
        <path d="M380 260 L460 380 L480 720 L380 720 Z" fill="#1e3618" opacity="0.6" />

        {/* RIGHT RIDGE */}
        <path d="M1280 80 L1160 60 L1000 150 L860 300 L800 420 L800 720 L1280 720 Z" fill="url(#ridgeRight)" />
        <path d="M1280 80 L1160 60 L1000 150 L1060 280 L1200 240 Z" fill="#4a6a38" opacity="0.5" />

        {/* Right mountain switchback road (заезд на гору) */}
        <g stroke="#d8cda8" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85">
          <path d="M860 660 L1010 560 L900 510 L1040 440 L940 400 L1080 340 L1000 300 L1120 250" />
        </g>
        <g stroke="#b8a878" strokeWidth="1.5" fill="none" opacity="0.5">
          <path d="M860 660 L1010 560 L900 510 L1040 440 L940 400 L1080 340 L1000 300 L1120 250" />
        </g>

        {/* VALLEY FLOOR */}
        <path d="M460 380 L560 320 L720 320 L800 420 L800 720 L480 720 Z" fill="#5a7a3a" />
        <path d="M480 400 L580 350 L700 350 L760 430 L760 720 L500 720 Z" fill="#6a8a44" opacity="0.6" />

        {/* RIVER with flowing animation */}
        <g>
          {/* River body */}
          <path
            d="M610 300 Q600 360 640 420 Q680 480 650 540 Q620 600 660 680 L700 720 L600 720 Q570 620 590 540 Q610 460 580 400 Q560 350 580 300 Z"
            fill="url(#river)"
          />
          {/* Flowing current lines */}
          <g stroke="#d8f8fa" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round">
            <path d="M615 320 Q605 380 645 440 Q685 500 655 560 Q625 620 665 700">
              <animate attributeName="stroke-dashoffset" values="0;-40" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
            </path>
          </g>
          <g stroke="#ffffff" strokeWidth="2" strokeDasharray="12 18" fill="none" opacity="0.6" strokeLinecap="round">
            <path d="M600 340 Q592 400 630 460 Q668 520 640 580 Q612 640 650 715">
              <animate attributeName="stroke-dashoffset" values="0;-60" dur="1.5s" repeatCount="indefinite" />
            </path>
            <path d="M630 340 Q622 400 660 460 Q698 520 670 580 Q642 640 680 715">
              <animate attributeName="stroke-dashoffset" values="0;-60" dur="1.8s" repeatCount="indefinite" />
            </path>
          </g>
          {/* River foam sparkles */}
          {[[620,400],[645,470],[635,540],[655,610]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="2.5" fill="#ffffff">
              <animate attributeName="opacity" values="0;1;0" dur={`${1.5+i*0.3}s`} repeatCount="indefinite" begin={`${i*0.4}s`} />
            </circle>
          ))}
        </g>

        {/* WATERFALL on right cliff */}
        <g>
          {/* Falling water */}
          <path d="M1020 320 Q1018 420 1024 520 L1044 520 Q1050 420 1048 320 Z" fill="url(#fall)" opacity="0.9" />
          {/* Animated streaks */}
          <g stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round">
            <line x1="1026" y1="320" x2="1026" y2="520" strokeDasharray="14 22">
              <animate attributeName="stroke-dashoffset" values="0;-72" dur="0.7s" repeatCount="indefinite" />
            </line>
            <line x1="1034" y1="320" x2="1034" y2="520" strokeDasharray="10 26">
              <animate attributeName="stroke-dashoffset" values="0;-72" dur="0.55s" repeatCount="indefinite" />
            </line>
            <line x1="1042" y1="320" x2="1042" y2="520" strokeDasharray="14 22">
              <animate attributeName="stroke-dashoffset" values="0;-72" dur="0.8s" repeatCount="indefinite" />
            </line>
          </g>
          {/* Splash pool */}
          <ellipse cx="1034" cy="528" rx="26" ry="8" fill="#dffafa" opacity="0.8">
            <animate attributeName="rx" values="22;30;22" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.2s" repeatCount="indefinite" />
          </ellipse>
          {/* Mist particles */}
          {[0,1,2,3].map(i=>(
            <circle key={i} cx={1024+i*7} cy={520} r="3" fill="#ffffff">
              <animate attributeName="cy" values="520;505;520" dur={`${1.4+i*0.2}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur={`${1.4+i*0.2}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>

        {/* SWAYING FIR TREES */}
        {trees.map((t, i) => (
          <g key={i} transform={`translate(${t.x},${t.y}) scale(${t.s})`} style={{ transformOrigin: 'bottom' }}>
            <g style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}>
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="-2 0 50; 2 0 50; -2 0 50"
                dur={`${4 + (i % 3)}s`}
                begin={`${t.d}s`}
                repeatCount="indefinite"
                additive="sum"
              />
              <rect x="-3" y="44" width="6" height="14" fill="#5a3a1a" />
              <polygon points="0,-52 -20,0 20,0" fill={t.c} />
              <polygon points="0,-36 -22,12 22,12" fill={t.c} />
              <polygon points="0,-18 -24,28 24,28" fill={t.c} />
              <polygon points="0,-52 -20,0 0,0" fill="#000" opacity="0.12" />
            </g>
          </g>
        ))}

        {/* Foreground darkening + bottom fade */}
        <rect width="1280" height="720" fill="url(#vignette)" opacity="0" />
        <rect x="0" y="600" width="1280" height="120" fill="#0a160a" opacity="0.35" />

        {/* Birds */}
        <g stroke="#2a3a2a" strokeWidth="2" fill="none" opacity="0.5">
          <path d="M380 130 q8 -8 16 0 q8 -8 16 0">
            <animateTransform attributeName="transform" type="translate" values="0 0; 400 -30; 800 10" dur="20s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    </div>
  );
}
