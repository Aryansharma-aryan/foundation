import crypto from "node:crypto";

export const verifySignature = ({ orderId, paymentId, signature }) => {
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const expected = Buffer.from(generatedSignature, "hex");
  const received = Buffer.from(signature, "hex");

  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
};
