import { ArrowUpRight } from "lucide-react";
import { BlurText } from "./BlurText";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "Termini", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Contatti", href: "#" },
];

export function CtaFooter() {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center overflow-hidden bg-background">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-screen object-cover filter brightness-[0.4] opacity-50"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-bubbling-magma-mountain-at-night-42172-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 gradient-fade-t" />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-center px-10 relative z-10">
        <BlurText
          text="Sei pronto a sfidare il fuoco?"
          className="font-display italic text-[clamp(50px,10vw,160px)] leading-[0.85] tracking-[-0.04em] text-moss max-w-[12ch]"
        />
        <p className="mt-10 font-body text-base md:text-xl text-moss/70 max-w-2xl leading-relaxed font-medium">
          Unisciti a noi per un'esperienza che va oltre il viaggio. Diventa un esploratore del cuore pulsante della Terra.
        </p>
        <div className="mt-12 flex items-center gap-5 flex-wrap justify-center">
          <Button asChild variant="hero" className="bg-moss hover:bg-moss/90 text-bg rounded-sm px-10">
            <Link to="/prenota">PRENOTA ORA</Link>
          </Button>
          <Button asChild variant="heroGlass" className="border border-moss text-moss hover:bg-moss/5 rounded-sm px-10 flex items-center gap-2">
            <Link to="/chi-siamo">CHI SIAMO <ArrowUpRight size={14} /></Link>
          </Button>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 w-full border-t border-clay bg-white/50 backdrop-blur-md">
        <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <span className="font-display italic text-2xl tracking-tighter font-bold text-moss">ERUPTIO.</span>
            </div>
            <span className="font-body text-[10px] text-moss/40 font-bold uppercase tracking-[0.2em]">
              © 2026 Eruptio SA · Hackathon 2024 // Gruppo 4 · Da Lecco a Tokyo
            </span>
          </div>

          <nav className="flex items-center gap-8 flex-wrap justify-center">
            {FOOTER_LINKS.map(l => (
              <Link
                key={l.label}
                to={l.href}
                className="font-body text-[11px] text-moss/60 hover:text-moss transition-colors tracking-widest uppercase font-bold"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
