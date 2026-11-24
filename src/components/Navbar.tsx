"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import InstagramIcon, { INSTAGRAM_URL } from "@/components/InstagramIcon";

const links = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#hours-location", label: "Hours & Location" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy text-cream shadow-md">
      <div className="stitch-divider" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="Grand Slam Laundry"
            width={515}
            height={444}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <nav className="hidden gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-lg tracking-wide text-cream/90 transition hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Grand Slam Laundry on Instagram"
            className="text-cream/90 transition hover:text-gold"
          >
            <InstagramIcon className="h-6 w-6" />
          </a>

          <button
            type="button"
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="h-0.5 w-6 bg-cream" />
            <span className="h-0.5 w-6 bg-cream" />
            <span className="h-0.5 w-6 bg-cream" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-cream/10 bg-navy px-4 pb-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display py-2 text-lg tracking-wide text-cream/90 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
