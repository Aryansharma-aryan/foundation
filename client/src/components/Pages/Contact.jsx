import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../../config/api";

const contactCards = [
  { label: "Phone", value: "+91 92152-00212", href: "tel:+919215200212" },
  { label: "Email", value: "info@davisgirdharfoundation.com", href: "mailto:info@davisgirdharfoundation.com" },
  { label: "Location", value: "C/o Sh. Sham Das, Umri, Mathana, Umri Thanesar, Kurukshetra, Haryana, 136131", href: "https://www.google.com/maps/search/C%2Fo+Sh.+Sham+Das%2C+Umri%2C+Mathana%2C+Umri+Thanesar%2C+Kurukshetra%2C+Haryana+136131" },
];

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  topic: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const parseError = async (response) => {
    try {
      const data = await response.json();
      return data.error || "Unable to send message.";
    } catch {
      return "Unable to send message.";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.fullName || !form.phone || !form.email || !form.topic || !form.message) {
      setStatus({ type: "error", message: "Please fill all fields before sending." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "info", message: "Sending your message..." });

    try {
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(await parseError(response));
      }

      setForm(initialForm);
      setStatus({ type: "success", message: "Message sent successfully. Our team will review it soon." });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to send message." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14 text-center">
        <p className="section-kicker">Contact</p>
        <h1 className="section-title mx-auto max-w-4xl">Reach the foundation directly</h1>
        <p className="section-copy mx-auto">
          Send your message through the form and it will reach the foundation team securely.
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
          <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            <input className="input-field" name="fullName" onChange={updateField} placeholder="Full name" value={form.fullName} />
            <input className="input-field" name="phone" onChange={updateField} placeholder="Phone" value={form.phone} />
            <input className="input-field sm:col-span-2" name="email" onChange={updateField} placeholder="Email address" type="email" value={form.email} />
            <select className="input-field sm:col-span-2" name="topic" onChange={updateField} value={form.topic}>
              <option value="" disabled>Select a topic</option>
              <option>Volunteer</option>
              <option>Donation</option>
              <option>Partnership</option>
              <option>General inquiry</option>
            </select>
            <textarea className="input-field min-h-36 sm:col-span-2" name="message" onChange={updateField} placeholder="Tell us how we can help" value={form.message} />

            {status.message && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold sm:col-span-2 ${
                  status.type === "success"
                    ? "border-green-200 bg-green-50 text-green-800"
                    : status.type === "error"
                      ? "border-red-200 bg-red-50 text-red-800"
                      : "border-[var(--color-line)] bg-white text-[var(--color-muted)]"
                }`}
              >
                {status.message}
              </div>
            )}

            <button disabled={isSubmitting} type="submit" className="btn-primary sm:col-span-2 sm:w-fit">
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
