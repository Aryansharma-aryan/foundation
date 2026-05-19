const getRazorpayStatusCode = (error) =>
  error?.statusCode || error?.error?.status_code || error?.response?.status;

export const sendRazorpayError = (res, error, fallbackMessage) => {
  const statusCode = getRazorpayStatusCode(error);
  if (statusCode === 401) {
    return res.status(401).json({ error: "Razorpay authentication failed." });
  }

  console.error(fallbackMessage, error);
  return res.status(500).json({ error: fallbackMessage });
};
