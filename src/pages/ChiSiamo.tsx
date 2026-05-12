import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { BlurText } from "../components/BlurText";

const TEAM = [
  {
    seed: "alpha7",
    role: "Project Lead & Strategia",
    kanji: "導",
    color: "bg-moss",
    textColor: "text-bg",
    contribution: "Coordinamento team, architettura del progetto, presentazione finale e vision complessiva.",
  },
  {
    seed: "beta3",
    role: "Frontend & 3D Dev",
    kanji: "技",
    color: "bg-sage",
    textColor: "text-moss",
    contribution: "Sviluppo React/Vite, animazioni Three.js, scroll 3D e tutta l'interazione utente.",
  },
  {
    seed: "gamma9",
    role: "UI / UX Design",
    kanji: "美",
    color: "bg-bg",
    textColor: "text-moss",
    contribution: "Design system Eruptio, palette cromatica, identità visiva, componenti Tailwind.",
  },
  {
    seed: "delta5",
    role: "Backend & API",
    kanji: "力",
    color: "bg-[#1a2340]",
    textColor: "text-white",
    contribution: "Server Express, API di prenotazione, gestione dati, deploy e infrastruttura.",
  },
  {
    seed: "epsilon2",
    role: "Research & Content",
    kanji: "知",
    color: "bg-clay",
    textColor: "text-moss",
    contribution: "Ricerca destinazioni, testi, itinerari, logistica del viaggio Lecco–Tokyo.",
  },
  {
    seed: "zeta8",
    role: "Marketing & Creative",
    kanji: "創",
    color: "bg-accent",
    textColor: "text-white",
    contribution: "Volantino, branding, pitch deck, social media e materiali di presentazione.",
  },
];

const VALUES = [
  { kanji: "冒険", label: "Avventura", desc: "Ogni viaggio inizia con il coraggio di esplorare l'ignoto." },
  { kanji: "信頼", label: "Fiducia", desc: "Ogni dettaglio, dalla prenotazione al rientro, è nelle nostre mani." },
  { kanji: "革新", label: "Innovazione", desc: "Tecnologia e natura si incontrano per creare esperienze uniche." },
];

export default function ChiSiamo() {
  return (
    <div className="min-h-screen bg-bg topo-pattern pt-32 pb-24">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">

        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-moss/50 hover:text-moss transition-colors mb-12 font-bold uppercase text-xs tracking-widest">
          <ArrowLeft size={14} /> Home
        </Link>

        {/* Header */}
        <div className="text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="pill mb-6">Hackathon 2024 // Gruppo 4</span>
          </motion.div>
          <BlurText
            text="Chi Siamo"
            as="h1"
            className="font-display text-[clamp(60px,12vw,160px)] leading-[0.85] tracking-[-0.04em] text-moss uppercase"
            delay={0.1}
            startDelay={0.3}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 font-body text-lg md:text-xl text-moss/60 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Siamo un team di sei esploratori digitali uniti da una passione comune: trasformare l'ordinario in straordinario. Eruptio è il frutto del nostro lavoro al Hackathon 2024.
          </motion.p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {TEAM.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white border border-clay rounded-xl overflow-hidden group hover:border-moss/40 hover:shadow-xl transition-all duration-500"
            >
              {/* Avatar area */}
              <div className={`${member.color} h-52 flex items-center justify-center relative overflow-hidden`}>
                {/* Decorative bg kanji */}
                <span className="absolute inset-0 flex items-center justify-center font-display text-[180px] opacity-[0.06] select-none pointer-events-none text-white">
                  {member.kanji}
                </span>

                {/* Avatar image — swap with real photo */}
                <div className="relative z-10 w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${member.seed}&backgroundColor=transparent`}
                    alt={member.role}
                    className="w-full h-full object-cover bg-white"
                  />
                </div>

                {/* Kanji badge */}
                <div className={`absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-display text-lg ${member.textColor === 'text-white' ? 'text-white' : 'text-white'}`}>
                  {member.kanji}
                </div>
              </div>

              {/* Info */}
              <div className="p-7 flex flex-col gap-3">
                <div className="h-px w-10 bg-moss/20" />
                <h3 className="font-display uppercase text-xl tracking-tight text-moss leading-tight">
                  {member.role}
                </h3>
                <p className="font-body text-sm text-moss/60 leading-relaxed font-medium">
                  {member.contribution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values section */}
        <div className="border-t border-clay pt-20 mb-24">
          <div className="text-center mb-16">
            <span className="pill mb-4">I Nostri Valori</span>
            <BlurText
              text="Cosa ci muove."
              className="font-display text-4xl md:text-7xl leading-[0.9] tracking-tight text-moss uppercase mt-6"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-clay rounded-xl p-10 text-center hover:border-moss/30 transition-colors"
              >
                <div className="font-display text-6xl text-moss/20 mb-4">{v.kanji}</div>
                <h4 className="font-display uppercase text-2xl tracking-tight text-moss mb-3">{v.label}</h4>
                <p className="font-body text-sm text-moss/60 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hackathon context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-moss rounded-2xl p-10 md:p-16 text-center text-bg relative overflow-hidden"
        >
          <span className="absolute text-[400px] font-display opacity-[0.04] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none leading-none">火</span>
          <span className="pill bg-white/10 text-white mb-6">Il Progetto</span>
          <h3 className="font-display uppercase text-4xl md:text-6xl tracking-tight mb-6">
            Da Lecco a Tokyo
          </h3>
          <p className="font-body text-bg/70 max-w-2xl mx-auto leading-relaxed text-lg mb-10">
            Eruptio nasce come concept di agenzia viaggi vulcanica per l'Hackathon 2024. Il pacchetto flagship: 7 notti e 8 giorni a Tokyo con visita al Monte Fuji, dal 15 al 22 Maggio 2027, a partire da <strong className="text-white">€ 2.132</strong> per 2 persone.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <div className="font-display italic text-5xl text-white">7</div>
              <div className="font-body text-[10px] text-bg/50 uppercase tracking-widest mt-1">Notti</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="font-display italic text-5xl text-white">2</div>
              <div className="font-body text-[10px] text-bg/50 uppercase tracking-widest mt-1">Persone</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="font-display italic text-5xl text-white">€2.132</div>
              <div className="font-body text-[10px] text-bg/50 uppercase tracking-widest mt-1">Totale</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="font-display italic text-5xl text-white">6</div>
              <div className="font-body text-[10px] text-bg/50 uppercase tracking-widest mt-1">Team</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
