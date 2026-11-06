"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Bubbles from "@/components/Bubbles";

// Cloudflare Turnstile site key (public; the matching secret key lives in the
// TURNSTILE_SECRET_KEY Pages variable).
const TURNSTILE_SITE_KEY = "0x4AAAAAAF1tz6JO1yoG2XZm";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; theme?: string }) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  // Turnstile renders a hidden "cf-turnstile-response" input inside the form,
  // which the /api/contact function verifies before anything is sent.
  useEffect(() => {
    function render() {
      if (!widgetRef.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
      });
    }

    let script = document.getElementById("turnstile-script") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      document.head.appendChild(script);
    }
    script.addEventListener("load", render);
    render();

    return () => {
      script.removeEventListener("load", render);
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const result = await res.json().catch(() => null);

      if (res.ok && result?.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      // Turnstile tokens are single-use, so get a fresh one for the next send.
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
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
            Questions or feedback? Send us a message.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="pointer-events-auto mt-10 space-y-5">
          {/* Honeypot: hidden from people, filled by bots, dropped by /api/contact. */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

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

          <div ref={widgetRef} className="flex justify-center" />

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
