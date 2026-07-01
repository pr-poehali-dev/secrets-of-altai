import { useState, useEffect, useRef } from 'react';
import { tours } from '@/components/altai/shared';
import { TourCard } from '@/components/altai/TourCard';
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
  'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/ab910eff-21c0-42df-b7c8-beb6863386a5.png', // 0 вечер
  'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/f9134551-7f2e-4d9e-ba45-02919c9a6a8d.png', // 1 ночь
  'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/8d721d83-a9d0-405d-a475-999825de2870.png', // 2 день
  'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/6405b5bc-76b3-4386-b674-e47df96a92e4.png', // 3 утро
  'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/dc0beddd-199c-447c-b383-72237fbe373e.png', // 4 полдень
  'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/19f53968-12af-47aa-9143-7f60229c4f99.png', // 5 вечереет
];
const HERO_IMG = HERO_IMGS[0];
const MAP_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/7ad988f7-2fd7-48ed-8cff-e7c8608e9758.png';
const TOUR_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/files/0a186228-adb5-49dd-9f7a-76ce5509bb6a.jpg';
const LOGO_IMG = 'https://cdn.poehali.dev/projects/709f8aa2-b778-4092-a2a7-3f93727724e2/bucket/82e4363e-4520-48ab-9564-1c624825319d.png';

const landmarks = [
  { id: 1,  name: 'Гора Белуха',                x: 41.8, y: 70.4, detail: 'Гора Белуха — высочайшая вершина Сибири (4506 м). Считается сакральным центром Алтая. По легендам, у её подножия скрыт вход в Шамбалу — мистическую страну просветлённых. Многие путешественники отмечают здесь необъяснимое чувство покоя и изменение восприятия времени.' },
  { id: 2,  name: 'Телецкое озеро',             x: 57.2, y: 30.8, detail: 'Алтын-Кёль (Золотое озеро) — одно из глубочайших озёр России (325 м). Легенды гласят, что на дне озера покоятся сокровища древних племён, а в его водах обитает дух-хранитель в виде золотой рыбы. Местные жители верят, что озеро живёт своей жизнью и может менять цвет и настроение.' },
  { id: 3,  name: 'Плато Укок',                 x: 58.7, y: 78.7, detail: 'Плато Укок — «зона покоя» на стыке границ России, Монголии, Китая и Казахстана. Место древних захоронений (курганов) и петроглифов. В 1993 году здесь была найдена мумия «Алтайской принцессы». Плато считается одним из самых сильных мест силы на Алтае.' },
  { id: 4,  name: 'Река Катунь',                x: 39.8, y: 42.8, detail: 'Катунь — главная река Горного Алтая, берущая начало у подножия Белухи. Её бирюзовые воды, бурные пороги и живописные долины привлекают путешественников со всего мира. Название реки происходит от тюркского «кадын» — «госпожа» или «хозяйка».' },
  { id: 5,  name: 'Перевал Чике-Таман',         x: 86.5, y: 40.7, detail: 'Чике-Таман — знаменитый перевал на Чуйском тракте (1295 м). Древняя караванная тропа, где каждый путник оставлял ленту на священном дереве, прося у гор безопасной дороги.' },
  { id: 6,  name: 'Долина реки Чулышман',       x: 64.8, y: 49.0, detail: 'Долина Чулышман — величественный каньон с отвесными стенами и водопадами. Здесь находятся каменные грибы и древние писаницы. Место силы шаманов, где, по преданиям, не работают компасы.' },
  { id: 7,  name: 'Гейзеровое озеро',           x: 48.8, y: 67.3, detail: 'Гейзеровое (Голубое) озеро — небольшое озеро с бирюзовой водой, на дне которого бьют термальные источники, рисующие меняющиеся узоры из голубой глины. Уникальное место, не замерзающее зимой.' },
  { id: 8,  name: 'Петроглифы Калбак-Таш',      x: 10.6, y: 68.9, detail: 'Калбак-Таш — крупнейшее святилище наскального искусства Алтая. Более 5000 рисунков возрастом от неолита до древнетюркской эпохи. Шаманы верят, что образы оживают в новолуние.' },
  { id: 9,  name: 'Водопад Учар',               x: 67.9, y: 46.4, detail: 'Учар (Большой Чульчинский водопад) — крупнейший каскадный водопад Алтая высотой около 160 м. Труднодоступное место, добраться до которого можно только пешком по горной тропе.' },
  { id: 10, name: 'Каракольские озёра',         x: 45.9, y: 33.1, detail: 'Каракольские озёра — семь высокогорных озёр, расположенных каскадом на разной высоте. Каждое имеет свой цвет и характер. Место паломничества любителей нетронутой природы Алтая.' },
  { id: 11, name: 'Горно-Алтайск',              x: 37.4, y: 25.8, detail: 'Горно-Алтайск — столица Республики Алтай. Отправная точка большинства маршрутов. Здесь находится Национальный музей, где хранится мумия «Алтайской принцессы» и богатейшая коллекция артефактов древних культур Алтая.' },
  { id: 12, name: 'Марс (Кызыл-Чин)',           x: 91.9, y: 58.0, detail: 'Урочище Кызыл-Чин — «Алтайский Марс». Разноцветные глинистые холмы красных, оранжевых и фиолетовых оттенков напоминают поверхность другой планеты. Один из самых фотогеничных пейзажей Алтая.' },
  { id: 13, name: 'Чуйские меандры',            x: 32.1, y: 86.6, detail: 'Чуйские меандры — живописные излучины реки Чуи, видные с высоты перевала Кату-Ярык. Бирюзовая лента реки, петляющая среди гор, — одна из самых узнаваемых панорам Алтая.' },
  { id: 14, name: 'Чуйский тракт (смотровая)', x: 39.3, y: 50.7, detail: 'Чуйский тракт — легендарная дорога, признанная одной из красивейших в мире. Смотровые площадки открывают виды на ущелья, реки и горные хребты, которые невозможно забыть.' },
  { id: 15, name: 'Пазырыкские курганы',        x: 13.5, y: 73.1, detail: 'Пазырыкские курганы — захоронения скифской эпохи V–III вв. до н.э. В вечной мерзлоте сохранились ткани, татуированные мумии, лошади в полном снаряжении. Один из важнейших археологических памятников мира.' },
  { id: 16, name: 'Красные ворота',             x: 89.8, y: 37.0, detail: 'Красные ворота — живописное ущелье, прорезанное рекой Чибитка в красноватых горных породах. Узкий проход с отвесными стенами яркого цвета — природные «врата» в глубь Алтая.' },
  { id: 17, name: 'Каменные грибы Аккурум',    x: 60.1, y: 48.0, detail: 'Каменные грибы — причудливые скальные останцы с широкими «шляпками» из твёрдого камня. Добраться до них можно только пешком по горной тропе вдоль Чулышмана. Каждый «гриб» уникален по форме.' },
  { id: 18, name: 'Шавлинские озёра',          x: 91.6, y: 48.5, detail: 'Шавлинские озёра — высокогорные озёра с кристально чистой бирюзовой водой у подножия пика Красавица. Одно из самых труднодоступных и красивых мест Алтая — добраться можно только пешком или на лошадях.' },
  { id: 19, name: 'Ледник Актру',              x: 83.0, y: 34.4, detail: 'Ледник Актру — крупнейший ледник Северо-Чуйского хребта. Место тренировок альпинистов и популярная цель треккинга. Отсюда открывается вид на белоснежные вершины, теряющиеся в облаках.' },
  { id: 20, name: 'Перевал Кату-Ярык',         x: 73.5, y: 9.4,  detail: 'Перевал Кату-Ярык — крутой серпантин с перепадом высот 800 м, открывающий захватывающий вид на долину Чулышмана. Один из самых впечатляющих горных перевалов Алтая.' },
  { id: 21, name: 'Мультинские озёра',         x: 23.3, y: 80.7, detail: 'Мультинские озёра — система горных озёр в Катунском заповеднике, соединённых бурными порогами и водопадами. Нетронутая природа, кедровая тайга и изумрудная вода делают это место сказочным.' },
  { id: 22, name: 'Денисова пещера',           x: 68.6, y: 5.0,  detail: 'Денисова пещера — одно из важнейших мест в истории человечества. Здесь обнаружены останки денисовского человека — ранее неизвестного вида людей. Возраст артефактов достигает 300 000 лет.' },
  { id: 24, name: 'Остров Патмос',             x: 38.3, y: 39.6, detail: 'Остров Патмос — скала посреди реки Катунь в Чемале, на которой стоит деревянный православный храм Иоанна Богослова. Добраться можно по подвесному мосту. Место силы и духовного притяжения для многих паломников.' },
  { id: 25, name: 'Тавдинские пещеры',         x: 34.3, y: 32.6, detail: 'Тавдинские пещеры — система из более чем 30 карстовых пещер с древними наскальными рисунками и следами стоянок первобытных людей. Наиболее известна Тавдинская арка — сквозная пещера над рекой Катунь.' },
  { id: 26, name: 'Семинский перевал',         x: 75.2, y: 16.0, detail: 'Семинский перевал (1717 м) — один из крупнейших перевалов Чуйского тракта. Здесь растут вековые кедры, а с вершины открывается панорама на несколько горных хребтов. Здесь расположена олимпийская тренировочная база.' },
  { id: 27, name: 'Озеро Манжерок',            x: 36.3, y: 29.5, detail: 'Озеро Манжерок — живописное озеро у подножия горы Малая Синюха. Благодаря тёплой воде и близости к Горно-Алтайску — один из самых популярных курортов Алтая. Здесь проходили съёмки фильмов и фестивали.' },
  { id: 28, name: 'Белый Бом',                 x: 86.9, y: 30.6, detail: 'Белый Бом — отвесная белая скала над рекой Чуей. Одно из самых узнаваемых мест Чуйского тракта. По легенде, здесь живёт дух горы, охраняющий путников от несчастий в дороге.' },
  { id: 29, name: 'Долина Ярлу',               x: 27.1, y: 85.1, detail: 'Долина Ярлу — место, воспетое Николаем Рерихом. Здесь стоит знаменитый «Камень Рериха» — огромный валун, ставший символом духовных исканий. Художник считал эту долину вратами в высший мир.' },
  { id: 30, name: 'Кучерлинское озеро',        x: 17.8, y: 77.0, detail: 'Кучерлинское озеро — высокогорное озеро в Катунском заповеднике с удивительно насыщенным бирюзовым цветом воды. Добраться можно пешком или на лошадях через живописные перевалы.' },
  { id: 31, name: 'Источник Аржан-Бугузун',    x: 90.6, y: 53.8, detail: 'Аржан-Бугузун — тёплые минеральные источники в высокогорной степи. «Аржан» по-алтайски означает «священная вода». Местные жители приходят сюда лечиться и медитировать у воды.' },
  { id: 32, name: 'Водопад Корбу',             x: 59.3, y: 33.1, detail: 'Водопад Корбу — один из крупнейших водопадов Алтая (12 м), впадающий в Телецкое озеро. Добраться можно только по воде на катере. Мощный поток воды и дикая природа вокруг создают незабываемое впечатление.' },
  { id: 33, name: 'Каменные изваяния Кезер',   x: 74.7, y: 26.9, detail: 'Каменные изваяния Кезер — древнетюркские балбалы, изображающие воинов степи. Установлены у погребальных курганов и смотрят на восток. Молчаливые стражи Алтая, хранящие память о кочевых империях.' },
  { id: 34, name: 'Бомы Чуйского тракта',      x: 80.7, y: 28.2, detail: 'Бомы — опасные участки Чуйского тракта, где дорога проходит по узким карнизам над бездонными пропастями. Захватывающие дух виды и адреналин — неотъемлемая часть путешествия по легендарному тракту.' },
  { id: 35, name: 'Иогач',                     x: 55.8, y: 26.0, detail: 'Иогач — посёлок на северном берегу Телецкого озера. Отправная точка для экскурсий по Алтын-Кёлю. Отсюда отходят катера к водопаду Корбу и другим труднодоступным берегам озера.' },
  { id: 36, name: 'Чемал',                     x: 38.0, y: 37.0, detail: 'Чемал — популярный туристический посёлок на берегу Катуни. Мягкий климат, живописные горы и близость к достопримечательностям делают его любимым местом отдыха. Здесь находится знаменитый остров Патмос с храмом на скале.' },
  { id: 37, name: 'Река Чуя',                  x: 78.0, y: 45.0, detail: 'Чуя — правый приток Катуни, один из самых известных рек Алтая для рафтинга. Бурные пороги и живописные каньоны привлекают любителей экстремального туризма со всего мира.' },
  { id: 38, name: 'Река Бия',                  x: 53.0, y: 17.5, detail: 'Бия — река, вытекающая из Телецкого озера. Вместе с Катунью образует Обь. На берегах Бии расположены древние городища и петроглифы, а сама река богата рыбой.' },
  { id: 39, name: 'Река Чулышман',             x: 61.5, y: 38.5, detail: 'Чулышман — горная река, впадающая в Телецкое озеро с юга. Протекает через живописный каньон с отвесными скалами. На реке расположены знаменитые каменные грибы и водопад Учар.' },
  { id: 40, name: 'Улаган',                    x: 77.5, y: 21.5, detail: 'Улаган — районный центр в горах Алтая на высоте около 1230 м. Ворота в высокогорный Улаганский район. Отсюда начинаются маршруты к Пазырыкским курганам, перевалу Кату-Ярык и плато Укок.' },
];

const faqs = [
  { q: 'Нужна ли специальная подготовка?', a: 'Большинство маршрутов рассчитаны на людей с базовой физической формой. Восхождения отмечены отдельно.' },
  { q: 'Что взять с собой?', a: 'После предоплаты мы пришлём подробный гайд со списком снаряжения для вашего тура.' },
  { q: 'Безопасно ли это?', a: 'Все туры сопровождают опытные гиды. Группы застрахованы, маршруты согласованы с МЧС.' },
];

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

const HERO_QUOTES = [
  '«Здесь горы помнят звёзды, а реки хранят легенды. Алтай открывается тем, кто ищет тишину и красоту.»',
  '«Край, где дышит древность. Тайны Алтая — твой следующий шаг.»',
  '«Там, где заканчиваются карты, начинаются легенды. Алтай зовёт тех, кто готов слушать.»',
  '«Ветры древних кочевий, шёпот кедров и сияние гор. Алтай — это музыка вечности.»',
];

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toursTab, setToursTab] = useState<'tours' | 'expeditions' | 'excursions'>('tours');
  const [activeLandmark, setActiveLandmark] = useState<number | null>(null);
  const [landmarkQuery, setLandmarkQuery] = useState('');
  const canEdit = import.meta.env.DEV;
  const [editMode, setEditMode] = useState(false);
  const [positions, setPositions] = useState<Record<number, { x: number; y: number }>>(
    () => Object.fromEntries(landmarks.map(lm => [lm.id, { x: lm.x, y: lm.y }]))
  );
  const draggingRef = useRef<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const timeOfDay = useTimeOfDay();
  const [bgIndex, setBgIndex] = useState(() => TIME_IMG_INDEX[timeOfDay] ?? 0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [legendIdx, setLegendIdx] = useState(0);
  const [storyIdx, setStoryIdx] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIdx(i => (i + 1) % HERO_QUOTES.length);
        setQuoteVisible(true);
      }, 600);
    }, 15000);
    return () => clearInterval(id);
  }, []);

  useScrollReveal();
  useScrollBg();

  const changeBg = (next: number) => {
    if (next === bgIndex) return;
    setPrevIndex(bgIndex);
    setBgIndex(next);
    setFading(true);
    setTimeout(() => { setFading(false); setPrevIndex(null); }, 1200);
  };

  const handleLogоClick = () => {
    const next = clickCount + 1;
    if (next >= 4) {
      changeBg((bgIndex + 1) % HERO_IMGS.length);
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
        {/* Mobile: crossfade layers */}
        {prevIndex !== null && (
          <img
            src={HERO_IMGS[prevIndex]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover md:hidden"
            style={{ objectPosition: 'center 20%', opacity: fading ? 1 : 0, transition: 'opacity 1.2s ease', zIndex: 1 }}
          />
        )}
        <img
          src={HERO_IMGS[bgIndex]}
          alt="Горный Алтай"
          className="absolute inset-0 w-full h-full object-cover md:hidden"
          style={{ objectPosition: 'center 20%', opacity: 1, zIndex: 2 }}
        />
        {/* Desktop: crossfade layers */}
        <div className="absolute inset-0 bg-background hidden md:block" style={{ zIndex: 0 }} />
        {prevIndex !== null && (
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 hidden md:block"
            style={{
              width: 'min(100%, 1400px)',
              backgroundImage: `url(${HERO_IMGS[prevIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%',
              backgroundRepeat: 'no-repeat',
              opacity: fading ? 1 : 0,
              transition: 'opacity 1.2s ease',
              zIndex: 1,
            }}
          />
        )}
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 hidden md:block"
          style={{
            width: 'min(100%, 1400px)',
            backgroundImage: `url(${HERO_IMGS[bgIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            backgroundRepeat: 'no-repeat',
            zIndex: 2,
          }}
          aria-label="Горный Алтай"
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
            className="mx-auto mb-4 drop-shadow-2xl animate-float cursor-pointer select-none"
            style={{ width: 'clamp(220px, 36vw, 560px)', maxWidth: '560px', height: 'auto', objectFit: 'contain' }}
            onClick={handleLogоClick}
          />
          <h1 className="sr-only">Тайны Алтая</h1>
          <p
            className="mx-auto mb-6 leading-relaxed italic font-body px-5 py-3 text-center hidden md:block"
            style={{
              maxWidth: '580px',
              fontSize: 'clamp(13px, 1.5vw, 18px)',
              color: '#fff',
              textShadow: '0 1px 4px rgba(0,0,0,0.7)',
              opacity: quoteVisible ? 1 : 0,
              transition: 'opacity 0.6s ease',
              background: 'rgba(0,0,0,0.18)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '12px',
              backdropFilter: 'blur(4px)',
            }}
          >
            {HERO_QUOTES[quoteIdx]}
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
          <div className="text-center mb-5">
            <p className="text-primary uppercase tracking-[0.3em] text-xs">Карта странствий</p>
          </div>

          {canEdit && (
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setEditMode(m => !m)}
                className={`text-xs px-4 py-2 rounded-lg border font-medium transition-colors ${editMode ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-foreground/60 hover:border-primary/50'}`}
              >
                {editMode ? '✓ Готово' : '✏️ Переместить метки'}
              </button>
            </div>
          )}

          {canEdit && editMode && (
            <div className="mb-4 p-4 rounded-xl border border-primary/30 bg-primary/5 text-xs text-foreground/70 space-y-1">
              <p className="font-semibold text-primary mb-2">🗺️ Перетаскивай метки. Координаты:</p>
              {landmarks.map(lm => (
                <p key={lm.id}>{lm.icon} {lm.name}: x={positions[lm.id].x.toFixed(1)}, y={positions[lm.id].y.toFixed(1)}</p>
              ))}
            </div>
          )}

          <div className="grid lg:grid-cols-[4fr_1fr] gap-6 items-start">
            {/* Map image */}
            <div
              ref={mapRef}
              className="relative w-full mx-auto"
              style={{ aspectRatio: '2400 / 1500', maxHeight: '92vh', maxWidth: 'min(100%, calc(92vh * 2400 / 1500))', cursor: editMode ? 'crosshair' : 'default' }}
              onMouseMove={(e) => {
                if (!editMode || draggingRef.current === null) return;
                const rect = mapRef.current!.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setPositions(prev => ({ ...prev, [draggingRef.current!]: { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } }));
              }}
              onMouseUp={() => { draggingRef.current = null; }}
              onMouseLeave={() => { draggingRef.current = null; }}
            >
              <img src={MAP_IMG} alt="Карта Алтая" className="w-full h-full" style={{ objectFit: 'contain', display: 'block' }} />
              {landmarks.map((lm) => {
                const pos = editMode ? positions[lm.id] : lm;
                const isActive = activeLandmark === lm.id;
                return (
                  <div
                    key={lm.id}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, cursor: editMode ? 'grab' : 'pointer', zIndex: isActive ? 15 : undefined }}
                    className={`map-marker group ${isActive ? 'is-active' : ''}`}
                    onMouseDown={(e) => { if (editMode) { e.preventDefault(); draggingRef.current = lm.id; } }}
                    onClick={() => { if (!editMode) setActiveLandmark(isActive ? null : lm.id); }}
                  >
                    <span className="map-marker__ring" />
                    <span className="map-marker__dot" />
                    <span className="map-marker__label">{lm.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Right panel: dropdown + info */}
            <div className="lg:sticky lg:top-24 flex flex-col gap-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-primary/70 mb-2">Выбери метку на карте</label>
                <select
                  value={activeLandmark ?? ''}
                  onChange={(e) => setActiveLandmark(e.target.value ? Number(e.target.value) : null)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="">— Все места ({landmarks.length}) —</option>
                  {landmarks.map((lm) => (
                    <option key={lm.id} value={lm.id}>{lm.name}</option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6" style={{ minHeight: '180px' }}>
                {activeLandmark ? (() => {
                  const lm = landmarks.find((l) => l.id === activeLandmark)!;
                  return (
                    <div className="animate-fade-in">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-display text-xl text-primary leading-tight">{lm.name}</h3>
                      </div>
                      <p className="text-foreground/80 text-sm leading-relaxed">{lm.detail}</p>
                    </div>
                  );
                })() : (
                  <p className="text-muted-foreground text-sm">Выбери место из списка или нажми на метку на карте, чтобы узнать его тайну.</p>
                )}
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
              <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">Маршруты</p>
              <h2 className="font-display font-semibold" style={{ fontSize: 'clamp(26px, 4vw, 48px)', lineHeight: 1.2 }}>
                Маршруты «Тайна гор»
              </h2>
            </div>
          </div>

          {/* Вкладки */}
          <div className="flex gap-2 mb-8 border-b border-border">
            {([
              { key: 'tours', label: 'Туры' },
              { key: 'expeditions', label: 'Экспедиции' },
              { key: 'excursions', label: 'Экскурсии' },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setToursTab(key)}
                className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  toursTab === key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-foreground/50 hover:text-foreground/80'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="tours-grid">
            {tours.filter((t) => t.category === toursTab).map((t) => (
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/20 animate-glow pointer-events-none hidden md:block" />
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