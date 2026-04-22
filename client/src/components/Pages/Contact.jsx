import { Link } from "react-router-dom";

const contactCards = [
  { label: "Phone", value: "+91 92152-00212", href: "tel:+919215200212" },
  { label: "Email", value: "info@davisgirdharfoundation.com", href: "mailto:info@davisgirdharfoundation.com" },
  { label: "Location", value: "C/o Sh. Sham Das, Umri, Mathana, Umri Thanesar, Kurukshetra, Haryana, 136131", href: "https://www.google.com/maps/search/C%2Fo+Sh.+Sham+Das%2C+Umri%2C+Mathana%2C+Umri+Thanesar%2C+Kurukshetra%2C+Haryana+136131" },
];

const Contact = () => {
  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14 text-center">
        <p className="section-kicker">Contact</p>
        <h1 className="section-title mx-auto max-w-4xl">Direct contact details with a calmer, more professional layout.</h1>
        <p className="section-copy mx-auto">
          This page keeps the important information visible without the oversized effects and duplicate styling from before.
        </p>
      </section>

      <section className="shell grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="card rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)]">Reach us directly</h2>
          <div className="mt-6 space-y-4">
            {contactCards.map((item) => (
              <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block rounded-2xl bg-[var(--color-bg)] p-4 transition hover:bg-white">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">{item.label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-700 sm:text-base">{item.value}</p>
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/get-involved" className="btn-primary">
              Join Us
            </Link>
            <Link to="/donate" className="btn-secondary">
              Donate
            </Link>
          </div>
        </div>

        <div className="card rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)]">Send a quick message</h2>
          <form className="mt-6 grid gap-4 sm:grid-cols-2">
            <input className="input-field" placeholder="Full name" />
            <input className="input-field" placeholder="Phone" />
            <input className="input-field sm:col-span-2" placeholder="Email address" />
            <select className="input-field sm:col-span-2" defaultValue="">
              <option value="" disabled>Select a topic</option>
              <option>Volunteer</option>
              <option>Donation</option>
              <option>Partnership</option>
              <option>General inquiry</option>
            </select>
            <textarea className="input-field min-h-36 sm:col-span-2" placeholder="Tell us how we can help" />
            <button type="button" className="btn-primary sm:col-span-2 sm:w-fit">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
