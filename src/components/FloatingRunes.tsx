import { useEffect, useState } from 'react';

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

export default function FloatingRunes() {
  const [active, setActive] = useState<ActiveRune | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const spawn = () => {
      const data = RUNES[Math.floor(Math.random() * RUNES.length)];
      // Pick a safe band near the left or right edge (avoids central content)
      const side: 'left' | 'right' = Math.random() < 0.5 ? 'left' : 'right';
      const edgePct = 3 + Math.random() * 9; // 3%–12% from edge
      const left = side === 'left' ? edgePct : 100 - edgePct;
      const top = 18 + Math.random() * 64; // 18%–82% vertically

      setActive({ rune: data.rune, hint: data.hint, top, left, side });

      // Stay on screen much longer, then schedule next
      timeoutId = setTimeout(() => {
        setActive(null);
        timeoutId = setTimeout(spawn, 5000 + Math.random() * 6000);
      }, 18000);
    };

    timeoutId = setTimeout(spawn, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!active) return null;

  return (
    <div className="floating-rune-layer">
      <div
        className="floating-rune"
        style={{ top: `${active.top}%`, left: `${active.left}%` }}
        title={active.hint}
        role="note"
      >
        <span className="floating-rune__glyph">{active.rune}</span>
        <span className={`floating-rune__tip floating-rune__tip--${active.side}`}>
          {active.hint}
        </span>
      </div>
    </div>
  );
}