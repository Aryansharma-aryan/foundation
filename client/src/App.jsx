import { useState } from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-transparent text-[var(--color-text)]">
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
