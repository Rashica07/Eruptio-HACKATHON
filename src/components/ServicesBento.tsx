import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BlurText } from "./BlurText";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    title: "Monte Fuji",
    body: "La destinazione top del 2026. Da Lecco a Tokyo: 7 notti, 8 giorni.",
    price: "€ 2.934",
    tag: "Giappone",
    img: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/fuji",
    featured: true,
  },
  {
    title: "Etna",
    body: "Il vulcano più attivo d'Europa. Osserva le colate laviche siciliane.",
    price: "€ 890",
    tag: "Italia",
    img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/etna",
  },
  {
    title: "Monte Bromo",
    body: "Vivi l'alba sopra un mare di sabbia vulcanica in Indonesia.",
    price: "€ 1.480",
    tag: "Indonesia",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/bromo",
  },
  {
    title: "Katla · Islanda",
    body: "Ghiaccio e fuoco: il vulcano nascosto sotto il ghiacciaio più spettacolare.",
    price: "€ 1.850",
    tag: "Islanda",
    img: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/katla",
    wide: true,
  },
  {
    title: "Fuego",
    body: "Il fuoco perenne del Guatemala. Pura energia geologica.",
    price: "€ 1.980",
    tag: "Guatemala",
    img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/fuego",
  },
  {
    title: "Vesuvio",
    body: "Il gigante silente sopra Napoli. La storia che respira.",
    price: "€ 690",
    tag: "Italia",
    img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/vesuvio",
  },
  {
    title: "Kilimanjaro",
    body: "Il tetto dell'Africa. Ghiacciai eterni sopra la savana infinita.",
    price: "€ 2.890",
    tag: "Tanzania",
    img: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/kilimanjaro",
    wide: true,
  },
];

function BentoCard({ service, idx, tall = false }: { service: typeof SERVICES[0]; idx: number; tall?: boolean }) {
  return (
    <motion.div
      className={`rounded-3xl relative overflow-hidden group cursor-pointer ${tall ? "h-[420px] sm:h-[500px]" : "h-[260px] sm:h-[280px]"}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.06 }}
    >
      <Link to={service.href} className="absolute inset-0 z-20" />

      <img
        src={service.img}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-moss/0 to-moss/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-0 z-10 p-5 sm:p-7 flex flex-col justify-end">
        <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/60 mb-1.5"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
          {service.tag}
        </div>

        <h3
          className="font-display italic text-2xl md:text-3xl leading-[0.92] tracking-tight text-white mb-2 max-w-[14ch]"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.95)" }}
        >
          {service.title}
        </h3>

        <p
          className={`font-body text-sm text-white/75 leading-relaxed mb-4 max-w-[28ch] ${tall ? "block" : "hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300"}`}
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
        >
          {service.body}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-[8px] font-bold uppercase tracking-widest text-white/40 mb-0.5">Da</div>
            <div className="font-display italic text-2xl text-gold font-bold" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>
              {service.price}
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-100 sm:opacity-0 sm:translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesBento() {
  const [featured, ...rest] = SERVICES;
  const nonWide = rest.filter(s => !s.wide);
  const wide = rest.filter(s => s.wide);

  return (
    <section id="servizi" className="relative py-20 md:py-48 bg-background topo-pattern">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] flex flex-col items-center mb-12 md:mb-20 text-center">
        <span className="pill text-[10px] mb-6">I Nostri Servizi</span>
        <BlurText
          text="Tutto ciò che arde."
          className="font-display italic text-4xl md:text-7xl leading-[0.88] tracking-tight max-w-[14ch] text-ink uppercase"
        />
      </div>

      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] flex flex-col gap-4">
        {/* Row 1: Featured (tall) + 2 regular */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <BentoCard service={featured} idx={0} tall />
          </div>
          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nonWide.slice(0, 2).map((s, i) => (
              <BentoCard key={s.href} service={s} idx={i + 1} />
            ))}
          </div>
        </div>

        {/* Row 2: wide + regular */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <BentoCard service={wide[0]} idx={3} />
          </div>
          <div className="sm:col-span-1">
            <BentoCard service={nonWide[2]} idx={4} />
          </div>
        </div>

        {/* Row 3: regular + wide */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <BentoCard service={nonWide[3]} idx={5} />
          </div>
          <div className="sm:col-span-2">
            <BentoCard service={wide[1]} idx={6} />
          </div>
        </div>
      </div>
    </section>
  );
}
