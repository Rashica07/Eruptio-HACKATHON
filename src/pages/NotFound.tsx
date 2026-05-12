import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background topo-pattern flex items-center justify-center px-6 relative overflow-hidden">

      {/* Giant 404 watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[clamp(200px,40vw,500px)] leading-none text-moss/[0.05] font-bold">
          404
        </span>
      </div>

      {/* Japanese kanji watermarks */}
      <div className="absolute bottom-10 right-10 pointer-events-none select-none">
        <span className="font-display text-[120px] text-ink/[0.04] leading-none">迷</span>
      </div>
      <div className="absolute top-24 left-10 pointer-events-none select-none">
        <span className="font-display text-[80px] text-ink/[0.04] leading-none">道</span>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center gap-8 max-w-xl">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <span className="pill mb-6">Errore 404</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
          <h1 className="font-display italic text-[clamp(60px,15vw,140px)] leading-[0.85] tracking-[-0.04em] text-ink uppercase">
            Pagina<br />Perduta
          </h1>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
          className="font-body text-lg text-ink/45 leading-relaxed max-w-sm">
          Sembra che tu ti sia avventurato troppo lontano dalla rotta vulcanica. Questa pagina non esiste.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-5xl select-none">
          🌋
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button asChild variant="hero" size="lg" className="gap-2">
            <Link to="/"><Home size={16} /> TORNA ALLA HOME</Link>
          </Button>
          <Button asChild variant="heroGlass" size="lg" className="gap-2">
            <Link to="/destinazioni"><ArrowLeft size={16} /> DESTINAZIONI</Link>
          </Button>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="font-body text-[10px] text-ink/20 uppercase tracking-[0.25em] font-bold">
          迷 — Smarrito // Eruptio 2026
        </motion.p>
      </div>
    </div>
  );
}
