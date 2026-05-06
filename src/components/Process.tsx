import { BlurText } from "./BlurText";
import { motion } from "motion/react";

const PROCESS_STEPS = [
  { n: "01", title: "Consultazione", body: "Analizziamo i tuoi desideri e definiamo la rotta ideale tra le vette vulcaniche." },
  { n: "02", title: "Pianificazione", body: "Ottimizziamo la logistica e coordiniamo con le stazioni di monitoraggio geologico." },
  { n: "03", title: "Spedizione", body: "Decollo dal nostro hub privato con assistenza premium durante l'intero volo." },
  { n: "04", title: "Rientro", body: "Check-out e consegna di materiale fotografico in alta risoluzione della tua avventura." },
];

export function Process() {
  return (
    <section id="processo" className="relative py-28 md:py-48 bg-background border-t border-white/5 overflow-hidden">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] mb-24">
        <span className="liquid-glass rounded-full px-5 py-2 text-[10px] font-body text-foreground/60 uppercase tracking-[0.2em] mb-6">
          Il Nostro Metodo
        </span>
        <BlurText 
          text="Il cammino verso l'ignoto."
          className="font-display uppercase text-4xl md:text-6xl leading-[0.9] tracking-tight max-w-[12ch] mt-6"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative max-w-[var(--max)] mx-auto mb-10">
        {PROCESS_STEPS.map((step, idx) => (
          <div key={idx} className="relative px-8 md:px-12 py-12 md:py-20 flex flex-col gap-6 items-start group">
            <span className="font-display text-[100px] md:text-[180px] leading-none text-primary/10 -mb-8 select-none transition-all duration-700 group-hover:text-primary/25">
              {step.n}
            </span>
            <div className="relative z-10">
              <h3 className="font-display uppercase text-2xl md:text-3xl tracking-tight mb-4 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="font-body text-sm md:text-base text-foreground/50 leading-relaxed max-w-[24ch]">
                {step.body}
              </p>
            </div>
            
            {idx < PROCESS_STEPS.length - 1 && (
              <div className="absolute top-1/3 -right-0 h-px w-full md:w-20 bg-gradient-to-r from-border via-border to-transparent hidden md:block z-20" />
            )}
            
            <motion.div 
              className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 1 }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
