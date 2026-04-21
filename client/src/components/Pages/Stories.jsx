import { Link } from "react-router-dom";

const stories = [
  {
    title: "A more confident classroom",
    text: "Students benefit from a structured setting where support is regular and expectations are clear.",
  },
  {
    title: "Digital skills with real purpose",
    text: "Coding and computer sessions help children feel more prepared for modern learning environments.",
  },
  {
    title: "Food support that strengthens learning",
    text: "Nutrition support creates better conditions for focus, attendance, and everyday stability.",
  },
];

const Stories = () => {
  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14 text-center">
        <p className="section-kicker">Stories</p>
        <h1 className="section-title mx-auto max-w-4xl">A richer page for testimonials, moments, and human connection.</h1>
        <p className="section-copy mx-auto">
          This page gives the website more emotional depth and creates more internal links for visitors to explore.
        </p>
      </section>

      <section className="shell grid gap-6 lg:grid-cols-3">
        {stories.map((story) => (
          <article key={story.title} className="card rounded-[2rem] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">Foundation Story</p>
            <h2 className="mt-4 text-2xl font-bold text-[var(--color-text)]">{story.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{story.text}</p>
          </article>
        ))}
      </section>

      <section className="shell section-space">
        <div className="rounded-[2rem] bg-[var(--color-surface-strong)] px-6 py-10 text-white sm:px-10">
          <h2 className="text-3xl font-bold">Keep exploring the foundation</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/impact" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Open Impact</Link>
            <Link to="/team" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Meet the Team</Link>
            <Link to="/gallery" className="btn-primary">Open Gallery</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stories;
