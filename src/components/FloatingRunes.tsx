import { useEffect, useRef, useState } from 'react';

const RUNES = [
  { rune: 'ᚦ', hint: 'Турс — руна великанов и древних сил гор' },
  { rune: 'ᛉ', hint: 'Альгиз — оберег путника, защита духов' },
  { rune: 'ᚱ', hint: 'Райдо — руна странствий и верной дороги' },
  { rune: 'ᛟ', hint: 'Одал — руна рода, наследия и связи с предками' },
  { rune: 'ᛈ', hint: 'Перт — руна тайны, судьбы и скрытого знания' },
  { rune: 'ᛊ', hint: 'Соулу — руна солнца, силы и победы' },
  { rune: 'ᚹ', hint: 'Вуньо — руна радости и гармонии с природой' },
  { rune: 'ᛜ', hint: 'Ингуз — руна плодородия и внутреннего огня' },
];

type ActiveRune = {
  rune: string;
  hint: string;
  top: number;
  left: number;
  side: 'left' | 'right';
};

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export default function FloatingRunes() {
  const [active, setActive] = useState<ActiveRune | null>(null);
  const hoveredRef = useRef(false);
  const dismissRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spawnRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleNext = () => {
    spawnRef.current = setTimeout(spawn, 5000 + Math.random() * 6000);
  };

  const scheduleDismiss = () => {
    dismissRef.current = setTimeout(() => {
      // Only hide if user isn't hovering
      if (!hoveredRef.current) {
        setActive(null);
        scheduleNext();
      } else {
        // Keep checking every second until mouse leaves
        dismissRef.current = setTimeout(() => scheduleDismiss(), 1000);
      }
    }, 18000);
  };

  const spawn = () => {
    const data = RUNES[Math.floor(Math.random() * RUNES.length)];
    const side: 'left' | 'right' = Math.random() < 0.5 ? 'left' : 'right';
    const edgePct = 3 + Math.random() * 9;
    const left = side === 'left' ? edgePct : 100 - edgePct;
    const top = 18 + Math.random() * 64;

    setActive({ rune: data.rune, hint: data.hint, top, left, side });
    scheduleDismiss();
  };

  useEffect(() => {
    if (isMobile) return;
    spawnRef.current = setTimeout(spawn, 3000);
    return () => {
      if (spawnRef.current) clearTimeout(spawnRef.current);
      if (dismissRef.current) clearTimeout(dismissRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    hoveredRef.current = true;
    // Cancel pending dismiss while hovered
    if (dismissRef.current) clearTimeout(dismissRef.current);
  };

  const handleMouseLeave = () => {
    hoveredRef.current = false;
    // Dismiss shortly after mouse leaves
    dismissRef.current = setTimeout(() => {
      setActive(null);
      scheduleNext();
    }, 2000);
  };

  if (isMobile || !active) return null;

  return (
    <div className="floating-rune-layer">
      <div
        className="floating-rune"
        style={{ top: `${active.top}%`, left: `${active.left}%` }}
        role="note"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="floating-rune__glyph">{active.rune}</span>
        <span className={`floating-rune__tip floating-rune__tip--${active.side}`}>
          {active.hint}
        </span>
      </div>
    </div>
  );
}