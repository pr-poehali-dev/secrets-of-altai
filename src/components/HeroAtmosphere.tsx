export default function HeroAtmosphere() {
  const fireflies = Array.from({ length: 24 }, (_, i) => ({
    left: `${(i * 37 + 7) % 100}%`,
    bottom: `${(i * 23 + 5) % 55}%`,
    size: 2 + (i % 3),
    dur: 6 + (i % 5) * 1.4,
    delay: (i % 7) * 0.8,
    drift: i % 2 === 0 ? 14 : -12,
  }));

  // Soft fog puffs — big blurred blobs that look like rolling clouds
  const puffs = [
    { left: '2%', bottom: '2%', w: 620, h: 280, op: 0.42, dur: 30, delay: 0, blur: 55 },
    { left: '28%', bottom: '-2%', w: 760, h: 320, op: 0.5, dur: 38, delay: 4, blur: 65 },
    { left: '56%', bottom: '0%', w: 700, h: 300, op: 0.44, dur: 34, delay: 2, blur: 60 },
    { left: '14%', bottom: '12%', w: 520, h: 230, op: 0.32, dur: 42, delay: 6, blur: 50 },
    { left: '66%', bottom: '10%', w: 560, h: 240, op: 0.3, dur: 36, delay: 3, blur: 54 },
    { left: '40%', bottom: '22%', w: 460, h: 200, op: 0.24, dur: 46, delay: 8, blur: 48 },
    { left: '80%', bottom: '4%', w: 540, h: 240, op: 0.36, dur: 40, delay: 5, blur: 56 },
    { left: '-4%', bottom: '14%', w: 480, h: 210, op: 0.26, dur: 44, delay: 7, blur: 50 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft fog base near the valley floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5"
        style={{
          background: 'linear-gradient(to top, rgba(220,228,235,0.35), rgba(220,228,235,0.12) 50%, transparent)',
        }}
      />

      {/* Rolling fog puffs */}
      {puffs.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.w,
            height: p.h,
            background: `radial-gradient(ellipse at center, rgba(228,235,240,${p.op}) 0%, rgba(212,222,232,${p.op * 0.55}) 45%, transparent 72%)`,
            filter: `blur(${p.blur}px)`,
            animation: `fogRoll${i % 2} ${p.dur}s ease-in-out ${p.delay}s infinite`,
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
        @keyframes fogRoll0 {
          0%, 100% { transform: translateX(-8%) scale(1); opacity: 0.7; }
          50% { transform: translateX(8%) scale(1.12); opacity: 1; }
        }
        @keyframes fogRoll1 {
          0%, 100% { transform: translateX(7%) scale(1.08); opacity: 0.8; }
          50% { transform: translateX(-7%) scale(1); opacity: 1; }
        }
        @keyframes fireflyFloat {
          0% { opacity: 0; transform: translate(0, 0) scale(0.6); }
          25% { opacity: 1; }
          50% { transform: translate(var(--drift), -40px) scale(1.1); opacity: 0.9; }
          75% { opacity: 0.7; }
          100% { opacity: 0; transform: translate(0, -80px) scale(0.6); }
        }
      `}</style>
    </div>
  );
}
