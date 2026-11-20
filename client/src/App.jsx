import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { apiBaseUrl } from "./config/api";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Programs from "./components/Pages/Programs";
import GetInvolved from "./components/home/GetInvolved";
import Gallary from "./components/Pages/Gallary";
import Contact from "./components/Pages/Contact";
import Donate from "./components/Pages/Donate";
import Impact from "./components/Pages/Impact";
import Stories from "./components/Pages/Stories";
import Partners from "./components/Pages/Partners";
import Team from "./components/Pages/Team";
import ProgramDetail from "./components/Pages/ProgramDetail";
import Loader from "./components/Pages/Loader";
import Admin from "./components/Pages/Admin";
import TermsConditions from "./components/Pages/TermsConditions";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import SeoManager from "./seo/SeoManager";
import { HiHeart } from "react-icons/hi";

const FloatingDonateButton = () => {
  const { pathname } = useLocation();

  if (pathname.startsWith("/donate") || pathname.startsWith("/admin")) return null;

  return (
    <Link
      to="/donate"
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full border border-white/70 bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(119,54,13,0.32)] transition hover:-translate-y-0.5 hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 sm:bottom-6 sm:right-6 sm:px-6 sm:text-base"
      style={{
        bottom: "calc(1rem + env(safe-area-inset-bottom))",
        right: "calc(1rem + env(safe-area-inset-right))",
      }}
      aria-label="Donate now through the secure donation page"
    >
      <HiHeart className="text-lg" aria-hidden="true" />
      Donate Now
    </Link>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const visitorKey = "dgf_visitor_id";

const getVisitorId = () => {
  const existingId = localStorage.getItem(visitorKey);
  if (existingId) return existingId;

  const id =
    window.crypto?.randomUUID?.() ||
    `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
  localStorage.setItem(visitorKey, id);
  return id;
};

const VisitTracker = () => {
  const { pathname, search } = useLocation();
  const trackedPathRef = useRef("");

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const path = `${pathname}${search}`;
    if (trackedPathRef.current === path) return;
    trackedPathRef.current = path;

    const payload = JSON.stringify({
      visitorId: getVisitorId(),
      path,
      referrer: document.referrer,
    });
    const url = `${apiBaseUrl}/api/analytics/visit`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    }).catch(() => {});
  }, [pathname, search]);

  return null;
};

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-transparent text-[var(--color-text)]">
      <ScrollToTop />
      <SeoManager />
      <VisitTracker />
      <Navbar />
      <main className="pt-20 sm:pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/team" element={<Team />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/gallery" element={<Gallary />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <FloatingDonateButton />
    </div>
  );
}

export default App;
