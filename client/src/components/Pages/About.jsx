import { Link } from "react-router-dom";

const values = [
  {
    title: "Clarity",
    text: "Programs are presented in a way that families, volunteers, and donors can understand quickly.",
  },
  {
    title: "Care",
    text: "Support is organised around real needs such as learning, meals, health, and guidance.",
  },
  {
    title: "Consistency",
    text: "Long-term trust grows when outreach is regular, visible, and responsibly managed.",
  },
];

const stats = [
  { value: "500+", label: "Lives reached" },
  { value: "300+", label: "Students supported" },
  { value: "50+", label: "Volunteers engaged" },
];

const About = () => {
  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14">
        <div className="rounded-[2rem] bg-slate-950 px-6 py-14 text-white sm:px-10 lg:px-14">
          <p className="section-kicker text-emerald-300">About</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">A cleaner, more professional presentation of the foundation’s mission.</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            Davis Girdhar Foundation focuses on education, digital exposure, food support, and community care in rural Haryana. This page now keeps the message more direct, more readable, and easier to trust.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/stories" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Read Stories</Link>
            <Link to="/team" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Meet Team</Link>
          </div>
        </div>
      </section>

      <section className="shell grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="card rounded-[2rem] p-6 sm:p-8">
          <p className="section-kicker">Mission</p>
          <h2 className="section-title">Support children and families with practical help that leads to longer-term opportunity.</h2>
          <p className="section-copy">
            The foundation combines education, technology exposure, nutrition support, and health-oriented outreach so communities get help that is useful now and meaningful later.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-[var(--color-bg)] p-4 text-center">
                <p className="text-3xl font-bold text-[var(--color-primary)]">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card rounded-[2rem] p-6 sm:p-8">
          <p className="section-kicker">Vision</p>
          <h2 className="mt-3 text-2xl font-bold text-[var(--color-text)]">A future where support is not distant or confusing.</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            A strong foundation website should feel trustworthy and calm. The same idea guides the work on the ground: make support easier to access and easier to understand.
          </p>
          <Link to="/impact" className="mt-5 inline-flex text-sm font-bold text-[var(--color-primary)] transition hover:text-[var(--color-primary-dark)]">Open impact page</Link>
        </div>
      </section>

      <section className="shell section-space">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="card rounded-[2rem] p-6">
              <h3 className="text-2xl font-bold text-[var(--color-text)]">{value.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell">
        <div className="rounded-[2rem] bg-[var(--color-surface-strong)] px-6 py-10 text-white sm:px-10">
          <h2 className="text-3xl font-bold">Want to support the mission?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            You can help through donations, volunteering, partnerships, or simple awareness-sharing.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/get-involved" className="btn-primary">Get Involved</Link>
            <Link to="/partners" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Partnerships</Link>
            <Link to="/donate" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Donate Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
