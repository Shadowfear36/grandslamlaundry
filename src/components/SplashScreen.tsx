"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import Bubbles from "@/components/Bubbles";

const SEEN_KEY = "gsl-splash-seen";
const AUTO_DISMISS_MS = 2600;
const FADE_MS = 450;

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const dismissedRef = useRef(false);

  useLayoutEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) {
      // Already seen this session: skip straight past the splash before paint.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- this is a one-time mount check against browser storage, not a cascading update
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    sessionStorage.setItem(SEEN_KEY, "1");
    setLeaving(true);
    window.setTimeout(() => setVisible(false), FADE_MS);
  }

  if (!visible) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Dismiss splash screen"
      onClick={dismiss}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") dismiss();
      }}
      className={`fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-navy transition-opacity ease-out ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="#f7f3e8"
          strokeOpacity="0.06"
          strokeWidth="0.4"
        />
        <path
          d="M -10 32 C 30 12, 70 12, 110 32"
          fill="none"
          stroke="#c8102e"
          strokeOpacity="0.4"
          strokeWidth="0.5"
          strokeDasharray="1.6 1.2"
          strokeLinecap="round"
        />
        <path
          d="M -10 68 C 30 88, 70 88, 110 68"
          fill="none"
          stroke="#c8102e"
          strokeOpacity="0.4"
          strokeWidth="0.5"
          strokeDasharray="1.6 1.2"
          strokeLinecap="round"
        />
      </svg>

      <Bubbles count={40} />

      <div className="relative flex flex-col items-center px-6 text-center">
        <Image
          src="/logo.webp"
          alt="Grand Slam Laundry"
          width={495}
          height={444}
          priority
          className="splash-logo-in w-56 sm:w-72"
        />
        <p className="mt-6 font-display animate-pulse text-sm tracking-widest text-cream/50">
          TAP TO ENTER
        </p>
      </div>
    </div>
  );
}
