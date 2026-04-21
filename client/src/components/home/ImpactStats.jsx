import { Link } from "react-router-dom";
import studentsImage from "../../assets/students.jpeg";
import mealsImage from "../../assets/meals.jpeg";

const stories = [
  {
    title: "Students Supported",
    value: "300+",
    copy: "Children receiving education support, mentorship, and stronger confidence in their learning journey.",
    image: studentsImage,
  },
  {
    title: "Meals and Food Support",
    value: "1,200+",
    copy: "Practical meal and food assistance helping families manage immediate needs with dignity.",
    image: mealsImage,
  },
];

const impactLinks = [
  { label: "Open Impact Page", to: "/impact" },
  { label: "Read Stories", to: "/stories" },
  { label: "Support Programs", to: "/donate" },
  { label: "Join as Volunteer", to: "/get-involved" },
];

const ImpactStats = () => {
  return (
    <section className="section-space">
      <div className="shell">
        <div className="rounded-[2.5rem] border border-[var(--color-line)] bg-[linear-gradient(180deg,#fff7ee_0%,#ffedd9_100%)] px-6 py-12 shadow-[var(--shadow-soft)] sm:px-10 lg:px-12">
          <div className="text-center">
            <p className="section-kicker">Impact</p>
            <h2 className="mt-4 text-4xl font-bold text-[var(--color-text)] sm:text-5xl lg:text-6xl">
              Visible support. Real service. Meaningful outcomes.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
              These highlights reflect how Davis Girdhar Foundation is supporting children and families in practical ways.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {stories.map((story) => (
              <article key={story.title} className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/88 shadow-[var(--shadow-card)]">
                <img src={story.image} alt={story.title} className="h-64 w-full object-cover sm:h-72" />
                <div className="p-6 sm:p-8">
                  <p className="text-5xl font-bold text-[var(--color-primary)]">{story.value}</p>
                  <h3 className="mt-2 text-3xl font-bold text-[var(--color-text)]">{story.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">{story.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {impactLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-[1.5rem] border border-[var(--color-line)] bg-white/84 p-4 text-base font-bold text-[var(--color-text)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
