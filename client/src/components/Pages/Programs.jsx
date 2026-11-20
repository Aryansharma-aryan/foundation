import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import codingImage from "../../assets/program-codding.jpg";
import educationImageOne from "../../assets/education1.jfif";
import educationImageTwo from "../../assets/education2.jfif";
import educationImageThree from "../../assets/education3.jfif";
import foodImage from "../../assets/meals.jpeg";
import healthcareImage from "../../assets/program-healthcare.jpg";
import today1 from "../../assets/today1.jpeg";
import today2 from "../../assets/today2.jpeg";
import today3 from "../../assets/today3.jpeg";
import today4 from "../../assets/toay4.jpeg";
import today5 from "../../assets/today5.jpeg";
import today6 from "../../assets/today6.jpeg";
import today7 from "../../assets/today7.jpeg";
import today8 from "../../assets/today8.jpeg";
import today9 from "../../assets/today9.jpeg";
import today10 from "../../assets/today10.jpeg";
import today11 from "../../assets/today11.jpeg";
import today12Photo from "../../assets/toay12.jpeg";
import today12Video from "../../assets/today12.mp4";
import item13Video from "../../assets/13.mp4";

const diwaliMoments = [
  { title: "Diwali celebration with kids — Photo 1", type: "image", src: today1 },
  { title: "Diwali celebration with kids — Photo 2", type: "image", src: today2 },
  { title: "Diwali celebration with kids — Photo 3", type: "image", src: today3 },
  { title: "Diwali celebration with kids — Photo 4", type: "image", src: today4 },
  { title: "Diwali celebration with kids — Photo 5", type: "image", src: today5 },
  { title: "Diwali celebration with kids — Photo 6", type: "image", src: today6 },
  { title: "Diwali celebration with kids — Photo 7", type: "image", src: today7 },
  { title: "Diwali celebration with kids — Photo 8", type: "image", src: today8 },
  { title: "Diwali celebration with kids — Photo 9", type: "image", src: today9 },
  { title: "Diwali celebration with kids — Photo 10", type: "image", src: today10 },
  { title: "Diwali celebration with kids — Photo 11", type: "image", src: today11 },
  { title: "Diwali celebration with kids — Photo 12", type: "image", src: today12Photo },
  { title: "Diwali celebration with kids — Video 12", type: "video", src: today12Video },
  { title: "Diwali celebration with kids — Video 13", type: "video", src: item13Video },
];

const programs = [
  {
    title: "Education Support",
    slug: "education",
    summary: "Daily teaching support for children who need a steady, encouraging, and more structured learning environment.",
    images: [educationImageOne, educationImageTwo, educationImageThree],
    points: ["Academic support", "Guided learning", "Student confidence"],
    detail:
      "We help children continue learning with better consistency through personal guidance, subject support, and a caring study environment.",
  },
  {
    title: "Computer and Coding Training",
    slug: "coding",
    summary: "Foundational digital skills that help children engage with modern tools and future opportunities.",
    image: codingImage,
    points: ["Computer basics", "Coding exposure", "Digital confidence"],
    detail:
      "Students are introduced to computers and coding in a simple, practical way so digital learning feels useful and accessible.",
  },
  {
    title: "Food Distribution",
    slug: "food",
    summary: "Meal and ration support designed to strengthen health, dignity, and family stability.",
    image: foodImage,
    points: ["Meals and rations", "Family support", "Community-focused delivery"],
    detail:
      "This work helps reduce immediate pressure on families and supports better daily well-being for children and the community.",
  },
  {
    title: "Healthcare Outreach",
    slug: "healthcare",
    summary: "Village outreach that helps make health guidance, awareness, and early support more available.",
    image: healthcareImage,
    points: ["Health awareness", "Community camps", "Closer village access"],
    detail:
      "We bring healthcare support closer to families through local outreach, awareness, and practical community engagement.",
  },
];

const Programs = () => {
  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14 text-center">
        <p className="section-kicker">Programs</p>
        <h1 className="section-title mx-auto max-w-4xl">Programs through which Davis Girdhar Foundation serves the community.</h1>
        <p className="section-copy mx-auto">
          Each program has its own dedicated page so visitors can understand in a genuine way how the foundation provides support on the ground.
        </p>
      </section>

      <section className="shell mb-12" aria-label="Diwali celebration with kids">
        <div className="card overflow-hidden rounded-[2rem]">
          <div className="px-6 pt-7 text-center sm:px-8">
            <p className="section-kicker">Foundation moments</p>
            <h2 className="section-title">Diwali celebration with kids</h2>
            <p className="section-copy mx-auto">
              A look at the Diwali gifts shared with children studying free through Davis Girdhar Foundation.
            </p>
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            pagination={{ clickable: true }}
            className="program-image-swiper mt-6 h-80 w-full sm:h-[30rem]"
          >
            {diwaliMoments.map((moment) => (
              <SwiperSlide key={moment.title}>
                {moment.type === "video" ? (
                  <video
                    className="h-80 w-full bg-slate-950 object-contain sm:h-[30rem]"
                    controls
                    preload="metadata"
                    aria-label={moment.title}
                  >
                    <source src={moment.src} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <img
                    src={moment.src}
                    alt={moment.title}
                    className="h-80 w-full object-contain bg-slate-950 sm:h-[30rem]"
                    loading="lazy"
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="shell grid gap-6">
        {programs.map((program) => (
          <article key={program.title} className="card overflow-hidden rounded-[2rem] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
            {program.images ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 2600, disableOnInteraction: false }}
                loop
                pagination={{ clickable: true }}
                className="program-image-swiper h-72 w-full lg:h-full"
              >
                {program.images.map((image, index) => (
                  <SwiperSlide key={image}>
                    <img
                      src={image}
                      alt={`${program.title} ${index + 1}`}
                      className="h-72 w-full object-cover lg:h-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img src={program.image} alt={program.title} className="h-72 w-full object-cover lg:h-full" />
            )}
            <div className="p-6 sm:p-8">
              <h2 className="text-3xl font-bold text-[var(--color-text)]">{program.title}</h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{program.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {program.points.map((point) => (
                  <span key={point} className="rounded-full bg-[var(--color-bg)] px-4 py-2 text-sm font-semibold text-slate-700">
                    {point}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-base leading-8 text-[var(--color-muted)]">
                {program.detail}
              </p>
              <Link
                to={`/programs/${program.slug}`}
                className="mt-6 inline-flex text-base font-bold text-[var(--color-primary)] transition hover:text-[var(--color-primary-dark)]"
              >
                Read full program detail
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="shell section-space">
        <div className="rounded-[2rem] bg-slate-950 px-6 py-10 text-white sm:px-10">
          <h2 className="text-3xl font-bold">Want to help expand these programs?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            The best next step is either volunteering time or supporting the programs financially.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/get-involved" className="btn-primary">Volunteer</Link>
            <Link to="/impact" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">See Impact</Link>
            <Link to="/donate" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Donate</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
