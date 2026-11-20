import { Link } from "react-router-dom";
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

const galleryItems = [
  { type: "image", src: today1 },
  { type: "image", src: today2 },
  { type: "image", src: today3 },
  { type: "image", src: today4 },
  { type: "image", src: today5 },
  { type: "image", src: today6 },
  { type: "image", src: today7 },
  { type: "image", src: today8 },
  { type: "image", src: today9 },
  { type: "image", src: today10 },
  { type: "image", src: today11 },
  { type: "image", src: today12Photo },
  { type: "video", src: today12Video },
  { type: "video", src: item13Video },
];

const Gallery = () => (
  <div className="pb-12">
    <section className="shell section-space pt-10 text-center sm:pt-14">
      <p className="section-kicker">Diwali Celebration</p>
      <h1 className="section-title mx-auto max-w-4xl">
        Diwali gifts for our young learners
      </h1>
      <p className="section-copy mx-auto">
        Moments from Davis Girdhar Foundation's Diwali gift distribution for
        children who study with the foundation free of charge. We are grateful
        to everyone who helped make this celebration special.
      </p>
    </section>

    <section
      className="shell grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="Diwali gift distribution photos and videos"
    >
      {galleryItems.map((item) => (
        <article key={item.src} className="card overflow-hidden rounded-[2rem]">
          {item.type === "video" ? (
            <video
              className="h-72 w-full bg-slate-950 object-contain"
              controls
              preload="metadata"
              aria-label="Diwali celebration video"
            >
              <source src={item.src} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          ) : (
            <img
              src={item.src}
              alt="Children celebrating Diwali with Davis Girdhar Foundation"
              className="h-72 w-full object-cover"
              loading="lazy"
            />
          )}
        </article>
      ))}
    </section>

    <section className="shell section-space">
      <div className="rounded-[2rem] bg-slate-950 px-6 py-10 text-white sm:px-10">
        <h2 className="text-3xl font-bold">Learn more about our work</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/stories" className="btn-primary">Stories</Link>
          <Link to="/impact" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Impact</Link>
          <Link to="/contact" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Contact</Link>
        </div>
      </div>
    </section>
  </div>
);

export default Gallery;
