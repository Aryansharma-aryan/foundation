import { Link } from "react-router-dom";
import codingImage from "../../assets/program-codding.jpg";
import educationImage from "../../assets/students.jpeg";
import foodImage from "../../assets/meals.jpeg";
import healthcareImage from "../../assets/program-healthcare.jpg";

const programs = [
  {
    title: "Education Support",
    slug: "education",
    summary: "Daily teaching support for children who need a steady, encouraging, and more structured learning environment.",
    image: educationImage,
    points: ["Academic support", "Guided learning", "Student confidence"],
    detail:
      "We help children continue learning with better consistency through personal guidance, subject support, and a caring study environment.",
  },
  {
    title: "Computer and Coding Training",
    slug: "coding",
    summary: "Foundational digital skills that help children engage with modern tools and future opportunities.",
    image: codingImage,
    points: ["Computer basics", "Coding exposure", "Digital confidence"],
    detail:
      "Students are introduced to computers and coding in a simple, practical way so digital learning feels useful and accessible.",
  },
  {
    title: "Food Distribution",
    slug: "food",
    summary: "Meal and ration support designed to strengthen health, dignity, and family stability.",
    image: foodImage,
    points: ["Meals and rations", "Family support", "Community-focused delivery"],
    detail:
      "This work helps reduce immediate pressure on families and supports better daily well-being for children and the community.",
  },
  {
    title: "Healthcare Outreach",
    slug: "healthcare",
    summary: "Village outreach that helps make health guidance, awareness, and early support more available.",
    image: healthcareImage,
    points: ["Health awareness", "Community camps", "Closer village access"],
    detail:
      "We bring healthcare support closer to families through local outreach, awareness, and practical community engagement.",
  },
];

const Programs = () => {
  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14 text-center">
        <p className="section-kicker">Programs</p>
        <h1 className="section-title mx-auto max-w-4xl">Programs through which Davis Girdhar Foundation serves the community.</h1>
        <p className="section-copy mx-auto">
          Each program has its own dedicated page so visitors can understand in a genuine way how the foundation provides support on the ground.
        </p>
      </section>

      <section className="shell grid gap-6">
        {programs.map((program) => (
          <article key={program.title} className="card overflow-hidden rounded-[2rem] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
            <img src={program.image} alt={program.title} className="h-72 w-full object-cover lg:h-full" />
            <div className="p-6 sm:p-8">
              <h2 className="text-3xl font-bold text-[var(--color-text)]">{program.title}</h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{program.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {program.points.map((point) => (
                  <span key={point} className="rounded-full bg-[var(--color-bg)] px-4 py-2 text-sm font-semibold text-slate-700">
                    {point}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-base leading-8 text-[var(--color-muted)]">
                {program.detail}
              </p>
              <Link
                to={`/programs/${program.slug}`}
                className="mt-6 inline-flex text-base font-bold text-[var(--color-primary)] transition hover:text-[var(--color-primary-dark)]"
              >
                Read full program detail
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="shell section-space">
        <div className="rounded-[2rem] bg-slate-950 px-6 py-10 text-white sm:px-10">
          <h2 className="text-3xl font-bold">Want to help expand these programs?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            The best next step is either volunteering time or supporting the programs financially.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/get-involved" className="btn-primary">Volunteer</Link>
            <Link to="/impact" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">See Impact</Link>
            <Link to="/donate" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Donate</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
