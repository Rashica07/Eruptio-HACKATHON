import { Quote } from "lucide-react";
import { BlurText } from "./BlurText";

const TESTIMONIALS = [
  { quote: "Volare sopra il Monte Fuji al tramonto è stata l'esperienza più incredibile della mia vita. Organizzazione impeccabile.", name: "Marco Rossi",  role: "Fotografo Discovery" },
  { quote: "Eruptio non vende solo voli, vende prospettive nuove sulla natura. Il kit di sicurezza era all'avanguardia.",             name: "Elena Bianchi", role: "Scienziata Ambientale" },
  { quote: "Professionalità e cortesia. Il team vulcanologico ci ha spiegato ogni dettaglio geologico durante il sorvolo.",           name: "Luca Verga",   role: "Geologo" },
  { quote: "Un'avventura senza eguali. Vedere la lava pulsare dall'alto è qualcosa che ti cambia dentro.",                           name: "Sara Neri",    role: "Scrittrice di Viaggi" },
  { quote: "Logistica perfetta. Anche i permessi più complicati sono stati gestiti con estrema facilità.",                           name: "Matteo Villa", role: "Imprenditore" },
  { quote: "L'attenzione ai dettagli e la sicurezza sono la loro priorità assoluta. Consigliatissimo per chi cerca l'estremo.",      name: "Giulia Ponti", role: "Esploratrice" },
];

function Card({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="bg-card border border-clay rounded-2xl p-7 md:p-10 w-[280px] sm:w-[340px] md:w-[440px] shrink-0 flex flex-col gap-6 group hover:border-moss/30 transition-all duration-300">
      <Quote className="size-7 text-moss/25 group-hover:text-moss/50 transition-colors" />
      <p className="font-body text-ink/65 font-medium leading-relaxed text-sm md:text-base italic flex-1">
        "{quote}"
      </p>
      <div className="mt-auto flex items-center justify-between border-t border-clay/60 pt-6">
        <div>
          <div className="font-display text-base md:text-lg tracking-tight font-bold text-ink">
            {name}
          </div>
          <div className="font-body text-[9px] md:text-[10px] text-ink/35 uppercase tracking-[0.2em] mt-1 font-bold">
            {role}
          </div>
        </div>
        <div className="size-11 rounded-full bg-moss/10 border border-moss/20 flex items-center justify-center font-display text-xs font-bold text-moss uppercase">
          {name.split(" ").map(n => n[0]).join("")}
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonianze" className="relative py-32 md:py-56 bg-background overflow-hidden topo-pattern">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] flex flex-col items-center mb-24 text-center">
        <span className="pill mb-8">Testimonianze</span>
        <BlurText
          text="ESPLORATORI D'ECCEZIONE."
          className="font-display italic uppercase text-4xl md:text-7xl leading-[0.85] tracking-tighter text-ink"
        />
      </div>

      <div className="relative flex flex-col gap-8 group">
        <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <Card key={i} quote={t.quote} name={t.name} role={t.role} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
