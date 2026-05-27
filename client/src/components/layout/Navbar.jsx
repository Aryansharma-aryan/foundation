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
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navLinkClass = (path) =>
    `whitespace-nowrap rounded-full px-2.5 py-2 text-[14px] font-bold transition 2xl:px-3.5 2xl:text-[15px] ${
      isActive(path)
        ? "bg-[var(--color-secondary)] text-[var(--color-primary)]"
        : "text-[var(--color-text)]/80 hover:bg-white hover:text-[var(--color-primary)]"
    }`;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled ? "py-3" : "py-4"}`}>
        <div className="shell">
          <div
            className={`flex items-center justify-between gap-3 rounded-full border px-4 py-3 shadow-[var(--shadow-soft)] transition sm:px-6 ${
              scrolled
                ? "border-white/70 bg-white/88 backdrop-blur-xl"
                : "border-white/60 bg-white/76 backdrop-blur-lg"
            }`}
          >
            <Link to="/" className="flex shrink-0 items-center gap-3">
              <img
                src={logo}
                alt="Davis Girdhar Foundation"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-[rgba(223,124,56,0.18)] 2xl:h-12 2xl:w-12"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)] 2xl:text-sm 2xl:tracking-[0.24em]">
                  Davis Girdhar
                </p>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[var(--color-muted)] 2xl:text-xs 2xl:tracking-[0.18em]">
                  Foundation
                </p>
              </div>
            </Link>

            <nav className="hidden flex-nowrap items-center justify-center gap-0.5 xl:flex 2xl:gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className={navLinkClass(link.path)}>
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden shrink-0 items-center gap-2 xl:flex 2xl:gap-3">
              <Link to="/admin" className="btn-secondary px-4 py-2.5 text-sm 2xl:px-5">
                Admin
              </Link>
              <Link to="/get-involved" className="btn-secondary px-4 py-2.5 text-sm 2xl:px-5">
                Volunteer
              </Link>
              <Link
                to="/donate"
                className="btn-primary px-4 py-2.5 text-sm shadow-[0_18px_42px_rgba(225,106,31,0.38)] ring-2 ring-[rgba(245,187,74,0.34)] hover:shadow-[0_22px_52px_rgba(198,85,17,0.42)] 2xl:px-5"
              >
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
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-[1.25rem] px-4 py-3 text-base font-bold transition ${
                      isActive(link.path)
                        ? "bg-[var(--color-secondary)] text-[var(--color-primary)]"
                        : "text-[var(--color-text)] hover:bg-[var(--color-bg-soft)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/get-involved" onClick={() => setMobileOpen(false)} className="btn-secondary mt-3">
                  Get Involved
                </Link>
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="btn-secondary">
                  Admin Login
                </Link>
                <Link
                  to="/donate"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary shadow-[0_18px_42px_rgba(225,106,31,0.38)] ring-2 ring-[rgba(245,187,74,0.34)]"
                >
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
