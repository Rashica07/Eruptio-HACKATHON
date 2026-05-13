import { motion } from "motion/react";
import { Plane, Train, Mountain, Camera, Utensils, Star, Clock, MapPin, Euro } from "lucide-react";

interface Activity {
  time: string;
  title: string;
  desc: string;
  icon?: React.ReactNode;
}

interface Day {
  n: number;
  date: string;
  label: string;
  tag: string;
  tagColor: string;
  hero: string;
  cost: string;
  activities: Activity[];
}

const DAYS: Day[] = [
  {
    n: 1, date: "Gio 15 Maggio", label: "Il Grande Decollo", tag: "PARTENZA", tagColor: "#ce2b37",
    hero: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    cost: "Voli inclusi",
    activities: [
      { time: "05:30", title: "Ritrovo a Lecco", desc: "Piazza Garibaldi — bus privato verso Malpensa", icon: <MapPin size={14}/> },
      { time: "07:00", title: "Arrivo Malpensa (MXP)", desc: "Check-in, colazione in aeroporto, duty free", icon: <Plane size={14}/> },
      { time: "09:40", title: "Decollo MXP → NRT", desc: "Volo intercontinentale ~12h con scalo a Doha", icon: <Plane size={14}/> },
      { time: "——", title: "In volo sul Mediterraneo", desc: "Film, cena di bordo, riposo — timezone +7h", icon: <Star size={14}/> },
    ]
  },
  {
    n: 2, date: "Ven 16 Maggio", label: "Benvenuti a Tokyo", tag: "ARRIVO", tagColor: "#009246",
    hero: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    cost: "~€80 / persona",
    activities: [
      { time: "07:55", title: "Atterraggio Narita (NRT)", desc: "Passaporti, ritiro bagagli, cambio valuta", icon: <Plane size={14}/> },
      { time: "10:30", title: "Treno Narita Express", desc: "Narita → Shinjuku Station (60 min)", icon: <Train size={14}/> },
      { time: "12:00", title: "Check-in Hotel Shinjuku", desc: "Hotel Park Hyatt area — vista panoramica", icon: <MapPin size={14}/> },
      { time: "15:00", title: "Esplorazione Shinjuku", desc: "Kabukicho, Memory Lane (Omoide Yokocho), Golden Gai", icon: <Camera size={14}/> },
      { time: "20:00", title: "Cena: Ramen Ichiran", desc: "Ramen in box privato — esperienza tipica", icon: <Utensils size={14}/> },
    ]
  },
  {
    n: 3, date: "Sab 17 Maggio", label: "Templi & Tecnologia", tag: "CULTURA", tagColor: "#f5a118",
    hero: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    cost: "~€45 / persona",
    activities: [
      { time: "08:30", title: "Senso-ji (Asakusa)", desc: "Il tempio più antico di Tokyo — incenso e fortune", icon: <Star size={14}/> },
      { time: "11:00", title: "Tokyo Sky Tree", desc: "634 m — vista a 360° sulla megalopoli (350 m + 450 m)", icon: <Mountain size={14}/> },
      { time: "14:00", title: "Akihabara Electric Town", desc: "Elettronica, manga, anime, retrogaming", icon: <Camera size={14}/> },
      { time: "17:00", title: "Passeggiata Ueno", desc: "Parco Ueno, musei, stagno con carpe koi", icon: <MapPin size={14}/> },
      { time: "20:00", title: "Izakaya tradizionale", desc: "Yakitori, edamame, sake — cena alla giapponese", icon: <Utensils size={14}/> },
    ]
  },
  {
    n: 4, date: "Dom 18 Maggio", label: "Il Fuji ci aspetta", tag: "VULCANO", tagColor: "#ce2b37",
    hero: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=800&q=80",
    cost: "~€65 / persona",
    activities: [
      { time: "06:45", title: "Shinkansen per Kawaguchiko", desc: "Treno proiettile 270 km/h — arrivo in 90 min", icon: <Train size={14}/> },
      { time: "09:00", title: "Lago Kawaguchi", desc: "Vista frontale su Fuji (3.776 m) — set fotografico", icon: <Mountain size={14}/> },
      { time: "11:00", title: "Quinta Stazione del Fuji", desc: "Bus fino a 2.305 m — sentiero Yoshida, aria rarefatta", icon: <Mountain size={14}/> },
      { time: "14:00", title: "Pranzo ai piedi del vulcano", desc: "Hoto (zuppa locale) — specialità della regione Fuji", icon: <Utensils size={14}/> },
      { time: "17:30", title: "Ritorno a Tokyo", desc: "Shinkansen + cena leggera in hotel", icon: <Train size={14}/> },
    ]
  },
  {
    n: 5, date: "Lun 19 Maggio", label: "Harajuku & Meiji", tag: "QUARTIERI", tagColor: "#7c3aed",
    hero: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
    cost: "~€35 / persona",
    activities: [
      { time: "09:00", title: "Meiji Jingu Shrine", desc: "Foresta secolare — 100.000 alberi piantati per l'imperatore", icon: <Star size={14}/> },
      { time: "11:30", title: "Harajuku Takeshita Street", desc: "Mode kawaii, crepes alla frutta, street fashion", icon: <Camera size={14}/> },
      { time: "14:00", title: "Omotesando", desc: "L'Avenue des Champs-Élysées di Tokyo — architettura design", icon: <MapPin size={14}/> },
      { time: "17:30", title: "Shibuya Crossing", desc: "L'incrocio più trafficato del mondo al tramonto", icon: <Camera size={14}/> },
      { time: "20:30", title: "Conveyor belt sushi", desc: "Sushi kaiten — assaggio di 12 piatti diversi", icon: <Utensils size={14}/> },
    ]
  },
  {
    n: 6, date: "Mar 20 Maggio", label: "Arte & Futuro", tag: "ARTE DIGITALE", tagColor: "#0ea5e9",
    hero: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80",
    cost: "~€60 / persona",
    activities: [
      { time: "10:00", title: "teamLab Borderless", desc: "Museo di arte digitale immersiva — installazioni senza confini", icon: <Star size={14}/> },
      { time: "13:30", title: "Odaiba Island", desc: "Replica Statua della Libertà, vista baia di Tokyo", icon: <MapPin size={14}/> },
      { time: "15:30", title: "Roppongi Hills", desc: "Arte contemporanea, vista città, Mori Art Museum", icon: <Camera size={14}/> },
      { time: "19:30", title: "Cena panoramica", desc: "Ristorante con vista a 50° piano — Tokyo illuminata", icon: <Utensils size={14}/> },
      { time: "22:00", title: "Vista notturna dal belvedere", desc: "Tokyo Tower di notte — momento fotografico clou", icon: <Star size={14}/> },
    ]
  },
  {
    n: 7, date: "Mer 21 Maggio", label: "Ultima Notte", tag: "ADDIO TOKYO", tagColor: "#f59e0b",
    hero: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?auto=format&fit=crop&w=800&q=80",
    cost: "~€90 / persona",
    activities: [
      { time: "10:00", title: "Yanaka — Tokyo vecchia", desc: "Il quartiere che sfuggì ai bombardamenti — atmosfera Edo", icon: <MapPin size={14}/> },
      { time: "12:30", title: "Tsukiji Outer Market", desc: "Il mercato del pesce — sashimi freschissimo a colazione tardiva", icon: <Utensils size={14}/> },
      { time: "15:00", title: "Shopping Ginza", desc: "Ultimi souvenirs — Tokyu Hands, Loft, negozi gift", icon: <Star size={14}/> },
      { time: "19:30", title: "Cena di gala — Kaiseki Ryori", desc: "7 portate rituali della cucina giapponese tradizionale", icon: <Utensils size={14}/> },
      { time: "22:30", title: "Passeggiata finale Shinjuku", desc: "Luci, neon, sayonara — l'ultima notte giapponese", icon: <Camera size={14}/> },
    ]
  },
  {
    n: 8, date: "Gio 22 Maggio", label: "Il Rientro", tag: "RITORNO", tagColor: "#6b7280",
    hero: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    cost: "Voli inclusi",
    activities: [
      { time: "05:30", title: "Check-out hotel", desc: "Ultimi bagagli, fotografia di gruppo in lobby", icon: <MapPin size={14}/> },
      { time: "07:30", title: "Transfer Narita Airport", desc: "Bus privato — 60 minuti verso l'aeroporto", icon: <Plane size={14}/> },
      { time: "10:45", title: "Decollo NRT → MXP", desc: "Volo di ritorno — 12h di ricordi in valigia", icon: <Plane size={14}/> },
      { time: "16:30", title: "Atterraggio Milano Malpensa", desc: "Ora italiana — bentornati in Italia", icon: <Plane size={14}/> },
      { time: "18:30", title: "Arrivo a Lecco", desc: "Bus di rientro — il Lago di Como vi aspetta", icon: <MapPin size={14}/> },
    ]
  },
];

const TOTAL_COST = [
  { label: "Voli andata/ritorno (2 persone)", value: "€ 1.240" },
  { label: "Hotel 7 notti Shinjuku", value: "€ 560" },
  { label: "Attività & ingressi", value: "€ 180" },
  { label: "Pasti inclusi nel pacchetto", value: "€ 152" },
  { label: "Totale pacchetto", value: "€ 2.132", highlight: true },
];

export default function Itinerario() {
  return (
    <div className="min-h-screen" style={{ background: "hsl(228 47% 5%)" }}>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1920&q=80"
            alt="Tokyo" className="w-full h-full object-cover" style={{ opacity: 0.12 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(228 47% 5% / 0.4), hsl(228 47% 5%))" }} />
        </div>

        <div className="relative z-10 max-w-[var(--max)] mx-auto px-[var(--gutter)] text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="inline-flex items-center gap-2 bg-moss/15 border border-moss/30 rounded-full px-4 py-2 mb-8">
              <MapPin size={12} className="text-moss" />
              <span className="text-moss font-body font-bold text-[10px] uppercase tracking-widest">
                Lecco → Tokyo · 15–22 Maggio 2027 · 8 Giorni
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-display font-black uppercase text-[clamp(36px,7vw,110px)] leading-[0.88] tracking-[-0.03em] text-ink"
          >
            IL VIAGGIO<br />
            <span style={{ color: "hsl(var(--moss))" }}>GIORNO PER GIORNO</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            className="mt-7 font-body text-lg text-ink/50 max-w-lg mx-auto"
          >
            Da Lecco al cuore del Giappone: ogni ora pianificata, ogni yen contato, ogni memoria garantita.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-6"
          >
            {[
              { icon: <Clock size={16}/>, label: "8 Giorni", sub: "7 notti" },
              { icon: <Plane size={16}/>, label: "~12h di volo", sub: "andata/ritorno" },
              { icon: <Mountain size={16}/>, label: "Monte Fuji", sub: "3.776 m s.l.m." },
              { icon: <Euro size={16}/>, label: "€ 2.132", sub: "tutto incluso" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-clay/20 border border-clay/40 rounded-2xl px-5 py-3">
                <span className="text-moss">{s.icon}</span>
                <div className="text-left">
                  <div className="font-display font-bold text-ink text-sm">{s.label}</div>
                  <div className="font-body text-ink/40 text-[10px] uppercase tracking-wider">{s.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="max-w-4xl mx-auto px-[var(--gutter)] pb-24">
        <div className="relative">
          {/* Vertical red line */}
          <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, hsl(var(--moss)), transparent)" }} />

          {DAYS.map((day, di) => (
            <motion.div
              key={day.n}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: di * 0.05, duration: 0.5 }}
              className="relative pl-16 mb-14"
            >
              {/* Day dot */}
              <div className="absolute left-0 top-1 w-12 h-12 rounded-full border-2 flex items-center justify-center font-display font-black text-sm"
                style={{ borderColor: day.tagColor, background: "hsl(228 47% 5%)", color: day.tagColor }}>
                {String(day.n).padStart(2, "0")}
              </div>

              {/* Card */}
              <div className="rounded-3xl overflow-hidden border border-clay/30"
                style={{ background: "hsl(228 28% 10%)" }}>

                {/* Photo strip */}
                <div className="relative h-40 overflow-hidden">
                  <img src={day.hero} alt={day.label}
                    className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsl(228 28% 10%) 0%, transparent 40%, transparent 60%, hsl(228 28% 10%) 100%)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(228 28% 10%) 0%, transparent 50%)" }} />
                  <div className="absolute top-4 left-5">
                    <span className="font-body font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{ background: day.tagColor + "33", color: day.tagColor, border: `1px solid ${day.tagColor}55` }}>
                      {day.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <div>
                      <div className="font-body text-[10px] uppercase tracking-widest text-ink/50 mb-1">{day.date}</div>
                      <div className="font-display font-black text-2xl text-ink leading-tight">{day.label}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-body text-[9px] uppercase tracking-wider text-ink/40">Spesa stimata</div>
                      <div className="font-display italic font-bold text-gold text-lg">{day.cost}</div>
                    </div>
                  </div>
                </div>

                {/* Activities */}
                <div className="p-5 space-y-3">
                  {day.activities.map((act, ai) => (
                    <motion.div
                      key={ai}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ai * 0.07 }}
                      className="flex gap-4 items-start group"
                    >
                      <div className="flex-none flex flex-col items-center gap-1">
                        <div className="font-body text-[10px] font-bold tracking-wider text-ink/30 w-10 text-right">{act.time}</div>
                      </div>
                      <div className="flex-none w-px self-stretch bg-clay/30 group-last:hidden" />
                      <div className="flex items-start gap-3 pb-3 flex-1">
                        <div className="flex-none mt-0.5 text-moss opacity-70">{act.icon}</div>
                        <div>
                          <div className="font-body font-bold text-sm text-ink">{act.title}</div>
                          <div className="font-body text-xs text-ink/45 mt-0.5 leading-relaxed">{act.desc}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Cost breakdown ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-clay/40 overflow-hidden"
          style={{ background: "hsl(228 28% 10%)" }}
        >
          <div className="p-6 border-b border-clay/30">
            <div className="font-body text-[10px] uppercase tracking-widest text-ink/40 mb-1">Riepilogo economico</div>
            <div className="font-display font-black text-2xl text-ink">Costo del Viaggio</div>
          </div>
          <div className="divide-y divide-clay/20">
            {TOTAL_COST.map((row, i) => (
              <div key={i} className={`flex items-center justify-between px-6 py-4 ${row.highlight ? "bg-moss/8" : ""}`}>
                <span className={`font-body text-sm ${row.highlight ? "font-bold text-ink" : "text-ink/55"}`}>{row.label}</span>
                <span className={`font-display font-bold ${row.highlight ? "text-gold text-2xl" : "text-ink/70 text-base"}`}>{row.value}</span>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-clay/30">
            <p className="font-body text-xs text-ink/30 text-center">
              Prezzi indicativi per 2 persone · Maggio 2027 · Soggetto a disponibilità
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
