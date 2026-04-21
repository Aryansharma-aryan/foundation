import { Link } from "react-router-dom";

const partnerGroups = [
  {
    title: "Schools and Colleges",
    text: "Partner for workshops, student drives, mentoring sessions, and educational outreach.",
  },
  {
    title: "Businesses and Sponsors",
    text: "Support the foundation with funding, resources, or employee volunteering efforts.",
  },
  {
    title: "Medical and Community Partners",
    text: "Collaborate for health camps, awareness drives, and practical village support.",
  },
];

const Partners = () => {
  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14 text-center">
        <p className="section-kicker">Partners</p>
        <h1 className="section-title mx-auto max-w-4xl">A dedicated page for collaboration opportunities and campaign support.</h1>
        <p className="section-copy mx-auto">
          This gives you another useful navigation page and makes the site feel more complete for NGOs, sponsors, and institutions.
        </p>
      </section>

      <section className="shell grid gap-6 md:grid-cols-3">
        {partnerGroups.map((group) => (
          <article key={group.title} className="card rounded-[2rem] p-6">
            <h2 className="text-2xl font-bold text-[var(--color-text)]">{group.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{group.text}</p>
          </article>
        ))}
      </section>

      <section className="shell section-space grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="card rounded-[2rem] p-6 sm:p-8">
          <p className="section-kicker">Why This Matters</p>
          <h2 className="section-title">Partnership pages help visitors understand how to work with the foundation.</h2>
          <p className="section-copy">
            It also gives your navigation more depth and improves how professional the overall website feels.
          </p>
        </div>
        <div className="rounded-[2rem] bg-[var(--color-surface-strong)] p-6 text-white sm:p-8">
          <h2 className="text-2xl font-bold">Partner with us</h2>
          <div className="mt-6 flex flex-col gap-3">
            <Link to="/contact" className="btn-primary">Start a Conversation</Link>
            <Link to="/programs" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">View Programs</Link>
            <Link to="/donate" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Sponsor a Program</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
