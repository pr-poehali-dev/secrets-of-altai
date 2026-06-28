import { useState } from 'react';

const IMG_LEFT  = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/33380ab4-b3c7-4580-8b4e-295072a776a4.png';
const IMG_RIGHT = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/a45f8744-f276-4904-9964-f9cc638f8950.png';

const LEFT_LEGEND = 'Когда солнце уходит за горы, из глубин Телецкого озера поднимается чёрный волк — Хара-Кускус. Он проглатывает светило, и мир погружается в тьму. Но на вершине Белухи просыпается Золоторогий Марал — Ак-Марал. Его рога сверкают искрами, копыта высекают молнии. Всю ночь они бьются в небесах. Марал гонится за волком через созвездия, и каждый удар его копыт рождает звезду.';

const RIGHT_LEGEND = 'К рассвету марал всегда побеждает. Он подкидывает солнце на своих рогах, и оно взлетает над горами. Алтайцы говорят: утро — это не восход, это триумф марала. Его кровь, пролитая за ночь, окрашивает небо в алый цвет. Поэтому на заре маралы всегда смотрят на восток — они проверяют, взошло ли их солнце. И люди носят обереги с рогами, чтобы марал помнил, за кого он бьётся.';

function Panel({ side, legend, img }: { side: 'left' | 'right'; legend: string; img: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`side-decor side-decor--${side}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <div
        className="side-decor-bg"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Edge fade */}
      <div className={`side-decor-fade side-decor-fade--${side}`} />

      {/* Legend overlay — React-driven for reliable hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: hovered ? 'rgba(10, 22, 14, 0.9)' : 'rgba(10, 22, 14, 0)',
          transition: 'background 0.4s ease',
        }}
      >
        <div
          style={{
            padding: '24px 18px',
            textAlign: 'center',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
          }}
        >
          <span style={{ display: 'block', fontSize: 34, marginBottom: 16, filter: 'drop-shadow(0 0 8px rgba(245,197,66,0.7))' }}>
            {side === 'left' ? '🌑' : '☀️'}
          </span>
          <p style={{
            color: 'hsl(45 40% 90%)',
            fontFamily: 'Cormorant, serif',
            fontSize: 'clamp(15px, 1.3vw, 19px)',
            lineHeight: 1.7,
            fontStyle: 'italic',
            textShadow: '0 1px 5px rgba(0,0,0,0.95)',
            margin: 0,
          }}>
            {legend}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SideDecor() {
  return (
    <>
      <Panel side="left" legend={LEFT_LEGEND} img={IMG_LEFT} />
      <Panel side="right" legend={RIGHT_LEGEND} img={IMG_RIGHT} />
    </>
  );
}