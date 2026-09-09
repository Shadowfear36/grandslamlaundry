import Image from "next/image";

const photos = [
  { src: "/gallery/storefront.webp", alt: "Grand Slam Laundry storefront at Mayfair Center" },
  { src: "/gallery/logo-and-washers.webp", alt: "Grand Slam Laundry logo above a stack of dryers" },
  { src: "/gallery/washer-row.webp", alt: "Row of coin-op washers with baseball stitching wall decal" },
  { src: "/gallery/folding-station.webp", alt: "Folding counter and house rules signage" },
  { src: "/gallery/carts-and-machines.webp", alt: "Laundry carts and large-capacity machines" },
  { src: "/gallery/full-room.webp", alt: "Full view of the washer and dryer lineup" },
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
            A look inside our Mayfair Center location.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-square overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
