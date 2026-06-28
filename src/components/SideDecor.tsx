const IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/ea2402d9-1244-4d15-af91-f415a97f7988.png';

const LEFT_LEGEND = 'Когда солнце уходит за горы, из глубин Телецкого озера поднимается чёрный волк — Хара-Кускус. Он проглатывает светило, и мир погружается в тьму. Но на вершине Белухи просыпается Золоторогий Марал — Ак-Марал. Его рога сверкают искрами, копыта высекают молнии. Всю ночь они бьются в небесах. Марал гонится за волком через созвездия, и каждый удар его копыт рождает звезду.';

const RIGHT_LEGEND = 'К рассвету марал всегда побеждает. Он подкидывает солнце на своих рогах, и оно взлетает над горами. Алтайцы говорят: утро — это не восход, это триумф марала. Его кровь, пролитая за ночь, окрашивает небо в алый цвет. Поэтому на заре маралы всегда смотрят на восток — они проверяют, взошло ли их солнце. И люди носят обереги с рогами, чтобы марал помнил, за кого он бьётся.';

function Panel({ side, legend }: { side: 'left' | 'right'; legend: string }) {
  return (
    <div className={`side-decor side-decor--${side}`}>
      <div
        className="side-decor-bg"
        style={{
          backgroundImage: `url(${IMG})`,
          backgroundSize: '200% 100%',
          backgroundPosition: side === 'left' ? 'left top' : 'right top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className={`side-decor-fade side-decor-fade--${side}`} />

      {/* Legend overlay — visible on hover */}
      <div className={`side-decor-legend side-decor-legend--${side}`}>
        <div className="side-decor-legend__inner">
          <span className="side-decor-legend__symbol">{side === 'left' ? '🌑' : '🌅'}</span>
          <p className="side-decor-legend__text">{legend}</p>
        </div>
      </div>
    </div>
  );
}

export default function SideDecor() {
  return (
    <>
      <Panel side="left" legend={LEFT_LEGEND} />
      <Panel side="right" legend={RIGHT_LEGEND} />
    </>
  );
}
