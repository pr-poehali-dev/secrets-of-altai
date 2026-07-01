import { useState } from 'react';
import HeroAtmosphere from '@/components/HeroAtmosphere';
import SideDecor from '@/components/SideDecor';
import FloatingRunes from '@/components/FloatingRunes';
import useScrollReveal from '@/hooks/useScrollReveal';
import { useTimeOfDay, TIME_IMG_INDEX, TIME_LABEL } from '@/hooks/useTimeOfDay';
import useScrollBg from '@/hooks/useScrollBg';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const HERO_IMGS = [
  'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/files/c52cfbf2-6419-41e1-8b42-a4e8369fcc69.jpg',
  'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/files/fc8d0789-1348-4ecb-97d9-9a1ac0813e60.jpg',
  'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/files/5ad82dd7-1b41-4c34-87a0-175bd0f59957.jpg',
];
const HERO_IMG = HERO_IMGS[0];
const MAP_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/a355bd30-b025-4d0c-b93f-2af29bb760a7.png';
const TOUR_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/files/0a186228-adb5-49dd-9f7a-76ce5509bb6a.jpg';
const LOGO_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/82e4363e-4520-48ab-9564-1c624825319d.png';

const landmarks = [
  { id: 1, name: 'Гора Белуха', x: 50, y: 48, desc: 'Священная вершина, обитель богини Умай. Высочайшая точка Сибири — 4509 м.' },
  { id: 2, name: 'Телецкое озеро', x: 28, y: 36, desc: 'Алтын-Кёль — «Золотое озеро». Глубины хранят легенды о затонувших сокровищах.' },
  { id: 3, name: 'Плато Укок', x: 78, y: 78, desc: 'Зона покоя. Здесь нашли мумию «Алтайской принцессы» — хранительницы покоя миров.' },
  { id: 4, name: 'Горно-Алтайск', x: 26, y: 22, desc: 'Столица республики и врата в мир тайн. Начало большинства маршрутов.' },
  { id: 5, name: 'Долина Чулышман', x: 40, y: 66, desc: 'Каменные грибы и древние писаницы. Место силы шаманов.' },
];

const tours = [
  {
    title: 'Тропа Шамана',
    days: '7 дней',
    price: '54 900 ₽',
    cover: TOUR_IMG,
    legend: 'Местные старейшины рассказывают: тот, кто пройдёт древней тропой в полнолуние, услышит голоса предков и увидит огни над хребтом. Здесь сходятся миры живых и духов.',
    route: 'Горно-Алтайск → Чемал → Долина Чулышман → Телецкое озеро',
    includes: ['Проживание в эко-юртах', 'Питание 3 раза в день', 'Трансфер на внедорожниках', 'Гид-этнограф'],
  },
  {
    title: 'Загадки Укока',
    days: '9 дней',
    price: '78 500 ₽',
    cover: HERO_IMG,
    legend: 'Плато Укок называют «Вторым слоем небес». Археологи находят здесь курганы скифов, а очевидцы — странные огни в ночном небе. Принцесса всё ещё хранит покой плато.',
    route: 'Горно-Алтайск → Кош-Агач → Плато Укок → Граница миров',
    includes: ['Палаточный лагерь', 'Полевая кухня', 'Полноприводный транспорт', 'Гид + проводник'],
  },
  {
    title: 'Сокровища Белухи',
    days: '12 дней',
    price: '96 000 ₽',
    cover: HERO_IMG,
    legend: 'Рерих верил, что у подножия Белухи скрыт вход в Шамбалу. Восходящие к вершине говорят о необъяснимом свечении и чувстве, будто гора наблюдает за каждым шагом.',
    route: 'Тюнгур → Аккемское озеро → Подножие Белухи → Долина Семи Озёр',
    includes: ['Горные приюты', 'Усиленное питание', 'Снаряжение', 'Сертифицированный инструктор'],
  },
];

const faqs = [
  { q: 'Нужна ли специальная подготовка?', a: 'Большинство маршрутов рассчитаны на людей с базовой физической формой. Восхождения отмечены отдельно.' },
  { q: 'Что взять с собой?', a: 'После предоплаты мы пришлём подробный гайд со списком снаряжения для вашего тура.' },
  { q: 'Безопасно ли это?', a: 'Все туры сопровождают опытные гиды. Группы застрахованы, маршруты согласованы с МЧС.' },
];

function TourCard({ tour }: { tour: typeof tours[0] }) {
  const [slide, setSlide] = useState(0);
  const slides = ['Обложка', 'Маршрут', 'Легенда', 'Программа'];

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-black/50 flex flex-col h-full">
      <div className="relative overflow-hidden shrink-0" style={{ height: 'clamp(180px, 22vw, 260px)' }}>
        {slide === 0 && (
          <img src={tour.cover} alt={tour.title} className="w-full h-full object-cover object-center animate-scale-in" />
        )}
        {slide === 1 && (
          <div className="w-full h-full parchment flex items-center justify-center animate-scale-in p-6">
            <p className="text-[hsl(150_40%_15%)] text-sm font-medium text-center leading-relaxed">{tour.route}</p>
          </div>
        )}
        {slide === 2 && (
          <div className="w-full h-full bg-fog bg-secondary p-5 flex items-center animate-scale-in">
            <p className="text-foreground/90 text-sm italic leading-relaxed font-display" style={{ fontSize: 'clamp(14px, 1.5vw, 18px)' }}>«{tour.legend}»</p>
          </div>
        )}
        {slide === 3 && (
          <div className="w-full h-full bg-secondary p-5 animate-scale-in overflow-y-auto scrollbar-hide">
            <p className="text-primary text-xs uppercase tracking-widest mb-2">Маршрут</p>
            <p className="text-foreground/80 text-sm mb-3">{tour.route}</p>
            <ul className="space-y-1.5">
              {tour.includes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                  <Icon name="Check" size={14} className="text-primary shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-bloodred/90 text-white text-xs px-3 py-1 rounded-full font-medium">
          {slides[slide]}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-primary" style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}>{tour.title}</h3>
          <span className="text-sm text-muted-foreground shrink-0">{tour.days}</span>
        </div>
        <div className="flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all ${slide === i ? 'w-8 bg-primary' : 'w-3 bg-border'}`}
              aria-label={s}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-display font-semibold text-primary" style={{ fontSize: 'clamp(16px, 1.8vw, 22px)' }}>{tour.price}</span>
          <Button size="sm" variant="ghost" onClick={() => setSlide((slide + 1) % 4)} className="text-foreground/70 hover:text-primary">
            Далее <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

const legends = [
  { symbol: '△', title: 'Врата Шамбалы', text: 'Рерих верил: у подножия Белухи скрыт вход в Шамбалу. Восходящие видят необъяснимое свечение — гора наблюдает за каждым шагом.' },
  { symbol: '☽', title: 'Голоса предков', text: 'В полнолуние на тропе шамана слышны голоса. Старейшины клянутся: огни над хребтом появляются каждый год в одну и ту же ночь.' },
  { symbol: '👁', title: 'Алтайская принцесса', text: 'Мумия найдена на плато Укок в 1993 году. Шаманы говорили: её потревожили — и земля содрогнулась. Дух хранит покой плато.' },
  { symbol: '⟡', title: 'Компасы молчат', text: 'В долине Чулышман компасы теряют ориентацию. Местные проводники ходят по звёздам — приборы здесь бесполезны.' },
  { symbol: '★', title: 'Золотое озеро', text: 'Телецкое озеро — Алтын-Кёль. На его дне, по преданию, лежат сокровища скифов. Духи воды не подпускают водолазов.' },
];

const stories = [
  { symbol: '🌲', title: 'Кедровый лес', text: 'Алтайские кедры живут тысячу лет. Охотники говорят: в старых рощах деревья переговариваются ночью — слышен тихий гул без ветра.' },
  { symbol: '🔥', title: 'Огонь кочевников', text: 'Традиция жечь костёр на перевале жива по сей день. Каждый путник бросает в огонь ветку — просит у гор прохода и защиты.' },
  { symbol: '△', title: 'Курганы скифов', text: 'Плато Укок усеяно древними захоронениями. Археологи находят золото, оружие и татуированные мумии в идеальной сохранности.' },
  { symbol: '☽', title: 'Лунный маршрут', text: 'Раз в год в ночь полнолуния гиды ведут особый маршрут без фонарей. Только луна, горы и тишина, в которой слышен собственный пульс.' },
  { symbol: '⟡', title: 'Петроглифы', text: 'Наскальные рисунки Алтая насчитывают 10 000 лет. Многие изображения до сих пор не расшифрованы — учёные спорят об их смысле.' },
];

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeLandmark, setActiveLandmark] = useState<number | null>(2);
  const timeOfDay = useTimeOfDay();
  const [bgIndex, setBgIndex] = useState(() => TIME_IMG_INDEX[timeOfDay] ?? 0);
  const [clickCount, setClickCount] = useState(0);
  const [legendIdx, setLegendIdx] = useState(0);
  const [storyIdx, setStoryIdx] = useState(0);

  useScrollReveal();
  useScrollBg();

  const handleLogоClick = () => {
    const next = clickCount + 1;
    if (next >= 4) {
      setBgIndex(i => (i + 1) % HERO_IMGS.length);
      setClickCount(0);
    } else {
      setClickCount(next);
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <SideDecor />
      <FloatingRunes />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="site-container flex items-center justify-between py-3">
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <img
              src={LOGO_IMG}
              alt="Тайны Алтая"
              className="w-auto object-contain drop-shadow-lg transition-transform group-hover:scale-105"
              style={{ maxHeight: '52px', width: 'auto' }}
            />
            <span className="hidden sm:block font-display text-base text-foreground/70 leading-tight" style={{ maxWidth: '140px' }}>
              Мистические экспедиции по Горному Алтаю
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-foreground/70">
            <a href="#map" className="hover:text-primary transition-colors">Карта</a>
            <a href="#tours" className="hover:text-primary transition-colors">Туры</a>
            <a href="#about" className="hover:text-primary transition-colors">О проекте</a>
            <a href="#faq" className="hover:text-primary transition-colors">Вопросы</a>
          </nav>
          <Button onClick={() => setModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium shrink-0">
            Оставить заявку
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-section relative overflow-hidden">
        {/* Mobile: full-width image */}
        <img
          src={HERO_IMGS[bgIndex]}
          alt="Горный Алтай"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 md:hidden"
          style={{ objectPosition: 'center 20%' }}
        />
        {/* Desktop: centered 1400px image with bg sides */}
        <div className="absolute inset-0 bg-background hidden md:block" />
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 transition-all duration-1000 hidden md:block"
          style={{
            width: 'min(100%, 1400px)',
            backgroundImage: `url(${HERO_IMGS[bgIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            backgroundRepeat: 'no-repeat',
          }}
          aria-label="Горный Алтай в сумерках"
        />
        <HeroAtmosphere />


        {/* LEFT PANEL — Legends (desktop only) */}
        <div className="hero-side-panel hero-side-panel--left">
          <div className="hero-side-inner">
            <p className="text-primary uppercase tracking-[0.3em] text-[10px] mb-3 font-body">Легенды гор</p>
            <div className="hero-side-card animate-fade-in" key={legendIdx}>
              <span className="text-2xl mb-2 block">{legends[legendIdx].symbol}</span>
              <h4 className="font-display text-primary text-lg mb-2 leading-tight">{legends[legendIdx].title}</h4>
              <p className="text-foreground/75 text-sm leading-relaxed">{legends[legendIdx].text}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setLegendIdx(i => (i - 1 + legends.length) % legends.length)}
                className="text-primary/60 hover:text-primary transition-colors p-1"
              >
                <Icon name="ChevronLeft" size={18} />
              </button>
              <div className="flex gap-1">
                {legends.map((_, i) => (
                  <span key={i} className={`block rounded-full transition-all ${i === legendIdx ? 'w-4 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-primary/30'}`} />
                ))}
              </div>
              <button
                onClick={() => setLegendIdx(i => (i + 1) % legends.length)}
                className="text-primary/60 hover:text-primary transition-colors p-1"
              >
                <Icon name="ChevronRight" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Stories (desktop only) */}
        <div className="hero-side-panel hero-side-panel--right">
          <div className="hero-side-inner">
            <p className="text-primary uppercase tracking-[0.3em] text-[10px] mb-3 font-body">Истории</p>
            <div className="hero-side-card animate-fade-in" key={storyIdx}>
              <span className="text-2xl mb-2 block">{stories[storyIdx].symbol}</span>
              <h4 className="font-display text-primary text-lg mb-2 leading-tight">{stories[storyIdx].title}</h4>
              <p className="text-foreground/75 text-sm leading-relaxed">{stories[storyIdx].text}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setStoryIdx(i => (i - 1 + stories.length) % stories.length)}
                className="text-primary/60 hover:text-primary transition-colors p-1"
              >
                <Icon name="ChevronLeft" size={18} />
              </button>
              <div className="flex gap-1">
                {stories.map((_, i) => (
                  <span key={i} className={`block rounded-full transition-all ${i === storyIdx ? 'w-4 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-primary/30'}`} />
                ))}
              </div>
              <button
                onClick={() => setStoryIdx(i => (i + 1) % stories.length)}
                className="text-primary/60 hover:text-primary transition-colors p-1"
              >
                <Icon name="ChevronRight" size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="hero-content relative z-10 h-full flex flex-col items-center justify-end text-center animate-fade-in">
          <img
            src={LOGO_IMG}
            alt="Тайны Алтая"
            className="mx-auto mb-6 drop-shadow-2xl animate-float cursor-pointer select-none"
            style={{ width: 'clamp(220px, 36vw, 560px)', maxWidth: '560px', height: 'auto', objectFit: 'contain' }}
            onClick={handleLogоClick}
          />
          <h1 className="sr-only">Тайны Алтая</h1>
          <p className="mx-auto text-foreground/80 mb-8 leading-relaxed" style={{ maxWidth: '560px', fontSize: 'clamp(14px, 1.6vw, 20px)' }}>
            Шаманские маршруты, древние плато и мистические озёра. Прикоснись к легендам, что старше времён.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => setModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8" style={{ fontSize: 'clamp(14px, 1.4vw, 16px)' }}>
              <Icon name="Compass" size={18} /> Выбрать маршрут
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary/40 text-foreground hover:bg-primary/10 px-8" style={{ fontSize: 'clamp(14px, 1.4vw, 16px)' }}>
              <a href="#map"><Icon name="Map" size={18} /> Открыть карту</a>
            </Button>
          </div>
        </div>

        <a href="#map" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-float z-10">
          <Icon name="ChevronDown" size={28} />
        </a>
      </section>

      {/* MAP */}
      <section id="map" className="section-py bg-fog">
        <div className="site-container reveal">
          <div className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Карта странствий</p>
            <h2 className="font-display font-semibold mb-4" style={{ fontSize: 'clamp(26px, 4vw, 48px)', lineHeight: 1.2 }}>
              Земля легенд
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Нажми на метку, чтобы узнать тайну места</p>
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
            {/* Map image — aspect-ratio 4/3, object-fit contain */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-black/50 bg-[hsl(40_30%_80%)] w-full" style={{ aspectRatio: '4/3' }}>
              <img src={MAP_IMG} alt="Карта Алтая" className="w-full h-full" style={{ objectFit: 'contain', display: 'block' }} />
              {landmarks.map((lm) => (
                <button
                  key={lm.id}
                  onClick={() => setActiveLandmark(lm.id)}
                  style={{ left: `${lm.x}%`, top: `${lm.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  aria-label={lm.name}
                >
                  <span className="absolute inset-0 rounded-full bg-bloodred animate-ping-slow" />
                  <span className={`relative block w-5 h-5 rounded-full border-2 transition-transform group-hover:scale-125 ${activeLandmark === lm.id ? 'bg-bloodred border-white scale-125' : 'bg-bloodred/70 border-white/70'}`} />
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-card p-7" style={{ minHeight: '200px' }}>
              {activeLandmark ? (
                (() => {
                  const lm = landmarks.find((l) => l.id === activeLandmark)!;
                  return (
                    <div className="animate-fade-in">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="MapPin" size={20} className="text-bloodred shrink-0" />
                        <h3 className="font-display text-2xl text-primary">{lm.name}</h3>
                      </div>
                      <p className="text-foreground/80 leading-relaxed">{lm.desc}</p>
                    </div>
                  );
                })()
              ) : (
                <p className="text-muted-foreground">Выбери метку на карте</p>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                {landmarks.map((lm) => (
                  <button
                    key={lm.id}
                    onClick={() => setActiveLandmark(lm.id)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${activeLandmark === lm.id ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground/70 hover:border-primary/50'}`}
                  >
                    {lm.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOURS */}
      <section id="tours" className="section-py">
        <div className="site-container reveal">
          <div className="mb-10 flex items-center gap-5">
            <img
              src="https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/44ed9bc2-348a-4ab9-b299-b0b26d63bfe3.png"
              alt="Эмблема Тайны гор"
              className="shrink-0 drop-shadow-lg animate-float"
              style={{ width: 'clamp(100px, 14vw, 180px)', height: 'auto' }}
            />
            <div>
              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Экспедиции</p>
              <h2 className="font-display font-semibold" style={{ fontSize: 'clamp(26px, 4vw, 48px)', lineHeight: 1.2 }}>
                Маршруты «Тайна гор»
              </h2>
            </div>
          </div>
          <div className="tours-grid">
            {tours.map((t) => (
              <TourCard key={t.title} tour={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section-py bg-secondary/40">
        <div className="site-container reveal grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">О проекте</p>
            <h2 className="font-display font-semibold mb-6" style={{ fontSize: 'clamp(26px, 4vw, 48px)', lineHeight: 1.2 }}>
              Хранители<br />алтайских легенд
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4" style={{ fontSize: 'clamp(14px, 1.4vw, 17px)' }}>
              «Тайны Алтая» — это не просто туры. Мы собираем предания старейшин, изучаем древние писаницы и ведём путешественников туда, где обычные карты заканчиваются.
            </p>
            <p className="text-foreground/80 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.4vw, 17px)' }}>
              Каждый маршрут проверен, согласован и сопровождается гидом-этнографом. Тайна — рядом.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: 'Mountain', val: '40+', label: 'маршрутов' },
              { icon: 'Users', val: '2 800', label: 'путешественников' },
              { icon: 'Star', val: '4.9', label: 'средний рейтинг' },
              { icon: 'CalendarDays', val: '8 лет', label: 'в экспедициях' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center">
                <Icon name={s.icon} size={28} className="text-primary mx-auto mb-3" />
                <p className="font-display font-semibold text-primary" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>{s.val}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-py">
        <div className="site-container reveal" style={{ maxWidth: '760px' }}>
          <h2 className="font-display font-semibold text-center mb-12" style={{ fontSize: 'clamp(26px, 4vw, 48px)', lineHeight: 1.2 }}>Частые вопросы</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-primary mb-2 flex items-center gap-2" style={{ fontSize: 'clamp(15px, 1.6vw, 20px)' }}>
                  <Icon name="HelpCircle" size={20} className="shrink-0" /> {f.q}
                </h3>
                <p className="text-foreground/75 leading-relaxed" style={{ fontSize: 'clamp(13px, 1.3vw, 16px)' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py relative overflow-hidden">
        <div className="absolute inset-0 bg-fog" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/20 animate-glow pointer-events-none" />
        <div className="site-container reveal relative text-center" style={{ maxWidth: '640px' }}>
          <Icon name="PhoneCall" size={36} className="text-primary mx-auto mb-5" />
          <h2 className="font-display font-semibold mb-5" style={{ fontSize: 'clamp(26px, 4vw, 48px)', lineHeight: 1.2 }}>Консультация по туру</h2>
          <p className="text-foreground/80 mb-8 leading-relaxed" style={{ fontSize: 'clamp(14px, 1.6vw, 20px)' }}>
            Расскажем о маршрутах, подберём даты и ответим на любые вопросы. Менеджер свяжется с вами в течение часа.
          </p>
          <Button size="lg" onClick={() => setModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 h-14" style={{ fontSize: 'clamp(14px, 1.4vw, 16px)' }}>
            Заказать звонок
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="site-container grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-display text-2xl font-semibold text-primary mb-3">Тайны Алтая</p>
            <p className="text-muted-foreground">Авторские мистические экспедиции по Горному Алтаю.</p>
          </div>
          <div className="space-y-2 text-foreground/70">
            <p className="flex items-center gap-2"><Icon name="Phone" size={15} className="text-primary shrink-0" /> +7 (913) 000-00-00</p>
            <p className="flex items-center gap-2"><Icon name="Mail" size={15} className="text-primary shrink-0" /> hello@taynyaltaya.ru</p>
            <p className="flex items-center gap-2"><Icon name="MapPin" size={15} className="text-primary shrink-0" /> Горно-Алтайск</p>
          </div>
          <div className="text-muted-foreground">
            <p className="mb-1">ИП Хранитель Легенд А.А.</p>
            <p>ИНН 0400000000</p>
            <p className="mt-3">© 2026 Тайны Алтая</p>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="bg-card border-border overflow-y-auto"
          style={{ width: 'min(500px, 92vw)', maxHeight: '90vh', padding: 'clamp(20px, 3vw, 40px)' }}
        >
          <DialogHeader>
            <DialogTitle className="font-display text-3xl text-primary text-glow-gold">Оставить заявку</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 mt-2" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground/80 text-sm">Имя</Label>
                <Input placeholder="Ваше имя" className="bg-secondary border-border mt-1.5" />
              </div>
              <div>
                <Label className="text-foreground/80 text-sm">Телефон</Label>
                <Input placeholder="+7 ___ ___-__-__" className="bg-secondary border-border mt-1.5" />
              </div>
            </div>
            <div>
              <Label className="text-foreground/80 text-sm">Email</Label>
              <Input type="email" placeholder="you@mail.ru" className="bg-secondary border-border mt-1.5" />
            </div>
            <div>
              <Label className="text-foreground/80 text-sm">Желаемый тур</Label>
              <Input placeholder="Например, Тропа Шамана" className="bg-secondary border-border mt-1.5" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground/80 text-sm">Даты</Label>
                <Input placeholder="Июль 2026" className="bg-secondary border-border mt-1.5" />
              </div>
              <div>
                <Label className="text-foreground/80 text-sm">Кол-во человек</Label>
                <Input type="number" placeholder="2" className="bg-secondary border-border mt-1.5" />
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base">
              Отправить заявку
            </Button>
          </form>
          <div className="mt-2 pt-5 border-t border-border">
            <p className="text-primary uppercase tracking-widest text-xs mb-4">Как мы работаем</p>
            <ol className="space-y-3">
              {[
                'Менеджер связывается с вами и уточняет детали',
                'Согласовываем маршрут и даты с гидом',
                'Высылаем договор (оферту) и реквизиты для оплаты',
                'После предоплаты получаете подробный гайд по туру',
              ].map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold font-display">
                    {i + 1}
                  </span>
                  <span className="text-foreground/80 text-sm leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}