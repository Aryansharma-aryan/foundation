export const SITE_URL = "https://www.davisgirdharfoundation.com";
export const SITE_NAME = "Davis Girdhar Foundation";
export const SITE_EMAIL = "info@davisgirdharfoundation.com";
export const SITE_PHONE = "+91-92152-00212";
export const DEFAULT_IMAGE = `${SITE_URL}/images/hero.jpg`;

const defaultKeywords = [
  "Davis Girdhar Foundation",
  "NGO in Kurukshetra",
  "NGO in Haryana",
  "nonprofit organization in India",
  "education support for children",
  "food distribution NGO",
  "healthcare outreach",
  "computer coding training for children",
  "community service foundation",
  "donate to NGO in Kurukshetra",
];

export const publicRoutes = [
  {
    path: "/",
    title: "Davis Girdhar Foundation | NGO in Kurukshetra, Haryana",
    description:
      "Davis Girdhar Foundation is an NGO in Kurukshetra, Haryana supporting children and families through education, computer learning, food distribution, healthcare outreach, and community care.",
    keywords: defaultKeywords,
    priority: "1.0",
  },
  {
    path: "/about",
    title: "About Davis Girdhar Foundation | Community Service NGO",
    description:
      "Learn about Davis Girdhar Foundation, its mission, values, and commitment to serving children, families, and communities in Kurukshetra and nearby areas.",
    keywords: ["about Davis Girdhar Foundation", "community service NGO", ...defaultKeywords],
    priority: "0.9",
  },
  {
    path: "/programs",
    title: "NGO Programs | Education, Food, Healthcare and Coding Training",
    description:
      "Explore Davis Girdhar Foundation programs for education support, computer and coding training, food distribution, and healthcare outreach in Haryana.",
    keywords: ["NGO programs in Haryana", "charity programs India", ...defaultKeywords],
    priority: "0.95",
  },
  {
    path: "/programs/education",
    title: "Education Support for Children | Davis Girdhar Foundation",
    description:
      "Education support by Davis Girdhar Foundation helps children with guided learning, academic confidence, and steady study support in Kurukshetra.",
    keywords: ["education support NGO", "children education charity", ...defaultKeywords],
    priority: "0.9",
  },
  {
    path: "/programs/coding",
    title: "Computer and Coding Training for Children | NGO in Haryana",
    description:
      "Computer and coding training from Davis Girdhar Foundation introduces children to digital skills, technology confidence, and basic coding concepts.",
    keywords: ["coding training for children", "computer education NGO", ...defaultKeywords],
    priority: "0.9",
  },
  {
    path: "/programs/food",
    title: "Food Distribution NGO in Kurukshetra | Davis Girdhar Foundation",
    description:
      "Davis Girdhar Foundation provides meal and ration support to children and families through respectful food distribution and local community outreach.",
    keywords: ["food distribution NGO", "meal support charity", ...defaultKeywords],
    priority: "0.9",
  },
  {
    path: "/programs/healthcare",
    title: "Healthcare Outreach NGO | Community Health Support in Haryana",
    description:
      "Healthcare outreach by Davis Girdhar Foundation brings health awareness, camps, and practical guidance closer to families and villages.",
    keywords: ["healthcare outreach NGO", "health camp NGO Haryana", ...defaultKeywords],
    priority: "0.9",
  },
  {
    path: "/impact",
    title: "Impact | Davis Girdhar Foundation Community Work",
    description:
      "See the community impact of Davis Girdhar Foundation through education, food support, healthcare outreach, and digital learning initiatives.",
    keywords: ["NGO impact", "community impact Haryana", ...defaultKeywords],
    priority: "0.85",
  },
  {
    path: "/stories",
    title: "Stories | Davis Girdhar Foundation",
    description:
      "Read stories and updates from Davis Girdhar Foundation's work with children, families, volunteers, and local communities.",
    keywords: ["NGO stories", "charity updates", ...defaultKeywords],
    priority: "0.8",
  },
  {
    path: "/partners",
    title: "Partner with Davis Girdhar Foundation | CSR and NGO Collaboration",
    description:
      "Partner with Davis Girdhar Foundation for CSR, resources, volunteering, and community initiatives that support children and families.",
    keywords: ["CSR partnership NGO", "NGO collaboration Haryana", ...defaultKeywords],
    priority: "0.8",
  },
  {
    path: "/team",
    title: "Team | Davis Girdhar Foundation",
    description:
      "Meet the Davis Girdhar Foundation team working to strengthen education, healthcare, food support, and community care.",
    keywords: ["Davis Girdhar Foundation team", "NGO team Haryana", ...defaultKeywords],
    priority: "0.75",
  },
  {
    path: "/get-involved",
    title: "Volunteer with Davis Girdhar Foundation | Get Involved",
    description:
      "Volunteer, collaborate, donate, or spread awareness with Davis Girdhar Foundation to support children and families in Haryana.",
    keywords: ["volunteer NGO Kurukshetra", "get involved charity", ...defaultKeywords],
    priority: "0.9",
  },
  {
    path: "/gallery",
    title: "Gallery | Davis Girdhar Foundation Photos",
    description:
      "View photos from Davis Girdhar Foundation programs, outreach, community support, and field work in Kurukshetra and nearby areas.",
    keywords: ["NGO gallery", "Davis Girdhar Foundation photos", ...defaultKeywords],
    priority: "0.75",
  },
  {
    path: "/contact",
    title: "Contact Davis Girdhar Foundation | NGO in Kurukshetra",
    description:
      "Contact Davis Girdhar Foundation for donations, volunteering, partnerships, and community support in Kurukshetra, Haryana.",
    keywords: ["contact NGO Kurukshetra", "Davis Girdhar Foundation contact", ...defaultKeywords],
    priority: "0.85",
  },
  {
    path: "/donate",
    title: "Donate to Davis Girdhar Foundation | Support Children and Families",
    description:
      "Donate to Davis Girdhar Foundation and help support education, food distribution, healthcare outreach, and digital learning for children and families.",
    keywords: ["donate NGO India", "donate to NGO Kurukshetra", ...defaultKeywords],
    priority: "0.95",
  },
  {
    path: "/terms-and-conditions",
    title: "Terms and Conditions | Davis Girdhar Foundation",
    description:
      "Read the terms and conditions for using Davis Girdhar Foundation's website, donation services, and communication channels.",
    keywords: ["Davis Girdhar Foundation terms", ...defaultKeywords],
    priority: "0.35",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Davis Girdhar Foundation",
    description:
      "Read how Davis Girdhar Foundation handles website, contact, donation, and communication data.",
    keywords: ["Davis Girdhar Foundation privacy policy", ...defaultKeywords],
    priority: "0.35",
  },
];

export const findRouteSeo = (pathname) =>
  publicRoutes.find((route) => route.path === pathname) ||
  publicRoutes.find((route) => route.path !== "/" && pathname.startsWith(route.path)) ||
  publicRoutes[0];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  image: DEFAULT_IMAGE,
  description:
    "Davis Girdhar Foundation supports children and families through education, computer learning, food distribution, healthcare outreach, and community care.",
  email: SITE_EMAIL,
  telephone: SITE_PHONE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "C/o Sh. Sham Das, Umri, Mathana, Umri Thanesar",
    addressLocality: "Kurukshetra",
    addressRegion: "Haryana",
    postalCode: "136131",
    addressCountry: "IN",
  },
  areaServed: ["Kurukshetra", "Haryana", "India"],
  sameAs: [SITE_URL],
};
