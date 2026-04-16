"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  PATHS,
  OUTER_TRANSFORM,
  PATH_TRANSFORM,
} from "@/data/calligraphy-paths";

const TILE_W = 3183.4758;
const TILE_H = 6532.8936;
const TILE_OVERLAP = 480;
const TILE_STRIDE = TILE_W - TILE_OVERLAP;
const TILE_COUNT = 2;
const TOTAL_W = TILE_STRIDE * (TILE_COUNT - 1) + TILE_W;

/* ── Timing constants ─────────────────────────────────────────── */

/**
 * Desktop: the cursor must linger on a glyph this long before the
 * drawing starts. Short enough to feel responsive, long enough to
 * filter out fast sweeps across dozens of glyphs.
 */
const HOVER_COMMIT_DELAY = 90;

/** Desktop: CSS transition duration for draw-in / draw-out (keep in sync with globals.css). */
const DRAW_DURATION = 900;

/**
 * Desktop: once committed, hold the fully-drawn accent at least this
 * long before allowing retraction, even if the cursor has moved away.
 * Ensures the right-to-left draw animation always completes gracefully.
 */
const MIN_HOLD = 700;

/** Mobile: time between random pulses (ms). */
const MOBILE_INTERVAL_MIN = 1200;
const MOBILE_INTERVAL_MAX = 2200;

/** Mobile: delay before first pulse after mount. */
const MOBILE_INITIAL_DELAY = 350;

interface CalligraphyPatternProps {
  isDark: boolean;
}

export default function CalligraphyPattern({ isDark }: CalligraphyPatternProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  /* ── Desktop: deliberate-hover drawing ───────────────────────── */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    type GlyphState = {
      revealTimer: number | null;
      retractTimer: number | null;
      drawnAt: number;
      isDrawn: boolean;
    };
    const state = new WeakMap<Element, GlyphState>();

    const getState = (glyph: Element): GlyphState => {
      let s = state.get(glyph);
      if (!s) {
        s = { revealTimer: null, retractTimer: null, drawnAt: 0, isDrawn: false };
        state.set(glyph, s);
      }
      return s;
    };

    const reveal = (glyph: Element) => {
      const accent = glyph.querySelector<SVGPathElement>(".cal-accent");
      if (!accent) return;
      accent.style.clipPath = "inset(0)";
      const s = getState(glyph);
      s.isDrawn = true;
      s.drawnAt = performance.now();
    };

    const retract = (glyph: Element) => {
      const accent = glyph.querySelector<SVGPathElement>(".cal-accent");
      if (!accent) return;
      accent.style.clipPath = "inset(0 0 0 100%)";
      const s = getState(glyph);
      s.isDrawn = false;
    };

    const onMouseOver = (e: Event) => {
      const target = e.target as Element;
      if (!target?.classList?.contains("cal-base")) return;
      const glyph = target.closest(".cal-glyph");
      if (!glyph) return;

      const s = getState(glyph);

      // Cancel any pending retraction — cursor's back on this glyph
      if (s.retractTimer !== null) {
        clearTimeout(s.retractTimer);
        s.retractTimer = null;
      }

      // Already drawn or scheduled to draw — nothing more to do
      if (s.isDrawn || s.revealTimer !== null) return;

      // Delayed commit: only reveal if cursor lingers
      s.revealTimer = window.setTimeout(() => {
        s.revealTimer = null;
        reveal(glyph);
      }, HOVER_COMMIT_DELAY);
    };

    const onMouseOut = (e: Event) => {
      const target = e.target as Element;
      if (!target?.classList?.contains("cal-base")) return;
      const glyph = target.closest(".cal-glyph");
      if (!glyph) return;

      const s = getState(glyph);

      // Cursor left before commit — cancel the pending reveal cleanly
      if (s.revealTimer !== null) {
        clearTimeout(s.revealTimer);
        s.revealTimer = null;
        return;
      }

      // Already drawn: schedule retraction but respect MIN_HOLD so the
      // full right-to-left draw animation completes before reversing.
      if (s.isDrawn && s.retractTimer === null) {
        const elapsed = performance.now() - s.drawnAt;
        const wait = Math.max(0, DRAW_DURATION + MIN_HOLD - elapsed);
        s.retractTimer = window.setTimeout(() => {
          s.retractTimer = null;
          retract(glyph);
        }, wait);
      }
    };

    svg.addEventListener("mouseover", onMouseOver);
    svg.addEventListener("mouseout", onMouseOut);

    return () => {
      svg.removeEventListener("mouseover", onMouseOver);
      svg.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  /* ── Mobile: random pulses in the visible center area ────────── */
  const animateRandom = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const accents = svg.querySelectorAll<SVGPathElement>(".cal-accent");
    const visible: SVGPathElement[] = [];
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    for (const el of accents) {
      if (
        el.classList.contains("cal-drawing") ||
        el.classList.contains("cal-undrawing")
      ) {
        continue;
      }
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // Restrict to central 80% horizontally and within the viewport
      // vertically — no animating shapes in the invisible margins.
      if (cx < vw * 0.1 || cx > vw * 0.9) continue;
      if (cy < 0 || cy > vh) continue;
      visible.push(el);
    }

    if (visible.length === 0) return;

    const el = visible[Math.floor(Math.random() * visible.length)];
    el.classList.add("cal-drawing");

    // draw-in (800ms) + linger (500ms) + draw-out (600ms)
    window.setTimeout(() => {
      el.classList.remove("cal-drawing");
      el.classList.add("cal-undrawing");
      window.setTimeout(() => {
        el.classList.remove("cal-undrawing");
      }, 600);
    }, 1300);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;

    let timer: number;
    let cancelled = false;

    const schedule = (delay: number) => {
      timer = window.setTimeout(() => {
        if (cancelled) return;
        animateRandom();
        const next =
          MOBILE_INTERVAL_MIN +
          Math.random() * (MOBILE_INTERVAL_MAX - MOBILE_INTERVAL_MIN);
        schedule(next);
      }, delay);
    };

    // Start almost immediately after mount
    schedule(MOBILE_INITIAL_DELAY);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [animateRandom]);

  /**
   * Dark mode: pure white at 4% sits too bright on black (the eye
   * notices emitted light more than absorbed light). Drop to 2.5%
   * so the vignette blends as seamlessly as the 4% black does on white.
   */
  const baseFill = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)";

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-[1] overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent), " +
          "linear-gradient(to right, transparent 2%, black 15%, black 85%, transparent 98%)",
        maskComposite: "intersect",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent), " +
          "linear-gradient(to right, transparent 2%, black 15%, black 85%, transparent 98%)",
        WebkitMaskComposite: "source-in" as string,
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${TOTAL_W} ${TILE_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="cal-pattern-svg absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: TILE_COUNT }, (_, tileIdx) => (
          <g key={tileIdx} transform={`translate(${tileIdx * TILE_STRIDE}, 0)`}>
            <g transform={OUTER_TRANSFORM}>
              {PATHS.map((d, pathIdx) => (
                <g key={pathIdx} className="cal-glyph">
                  <path
                    className="cal-base"
                    d={d}
                    transform={PATH_TRANSFORM}
                    fill={baseFill}
                    style={{ pointerEvents: "visiblePainted" }}
                  />
                  <path
                    className="cal-accent"
                    d={d}
                    transform={PATH_TRANSFORM}
                    fill="#008a2f"
                    style={{ pointerEvents: "none" }}
                  />
                </g>
              ))}
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
