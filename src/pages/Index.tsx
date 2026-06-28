import { useState, useEffect } from 'react';
import AltaiBg from '@/components/AltaiBg';
import Icon from '@/components/ui/icon';

const MAP_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/a355bd30-b025-4d0c-b93f-2af29bb760a7.png';
const TOUR_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/files/0a186228-adb5-49dd-9f7a-76ce5509bb6a.jpg';
const HERO_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/files/34bd7e24-fd3e-43d7-8eae-57cc1a1eff34.jpg';
const LOGO_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/cd3faae0-b27f-4483-be0b-fc3b795f31df.png';

const landmarks = [
  { id: 1, name: 'Гора Белуха', x: 50, y: 48, desc: 'Священная вершина, обитель богини Умай. Высочайшая точка Сибири — 4509 м. Рерих называл её вратами Шамбалы.' },
  { id: 2, name: 'Телецкое озеро', x: 28, y: 36, desc: 'Алтын-Кёль — «Золотое озеро». Глубины хранят легенды о затонувших сокровищах и духах воды.' },
  { id: 3, name: 'Плато Укок', x: 78, y: 78, desc: 'Зона покоя. Здесь нашли мумию «Алтайской принцессы». Шаманы запрещают тревожить эти земли.' },
  { id: 4, name: 'Горно-Алтайск', x: 26, y: 22, desc: 'Столица республики и врата в мир тайн. Начало большинства маршрутов.' },
  { id: 5, name: 'Долина Чулышман', x: 40, y: 66, desc: 'Каменные грибы и древние писаницы. Место силы шаманов. Здесь не работают компасы.' },
];

const tours = [
  {
    title: 'Тропа Шамана',
    days: '7 дней',
    price: '54 900 ₽',
    cover: TOUR_IMG,
    secret: '☽ Духи сопровождают каждого',
    legend: 'В полнолуние тот, кто пройдёт тропой до конца, услышит голоса предков. Местные старейшины клянутся: огни над хребтом появляются каждый год в одну и ту же ночь.',
    route: 'Горно-Алтайск → Чемал → Долина Чулышман → Телецкое озеро',
    includes: ['Эко-юрты', 'Питание 3×', 'Внедорожник', 'Гид-этнограф'],
  },
  {
    title: 'Загадки Укока',
    days: '9 дней',
    price: '78 500 ₽',
    cover: HERO_IMG,
    secret: '△ Принцесса смотрит на тебя',
    legend: 'Плато Укок — «Второй слой небес». Здесь находят курганы скифов и фиксируют НЛО. Дух Принцессы до сих пор охраняет покой мёртвых.',
    route: 'Горно-Алтайск → Кош-Агач → Плато Укок',
    includes: ['Палаточный лагерь', 'Полевая кухня', 'Вездеход', 'Проводник'],
  },
  {
    title: 'Сокровища Белухи',
    days: '12 дней',
    price: '96 000 ₽',
    cover: HERO_IMG,
    secret: '★ Шамбала ждёт достойных',
    legend: 'Рерих верил, что у подножия Белухи скрыт вход в Шамбалу. Восходящие видят необъяснимое свечение. Гора наблюдает за каждым шагом.',
    route: 'Тюнгур → Аккемское озеро → Белуха → 7 Озёр',
    includes: ['Горные приюты', 'Усиленное питание', 'Снаряжение', 'Инструктор'],
  },
];

const faqs = [
  { q: 'Нужна ли подготовка?', a: 'Большинство маршрутов — для людей с базовой физической формой. Восхождения отмечены отдельно.' },
  { q: 'Что взять с собой?', a: 'После предоплаты мы пришлём подробный гайд-дневник со списком снаряжения.' },
  { q: 'Безопасно ли это?', a: 'Все туры сопровождают опытные гиды. Группы застрахованы, маршруты согласованы с МЧС.' },
  { q: 'Можно ли попасть на Укок?', a: 'Да, при наличии пропуска в пограничную зону. Мы оформляем все документы заранее.' },
];

// Cryptic GF symbols
const symbols = ['△', '☽', '★', '🌲', '👁', '⟡', '✦'];

function GlowingEye({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none animate-eye-appear" style={style}>
      <svg width="32" height="20" viewBox="0 0 32 20">
        <ellipse cx="16" cy="10" rx="15" ry="9" fill="none" stroke="#f5c542" strokeWidth="1.5" opacity="0.8" />
        <circle cx="16" cy="10" r="5" fill="#f5c542" opacity="0.9" />
        <circle cx="18" cy="8" r="1.5" fill="#0a160a" />
        <ellipse cx="16" cy="10" rx="15" ry="9" fill="none" stroke="#f5c542" strokeWidth="0.5" opacity="0.4">
          <animate attributeName="ry" values="9;0.5;9" dur="4s" repeatCount="indefinite" />
        </ellipse>
      </svg>
    </div>
  );
}

function CrypticSymbol({ char, style }: { char: string; style: React.CSSProperties }) {
  return (
    <span
      className="absolute text-[#f5c542] opacity-20 pointer-events-none animate-shimmer select-none"
      style={{ fontSize: 24, fontFamily: 'serif', ...style }}
    >
      {char}
    </span>
  );
}

function TourCard({ tour }: { tour: typeof tours[0] }) {
  const [flipped, setFlipped] = useState(false);
  const [slide, setSlide] = useState(0);
  const slides = ['Обложка', 'Легенда', 'Маршрут', 'Состав'];

  return (
    <div
      className="min-w-[300px] sm:min-w-[360px] snap-center flex-shrink-0"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative transition-all duration-700 cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          height: 440,
        }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 gf-card overflow-hidden flex flex-col"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Image */}
          <div className="relative h-52 overflow-hidden flex-shrink-0">
            {slide === 0 && <img src={tour.cover} alt={tour.title} className="w-full h-full object-cover" />}
            {slide === 1 && (
              <div className="w-full h-full flex items-center justify-center p-5" style={{ background: '#0d1a0d' }}>
                <p className="text-[#d4b87a] italic font-serif text-base leading-relaxed text-center">«{tour.legend}»</p>
              </div>
            )}
            {slide === 2 && (
              <div className="w-full h-full parchment flex items-center justify-center p-5">
                <p className="text-[#3d1f0a] font-bold text-sm text-center leading-relaxed">{tour.route}</p>
              </div>
            )}
            {slide === 3 && (
              <div className="w-full h-full p-5 overflow-y-auto" style={{ background: '#0d1a0d' }}>
                <ul className="space-y-2">
                  {tour.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#d4c87a]">
                      <span className="text-[#f5c542]">⟡</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Badge */}
            <div className="absolute top-3 left-3 text-xs px-2 py-1 font-bold uppercase tracking-wider"
              style={{ background: '#e07a2f', color: '#0a160a', clipPath: 'polygon(0 0,100% 0,96% 100%,4% 100%)' }}>
              {slides[slide]}
            </div>
            {/* Hint flip */}
            <div className="absolute top-3 right-3 text-[10px] text-[#f5c542]/60 font-bold">↺ тайна</div>
          </div>

          {/* Slide dots */}
          <div className="flex gap-1.5 px-5 pt-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setSlide(i); }}
                className="h-1.5 transition-all"
                style={{ width: slide === i ? 28 : 10, background: slide === i ? '#f5c542' : '#2a4a2a' }}
                aria-label={slides[i]}
              />
            ))}
          </div>

          {/* Card body */}
          <div className="p-5 flex flex-col gap-2 flex-1">
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-serif" style={{ color: '#f5c542', textShadow: '1px 1px 0 #0a160a' }}>{tour.title}</h3>
              <span className="text-sm text-[#6a8a6a]">{tour.days}</span>
            </div>
            <div className="flex items-center justify-between mt-auto pt-1">
              <span className="text-xl font-serif font-bold" style={{ color: '#e07a2f' }}>{tour.price}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setSlide((slide + 1) % 4); }}
                className="text-xs px-3 py-1.5 font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
                style={{ background: '#1a3a1a', color: '#f5c542', border: '1px solid #2a5a2a' }}
              >
                Далее →
              </button>
            </div>
          </div>
        </div>

        {/* BACK — secret */}
        <div
          className="absolute inset-0 parchment flex flex-col items-center justify-center gap-6 p-8"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-6xl animate-spin-slow" style={{ animationDuration: '12s' }}>△</div>
          <p className="font-serif text-[#3d1f0a] text-xl text-center font-bold leading-tight">{tour.secret}</p>
          <p className="text-[#5a3a1a] text-sm text-center italic">Нажми снова, чтобы вернуться</p>
          <div className="flex gap-3 text-2xl opacity-40">
            <span>☽</span><span>★</span><span>👁</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [eyeBlink, setEyeBlink] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', tour: '', dates: '', people: '' });

  useEffect(() => {
    const t = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 200);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,10,5,0.85)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide"
        style={{
          background: '#c8a060',
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E"),
            radial-gradient(ellipse at 15% 20%, rgba(180,130,40,0.5), transparent 55%),
            radial-gradient(ellipse at 85% 80%, rgba(130,90,20,0.4), transparent 50%)
          `,
          clipPath: `polygon(
            0 12px, 8px 0, calc(100% - 8px) 0, 100% 12px,
            100% calc(100% - 16px), calc(100% - 4px) calc(100% - 8px),
            calc(100% - 12px) 100%, 12px 100%, 4px calc(100% - 8px),
            0 calc(100% - 16px)
          )`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
        }}
      >
        {/* Torn top edge decoration */}
        <div className="absolute top-0 inset-x-0 h-2" style={{ background: 'rgba(100,60,10,0.3)' }} />

        {/* Header */}
        <div className="p-6 pb-4" style={{ borderBottom: '2px dashed rgba(100,60,10,0.4)' }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[#5a3a10] text-xs uppercase tracking-widest font-bold mb-1">Дневник Алтая · Запись №147</p>
              <h2 className="font-serif text-3xl font-bold" style={{ color: '#3d1f05', textShadow: '1px 1px 0 rgba(255,255,255,0.3)' }}>
                Оставить заявку
              </h2>
            </div>
            <button onClick={onClose} className="text-[#5a3a10] hover:text-[#3d1f05] text-2xl font-bold mt-1 shrink-0">✕</button>
          </div>
          {/* Handwriting scribble decoration */}
          <svg className="mt-2 opacity-30" width="120" height="12" viewBox="0 0 120 12">
            <path d="M2 6 Q20 2 40 8 Q60 14 80 6 Q100 0 118 6" stroke="#5a3a10" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {!submitted ? (
          <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            {[
              { key: 'name', label: 'Имя', placeholder: 'Ваше имя...', type: 'text' },
              { key: 'phone', label: 'Телефон', placeholder: '+7 ___ ___-__-__', type: 'tel' },
              { key: 'email', label: 'E-mail', placeholder: 'you@mail.ru', type: 'email' },
              { key: 'tour', label: 'Желаемый тур', placeholder: 'Тропа Шамана...', type: 'text' },
              { key: 'dates', label: 'Даты', placeholder: 'Июль 2026', type: 'text' },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="block text-[#5a3a10] text-xs font-bold uppercase tracking-wider mb-1">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full px-3 py-2 text-[#3d1f05] placeholder-[#9a7a40] font-serif focus:outline-none"
                  style={{
                    background: 'rgba(180,130,50,0.3)',
                    border: '1.5px solid rgba(100,60,10,0.5)',
                    fontFamily: 'serif',
                    fontSize: 15,
                  }}
                />
              </div>
            ))}

            {/* Submit with blinking eye */}
            <button
              type="submit"
              className="w-full py-3 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #1a3a1a, #0d200d)',
                color: '#f5c542',
                clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                boxShadow: '0 0 20px rgba(245,197,66,0.3)',
              }}
            >
              {/* Blinking eye */}
              <svg width="22" height="14" viewBox="0 0 22 14">
                <ellipse cx="11" cy="7" rx="10" ry="6" fill="none" stroke="#f5c542" strokeWidth="1.5" />
                <ellipse
                  cx="11" cy="7" rx="4" ry={eyeBlink ? 0.3 : 4}
                  fill="#f5c542"
                  style={{ transition: 'ry 0.1s' }}
                />
                {!eyeBlink && <circle cx="12.5" cy="5.5" r="1.2" fill="#0d200d" />}
              </svg>
              Отправить заявку
            </button>
          </form>
        ) : (
          <div className="p-10 text-center">
            <div className="text-6xl mb-4">👁</div>
            <p className="font-serif text-2xl font-bold text-[#3d1f05] mb-2">Дух принял послание!</p>
            <p className="text-[#5a3a10] text-sm">Менеджер свяжется с вами в течение часа.</p>
          </div>
        )}

        {/* Workflow */}
        {!submitted && (
          <div className="px-6 pb-6" style={{ borderTop: '2px dashed rgba(100,60,10,0.4)', paddingTop: 16, marginTop: 4 }}>
            <p className="text-[#5a3a10] text-xs uppercase tracking-widest font-bold mb-3">📜 Как это работает</p>
            <ol className="space-y-2">
              {[
                'Менеджер свяжется и уточнит детали',
                'Согласуем маршрут и даты с гидом',
                'Высылаем договор и реквизиты',
                'После предоплаты — гайд-дневник путешественника',
              ].map((s, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-[#5a3a10]">
                  <span className="font-bold shrink-0" style={{ color: '#c07820' }}>{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Corner rips */}
        <div className="absolute top-0 right-0 w-8 h-8" style={{ background: 'rgba(80,40,5,0.25)', clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
        <div className="absolute bottom-0 left-0 w-10 h-10" style={{ background: 'rgba(80,40,5,0.2)', clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }} />
      </div>
    </div>
  );
}

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeLandmark, setActiveLandmark] = useState<number | null>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#0a160a', color: '#e8daa0' }}>

      {/* ===== HEADER ===== */}
      <header className="relative z-40 zigzag-bottom" style={{ background: '#0d1f0d', paddingBottom: 24 }}>
        {/* Glowing eyes in header */}
        <GlowingEye style={{ left: '5%', top: 20, animationDelay: '0s' }} />
        <GlowingEye style={{ right: '8%', top: 16, animationDelay: '3s' }} />
        <GlowingEye style={{ left: '42%', top: 10, animationDelay: '6s' }} />

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Wooden sign logo */}
          <a href="#" className="flex items-center gap-1 group animate-chain-swing" style={{ transformOrigin: 'top center' }}>
            {/* Chains */}
            <div className="hidden sm:flex flex-col items-center gap-1 mr-2 opacity-60">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#8a7040' }} />
              ))}
            </div>
            {/* Sign board */}
            <div
              className="px-4 py-2 relative"
              style={{
                background: 'linear-gradient(135deg, #4a2e0a, #3a200a)',
                border: '3px solid #6a4820',
                clipPath: 'polygon(0 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%, 0 3%)',
                boxShadow: '3px 3px 0 #1a0a00',
              }}
            >
              <img
                src={LOGO_IMG}
                alt="Тайны Алтая"
                className="h-10 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
              />
            </div>
            <div className="hidden sm:flex flex-col items-center gap-1 ml-2 opacity-60">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#8a7040' }} />
              ))}
            </div>
          </a>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Карта', 'Туры', 'О проекте', 'Вопросы'].map((item, i) => (
              <a
                key={item}
                href={`#${['map', 'tours', 'about', 'faq'][i]}`}
                className="text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 relative group"
                style={{ color: '#a0b870', textShadow: '1px 1px 0 #0a160a' }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all" style={{ background: '#f5c542' }} />
              </a>
            ))}
          </nav>

          {/* CTA crystal button */}
          <button
            onClick={() => setModalOpen(true)}
            className="animate-crystal-glow font-bold uppercase tracking-widest text-sm px-5 py-2.5 transition-transform hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #2a5a1a, #1a3a0a)',
              color: '#f5c542',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 12px 100%, 0 50%)',
              textShadow: '0 0 10px rgba(245,197,66,0.5)',
            }}
          >
            Записаться
          </button>
        </div>

        {/* Cryptic symbols */}
        <CrypticSymbol char="△" style={{ bottom: 30, left: '20%', animationDelay: '0s' }} />
        <CrypticSymbol char="☽" style={{ bottom: 28, right: '25%', animationDelay: '1.5s' }} />
        <CrypticSymbol char="★" style={{ bottom: 32, left: '60%', animationDelay: '3s' }} />
      </header>

      {/* ===== HERO ===== */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden">
        <AltaiBg />
        {/* Fog layers */}
        <div
          className="absolute inset-x-0 animate-fog-drift pointer-events-none"
          style={{ top: '40%', height: 200, background: 'linear-gradient(transparent, rgba(15,30,15,0.4), transparent)', animationDelay: '0s' }}
        />
        <div
          className="absolute inset-x-0 animate-fog-drift pointer-events-none"
          style={{ top: '60%', height: 150, background: 'linear-gradient(transparent, rgba(15,30,15,0.3), transparent)', animationDelay: '-9s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a160a]/90 pointer-events-none" />

        <div className="relative z-10 text-center px-6 pb-28 animate-fade-in">
          <p className="text-[#a0b870] uppercase tracking-[0.5em] text-xs mb-4 font-bold">Авторские экспедиции · Горный Алтай</p>

          {/* Logo with glow */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-glow" style={{ background: '#f5c542' }} />
            <img
              src={LOGO_IMG}
              alt="Тайны Алтая"
              className="w-72 sm:w-[420px] mx-auto relative z-10 animate-float"
              style={{ filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.6))' }}
            />
          </div>
          <h1 className="sr-only">Тайны Алтая</h1>

          <p className="max-w-lg mx-auto text-[#c8d8a0] text-lg mb-10 leading-relaxed" style={{ textShadow: '1px 1px 4px #0a160a' }}>
            Шаманские маршруты, священные вершины и мистические озёра.<br />
            Прикоснись к тайнам, что старше времён.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="font-bold uppercase tracking-widest px-8 py-4 text-base transition-all hover:scale-105 animate-crystal-glow"
              style={{
                background: 'linear-gradient(135deg, #c8a020, #e07a2f)',
                color: '#0a160a',
                clipPath: 'polygon(14px 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0 50%)',
                boxShadow: '0 0 30px rgba(245,197,66,0.4)',
              }}
            >
              ⟡ Выбрать маршрут
            </button>
            <a
              href="#map"
              className="font-bold uppercase tracking-widest px-8 py-4 text-base transition-all hover:scale-105"
              style={{
                background: 'transparent',
                color: '#f5c542',
                border: '2px solid #f5c542',
                clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
              }}
            >
              △ Открыть карту
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-float-up">
          <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
            <path d="M12 2 Q18 10 12 18 Q6 26 12 34" stroke="#f5c542" strokeWidth="2" fill="none" />
            <path d="M8 28 L12 34 L16 28" stroke="#f5c542" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </section>

      {/* ===== MAP ===== */}
      <section id="map" className="relative py-24" style={{ background: '#0d1f0d' }}>
        {/* Zigzag top border */}
        <div className="absolute top-0 inset-x-0 h-4 overflow-hidden">
          <svg viewBox="0 0 1440 16" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 16 L20 0 L40 16 L60 0 L80 16 L100 0 L120 16 L140 0 L160 16 L180 0 L200 16 L220 0 L240 16 L260 0 L280 16 L300 0 L320 16 L340 0 L360 16 L380 0 L400 16 L420 0 L440 16 L460 0 L480 16 L500 0 L520 16 L540 0 L560 16 L580 0 L600 16 L620 0 L640 16 L660 0 L680 16 L700 0 L720 16 L740 0 L760 16 L780 0 L800 16 L820 0 L840 16 L860 0 L880 16 L900 0 L920 16 L940 0 L960 16 L980 0 L1000 16 L1020 0 L1040 16 L1060 0 L1080 16 L1100 0 L1120 16 L1140 0 L1160 16 L1180 0 L1200 16 L1220 0 L1240 16 L1260 0 L1280 16 L1300 0 L1320 16 L1340 0 L1360 16 L1380 0 L1400 16 L1420 0 L1440 16 Z" fill="#0a160a" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#e07a2f] uppercase tracking-[0.4em] text-xs mb-3 font-bold">👁 Карта странствий</p>
            <h2 className="font-serif text-5xl font-bold mb-3" style={{ color: '#f5c542', textShadow: '3px 3px 0 #0a160a, 0 0 30px rgba(245,197,66,0.3)' }}>
              Земля легенд
            </h2>
            <p className="text-[#6a8a5a] max-w-md mx-auto text-sm">Нажми на метку, чтобы открыть тайну этого места</p>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
            {/* Map */}
            <div className="relative" style={{ border: '3px solid #2a4a1a', background: '#0a160a', boxShadow: '8px 8px 0 #050f05' }}>
              <img src={MAP_IMG} alt="Карта Алтая" className="w-full object-contain" />
              {landmarks.map((lm, i) => (
                <button
                  key={lm.id}
                  onClick={() => setActiveLandmark(lm.id)}
                  style={{ left: `${lm.x}%`, top: `${lm.y}%`, animationDelay: `${i * 0.5}s` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  aria-label={lm.name}
                >
                  {/* Pulse ring */}
                  <span className="absolute inset-0 rounded-full animate-ping-slow" style={{ background: '#f5c542', opacity: 0.5 }} />
                  <span
                    className="relative block w-5 h-5 rounded-full border-2 transition-all group-hover:scale-125"
                    style={{
                      background: activeLandmark === lm.id ? '#f5c542' : 'rgba(245,197,66,0.6)',
                      borderColor: 'white',
                      boxShadow: activeLandmark === lm.id ? '0 0 12px #f5c542' : 'none',
                      transform: activeLandmark === lm.id ? 'scale(1.3)' : undefined,
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Landmark info */}
            <div
              className="p-6 min-h-[260px] relative"
              style={{
                background: '#0f1f0f',
                border: '2px solid #2a4a1a',
                clipPath: 'polygon(0 0, 98% 0, 100% 2%, 100% 98%, 98% 100%, 0 100%)',
              }}
            >
              {/* Symbols scattered */}
              <CrypticSymbol char="△" style={{ top: 10, right: 20, fontSize: 18 }} />
              <CrypticSymbol char="☽" style={{ bottom: 15, right: 30, fontSize: 14 }} />

              {activeLandmark ? (() => {
                const lm = landmarks.find(l => l.id === activeLandmark)!;
                return (
                  <div className="animate-fade-in">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[#e07a2f] text-xl">📍</span>
                      <h3 className="font-serif text-2xl" style={{ color: '#f5c542' }}>{lm.name}</h3>
                    </div>
                    <p className="text-[#a0b870] leading-relaxed mb-6">{lm.desc}</p>
                    <div
                      className="p-3 text-xs text-[#6a8a5a] italic"
                      style={{ background: 'rgba(245,197,66,0.05)', borderLeft: '2px solid #f5c54240' }}
                    >
                      ✦ Включено в маршруты «Тайны Алтая»
                    </div>
                  </div>
                );
              })() : (
                <div className="flex flex-col items-center justify-center h-40 text-[#4a6a3a]">
                  <span className="text-4xl mb-3 animate-shimmer">△</span>
                  <p className="text-sm">Выбери место на карте</p>
                </div>
              )}

              {/* Landmark pills */}
              <div className="flex flex-wrap gap-2 mt-6">
                {landmarks.map(lm => (
                  <button
                    key={lm.id}
                    onClick={() => setActiveLandmark(lm.id)}
                    className="text-xs px-3 py-1.5 font-bold transition-all hover:scale-105"
                    style={{
                      background: activeLandmark === lm.id ? '#f5c542' : 'transparent',
                      color: activeLandmark === lm.id ? '#0a160a' : '#6a8a5a',
                      border: `1px solid ${activeLandmark === lm.id ? '#f5c542' : '#2a4a1a'}`,
                      clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)',
                    }}
                  >
                    {lm.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TOURS ===== */}
      <section id="tours" className="py-24 relative" style={{ background: '#0a160a' }}>
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <p className="text-[#e07a2f] uppercase tracking-[0.4em] text-xs mb-3 font-bold">☽ Экспедиции</p>
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-5xl font-bold" style={{ color: '#f5c542', textShadow: '3px 3px 0 #0a160a' }}>
              Маршруты тайн
            </h2>
            <p className="hidden sm:block text-[#4a6a3a] text-sm italic">↺ нажми на карточку, чтобы открыть секрет</p>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 pb-4"
          style={{ paddingLeft: 'max(1.5rem, calc((100vw - 1280px)/2))' }}>
          {tours.map(t => <TourCard key={t.title} tour={t} />)}
        </div>

        {/* Pine tree silhouettes */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none flex items-end justify-around h-32 overflow-hidden opacity-20">
          {[...Array(12)].map((_, i) => (
            <svg key={i} width="40" height="90" viewBox="0 0 40 90" className="animate-pine-breathe" style={{ animationDelay: `${i * 0.4}s` }}>
              <polygon points="20,0 40,50 0,50" fill="#1a4a1a" />
              <polygon points="20,20 38,65 2,65" fill="#1a4a1a" />
              <polygon points="20,38 36,80 4,80" fill="#1a4a1a" />
              <rect x="16" y="80" width="8" height="10" fill="#3a2010" />
            </svg>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-24 relative" style={{ background: '#0d1f0d' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#e07a2f] uppercase tracking-[0.4em] text-xs mb-3 font-bold">★ О проекте</p>
              <h2 className="font-serif text-5xl font-bold mb-6" style={{ color: '#f5c542', textShadow: '3px 3px 0 #0a160a' }}>
                Хранители<br />легенд
              </h2>
              <p className="text-[#a0b870] leading-relaxed mb-4 text-base">
                «Тайны Алтая» — это не просто туры. Мы собираем предания старейшин, изучаем древние писаницы и ведём путешественников туда, где обычные карты заканчиваются.
              </p>
              <p className="text-[#a0b870] leading-relaxed text-base">
                Каждый маршрут проверен, согласован и сопровождается гидом-этнографом. Тайна — рядом.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '⛰', val: '40+', label: 'маршрутов' },
                { icon: '👥', val: '2 800', label: 'путешественников' },
                { icon: '★', val: '4.9', label: 'рейтинг' },
                { icon: '📅', val: '8 лет', label: 'в экспедициях' },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="p-6 text-center animate-sway-shadow transition-transform hover:scale-105"
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    background: '#0f1f0f',
                    border: '2px solid #2a4a1a',
                    clipPath: 'polygon(0 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%, 0 4%)',
                  }}
                >
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className="font-serif text-3xl font-bold" style={{ color: '#f5c542' }}>{s.val}</p>
                  <p className="text-sm text-[#6a8a5a]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-24 relative" style={{ background: '#0a160a' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#e07a2f] uppercase tracking-[0.4em] text-xs mb-3 font-bold">📜 Вопросы путников</p>
            <h2 className="font-serif text-5xl font-bold" style={{ color: '#f5c542', textShadow: '3px 3px 0 #0a160a' }}>
              Частые вопросы
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                style={{
                  background: '#0f1f0f',
                  border: '2px solid #2a4a1a',
                  clipPath: 'polygon(0 0, 99% 0, 100% 1%, 100% 99%, 99% 100%, 0 100%)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 transition-colors hover:bg-white/5"
                >
                  <span className="font-serif text-lg" style={{ color: '#f5c542' }}>
                    {['△', '☽', '★', '⟡'][i]} {f.q}
                  </span>
                  <span className="text-[#f5c542] text-xl shrink-0 transition-transform" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-[#a0b870] leading-relaxed animate-fade-in border-t border-[#2a4a1a]/50 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#0d1f0d' }}>
        {/* Fog */}
        <div className="absolute inset-0 animate-fog-drift pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,197,66,0.1), transparent 70%)' }} />

        {/* Eyes */}
        <GlowingEye style={{ left: '10%', top: '30%', animationDelay: '2s' }} />
        <GlowingEye style={{ right: '12%', top: '40%', animationDelay: '5s' }} />

        {/* Pines */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end h-24 opacity-15 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <svg key={i} width="50" height="100" viewBox="0 0 50 100" className="animate-pine-breathe" style={{ animationDelay: `${i * 0.6}s` }}>
              <polygon points="25,0 50,55 0,55" fill="#1a4a1a" />
              <polygon points="25,22 48,70 2,70" fill="#1a4a1a" />
              <polygon points="25,42 45,88 5,88" fill="#1a4a1a" />
              <rect x="20" y="88" width="10" height="12" fill="#3a2010" />
            </svg>
          ))}
        </div>

        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <div className="text-5xl mb-5 animate-float-up" style={{ animationDuration: '4s' }}>👁</div>
          <h2 className="font-serif text-5xl font-bold mb-5" style={{ color: '#f5c542', textShadow: '3px 3px 0 #0a160a' }}>
            Консультация по туру
          </h2>
          <p className="text-[#a0b870] text-lg mb-10 leading-relaxed">
            Расскажем о маршрутах, подберём даты и ответим на любые вопросы.<br />
            Менеджер свяжется с вами в течение часа.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="font-bold uppercase tracking-widest px-12 py-5 text-base animate-crystal-glow transition-transform hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #c8a020, #e07a2f)',
              color: '#0a160a',
              clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 20px 100%, 0 50%)',
              fontSize: 16,
            }}
          >
            ⟡ Заказать звонок
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative pt-16 pb-8" style={{ background: '#050f05', borderTop: '3px solid #1a3a1a' }}>
        {/* Zigzag top */}
        <div className="absolute top-0 inset-x-0">
          <svg viewBox="0 0 1440 12" className="w-full" preserveAspectRatio="none" style={{ height: 12 }}>
            <path d="M0 0 L20 12 L40 0 L60 12 L80 0 L100 12 L120 0 L140 12 L160 0 L180 12 L200 0 L220 12 L240 0 L260 12 L280 0 L300 12 L320 0 L340 12 L360 0 L380 12 L400 0 L420 12 L440 0 L460 12 L480 0 L500 12 L520 0 L540 12 L560 0 L580 12 L600 0 L620 12 L640 0 L660 12 L680 0 L700 12 L720 0 L740 12 L760 0 L780 12 L800 0 L820 12 L840 0 L860 12 L880 0 L900 12 L920 0 L940 12 L960 0 L980 12 L1000 0 L1020 12 L1040 0 L1060 12 L1080 0 L1100 12 L1120 0 L1140 12 L1160 0 L1180 12 L1200 0 L1220 12 L1240 0 L1260 12 L1280 0 L1300 12 L1320 0 L1340 12 L1360 0 L1380 12 L1400 0 L1420 12 L1440 0 L1440 0 Z" fill="#0d1f0d" />
          </svg>
        </div>

        {/* Glowing eyes in footer */}
        <GlowingEye style={{ left: '3%', bottom: '40%', animationDelay: '1s' }} />
        <GlowingEye style={{ right: '5%', bottom: '35%', animationDelay: '4s' }} />

        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 gap-8 text-sm relative z-10">
          <div>
            <img src={LOGO_IMG} alt="Тайны Алтая" className="h-16 w-auto object-contain mb-3" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }} />
            <p className="text-[#4a6a3a]">Авторские мистические экспедиции по Горному Алтаю.</p>
            <div className="flex gap-3 mt-4 text-xl">
              {symbols.slice(0, 4).map((s, i) => (
                <span key={i} className="animate-shimmer cursor-default" style={{ color: '#f5c542', animationDelay: `${i * 0.7}s`, opacity: 0.5 }}>{s}</span>
              ))}
            </div>
          </div>
          <div className="space-y-2 text-[#6a8a5a]">
            <p>📞 +7 (913) 000-00-00</p>
            <p>✉ hello@taynyaltaya.ru</p>
            <p>📍 Горно-Алтайск</p>
            <p className="mt-4 text-xs text-[#3a5a3a]">ИП Хранитель Легенд А.А.<br />ИНН 0400000000</p>
          </div>
          <div className="text-[#4a6a3a] text-xs leading-relaxed">
            <p className="text-[#6a8a5a] font-bold mb-2 uppercase tracking-widest text-[10px]">Подсказка из дневника</p>
            <p className="italic">"Если горы молчат — значит, они слушают. Если лес не шевелится — значит, он смотрит."</p>
            <p className="mt-4">© 2026 Тайны Алтая</p>
          </div>
        </div>
      </footer>

      {/* ===== MODAL ===== */}
      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}