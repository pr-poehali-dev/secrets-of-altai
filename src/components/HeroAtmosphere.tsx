export default function HeroAtmosphere() {
  const fireflies = Array.from({ length: 12 }, (_, i) => ({
    left: `${(i * 37 + 7) % 100}%`,
    bottom: `${(i * 23 + 5) % 55}%`,
    size: 2 + (i % 3),
    dur: 6 + (i % 5) * 1.4,
    delay: (i % 7) * 0.8,
    drift: i % 2 === 0 ? 14 : -12,
  }));

  const stars = Array.from({ length: 4 }, (_, i) => ({
    top: `${8 + i * 8}%`,
    left: `${10 + i * 18}%`,
    dur: 1.2 + i * 0.3,
    delay: 4 + i * 8,
    len: 120 + i * 30,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Shooting stars */}
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute hero-star"
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

      {/* Fireflies */}
      {fireflies.map((f, i) => (
        <span
          key={i}
          className="absolute rounded-full hero-firefly"
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
        @keyframes shootingStar {
          0% { opacity: 0; transform: rotate(-30deg) translateX(0); }
          5% { opacity: 1; }
          30% { opacity: 0; transform: rotate(-30deg) translateX(180px); }
          100% { opacity: 0; transform: rotate(-30deg) translateX(180px); }
        }
        @media (max-width: 767px) {
          .hero-star { display: none; }
          .hero-firefly { display: none; }
        }
      `}</style>
    </div>
  );
}
