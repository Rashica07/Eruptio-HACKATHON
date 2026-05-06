import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, ChevronRight, Calendar, Users, CreditCard } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setStep(prev => prev + 1);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg pt-32 pb-20 topo-pattern flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-6">
        <div className="bg-white border border-clay rounded-lg p-10 shadow-xl relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
              <div className="size-12 border-4 border-moss/20 border-t-moss rounded-full animate-spin" />
              <span className="font-display uppercase text-xs font-bold tracking-widest text-moss">Elaborazione...</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="text-center">
                  <span className="pill mb-4">Step 01/03</span>
                  <h2 className="font-display text-4xl text-moss uppercase tracking-tighter mt-4">Configura Volo</h2>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-moss/40 flex items-center gap-2">
                      <Calendar size={14} /> Data di Partenza
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <select className="bg-bg border border-clay p-4 rounded-md font-body text-moss focus:outline-none focus:border-moss appearance-none">
                        <option>Giorno</option>
                        {Array.from({length: 31}).map((_, i) => <option key={i}>{i+1}</option>)}
                      </select>
                      <select className="bg-bg border border-clay p-4 rounded-md font-body text-moss focus:outline-none focus:border-moss appearance-none">
                        <option>Mese</option>
                        {["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"].map(m => <option key={m}>{m}</option>)}
                      </select>
                      <select className="bg-bg border border-clay p-4 rounded-md font-body text-moss focus:outline-none focus:border-moss appearance-none">
                        <option>2026</option>
                        <option>2027</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-moss/40 flex items-center gap-2">
                      <Users size={14} /> Numero Esploratori
                    </label>
                    <select className="bg-bg border border-clay p-4 rounded-md font-body text-moss focus:outline-none focus:border-moss appearance-none">
                      <option>1 Esploratore</option>
                      <option>2 Esploratori</option>
                      <option>3 Esploratori</option>
                      <option>4+ Esploratori (Privato)</option>
                    </select>
                  </div>
                </div>

                <Button onClick={handleNext} className="bg-moss text-white rounded-none py-8 font-bold tracking-widest">
                  CONTINUA <ChevronRight size={18} />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="text-center">
                   <span className="pill mb-4">Step 02/03</span>
                  <h2 className="font-display text-4xl text-moss uppercase tracking-tighter mt-4">Metodo di Pagamento</h2>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="bg-bg border-2 border-moss p-6 rounded-md flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      <CreditCard className="text-moss" />
                      <span className="font-body font-bold text-moss">Carta di Credito / Debito</span>
                    </div>
                    <CheckCircle2 className="text-moss" size={20} />
                  </div>
                  <div className="bg-bg border border-clay p-6 rounded-md flex items-center justify-between opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-4">
                      <div className="size-6 bg-moss/20 rounded flex items-center justify-center font-bold text-[10px] text-moss">M</div>
                      <span className="font-body font-bold">Magma Pay</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-sage/10 rounded-md border border-sage/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-moss/60">Totale Spedizione</span>
                    <span className="font-display text-xl font-bold text-moss">€ 2.132</span>
                  </div>
                  <p className="text-[10px] text-moss/40 leading-relaxed font-medium">
                    Prezzo per 2 persone. Include voli, alloggio premium e kit di sopravvivenza.
                  </p>
                </div>

                <Button onClick={handleNext} className="bg-moss text-white rounded-none py-8 font-bold tracking-widest">
                  CONFERMA PRENOTAZIONE
                </Button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-8"
              >
                <div className="size-24 rounded-full bg-sage/20 flex items-center justify-center">
                  <CheckCircle2 className="text-moss" size={48} />
                </div>
                <div>
                  <h2 className="font-display text-4xl text-moss uppercase tracking-tighter mb-4">Pronto al Lancio!</h2>
                  <p className="font-body text-moss/60 max-w-sm leading-relaxed font-medium">
                    La tua prenotazione è stata elaborata con successo. Riceverai i dettagli del volo e le coordinate GPS via email entro 24 ore.
                  </p>
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
