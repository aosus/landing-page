"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  PATHS,
  OUTER_TRANSFORM,
  PATH_TRANSFORM,
} from "@/data/calligraphy-paths";

/**
 * The original viewBox of a single tile from pattern-2.svg.
 * Width: 3183.4758, Height: 6532.8936
 */
const TILE_W = 3183.4758;
const TILE_H = 6532.8936;

/**
 * Overlap between tiles (~15% of tile width).
 * The SVG has ~168 SVG-units of left-edge padding, so overlapping
 * by ~480 units hides border gaps completely.
 */
const TILE_OVERLAP = 480;
const TILE_STRIDE = TILE_W - TILE_OVERLAP;

/** Number of horizontal tiles — 3 covers up to ultrawide viewports. */
const TILE_COUNT = 3;

/** Total SVG width spanning all tiles. */
const TOTAL_W = TILE_STRIDE * (TILE_COUNT - 1) + TILE_W;

interface CalligraphyPatternProps {
  isDark: boolean;
}

export default function CalligraphyPattern({ isDark }: CalligraphyPatternProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  /* ── Mobile: random "drawing" pulses ─────────────────────────── */
  const animateRandom = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const allAccents = svg.querySelectorAll<SVGPathElement>(".cal-accent");
    if (allAccents.length === 0) return;

    // Pick 1–2 random accent paths
    const count = Math.random() > 0.5 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * allAccents.length);
      const el = allAccents[idx];
      if (el.classList.contains("cal-drawing")) continue;

      el.classList.add("cal-drawing");

      // After draw-in finishes (800ms) + linger (600ms), draw-out
      setTimeout(() => {
        el.classList.remove("cal-drawing");
        el.classList.add("cal-undrawing");

        // After draw-out finishes (600ms), reset
        setTimeout(() => {
          el.classList.remove("cal-undrawing");
        }, 600);
      }, 1400);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    if (!mq.matches) return;

    // Initial delay, then repeat every 2.5–4s (randomised)
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const delay = 2500 + Math.random() * 1500;
      timer = setTimeout(() => {
        animateRandom();
        schedule();
      }, delay);
    };

    schedule();
    return () => clearTimeout(timer);
  }, [animateRandom]);

  /* ── Render ──────────────────────────────────────────────────── */
  const baseFill = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent), linear-gradient(to right, transparent 2%, black 15%, black 85%, transparent 98%)",
        maskComposite: "intersect",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent), linear-gradient(to right, transparent 2%, black 15%, black 85%, transparent 98%)",
        WebkitMaskComposite: "source-in" as string,
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${TOTAL_W} ${TILE_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: TILE_COUNT }, (_, tileIdx) => (
          <g
            key={tileIdx}
            transform={`translate(${tileIdx * TILE_STRIDE}, 0)`}
          >
            <g transform={OUTER_TRANSFORM}>
              {PATHS.map((d, pathIdx) => (
                <g
                  key={pathIdx}
                  className="cal-glyph"
                  pointerEvents="visiblePainted"
                >
                  {/* Base layer: always visible, faint */}
                  <path
                    className="cal-base"
                    d={d}
                    transform={PATH_TRANSFORM}
                    fill={baseFill}
                    style={{ pointerEvents: "none" }}
                  />
                  {/* Accent layer: green, revealed by clip-path on hover / mobile animation */}
                  <path
                    className="cal-accent"
                    d={d}
                    transform={PATH_TRANSFORM}
                    fill="#008a2f"
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
