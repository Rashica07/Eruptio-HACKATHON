import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, MapPin, Wind, Thermometer, Shield, Star, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { DESTINATIONS } from "../lib/destinations";
import { useState, useCallback } from "react";

const PACKAGES = [
  { label: "Classico",  suffix: "",  desc: "Volo + guida + kit sicurezza",        multiplier: 1 },
  { label: "Premium",   suffix: "+", desc: "Classico + alloggio 4★ + fotografia",  multiplier: 1.35 },
  { label: "Esclusivo", suffix: "★", desc: "Premium + elicottero privato",         multiplier: 1.8 },
];

function PhotoGallery({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);

  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* Main photo */}
      <div className="relative h-[360px] lg:h-[440px] rounded-3xl overflow-hidden border border-clay shadow-2xl group">
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx]}
            alt="Destinazione"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          />
        </AnimatePresence>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 cursor-pointer z-10"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 cursor-pointer z-10"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`rounded-full transition-all cursor-pointer ${i === idx ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${images.length}, 1fr)` }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`relative h-16 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${i === idx ? "border-moss shadow-lg shadow-moss/20" : "border-clay/40 opacity-55 hover:opacity-80 hover:border-clay"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DestinationDetail() {
  const { id } = useParams();
  const dest = id ? DESTINATIONS[id as keyof typeof DESTINATIONS] : DESTINATIONS["fuji"];

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-ink">
        <div className="text-center">
          <h1 className="text-4xl font-display italic uppercase mb-4">Destinazione non trovata</h1>
          <Button asChild><Link to="/">Torna alla home</Link></Button>
        </div>
      </div>
    );
  }

  const gallery = dest.gallery?.length ? dest.gallery : [dest.img];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 topo-pattern">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <Link to="/destinazioni" className="inline-flex items-center gap-2 text-ink/35 hover:text-moss transition-colors mb-12 font-bold uppercase text-xs tracking-widest">
          <ArrowLeft size={14} /> Tutte le Destinazioni
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-8">
            <div>
              {dest.featured && (
                <div className="flex items-center gap-1 text-gold font-bold text-[10px] uppercase tracking-widest mb-3">
                  <Star size={10} fill="currentColor" /> Destinazione in Evidenza
                </div>
              )}
              <span className="pill mb-4">{dest.country}</span>
              <h1 className="font-display italic text-5xl md:text-8xl text-ink uppercase leading-none tracking-tighter mt-4">
                {dest.name}
              </h1>
            </div>

            <p className="font-body text-lg md:text-xl text-ink/45 leading-relaxed">{dest.desc}</p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MapPin,      label: "Altitudine",  value: dest.height },
                { icon: Thermometer, label: "Temperatura", value: dest.temp },
                { icon: Wind,        label: "Stato",       value: dest.status },
                { icon: Shield,      label: "Sicurezza",   value: "Livello 1" },
                { icon: Clock,       label: "Durata",      value: `${dest.nights} notti` },
                { icon: Users,       label: "Gruppo",      value: "2–12 pers." },
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="bg-card border border-clay rounded-2xl p-5 hover:border-moss/30 transition-colors">
                  <div className="flex items-center gap-2 text-ink/30 mb-2">
                    <Icon size={14} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{label}</span>
                  </div>
                  <div className="font-display italic text-xl font-bold text-ink">{value}</div>
                </div>
              ))}
            </div>

            {/* Packages */}
            <div className="border-t border-clay/40 pt-8">
              <div className="text-[10px] font-bold uppercase tracking-widest text-ink/30 mb-4">Pacchetti Disponibili</div>
              <div className="flex flex-col gap-3">
                {PACKAGES.map((pkg, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                      i === 1
                        ? "border-moss bg-moss/10 shadow-lg shadow-moss/5"
                        : "border-clay bg-card hover:border-moss/30"
                    }`}
                  >
                    <div>
                      <div className="font-display italic uppercase text-lg tracking-tight text-ink">
                        {pkg.label} {pkg.suffix}
                      </div>
                      <div className="font-body text-xs text-ink/35 mt-0.5">{pkg.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display italic text-2xl text-gold font-bold">
                        € {Math.round(dest.price * pkg.multiplier).toLocaleString("it-IT")}
                      </div>
                      <div className="text-[9px] text-ink/30 font-bold uppercase tracking-widest">/ persona</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button asChild variant="hero" size="lg" className="w-full mt-2">
              <Link to="/prenota">PRENOTA ORA IL VOLO</Link>
            </Button>
          </motion.div>

          {/* Right — photo gallery */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="flex flex-col gap-6">
            <PhotoGallery images={gallery} />

            {/* Fuji promo */}
            {dest.featured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-moss rounded-3xl p-8 text-bg relative overflow-hidden"
              >
                <span className="absolute text-[200px] font-display opacity-[0.05] right-0 bottom-0 leading-none select-none">富</span>
                <div className="text-[10px] font-bold uppercase tracking-widest text-bg/40 mb-3">Pacchetto Esclusivo</div>
                <h3 className="font-display italic uppercase text-3xl tracking-tight mb-2">Da Lecco a Tokyo</h3>
                <p className="font-body text-bg/65 text-sm leading-relaxed mb-4">
                  15 – 22 Maggio 2027 · 7 notti · 8 giorni · totale{" "}
                  <strong className="text-white">€ 2.132</strong> per 2 persone
                </p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { v: "7",   l: "Notti" },
                    { v: "2",   l: "Persone" },
                    { v: "7",   l: "Team" },
                    { v: "€2k", l: "Budget" },
                  ].map(({ v, l }, i) => (
                    <div key={i} className="bg-white/10 rounded-2xl py-3">
                      <div className="font-display italic text-2xl text-white font-bold">{v}</div>
                      <div className="text-[8px] text-bg/45 uppercase tracking-widest mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
