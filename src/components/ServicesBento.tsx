import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BlurText } from "./BlurText";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    title: "Monte Fuji",
    body: "La destinazione top del 2026. Da Lecco a Tokyo: 7 notti, 8 giorni.",
    price: "€ 2.132",
    tag: "Giappone",
    img: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/fuji",
    span: "md:row-span-2 md:col-span-1",
    tall: true,
  },
  {
    title: "Etna",
    body: "Il vulcano più attivo d'Europa. Osserva le colate laviche siciliane.",
    price: "€ 890",
    tag: "Italia",
    img: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/etna",
    span: "md:col-span-1",
  },
  {
    title: "Monte Bromo",
    body: "Vivi l'alba sopra un mare di sabbia vulcanica in Indonesia.",
    price: "€ 1.480",
    tag: "Indonesia",
    img: "https://images.unsplash.com/photo-1627440439611-30d8906354cd?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/bromo",
    span: "md:col-span-1",
  },
  {
    title: "Katla · Islanda",
    body: "Ghiaccio e fuoco: il vulcano nascosto sotto il ghiacciaio più spettacolare.",
    price: "€ 1.850",
    tag: "Islanda",
    img: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/katla",
    span: "md:col-span-2",
  },
  {
    title: "Fuego",
    body: "Il fuoco perenne del Guatemala. Pura energia geologica.",
    price: "€ 1.980",
    tag: "Guatemala",
    img: "https://images.unsplash.com/photo-1541527712391-7667ff46ca79?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/fuego",
    span: "md:col-span-1",
  },
  {
    title: "Vesuvio",
    body: "Il gigante silente sopra Napoli. La storia che respira.",
    price: "€ 690",
    tag: "Italia",
    img: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/vesuvio",
    span: "md:col-span-1",
  },
  {
    title: "Kilimanjaro",
    body: "Il tetto dell'Africa. Ghiacciai eterni sopra la savana infinita.",
    price: "€ 2.890",
    tag: "Tanzania",
    img: "https://images.unsplash.com/photo-1573406830541-0e0e3a156948?auto=format&fit=crop&q=80&w=900",
    href: "/destinazioni/kilimanjaro",
    span: "md:col-span-2",
  },
];

export function ServicesBento() {
  return (
    <section id="servizi" className="relative py-28 md:py-48 bg-background topo-pattern">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] flex flex-col items-center mb-20 text-center">
        <span className="pill text-[10px] mb-6">I Nostri Servizi</span>
        <BlurText
          text="Tutto ciò che arde."
          className="font-display italic text-4xl md:text-7xl leading-[0.88] tracking-tight max-w-[14ch] text-ink uppercase"
        />
      </div>

      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[240px]">
        {SERVICES.map((service, idx) => (
          <motion.div
            key={idx}
            className={`rounded-2xl relative overflow-hidden group cursor-pointer ${service.span} ${service.tall ? "min-h-[500px]" : ""}`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06 }}
          >
            <Link to={service.href} className="absolute inset-0 z-10" />

            {/* Photo background */}
            <img
              src={service.img}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-all duration-300 group-hover:from-black/95 group-hover:via-black/60" />

            {/* Content */}
            <div className="absolute inset-0 p-7 flex flex-col justify-end">
              <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/50 mb-1">{service.tag}</div>
              <h3 className="font-display italic text-2xl md:text-3xl leading-[0.9] tracking-tight text-white mb-2 max-w-[12ch]">
                {service.title}
              </h3>
              <p className="font-body text-sm text-white/55 leading-relaxed mb-4 max-w-[30ch] hidden group-hover:block transition-all">
                {service.body}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-0.5">Da</div>
                  <div className="font-display italic text-2xl text-gold font-bold">{service.price}</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
