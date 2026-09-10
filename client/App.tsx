import "./global.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Videos from "./pages/Videos";
import Articles from "./pages/Articles";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SpecialtyDetail from "./pages/SpecialtyDetail";
import {
  PrivacyPolicy,
  TermsConditions,
  CookiePolicy,
  RefundPolicy,
} from "./pages/Legal";
import ChatWidget from "@/components/ChatWidget";
import { CookieConsent } from "@/components/CookieConsent";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ScrollToTop } from "@/components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/specialties/:slug" element={<SpecialtyDetail />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatWidget />
      <FloatingCTA />
      <CookieConsent />
    </BrowserRouter>
  );
}

export default App;