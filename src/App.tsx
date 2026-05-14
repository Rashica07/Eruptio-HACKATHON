import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { FireCursor } from "./components/FireCursor";
import { Chatbot } from "./components/Chatbot";
import Home from "./pages/Home";
import DestinationDetail from "./pages/DestinationDetail";
import Booking from "./pages/Booking";
import DestinationList from "./pages/DestinationList";
import ChiSiamo from "./pages/ChiSiamo";
import Itinerario from "./pages/Itinerario";
import CartaDiViaggio from "./pages/CartaDiViaggio";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <div className="bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-ink">
        <FireCursor />
        <Navbar />
        <Chatbot />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinazioni" element={<DestinationList />} />
            <Route path="/destinazioni/:id" element={<DestinationDetail />} />
            <Route path="/prenota" element={<Booking />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/itinerario" element={<Itinerario />} />
            <Route path="/carta-di-viaggio" element={<CartaDiViaggio />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
