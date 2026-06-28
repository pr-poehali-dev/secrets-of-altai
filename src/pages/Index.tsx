import { useState } from 'react';
import AltaiBg from '@/components/AltaiBg';
import { TourCard } from '@/components/altai/TourCard';
import { BookingModal } from '@/components/altai/BookingModal';
import { landmarks, tours, faqs, symbols, GlowingEye, CrypticSymbol, LOGO_IMG, MAP_IMG } from '@/components/altai/shared';

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeLandmark, setActiveLandmark] = useState<number | null>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#0a160a', color: '#e8daa0' }}>

      {/* ===== HEADER ===== */}
      <header className="relative z-40 zigzag-bottom" style={{ background: '#0d1f0d', paddingBottom: 24 }}>
        <GlowingEye style={{ left: '5%', top: 20, animationDelay: '0s' }} />
        <GlowingEye style={{ right: '8%', top: 16, animationDelay: '3s' }} />
        <GlowingEye style={{ left: '42%', top: 10, animationDelay: '6s' }} />

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Wooden sign logo */}
          <a href="#" className="flex items-center gap-1 group animate-chain-swing" style={{ transformOrigin: 'top center' }}>
            <div className="hidden sm:flex flex-col items-center gap-1 mr-2 opacity-60">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: '#8a7040' }} />
              ))}
            </div>
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

        <CrypticSymbol char="△" style={{ bottom: 30, left: '20%', animationDelay: '0s' }} />
        <CrypticSymbol char="☽" style={{ bottom: 28, right: '25%', animationDelay: '1.5s' }} />
        <CrypticSymbol char="★" style={{ bottom: 32, left: '60%', animationDelay: '3s' }} />
      </header>

      {/* ===== HERO ===== */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden">
        <AltaiBg />
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-float-up">
          <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
            <path d="M12 2 Q18 10 12 18 Q6 26 12 34" stroke="#f5c542" strokeWidth="2" fill="none" />
            <path d="M8 28 L12 34 L16 28" stroke="#f5c542" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </section>

      {/* ===== MAP ===== */}
      <section id="map" className="relative py-24" style={{ background: '#0d1f0d' }}>
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

            <div
              className="p-6 min-h-[260px] relative"
              style={{
                background: '#0f1f0f',
                border: '2px solid #2a4a1a',
                clipPath: 'polygon(0 0, 98% 0, 100% 2%, 100% 98%, 98% 100%, 0 100%)',
              }}
            >
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
        <div className="absolute inset-0 animate-fog-drift pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,197,66,0.1), transparent 70%)' }} />

        <GlowingEye style={{ left: '10%', top: '30%', animationDelay: '2s' }} />
        <GlowingEye style={{ right: '12%', top: '40%', animationDelay: '5s' }} />

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
        <div className="absolute top-0 inset-x-0">
          <svg viewBox="0 0 1440 12" className="w-full" preserveAspectRatio="none" style={{ height: 12 }}>
            <path d="M0 0 L20 12 L40 0 L60 12 L80 0 L100 12 L120 0 L140 12 L160 0 L180 12 L200 0 L220 12 L240 0 L260 12 L280 0 L300 12 L320 0 L340 12 L360 0 L380 12 L400 0 L420 12 L440 0 L460 12 L480 0 L500 12 L520 0 L540 12 L560 0 L580 12 L600 0 L620 12 L640 0 L660 12 L680 0 L700 12 L720 0 L740 12 L760 0 L780 12 L800 0 L820 12 L840 0 L860 12 L880 0 L900 12 L920 0 L940 12 L960 0 L980 12 L1000 0 L1020 12 L1040 0 L1060 12 L1080 0 L1100 12 L1120 0 L1140 12 L1160 0 L1180 12 L1200 0 L1220 12 L1240 0 L1260 12 L1280 0 L1300 12 L1320 0 L1340 12 L1360 0 L1380 12 L1400 0 L1420 12 L1440 0 L1440 0 Z" fill="#0d1f0d" />
          </svg>
        </div>

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
