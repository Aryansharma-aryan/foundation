import { Link } from "react-router-dom";

const impactCards = [
  {
    value: "300+",
    label: "Students supported",
    text: "Children receiving structured learning support, mentoring, and digital exposure.",
  },
  {
    value: "1,200+",
    label: "Meals served",
    text: "Food support that helps attendance, concentration, and family stability.",
  },
  {
    value: "50+",
    label: "Volunteers",
    text: "People supporting teaching, coordination, outreach, and community programs.",
  },
  {
    value: "4",
    label: "Core focus areas",
    text: "Education, coding, food support, and healthcare-oriented community care.",
  },
];

const Impact = () => {
  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14 text-center">
        <p className="section-kicker">Impact</p>
        <h1 className="section-title mx-auto max-w-4xl">A dedicated page for outcomes, trust, and progress.</h1>
        <p className="section-copy mx-auto">
          This gives the website a stronger NGO structure by separating impact from general about content.
        </p>
      </section>

      <section className="shell grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {impactCards.map((card) => (
          <article key={card.label} className="card rounded-[2rem] p-6">
            <p className="text-4xl font-bold text-[var(--color-primary)]">{card.value}</p>
            <h2 className="mt-3 text-xl font-bold text-[var(--color-text)]">{card.label}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{card.text}</p>
          </article>
        ))}
      </section>

      <section className="shell section-space grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card rounded-[2rem] p-6 sm:p-8">
          <p className="section-kicker">Why This Page Helps</p>
          <h2 className="section-title">Visitors can understand the foundation faster.</h2>
          <p className="section-copy">
            A stronger website usually needs a dedicated impact page so donors, partners, and volunteers can quickly see outcomes without searching through multiple sections.
          </p>
        </div>
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
          <h2 className="text-2xl font-bold">Next actions</h2>
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/stories" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Read Stories</Link>
            <Link to="/partners" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">View Partners</Link>
            <Link to="/donate" className="btn-primary">Support This Work</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
