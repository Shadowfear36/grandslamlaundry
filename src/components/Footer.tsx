import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy text-cream/80">
      <div className="stitch-divider" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src="/logo.webp"
            alt="Grand Slam Laundry"
            width={515}
            height={444}
            className="h-16 w-auto"
          />
          <p className="mt-3 text-sm">
            Fresno&apos;s home run for clean clothes.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg tracking-wide text-gold">
            Hours
          </h3>
          <p className="mt-2 text-sm">Monday – Sunday: 7:00 AM – 10:00 PM</p>
          <p className="text-sm">Last wash starts at 8:30 PM</p>
        </div>

        <div>
          <h3 className="font-display text-lg tracking-wide text-gold">
            Find Us
          </h3>
          <p className="mt-2 text-sm">1760 N First St</p>
          <p className="text-sm">Fresno, CA</p>
          <a href="tel:+15592289847" className="mt-2 block text-sm hover:text-gold">
            (559) 228-9847
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 py-4 text-center text-xs text-cream/60 sm:px-6">
        © {new Date().getFullYear()} Grand Slam Laundry. All rights reserved.
      </div>
    </footer>
  );
}
