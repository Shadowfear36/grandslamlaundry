const hours = [
  { day: "Monday – Sunday", time: "6:00 AM – 10:00 PM" },
];

export default function HoursLocation() {
  return (
    <section id="hours-location" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <span className="font-display tracking-widest text-red">
          GAME TIME
        </span>
        <h2 className="font-display mt-2 text-4xl tracking-wide text-navy sm:text-5xl">
          Hours &amp; Location
        </h2>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="font-display text-2xl tracking-wide text-navy">
            Hours
          </h3>
          <ul className="mt-4 divide-y divide-navy/10">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between py-2 text-navy/80">
                <span>{h.day}</span>
                <span className="font-medium">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-navy/60">
            Last wash cycle starts at 9:00 PM daily.
          </p>

          <h3 className="font-display mt-8 text-2xl tracking-wide text-navy">
            Location
          </h3>
          <p className="mt-2 text-navy/80">123 Home Plate Ave</p>
          <p className="text-navy/80">Clovis, CA 93611</p>
          <a
            href="tel:+15595550123"
            className="mt-2 inline-block text-red hover:text-red-dark"
          >
            (559) 555-0123
          </a>
        </div>

        <div className="overflow-hidden rounded-lg border border-navy/10 shadow-sm">
          <iframe
            title="Grand Slam Laundry Location Map"
            src="https://www.google.com/maps?q=Clovis,+CA&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 320 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
