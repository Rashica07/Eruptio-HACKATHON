import { Quote } from "lucide-react";
import { BlurText } from "./BlurText";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  { quote: "Volare sopra il Monte Fuji al tramonto è stata l'esperienza più incredibile della mia vita. Organizzazione impeccabile.", name: "Marco Rossi", role: "Fotografo Discovery" },
  { quote: "Eruptio non vende solo voli, vende prospettive nuove sulla natura. Il kit di sicurezza era all'avanguardia.", name: "Elena Bianchi", role: "Scienziata Ambientale" },
  { quote: "Professionalità e cortesia. Il team vulcanologico ci ha spiegato ogni dettaglio geologico durante il sorvolo.", name: "Luca Verga", role: "Geologo" },
  { quote: "Un'avventura senza eguali. Vedere la lava pulsare dall'alto è qualcosa che ti cambia dentro.", name: "Sara Neri", role: "Scrittrice di Viaggi" },
  { quote: "Logistica perfetta. Anche i permessi più complicati sono stati gestiti con estrema facilità.", name: "Matteo Villa", role: "Imprenditore" },
  { quote: "L'attenzione ai dettagli e la sicurezza sono la loro priorità assoluta. Consigliatissimo per chi cerca l'estremo.", name: "Giulia Ponti", role: "Esploratrice" },
];

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  key?: number | string;
}

function Card({ quote, name, role }: TestimonialProps) {
  return (
    <div className="bento-card rounded-lg p-6 md:p-10 w-[280px] sm:w-[340px] md:w-[450px] shrink-0 flex flex-col gap-6 md:gap-8 group">
      <Quote className="size-6 md:size-8 text-moss/20 group-hover:text-moss/40 transition-colors" />
      <p className="font-body text-moss/80 font-medium leading-relaxed text-sm md:text-lg italic">
        "{quote}"
      </p>
      <div className="mt-auto flex items-center justify-between border-t border-clay pt-6">
        <div>
          <div className="font-display uppercase text-base md:text-lg tracking-tight font-bold text-moss">
            {name}
          </div>
          <div className="font-body text-[9px] md:text-[10px] text-moss/40 uppercase tracking-[0.2em] mt-1 font-bold">
            {role}
          </div>
        </div>
        <div className="size-10 md:size-12 rounded-full bg-sage/20 border border-clay flex items-center justify-center font-display text-[10px] md:text-xs font-bold text-moss uppercase">
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
          className="font-display uppercase text-5xl md:text-8xl leading-[0.85] tracking-tighter text-moss"
        />
      </div>

      <div className="relative flex flex-col gap-8 group">
        <div className="flex gap-8 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <Card key={i} quote={t.quote} name={t.name} role={t.role} />
          ))}
        </div>
        
        {/* Fades */}
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

