import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Destinazioni", href: "/destinazioni" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const element = document.getElementById(hash.replace("#", ""));
    if (element) {
      const timer = setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [hash, pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-[100] py-6 bg-bg/80 backdrop-blur-md border-b border-clay">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display italic text-2xl tracking-tighter font-bold text-moss">ERUPTIO.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "px-4 py-2 text-[11px] uppercase tracking-widest font-bold font-body transition-all duration-300 rounded-sm",
                pathname === item.href ? "text-moss bg-moss/5" : "text-moss/60 hover:text-moss hover:bg-moss/5"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button asChild variant="hero" className="hidden md:flex bg-moss text-bg rounded-none px-8 font-bold tracking-widest text-[10px] h-10 border-none shadow-none">
            <Link to="/prenota">PRENOTA ORA</Link>
          </Button>

          <button
            className="md:hidden p-2 text-moss"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-clay overflow-hidden absolute top-full left-0 right-0 shadow-2xl"
          >
            <div className="p-8 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-display uppercase tracking-widest text-moss font-bold p-4 hover:bg-moss/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="w-full bg-moss text-white rounded-none py-10 text-lg font-bold tracking-widest mt-6">
                <Link to="/prenota" onClick={() => setMobileMenuOpen(false)}>PRENOTA ORA</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
