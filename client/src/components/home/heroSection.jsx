import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import heroImage from "../../assets/hero.jpg";
import educationImage from "../../assets/program-education.jpg";
import healthcareImage from "../../assets/program-healthcare.jpg";

const slides = [
  {
    image: heroImage,
    eyebrow: "Davis Girdhar Foundation",
    title: "Serving the community with education, care, and compassion.",
    copy:
      "We support children and families through education programs, computer learning, food support, and healthcare outreach in Kurukshetra and nearby communities.",
  },
  {
    image: educationImage,
    eyebrow: "Education First",
    title: "Helping students grow with regular learning support and encouragement.",
    copy:
      "Our education efforts are designed to give children a stronger base for studies, confidence, and future opportunities.",
  },
  {
    image: healthcareImage,
    eyebrow: "Community Care",
    title: "Reaching families through practical support that feels genuine and local.",
    copy:
      "From village outreach to healthcare awareness, the foundation focuses on service that is respectful, useful, and consistent.",
  },
];

const stats = [
  { num: "300+", label: "Students Supported" },
  { num: "1,200+", label: "Meals Supported" },
  { num: "50+", label: "Volunteers Connected" },
];

const INTERVAL = 5000;
const TICK = 50;

export default function HeroSection() {
  const [cur, setCur] = useState(0);
  const [progress, setProgress] = useState(0);
  const elapsed = useRef(0);
  const timer = useRef(null);

  const go = (n) => {
    setCur((prev) => ((n ?? prev + 1) + slides.length) % slides.length);
    elapsed.current = 0;
    setProgress(0);
  };

  useEffect(() => {
    clearInterval(timer.current);
    elapsed.current = 0;
    timer.current = setInterval(() => {
      elapsed.current += TICK;
      setProgress((elapsed.current / INTERVAL) * 100);
      if (elapsed.current >= INTERVAL) {
        elapsed.current = 0;
        setCur((c) => (c + 1) % slides.length);
      }
    }, TICK);
    return () => clearInterval(timer.current);
  }, [cur]);

  return (
    <section className="relative flex min-h-[720px] items-center overflow-hidden pt-8">
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${cur * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.title}
            className="min-w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(17,18,28,0.84)_0%,rgba(39,27,18,0.7)_44%,rgba(255,244,234,0.16)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,187,74,0.22),transparent_30%)]" />

      <div className="shell relative z-10 py-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-3xl">
            <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.28em] text-[#ffd59e]">
              <span className="h-[2px] w-10 rounded-full bg-[#ffd59e]" />
              {slides[cur].eyebrow}
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-[4.6rem]">
              {slides[cur].title}
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-9 text-white/84 sm:text-2xl">
              {slides[cur].copy}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/about" className="btn-primary">
                About Foundation
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition hover:bg-white/16"
              >
                View Programs
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/20 bg-white/12 p-6 text-white shadow-[0_24px_80px_rgba(17,18,28,0.26)] backdrop-blur-md sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#ffd59e]">
              Foundation Highlights
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] border border-white/14 bg-white/8 px-5 py-5"
                >
                  <p className="text-4xl font-bold text-[#ffe2b8]">{stat.num}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/74">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === cur ? "w-10 bg-[var(--color-accent)]" : "w-2.5 bg-white/45"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1.5 bg-[var(--color-primary)]" style={{ width: `${progress}%` }} />
    </section>
  );
}
