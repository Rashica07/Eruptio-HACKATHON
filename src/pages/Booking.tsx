import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ChevronRight, Calendar, Users, CreditCard, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { DESTINATIONS } from "../lib/destinations";
import { cn } from "@/lib/utils";

const DEST_OPTIONS = Object.values(DESTINATIONS).slice(0, 8);

export default function Booking() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedDest, setSelectedDest] = useState("fuji");
  const [explorers, setExplorers] = useState(2);
  const [bookingId, setBookingId] = useState("");

  const dest = DESTINATIONS[selectedDest];
  const total = dest ? dest.price * explorers : 0;

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      if (step === 2) {
        setBookingId(`ER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
      }
      setStep(prev => prev + 1);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg pt-32 pb-20 topo-pattern flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-6">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center font-display text-xs font-bold transition-all",
                step >= s ? "bg-moss text-bg" : "bg-clay text-moss/40"
              )}>
                {s}
              </div>
              {s < 3 && <div className={cn("flex-1 h-px transition-all", step > s ? "bg-moss" : "bg-clay")} />}
            </div>
          ))}
        </div>

        <div className="bg-white border border-clay rounded-lg p-10 shadow-xl relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
              <div className="size-12 border-4 border-moss/20 border-t-moss rounded-full animate-spin" />
              <span className="font-display uppercase text-xs font-bold tracking-widest text-moss">Elaborazione...</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1 — Destination & Config */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-7"
              >
                <div className="text-center">
                  <span className="pill mb-4">Step 01 / 03</span>
                  <h2 className="font-display text-4xl text-moss uppercase tracking-tighter mt-4">Configura Volo</h2>
                </div>

                {/* Destination selector */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-moss/40 flex items-center gap-2">
                    <MapPin size={14} /> Destinazione
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                    {DEST_OPTIONS.map(d => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDest(d.id)}
                        className={cn(
                          "text-left p-3 rounded-md border text-xs font-body transition-all",
                          selectedDest === d.id
                            ? "border-moss bg-moss/5 text-moss font-bold"
                            : "border-clay text-moss/60 hover:border-moss/40"
                        )}
                      >
                        <div className="font-bold text-[11px]">{d.name}</div>
                        <div className="text-[9px] opacity-50 uppercase tracking-widest">{d.country}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-moss/40 flex items-center gap-2">
                    <Calendar size={14} /> Data di Partenza
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select className="bg-bg border border-clay p-4 rounded-md font-body text-moss focus:outline-none focus:border-moss appearance-none text-sm">
                      <option>Giorno</option>
                      {Array.from({ length: 31 }).map((_, i) => <option key={i}>{i + 1}</option>)}
                    </select>
                    <select className="bg-bg border border-clay p-4 rounded-md font-body text-moss focus:outline-none focus:border-moss appearance-none text-sm">
                      <option>Mese</option>
                      {["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"].map(m => <option key={m}>{m}</option>)}
                    </select>
                    <select className="bg-bg border border-clay p-4 rounded-md font-body text-moss focus:outline-none focus:border-moss appearance-none text-sm">
                      <option>2026</option>
                      <option>2027</option>
                    </select>
                  </div>
                </div>

                {/* Explorers */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-moss/40 flex items-center gap-2">
                    <Users size={14} /> Numero Esploratori
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map(n => (
                      <button
                        key={n}
                        onClick={() => setExplorers(n)}
                        className={cn(
                          "flex-1 py-3 rounded-md border font-display text-lg font-bold transition-all",
                          explorers === n ? "border-moss bg-moss text-bg" : "border-clay text-moss/60 hover:border-moss/40"
                        )}
                      >
                        {n === 4 ? "4+" : n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price preview */}
                {dest && (
                  <div className="bg-sage/10 border border-sage/30 rounded-md p-4 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-moss/40">Stima Totale</div>
                      <div className="font-display italic text-3xl text-moss font-bold">
                        € {total.toLocaleString("it-IT")}
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-moss/40 font-medium">
                      {dest.nights} notti<br />{explorers} {explorers === 1 ? "persona" : "persone"}
                    </div>
                  </div>
                )}

                <Button onClick={handleNext} className="bg-moss text-white rounded-none py-8 font-bold tracking-widest">
                  CONTINUA <ChevronRight size={18} />
                </Button>
              </motion.div>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-7"
              >
                <div className="text-center">
                  <span className="pill mb-4">Step 02 / 03</span>
                  <h2 className="font-display text-4xl text-moss uppercase tracking-tighter mt-4">Pagamento</h2>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="bg-bg border-2 border-moss p-5 rounded-md flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-moss" />
                      <span className="font-body font-bold text-moss text-sm">Carta di Credito / Debito</span>
                    </div>
                    <CheckCircle2 className="text-moss" size={20} />
                  </div>
                  <div className="bg-bg border border-clay p-5 rounded-md flex items-center justify-between opacity-40 cursor-not-allowed">
                    <div className="flex items-center gap-3">
                      <div className="size-5 bg-moss/20 rounded flex items-center justify-center font-bold text-[9px] text-moss">M</div>
                      <span className="font-body font-bold text-sm">Magma Pay · Prossimamente</span>
                    </div>
                  </div>
                </div>

                {/* Card mock */}
                <div className="bg-moss rounded-xl p-6 text-bg relative overflow-hidden">
                  <span className="absolute text-[120px] font-display opacity-[0.06] right-0 bottom-0 leading-none select-none">火</span>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-bg/40 mb-4">Carta di Pagamento</div>
                  <div className="font-display italic text-2xl tracking-wider mb-6">•••• •••• •••• 4242</div>
                  <div className="flex justify-between text-[10px] text-bg/60 font-bold uppercase tracking-widest">
                    <span>NOME COGNOME</span>
                    <span>12/29</span>
                  </div>
                </div>

                {/* Order summary */}
                <div className="p-5 bg-sage/10 rounded-md border border-sage/20">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-moss/40 mb-3">Riepilogo Ordine</div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-moss/70">{dest?.name} × {explorers}</span>
                    <span className="font-display text-xl font-bold text-moss">€ {total.toLocaleString("it-IT")}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-moss/40">Assicurazione viaggio</span>
                    <span className="text-xs text-moss/60">Inclusa</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-moss/40">Kit sicurezza vulcanica</span>
                    <span className="text-xs text-moss/60">Incluso</span>
                  </div>
                  <div className="h-px bg-clay my-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-moss/50">Totale</span>
                    <span className="font-display italic text-2xl font-bold text-moss">€ {total.toLocaleString("it-IT")}</span>
                  </div>
                </div>

                <Button onClick={handleNext} className="bg-moss text-white rounded-none py-8 font-bold tracking-widest">
                  CONFERMA PRENOTAZIONE
                </Button>
              </motion.div>
            )}

            {/* Step 3 — Success */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="size-24 rounded-full bg-sage/20 flex items-center justify-center"
                >
                  <CheckCircle2 className="text-moss" size={48} />
                </motion.div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-moss/40 mb-2">Prenotazione Confermata</div>
                  <h2 className="font-display text-4xl text-moss uppercase tracking-tighter mb-4">Pronto al Lancio!</h2>
                  <div className="font-display italic text-moss/40 text-sm mb-4">{bookingId}</div>
                  <p className="font-body text-moss/60 max-w-sm leading-relaxed font-medium">
                    La tua prenotazione è stata elaborata con successo. Riceverai i dettagli del volo e le coordinate GPS via email entro 24 ore.
                  </p>
                </div>

                <div className="w-full bg-sage/10 border border-sage/20 rounded-lg p-5 text-left">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-moss/40 mb-3">Dettagli Spedizione</div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-sm font-medium text-moss">{dest?.name}</span>
                    <span className="font-display italic text-xl text-moss">€ {total.toLocaleString("it-IT")}</span>
                  </div>
                  <div className="text-xs text-moss/40 mt-1">{dest?.nights} notti · {explorers} {explorers === 1 ? "persona" : "persone"}</div>
                </div>

                <div className="w-full h-px bg-clay" />

                <Button asChild variant="hero" className="w-full bg-moss text-white rounded-none py-8 font-bold tracking-widest">
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
