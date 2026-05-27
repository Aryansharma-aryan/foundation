import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
    </div>
  );
}

export default App;
