import Bubbles from "@/components/Bubbles";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-cream">
      <div
        className="absolute inset-0 bg-cover bg-top opacity-30"
        style={{ backgroundImage: "url(/gallery/logo-and-washers.webp)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <Bubbles count={16} />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="font-display rounded-full border border-gold/60 px-4 py-1 text-sm tracking-widest text-gold">
          CLOVIS &amp; FRESNO, CA
        </span>

        <h1 className="font-display mt-6 text-5xl leading-none tracking-wide sm:text-7xl">
          Step Up to the Plate.
          <br />
          <span className="text-red">Knock Out</span> the Laundry.
        </h1>

        <p className="mt-6 max-w-xl text-lg text-cream/85">
          Grand Slam Laundry is the Valley&apos;s baseball-themed laundromat —
          self-serve machines, drop-off wash &amp; fold, and big-load
          machines for the whole team&apos;s uniforms.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="#hours-location"
            className="font-display rounded-md bg-red px-8 py-3 text-lg tracking-wide text-cream shadow-lg transition hover:bg-red-dark"
          >
            Find Us
          </a>
          <a
            href="#contact"
            className="font-display rounded-md border-2 border-cream px-8 py-3 text-lg tracking-wide text-cream transition hover:bg-cream hover:text-navy"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
