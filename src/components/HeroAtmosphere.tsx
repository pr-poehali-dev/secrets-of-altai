export default function HeroAtmosphere() {
  const fireflies = Array.from({ length: 22 }, (_, i) => ({
    left: `${(i * 37 + 7) % 100}%`,
    bottom: `${(i * 23 + 5) % 55}%`,
    size: 2 + (i % 3),
    dur: 6 + (i % 5) * 1.4,
    delay: (i % 7) * 0.8,
    drift: i % 2 === 0 ? 14 : -12,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Drifting fog layers */}
      <div
        className="absolute inset-x-0 fog-layer"
        style={{
          bottom: '8%',
          height: '32%',
          background:
            'radial-gradient(ellipse 60% 100% at 30% 100%, rgba(220,230,235,0.18), transparent 70%), radial-gradient(ellipse 50% 100% at 75% 100%, rgba(210,220,230,0.14), transparent 70%)',
          animation: 'fogDrift1 26s ease-in-out infinite',
        }}
      />
      <div
        className="absolute inset-x-0 fog-layer"
        style={{
          bottom: '0%',
          height: '40%',
          background:
            'radial-gradient(ellipse 70% 100% at 55% 100%, rgba(180,200,210,0.16), transparent 75%)',
          animation: 'fogDrift2 34s ease-in-out infinite',
        }}
      />
      {/* High thin mist near mountains */}
      <div
        className="absolute inset-x-0 fog-layer"
        style={{
          top: '28%',
          height: '22%',
          background:
            'linear-gradient(90deg, transparent, rgba(230,225,240,0.12) 40%, rgba(230,225,240,0.1) 60%, transparent)',
          animation: 'fogDrift1 40s ease-in-out infinite reverse',
        }}
      />

      {/* Fireflies */}
      {fireflies.map((f, i) => (
        <span
          key={i}
          className="absolute rounded-full firefly"
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
        @keyframes fogDrift1 {
          0%, 100% { transform: translateX(-6%); }
          50% { transform: translateX(6%); }
        }
        @keyframes fogDrift2 {
          0%, 100% { transform: translateX(5%); }
          50% { transform: translateX(-5%); }
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
