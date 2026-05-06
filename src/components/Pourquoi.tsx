import { motion } from "motion/react";
import { ShieldCheck, Clock, Leaf, Award } from "lucide-react";
import { BlurText } from "./BlurText";

const REASONS = [
  { 
    icon: ShieldCheck, 
    title: "Totale Sicurezza", 
    body: "Protocolli di volo derivati dall'industria spaziale per operare in ambienti estremi." 
  },
  { 
    icon: Clock, 
    title: "Precisione Meteo", 
    body: "Analisi atmosferica in tempo reale per garantirti la vista migliore in ogni momento." 
  },
  { 
    icon: Leaf, 
    title: "Impatto Neutro", 
    body: "Ogni missione finanzia programmi di riforestazione nelle aree colpite da eruzioni." 
  },
  { 
    icon: Award, 
    title: "Certificati IFD", 
    body: "L'unica compagnia al mondo con certificazione International Flight Discovery." 
  },
];

export function Pourquoi() {
  return (
    <section id="destinazioni" className="relative py-28 md:py-40 bg-background border-t border-clay">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] flex flex-col items-center text-center">
        <span className="pill text-[10px] mb-6">Perché Eruptio</span>
        <BlurText 
          text="Eccellenza tra cielo e magma."
          className="font-display text-4xl md:text-7xl leading-[0.9] tracking-tight max-w-[15ch] text-moss"
        />
        <p className="mt-8 font-body text-moss/60 max-w-lg leading-relaxed font-medium">
          Non siamo solo una compagnia di trasporti. Siamo i tuoi partner in un viaggio che la maggior parte delle persone vedrà solo nei propri sogni.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-20 max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        {REASONS.map((reason, idx) => (
          <motion.div
            key={idx}
            className="bg-white border border-clay rounded-lg p-10 flex flex-col gap-6 min-h-[300px] hover:border-moss/40 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="bg-clay/20 rounded-lg w-16 h-16 flex items-center justify-center border border-clay">
              <reason.icon className="size-7 text-moss" />
            </div>
            <div>
              <h3 className="font-display italic text-3xl tracking-tight mb-3 text-moss">
                {reason.title}
              </h3>
              <p className="font-body text-sm text-moss/60 leading-relaxed font-medium">
                {reason.body}
              </p>
            </div>
            <div className="mt-auto h-px w-12 bg-moss/20" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
