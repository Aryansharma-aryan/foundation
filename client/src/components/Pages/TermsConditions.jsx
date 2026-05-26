const TermsConditions = () => {
  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14 text-center">
        <p className="section-kicker">Legal</p>
        <h1 className="section-title mx-auto max-w-4xl">Terms & Conditions</h1>
        <p className="section-copy mx-auto">
          Please read these terms before using this website or making a donation.
        </p>
      </section>

      <section className="shell">
        <article className="card p-6 sm:p-8">
          <div className="space-y-8 text-[var(--color-muted)]">
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">1. Introduction</h2>
              <p className="mt-3">
                Welcome to Davis Girdhar Foundation. By using this website and making a donation, you agree to these Terms & Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">2. Donations</h2>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>All donations made through this website are voluntary.</li>
                <li>Donations will be used to support the charitable activities and objectives of Davis Girdhar Foundation.</li>
                <li>Donors must provide accurate information while making a donation.</li>
                <li>The Foundation reserves the right to accept or decline any donation if required by law or internal policy.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">3. Payment Processing</h2>
              <p className="mt-3">
                Online donations are securely processed through Razorpay. Davis Girdhar Foundation does not store credit card, debit card, net banking, UPI PIN, CVV, or other sensitive payment information. All payment-related information is handled directly by Razorpay according to its security standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">4. Refund Policy</h2>
              <p className="mt-3">Donations are generally non-refundable.</p>
              <p className="mt-3">Refund requests may be considered only in cases such as:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Duplicate transactions</li>
                <li>Incorrect amount charged due to a technical error</li>
                <li>Unauthorized transaction verified by the donor's bank</li>
              </ul>
              <p className="mt-3">
                Refund requests must be submitted within 7 days of the transaction by emailing{" "}
                <a className="font-bold text-[var(--color-primary)]" href="mailto:info@davisgirdharfoundation.org">
                  info@davisgirdharfoundation.org
                </a>
                .
              </p>
              <p className="mt-3">Approved refunds will be processed through the original payment method.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">5. Website Content</h2>
              <p className="mt-3">
                All content, logos, images, and materials available on this website belong to Davis Girdhar Foundation unless otherwise stated. Unauthorized copying or use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">6. Changes to Terms</h2>
              <p className="mt-3">
                Davis Girdhar Foundation may update these Terms & Conditions at any time. Updated versions will be published on this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)]">7. Contact Us</h2>
              <p className="mt-3">
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
              <h2 className="text-2xl font-bold text-[var(--color-text)]">8. Tax Benefit Disclaimer</h2>
              <p className="mt-3">
                The Organisation is currently not registered under Section 12AB and Section 80G of the Income Tax Act, 1961, or under any other similar provisions of any applicable law, including any amendments, modifications, or re-enactments thereof. Therefore, donations made to Davis Girdhar Foundation are not eligible for any tax deduction, exemption, rebate, or tax benefit under the Income Tax Act, 1961 or any other applicable law. Donors should not claim any tax benefit in respect of such donations.
              </p>
            </section>
          </div>
        </article>
      </section>
    </div>
  );
};

export default TermsConditions;
