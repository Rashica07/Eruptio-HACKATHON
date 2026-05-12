import { motion } from "motion/react";
import { ArrowLeft, MapPin, Wind, Thermometer, Shield, Star, Clock, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { DESTINATIONS } from "../lib/destinations";

const PACKAGES = [
  { label: "Classico", suffix: "", desc: "Volo + guida + kit sicurezza", multiplier: 1 },
  { label: "Premium", suffix: "+", desc: "Classico + alloggio 4★ + foto", multiplier: 1.35 },
  { label: "Esclusivo", suffix: "★", desc: "Premium + elicottero privato", multiplier: 1.8 },
];

export default function DestinationDetail() {
  const { id } = useParams();
  const dest = id ? DESTINATIONS[id as keyof typeof DESTINATIONS] : DESTINATIONS["fuji"];

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-moss">
        <div className="text-center">
          <h1 className="text-4xl font-display uppercase mb-4">Destinazione non trovata</h1>
          <Button asChild variant="link">
            <Link to="/">Torna alla home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-32 pb-20 topo-pattern">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <Link to="/destinazioni" className="inline-flex items-center gap-2 text-moss/60 hover:text-moss transition-colors mb-12 font-bold uppercase text-xs tracking-widest">
          <ArrowLeft size={16} /> Tutte le Destinazioni
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div>
              {dest.featured && (
                <div className="flex items-center gap-1 text-moss font-bold text-[10px] uppercase tracking-widest mb-3">
                  <Star size={10} fill="currentColor" /> Destinazione in Evidenza
                </div>
              )}
              <span className="pill mb-4">{dest.country}</span>
              <h1 className="font-display text-5xl md:text-8xl text-moss uppercase leading-none tracking-tighter mt-4">{dest.name}</h1>
            </div>

            <p className="font-body text-lg md:text-xl text-moss/70 leading-relaxed font-medium">
              {dest.desc}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: "Altitudine", value: dest.height },
                { icon: Thermometer, label: "Temperatura", value: dest.temp },
                { icon: Wind, label: "Stato", value: dest.status },
                { icon: Shield, label: "Sicurezza", value: "Livello 1" },
                { icon: Clock, label: "Durata", value: `${dest.nights} notti` },
                { icon: Users, label: "Gruppo", value: "2–12 pers." },
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="bg-white border border-clay p-5 rounded-lg">
                  <div className="flex items-center gap-2 text-moss/40 mb-2">
                    <Icon size={16} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
                  </div>
                  <div className="font-display text-2xl font-bold text-moss italic">{value}</div>
                </div>
              ))}
            </div>

            {/* Packages */}
            <div className="border-t border-clay pt-8">
              <div className="text-[10px] font-bold uppercase tracking-widest text-moss/40 mb-4">Pacchetti Disponibili</div>
              <div className="flex flex-col gap-3">
                {PACKAGES.map((pkg, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-5 rounded-lg border transition-all ${i === 1 ? "border-moss bg-moss/5" : "border-clay bg-white"}`}
                  >
                    <div>
                      <div className="font-display uppercase text-lg tracking-tight text-moss">
                        {pkg.label} {pkg.suffix}
                      </div>
                      <div className="font-body text-xs text-moss/50 mt-0.5">{pkg.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display italic text-2xl text-moss font-bold">
                        € {Math.round(dest.price * pkg.multiplier).toLocaleString("it-IT")}
                      </div>
                      <div className="text-[9px] text-moss/40 font-bold uppercase tracking-widest">/ persona</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button asChild variant="hero" className="bg-moss text-white rounded-none py-8 mt-2">
              <Link to="/prenota">PRENOTA ORA IL VOLO</Link>
            </Button>
          </motion.div>

          {/* Right column — image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden border border-clay shadow-2xl">
              <img src={dest.img} className="absolute inset-0 w-full h-full object-cover" alt={dest.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-moss/50 to-transparent" />

              {/* Price overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-md rounded-lg p-5 border border-white/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-moss/50 mb-1">A partire da</div>
                      <div className="font-display italic text-4xl text-moss font-bold">
                        € {dest.price.toLocaleString("it-IT")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-moss/50 mb-1">Durata</div>
                      <div className="font-display italic text-2xl text-moss">{dest.nights} notti</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Japan flyer promo — only for Fuji */}
            {dest.featured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-moss rounded-lg p-8 text-bg relative overflow-hidden"
              >
                <span className="absolute text-[200px] font-display opacity-[0.05] right-0 bottom-0 leading-none select-none">富</span>
                <div className="text-[10px] font-bold uppercase tracking-widest text-bg/50 mb-3">Pacchetto Esclusivo</div>
                <h3 className="font-display uppercase text-3xl tracking-tight mb-2">Da Lecco a Tokyo</h3>
                <p className="font-body text-bg/70 text-sm leading-relaxed mb-4">
                  15 – 22 Maggio 2027 · 7 notti · 8 giorni · costo totale <strong className="text-white">€ 2.132</strong> per 2 persone
                </p>
                <img src="/flyer-giappone.png" alt="Volantino Giappone" className="w-full rounded-md opacity-90 border border-white/10" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
