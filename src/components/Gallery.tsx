const placeholders = [
  "Storefront",
  "Washer Lineup",
  "Folding Station",
  "Big Load Machines",
  "Waiting Area",
  "Team Gear Bins",
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-navy/[0.03] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="font-display tracking-widest text-red">
            THE DUGOUT
          </span>
          <h2 className="font-display mt-2 text-4xl tracking-wide text-navy sm:text-5xl">
            Gallery
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-navy/60">
            Real photos coming soon — here&apos;s the lineup we&apos;ll be
            filling in.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {placeholders.map((label) => (
            <div
              key={label}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-navy/20 bg-white text-navy/40"
            >
              <span className="text-3xl" aria-hidden>
                📷
              </span>
              <span className="font-display text-sm tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
