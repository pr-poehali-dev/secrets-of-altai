export default function AltaiBg() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #1a2a4a 0%, #2d4a6e 25%, #3d6b5e 55%, #4a7c4e 100%)',
        }}
      />

      {/* Stars */}
      {[
        [8, 6], [15, 4], [22, 9], [31, 3], [38, 7], [47, 2], [55, 8],
        [63, 5], [72, 3], [80, 7], [89, 4], [94, 10], [12, 14], [27, 11],
        [44, 13], [58, 16], [75, 12], [85, 15], [5, 18], [35, 19],
      ].map(([x, y], i) => (
        <circle
          key={i}
          style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            borderRadius: '50%',
            background: 'white',
            animation: `star-twinkle ${2 + (i % 3)}s ease-in-out ${(i * 0.3) % 2}s infinite alternate`,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Moon */}
      <div
        className="absolute"
        style={{
          top: '8%',
          right: '12%',
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #f0e8c0, #d4c080)',
          boxShadow: '0 0 30px 10px rgba(220,190,80,0.25)',
          animation: 'moon-glow 5s ease-in-out infinite alternate',
        }}
      />
      {/* Moon crater */}
      <div
        className="absolute"
        style={{
          top: 'calc(8% + 12px)',
          right: 'calc(12% + 8px)',
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.12)',
        }}
      />

      {/* SVG scene */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Far mountains — bg */}
        <path
          d="M0 560 L120 340 L200 420 L320 260 L440 380 L540 280 L660 360 L760 220 L880 350 L980 270 L1100 380 L1200 300 L1320 400 L1440 310 L1440 900 L0 900 Z"
          fill="#2a4a5a"
          opacity="0.7"
        />
        {/* Snow caps far */}
        <polygon points="760,220 800,270 720,270" fill="white" opacity="0.85" />
        <polygon points="320,260 355,305 285,305" fill="white" opacity="0.8" />
        <polygon points="1100,300 1132,345 1068,345" fill="white" opacity="0.75" />

        {/* Mid mountains */}
        <path
          d="M0 640 L80 480 L160 540 L280 380 L400 490 L500 400 L620 500 L700 360 L820 470 L920 390 L1040 500 L1140 420 L1260 520 L1360 440 L1440 510 L1440 900 L0 900 Z"
          fill="#2e5c3a"
        />
        {/* Snow caps mid */}
        <polygon points="700,360 736,408 664,408" fill="white" opacity="0.9" />
        <polygon points="280,380 310,420 250,420" fill="white" opacity="0.85" />
        <polygon points="920,390 950,430 890,430" fill="white" opacity="0.8" />

        {/* Fog layer */}
        <path
          d="M0 600 Q180 560 360 590 Q540 620 720 580 Q900 540 1080 570 Q1260 600 1440 560 L1440 680 Q1260 650 1080 670 Q900 690 720 660 Q540 630 360 660 Q180 690 0 670 Z"
          fill="white"
          opacity="0.08"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 30,0; 0,0"
            dur="14s"
            repeatCount="indefinite"
          />
        </path>

        {/* Lake — shimmering */}
        <ellipse cx="720" cy="780" rx="280" ry="55" fill="#2a6090" opacity="0.85" />
        <ellipse cx="720" cy="780" rx="280" ry="55" fill="none" stroke="#5ab0e0" strokeWidth="1.5" opacity="0.4" />
        {/* Lake reflection shimmer */}
        {[660, 700, 740, 780, 720].map((x, i) => (
          <line
            key={i}
            x1={x} y1={770} x2={x + 20} y2={770}
            stroke="white" strokeWidth="1" opacity="0.3"
          >
            <animate
              attributeName="opacity"
              values="0.1;0.5;0.1"
              dur={`${2 + i * 0.4}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}

        {/* Foreground ground */}
        <path
          d="M0 800 Q360 760 720 820 Q1080 880 1440 800 L1440 900 L0 900 Z"
          fill="#1e3d28"
        />

        {/* === PINE TREES (right cluster) === */}
        {[
          [1100, 650, 1.0],
          [1140, 660, 0.9],
          [1170, 640, 1.1],
          [1210, 655, 0.85],
          [1240, 645, 1.0],
          [1280, 660, 0.95],
          [1310, 635, 1.05],
          [1350, 650, 0.9],
          [1380, 640, 1.0],
          [1410, 660, 0.85],
          [1440, 645, 1.0],
        ].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
            <rect x="-4" y="50" width="8" height="20" fill="#3d2b1f" />
            <polygon points="0,-60 -22,0 22,0" fill="#1e4a2a" />
            <polygon points="0,-40 -25,10 25,10" fill="#245c30" />
            <polygon points="0,-15 -28,25 28,25" fill="#2a6e36" />
            <animate
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values={`0 0 50; ${i % 2 === 0 ? 1.5 : -1.5} 0 50; 0 0 50`}
              dur={`${5 + (i % 4)}s`}
              repeatCount="indefinite"
            />
          </g>
        ))}

        {/* === PINE TREES (left cluster) === */}
        {[
          [0, 660, 1.0],
          [30, 645, 0.9],
          [60, 660, 1.1],
          [95, 640, 0.85],
          [130, 655, 1.0],
          [165, 640, 0.95],
          [200, 660, 1.05],
          [235, 645, 0.9],
          [270, 640, 1.0],
          [310, 655, 0.85],
        ].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
            <rect x="-4" y="50" width="8" height="20" fill="#3d2b1f" />
            <polygon points="0,-60 -22,0 22,0" fill="#1e4a2a" />
            <polygon points="0,-40 -25,10 25,10" fill="#245c30" />
            <polygon points="0,-15 -28,25 28,25" fill="#2a6e36" />
            <animate
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values={`0 0 50; ${i % 2 === 0 ? -1.5 : 1.5} 0 50; 0 0 50`}
              dur={`${4.5 + (i % 3)}s`}
              repeatCount="indefinite"
            />
          </g>
        ))}

        {/* === Tall pines center-left === */}
        {[400, 450, 490].map((x, i) => (
          <g key={i} transform={`translate(${x},680)`}>
            <rect x="-5" y="60" width="10" height="25" fill="#3d2b1f" />
            <polygon points="0,-80 -28,0 28,0" fill="#1a3e25" />
            <polygon points="0,-55 -32,15 32,15" fill="#1e4a2a" />
            <polygon points="0,-25 -36,35 36,35" fill="#245c30" />
          </g>
        ))}

        {/* Magical glow over lake */}
        <ellipse cx="720" cy="760" rx="180" ry="30" fill="#60a0e0" opacity="0.12">
          <animate attributeName="opacity" values="0.07;0.18;0.07" dur="4s" repeatCount="indefinite" />
        </ellipse>

        {/* Eye symbols — Gravity Falls cryptic */}
        <g opacity="0.35">
          <ellipse cx="200" cy="200" rx="18" ry="11" fill="none" stroke="#c8a030" strokeWidth="2" />
          <circle cx="200" cy="200" r="5" fill="#c8a030" />
          <line x1="192" y1="193" x2="188" y2="188" stroke="#c8a030" strokeWidth="1.5" />
          <line x1="208" y1="193" x2="212" y2="188" stroke="#c8a030" strokeWidth="1.5" />
          <line x1="192" y1="207" x2="188" y2="212" stroke="#c8a030" strokeWidth="1.5" />
          <line x1="208" y1="207" x2="212" y2="212" stroke="#c8a030" strokeWidth="1.5" />
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="6s" repeatCount="indefinite" />
        </g>
        <g opacity="0.3">
          <ellipse cx="1250" cy="250" rx="14" ry="8" fill="none" stroke="#c8a030" strokeWidth="1.5" />
          <circle cx="1250" cy="250" r="4" fill="#c8a030" />
          <animate attributeName="opacity" values="0.15;0.45;0.15" dur="7s" repeatCount="indefinite" />
        </g>

        {/* Stars sparkle overlay */}
        {[
          [550, 150], [680, 100], [850, 170], [1000, 120],
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="#f0e0a0" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="opacity" values="0;0.8;0" dur={`${2 + i}s`} repeatCount="indefinite" />
            </line>
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke="#f0e0a0" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="opacity" values="0;0.8;0" dur={`${2 + i}s`} repeatCount="indefinite" />
            </line>
          </g>
        ))}

        {/* Fireflies */}
        {[
          [600, 720], [650, 700], [750, 730], [820, 710], [500, 740],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#c8e860" opacity="0">
            <animate attributeName="opacity" values="0;0.8;0" dur={`${1.5 + i * 0.5}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" />
            <animateMotion
              path={`M0,0 Q${10 - i * 3},${-8 + i * 2} ${20 - i * 2},0 Q${10},${8} 0,0`}
              dur={`${4 + i}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Inline styles for star twinkle and moon */}
      <style>{`
        @keyframes star-twinkle {
          0% { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes moon-glow {
          0% { box-shadow: 0 0 20px 6px rgba(220,190,80,0.2); }
          100% { box-shadow: 0 0 40px 18px rgba(220,190,80,0.4); }
        }
      `}</style>
    </div>
  );
}
