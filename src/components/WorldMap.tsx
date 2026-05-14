import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import { DESTINATIONS } from "@/lib/destinations";

const PINS = Object.values(DESTINATIONS).filter(d => d.lat != null && d.lng != null);

function makeIcon(featured: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: ${featured ? "14px" : "11px"};
      height: ${featured ? "14px" : "11px"};
      background: ${featured ? "hsl(38 90% 54%)" : "hsl(6 78% 57%)"};
      border: 2px solid ${featured ? "hsl(38 90% 70% / 0.6)" : "hsl(6 78% 75% / 0.5)"};
      border-radius: 50%;
      box-shadow: 0 0 ${featured ? "10px" : "7px"} ${featured ? "hsl(38 90% 54% / 0.7)" : "hsl(6 78% 57% / 0.6)"};
      cursor: pointer;
      transition: transform 0.15s;
    "></div>`,
    iconSize: [featured ? 14 : 11, featured ? 14 : 11],
    iconAnchor: [featured ? 7 : 5.5, featured ? 7 : 5.5],
    popupAnchor: [0, -10],
  });
}

export function WorldMap() {
  const mapRef = useRef(null);

  return (
    <section className="py-24 bg-background border-t border-clay/30 overflow-hidden">
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="pill text-[10px] mb-4 block">Mappa Vulcanica</span>
            <h2 className="font-display italic text-3xl md:text-5xl text-ink uppercase leading-none tracking-tighter">
              19 Vulcani · 4 Continenti
            </h2>
          </div>
          <p className="font-body text-ink/35 text-sm max-w-xs leading-relaxed">
            Clicca su ogni punto per scoprire il vulcano. Zoom e navigazione liberi.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-clay/40" style={{ height: 480 }}>
          <MapContainer
            ref={mapRef}
            center={[20, 10]}
            zoom={2}
            minZoom={1}
            maxZoom={10}
            style={{ height: "100%", width: "100%", background: "hsl(228 47% 5%)" }}
            scrollWheelZoom={true}
            worldCopyJump={false}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
              maxZoom={19}
            />

            {PINS.map(dest => (
              <Marker
                key={dest.id}
                position={[dest.lat, dest.lng]}
                icon={makeIcon(!!dest.featured)}
              >
                <Popup
                  closeButton={false}
                  className="eruptio-popup"
                  offset={[0, -4]}
                >
                  <Link
                    to={`/destinazioni/${dest.id}`}
                    style={{ textDecoration: "none", display: "block", width: 180 }}
                  >
                    <img
                      src={dest.img + "?auto=format&fit=crop&q=70&w=360"}
                      alt={dest.name}
                      style={{ width: "100%", height: 90, objectFit: "cover", display: "block" }}
                    />
                    <div style={{ padding: "10px 12px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                        <MapPin size={9} color="hsl(35 25% 93% / 0.35)" />
                        <span style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "hsl(35 25% 93% / 0.35)" }}>
                          {dest.country}
                        </span>
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "hsl(35 25% 93%)", lineHeight: 1.2, marginBottom: 4 }}>
                        {dest.name}
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 15, fontWeight: 700, color: "hsl(38 90% 54%)", marginBottom: 8 }}>
                        € {dest.price.toLocaleString("it-IT")}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: "hsl(6 78% 57%)", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em" }}>
                        Scopri <ArrowUpRight size={10} />
                      </div>
                    </div>
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="flex items-center gap-6 mt-5 justify-end">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold border border-gold/50" />
            <span className="text-[10px] font-body text-ink/35 uppercase tracking-widest font-bold">In evidenza</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-moss/80 border border-moss/40" />
            <span className="text-[10px] font-body text-ink/35 uppercase tracking-widest font-bold">Destinazione</span>
          </div>
        </div>
      </div>

      <style>{`
        .eruptio-popup .leaflet-popup-content-wrapper {
          background: hsl(228 38% 9%);
          border: 1px solid hsl(228 28% 18%);
          border-radius: 16px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 20px 60px hsl(0 0% 0% / 0.7);
        }
        .eruptio-popup .leaflet-popup-content {
          margin: 0;
          width: 180px !important;
        }
        .eruptio-popup .leaflet-popup-tip-container {
          display: none;
        }
        .leaflet-container {
          font-family: inherit;
        }
        .leaflet-control-zoom a {
          background: hsl(228 38% 9%) !important;
          color: hsl(35 25% 93%) !important;
          border-color: hsl(228 28% 18%) !important;
        }
        .leaflet-control-zoom a:hover {
          background: hsl(228 28% 14%) !important;
        }
        .leaflet-control-attribution {
          background: hsl(228 47% 5% / 0.8) !important;
          color: hsl(35 25% 93% / 0.3) !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a {
          color: hsl(35 25% 93% / 0.5) !important;
        }
      `}</style>
    </section>
  );
}
