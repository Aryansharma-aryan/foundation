export const cleanString = (value) => (typeof value === "string" ? value.trim() : "");

export const normalizeDetails = (body) => ({
  donor: {
    fullName: cleanString(body?.donor?.fullName),
    email: cleanString(body?.donor?.email),
    phone: cleanString(body?.donor?.phone),
    note: cleanString(body?.donor?.note),
  },
  billing: {
    addressLine1: cleanString(body?.billing?.addressLine1),
    addressLine2: cleanString(body?.billing?.addressLine2),
    city: cleanString(body?.billing?.city),
    state: cleanString(body?.billing?.state),
    postalCode: cleanString(body?.billing?.postalCode),
    country: cleanString(body?.billing?.country) || "India",
    pan: cleanString(body?.billing?.pan),
  },
});

export const isMissingRequiredDetails = ({ donor, billing }) =>
  !donor.fullName ||
  !donor.email ||
  !donor.phone ||
  !billing.addressLine1 ||
  !billing.city ||
  !billing.state ||
  !billing.postalCode ||
  !billing.country;
