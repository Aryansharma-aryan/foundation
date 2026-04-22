import { Link } from "react-router-dom";
import codingImage from "../../assets/program-codding.jpg";
import educationImage from "../../assets/students.jpeg";
import foodImage from "../../assets/meals.jpeg";
import healthcareImage from "../../assets/program-healthcare.jpg";

const programs = [
  {
    title: "Education Support",
    slug: "education",
    text: "Regular teaching support and mentoring for children who need a stronger academic foundation.",
    image: educationImage,
    to: "/programs/education",
  },
  {
    title: "Computer and Coding",
    slug: "coding",
    text: "Basic digital learning that helps students build confidence with modern tools and ideas.",
    image: codingImage,
    to: "/programs/coding",
  },
  {
    title: "Food and Nutrition",
    slug: "food",
    text: "Practical support for children and families through meals and food assistance.",
    image: foodImage,
    to: "/programs/food",
  },
  {
    title: "Healthcare Outreach",
    slug: "healthcare",
    text: "Village-focused health awareness and support through camps and community drives.",
    image: healthcareImage,
    to: "/programs/healthcare",
  },
];

const ProgramsPreview = () => {
  return (
    <section className="section-space">
      <div className="shell">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Programs</p>
            <h2 className="section-title max-w-4xl">
              Four focused program areas through which the foundation serves the community.
            </h2>
          </div>
          <Link to="/programs" className="btn-secondary w-fit">
            View All Programs
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {programs.map((program) => (
            <article key={program.title} className="card overflow-hidden">
              <img src={program.image} alt={program.title} className="h-56 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[var(--color-text)]">{program.title}</h3>
                <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">{program.text}</p>
                <Link
                  to={program.to}
                  className="mt-5 inline-flex text-base font-bold text-[var(--color-primary)] transition hover:text-[var(--color-primary-dark)]"
                >
                  Learn more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsPreview;
