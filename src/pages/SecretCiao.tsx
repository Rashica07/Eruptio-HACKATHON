import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

const MESSAGES = [
  "Hai scoperto la pagina segreta. 🌋",
  "Non molti arrivano fin qui.",
  "Sei davvero curioso, vero?",
  "Eruptio ti osserva... e approva.",
];

export default function SecretCiao() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step < MESSAGES.length - 1) {
      const t = setTimeout(() => setStep(s => s + 1), 1800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setDone(true), 2000);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden select-none">

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-moss/[0.06] blur-[120px]" />
      </div>

      {/* Subtle watermark */}
      <div className="absolute bottom-8 right-8 pointer-events-none">
        <span className="font-display text-[100px] text-ink/[0.03] leading-none">秘</span>
      </div>
      <div className="absolute top-20 left-8 pointer-events-none">
        <span className="font-display text-[70px] text-ink/[0.03] leading-none">🌋</span>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center gap-10 max-w-lg">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="pill">Pagina Segreta</span>
        </motion.div>

        {/* Ciao */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-display italic text-[clamp(80px,20vw,180px)] leading-none tracking-[-0.04em] text-ink uppercase"
        >
          Ciao.
        </motion.h1>

        {/* Cycling messages */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="font-body text-lg text-ink/50 leading-relaxed"
            >
              {MESSAGES[step]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Final CTA */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="text-5xl"
              >
                🌋
              </motion.div>

              <p className="font-body text-sm text-ink/30 uppercase tracking-[0.2em] font-bold">
                Ora sai il segreto di Eruptio.
              </p>

              <Link
                to="/"
                className="font-body text-xs text-ink/20 hover:text-ink/50 transition-colors uppercase tracking-[0.3em] font-bold"
              >
                ← Torna alla superficie
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
