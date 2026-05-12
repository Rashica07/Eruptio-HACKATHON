import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BlurText } from "./BlurText";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { JapanScene } from "./JapanScene";

const PARTNERS = ["National Geographic", "Vulcano Discovery", "Extreme Travel", "Summit Experts", "Earth Watch"];

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 bg-bg topo-pattern overflow-hidden">
      {/* Three.js Japan 3D Background */}
      <JapanScene />

      {/* Dark overlay so text stays readable over the 3D scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/10 to-bg/60 pointer-events-none" style={{ zIndex: 2 }} />

      {/* Giant kanji watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-[0.03] pointer-events-none select-none" style={{ zIndex: 2 }}>
        <span className="font-display text-[600px] leading-none text-moss">火山</span>
      </div>

      {/* Content */}
      <div className="relative max-w-[var(--max)] mx-auto px-[var(--gutter)] flex flex-col items-center text-center" style={{ zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="pill mb-8">Destinazione Premium // 2026 · Da Lecco a Tokyo</span>
        </motion.div>

        <BlurText
          text="IL TUO VIAGGIO ESPLOSIVO"
          as="h1"
          className="font-display text-[clamp(50px,10vw,160px)] leading-[0.8] font-bold tracking-[-0.05em] text-moss uppercase"
          delay={0.12}
          startDelay={0.4}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="h-px w-24 bg-moss/20 mb-8" />
          <p className="font-body text-lg md:text-2xl text-moss/70 max-w-2xl leading-relaxed font-medium uppercase tracking-tight">
            Un'esperienza d'alta quota tra laghi vulcanici e spiritualità millenaria.
          </p>
        </motion.div>

        {/* Price badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.25, duration: 0.6 }}
          className="mt-8 flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-clay rounded-full px-6 py-3"
        >
          <span className="font-display text-2xl font-bold text-moss italic">€ 2.132</span>
          <div className="w-px h-5 bg-moss/20" />
          <span className="font-body text-[10px] uppercase tracking-widest text-moss/60 font-bold">2 Persone · 7 Notti · Tokyo</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-6"
        >
          <Button asChild variant="hero" className="w-full sm:w-auto bg-moss hover:bg-moss/90 text-bg rounded-none px-12 py-7 h-auto text-lg font-bold tracking-widest border-none">
            <Link to="/prenota">PRENOTA ORA</Link>
          </Button>
          <Button asChild variant="heroGlass" className="w-full sm:w-auto border-2 border-moss text-moss hover:bg-moss/5 rounded-none px-12 py-7 h-auto text-lg font-bold tracking-widest flex items-center justify-center gap-2">
            <Link to="/destinazioni/fuji" className="flex items-center gap-2">DETTAGLI <ArrowUpRight size={20} /></Link>
          </Button>
        </motion.div>

        {/* Partners */}
        <div className="mt-24 flex flex-col items-center gap-10">
          <div className="flex items-center gap-12 md:gap-24 flex-wrap justify-center opacity-40 grayscale group">
            {PARTNERS.map(p => (
              <span key={p} className="font-display italic text-xl md:text-3xl text-moss tracking-tighter hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
