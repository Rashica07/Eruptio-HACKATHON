import { ArrowUpRight } from "lucide-react";
import { BlurText } from "./BlurText";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const FOOTER_LINKS = [
  { label: "Termini",    href: "#" },
  { label: "Privacy",   href: "#" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Contatti",  href: "#" },
];

export function CtaFooter() {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center overflow-hidden bg-background">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay loop muted playsInline
          className="w-full h-screen object-cover brightness-[0.35] opacity-60"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-bubbling-magma-mountain-at-night-42172-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 gradient-fade-t" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 40% at 50% 100%, hsl(228 47% 5%) 0%, transparent 100%)" }} />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-center px-10 relative z-10 py-32">
        <BlurText
          text="Sei pronto a sfidare il fuoco?"
          className="font-display italic text-[clamp(44px,9vw,140px)] leading-[0.85] tracking-[-0.04em] text-ink max-w-[12ch]"
        />
        <p className="mt-10 font-body text-base md:text-xl text-ink/50 max-w-xl leading-relaxed">
          Unisciti a noi per un'esperienza che va oltre il viaggio. Diventa un esploratore del cuore pulsante della Terra.
        </p>
        <div className="mt-12 flex items-center gap-4 flex-wrap justify-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/prenota">PRENOTA ORA</Link>
          </Button>
          <Button asChild variant="heroGlass" size="lg">
            <Link to="/chi-siamo" className="flex items-center gap-2">
              CHI SIAMO <ArrowUpRight size={16} />
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 w-full border-t border-clay/40 bg-bg/80 backdrop-blur-xl">
        <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-moss flex items-center justify-center">
                <span className="text-bg font-display font-bold text-[9px]">E</span>
              </div>
              <span className="font-display italic text-xl tracking-tighter font-bold text-ink">ERUPTIO.</span>
            </div>
            <span className="font-body text-[10px] text-ink/25 font-bold uppercase tracking-[0.18em]">
              © 2026 Eruptio SA · Hackathon 2026 // Gruppo 4 · Da Lecco a Tokyo
            </span>
          </div>

          <nav className="flex items-center gap-8 flex-wrap justify-center">
            {FOOTER_LINKS.map(l => (
              <Link
                key={l.label}
                to={l.href}
                className="font-body text-[11px] text-ink/35 hover:text-moss transition-colors tracking-widest uppercase font-bold"
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
