import { useState } from 'react';
import { tours } from './shared';

export function TourCard({ tour }: { tour: typeof tours[0] }) {
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
