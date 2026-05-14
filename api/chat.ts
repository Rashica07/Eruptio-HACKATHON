import { GoogleGenAI } from "@google/genai";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 15;
const ipRequestLog = new Map<string, number[]>();

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

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (ipRequestLog.get(ip) || []).filter((t) => t > windowStart);
  timestamps.push(now);
  ipRequestLog.set(ip, timestamps);

  if (timestamps.length > RATE_LIMIT_MAX) {
    return res.status(429).json({
      error: "Troppe richieste. Attendi un momento prima di inviare altri messaggi.",
      retryAfter: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000),
    });
  }

  const { messages } = req.body;

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

  const conversationText = messages
    .map((m: { role: string; text: string }) => {
      const speaker = m.role === "user" ? "Utente" : "Ignis";
      const safeText = String(m.text).slice(0, 500).replace(/[<>]/g, "");
      return `${speaker}: ${safeText}`;
    })
    .join("\n");

  const fullPrompt = `${IGNIS_SYSTEM_PROMPT}\n\n[CONVERSAZIONE]\n${conversationText}\nIgnis:`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
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
      return res
        .status(429)
        .json({ error: "Ignis sta ricevendo troppe richieste. Aspetta qualche secondo e riprova." });
    }
    res.status(502).json({ error: "Ignis non è disponibile al momento. Riprova tra poco." });
  }
}
