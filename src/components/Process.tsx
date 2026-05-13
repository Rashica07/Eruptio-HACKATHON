import { useEffect, useRef, useState } from "react";
import { BlurText } from "./BlurText";

const STEPS = [
  {
    n: "01",
    title: "Consultazione",
    body: "Analizziamo i tuoi desideri e definiamo la rotta ideale tra le vette vulcaniche del mondo.",
    kanji: "相",
  },
  {
    n: "02",
    title: "Pianificazione",
    body: "Ottimizziamo la logistica e coordiniamo con le stazioni di monitoraggio geologico locali.",
    kanji: "計",
  },
  {
    n: "03",
    title: "Spedizione",
    body: "Decollo dal nostro hub privato con assistenza premium durante l'intero sorvolo vulcanico.",
    kanji: "飛",
  },
  {
    n: "04",
    title: "Rientro",
    body: "Check-out e consegna di materiale fotografico in alta risoluzione della tua avventura.",
    kanji: "帰",
  },
];

// Track height in vh: 1 to enter + 1 per step + 0.5 buffer
const TRACK_VH = 520;

export function Process() {
  const trackRef  = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1); // -1 = none
  const [progress, setProgress] = useState(0); // 0-1 within this section

  useEffect(() => {
    const onScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackH = trackRef.current.offsetHeight;
      const scrolled = -rect.top; // px scrolled into the track
      const scrollable = trackH - window.innerHeight;

      if (scrolled < 0 || scrolled > scrollable) {
        if (scrolled < 0) { setActive(-1); setProgress(0); }
        // Past section: keep last step active (step 3)
        return;
      }

      const p = scrolled / scrollable; // 0 → 1
      setProgress(p);

      // 4 steps, each occupying 25% of the scroll range
      const stepIdx = Math.min(Math.floor(p * 4), 3);
      setActive(stepIdx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Per-step brightness: 0=dim, 1=active
  function stepBrightness(idx: number) {
    if (active < 0) return 0;
    if (idx === active) return 1;
    if (idx < active) return 0.25; // completed
    return 0.08; // upcoming
  }

  return (
    <div ref={trackRef} style={{ height: `${TRACK_VH}vh` }} id="processo">
      {/* Sticky frame that stays fixed while user scrolls through the track */}
      <div className="sticky top-0 h-screen overflow-hidden bg-background flex flex-col items-center justify-center border-t border-clay/30">

        {/* Background: subtle perspective grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(hsl(228 47% 5%) 0%, transparent 50%, hsl(228 47% 5%) 100%),
              repeating-linear-gradient(90deg, hsl(228 28% 16% / 0.15) 0px, transparent 1px, transparent 120px, hsl(228 28% 16% / 0.15) 121px),
              repeating-linear-gradient(0deg,  hsl(228 28% 16% / 0.15) 0px, transparent 1px, transparent 80px,  hsl(228 28% 16% / 0.15) 81px)
            `,
          }}
        />

        {/* Red glow behind active step */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse 50% 60% at ${12.5 + active * 25}% 55%, hsl(6 78% 57% / 0.07) 0%, transparent 70%)`,
            opacity: active >= 0 ? 1 : 0,
          }}
        />

        {/* Header */}
        <div className="relative z-10 text-center mb-12 md:mb-16 px-6">
          <span className="pill text-[10px] mb-4 block">Il Nostro Metodo</span>
          <BlurText
            text="Il cammino verso l'ignoto."
            className="font-display italic uppercase text-3xl md:text-5xl lg:text-6xl leading-[0.88] tracking-tight text-ink"
          />
        </div>

        {/* Steps — horizontal row with 3D perspective */}
        <div
          className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12"
          style={{ perspective: "1100px" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {STEPS.map((step, idx) => {
              const brightness = stepBrightness(idx);
              const isActive = idx === active;
              const stepP = active >= 0 ? Math.max(0, Math.min((progress * 4 - idx), 1)) : 0;

              return (
                <div
                  key={idx}
                  className="relative rounded-3xl border overflow-hidden transition-all duration-600"
                  style={{
                    borderColor: isActive ? `hsl(6 78% 57% / 0.6)` : `hsl(228 28% 16% / 0.8)`,
                    background: isActive
                      ? `hsl(228 47% 5%)`
                      : `hsl(228 47% 5% / 0.6)`,
                    transform: isActive
                      ? `translateZ(0px) scale(1.03)`
                      : brightness > 0.2
                      ? `translateZ(-10px) scale(0.98)`
                      : `translateZ(-25px) scale(0.94)`,
                    opacity: brightness < 0.1 ? 0.25 : brightness < 0.3 ? 0.55 : 1,
                    transition: "all 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: isActive
                      ? `0 0 0 1px hsl(6 78% 57% / 0.3), 0 0 60px hsl(6 78% 57% / 0.12), inset 0 0 40px hsl(6 78% 57% / 0.04)`
                      : "none",
                  }}
                >
                  {/* Top: kanji watermark */}
                  <div className="absolute top-2 right-3 font-display text-6xl select-none pointer-events-none transition-all duration-500"
                    style={{ color: isActive ? `hsl(6 78% 57% / 0.12)` : `hsl(228 28% 16% / 0.6)` }}>
                    {step.kanji}
                  </div>

                  <div className="relative p-6 md:p-8 flex flex-col gap-3 min-h-[220px] md:min-h-[260px]">
                    {/* Big number */}
                    <div
                      className="font-display text-[72px] md:text-[96px] leading-none tracking-tighter font-bold transition-all duration-500 select-none"
                      style={{
                        color: isActive ? `hsl(6 78% 57%)` : `hsl(35 25% 93% / 0.06)`,
                        textShadow: isActive
                          ? `0 0 30px hsl(6 78% 57% / 0.5), 0 0 80px hsl(6 78% 57% / 0.2)`
                          : "none",
                      }}
                    >
                      {step.n}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-display italic uppercase text-xl md:text-2xl tracking-tight transition-colors duration-500"
                      style={{ color: isActive ? `hsl(35 25% 93%)` : `hsl(35 25% 93% / 0.35)` }}
                    >
                      {step.title}
                    </h3>

                    {/* Body */}
                    <p
                      className="font-body text-sm leading-relaxed transition-all duration-500"
                      style={{
                        color: `hsl(35 25% 93% / ${isActive ? 0.5 : 0.15})`,
                        transform: isActive ? "translateY(0)" : "translateY(4px)",
                      }}
                    >
                      {step.body}
                    </p>

                    {/* Progress line at bottom of active card */}
                    <div className="absolute bottom-0 left-0 h-[3px] rounded-full"
                      style={{
                        width: isActive
                          ? `${Math.max(0, Math.min((progress * 4 - idx) * 100, 100))}%`
                          : idx < active ? "100%" : "0%",
                        background: "hsl(6 78% 57%)",
                        transition: isActive ? "width 0.06s linear" : "width 0.45s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: scroll indicator */}
        <div className="relative z-10 mt-10 md:mt-14 flex flex-col items-center gap-4">
          {/* Step dots */}
          <div className="flex gap-2.5">
            {STEPS.map((_, idx) => (
              <div
                key={idx}
                className="rounded-full transition-all duration-400"
                style={{
                  width: idx === active ? "28px" : "8px",
                  height: "8px",
                  background: idx === active
                    ? "hsl(6 78% 57%)"
                    : idx < active
                    ? "hsl(6 78% 57% / 0.35)"
                    : "hsl(228 28% 16%)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            ))}
          </div>

          <p
            className="font-body text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-500"
            style={{ color: active === 3 ? "hsl(6 78% 57% / 0.7)" : "hsl(35 25% 93% / 0.2)" }}
          >
            {active === 3 ? "Continua ↓" : active >= 0 ? `Passo ${active + 1} di 4` : "Scorri per avanzare"}
          </p>
        </div>
      </div>
    </div>
  );
}
