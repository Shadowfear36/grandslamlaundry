const services = [
  {
    icon: "🧺",
    title: "Self-Serve Wash & Dry",
    description:
      "Step up to our lineup of top-load and front-load washers, plus high-capacity dryers. Pay-per-use, no membership required.",
  },
  {
    icon: "🏟️",
    title: "Home Run Machines",
    description:
      "Our extra-large capacity machines handle comforters, sleeping bags, and team gear in a single load — no extra innings needed.",
  },
  {
    icon: "🪙",
    title: "Quarters or PayRange",
    description:
      "Pay the classic way with quarters, or skip the coin roll and pay right from your phone with the PayRange app.",
  },
  {
    icon: "🥤",
    title: "Vending Machines",
    description:
      "Snacks, drinks, and laundry supplies like detergent and dryer sheets — all on site if you forget something.",
  },
  {
    icon: "📺",
    title: "Free Wi-Fi & TV",
    description:
      "Settle in while your load runs — free Wi-Fi and a TV in the lobby make the wait easy.",
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

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
