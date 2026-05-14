export interface Destination {
  id: string;
  name: string;
  country: string;
  height: string;
  status: string;
  temp: string;
  desc: string;
  img: string;
  gallery: string[];
  price: number;
  nights: number;
  lat: number;
  lng: number;
  featured?: boolean;
}

const BASE = "?auto=format&fit=crop&q=80&w=";
const u = (id: string, w = 1200) => `https://images.unsplash.com/${id}${BASE}${w}`;

export const DESTINATIONS: Record<string, Destination> = {
  "fuji": {
    id: "fuji", name: "Monte Fuji", country: "Giappone",
    height: "3.776m", status: "Attivo", temp: "-12°C",
    desc: "Il simbolo del Giappone, un vulcano solitario che domina l'horizonte con la sua vetta innevata perfetta. Esperienza inclusa: 7 notti a Tokyo, escursione al Lago Kawaguchiko e ascesa guidata al 5° Stazione.",
    img: u("photo-1490806843957-31f4c9a91c65"),
    gallery: [
      u("photo-1490806843957-31f4c9a91c65", 800),
      u("photo-1528360983277-13d401cdc186", 800),
      u("photo-1540959733332-eab4deabeeaf", 800),
      u("photo-1542051841857-5f90071e7989", 800),
    ],
    price: 2934, nights: 7, lat: 35.36, lng: 138.73, featured: true,
  },
  "etna": {
    id: "etna", name: "Etna", country: "Italia",
    height: "3.357m", status: "Attivo", temp: "-5°C",
    desc: "Il vulcano più alto e attivo d'Europa, un gigante siciliano che regala spettacoli eruttivi costanti.",
    img: u("photo-1574068468566-42ee5cd28d8a"),
    gallery: [
      u("photo-1574068468566-42ee5cd28d8a", 800),
      u("photo-1514925068440-df5ddc08f0a1", 800),
      u("photo-1526091689929-9124ca407af4", 800),
    ],
    price: 890, nights: 4, lat: 37.75, lng: 15.00,
  },
  "vesuvio": {
    id: "vesuvio", name: "Vesuvio", country: "Italia",
    height: "1.281m", status: "Dormiente", temp: "15°C",
    desc: "Uno dei vulcani più famosi al mondo, domina il Golfo di Napoli con la sua sagoma inconfondibile.",
    img: u("photo-1516483638261-f4dbaf036963"),
    gallery: [
      u("photo-1516483638261-f4dbaf036963", 800),
      u("photo-1555993539-1732b0258235", 800),
      u("photo-1534430480872-3498386e7856", 800),
    ],
    price: 690, nights: 3, lat: 40.82, lng: 14.43,
  },
  "bromo": {
    id: "bromo", name: "Monte Bromo", country: "Indonesia",
    height: "2.329m", status: "Attivo", temp: "10°C",
    desc: "Situato in un paesaggio lunare all'interno del Parco Nazionale Bromo Tengger Semeru.",
    img: u("photo-1627440439611-30d8906354cd"),
    gallery: [
      u("photo-1627440439611-30d8906354cd", 800),
      u("photo-1555396273-367ea4eb4db5", 800),
      u("photo-1518548419970-58e3b4079ab2", 800),
    ],
    price: 1480, nights: 6, lat: -7.94, lng: 112.95,
  },
  "katla": {
    id: "katla", name: "Katla", country: "Islanda",
    height: "1.512m", status: "Attivo", temp: "-8°C",
    desc: "Nascosto sotto il ghiacciaio Mýrdalsjökull, il Katla è uno dei vulcani più potenti e temuti dell'Islanda.",
    img: u("photo-1539635278303-d4002c07eae3"),
    gallery: [
      u("photo-1539635278303-d4002c07eae3", 800),
      u("photo-1476610182048-b716b8518aae", 800),
      u("photo-1531366936337-7c912a4589a7", 800),
    ],
    price: 1850, nights: 7, lat: 63.63, lng: -19.05,
  },
  "arenal": {
    id: "arenal", name: "Arenal", country: "Costa Rica",
    height: "1.633m", status: "Dormiente", temp: "24°C",
    desc: "Un vulcano dal cono perfetto immerso in una foresta pluviale lussureggiante e sorgenti termali.",
    img: u("photo-1616422896585-78e217d12f4b"),
    gallery: [
      u("photo-1616422896585-78e217d12f4b", 800),
      u("photo-1518548419970-58e3b4079ab2", 800),
      u("photo-1508193638397-1c4234db14d8", 800),
    ],
    price: 1290, nights: 5, lat: 10.46, lng: -84.70,
  },
  "stromboli": {
    id: "stromboli", name: "Stromboli", country: "Italia",
    height: "926m", status: "Eruzioni Medie", temp: "18°C",
    desc: "Il faro del Mediterraneo, noto per le sue continue e scenografiche eruzioni esplosive.",
    img: u("photo-1614112803729-7a8de79e78a8"),
    gallery: [
      u("photo-1614112803729-7a8de79e78a8", 800),
      u("photo-1559592413-7cec4d0cae2b", 800),
    ],
    price: 780, nights: 3, lat: 38.79, lng: 15.21,
  },
  "kilimanjaro": {
    id: "kilimanjaro", name: "Kilimanjaro", country: "Tanzania",
    height: "5.895m", status: "Quiescente", temp: "-10°C",
    desc: "La vetta più alta dell'Africa, coronata da ghiacciai perenni sopra la savana.",
    img: u("photo-1489392191049-fc10c97e64b6"),
    gallery: [
      u("photo-1489392191049-fc10c97e64b6", 800),
      u("photo-1547471080-7cc2caa01a7e", 800),
      u("photo-1551632811-561732d1e306", 800),
    ],
    price: 2890, nights: 9, lat: -3.07, lng: 37.35,
  },
  "eyjafjallajokull": {
    id: "eyjafjallajokull", name: "Eyjafjallajökull", country: "Islanda",
    height: "1.651m", status: "Attivo", temp: "-6°C",
    desc: "Famoso per l'eruzione del 2010 che bloccò i voli europei, simbolo della forza della natura.",
    img: u("photo-1476610182048-b716b8518aae"),
    gallery: [
      u("photo-1476610182048-b716b8518aae", 800),
      u("photo-1504109586057-7a2ae83d1338", 800),
    ],
    price: 1650, nights: 6, lat: 63.62, lng: -19.62,
  },
  "mauna-loa": {
    id: "mauna-loa", name: "Mauna Loa", country: "USA · Hawaii",
    height: "4.169m", status: "Attivo", temp: "5°C",
    desc: "Il vulcano più grande della Terra per volume, un gigante a scudo che domina le Hawaii.",
    img: u("photo-1542224566-6e85f2e6772f"),
    gallery: [
      u("photo-1542224566-6e85f2e6772f", 800),
      u("photo-1494791368093-85217fbbf8de", 800),
    ],
    price: 3200, nights: 10, lat: 19.48, lng: -155.60,
  },
  "askja": {
    id: "askja", name: "Askja", country: "Islanda",
    height: "1.510m", status: "Attivo", temp: "-4°C",
    desc: "Una vasta caldera negli altipiani islandesi, nota per il suo lago blu elettrico nel cratere.",
    img: u("photo-1504109586057-7a2ae83d1338"),
    gallery: [
      u("photo-1504109586057-7a2ae83d1338", 800),
      u("photo-1531366936337-7c912a4589a7", 800),
    ],
    price: 1750, nights: 7, lat: 65.03, lng: -16.75,
  },
  "campi-flegrei": {
    id: "campi-flegrei", name: "Campi Flegrei", country: "Italia",
    height: "458m", status: "Attivo", temp: "16°C",
    desc: "Un supervulcano costituito da una vasta area vulcanica a ovest di Napoli.",
    img: u("photo-1516483638261-f4dbaf036963"),
    gallery: [u("photo-1516483638261-f4dbaf036963", 800)],
    price: 720, nights: 3, lat: 40.83, lng: 14.14,
  },
  "epomeo": {
    id: "epomeo", name: "Monte Epomeo", country: "Italia",
    height: "787m", status: "Inattivo", temp: "18°C",
    desc: "La vetta dell'isola d'Ischia, nata da un sollevamento sottomarino magmatico.",
    img: u("photo-1559592413-7cec4d0cae2b"),
    gallery: [u("photo-1559592413-7cec4d0cae2b", 800)],
    price: 580, nights: 2, lat: 40.73, lng: 13.89,
  },
  "vulture": {
    id: "vulture", name: "Monte Vulture", country: "Italia",
    height: "1.326m", status: "Spento", temp: "12°C",
    desc: "Antico vulcano spento della Basilicata, noto per i suoi laghi vulcanici gemelli.",
    img: u("photo-1526091689929-9124ca407af4"),
    gallery: [u("photo-1526091689929-9124ca407af4", 800)],
    price: 640, nights: 3, lat: 40.95, lng: 15.63,
  },
  "amiata": {
    id: "amiata", name: "Monte Amiata", country: "Italia",
    height: "1.738m", status: "Dormiente", temp: "10°C",
    desc: "Un imponente rilievo vulcanico in Toscana, avvolto da folte foreste di faggi e castagni.",
    img: u("photo-1555993539-1732b0258235"),
    gallery: [u("photo-1555993539-1732b0258235", 800)],
    price: 560, nights: 2, lat: 42.89, lng: 11.62,
  },
  "lipari": {
    id: "lipari", name: "Lipari", country: "Italia",
    height: "602m", status: "Attivo", temp: "20°C",
    desc: "L'isola più grande delle Eolie, con bianche cave di pomice e colate di ossidiana.",
    img: u("photo-1534430480872-3498386e7856"),
    gallery: [u("photo-1534430480872-3498386e7856", 800)],
    price: 820, nights: 4, lat: 38.48, lng: 14.95,
  },
  "mauna-kea": {
    id: "mauna-kea", name: "Mauna Kea", country: "USA · Hawaii",
    height: "4.207m", status: "Dormiente", temp: "-2°C",
    desc: "Un antico vulcano hawaiano con i telescopi più potenti al mondo sulla sua cima.",
    img: u("photo-1419242902214-272b3f66ee7a"),
    gallery: [
      u("photo-1419242902214-272b3f66ee7a", 800),
      u("photo-1494791368093-85217fbbf8de", 800),
    ],
    price: 3100, nights: 9, lat: 19.82, lng: -155.47,
  },
  "hekla": {
    id: "hekla", name: "Hekla", country: "Islanda",
    height: "1.491m", status: "Attivo", temp: "-5°C",
    desc: "Conosciuta nel Medioevo come la porta dell'Inferno, uno dei vulcani più attivi d'Islanda.",
    img: u("photo-1531366936337-7c912a4589a7"),
    gallery: [u("photo-1531366936337-7c912a4589a7", 800)],
    price: 1700, nights: 6, lat: 63.98, lng: -19.66,
  },
  "fuego": {
    id: "fuego", name: "Fuego", country: "Guatemala",
    height: "3.763m", status: "Eruzioni Costanti", temp: "15°C",
    desc: "Famoso per le sue spettacolari eruzioni che illuminano il cielo dell'America Centrale.",
    img: u("photo-1541527712391-7667ff46ca79"),
    gallery: [
      u("photo-1541527712391-7667ff46ca79", 800),
      u("photo-1508193638397-1c4234db14d8", 800),
    ],
    price: 1980, nights: 7, lat: 14.47, lng: -90.88,
  },
};
