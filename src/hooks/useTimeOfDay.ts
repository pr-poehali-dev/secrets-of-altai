import { useEffect, useState } from 'react';

export type TimeOfDay = 'night' | 'dawn' | 'day' | 'dusk';

function getTimeOfDay(): TimeOfDay {
  const h = new Date().getHours();
  if (h >= 22 || h < 5) return 'night';
  if (h >= 5 && h < 9) return 'dawn';
  if (h >= 9 && h < 18) return 'day';
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
export const TIME_IMG_INDEX: Record<TimeOfDay, number> = {
  night: 1, // dark/night image
  dawn:  2, // sunrise image
  day:   0, // daytime/dusk image
  dusk:  0, // evening image
};

export const TIME_LABEL: Record<TimeOfDay, string> = {
  night: '🌑 Ночь над Алтаем',
  dawn:  '🌅 Рассвет в горах',
  day:   '☀️ День странствий',
  dusk:  '🌄 Закат над хребтом',
};
