import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ChevronRight, Calendar, Users, CreditCard, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { DESTINATIONS } from "../lib/destinations";
import { cn } from "@/lib/utils";

const DEST_OPTIONS = Object.values(DESTINATIONS).slice(0, 8);

export default function Booking() {
  const [step,        setStep]        = useState(1);
  const [loading,     setLoading]     = useState(false);
  const [selectedDest,setSelectedDest]= useState("fuji");
  const [explorers,   setExplorers]   = useState(2);
  const [bookingId,   setBookingId]   = useState("");

  const dest  = DESTINATIONS[selectedDest];
  const total = dest ? dest.price * explorers : 0;

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      if (step === 2) setBookingId(`ER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
      setStep(prev => prev + 1);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 topo-pattern flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-6">

        {/* Progress steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all",
                step >= s ? "bg-moss text-bg shadow-lg shadow-moss/30" : "bg-card border border-clay text-ink/30"
              )}>
                {s}
              </div>
              {s < 3 && <div className={cn("flex-1 h-px transition-all", step > s ? "bg-moss" : "bg-clay/50")} />}
            </div>
          ))}
        </div>

        <div className="bg-card border border-clay rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 bg-card/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4 rounded-3xl">
              <div className="size-12 border-4 border-moss/20 border-t-moss rounded-full animate-spin" />
              <span className="font-display italic uppercase text-xs font-bold tracking-widest text-ink/50">Elaborazione...</span>
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* ── Step 1 ── */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-7">
                <div className="text-center">
                  <span className="pill mb-4">Step 01 / 03</span>
                  <h2 className="font-display italic text-4xl text-ink uppercase tracking-tighter mt-4">Configura Volo</h2>
                </div>

                {/* Destination picker */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ink/35 flex items-center gap-2">
                    <MapPin size={13} /> Destinazione
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                    {DEST_OPTIONS.map(d => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDest(d.id)}
                        className={cn(
                          "text-left p-3 rounded-xl border text-xs font-body transition-all cursor-pointer",
                          selectedDest === d.id
                            ? "border-moss bg-moss/10 text-ink font-bold"
                            : "border-clay text-ink/50 hover:border-moss/40 hover:text-ink/80"
                        )}
                      >
                        <div className="font-bold text-[11px]">{d.name}</div>
                        <div className="text-[9px] opacity-50 uppercase tracking-widest mt-0.5">{d.country}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date selectors */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ink/35 flex items-center gap-2">
                    <Calendar size={13} /> Data di Partenza
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { placeholder: "Giorno",  options: Array.from({ length: 31 }, (_, i) => `${i + 1}`) },
                      { placeholder: "Mese",    options: ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"] },
                      { placeholder: "Anno",    options: ["2026","2027"] },
                    ].map(({ placeholder, options }, i) => (
                      <select key={i} className="bg-background border border-clay p-4 rounded-xl font-body text-ink/70 text-sm focus:outline-none focus:border-moss appearance-none cursor-pointer">
                        <option>{placeholder}</option>
                        {options.map(o => <option key={o}>{o}</option>)}
                      </select>
                    ))}
                  </div>
                </div>

                {/* Explorers */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-ink/35 flex items-center gap-2">
                    <Users size={13} /> Numero Esploratori
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map(n => (
                      <button
                        key={n}
                        onClick={() => setExplorers(n)}
                        className={cn(
                          "flex-1 py-3 rounded-full border font-display italic text-lg font-bold transition-all cursor-pointer",
                          explorers === n
                            ? "border-moss bg-moss text-bg shadow-lg shadow-moss/25"
                            : "border-clay text-ink/45 hover:border-moss/40 hover:text-ink"
                        )}
                      >
                        {n === 4 ? "4+" : n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price estimate */}
                {dest && (
                  <div className="bg-moss/8 border border-moss/25 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-ink/30 mb-1">Stima Totale</div>
                      <div className="font-display italic text-3xl text-gold font-bold">
                        € {total.toLocaleString("it-IT")}
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-ink/35 font-medium">
                      {dest.nights} notti<br />{explorers} {explorers === 1 ? "persona" : "persone"}
                    </div>
                  </div>
                )}

                <Button onClick={handleNext} variant="hero" size="lg" className="gap-2 font-bold tracking-widest">
                  CONTINUA <ChevronRight size={18} />
                </Button>
              </motion.div>
            )}

            {/* ── Step 2 ── */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-7">
                <div className="text-center">
                  <span className="pill mb-4">Step 02 / 03</span>
                  <h2 className="font-display italic text-4xl text-ink uppercase tracking-tighter mt-4">Pagamento</h2>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="bg-moss/8 border-2 border-moss p-5 rounded-2xl flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-moss" size={20} />
                      <span className="font-body font-bold text-ink text-sm">Carta di Credito / Debito</span>
                    </div>
                    <CheckCircle2 className="text-moss" size={20} />
                  </div>
                  <div className="bg-card border border-clay/40 p-5 rounded-2xl flex items-center gap-3 opacity-35 cursor-not-allowed">
                    <div className="size-5 bg-moss/20 rounded-full flex items-center justify-center font-bold text-[9px] text-moss">M</div>
                    <span className="font-body text-ink/60 text-sm font-medium">Magma Pay · Prossimamente</span>
                  </div>
                </div>

                {/* Card mock */}
                <div className="bg-gradient-to-br from-moss to-moss/70 rounded-2xl p-6 text-bg relative overflow-hidden">
                  <span className="absolute text-[120px] font-display opacity-[0.06] right-0 bottom-0 leading-none select-none">火</span>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-bg/40 mb-4">Carta di Pagamento</div>
                  <div className="font-display italic text-2xl tracking-wider mb-6 text-white">•••• •••• •••• 4242</div>
                  <div className="flex justify-between text-[10px] text-bg/50 font-bold uppercase tracking-widest">
                    <span>NOME COGNOME</span>
                    <span>12/29</span>
                  </div>
                </div>

                {/* Order summary */}
                <div className="p-5 bg-card border border-clay/50 rounded-2xl">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-ink/30 mb-3">Riepilogo Ordine</div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-ink/60">{dest?.name} × {explorers}</span>
                    <span className="font-display italic text-xl font-bold text-gold">€ {total.toLocaleString("it-IT")}</span>
                  </div>
                  {["Assicurazione viaggio", "Kit sicurezza vulcanica"].map(item => (
                    <div key={item} className="flex justify-between items-center mb-1">
                      <span className="text-xs text-ink/30">{item}</span>
                      <span className="text-xs text-ink/40 font-medium">Inclusa</span>
                    </div>
                  ))}
                  <div className="h-px bg-clay/40 my-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-ink/35">Totale</span>
                    <span className="font-display italic text-2xl font-bold text-gold">€ {total.toLocaleString("it-IT")}</span>
                  </div>
                </div>

                <Button onClick={handleNext} variant="hero" size="lg" className="font-bold tracking-widest">
                  CONFERMA PRENOTAZIONE
                </Button>
              </motion.div>
            )}

            {/* ── Step 3 — Success ── */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center gap-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="size-24 rounded-full bg-moss/15 border-2 border-moss/30 flex items-center justify-center"
                >
                  <CheckCircle2 className="text-moss" size={44} />
                </motion.div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-ink/30 mb-2">Prenotazione Confermata</div>
                  <h2 className="font-display italic text-4xl text-ink uppercase tracking-tighter mb-3">Pronto al Lancio!</h2>
                  <div className="font-display italic text-ink/25 text-sm mb-4">{bookingId}</div>
                  <p className="font-body text-ink/45 max-w-sm leading-relaxed">
                    La tua prenotazione è stata elaborata. Riceverai i dettagli e le coordinate GPS via email entro 24 ore.
                  </p>
                </div>

                <div className="w-full bg-card border border-clay/50 rounded-2xl p-5 text-left">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-ink/30 mb-3">Dettagli Spedizione</div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm font-medium text-ink/70">{dest?.name}</span>
                    <span className="font-display italic text-xl text-gold">€ {total.toLocaleString("it-IT")}</span>
                  </div>
                  <div className="text-xs text-ink/30 mt-1">
                    {dest?.nights} notti · {explorers} {explorers === 1 ? "persona" : "persone"}
                  </div>
                </div>

                <Button asChild variant="hero" size="lg" className="w-full font-bold tracking-widest">
                  <Link to="/">TORNA ALLA HOME</Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
