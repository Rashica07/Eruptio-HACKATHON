import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import { DESTINATIONS } from "@/lib/destinations";

// Equirectangular projection: lat/lng → % position on a flat world map
function toXY(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat)  / 180) * 100;
  return { x, y };
}

// Subset of destinations with map coordinates
const PINS = Object.values(DESTINATIONS).filter(d => d.lat != null);

export function WorldMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ? DESTINATIONS[hovered] : null;

  return (
    <section className="py-24 bg-background border-t border-clay/30 overflow-hidden">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="pill text-[10px] mb-4 block">Mappa Vulcanica</span>
            <h2 className="font-display italic text-3xl md:text-5xl text-ink uppercase leading-none tracking-tighter">
              19 Vulcani · 4 Continenti
            </h2>
          </div>
          <p className="font-body text-ink/35 text-sm max-w-xs leading-relaxed">
            Passa il cursore su ogni punto rosso per scoprire il vulcano. Clicca per vedere la scheda completa.
          </p>
        </div>

        {/* Map container */}
        <div className="relative rounded-3xl overflow-hidden border border-clay/40 bg-card" style={{ paddingBottom: "50%" }}>
          {/* World map image — dark-tinted physical map */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Whole_world_-_land_and_oceans.jpg/1920px-Whole_world_-_land_and_oceans.jpg"
            alt="World map"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.18) saturate(0.4)", mixBlendMode: "screen" }}
          />

          {/* Tinted ocean overlay */}
          <div className="absolute inset-0" style={{ background: "hsl(228 47% 5% / 0.6)" }} />

          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            {[0,20,40,60,80].map(y => (
              <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="white" strokeWidth="0.5"/>
            ))}
            {[0,20,40,60,80,100].map(x => (
              <line key={x} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="white" strokeWidth="0.5"/>
            ))}
          </svg>

          {/* Destination pins */}
          {PINS.map(dest => {
            const { x, y } = toXY(dest.lat, dest.lng);
            const isActive = hovered === dest.id;
            return (
              <Link
                key={dest.id}
                to={`/destinazioni/${dest.id}`}
                className="absolute group"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                onMouseEnter={() => setHovered(dest.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Pulse ring */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-moss"
                    style={{ width: 10, height: 10, top: -1, left: -1 }}
                  />
                )}
                {/* Pin dot */}
                <div className={`relative w-2.5 h-2.5 rounded-full border transition-all duration-200 ${
                  dest.featured
                    ? "bg-gold border-gold/50 scale-125"
                    : isActive
                    ? "bg-moss border-moss/60 scale-150"
                    : "bg-moss/80 border-moss/40 hover:scale-150"
                }`} />
              </Link>
            );
          })}

          {/* Tooltip */}
          <AnimatePresence>
            {active && (() => {
              const { x, y } = toXY(active.lat, active.lng);
              const flipX = x > 70;
              const flipY = y > 65;
              return (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                  className="absolute z-30 pointer-events-none"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(${flipX ? "calc(-100% - 14px)" : "14px"}, ${flipY ? "calc(-100% - 6px)" : "6px"})`,
                  }}
                >
                  <div className="bg-card/95 backdrop-blur-xl border border-clay rounded-2xl overflow-hidden shadow-2xl shadow-black/60 w-48">
                    <img src={active.img + "?auto=format&fit=crop&q=70&w=300"} alt={active.name} className="w-full h-24 object-cover brightness-90" />
                    <div className="p-3">
                      <div className="flex items-center gap-1 text-ink/35 mb-1">
                        <MapPin size={9} />
                        <span className="text-[8px] font-bold uppercase tracking-widest">{active.country}</span>
                      </div>
                      <div className="font-display italic text-lg text-ink leading-tight">{active.name}</div>
                      <div className="font-display italic text-base text-gold font-bold mt-1">
                        € {active.price.toLocaleString("it-IT")}
                      </div>
                      <div className="flex items-center gap-1 text-moss text-[9px] font-bold uppercase tracking-widest mt-2">
                        Scopri <ArrowUpRight size={10} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-5 justify-end">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold border border-gold/50" />
            <span className="text-[10px] font-body text-ink/35 uppercase tracking-widest font-bold">In evidenza</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-moss/80 border border-moss/40" />
            <span className="text-[10px] font-body text-ink/35 uppercase tracking-widest font-bold">Destinazione</span>
          </div>
        </div>
      </div>
    </section>
  );
}
