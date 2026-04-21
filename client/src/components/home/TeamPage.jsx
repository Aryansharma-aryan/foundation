import { Link } from "react-router-dom";
import cofounderImg from "../../assets/ravi-arora.jpeg";
import workerImg from "../../assets/aryan-sharma.jpeg";

const teamMembers = [
  {
    name: "Ravi Arora",
    role: "Co-Founder",
    phone: "+91 9215200212",
    email: "info@davisgirdharfoundation.com",
    image: cofounderImg,
    bio: "Guiding the foundation with a focus on sincere service, community trust, and practical support for children and families.",
  },
  {
    name: "Aryan Sharma",
    role: "NGO Worker",
    phone: "+91 9518403808",
    email: "arsharma2951@gmail.com",
    image: workerImg,
    bio: "Supporting field work and day-to-day community engagement so programs remain connected to real local needs.",
  },
];

const TeamPage = ({ standalone = false }) => {
  return (
    <section className={`relative overflow-hidden ${standalone ? "section-space pt-10 sm:pt-14" : "section-space"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,187,74,0.16),transparent_32%)]" />

      <div className="shell relative z-10">
        <div className="text-center">
          <p className="section-kicker">Team</p>
          <h2 className="section-title">
            The people helping Davis Girdhar Foundation stay caring, active, and dependable.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
            Behind every program is a team working with patience, responsibility, and a real connection to the community.
          </p>
        </div>

        <div className="mt-12 grid gap-7">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="group overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 md:grid md:grid-cols-[220px_1fr]"
            >
              <div className="relative h-[240px] overflow-hidden md:h-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(28,24,33,0.55)_100%)]" />
                <div className="absolute left-6 top-6 rounded-full bg-white/88 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  {member.role}
                </div>
              </div>

              <div className="p-7 sm:p-8">
                <h3 className="text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  {member.name}
                </h3>

                <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                  {member.bio}
                </p>

                <div className="mt-5 space-y-3 text-base text-[var(--color-muted)]">
                  <p>
                    <span className="font-semibold text-[var(--color-text)]">Phone:</span>{" "}
                    {member.phone}
                  </p>
                  <p>
                    <span className="font-semibold text-[var(--color-text)]">Email:</span>{" "}
                    {member.email}
                  </p>
                </div>

                {!standalone && (
                  <Link
                    to="/team"
                    className="mt-6 inline-flex items-center gap-2 text-base font-bold text-[var(--color-primary)] transition hover:text-[var(--color-primary-dark)]"
                  >
                    Meet the team
                    <span>→</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
