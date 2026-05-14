import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Flame } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const SYSTEM_PROMPT = `Sei Ignis, l'assistente AI di Eruptio — agenzia di viaggi specializzata in destinazioni vulcaniche d'élite. 
Rispondi sempre in italiano, in modo entusiasta, elegante e conciso (max 3-4 frasi). 
Aiuta gli utenti a scegliere destinazioni vulcaniche, fornisci info su prezzi, itinerari e prenotazioni.
Destinazioni principali: Monte Fuji (€2.934, 7 notti), Etna (€890, 4 notti), Vesuvio (€690, 3 notti), Monte Bromo (€1.480, 6 notti), Katla Islanda (€1.850, 7 notti), Arenal Costa Rica (€1.290, 5 notti), Kilimanjaro (€2.890, 9 notti), Fuego Guatemala (€1.980, 7 notti).
Il sito si chiama Eruptio. Per prenotare, indirizza gli utenti alla pagina /prenota.`;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Ciao! Sono Ignis 🌋 — il tuo assistente vulcanico. Come posso aiutarti a scegliere la prossima destinazione esplosiva?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiKey = (process.env.GEMINI_API_KEY as string) || "";
      const ai = new GoogleGenAI({ apiKey });

      const history = [...messages, userMsg];
      const prompt = `${SYSTEM_PROMPT}\n\nConversazione:\n${history.map(m => `${m.role === "user" ? "Utente" : "Ignis"}: ${m.text}`).join("\n")}\nIgnis:`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      const reply = response.text?.trim() || "Mi dispiace, non ho capito. Puoi ripetere?";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Si è verificato un errore. Riprova tra poco!" }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full bg-moss shadow-2xl shadow-moss/40 flex items-center justify-center text-bg hover:bg-moss/90 transition-colors"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Apri chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-[199] w-[calc(100vw-2rem)] sm:w-[380px] max-h-[520px] flex flex-col rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
            style={{ background: "hsl(228 38% 9%)", border: "1px solid hsl(228 28% 18%)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "hsl(228 28% 16%)", background: "hsl(228 47% 7%)" }}>
              <div className="w-9 h-9 rounded-full bg-moss/15 border border-moss/30 flex items-center justify-center">
                <Flame size={16} className="text-moss" />
              </div>
              <div>
                <div className="font-display italic font-bold text-ink text-sm leading-tight">Ignis</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-ink/35">Assistente Eruptio · AI</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] text-ink/35 font-bold uppercase tracking-wider">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-body ${
                      msg.role === "user"
                        ? "bg-moss text-bg rounded-br-sm"
                        : "text-ink/85 rounded-bl-sm"
                    }`}
                    style={msg.role === "assistant" ? { background: "hsl(228 28% 14%)", border: "1px solid hsl(228 28% 20%)" } : {}}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm" style={{ background: "hsl(228 28% 14%)", border: "1px solid hsl(228 28% 20%)" }}>
                    <div className="flex gap-1.5 items-center h-4">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-moss/60"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t flex gap-2" style={{ borderColor: "hsl(228 28% 16%)", background: "hsl(228 47% 7%)" }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Scrivi un messaggio..."
                disabled={loading}
                className="flex-1 bg-transparent text-ink text-sm font-body placeholder:text-ink/25 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-full bg-moss flex items-center justify-center text-bg hover:bg-moss/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
