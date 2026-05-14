import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Flame, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
  error?: boolean;
}

// Client-side rate limit: min ms between sends
const CLIENT_COOLDOWN_MS = 1500;

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Ciao! Sono Ignis 🌋 — il tuo assistente vulcanico d'élite. Come posso aiutarti a scegliere la prossima destinazione esplosiva?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const lastSentAt = useRef<number>(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, messages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading || rateLimited) return;

    // Client-side cooldown
    const now = Date.now();
    if (now - lastSentAt.current < CLIENT_COOLDOWN_MS) {
      setRateLimited(true);
      setTimeout(() => setRateLimited(false), CLIENT_COOLDOWN_MS);
      return;
    }
    lastSentAt.current = now;

    const userMsg: Message = { role: "user", text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(m => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // 429 rate limit from server
        if (res.status === 429) {
          setMessages(prev => [...prev, {
            role: "assistant",
            text: data.error || "Stai scrivendo troppo velocemente. Attendi un momento.",
            error: true,
          }]);
        } else {
          setMessages(prev => [...prev, {
            role: "assistant",
            text: data.error || "Qualcosa è andato storto. Riprova tra poco.",
            error: true,
          }]);
        }
        return;
      }

      setMessages(prev => [...prev, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        text: "Connessione interrotta. Controlla la tua rete e riprova.",
        error: true,
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, rateLimited, messages]);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const canSend = !!input.trim() && !loading && !rateLimited;

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full bg-moss shadow-2xl shadow-moss/40 flex items-center justify-center text-bg hover:bg-moss/90 transition-colors"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Apri chat Ignis"
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
                <div className={`w-2 h-2 rounded-full ${loading ? "bg-gold animate-pulse" : "bg-emerald-400"}`} />
                <span className="text-[9px] text-ink/35 font-bold uppercase tracking-wider">
                  {loading ? "Risposta..." : "Online"}
                </span>
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
                  {msg.role === "assistant" && msg.error && (
                    <div className="flex-none mt-1 mr-2">
                      <AlertCircle size={13} className="text-gold/70" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-body ${
                      msg.role === "user"
                        ? "bg-moss text-bg rounded-br-sm"
                        : msg.error
                          ? "text-gold/80 rounded-bl-sm"
                          : "text-ink/85 rounded-bl-sm"
                    }`}
                    style={
                      msg.role === "assistant"
                        ? {
                            background: msg.error ? "hsl(38 40% 12%)" : "hsl(228 28% 14%)",
                            border: `1px solid ${msg.error ? "hsl(38 60% 25%)" : "hsl(228 28% 20%)"}`,
                          }
                        : {}
                    }
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
            <div className="px-4 py-3 border-t flex gap-2 items-center" style={{ borderColor: "hsl(228 28% 16%)", background: "hsl(228 47% 7%)" }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={rateLimited ? "Attendi..." : "Scrivi un messaggio..."}
                disabled={loading || rateLimited}
                maxLength={500}
                className="flex-1 bg-transparent text-ink text-sm font-body placeholder:text-ink/25 focus:outline-none disabled:opacity-40 transition-opacity"
              />
              <motion.button
                onClick={sendMessage}
                disabled={!canSend}
                whileTap={canSend ? { scale: 0.9 } : {}}
                className="w-9 h-9 rounded-full bg-moss flex items-center justify-center text-bg hover:bg-moss/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
