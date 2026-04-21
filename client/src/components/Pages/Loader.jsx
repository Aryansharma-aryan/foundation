import { useEffect, useState } from "react";
import logo from "../../assets/logo.jpeg";

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          window.clearInterval(tick);
          return 100;
        }
        return Math.min(value + 5, 100);
      });
    }, 55);

    const fadeTimer = window.setTimeout(() => setVisible(false), 1450);
    const doneTimer = window.setTimeout(() => onComplete?.(), 1850);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg)] px-6 transition duration-500 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_20px_50px_rgba(20,38,31,0.12)] ring-4 ring-emerald-50">
          <img src={logo} alt="Foundation logo" className="h-20 w-20 rounded-full object-cover" />
        </div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
          Davis Girdhar
        </p>
        <h1 className="mt-2 text-3xl font-bold text-[var(--color-text)]">Foundation</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
          Building a cleaner, faster experience for every visitor.
        </p>
        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white shadow-inner">
          <div
            className="h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.24em] text-slate-400">{progress}%</p>
      </div>
    </div>
  );
}
