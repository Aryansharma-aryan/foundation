const PrivacyPolicy = () => {
  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14 text-center">
        <p className="section-kicker">Legal</p>
        <h1 className="section-title mx-auto max-w-4xl">Privacy Policy</h1>
        <p className="section-copy mx-auto">
          Davis Girdhar Foundation values your privacy and is committed to protecting your personal information.
        </p>
      </section>

      <section className="shell">
        <article className="card p-6 sm:p-8">
          <div className="space-y-8 text-[var(--color-muted)]">
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">1. Introduction</h2>
              <p className="mt-3">
                Davis Girdhar Foundation values your privacy and is committed to protecting your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">2. Information We Collect</h2>
              <p className="mt-3">When you make a donation or contact us, we may collect:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Donation Amount</li>
                <li>Transaction Details</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">3. How We Use Information</h2>
              <p className="mt-3">Your information may be used to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Process donations</li>
                <li>Issue donation acknowledgements</li>
                <li>Respond to inquiries</li>
                <li>Maintain donation records</li>
                <li>Improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">4. Payment Security</h2>
              <p className="mt-3">All online payments are processed securely through Razorpay.</p>
              <p className="mt-3">Davis Girdhar Foundation does not store:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Card details</li>
                <li>CVV numbers</li>
                <li>UPI PINs</li>
                <li>Net banking credentials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">5. Sharing of Information</h2>
              <p className="mt-3">
                We do not sell, rent, or trade donor information. Information may only be shared with payment processors or authorities when required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">6. Data Security</h2>
              <p className="mt-3">
                We take reasonable measures to protect your information from unauthorized access, misuse, or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">7. Contact Us</h2>
              <p className="mt-3">
                For any privacy-related questions, please contact:
                <br />
                Davis Girdhar Foundation
                <br />
                Email:{" "}
                <a className="font-bold text-[var(--color-primary)]" href="mailto:info@davisgirdharfoundation.org">
                  info@davisgirdharfoundation.org
                </a>
                <br />
                Phone:{" "}
                <a className="font-bold text-[var(--color-primary)]" href="tel:+919215200212">
                  +91 9215200212
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">8. Tax Exemption Disclosure</h2>
              <p className="mt-3">
                The Organisation is currently not registered under Section 12AB and Section 80G of the Income Tax Act, 1961, or under any other similar provisions of any applicable law, including any amendments, modifications, or re-enactments thereof. Accordingly, donations made to Davis Girdhar Foundation are not eligible for any tax deduction, exemption, rebate, or tax benefit under any applicable law.
              </p>
            </section>
          </div>
        </article>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
