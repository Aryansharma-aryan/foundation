import { useEffect, useMemo, useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const tokenKey = "dgf_admin_token";

const formatAmount = (amount, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format((amount || 0) / 100);

const formatDate = (value) => (value ? new Date(value).toLocaleString("en-IN") : "N/A");

const Admin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [token, setToken] = useState(() => localStorage.getItem(tokenKey) || "");
  const [donations, setDonations] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = useMemo(
    () => donations.reduce((sum, donation) => sum + (Number(donation.amount) || 0), 0),
    [donations],
  );

  const updateField = (event) => {
    const { name, value } = event.target;
    setCredentials((current) => ({ ...current, [name]: value }));
  };

  const parseError = async (response) => {
    try {
      const data = await response.json();
      return data.error || "Something went wrong.";
    } catch {
      return "Something went wrong.";
    }
  };

  const fetchDonations = async (adminToken = token) => {
    if (!adminToken) return;

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/donations`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem(tokenKey);
          setToken("");
        }

        throw new Error(await parseError(response));
      }

      const data = await response.json();
      setDonations(data.donations || []);
    } catch (error) {
      setMessage(error.message || "Unable to load admin data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(await parseError(response));
      }

      const data = await response.json();
      localStorage.setItem(tokenKey, data.token);
      setToken(data.token);
      setCredentials({ email: "", password: "" });
    } catch (error) {
      setMessage(error.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(tokenKey);
    setToken("");
    setDonations([]);
    setMessage("");
  };

  if (!token) {
    return (
      <div className="shell section-space max-w-2xl">
        <div className="card p-6 sm:p-8">
          <p className="section-kicker">Admin</p>
          <h1 className="mt-3 text-3xl font-bold text-[var(--color-text)] sm:text-4xl">Admin login</h1>
          <form className="mt-6 grid gap-4" onSubmit={handleLogin}>
            <input
              className="input-field"
              name="email"
              onChange={updateField}
              placeholder="Admin email"
              type="email"
              value={credentials.email}
            />
            <input
              className="input-field"
              name="password"
              onChange={updateField}
              placeholder="Password"
              type="password"
              value={credentials.password}
            />
            {message && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
                {message}
              </div>
            )}
            <button className="btn-primary w-fit" disabled={isLoading} type="submit">
              {isLoading ? "Checking..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="shell section-space">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Admin</p>
          <h1 className="mt-3 text-3xl font-bold text-[var(--color-text)] sm:text-5xl">Donation payments</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary" disabled={isLoading} onClick={() => fetchDonations()} type="button">
            Refresh
          </button>
          <button className="btn-primary" onClick={handleLogout} type="button">
            Logout
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Payments</p>
          <p className="mt-2 text-3xl font-bold text-[var(--color-text)]">{donations.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Total received</p>
          <p className="mt-2 text-3xl font-bold text-[var(--color-primary)]">{formatAmount(totalAmount)}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Receipt status</p>
          <p className="mt-2 text-3xl font-bold text-[var(--color-text)]">Attached</p>
        </div>
      </div>

      {message && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {message}
        </div>
      )}

      <div className="mt-8 grid gap-5">
        {isLoading && <div className="card p-6 text-[var(--color-muted)]">Loading payment details...</div>}

        {!isLoading && donations.length === 0 && (
          <div className="card p-6 text-[var(--color-muted)]">No verified payments found yet.</div>
        )}

        {donations.map((donation) => (
          <article key={donation.invoiceId} className="card p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-bold uppercase text-[var(--color-muted)]">{donation.invoiceId}</p>
                <h2 className="mt-2 text-2xl font-bold text-[var(--color-text)]">
                  {donation.donor?.fullName || "Unnamed donor"}
                </h2>
                <p className="mt-1 text-[var(--color-muted)]">{formatDate(donation.createdAt)}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
                  {donation.status || "paid"}
                </span>
                <a className="btn-secondary" href={`${apiBaseUrl}${donation.receiptUrl}`}>
                  Download receipt
                </a>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4">
                <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Payment</p>
                <p className="mt-2 text-2xl font-bold text-[var(--color-primary)]">
                  {formatAmount(donation.amount, donation.currency)}
                </p>
                <p className="mt-3 break-all text-sm text-[var(--color-muted)]">Payment ID: {donation.paymentId}</p>
                <p className="mt-1 break-all text-sm text-[var(--color-muted)]">Order ID: {donation.orderId}</p>
              </div>

              <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4">
                <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Donor</p>
                <p className="mt-2 text-sm text-[var(--color-text)]">{donation.donor?.email || "N/A"}</p>
                <p className="mt-1 text-sm text-[var(--color-text)]">{donation.donor?.phone || "N/A"}</p>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{donation.donor?.note || "No note"}</p>
              </div>

              <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4">
                <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Billing</p>
                <p className="mt-2 text-sm text-[var(--color-text)]">
                  {[donation.billing?.addressLine1, donation.billing?.addressLine2].filter(Boolean).join(", ") || "N/A"}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text)]">
                  {[donation.billing?.city, donation.billing?.state, donation.billing?.postalCode]
                    .filter(Boolean)
                    .join(", ") || "N/A"}
                </p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">PAN: {donation.billing?.pan || "N/A"}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Admin;
