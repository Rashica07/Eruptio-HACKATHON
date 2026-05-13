import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home",        href: "/" },
  { label: "Destinazioni",href: "/destinazioni" },
  { label: "Itinerario",  href: "/itinerario" },
  { label: "Chi Siamo",   href: "/chi-siamo" },
  { label: "FAQ",         href: "/#faq" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    const el = document.getElementById(hash.replace("#", ""));
    if (el) {
      const t = setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      return () => clearTimeout(t);
    }
  }, [hash, pathname]);

  return (
    <header className={cn(
      "fixed top-0 inset-x-0 z-[100] transition-all duration-500",
      scrolled
        ? "py-3 bg-bg/90 backdrop-blur-xl border-b border-clay/60 shadow-2xl shadow-bg/50"
        : "py-5 bg-transparent"
    )}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-moss flex items-center justify-center shadow-lg shadow-moss/30">
            <span className="text-bg font-display font-bold text-xs">E</span>
          </div>
          <span className="font-display italic text-xl tracking-tight font-bold text-ink group-hover:text-moss transition-colors">
            ERUPTIO.
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 bg-clay/20 backdrop-blur-sm rounded-full px-2 py-1.5 border border-clay/40">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "px-4 py-1.5 text-[11px] uppercase tracking-widest font-bold font-body rounded-full transition-all duration-200",
                pathname === item.href
                  ? "bg-moss text-bg shadow-md shadow-moss/30"
                  : "text-ink/60 hover:text-ink hover:bg-clay/40"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Button asChild variant="hero" size="sm" className="hidden md:flex text-[10px] tracking-widest h-9">
            <Link to="/prenota">PRENOTA ORA</Link>
          </Button>

          <button
            className="md:hidden p-2 rounded-full bg-clay/30 text-ink hover:bg-clay/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-card/95 backdrop-blur-xl border border-clay rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-5 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-display italic tracking-tight p-3 rounded-xl transition-colors",
                    pathname === item.href ? "text-moss bg-moss/10" : "text-ink hover:bg-clay/30"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="w-full mt-3 py-6 text-sm font-bold tracking-widest">
                <Link to="/prenota" onClick={() => setMobileMenuOpen(false)}>PRENOTA ORA</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
