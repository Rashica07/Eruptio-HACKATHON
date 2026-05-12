import { useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const STATS = [
  { value: 120,  label: "Destinazioni Attive",  suffix: "" },
  { value: 15,   label: "Anni di Esperienza",   suffix: "+" },
  { value: 99.9, label: "Tasso di Sicurezza",   suffix: "%" },
  { value: 48,   label: "Ore Tempo Risposta",   suffix: "h" },
];

function CountUp({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const dur = 2200;
    const step = end / (dur / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else { setCount(start); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toFixed(count === Math.floor(count) ? 0 : 1)}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-32 md:py-56 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover opacity-30 saturate-0 brightness-50"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-lava-field-at-night-42171-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 gradient-fade-t" />
        <div className="absolute inset-0 gradient-fade-b" />
      </div>

      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] relative z-10">
        <div className="bg-card border border-clay/60 rounded-3xl p-12 md:p-24 relative overflow-hidden">
          <div className="absolute -bottom-12 -right-12 size-72 bg-moss/5 rounded-full blur-2xl" />
          <div className="absolute -top-8 -left-8 size-48 bg-gold/5 rounded-full blur-2xl" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
            {STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left relative">
                <div className="font-display italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none text-moss tracking-tighter">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-body text-[10px] md:text-sm text-ink/35 mt-5 tracking-[0.18em] uppercase font-bold">
                  {stat.label}
                </div>
                {idx < STATS.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-px h-16 bg-clay/60" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
