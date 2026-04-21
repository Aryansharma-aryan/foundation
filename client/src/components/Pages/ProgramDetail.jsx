import { Link, useParams } from "react-router-dom";
import educationImage from "../../assets/program-education.jpg";
import codingImage from "../../assets/program-codding.jpg";
import foodImage from "../../assets/program-food.jpg";
import healthcareImage from "../../assets/program-healthcare.jpg";

const programDetails = {
  education: {
    title: "Education Support",
    image: educationImage,
    intro:
      "Davis Girdhar Foundation supports children by creating a more regular and encouraging learning environment for those who need steady academic guidance.",
    overview:
      "Our education support is focused on helping children continue learning with confidence. We work with students who need extra attention, a more stable study routine, and a caring environment where they feel comfortable asking questions and improving step by step.",
    howWeHelp: [
      "We provide regular teaching support to help children understand school subjects more clearly.",
      "We guide students personally so they can improve reading, writing, and classroom confidence.",
      "We encourage discipline, consistency, and motivation so learning becomes part of everyday life.",
    ],
    approach: [
      "Small-group and guided learning sessions",
      "Basic academic support based on student need",
      "Personal encouragement for confidence and continuity",
    ],
  },
  coding: {
    title: "Computer and Coding Training",
    image: codingImage,
    intro:
      "The foundation introduces children to computers and basic coding so they can become familiar with the digital world in a simple and meaningful way.",
    overview:
      "Digital learning is becoming essential for future opportunities. Through computer and coding sessions, we help students understand basic technology, practice digital skills, and feel more confident using tools that many underserved children otherwise do not access early.",
    howWeHelp: [
      "We teach children basic computer use so they can become comfortable with digital tools.",
      "We introduce coding in a simple way so students can start understanding logic, creativity, and problem-solving.",
      "We create a supportive environment where technology feels useful and approachable, not difficult or distant.",
    ],
    approach: [
      "Basic computer awareness and practical use",
      "Introductory coding exposure for school students",
      "Confidence-building through guided digital learning",
    ],
  },
  food: {
    title: "Food Distribution",
    image: foodImage,
    intro:
      "Davis Girdhar Foundation provides food support to children and families so immediate needs do not become a barrier to health, dignity, and learning.",
    overview:
      "Food support is one of the most direct ways to help a community. When families face difficulty meeting daily nutritional needs, children's health, concentration, and school participation are affected. Our food distribution efforts are meant to bring relief with respect and care.",
    howWeHelp: [
      "We distribute meals or food support to children and families facing immediate need.",
      "We help reduce pressure on households so children can focus better on school and daily life.",
      "We carry out support with a community-centered approach that values dignity and practical care.",
    ],
    approach: [
      "Meal and ration support based on need",
      "Community-focused outreach and distribution",
      "Support linked to child well-being and stability",
    ],
  },
  healthcare: {
    title: "Healthcare Outreach",
    image: healthcareImage,
    intro:
      "The foundation brings healthcare support closer to the community through awareness, camps, and practical outreach in nearby areas.",
    overview:
      "Many families need basic health guidance, early support, and better access to information. Through healthcare outreach, Davis Girdhar Foundation works to make health support more reachable and easier to understand for children, women, and families.",
    howWeHelp: [
      "We organise outreach activities that connect families with useful health guidance and support.",
      "We encourage awareness around preventive care and early attention to health concerns.",
      "We help bring community-focused health efforts closer to villages through practical local engagement.",
    ],
    approach: [
      "Health awareness and community guidance",
      "Early support through camps and outreach efforts",
      "Focus on families, children, and accessible care",
    ],
  },
};

const ProgramDetail = () => {
  const { slug } = useParams();
  const program = programDetails[slug];

  if (!program) {
    return (
      <div className="shell section-space pt-10 sm:pt-14">
        <div className="card p-8 text-center">
          <h1 className="text-4xl font-bold text-[var(--color-text)]">Program not found</h1>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            The requested program page is not available.
          </p>
          <Link to="/programs" className="btn-primary mt-6">
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.2rem] bg-[linear-gradient(120deg,#1b1b22_0%,#2a1d14_100%)] px-6 py-12 text-white shadow-[var(--shadow-soft)] sm:px-10">
            <p className="section-kicker text-[#ffd08d]">Program Detail</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {program.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-white/78">{program.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/programs"
                className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white"
              >
                All Programs
              </Link>
              <Link to="/donate" className="btn-primary">
                Support This Program
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.2rem] shadow-[var(--shadow-soft)]">
            <img src={program.image} alt={program.title} className="h-full min-h-[340px] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="shell grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="card p-6 sm:p-8">
          <p className="section-kicker">How We Provide It</p>
          <h2 className="text-3xl font-bold text-[var(--color-text)]">A genuine and practical approach</h2>
          <p className="mt-4 text-lg leading-8 text-[var(--color-muted)]">{program.overview}</p>
          <div className="mt-6 space-y-4">
            {program.howWeHelp.map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] bg-[var(--color-bg-soft)] p-4 text-base leading-7 text-[var(--color-text)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 sm:p-8">
          <p className="section-kicker">Program Focus</p>
          <h2 className="text-3xl font-bold text-[var(--color-text)]">What this work looks like on the ground</h2>
          <div className="mt-6 space-y-4">
            {program.approach.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-[1.5rem] bg-[var(--color-bg-soft)] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-bold text-[var(--color-primary)] shadow-sm">
                  {index + 1}
                </div>
                <p className="text-base leading-7 text-[var(--color-text)]">{item}</p>
              </div>
            ))}
          </div>
          <Link to="/contact" className="btn-secondary mt-8">
            Contact the Foundation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetail;
