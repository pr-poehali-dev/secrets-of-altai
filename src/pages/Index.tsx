import { useState } from 'react';
import AltaiBg from '@/components/AltaiBg';
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

const HERO_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/files/34bd7e24-fd3e-43d7-8eae-57cc1a1eff34.jpg';
const MAP_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/a355bd30-b025-4d0c-b93f-2af29bb760a7.png';
const TOUR_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/files/0a186228-adb5-49dd-9f7a-76ce5509bb6a.jpg';
const LOGO_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/a0866a50-0f76-46ef-9457-7044cf4ad0f9.png';

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
    <div className="min-w-[300px] sm:min-w-[380px] snap-center rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-black/50 flex flex-col">
      <div className="relative h-56 overflow-hidden">
        {slide === 0 && (
          <img src={tour.cover} alt={tour.title} className="w-full h-full object-cover animate-scale-in" />
        )}
        {slide === 1 && (
          <div className="w-full h-full parchment relative flex items-center justify-center animate-scale-in">
            <Icon name="Route" size={40} className="text-bloodred" />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <p className="text-[hsl(150_40%_15%)] text-sm font-medium text-center leading-relaxed">{tour.route}</p>
            </div>
          </div>
        )}
        {slide === 2 && (
          <div className="w-full h-full bg-fog bg-secondary p-5 flex items-center animate-scale-in">
            <p className="text-foreground/90 text-sm italic leading-relaxed font-display text-lg">«{tour.legend}»</p>
          </div>
        )}
        {slide === 3 && (
          <div className="w-full h-full bg-secondary p-5 animate-scale-in overflow-y-auto scrollbar-hide">
            <p className="text-primary text-xs uppercase tracking-widest mb-2">Маршрут</p>
            <p className="text-foreground/80 text-sm mb-3">{tour.route}</p>
            <ul className="space-y-1.5">
              {tour.includes.map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <Icon name="Check" size={14} className="text-primary shrink-0" />{i}
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
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl text-primary">{tour.title}</h3>
          <span className="text-sm text-muted-foreground">{tour.days}</span>
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
          <span className="text-xl text-primary font-display font-semibold">{tour.price}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSlide((slide + 1) % 4)}
            className="text-foreground/70 hover:text-primary"
          >
            Далее <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeLandmark, setActiveLandmark] = useState<number | null>(2);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-[#0d1f14]/80 border-b border-white/10">
        <div className="container flex items-center justify-between py-3">
          <a href="#" className="flex items-center gap-3 group">
            <img src={LOGO_IMG} alt="Тайны Алтая" className="h-12 w-auto object-contain transition-transform group-hover:scale-105" style={{ mixBlendMode: 'multiply', filter: 'contrast(1.05) saturate(1.1)' }} />
            <span className="hidden sm:block font-display text-base text-foreground/70 leading-tight max-w-[140px]">
              Мистические экспедиции по Горному Алтаю
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-foreground/70">
            <a href="#map" className="hover:text-primary transition-colors">Карта</a>
            <a href="#tours" className="hover:text-primary transition-colors">Туры</a>
            <a href="#about" className="hover:text-primary transition-colors">О проекте</a>
            <a href="#faq" className="hover:text-primary transition-colors">Вопросы</a>
          </nav>
          <Button onClick={() => setModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
            Оставить заявку
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden">
        <AltaiBg />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d1f14]/80 pointer-events-none" />
        <div className="relative z-10 text-center px-6 pb-24 animate-fade-in">
          <p className="text-[#f0d878] uppercase tracking-[0.4em] text-xs mb-4 drop-shadow font-semibold">Авторские экспедиции</p>
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 rounded-full bg-[#f0d878]/10 blur-3xl scale-150 animate-glow" />
            <img
              src={LOGO_IMG}
              alt="Тайны Алтая"
              className="w-64 sm:w-[380px] mx-auto relative z-10 animate-float"
              style={{ mixBlendMode: 'multiply', filter: 'contrast(1.05) saturate(1.1)' }}
            />
          </div>
          <h1 className="sr-only">Тайны Алтая</h1>
          <p className="max-w-xl mx-auto text-white/90 text-lg mb-8 drop-shadow-md">
            Шаманские маршруты, древние плато и мистические озёра.<br/>Прикоснись к легендам, что старше времён.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => setModalOpen(true)} className="bg-[#c8a030] text-[#1a2a10] hover:bg-[#d4b040] font-bold text-base px-8 shadow-lg">
              <Icon name="Compass" size={18} /> Выбрать маршрут
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/40 text-white hover:bg-white/10 text-base px-8 backdrop-blur-sm">
              <a href="#map"><Icon name="Map" size={18} /> Открыть карту</a>
            </Button>
          </div>
        </div>
        <a href="#map" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#f0d878] animate-float z-10">
          <Icon name="ChevronDown" size={28} />
        </a>
      </section>

      {/* INTERACTIVE MAP */}
      <section id="map" className="py-20 sm:py-28 bg-fog">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Карта странствий</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-4">Земля легенд</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Нажми на метку, чтобы узнать тайну места</p>
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-black/50 bg-[hsl(40_30%_80%)]">
              <img src={MAP_IMG} alt="Карта Алтая" className="w-full object-contain" />
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

            <div className="rounded-2xl border border-border bg-card p-7 min-h-[200px]">
              {activeLandmark ? (
                (() => {
                  const lm = landmarks.find((l) => l.id === activeLandmark)!;
                  return (
                    <div className="animate-fade-in">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="MapPin" size={20} className="text-bloodred" />
                        <h3 className="text-2xl text-primary">{lm.name}</h3>
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

      {/* TOURS CAROUSEL */}
      <section id="tours" className="py-20 sm:py-28">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Экспедиции</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold">Маршруты тайн</h2>
            </div>
            <p className="hidden sm:flex items-center gap-2 text-muted-foreground text-sm">
              <Icon name="MousePointerClick" size={16} /> листай карточки
            </p>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 sm:px-[max(1.5rem,calc((100vw-1336px)/2))] pb-4">
          {tours.map((t) => (
            <TourCard key={t.title} tour={t} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 sm:py-28 bg-secondary/40">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">О проекте</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-6">Хранители<br />алтайских легенд</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              «Тайны Алтая» — это не просто туры. Мы собираем предания старейшин, изучаем древние писаницы и ведём путешественников туда, где обычные карты заканчиваются.
            </p>
            <p className="text-foreground/80 leading-relaxed">
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
                <p className="font-display text-3xl font-semibold text-primary">{s.val}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-28">
        <div className="container max-w-3xl">
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-center mb-12">Частые вопросы</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl text-primary mb-2 flex items-center gap-2">
                  <Icon name="HelpCircle" size={20} /> {f.q}
                </h3>
                <p className="text-foreground/75 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-fog" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/20 animate-glow" />
        <div className="container relative text-center max-w-2xl">
          <Icon name="PhoneCall" size={36} className="text-primary mx-auto mb-5" />
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-5">Консультация по туру</h2>
          <p className="text-foreground/80 text-lg mb-8">
            Расскажем о маршрутах, подберём даты и ответим на любые вопросы. Менеджер свяжется с вами в течение часа.
          </p>
          <Button size="lg" onClick={() => setModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-10 h-14">
            Заказать звонок
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="container grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-display text-2xl font-semibold text-primary mb-3">Тайны Алтая</p>
            <p className="text-muted-foreground">Авторские мистические экспедиции по Горному Алтаю.</p>
          </div>
          <div className="space-y-2 text-foreground/70">
            <p className="flex items-center gap-2"><Icon name="Phone" size={15} className="text-primary" /> +7 (913) 000-00-00</p>
            <p className="flex items-center gap-2"><Icon name="Mail" size={15} className="text-primary" /> hello@taynyaltaya.ru</p>
            <p className="flex items-center gap-2"><Icon name="MapPin" size={15} className="text-primary" /> Горно-Алтайск</p>
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
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
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