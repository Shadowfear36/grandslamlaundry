"use client";

import { useEffect, useRef } from "react";

type PhysBubble = {
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  popped: boolean;
};

const BUOYANCY = 22; // px/s^2 gentle upward pull
const JITTER = 55; // px/s^2 random wander, keeps motion organic
const MAX_SPEED = 95; // px/s
const WALL_DAMPING = 0.75;

function randomSize() {
  return Math.random() * 34 + 18;
}

function spawnBubble(width: number, height: number): PhysBubble {
  const size = randomSize();
  return {
    size,
    x: Math.random() * Math.max(width - size, 1) + size / 2,
    y: height + size, // wells up from below, like foam
    vx: (Math.random() - 0.5) * 40,
    vy: -(Math.random() * 30 + 20),
    popped: false,
  };
}

function applyStyle(el: HTMLButtonElement | null | undefined, b: PhysBubble) {
  if (!el) return;
  el.style.width = `${b.size}px`;
  el.style.height = `${b.size}px`;
  el.style.transform = `translate(${b.x - b.size / 2}px, ${b.y - b.size / 2}px)`;
}

function spawnSplash(
  container: HTMLDivElement | null,
  x: number,
  y: number,
  size: number,
  reducedMotion: boolean
) {
  if (!container) return;

  const wrap = document.createElement("div");
  wrap.className = "absolute";
  wrap.style.left = `${x}px`;
  wrap.style.top = `${y}px`;
  container.appendChild(wrap);

  const ring = document.createElement("span");
  ring.className = reducedMotion ? "splash-ring-reduced" : "splash-ring";
  ring.style.width = `${size}px`;
  ring.style.height = `${size}px`;
  wrap.appendChild(ring);

  const dropletCount = reducedMotion ? 0 : 7;
  for (let i = 0; i < dropletCount; i++) {
    const angle = (360 / dropletCount) * i + (Math.random() * 24 - 12);
    const dist = size * (0.8 + Math.random() * 0.7);
    const droplet = document.createElement("span");
    droplet.className = "splash-droplet";
    droplet.style.setProperty("--angle", `${angle}deg`);
    droplet.style.setProperty("--dist", `${dist}px`);
    const dropletSize = Math.max(size * 0.14, 4);
    droplet.style.width = `${dropletSize}px`;
    droplet.style.height = `${dropletSize}px`;
    wrap.appendChild(droplet);
  }

  window.setTimeout(() => wrap.remove(), 520);
}

export default function Bubbles({ count = 14 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const physicsRef = useRef<PhysBubble[]>([]);
  const reducedMotionRef = useRef(false);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;

    const { width, height } = container.getBoundingClientRect();

    physicsRef.current = Array.from({ length: count }, () => {
      const b = spawnBubble(width, height);
      b.y = Math.random() * height; // scatter across the section on first paint
      return b;
    });
    physicsRef.current.forEach((b, i) => applyStyle(elsRef.current[i], b));

    if (reducedMotionRef.current) {
      return () => {
        timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      };
    }

    let raf = 0;
    let last = performance.now();

    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const rect = container!.getBoundingClientRect();

      physicsRef.current.forEach((b, i) => {
        if (b.popped) return;

        b.vy -= BUOYANCY * dt;
        b.vx += (Math.random() - 0.5) * JITTER * dt;
        b.vy += (Math.random() - 0.5) * JITTER * dt * 0.5;

        const speed = Math.hypot(b.vx, b.vy);
        if (speed > MAX_SPEED) {
          const scale = MAX_SPEED / speed;
          b.vx *= scale;
          b.vy *= scale;
        }

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        const r = b.size / 2;
        if (b.x < r) {
          b.x = r;
          b.vx = Math.abs(b.vx) * WALL_DAMPING;
        } else if (b.x > rect.width - r) {
          b.x = rect.width - r;
          b.vx = -Math.abs(b.vx) * WALL_DAMPING;
        }
        if (b.y < r) {
          b.y = r;
          b.vy = Math.abs(b.vy) * WALL_DAMPING;
        } else if (b.y > rect.height - r) {
          b.y = rect.height - r;
          b.vy = -Math.abs(b.vy) * WALL_DAMPING;
        }

        applyStyle(elsRef.current[i], b);
      });

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally reads the latest queued timeouts at unmount
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, [count]);

  function handlePop(index: number) {
    const b = physicsRef.current[index];
    const el = elsRef.current[index];
    if (!b || !el || b.popped) return;

    b.popped = true;
    el.style.opacity = "0";
    el.style.pointerEvents = "none";

    spawnSplash(containerRef.current, b.x, b.y, b.size, reducedMotionRef.current);

    const timeoutId = window.setTimeout(() => {
      const container = containerRef.current;
      const rect = container?.getBoundingClientRect();
      const fresh = spawnBubble(rect?.width ?? 300, rect?.height ?? 300);
      physicsRef.current[index] = fresh;
      const target = elsRef.current[index];
      if (target) {
        target.style.opacity = "";
        target.style.pointerEvents = "";
        applyStyle(target, fresh);
      }
    }, 280);
    timeoutsRef.current.push(timeoutId);
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          tabIndex={-1}
          ref={(el) => {
            elsRef.current[i] = el;
          }}
          onClick={() => handlePop(i)}
          className="pointer-events-auto absolute left-0 top-0 cursor-pointer rounded-full border border-white/40 transition-opacity duration-200"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), rgba(255,255,255,0.15) 45%, rgba(180,210,255,0.12) 80%)",
            boxShadow:
              "inset 0 0 8px rgba(255,255,255,0.4), 0 0 4px rgba(0,0,0,0.08)",
          }}
        >
          <span className="sr-only">Pop bubble</span>
        </button>
      ))}
    </div>
  );
}
