import "./global.css";

import { useState } from "react";
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
import { CookieConsent, getConsent } from "@/components/CookieConsent";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ScrollToTop } from "@/components/ScrollToTop";

function AppShell() {
  // The chat panel and the mobile Call / Book Now bar are both fixed to the
  // bottom of the screen and would overlap, so the panel's state is lifted here
  // and the bar hides while the chat is open.
  const [chatOpen, setChatOpen] = useState(false);

  // The chatbot collects a name and phone number, so it stays out of the way
  // until consent has been given either way. It also stops the launcher and
  // panel from sitting on top of the Accept / Decline buttons, which it did on
  // mobile and tablet because it renders at a far higher z-index.
  const [consentPending, setConsentPending] = useState(
    () => getConsent() === null,
  );

  return (
    <>
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
      {!consentPending && (
        <ChatWidget open={chatOpen} onOpenChange={setChatOpen} />
      )}
      <FloatingCTA hidden={chatOpen} />
      <CookieConsent onDecide={() => setConsentPending(false)} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export { AppShell };
export default App;