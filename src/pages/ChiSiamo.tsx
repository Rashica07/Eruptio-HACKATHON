import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { BlurText } from "../components/BlurText";

const TEAM = [
  {
    seed: "alpha7", role: "La Serra", kanji: "花",
    accent: "bg-moss",
    contribution: "Ha curato e allestito l'installazione fisica della serra: il cuore green del progetto, dove natura e tecnologia si incontrano.",
  },
  {
    seed: "beta3", role: "Scratch", kanji: "技",
    accent: "bg-sage",
    contribution: "Ha sviluppato l'intero progetto Scratch: animazioni, logica, interattività e presentazione ludica del viaggio vulcanico.",
  },
  {
    seed: "gamma9", role: "Sito Web", kanji: "網",
    accent: "bg-[#1a1040]",
    contribution: "Ha costruito l'intero sito web Eruptio: dalla struttura React alle animazioni, dal design al deploy — tutto da zero.",
  },
  {
    seed: "delta5", role: "Presentazione", kanji: "声",
    accent: "bg-[#1a0a0a]",
    contribution: "Ha progettato e condotto la presentazione finale del gruppo: pitch deck, narrazione e convincimento della giuria.",
  },
  {
    seed: "epsilon2", role: "Arduino & Hardware", kanji: "機",
    accent: "bg-[#0a1a0a]",
    contribution: "Ha programmato e assemblato il sistema Arduino per l'installazione fisica: sensori, LED e interfaccia hardware della serra interattiva.",
  },
  {
    seed: "zeta8", role: "Design & Grafica", kanji: "美",
    accent: "bg-[#1a1a0a]",
    contribution: "Ha creato l'identità visiva del brand: volantini, palette, loghi, flyer e tutti i materiali grafici di Eruptio.",
  },
  {
    seed: "eta1", role: "Ricerca & Contenuti", kanji: "知",
    accent: "bg-[#0a0a1a]",
    contribution: "Ha condotto la ricerca sulle destinazioni vulcaniche, i testi del sito, gli itinerari e la logistica completa del viaggio Tokyo.",
  },
];

const VALUES = [
  { kanji: "冒険", label: "Avventura",  desc: "Ogni viaggio inizia con il coraggio di esplorare l'ignoto." },
  { kanji: "信頼", label: "Fiducia",    desc: "Ogni dettaglio, dalla prenotazione al rientro, è nelle nostre mani." },
  { kanji: "革新", label: "Innovazione",desc: "Tecnologia e natura si incontrano per creare esperienze uniche." },
];

export default function ChiSiamo() {
  return (
    <div className="min-h-screen bg-background topo-pattern pt-32 pb-24">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">

        <Link to="/" className="inline-flex items-center gap-2 text-ink/35 hover:text-moss transition-colors mb-12 font-bold uppercase text-xs tracking-widest">
          <ArrowLeft size={14} /> Home
        </Link>

        <div className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="pill mb-6">Hackathon 2026 // Gruppo 4</span>
          </motion.div>
          <BlurText
            text="Chi Siamo"
            as="h1"
            className="font-display italic text-[clamp(60px,12vw,160px)] leading-[0.85] tracking-[-0.04em] text-ink uppercase"
            delay={0.1} startDelay={0.3}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="mt-8 font-body text-lg md:text-xl text-ink/45 max-w-2xl mx-auto leading-relaxed"
          >
            Siamo un team di sette esploratori digitali uniti da una passione comune: trasformare l'ordinario in straordinario. Eruptio è il frutto del nostro lavoro all'Hackathon 2026.
          </motion.p>
        </div>

        {/* Team grid — 7 members in 3+4 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-32">
          {TEAM.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="bg-card border border-clay rounded-3xl overflow-hidden group hover:border-moss/40 hover:shadow-2xl hover:shadow-moss/5 transition-all duration-500"
            >
              {/* Avatar area */}
              <div className={`${member.accent} h-48 flex items-center justify-center relative overflow-hidden`}>
                <span className="absolute inset-0 flex items-center justify-center font-display text-[160px] opacity-[0.07] select-none pointer-events-none text-white">
                  {member.kanji}
                </span>
                <div className="relative z-10 w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${member.seed}&backgroundColor=transparent`}
                    alt={member.role}
                    className="w-full h-full object-cover bg-white"
                  />
                </div>
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center font-display text-base text-white/60">
                  {member.kanji}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-2.5">
                <div className="h-px w-8 bg-moss/30 group-hover:w-full transition-all duration-500" />
                <h3 className="font-display italic uppercase text-lg tracking-tight text-moss leading-tight mt-1">
                  {member.role}
                </h3>
                <p className="font-body text-xs text-ink/40 leading-relaxed">
                  {member.contribution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="border-t border-clay/40 pt-20 mb-24">
          <div className="text-center mb-16">
            <span className="pill mb-4">I Nostri Valori</span>
            <BlurText text="Cosa ci muove." className="font-display italic text-4xl md:text-7xl leading-[0.9] tracking-tight text-ink uppercase mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-clay rounded-3xl p-10 text-center hover:border-moss/30 transition-colors group"
              >
                <div className="font-display text-5xl text-moss/20 mb-4 group-hover:text-moss/40 transition-colors">{v.kanji}</div>
                <h4 className="font-display italic uppercase text-xl tracking-tight text-ink mb-3">{v.label}</h4>
                <p className="font-body text-sm text-ink/40 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hackathon context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-moss rounded-3xl p-10 md:p-16 text-center text-bg relative overflow-hidden"
        >
          <span className="absolute text-[400px] font-display opacity-[0.04] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none leading-none">火</span>
          <span className="pill !bg-white/10 !text-white !border-white/20 mb-6">Il Progetto</span>
          <h3 className="font-display italic uppercase text-4xl md:text-6xl tracking-tight mb-6 mt-2">Da Lecco a Tokyo</h3>
          <p className="font-body text-bg/65 max-w-2xl mx-auto leading-relaxed text-lg mb-10">
            Eruptio nasce come concept di agenzia viaggi vulcanica per l'Hackathon 2026. Il pacchetto flagship: 7 notti e 8 giorni a Tokyo con visita al Monte Fuji, dal 15 al 22 Maggio 2027, a partire da{" "}
            <strong className="text-white">€ 2.132</strong> per 2 persone. Team di <strong className="text-white">7 studenti</strong>.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-center">
            {[
              { v: "7",      l: "Nel Team" },
              { v: "7",      l: "Notti" },
              { v: "2",      l: "Persone" },
              { v: "€2.132", l: "Totale" },
            ].map(({ v, l }, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="font-display italic text-4xl md:text-5xl text-white font-bold">{v}</div>
                <div className="font-body text-[10px] text-bg/45 uppercase tracking-widest mt-1 font-semibold">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
