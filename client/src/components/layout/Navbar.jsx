import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Programs", path: "/programs" },
  { name: "Impact", path: "/impact" },
  { name: "Stories", path: "/stories" },
  { name: "Team", path: "/team" },
  { name: "Partners", path: "/partners" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navLinkClass = (path) =>
    `rounded-full px-3.5 py-2 text-[15px] font-bold transition ${
      isActive(path)
        ? "bg-[var(--color-secondary)] text-[var(--color-primary)]"
        : "text-[var(--color-text)]/80 hover:bg-white hover:text-[var(--color-primary)]"
    }`;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled ? "py-3" : "py-4"}`}>
        <div className="shell">
          <div
            className={`flex items-center justify-between rounded-full border px-4 py-3 shadow-[var(--shadow-soft)] transition sm:px-6 ${
              scrolled
                ? "border-white/70 bg-white/88 backdrop-blur-xl"
                : "border-white/60 bg-white/76 backdrop-blur-lg"
            }`}
          >
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Davis Girdhar Foundation"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-[rgba(223,124,56,0.18)]"
              />
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                  Davis Girdhar
                </p>
                <p className="text-xs font-semibold tracking-[0.18em] text-[var(--color-muted)]">
                  Foundation
                </p>
              </div>
            </Link>

            <nav className="hidden flex-wrap items-center justify-center gap-1 xl:flex">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={navLinkClass(link.path)}>
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 xl:flex">
              <Link to="/get-involved" className="btn-secondary px-5 py-2.5 text-sm">
                Volunteer
              </Link>
              <Link to="/donate" className="btn-primary px-5 py-2.5 text-sm">
                Donate
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/80 text-2xl text-[var(--color-text)] xl:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(68,37,21,0.18)] backdrop-blur-sm xl:hidden">
          <div className="shell flex h-full items-start pt-24">
            <div className="card w-full rounded-[2rem] p-5">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`rounded-[1.25rem] px-4 py-3 text-base font-bold transition ${
                      isActive(link.path)
                        ? "bg-[var(--color-secondary)] text-[var(--color-primary)]"
                        : "text-[var(--color-text)] hover:bg-[var(--color-bg-soft)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/get-involved" className="btn-secondary mt-3">
                  Get Involved
                </Link>
                <Link to="/donate" className="btn-primary">
                  Donate Now
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
