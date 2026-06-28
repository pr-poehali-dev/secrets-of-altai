export default function HeroAtmosphere() {
  const fireflies = Array.from({ length: 24 }, (_, i) => ({
    left: `${(i * 37 + 7) % 100}%`,
    bottom: `${(i * 23 + 5) % 55}%`,
    size: 2 + (i % 3),
    dur: 6 + (i % 5) * 1.4,
    delay: (i % 7) * 0.8,
    drift: i % 2 === 0 ? 14 : -12,
  }));

  const clouds = [
    { top: '8%', w: 260, h: 70, op: 0.18, dur: 90, delay: 0, blur: 18 },
    { top: '14%', w: 340, h: 90, op: 0.14, dur: 120, delay: 20, blur: 22 },
    { top: '5%', w: 200, h: 55, op: 0.12, dur: 100, delay: 45, blur: 16 },
    { top: '20%', w: 290, h: 75, op: 0.1, dur: 110, delay: 10, blur: 20 },
  ];

  const stars = Array.from({ length: 6 }, (_, i) => ({
    top: `${8 + i * 6}%`,
    left: `${10 + i * 13}%`,
    dur: 1.2 + i * 0.3,
    delay: 4 + i * 7,
    len: 120 + i * 30,
  }));

  const blades = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 5.8 + 1) % 100}%`,
    h: 28 + (i % 5) * 10,
    dur: 2.2 + (i % 4) * 0.4,
    delay: (i % 6) * 0.3,
    sway: i % 2 === 0 ? 6 : -5,
  }));

  // Golden floating dust covering the whole hero
  const dust = Array.from({ length: 40 }, (_, i) => ({
    left: `${(i * 17 + 3) % 100}%`,
    top: `${(i * 29 + 7) % 100}%`,
    size: 1 + (i % 3) * 0.8,
    dur: 7 + (i % 6) * 2,
    delay: (i % 9) * 0.9,
    drift: i % 2 === 0 ? 10 : -8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Sky clouds */}
      {clouds.map((c, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: c.top,
            left: '-30%',
            width: c.w,
            height: c.h,
            background: `radial-gradient(ellipse at center, rgba(255,255,255,${c.op}) 0%, rgba(230,238,245,${c.op * 0.5}) 50%, transparent 75%)`,
            filter: `blur(${c.blur}px)`,
            animation: `cloudDrift ${c.dur}s linear ${c.delay}s infinite`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            width: s.len,
            height: 1.5,
            background: 'linear-gradient(to right, transparent, rgba(255,255,220,0.9), transparent)',
            borderRadius: 2,
            transform: 'rotate(-30deg)',
            opacity: 0,
            animation: `shootingStar ${s.dur}s ease-in ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Wind grass blades */}
      <div className="absolute inset-x-0 bottom-0 h-16">
        {blades.map((bl, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: bl.left,
              width: 2,
              height: bl.h,
              background: 'linear-gradient(to top, rgba(80,110,60,0.55), rgba(120,160,80,0.25), transparent)',
              borderRadius: 2,
              transformOrigin: 'bottom center',
              ['--sway' as string]: `${bl.sway}deg`,
              animation: `windSway ${bl.dur}s ease-in-out ${bl.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Golden floating dust */}
      {dust.map((d, i) => (
        <span
          key={`dust-${i}`}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: 'rgba(245, 210, 130, 0.8)',
            boxShadow: '0 0 4px 1px rgba(245,197,66,0.5)',
            ['--ddrift' as string]: `${d.drift}px`,
            animation: `dustFloat ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}

      {/* Fireflies */}
      {fireflies.map((f, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: f.left,
            bottom: f.bottom,
            width: f.size,
            height: f.size,
            background: 'radial-gradient(circle, #fff4b0 0%, #f5c542 60%, transparent 100%)',
            boxShadow: '0 0 8px 2px rgba(245,197,66,0.7)',
            ['--drift' as string]: `${f.drift}px`,
            animation: `fireflyFloat ${f.dur}s ease-in-out ${f.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes fireflyFloat {
          0% { opacity: 0; transform: translate(0, 0) scale(0.6); }
          25% { opacity: 1; }
          50% { transform: translate(var(--drift), -40px) scale(1.1); opacity: 0.9; }
          75% { opacity: 0.7; }
          100% { opacity: 0; transform: translate(0, -80px) scale(0.6); }
        }
        @keyframes cloudDrift {
          0% { transform: translateX(0); opacity: 0; }
          5% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(160vw); opacity: 0; }
        }
        @keyframes shootingStar {
          0% { opacity: 0; transform: rotate(-30deg) translateX(0); }
          5% { opacity: 1; }
          30% { opacity: 0; transform: rotate(-30deg) translateX(180px); }
          100% { opacity: 0; transform: rotate(-30deg) translateX(180px); }
        }
        @keyframes windSway {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(var(--sway)); }
          60% { transform: rotate(calc(var(--sway) * -0.5)); }
        }
        @keyframes dustFloat {
          0% { opacity: 0; transform: translate(0, 0); }
          20% { opacity: 0.7; }
          50% { opacity: 0.9; transform: translate(var(--ddrift), -18px); }
          80% { opacity: 0.6; }
          100% { opacity: 0; transform: translate(0, -36px); }
        }
      `}</style>
    </div>
  );
}