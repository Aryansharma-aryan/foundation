const donationOptions = [
  { amount: "Rs. 500", use: "Learning supplies" },
  { amount: "Rs. 1,000", use: "Student support" },
  { amount: "Rs. 2,500", use: "Monthly education sponsorship" },
  { amount: "Rs. 5,000", use: "Community food support" },
];

const Donate = () => {
  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14 text-center">
        <p className="section-kicker">Donate</p>
        <h1 className="section-title mx-auto max-w-4xl">A donation page that is easier to trust, scan, and use on mobile.</h1>
        <p className="section-copy mx-auto">
          Instead of a very heavy multi-step interface, this version keeps the payment information and impact cues simple and professional.
        </p>
      </section>

      <section className="shell grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="card rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)]">Choose an impact range</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {donationOptions.map((option) => (
              <div key={option.amount} className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
                <p className="text-2xl font-bold text-[var(--color-primary)]">{option.amount}</p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{option.use}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-[var(--color-bg)] p-5 text-sm leading-7 text-slate-700">
            UPI ID: <span className="font-bold text-[var(--color-text)]">info@davisgirdharfoundation</span>
            <br />
            Please share payment confirmation on WhatsApp: <span className="font-bold text-[var(--color-text)]">+91 92152-00212</span>
          </div>
        </div>

        <div className="card rounded-[2rem] p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)]">Donor details</h2>
          <form className="mt-6 grid gap-4">
            <input className="input-field" placeholder="Full name" />
            <input className="input-field" placeholder="Email address" />
            <input className="input-field" placeholder="Phone" />
            <textarea className="input-field min-h-32" placeholder="Optional note for the team" />
            <button type="button" className="btn-primary w-fit">
              I Have Made the Payment
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Donate;
