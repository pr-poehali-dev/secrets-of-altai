import { useState, useEffect } from 'react';

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
