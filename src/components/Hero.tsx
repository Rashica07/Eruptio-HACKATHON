import { motion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { BlurText } from "./BlurText";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { JapanScene } from "./JapanScene";

const PARTNERS = ["National Geographic", "Vulcano Discovery", "Extreme Travel", "Summit Experts"];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
      style={{ background: "hsl(228 47% 5%)" }}
    >
      {/* Real photo base layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&q=80&w=1920"
          alt="Monte Fuji"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.18 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(228 47% 5% / 0.3) 0%, hsl(228 47% 5% / 0.7) 60%, hsl(228 47% 5%) 100%)" }} />
      </div>

      {/* Three.js / Canvas Japan scene */}
      <JapanScene />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: "radial-gradient(ellipse 80% 60% at 50% 100%, transparent 40%, hsl(228 47% 5% / 0.6) 100%)" }} />

      {/* Content */}
      <div className="relative max-w-[var(--max)] mx-auto px-[var(--gutter)] flex flex-col items-center text-center" style={{ zIndex: 10 }}>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="inline-flex items-center gap-2 bg-moss/15 border border-moss/30 rounded-full px-4 py-2 mb-8">
            <MapPin size={12} className="text-moss" />
            <span className="text-moss font-body font-bold text-[10px] uppercase tracking-widest">
              Da Lecco a Tokyo · Hackathon 2026
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <BlurText
          text="IL TUO VIAGGIO ESPLOSIVO"
          as="h1"
          className="font-display text-[clamp(44px,9vw,140px)] leading-[0.88] font-black tracking-[-0.03em] text-ink uppercase"
          delay={0.11}
          startDelay={0.35}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="mt-7 font-body text-base md:text-xl text-ink/55 max-w-xl leading-relaxed"
        >
          Un'esperienza d'alta quota tra laghi vulcanici, torii di cinabro e spiritualità millenaria.
        </motion.p>

        {/* Price chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-6 flex items-center gap-3 bg-ink/5 backdrop-blur-sm border border-ink/10 rounded-full px-6 py-3"
        >
          <span className="font-display italic text-2xl font-bold text-gold">€ 2.132</span>
          <div className="w-px h-5 bg-ink/20" />
          <span className="font-body text-[10px] uppercase tracking-widest text-ink/50 font-semibold">2 Persone · 7 Notti · Tokyo</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button asChild variant="hero" size="lg">
            <Link to="/prenota">PRENOTA ORA</Link>
          </Button>
          <Button asChild variant="heroGlass" size="lg">
            <Link to="/destinazioni/fuji" className="flex items-center gap-2">
              DETTAGLI <ArrowUpRight size={18} />
            </Link>
          </Button>
        </motion.div>

        {/* Partners strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mt-20 flex flex-col items-center gap-5"
        >
          <div className="text-[9px] font-body font-bold uppercase tracking-[0.3em] text-ink/25">Partner Ufficiali</div>
          <div className="flex items-center gap-8 md:gap-16 flex-wrap justify-center">
            {PARTNERS.map(p => (
              <span key={p} className="font-display italic text-base md:text-xl text-ink/25 tracking-tight hover:text-ink/50 transition-colors cursor-default">
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-moss/60 to-transparent"
        />
        <span className="text-[8px] font-body font-bold uppercase tracking-[0.3em] text-ink/25">Scorri</span>
      </motion.div>
    </section>
  );
}
