'use client';
import { useEffect, useRef, useState } from 'react';

const FONT = 'Arial, Helvetica, sans-serif';

const kpis = [
  { target: 5,  suffix: '+', label: 'Jahre Zoho Erfahrung' },
  { target: 25, suffix: '+', label: 'Implementierungen' },
];

function useCountUp(target: number, duration = 800, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    setCount(0);
    let startTime: number | null = null;
    let rafId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out quadratic (less deceleration at the end)
      const eased = 1 - Math.pow(1 - progress, 2);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, duration]);

  return count;
}

function KpiItem({ target, suffix, label, started }: {
  target: number; suffix: string; label: string; started: boolean;
}) {
  const count = useCountUp(target, 1200, started);
  return (
    <div className="flex flex-col items-center gap-3">
      <span
        className="font-bold leading-none tabular-nums"
        style={{ fontSize: 'clamp(5rem, 14vw, 9rem)', fontFamily: FONT }}
      >
        {count}{suffix}
      </span>
      <span
        className="text-black/45 text-center"
        style={{ fontSize: '20px', fontFamily: FONT }}
      >
        {label}
      </span>
    </div>
  );
}

export default function KpiSection() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setStarted(entry.isIntersecting); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section section-white">
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
        {kpis.map((kpi) => (
          <KpiItem key={kpi.label} {...kpi} started={started} />
        ))}
      </div>
    </section>
  );
}
