import { motion } from "motion/react";
import { ArrowLeft, MapPin, Wind, Thermometer, Shield } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { DESTINATIONS } from "../lib/destinations";

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
        <Link to="/" className="inline-flex items-center gap-2 text-moss/60 hover:text-moss transition-colors mb-12 font-bold uppercase text-xs tracking-widest">
          <ArrowLeft size={16} /> Torna alla Home
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="pill mb-4">{dest.country}</span>
              <h1 className="font-display text-5xl md:text-8xl text-moss uppercase leading-none tracking-tighter mt-4">{dest.name}</h1>
            </div>
            
            <p className="font-body text-lg md:text-xl text-moss/70 leading-relaxed font-medium">
              {dest.desc}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-clay p-6 rounded-lg">
                <div className="flex items-center gap-3 text-moss/40 mb-3">
                  <MapPin size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Altitudine</span>
                </div>
                <div className="font-display text-3xl font-bold text-moss italic">{dest.height}</div>
              </div>
              <div className="bg-white border border-clay p-6 rounded-lg">
                <div className="flex items-center gap-3 text-moss/40 mb-3">
                  <Thermometer size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Temperatura</span>
                </div>
                <div className="font-display text-3xl font-bold text-moss italic">{dest.temp}</div>
              </div>
              <div className="bg-white border border-clay p-6 rounded-lg">
                <div className="flex items-center gap-3 text-moss/40 mb-3">
                  <Wind size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Stato</span>
                </div>
                <div className="font-display text-3xl font-bold text-moss italic">{dest.status}</div>
              </div>
              <div className="bg-white border border-clay p-6 rounded-lg">
                <div className="flex items-center gap-3 text-moss/40 mb-3">
                  <Shield size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Sicurezza</span>
                </div>
                <div className="font-display text-3xl font-bold text-moss italic">Livello 1</div>
              </div>
            </div>

            <Button asChild variant="hero" className="bg-moss text-white rounded-none py-8 mt-4">
              <Link to="/prenota">PRENOTA ORA IL VOLO</Link>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-auto rounded-lg overflow-hidden border border-clay shadow-2xl"
          >
            <img src={dest.img} className="absolute inset-0 w-full h-full object-cover" alt={dest.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-moss/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
