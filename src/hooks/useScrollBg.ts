import { useEffect } from 'react';

// Sections map: scroll position % → background lightness tweak
// We shift CSS variable --scroll-bg-l between 14% (dark) and 20% (slightly lighter)
export default function useScrollBg() {
  useEffect(() => {
    const root = document.documentElement;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;

      // Create a wave: dark → light → dark → light → dark
      const wave = Math.sin(pct * Math.PI * 3);
      // Lightness range: 12% (darkest) to 20% (lightest)
      const l = 13 + wave * 4;
      root.style.setProperty('--scroll-bg-l', `${l.toFixed(1)}%`);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
