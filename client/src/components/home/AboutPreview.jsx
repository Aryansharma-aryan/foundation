import { Link } from "react-router-dom";
import aboutImage from "../../assets/about.jpg";

const pillars = [
  { label: "Education support", to: "/programs" },
  { label: "Computer learning", to: "/programs" },
  { label: "Food distribution", to: "/impact" },
  { label: "Healthcare outreach", to: "/partners" },
];

const AboutPreview = () => {
  return (
    <section className="shell section-space">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="order-2 lg:order-1">
          <p className="section-kicker">About The Foundation</p>
          <h2 className="section-title">
            Serving children and families with practical support rooted in real community needs.
          </h2>
          <p className="section-copy">
            Davis Girdhar Foundation works with sincerity and purpose to support learning, nourishment,
            health awareness, and community care in and around Kurukshetra.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {pillars.map((pillar) => (
              <Link
                key={pillar.label}
                to={pillar.to}
                className="rounded-full border border-[var(--color-line)] bg-white/90 px-4 py-2.5 text-base font-semibold text-[var(--color-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                {pillar.label}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/about" className="btn-primary">
              Discover Our Story
            </Link>
            <Link to="/stories" className="btn-secondary">
              Read Stories
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-[2.2rem] shadow-[var(--shadow-soft)]">
            <img
              src={aboutImage}
              alt="Davis Girdhar Foundation with children and volunteers"
              className="h-[420px] w-full object-cover sm:h-[520px]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(28,24,33,0.62)_100%)]" />
            <div className="absolute inset-x-6 bottom-6 rounded-[1.75rem] bg-white/92 p-6 shadow-lg backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                Why it matters
              </p>
              <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">
                Genuine support creates trust, and trust helps communities grow stronger over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
