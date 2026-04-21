import { Link } from "react-router-dom";

const galleryItems = [
  {
    title: "Classroom Support",
    category: "Education",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=900&q=80",
  },
  {
    title: "Reading and Guidance",
    category: "Learning",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
  },
  {
    title: "Coding Exposure",
    category: "Digital Skills",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80",
  },
  {
    title: "Food Support Drive",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80",
  },
  {
    title: "Village Outreach",
    category: "Community",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
  },
  {
    title: "Shared Progress",
    category: "Impact",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&q=80",
  },
];

const Gallery = () => {
  return (
    <div className="pb-12">
      <section className="shell section-space pt-10 sm:pt-14 text-center">
        <p className="section-kicker">Gallery</p>
        <h1 className="section-title mx-auto max-w-4xl">A simpler visual gallery with cleaner spacing and better responsiveness.</h1>
        <p className="section-copy mx-auto">
          The gallery now focuses on readability and balance instead of heavy animation and oversized custom CSS.
        </p>
      </section>

      <section className="shell grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {galleryItems.map((item) => (
          <article key={item.title} className="card overflow-hidden rounded-[2rem]">
            <img src={item.image} alt={item.title} className="h-72 w-full object-cover" />
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--color-primary)]">{item.category}</p>
              <h2 className="mt-3 text-2xl font-bold text-[var(--color-text)]">{item.title}</h2>
            </div>
          </article>
        ))}
      </section>

      <section className="shell section-space">
        <div className="rounded-[2rem] bg-slate-950 px-6 py-10 text-white sm:px-10">
          <h2 className="text-3xl font-bold">Keep exploring the website</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/stories" className="btn-primary">Stories</Link>
            <Link to="/impact" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Impact</Link>
            <Link to="/contact" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white hover:text-white">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
