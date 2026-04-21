import { Link } from "react-router-dom";
import campaignImage from "../../assets/healthcare-campaign.jpg";

const points = [
  "Free checkups and early health screening",
  "Village-focused awareness and guidance",
  "Support for children, women, and families",
];

const HealthcareCampaign = () => {
  return (
    <section className="shell section-space">
      <div className="grid overflow-hidden rounded-[2.5rem] border border-[var(--color-line)] bg-white shadow-[var(--shadow-soft)] lg:grid-cols-[1.05fr_0.95fr]">
        <img src={campaignImage} alt="Healthcare campaign" className="h-full min-h-[320px] w-full object-cover" />
        <div className="bg-[linear-gradient(180deg,#fff8f1_0%,#fff0df_100%)] p-8 sm:p-10 lg:p-12">
          <p className="section-kicker">Healthcare Outreach</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl">
            Bringing practical health support closer to the community.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--color-muted)]">
            Davis Girdhar Foundation uses healthcare campaigns to extend care, awareness, and timely support to families in nearby villages.
          </p>
          <div className="mt-6 space-y-3">
            {points.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-[1.5rem] border border-[var(--color-line)] bg-white/75 px-4 py-3.5"
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />
                <p className="text-base text-[var(--color-text)]">{point}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/partners" className="btn-primary">
              Partner for a Campaign
            </Link>
            <Link to="/donate" className="btn-secondary">
              Support Healthcare Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareCampaign;
