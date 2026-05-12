import { BlurText } from "./BlurText";
import { motion } from "motion/react";

const PROCESS_STEPS = [
  { n: "01", title: "Consultazione", body: "Analizziamo i tuoi desideri e definiamo la rotta ideale tra le vette vulcaniche." },
  { n: "02", title: "Pianificazione", body: "Ottimizziamo la logistica e coordiniamo con le stazioni di monitoraggio geologico." },
  { n: "03", title: "Spedizione",    body: "Decollo dal nostro hub privato con assistenza premium durante l'intero volo." },
  { n: "04", title: "Rientro",       body: "Check-out e consegna di materiale fotografico in alta risoluzione della tua avventura." },
];

export function Process() {
  return (
    <section id="processo" className="relative py-28 md:py-48 bg-background border-t border-clay/30 overflow-hidden">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] mb-24">
        <span className="pill text-[10px] mb-6 block">Il Nostro Metodo</span>
        <BlurText
          text="Il cammino verso l'ignoto."
          className="font-display italic uppercase text-4xl md:text-6xl leading-[0.88] tracking-tight max-w-[12ch] mt-6 text-ink"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative max-w-[var(--max)] mx-auto mb-10">
        {PROCESS_STEPS.map((step, idx) => (
          <div key={idx} className="relative px-8 md:px-12 py-12 md:py-20 flex flex-col gap-6 items-start group border-t border-clay/30 md:border-t-0 md:border-l border-l-clay/30">
            <span className="font-display text-[100px] md:text-[160px] leading-none text-moss/8 -mb-8 select-none transition-all duration-700 group-hover:text-moss/20">
              {step.n}
            </span>
            <div className="relative z-10">
              <h3 className="font-display italic uppercase text-2xl md:text-3xl tracking-tight mb-4 text-ink group-hover:text-moss transition-colors duration-300">
                {step.title}
              </h3>
              <p className="font-body text-sm md:text-base text-ink/40 leading-relaxed max-w-[24ch]">
                {step.body}
              </p>
            </div>

            <motion.div
              className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-moss/40 to-transparent"
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
