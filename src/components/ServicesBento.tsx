import { motion } from "motion/react";
import { Truck, Package, Globe, Building2, Sparkles, ArrowUpRight } from "lucide-react";
import { BlurText } from "./BlurText";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const SERVICES = [
  {
    icon: Globe,
    title: "Monte Fuji",
    body: "La destinazione top del 2026. Da Lecco a Tokyo: 7 notti, 8 giorni.",
    price: "€ 2.132",
    tag: "Giappone",
    className: "md:row-span-2 md:col-span-1 min-h-[480px] bg-moss text-bg border-none",
    href: "/destinazioni/fuji",
    light: true,
  },
  {
    icon: Sparkles,
    title: "Etna",
    body: "Cabine di lusso per osservare le colate laviche siciliane.",
    price: "€ 890",
    tag: "Italia",
    className: "md:col-span-1 min-h-[228px] bg-sage text-moss border-none",
    href: "/destinazioni/etna",
  },
  {
    icon: Building2,
    title: "Monte Bromo",
    body: "Vivi l'alba sopra un mare di sabbia vulcanica in Indonesia.",
    price: "€ 1.480",
    tag: "Indonesia",
    className: "md:col-span-1 min-h-[228px] bg-white border-clay",
    href: "/destinazioni/bromo",
  },
  {
    icon: Package,
    title: "Katla · Islanda",
    body: "Esplora i vulcani islandesi tra ghiaccio e fuoco. Autunno 2026.",
    price: "€ 1.850",
    tag: "Islanda",
    className: "md:col-span-2 min-h-[228px] bg-[#f8faf7] text-moss border-clay",
    href: "/destinazioni/katla",
  },
  {
    icon: Truck,
    title: "Fuego",
    body: "Il fuoco perenne del Guatemala. Pura energia geologica.",
    price: "€ 1.980",
    tag: "Guatemala",
    className: "md:col-span-1 min-h-[228px] bg-[#0c0c0b] text-white border-none",
    href: "/destinazioni/fuego",
    light: true,
  },
  {
    icon: Globe,
    title: "Vesuvio",
    body: "La storia che respira. Il gigante silente sopra Napoli.",
    price: "€ 690",
    tag: "Italia",
    className: "md:col-span-1 min-h-[228px] bg-sage text-moss border-none",
    href: "/destinazioni/vesuvio",
  },
  {
    icon: Sparkles,
    title: "Kilimanjaro",
    body: "Oltre le nuvole. Il tetto dell'Africa ti aspetta.",
    price: "€ 2.890",
    tag: "Tanzania",
    className: "md:col-span-2 min-h-[228px] bg-white border-clay text-moss",
    href: "/destinazioni/kilimanjaro",
  },
];

export function ServicesBento() {
  return (
    <section id="servizi" className="relative py-28 md:py-48 bg-background topo-pattern">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] flex flex-col items-center mb-20 text-center">
        <span className="pill text-[10px] mb-6">I Nostri Servizi</span>
        <BlurText
          text="Tutto ciò che arde. Sotto un unico cielo."
          className="font-display text-4xl md:text-7xl leading-[0.9] tracking-tight max-w-[15ch] text-moss uppercase"
        />
      </div>

      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((service, idx) => (
          <motion.div
            key={idx}
            className={cn(
              "rounded-lg p-10 relative overflow-hidden group border flex flex-col",
              service.className
            )}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className={cn(
              "rounded-full w-14 h-14 flex items-center justify-center mb-6 border border-current opacity-70",
            )}>
              <service.icon className="size-6" />
            </div>

            <div className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-50 mb-2">{service.tag}</div>

            <h3 className="font-display italic text-3xl md:text-5xl leading-[0.9] tracking-tight mb-4 max-w-[10ch] uppercase">
              {service.title}
            </h3>
            <p className="font-body text-sm md:text-base opacity-70 max-w-[30ch] leading-relaxed mb-6">
              {service.body}
            </p>

            {/* Price */}
            <div className="mb-6">
              <div className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">A partire da</div>
              <div className={cn(
                "font-display italic text-3xl font-bold",
                service.light ? "text-white" : ""
              )}>
                {service.price}
              </div>
            </div>

            <Button asChild variant="link" className={cn(
              "p-0 h-auto font-bold tracking-widest text-[10px] uppercase gap-2 items-center mt-auto justify-start",
              (service.light) ? "text-white" : "text-moss"
            )}>
              <Link to={service.href}>SCOPRI DI PIÙ <ArrowUpRight size={14} /></Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
