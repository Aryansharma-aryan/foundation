import { Link } from "react-router-dom";

const groups = [
  {
    title: "Explore",
    links: [
      { label: "About", to: "/about" },
      { label: "Programs", to: "/programs" },
      { label: "Impact", to: "/impact" },
      { label: "Stories", to: "/stories" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Team", to: "/team" },
      { label: "Partners", to: "/partners" },
      { label: "Gallery", to: "/gallery" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-[var(--color-line)] bg-[linear-gradient(180deg,#fff5eb_0%,#fdeedc_100%)]">
      <div className="shell grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">
            Davis Girdhar Foundation
          </p>
          <p className="mt-4 max-w-md text-lg leading-8 text-[var(--color-muted)]">
            Supporting children and families through education, digital learning, food support,
            healthcare outreach, and dependable community care in Kurukshetra.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/get-involved" className="btn-primary">
              Get Involved
            </Link>
            <Link to="/donate" className="btn-secondary">
              Donate
            </Link>
          </div>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              {group.title}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {group.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-base text-[var(--color-muted)] transition hover:text-[var(--color-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--color-line)] py-4 text-center text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
        Davis Girdhar Foundation | Umri, Kurukshetra, Haryana
      </div>
    </footer>
  );
};

export default Footer;
