import { useMemo, useState } from "react";

const donationOptions = [
  { amount: 500, use: "Learning supplies" },
  { amount: 1000, use: "Student support" },
  { amount: 2500, use: "Monthly education sponsorship" },
  { amount: 5000, use: "Community food support" },
];

const initialForm = {
  amount: "1000",
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  pan: "",
  note: "",
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

const Donate = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isPaying, setIsPaying] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState("");

  const amountInPaise = useMemo(() => {
    const rupees = Number(form.amount);
    return Number.isFinite(rupees) ? Math.round(rupees * 100) : 0;
  }, [form.amount]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const setAmount = (amount) => {
    setForm((current) => ({ ...current, amount: String(amount) }));
  };

  const getPayload = () => ({
    amount: amountInPaise,
    currency: "INR",
    receipt: `donation_${Date.now()}`,
    donor: {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      note: form.note.trim(),
    },
    billing: {
      addressLine1: form.addressLine1.trim(),
      addressLine2: form.addressLine2.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      postalCode: form.postalCode.trim(),
      country: form.country.trim(),
      pan: form.pan.trim(),
    },
  });

  const validateForm = () => {
    if (amountInPaise < 100) {
      return "Donation amount must be at least Rs. 1.";
    }

    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "addressLine1",
      "city",
      "state",
      "postalCode",
      "country",
    ];

    const missingField = requiredFields.find((field) => !form[field].trim());
    if (missingField) {
      return "Please fill all required donor and billing details.";
    }

    if (!razorpayKeyId) {
      return "Razorpay key is missing. Please check the frontend .env file.";
    }

    if (!window.Razorpay) {
      return "Razorpay checkout could not load. Please refresh and try again.";
    }

    return "";
  };

  const parseError = async (response) => {
    try {
      const data = await response.json();
      return data.error || "Something went wrong. Please try again.";
    } catch {
      return "Something went wrong. Please try again.";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInvoiceUrl("");

    const validationError = validateForm();
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    setIsPaying(true);
    setStatus({ type: "info", message: "Creating a secure payment order..." });

    try {
      const payload = getPayload();
      const orderResponse = await fetch(`${apiBaseUrl}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!orderResponse.ok) {
        throw new Error(await parseError(orderResponse));
      }

      const order = await orderResponse.json();

      const checkout = new window.Razorpay({
        key: razorpayKeyId,
        amount: order.amount,
        currency: order.currency,
        name: "Davis Girdhar Foundation",
        description: "Donation",
        order_id: order.order_id,
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          donor_name: form.fullName,
          billing_city: form.city,
          billing_state: form.state,
        },
        theme: {
          color: "#e16a1f",
        },
        modal: {
          ondismiss: () => {
            setIsPaying(false);
            setStatus({ type: "error", message: "Payment was cancelled before completion." });
          },
        },
        handler: async (paymentResult) => {
          try {
            setStatus({ type: "info", message: "Verifying payment and preparing invoice..." });

            const verifyResponse = await fetch(`${apiBaseUrl}/api/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...payload,
                razorpay_payment_id: paymentResult.razorpay_payment_id,
                razorpay_order_id: paymentResult.razorpay_order_id,
                razorpay_signature: paymentResult.razorpay_signature,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error(await parseError(verifyResponse));
            }

            const verifiedPayment = await verifyResponse.json();
            setInvoiceUrl(`${apiBaseUrl}${verifiedPayment.download_url}`);
            setStatus({
              type: "success",
              message: "Payment verified. Your donation receipt is ready.",
            });
          } catch (error) {
            setStatus({
              type: "error",
              message: error.message || "Payment completed, but verification failed.",
            });
          } finally {
            setIsPaying(false);
          }
        },
      });

      checkout.on("payment.failed", (response) => {
        setIsPaying(false);
        setStatus({
          type: "error",
          message: response?.error?.description || "Payment failed. Please try again.",
        });
      });

      checkout.open();
    } catch (error) {
      setIsPaying(false);
      setStatus({ type: "error", message: error.message || "Unable to start payment." });
    }
  };

  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14 text-center">
        <p className="section-kicker">Donate</p>
        <h1 className="section-title mx-auto max-w-4xl">Make a secure donation</h1>
        <p className="section-copy mx-auto">
          Share your donor and billing details, complete payment through Razorpay, and download your receipt immediately after verification.
        </p>
      </section>

      <section className="shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)]">Choose an impact range</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {donationOptions.map((option) => (
              <button
                key={option.amount}
                type="button"
                onClick={() => setAmount(option.amount)}
                className={`rounded-2xl border bg-white p-5 text-left transition hover:border-[var(--color-primary)] ${
                  Number(form.amount) === option.amount
                    ? "border-[var(--color-primary)] shadow-[0_12px_30px_rgba(225,106,31,0.16)]"
                    : "border-[var(--color-line)]"
                }`}
              >
                <p className="text-2xl font-bold text-[var(--color-primary)]">
                  Rs. {option.amount.toLocaleString("en-IN")}
                </p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{option.use}</p>
              </button>
            ))}
          </div>

          <label className="mt-6 block">
            <span className="text-sm font-bold text-[var(--color-text)]">Custom amount in rupees</span>
            <input
              className="input-field mt-2"
              min="1"
              name="amount"
              onChange={updateField}
              type="number"
              value={form.amount}
            />
          </label>

          <div className="mt-8 rounded-2xl bg-[var(--color-bg)] p-5 text-sm leading-7 text-slate-700">
            Payments open in Razorpay Standard Checkout. The final receipt is generated only after server-side signature verification.
          </div>
        </div>

        <div className="card p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)]">Donor and billing details</h2>
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="input-field" name="fullName" onChange={updateField} placeholder="Full name *" value={form.fullName} />
              <input className="input-field" name="email" onChange={updateField} placeholder="Email address *" type="email" value={form.email} />
              <input className="input-field" name="phone" onChange={updateField} placeholder="Phone *" value={form.phone} />
              <input className="input-field" name="pan" onChange={updateField} placeholder="PAN (optional)" value={form.pan} />
            </div>

            <input className="input-field" name="addressLine1" onChange={updateField} placeholder="Billing address line 1 *" value={form.addressLine1} />
            <input className="input-field" name="addressLine2" onChange={updateField} placeholder="Billing address line 2" value={form.addressLine2} />

            <div className="grid gap-4 sm:grid-cols-2">
              <input className="input-field" name="city" onChange={updateField} placeholder="City *" value={form.city} />
              <input className="input-field" name="state" onChange={updateField} placeholder="State *" value={form.state} />
              <input className="input-field" name="postalCode" onChange={updateField} placeholder="Postal code *" value={form.postalCode} />
              <input className="input-field" name="country" onChange={updateField} placeholder="Country *" value={form.country} />
            </div>

            <textarea className="input-field min-h-28" name="note" onChange={updateField} placeholder="Optional note for the team" value={form.note} />

            {status.message && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
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

            <div className="flex flex-wrap items-center gap-3">
              <button className="btn-primary" disabled={isPaying} type="submit">
                {isPaying ? "Processing..." : `Donate Rs. ${Number(form.amount || 0).toLocaleString("en-IN")}`}
              </button>

              {invoiceUrl && (
                <a className="btn-secondary" href={invoiceUrl}>
                  Download receipt
                </a>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Donate;
