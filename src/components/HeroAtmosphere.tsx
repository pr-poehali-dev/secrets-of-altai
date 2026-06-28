export default function HeroAtmosphere({ offset = { x: 0, y: 0 } }: { offset?: { x: number; y: number } }) {
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
    { left: '8%', bottom: '6%', w: 420, h: 180, op: 0.22, dur: 30, delay: 0, blur: 40 },
    { left: '34%', bottom: '2%', w: 540, h: 220, op: 0.26, dur: 38, delay: 4, blur: 50 },
    { left: '62%', bottom: '5%', w: 480, h: 190, op: 0.2, dur: 34, delay: 2, blur: 45 },
    { left: '20%', bottom: '14%', w: 360, h: 150, op: 0.16, dur: 42, delay: 6, blur: 38 },
    { left: '70%', bottom: '12%', w: 400, h: 160, op: 0.15, dur: 36, delay: 3, blur: 42 },
    { left: '46%', bottom: '20%', w: 320, h: 130, op: 0.12, dur: 46, delay: 8, blur: 36 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rolling fog puffs */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate(${offset.x * 0.6}px, ${offset.y * 0.6}px)`, transition: 'transform 0.3s ease-out' }}
      >
        {puffs.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.w,
              height: p.h,
              background: `radial-gradient(ellipse at center, rgba(225,232,238,${p.op}) 0%, rgba(210,220,230,${p.op * 0.5}) 45%, transparent 72%)`,
              filter: `blur(${p.blur}px)`,
              animation: `fogRoll${i % 2} ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Fireflies */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate(${offset.x * 1.4}px, ${offset.y * 1.4}px)`, transition: 'transform 0.2s ease-out' }}
      >
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
      </div>

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
