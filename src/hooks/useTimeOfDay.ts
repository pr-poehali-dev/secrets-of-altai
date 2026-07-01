import { useEffect, useState } from 'react';

export type TimeOfDay = 'night' | 'dawn' | 'morning' | 'day' | 'dusk';

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours();
  if (h >= 22 || h < 5) return 'night';
  if (h >= 5 && h < 9) return 'dawn';
  if (h >= 9 && h < 11) return 'morning';
  if (h >= 11 && h < 18) return 'day';
  return 'dusk';
}

// Returns index into HERO_IMGS and a label
export function useTimeOfDay() {
  const [time, setTime] = useState<TimeOfDay>(getTimeOfDay);

  useEffect(() => {
    // Re-check every minute
    const id = setInterval(() => setTime(getTimeOfDay()), 60_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

// Map time → hero image index
// 0 = вечер, 1 = ночь, 2 = день (орлы), 3 = утро (рассвет), 4 = полдень (река)
export const TIME_IMG_INDEX: Record<TimeOfDay, number> = {
  night:   1,
  dawn:    3,
  morning: 4,
  day:     2,
  dusk:    0,
};

export const TIME_LABEL: Record<TimeOfDay, string> = {
  night:   '🌑 Ночь над Алтаем',
  dawn:    '🌅 Рассвет в горах',
  morning: '🌤️ Утро у реки',
  day:     '☀️ День странствий',
  dusk:    '🌄 Закат над хребтом',
};