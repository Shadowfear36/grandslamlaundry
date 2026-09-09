"use client";

import { useEffect, useRef, useState } from "react";

type Bubble = {
  id: number;
  left: number; // percent
  top: number; // percent, used only when motion is reduced
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  drift: number; // px of horizontal sway while rising
  popped: boolean;
};

function randomBubble(id: number): Bubble {
  return {
    id,
    left: Math.random() * 92 + 2,
    top: Math.random() * 85 + 5,
    size: Math.random() * 34 + 18,
    duration: Math.random() * 8 + 9,
    delay: Math.random() * 4,
    drift: Math.random() * 60 - 30,
    popped: false,
  };
}

export default function Bubbles({ count = 14 }: { count?: number }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const nextId = useRef(0);

  useEffect(() => {
    setBubbles(Array.from({ length: count }, () => randomBubble(nextId.current++)));

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [count]);

  function respawn(id: number) {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? randomBubble(nextId.current++) : b))
    );
  }

  function pop(id: number) {
    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    window.setTimeout(() => respawn(id), reducedMotion ? 200 : 260);
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {bubbles.map((b) => (
        <button
          key={b.id}
          type="button"
          tabIndex={-1}
          onClick={() => !b.popped && pop(b.id)}
          onAnimationEnd={(e) => {
            if (e.animationName === "bubble-rise" && !b.popped) {
              respawn(b.id);
            }
          }}
          className={`pointer-events-auto absolute cursor-pointer rounded-full border border-white/40 ${
            b.popped ? "bubble-pop" : reducedMotion ? "" : "bubble-rise"
          }`}
          style={{
            left: `${b.left}%`,
            ...(reducedMotion
              ? { top: `${b.top}%` }
              : { bottom: "-10%" }),
            width: b.size,
            height: b.size,
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), rgba(255,255,255,0.15) 45%, rgba(180,210,255,0.12) 80%)",
            boxShadow:
              "inset 0 0 8px rgba(255,255,255,0.4), 0 0 4px rgba(0,0,0,0.08)",
            animationDuration: b.popped ? "300ms" : `${b.duration}s`,
            animationDelay: b.popped ? "0ms" : `${b.delay}s`,
            ["--drift" as string]: `${b.drift}px`,
          }}
        >
          <span className="sr-only">Pop bubble</span>
        </button>
      ))}
    </div>
  );
}
