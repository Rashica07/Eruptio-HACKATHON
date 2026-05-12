import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Search, Star } from "lucide-react";
import { DESTINATIONS } from "../lib/destinations";
import { WorldMap } from "../components/WorldMap";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DestinationList() {
  const [search, setSearch] = useState("");
  const allDestinations = Object.values(DESTINATIONS);

  const filtered = allDestinations.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 topo-pattern">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <span className="pill mb-4 text-[10px]">Esplora il Mondo</span>
            <h1 className="font-display italic text-5xl md:text-8xl text-ink uppercase leading-none tracking-tighter mt-4">
              Tutte le <br />Destinazioni
            </h1>
          </div>
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/25" size={18} />
            <input
              type="text"
              placeholder="Cerca vulcano o paese..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-card border border-clay pl-12 pr-4 py-4 rounded-full font-body text-ink text-sm focus:outline-none focus:border-moss placeholder:text-ink/30 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* World Map */}
      {!search && <WorldMap />}

      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className={cn(
                "group bg-card border rounded-3xl overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-moss/5 transition-all duration-300",
                dest.featured ? "border-moss/40 ring-1 ring-moss/15" : "border-clay hover:border-moss/30"
              )}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.img + "?auto=format&fit=crop&q=80&w=600"}
                  alt={dest.name}
                  className="w-full h-full object-cover brightness-90 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {dest.featured && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-moss text-bg text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    <Star size={8} fill="currentColor" /> Consigliato
                  </div>
                )}
                <div className="absolute top-3 right-3 h-8 w-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight size={14} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-ink/30 mb-2">
                  <MapPin size={11} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{dest.country}</span>
                  <span className="ml-auto text-[9px] font-bold uppercase tracking-[0.2em]">{dest.nights}N</span>
                </div>
                <h3 className="font-display italic text-2xl text-ink uppercase tracking-tight mb-2 group-hover:text-moss transition-colors duration-300">
                  {dest.name}
                </h3>
                <p className="text-xs text-ink/35 line-clamp-2 font-medium mb-4 flex-1 leading-relaxed">
                  {dest.desc}
                </p>

                <Link
                  to={`/destinazioni/${dest.id}`}
                  className="mt-auto pt-4 border-t border-clay/40 flex items-center justify-between group-hover:border-moss/30 transition-colors"
                >
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-ink/25 mb-1">Da</div>
                    <div className="font-display italic text-2xl font-bold text-gold">
                      € {dest.price.toLocaleString("it-IT")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-ink/25 mb-1">Quota</div>
                    <div className="font-display italic text-lg font-bold text-ink/40">{dest.height}</div>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="font-display italic text-2xl text-ink/20 uppercase tracking-widest">
              Nessuna destinazione trovata
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
