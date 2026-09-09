"use client";

import { useState, type FormEvent } from "react";
import Bubbles from "@/components/Bubbles";

// TODO: replace with a real Formspree endpoint (formspree.io) or a Cloudflare
// Pages Function before launch. Sign up at formspree.io, create a form, and
// swap the URL below with your own endpoint.
const FORM_ENDPOINT = "https://formspree.io/f/REPLACE_ME";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-20 text-cream">
      <Bubbles count={10} />

      <div className="pointer-events-none relative mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <span className="font-display tracking-widest text-gold">
            BULLPEN
          </span>
          <h2 className="font-display mt-2 text-4xl tracking-wide sm:text-5xl">
            Contact Us
          </h2>
          <p className="mx-auto mt-3 max-w-md text-cream/70">
            Questions, feedback, or want to talk drop-off service? Send us a
            message.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="pointer-events-auto mt-10 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-md border border-cream/20 bg-cream/5 px-4 py-2 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border border-cream/20 bg-cream/5 px-4 py-2 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 w-full rounded-md border border-cream/20 bg-cream/5 px-4 py-2 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="font-display w-full rounded-md bg-red px-8 py-3 text-lg tracking-wide text-cream shadow-lg transition hover:bg-red-dark disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-center text-sm text-gold">
              Thanks! We&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-red">
              Something went wrong. Please try again or call us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
