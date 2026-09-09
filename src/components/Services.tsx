const services = [
  {
    icon: "🧺",
    title: "Self-Serve Wash & Dry",
    description:
      "Step up to our lineup of top-load and front-load washers, plus high-capacity dryers. Pay-per-use, no membership required.",
  },
  {
    icon: "🎽",
    title: "Drop-Off Wash & Fold",
    description:
      "Drop your uniform bag off in the morning, pick up a perfectly folded win in the evening. We wash, dry, and fold — you just show up.",
  },
  {
    icon: "🏟️",
    title: "Home Run Machines",
    description:
      "Our extra-large capacity machines handle comforters, sleeping bags, and team gear in a single load — no extra innings needed.",
  },
  {
    icon: "💳",
    title: "Card & App Pay",
    description:
      "Skip the coin roll. Load up a laundry card or pay right from your phone with our contactless payment system.",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <span className="font-display tracking-widest text-red">
          OUR LINEUP
        </span>
        <h2 className="font-display mt-2 text-4xl tracking-wide text-navy sm:text-5xl">
          Services
        </h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-4xl" aria-hidden>
              {service.icon}
            </div>
            <h3 className="font-display mt-4 text-2xl tracking-wide text-navy">
              {service.title}
            </h3>
            <p className="mt-2 text-navy/70">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
