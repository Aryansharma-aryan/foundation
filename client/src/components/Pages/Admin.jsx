import { useEffect, useMemo, useState } from "react";
import { apiBaseUrl } from "../../config/api";

const tokenKey = "dgf_admin_token";

const emptyAnalytics = {
  totals: {
    users: 0,
    payments: 0,
    receivedAmount: 0,
  },
  periods: [],
};

const periodFallbacks = [
  { key: "last24Hours", label: "Last 24 hours", days: 1 },
  { key: "last7Days", label: "Last 7 days", days: 7 },
  { key: "last30Days", label: "Last 30 days", days: 30 },
];

const formatAmount = (amount, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format((amount || 0) / 100);

const formatDate = (value) => (value ? new Date(value).toLocaleString("en-IN") : "N/A");

const getDonorKey = (donation) =>
  (donation.donor?.email || donation.donor?.phone || donation.donor?.fullName || "").trim().toLowerCase();

const buildFallbackPeriods = (donations) => {
  const now = Date.now();

  return periodFallbacks.map((period) => {
    const startsAt = now - period.days * 24 * 60 * 60 * 1000;
    const periodDonations = donations.filter((donation) => new Date(donation.createdAt).getTime() >= startsAt);
    const users = new Set(periodDonations.map(getDonorKey).filter(Boolean));

    return {
      key: period.key,
      label: period.label,
      userCount: users.size,
      paymentCount: periodDonations.length,
      totalAmount: periodDonations.reduce((sum, donation) => sum + (Number(donation.amount) || 0), 0),
    };
  });
};

const Admin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [token, setToken] = useState(() => localStorage.getItem(tokenKey) || "");
  const [analytics, setAnalytics] = useState(emptyAnalytics);
  const [donations, setDonations] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("analytics");
  const [message, setMessage] = useState("");
  const [messagesNotice, setMessagesNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStatementDownloading, setIsStatementDownloading] = useState(false);

  const totalAmount = useMemo(
    () => analytics.totals?.receivedAmount || donations.reduce((sum, donation) => sum + (Number(donation.amount) || 0), 0),
    [analytics.totals?.receivedAmount, donations],
  );

  const uniqueDonorCount = useMemo(
    () => analytics.totals?.users || new Set(donations.map(getDonorKey).filter(Boolean)).size,
    [analytics.totals?.users, donations],
  );

  const periodAnalytics = analytics.periods?.length ? analytics.periods : buildFallbackPeriods(donations);

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

  const fetchAdminJson = async (url, headers) => {
    const response = await fetch(url, { headers });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem(tokenKey);
        setToken("");
      }

      throw new Error(await parseError(response));
    }

    return response.json();
  };

  const fetchAdminData = async (adminToken = token) => {
    if (!adminToken) return;

    setIsLoading(true);
    setMessage("");
    setMessagesNotice("");

    try {
      const headers = { Authorization: `Bearer ${adminToken}` };
      const donationData = await fetchAdminJson(`${apiBaseUrl}/api/admin/donations`, headers);
      setDonations(donationData.donations || []);

      const analyticsResponse = await fetch(`${apiBaseUrl}/api/admin/analytics`, { headers });
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setAnalytics(analyticsData || emptyAnalytics);
      } else if (analyticsResponse.status === 404) {
        setAnalytics(emptyAnalytics);
      } else {
        throw new Error(await parseError(analyticsResponse));
      }

      const messageResponse = await fetch(`${apiBaseUrl}/api/admin/contact-messages`, { headers });

      if (!messageResponse.ok) {
        if (messageResponse.status === 401) {
          localStorage.removeItem(tokenKey);
          setToken("");
          throw new Error(await parseError(messageResponse));
        }

        if (messageResponse.status === 404) {
          setContactMessages([]);
          setMessagesNotice("Contact messages will appear after the backend redeploy finishes.");
          return;
        }

        throw new Error(await parseError(messageResponse));
      }

      const messageData = await messageResponse.json();
      setContactMessages(messageData.messages || []);
    } catch (error) {
      setMessage(error.message || "Unable to load admin data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
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
    setAnalytics(emptyAnalytics);
    setDonations([]);
    setContactMessages([]);
    setMessage("");
    setMessagesNotice("");
  };

  const handleDownloadStatement = async () => {
    setIsStatementDownloading(true);
    setMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/payment-statement/download`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(await parseError(response));
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `payment-statement-${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      setMessage(error.message || "Unable to download payment statement.");
    } finally {
      setIsStatementDownloading(false);
    }
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
          <h1 className="mt-3 text-3xl font-bold text-[var(--color-text)] sm:text-5xl">Admin dashboard</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary" disabled={isLoading} onClick={() => fetchAdminData()} type="button">
            Refresh
          </button>
          <button className="btn-primary" onClick={handleLogout} type="button">
            Logout
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-5">
          <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Total users</p>
          <p className="mt-2 text-3xl font-bold text-[var(--color-text)]">{uniqueDonorCount}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Payments</p>
          <p className="mt-2 text-3xl font-bold text-[var(--color-text)]">{donations.length}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Total received</p>
          <p className="mt-2 text-3xl font-bold text-[var(--color-primary)]">{formatAmount(totalAmount)}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Messages</p>
          <p className="mt-2 text-3xl font-bold text-[var(--color-text)]">{contactMessages.length}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {[
          ["analytics", "Analytics"],
          ["payments", "Payment Statement"],
          ["messages", "Contact Messages"],
        ].map(([tab, label]) => (
          <button
            className={activeTab === tab ? "btn-primary" : "btn-secondary"}
            key={tab}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      {message && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {message}
        </div>
      )}

      {messagesNotice && (
        <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-800">
          {messagesNotice}
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="mt-8 grid gap-5">
          {isLoading && <div className="card p-6 text-[var(--color-muted)]">Loading analytics...</div>}

          <div className="grid gap-4 lg:grid-cols-3">
            {periodAnalytics.map((period) => (
              <article className="card p-5 sm:p-6" key={period.key}>
                <p className="text-sm font-bold uppercase text-[var(--color-muted)]">{period.label}</p>
                <p className="mt-3 text-4xl font-bold text-[var(--color-text)]">{period.userCount}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--color-muted)]">unique users</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[var(--color-line)] bg-white p-3">
                    <p className="text-xs font-bold uppercase text-[var(--color-muted)]">Payments</p>
                    <p className="mt-1 text-xl font-bold text-[var(--color-text)]">{period.paymentCount}</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--color-line)] bg-white p-3">
                    <p className="text-xs font-bold uppercase text-[var(--color-muted)]">Amount</p>
                    <p className="mt-1 text-xl font-bold text-[var(--color-primary)]">
                      {formatAmount(period.totalAmount)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {activeTab === "payments" && (
        <div className="mt-8 grid gap-5">
          <div className="flex flex-col gap-4 rounded-3xl border border-[var(--color-line)] bg-white/80 p-5 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Payment records</p>
              <h2 className="mt-1 text-2xl font-bold text-[var(--color-text)]">Full user payment statement</h2>
            </div>
            <button
              className="btn-primary w-fit"
              disabled={isStatementDownloading || isLoading}
              onClick={handleDownloadStatement}
              type="button"
            >
              {isStatementDownloading ? "Preparing PDF..." : "Download statement PDF"}
            </button>
          </div>

          {isLoading && <div className="card p-6 text-[var(--color-muted)]">Loading payment details...</div>}

          {!isLoading && donations.length === 0 && (
            <div className="card p-6 text-[var(--color-muted)]">No verified payments found yet.</div>
          )}

          {donations.length > 0 && (
            <section className="card overflow-hidden">
              <div className="border-b border-[var(--color-line)] p-5 sm:p-6">
                <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Full payment statement</p>
                <h2 className="mt-2 text-2xl font-bold text-[var(--color-text)]">All user payments</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-[1100px] w-full border-collapse text-left text-sm">
                  <thead className="bg-white/80 text-xs uppercase text-[var(--color-muted)]">
                    <tr>
                      <th className="px-4 py-3">No.</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Donor</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Invoice</th>
                      <th className="px-4 py-3">Payment ID</th>
                      <th className="px-4 py-3">Order ID</th>
                      <th className="px-4 py-3">Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation, index) => (
                      <tr className="border-t border-[var(--color-line)] bg-white/45" key={donation.invoiceId}>
                        <td className="px-4 py-3 font-semibold text-[var(--color-muted)]">{index + 1}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{formatDate(donation.createdAt)}</td>
                        <td className="px-4 py-3 font-semibold">{donation.donor?.fullName || "Unnamed donor"}</td>
                        <td className="px-4 py-3">{donation.donor?.email || "N/A"}</td>
                        <td className="px-4 py-3">{donation.donor?.phone || "N/A"}</td>
                        <td className="px-4 py-3 font-bold text-[var(--color-primary)]">
                          {formatAmount(donation.amount, donation.currency)}
                        </td>
                        <td className="px-4 py-3">{donation.status || "paid"}</td>
                        <td className="px-4 py-3 font-semibold">{donation.invoiceId}</td>
                        <td className="max-w-[180px] truncate px-4 py-3" title={donation.paymentId}>
                          {donation.paymentId}
                        </td>
                        <td className="max-w-[180px] truncate px-4 py-3" title={donation.orderId}>
                          {donation.orderId}
                        </td>
                        <td className="px-4 py-3">
                          <a className="font-bold text-[var(--color-primary)]" href={`${apiBaseUrl}${donation.receiptUrl}`}>
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
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
      )}

      {activeTab === "messages" && (
        <div className="mt-8 grid gap-5">
          {isLoading && <div className="card p-6 text-[var(--color-muted)]">Loading contact messages...</div>}

          {!isLoading && contactMessages.length === 0 && (
            <div className="card p-6 text-[var(--color-muted)]">No contact messages found yet.</div>
          )}

          {contactMessages.map((contactMessage) => (
            <article key={contactMessage.id} className="card p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase text-[var(--color-primary)]">{contactMessage.topic}</p>
                  <h2 className="mt-2 text-2xl font-bold text-[var(--color-text)]">{contactMessage.fullName}</h2>
                  <p className="mt-1 text-[var(--color-muted)]">{formatDate(contactMessage.createdAt)}</p>
                </div>
                <span className="w-fit rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-[var(--color-primary)]">
                  {contactMessage.status || "new"}
                </span>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4">
                  <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Contact</p>
                  <a className="mt-2 block text-sm font-semibold text-[var(--color-text)]" href={`mailto:${contactMessage.email}`}>
                    {contactMessage.email}
                  </a>
                  <a className="mt-1 block text-sm font-semibold text-[var(--color-text)]" href={`tel:${contactMessage.phone}`}>
                    {contactMessage.phone}
                  </a>
                </div>

                <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4">
                  <p className="text-sm font-bold uppercase text-[var(--color-muted)]">Message</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[var(--color-text)]">
                    {contactMessage.message}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
