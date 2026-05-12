import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { BlurText } from "./BlurText";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  { q: "Quali vulcani è possibile visitare?",              a: "Operiamo su rotte prestabilite verso i giganti più iconici: Monte Fuji in Giappone, Bromo in Indonesia, l'Etna in Italia e l'Eyjafjallajökull in Islanda. Altre destinazioni sono disponibili su richiesta privata." },
  { q: "È sicuro volare così vicino a un vulcano attivo?", a: "Sì, assolutamente. I nostri velivoli sono dotati di sistemi di filtraggio aria avanzati e sensori termici di derivazione aerospaziale. Manteniamo sempre una distanza di sicurezza calcolata dai nostri esperti vulcanologi." },
  { q: "Devo avere un'assicurazione speciale?",            a: "Tutti i nostri pacchetti includono un'assicurazione specifica per spedizioni d'alta quota e territori vulcanici. Ci occupiamo noi di tutta la burocrazia." },
  { q: "Qual è il periodo migliore per prenotare?",        a: "Dipende dalla destinazione. Per il Monte Fuji consigliamo l'estate o l'autunno, mentre per i vulcani islandesi i periodi di bassa attività sismica garantiscono la migliore visibilità." },
  { q: "Posso portare attrezzatura fotografica?",          a: "Certamente. Incoraggiamo i fotografi a portare la propria attrezzatura. Offriamo anche supporti stabilizzati e punti di alimentazione a bordo per droni e macchine professionali." },
  { q: "È richiesta preparazione fisica particolare?",     a: "Per i voli standard non è richiesta alcuna preparazione. Se scegli di includere un trekking guidato post-volo, ti forniremo una scheda tecnica basata sul livello di difficoltà del percorso scelto." },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-28 md:py-48 bg-background border-t border-clay/30">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="pill mb-6">FAQ</span>
          <BlurText
            text="Domande Frequenti."
            className="font-display italic uppercase text-4xl sm:text-5xl md:text-6xl leading-[0.88] tracking-tight mt-8 text-ink"
          />
          <p className="mt-8 font-body text-ink/40 max-w-sm leading-relaxed font-medium">
            Hai dubbi sulla tua prossima avventura? Ecco le risposte alle domande più comuni dei nostri esploratori.
          </p>
          <Button variant="outline" className="mt-10 group gap-2">
            Contattaci <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="flex flex-col border-t border-clay/40 mt-10 lg:mt-0">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b border-clay/30 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left group cursor-pointer"
              >
                <span className={cn(
                  "font-display italic uppercase text-xl md:text-2xl tracking-tight transition-colors duration-300 pr-4",
                  openIndex === i ? "text-moss" : "text-ink/75 group-hover:text-ink"
                )}>
                  {item.q}
                </span>
                <div className="shrink-0 size-9 rounded-full border border-clay/60 flex items-center justify-center text-ink/35 group-hover:border-moss/50 group-hover:text-moss transition-all">
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              <div className={cn(
                "font-body text-ink/45 text-sm md:text-base leading-relaxed transition-all duration-500 ease-in-out",
                openIndex === i ? "max-h-[300px] pb-8 opacity-100" : "max-h-0 opacity-0"
              )}>
                <p className="max-w-[60ch]">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
