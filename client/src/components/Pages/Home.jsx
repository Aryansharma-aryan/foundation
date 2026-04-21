import HeroSection from "../home/heroSection";
import AboutPreview from "../home/AboutPreview";
import ProgramsPreview from "../home/ProgramsPreview";
import ImpactStats from "../home/ImpactStats";
import HealthcareCampaign from "../home/HealthcareCampaign";
import TeamPage from "../home/TeamPage";
import GetInvolved from "../home/GetInvolved";

const Home = () => {
  return (
    <div className="pb-10">
      <HeroSection />
      <AboutPreview />
      <ProgramsPreview />
      <ImpactStats />
      <HealthcareCampaign />
      <TeamPage />
      <GetInvolved compact />
    </div>
  );
};

export default Home;
