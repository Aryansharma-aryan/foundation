import { Link } from "react-router-dom";

const ways = [
  "Volunteer in teaching sessions or community events",
  "Donate funds, supplies, or learning materials",
  "Partner for outreach, campaigns, or sponsorship",
  "Share the foundation’s work within your network",
];

const GetInvolved = ({ compact = false }) => {
  if (compact) {
    return (
      <section className="shell section-space">
        <div className="rounded-[2.2rem] border border-[var(--color-line)] bg-[linear-gradient(120deg,#fff0df_0%,#fffaf5_100%)] px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10">
          <p className="section-kicker">Get Involved</p>
          <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl">
                Support the foundation in a way that matches your time, skills, or resources.
              </h2>
              <p className="mt-4 text-lg leading-8 text-[var(--color-muted)]">
                Every contribution helps Davis Girdhar Foundation reach more children and families with meaningful care.
              </p>
            </div>
            <Link to="/get-involved" className="btn-primary w-fit">
              Open Full Page
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="shell section-space">
      <section className="text-center">
        <p className="section-kicker">Get Involved</p>
        <h1 className="section-title">Choose a genuine way to stand with Davis Girdhar Foundation.</h1>
        <p className="section-copy mx-auto">
          Whether you want to volunteer, donate, collaborate, or spread awareness, the foundation welcomes support that strengthens community impact.
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="card p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">Ways to contribute</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {ways.map((way) => (
              <div
                key={way}
                className="rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-4 text-base font-semibold text-[var(--color-text)]"
              >
                {way}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="tel:+919215200212" className="btn-primary">
              Call Us
            </a>
            <Link to="/contact" className="btn-secondary">
              Send a Message
            </Link>
          </div>
        </div>

        <div className="card p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">What happens after you reach out</h2>
          <div className="mt-6 space-y-4">
            {[
              "We review your interest and respond as quickly as possible.",
              "We guide you toward the most suitable way to help.",
              "We coordinate the next step clearly with the foundation team.",
            ].map((step, index) => (
              <div key={step} className="flex gap-4 rounded-[1.5rem] bg-[var(--color-bg-soft)] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-bold text-[var(--color-primary)] shadow-sm">
                  {index + 1}
                </div>
                <p className="text-base leading-7 text-[var(--color-text)]">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-[1.5rem] bg-[linear-gradient(120deg,#fff5ea_0%,#fffdfb_100%)] p-5 text-base leading-7 text-[var(--color-muted)]">
            Contact: +91 9215200212 | info@davisgirdharfoundation.com
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
