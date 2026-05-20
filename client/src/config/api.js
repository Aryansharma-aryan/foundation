const productionApiBaseUrl = "https://foundation-q2nx.onrender.com";
const localApiBaseUrl = "http://localhost:5000";

const cleanBaseUrl = (url) => url.replace(/\/+$/, "");

const isLocalHost = (hostname) =>
  hostname === "localhost" || hostname === "127.0.0.1" || hostname === "";

export const apiBaseUrl = cleanBaseUrl(
  import.meta.env.VITE_API_BASE_URL ||
    (isLocalHost(window.location.hostname) ? localApiBaseUrl : productionApiBaseUrl),
);
