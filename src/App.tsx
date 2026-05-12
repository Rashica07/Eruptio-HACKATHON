import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import DestinationDetail from "./pages/DestinationDetail";
import Booking from "./pages/Booking";
import DestinationList from "./pages/DestinationList";
import ChiSiamo from "./pages/ChiSiamo";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <div className="bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-ink">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinazioni" element={<DestinationList />} />
            <Route path="/destinazioni/:id" element={<DestinationDetail />} />
            <Route path="/prenota" element={<Booking />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
