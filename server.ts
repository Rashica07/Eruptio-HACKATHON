import express, { Request, Response, NextFunction } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Rate limiter (in-memory, sliding window) ─────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 15;           // max requests per window per IP

const ipRequestLog = new Map<string, number[]>();

function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim()
    || req.socket.remoteAddress
    || "unknown";

  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const timestamps = (ipRequestLog.get(ip) || []).filter(t => t > windowStart);
  timestamps.push(now);
  ipRequestLog.set(ip, timestamps);

  // Purge old IPs every 1000 requests to prevent memory leaks
  if (ipRequestLog.size > 1000) {
    for (const [key, times] of ipRequestLog.entries()) {
      if (times.every(t => t <= windowStart)) ipRequestLog.delete(key);
    }
  }

  if (timestamps.length > RATE_LIMIT_MAX) {
    return res.status(429).json({
      error: "Troppe richieste. Attendi un momento prima di inviare altri messaggi.",
      retryAfter: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000),
    });
  }

  next();
}

// ── Ignis system prompt ───────────────────────────────────────────────────────
const IGNIS_SYSTEM_PROMPT = `
[IDENTITY]
You are IGNIS — the elite AI travel concierge for ERUPTIO, the world's premier volcanic expedition agency. You were engineered for precision, passion, and conversion.

[CORE OBJECTIVE]
- Guide users toward the perfect volcanic destination with expert-level knowledge
- Provide accurate geological, logistical, and pricing information
- Convert interest into confirmed bookings at /prenota
- Deliver responses that feel premium, authoritative, and personalized

[BEHAVIOR RULES]
- ALWAYS respond in Italian
- Keep responses concise and high-impact (max 4 sentences)
- Be enthusiastic but precise — never vague, never generic
- If the user asks to book: direct them to /prenota
- If asked off-topic: redirect gracefully to volcanic travel
- Never invent prices, durations, or facts not listed below

[DESTINATION INTELLIGENCE]
| Destinazione     | Paese          | Prezzo | Durata   | Status               |
|------------------|----------------|--------|----------|----------------------|
| Monte Fuji       | Giappone       | €2.934 | 7 notti  | Attivo               |
| Etna             | Italia         | €890   | 4 notti  | Attivo               |
| Vesuvio          | Italia         | €690   | 3 notti  | Dormiente            |
| Monte Bromo      | Indonesia      | €1.480 | 6 notti  | Attivo               |
| Katla            | Islanda        | €1.850 | 7 notti  | Attivo               |
| Arenal           | Costa Rica     | €1.290 | 5 notti  | Dormiente            |
| Stromboli        | Italia         | €780   | 3 notti  | Eruzioni continue    |
| Kilimanjaro      | Tanzania       | €2.890 | 9 notti  | Quiescente           |
| Fuego            | Guatemala      | €1.980 | 7 notti  | Eruzioni costanti    |
| Mauna Loa        | USA · Hawaii   | €3.200 | 10 notti | Attivo               |
| Mauna Kea        | USA · Hawaii   | €3.100 | 9 notti  | Dormiente            |
| Askja            | Islanda        | €1.750 | 7 notti  | Attivo               |
| Campi Flegrei    | Italia         | €720   | 3 notti  | Attivo               |
| Monte Epomeo     | Italia · Ischia| €580   | 2 notti  | Inattivo             |

[OUTPUT QUALITY STANDARD]
Every response must feel like:
- a consultation with a world-class volcanic expedition specialist
- premium, precise, personalized — never generic
- an experience that makes the user want to book immediately
`.trim();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

  app.use(express.json({ limit: "16kb" }));

  // ── Health check ────────────────────────────────────────────────────────────
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", version: "1.0.0" });
  });

  // ── Booking endpoint ────────────────────────────────────────────────────────
  app.post("/api/booking", (req, res) => {
    const { destination, explorers, date } = req.body;
    console.log(`Booking: ${destination} × ${explorers} on ${date}`);
    res.json({
      success: true,
      bookingId: `ER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    });
  });

  // ── Chat endpoint ────────────────────────────────────────────────────────────
  app.post("/api/chat", rateLimiter, async (req, res) => {
    const { messages } = req.body;

    // Input validation
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Payload non valido." });
    }
    if (messages.length > 40) {
      return res.status(400).json({ error: "Conversazione troppo lunga. Riavvia la chat." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[chat] GEMINI_API_KEY not set");
      return res.status(503).json({ error: "Servizio AI temporaneamente non disponibile." });
    }

    // Build prompt — prepend system prompt, then interleave conversation
    const conversationText = messages
      .map((m: { role: string; text: string }) => {
        const speaker = m.role === "user" ? "Utente" : "Ignis";
        // Sanitize: strip any prompt injection attempts
        const safeText = String(m.text).slice(0, 500).replace(/[<>]/g, "");
        return `${speaker}: ${safeText}`;
      })
      .join("\n");

    const fullPrompt = `${IGNIS_SYSTEM_PROMPT}\n\n[CONVERSAZIONE]\n${conversationText}\nIgnis:`;

    try {
      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: fullPrompt,
        config: {
          maxOutputTokens: 256,
          temperature: 0.75,
          topP: 0.9,
        },
      });

      const reply = response.text?.trim();
      if (!reply) throw new Error("Empty response from model");

      res.json({ reply });
    } catch (err: any) {
      console.error("[chat] Gemini error:", err?.message ?? err);
      const status = err?.status ?? err?.response?.status;
      if (status === 429) {
        return res.status(429).json({ error: "Ignis sta ricevendo troppe richieste. Aspetta qualche secondo e riprova." });
      }
      res.status(502).json({ error: "Ignis non è disponibile al momento. Riprova tra poco." });
    }
  });

  // ── Vite / static ────────────────────────────────────────────────────────────
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
