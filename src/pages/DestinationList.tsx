import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Search } from "lucide-react";
import { DESTINATIONS } from "../lib/destinations";
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
    <div className="min-h-screen bg-bg pt-32 pb-20 topo-pattern">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <span className="pill mb-4 text-[10px]">Esplora il Mondo</span>
            <h1 className="font-display text-5xl md:text-8xl text-moss uppercase leading-none tracking-tighter mt-4">
              Tutte le <br /> Destinazioni
            </h1>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-moss/30" size={18} />
            <input 
              type="text" 
              placeholder="Cerca vulcano o paese..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-clay pl-12 pr-4 py-4 rounded-md font-body text-moss focus:outline-none focus:border-moss"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white border border-clay rounded-lg overflow-hidden flex flex-col hover:border-moss transition-all hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={dest.img} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moss/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 h-8 w-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
                  <ArrowUpRight size={16} />
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-moss/40 mb-2">
                  <MapPin size={12} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{dest.country}</span>
                </div>
                <h3 className="font-display text-2xl text-moss uppercase tracking-tight mb-4 group-hover:text-sage transition-colors">
                  {dest.name}
                </h3>
                <p className="text-xs text-moss/60 line-clamp-2 font-medium mb-6 flex-1">
                  {dest.desc}
                </p>
                <Link 
                  to={`/destinazioni/${dest.id}`}
                  className="mt-auto pt-6 border-t border-clay flex items-center justify-between group-hover:border-moss transition-colors"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-moss">Dettagli Volo</span>
                  <div className="font-display text-xl font-bold text-moss italic">{dest.height}</div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="font-display text-2xl text-moss/40 uppercase italic tracking-widest">Nessuna destinazione trovata</p>
          </div>
        )}
      </div>
    </div>
  );
}
