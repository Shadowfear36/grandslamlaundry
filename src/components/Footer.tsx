export default function Footer() {
  return (
    <footer className="bg-navy text-cream/80">
      <div className="stitch-divider" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden>
              ⚾
            </span>
            <span className="font-display text-xl tracking-wide text-cream">
              Grand Slam Laundry
            </span>
          </div>
          <p className="mt-2 text-sm">
            Clovis &amp; Fresno&apos;s home run for clean clothes.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg tracking-wide text-gold">
            Hours
          </h3>
          <p className="mt-2 text-sm">Every day: 6:00 AM – 10:00 PM</p>
          <p className="text-sm">Last wash cycle starts at 9:00 PM</p>
        </div>

        <div>
          <h3 className="font-display text-lg tracking-wide text-gold">
            Find Us
          </h3>
          <p className="mt-2 text-sm">123 Home Plate Ave</p>
          <p className="text-sm">Clovis, CA 93611</p>
          <a href="tel:+15595550123" className="mt-2 block text-sm hover:text-gold">
            (559) 555-0123
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 py-4 text-center text-xs text-cream/60 sm:px-6">
        © {new Date().getFullYear()} Grand Slam Laundry. All rights reserved.
      </div>
    </footer>
  );
}
