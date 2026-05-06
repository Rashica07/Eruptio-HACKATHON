import { useRef, useLayoutEffect } from "react";
import { Hero } from "../components/Hero";
import { ServicesBento } from "../components/ServicesBento";
import { Pourquoi } from "../components/Pourquoi";
import { Process } from "../components/Process";
import { Stats } from "../components/Stats";
import { Testimonials } from "../components/Testimonials";
import { Faq } from "../components/Faq";
import { CtaFooter } from "../components/CtaFooter";

export default function Home() {
  const topRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Aggressive scroll reset
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
    
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, []);

  return (
    <div ref={topRef} className="scroll-mt-0">
      <Hero />
      <ServicesBento />
      <Pourquoi />
      <Process />
      <Stats />
      <Testimonials />
      <Faq />
      <CtaFooter />
    </div>
  );
}
