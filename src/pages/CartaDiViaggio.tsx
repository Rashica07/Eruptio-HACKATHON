import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Download, FileDown, QrCode, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

const CARD_URL = typeof window !== "undefined"
  ? `${window.location.origin}/itinerario`
  : "https://eruptio.vercel.app/itinerario";

const PHOTOS = [
  "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=85",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=85",
];

export default function CartaDiViaggio() {
  const cardRef  = useRef<HTMLDivElement>(null);
  const [qrUrl,   setQrUrl]   = useState("");
  const [loading, setLoading] = useState<"png"|"pdf"|null>(null);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    QRCode.toDataURL(CARD_URL, {
      width: 160, margin: 1,
      color: { dark: "#0d1525", light: "#f5ede0" },
    }).then(setQrUrl);
  }, []);

  /* ── PNG download ── */
  async function downloadPng() {
    if (!cardRef.current) return;
    setLoading("png");
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        style: { borderRadius: "0" },
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "eruptio-carta-di-viaggio.png";
      a.click();
    } finally { setLoading(null); }
  }

  /* ── PDF download ── */
  async function downloadPdf() {
    if (!cardRef.current) return;
    setLoading("pdf");
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true });
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a5" });
      const W = pdf.internal.pageSize.getWidth();
      const H = pdf.internal.pageSize.getHeight();
      pdf.addImage(dataUrl, "PNG", 0, 0, W, H);
      pdf.save("eruptio-carta-di-viaggio.pdf");
    } finally { setLoading(null); }
  }

  const nextPhoto = () => setPhotoIdx(i => (i + 1) % PHOTOS.length);

  return (
    <div className="min-h-screen pt-28 pb-24" style={{ background: "hsl(228 47% 5%)" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-moss/15 border border-moss/30 rounded-full px-4 py-2 mb-6">
            <QrCode size={12} className="text-moss" />
            <span className="text-moss font-body font-bold text-[10px] uppercase tracking-widest">
              Genera · Scarica · Condividi
            </span>
          </div>
          <h1 className="font-display font-black uppercase text-[clamp(32px,6vw,90px)] leading-[0.9] tracking-[-0.03em] text-ink">
            CARTA DI<br />
            <span style={{ color: "hsl(var(--moss))" }}>VIAGGIO</span>
          </h1>
          <p className="mt-5 font-body text-ink/45 max-w-md mx-auto text-base">
            La tua tessera ufficiale — scaricala come PNG o PDF, scansiona il QR per l'itinerario completo.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">

          {/* ── Card preview ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="flex-none"
            style={{ filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.7))" }}
          >
            {/* The actual card — fixed 420×594 (A5 ratio) for pixel-perfect export */}
            <div
              ref={cardRef}
              style={{
                width: 420, height: 594,
                background: "#060c18",
                fontFamily: "'Georgia', serif",
                position: "relative",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {/* ── Photo strip (top 52%) ── */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "52%" }}>
                <img
                  src={PHOTOS[photoIdx]}
                  alt="Fuji"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  crossOrigin="anonymous"
                />
                {/* Dark gradient fade */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, rgba(6,12,24,0.1) 0%, rgba(6,12,24,0.55) 70%, rgba(6,12,24,1) 100%)",
                }} />

                {/* Photo label thumbnails */}
                <div style={{
                  position: "absolute", bottom: 12, right: 12,
                  display: "flex", gap: 6,
                }}>
                  {PHOTOS.map((p, i) => (
                    <div key={i} style={{
                      width: 36, height: 36,
                      border: i === photoIdx ? "2px solid hsl(6,78%,57%)" : "2px solid rgba(255,255,255,0.2)",
                      borderRadius: 4, overflow: "hidden",
                      cursor: "pointer",
                    }}>
                      <img src={p} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} crossOrigin="anonymous" />
                    </div>
                  ))}
                </div>

                {/* Hackathon badge */}
                <div style={{
                  position: "absolute", top: 14, left: 14,
                  background: "rgba(6,12,24,0.75)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 999,
                  padding: "4px 12px",
                  backdropFilter: "blur(6px)",
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 9, fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(245,237,224,0.7)",
                  }}>
                    HACKATHON 2026 · GRUPPO 4
                  </span>
                </div>
              </div>

              {/* ── Body (bottom 48%) ── */}
              <div style={{
                position: "absolute", top: "52%", left: 0, right: 0, bottom: 0,
                padding: "18px 22px 16px",
                display: "flex", flexDirection: "column", gap: 0,
              }}>

                {/* Logo + name row */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "hsl(6,78%,57%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 14, fontWeight: 900, color: "#060c18", fontStyle: "italic" }}>E</span>
                  </div>
                  <span style={{
                    fontSize: 20, fontWeight: 900, fontStyle: "italic",
                    letterSpacing: "-0.04em",
                    color: "hsl(35,25%,93%)",
                  }}>ERUPTIO.</span>
                  <div style={{ flex: 1 }} />
                  <span style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(245,237,224,0.3)",
                    fontFamily: "sans-serif",
                  }}>CARTA DI VIAGGIO</span>
                </div>

                {/* Headline */}
                <div style={{
                  fontSize: 32, fontWeight: 900, lineHeight: 1,
                  letterSpacing: "-0.04em", textTransform: "uppercase",
                  color: "hsl(35,25%,93%)",
                  marginBottom: 6,
                }}>
                  DA LECCO<br />
                  <span style={{ color: "hsl(6,78%,57%)" }}>A TOKYO</span>
                </div>

                {/* Subtitle */}
                <p style={{
                  fontSize: 9.5, fontFamily: "sans-serif", fontWeight: 400,
                  color: "rgba(245,237,224,0.42)",
                  lineHeight: 1.5, marginBottom: 12,
                  maxWidth: 240,
                }}>
                  Vivi esperienze che travolgono, scopri vulcani e laghi sacri. Il mondo non aspetta.
                </p>

                {/* Info grid */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8, marginBottom: 12,
                }}>
                  {[
                    { label: "DURATA", value: "7 notti", sub: "8 giorni" },
                    { label: "PARTENZA", value: "15/05", sub: "2027" },
                    { label: "RIENTRO", value: "22/05", sub: "2027" },
                  ].map(item => (
                    <div key={item.label} style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8, padding: "8px 10px",
                    }}>
                      <div style={{
                        fontSize: 7.5, fontWeight: 700, letterSpacing: "0.15em",
                        textTransform: "uppercase", fontFamily: "sans-serif",
                        color: "rgba(245,237,224,0.3)", marginBottom: 2,
                      }}>{item.label}</div>
                      <div style={{
                        fontSize: 15, fontWeight: 900, fontStyle: "italic",
                        color: "hsl(35,25%,93%)", lineHeight: 1,
                      }}>{item.value}</div>
                      <div style={{
                        fontSize: 9, fontFamily: "sans-serif",
                        color: "rgba(245,237,224,0.4)",
                      }}>{item.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Cost + QR row */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
                  {/* QR code */}
                  {qrUrl && (
                    <div style={{
                      background: "hsl(35,25%,93%)",
                      borderRadius: 8, padding: 5,
                      flexShrink: 0,
                    }}>
                      <img src={qrUrl} alt="QR" style={{ width: 68, height: 68, display: "block" }} />
                      <div style={{
                        fontSize: 6, textAlign: "center", marginTop: 3,
                        fontFamily: "sans-serif", fontWeight: 700,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        color: "#0d1525",
                      }}>SCANSIONA</div>
                    </div>
                  )}

                  {/* Cost block */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 7.5, fontWeight: 700, letterSpacing: "0.18em",
                      textTransform: "uppercase", fontFamily: "sans-serif",
                      color: "rgba(245,237,224,0.3)", marginBottom: 2,
                    }}>COSTO TOTALE</div>
                    <div style={{
                      fontSize: 36, fontWeight: 900, fontStyle: "italic",
                      color: "hsl(38,90%,54%)", lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}>€ 2.132</div>
                    <div style={{
                      fontSize: 9, fontFamily: "sans-serif",
                      color: "rgba(245,237,224,0.35)",
                    }}>2 persone · tutto incluso</div>
                  </div>

                  {/* Volcano icon / kanji */}
                  <div style={{
                    fontSize: 44, lineHeight: 1, opacity: 0.07,
                    color: "hsl(35,25%,93%)",
                    alignSelf: "flex-end",
                  }}>🌋</div>
                </div>

                {/* Footer line */}
                <div style={{
                  marginTop: "auto", paddingTop: 10,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{
                    fontSize: 7.5, fontFamily: "sans-serif", fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: "rgba(245,237,224,0.2)",
                  }}>eruptio.vercel.app</span>
                  <span style={{
                    fontSize: 7.5, fontFamily: "sans-serif", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "rgba(245,237,224,0.2)",
                  }}>DA LECCO A TOKYO · HACKATHON 2026</span>
                </div>
              </div>

              {/* Side accent bar */}
              <div style={{
                position: "absolute", left: 0, top: "52%", bottom: 0, width: 3,
                background: "linear-gradient(to bottom, hsl(6,78%,57%), hsl(38,90%,54%))",
              }} />
            </div>
          </motion.div>

          {/* ── Controls panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col gap-5 w-full lg:w-80"
          >
            {/* Photo switcher */}
            <div className="rounded-2xl border border-clay/30 p-5" style={{ background: "hsl(228 28% 10%)" }}>
              <div className="font-body text-[10px] uppercase tracking-widest text-ink/40 mb-4">Foto di Copertina</div>
              <div className="grid grid-cols-3 gap-2">
                {PHOTOS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIdx(i)}
                    className="relative rounded-xl overflow-hidden aspect-video border-2 transition-all"
                    style={{ borderColor: i === photoIdx ? "hsl(var(--moss))" : "transparent" }}
                  >
                    <img src={p} alt="" className="w-full h-full object-cover" />
                    {i === photoIdx && (
                      <div className="absolute inset-0 bg-moss/20" />
                    )}
                  </button>
                ))}
              </div>
              <button onClick={nextPhoto} className="mt-3 w-full flex items-center justify-center gap-2 text-ink/40 hover:text-ink/70 text-xs font-body font-bold uppercase tracking-widest transition-colors">
                <RefreshCw size={12} /> Cambia foto
              </button>
            </div>

            {/* QR info */}
            <div className="rounded-2xl border border-clay/30 p-5" style={{ background: "hsl(228 28% 10%)" }}>
              <div className="font-body text-[10px] uppercase tracking-widest text-ink/40 mb-3">QR Code</div>
              <div className="flex items-center gap-4">
                {qrUrl && <img src={qrUrl} alt="QR" className="w-16 h-16 rounded-lg" style={{ background: "hsl(35,25%,93%)", padding: 3 }} />}
                <div>
                  <div className="font-body text-sm text-ink/70 leading-relaxed">
                    Scansiona per aprire<br />l'itinerario completo.
                  </div>
                  <div className="font-body text-[9px] text-ink/30 mt-1 break-all">{CARD_URL}</div>
                </div>
              </div>
            </div>

            {/* Download buttons */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={downloadPng}
                disabled={loading !== null}
                variant="hero"
                size="lg"
                className="gap-3 font-bold tracking-widest"
              >
                {loading === "png"
                  ? <><div className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" /> GENERANDO...</>
                  : <><Download size={18} /> SCARICA PNG</>
                }
              </Button>

              <Button
                onClick={downloadPdf}
                disabled={loading !== null}
                variant="heroGlass"
                size="lg"
                className="gap-3 font-bold tracking-widest"
              >
                {loading === "pdf"
                  ? <><div className="w-4 h-4 border-2 border-ink/20 border-t-ink/70 rounded-full animate-spin" /> GENERANDO...</>
                  : <><FileDown size={18} /> SCARICA PDF</>
                }
              </Button>
            </div>

            {/* Note */}
            <p className="font-body text-[10px] text-ink/25 text-center leading-relaxed">
              Il PDF è in formato A5 · Ottimizzato per stampa e condivisione social
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
