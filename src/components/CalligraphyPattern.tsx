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

interface CalligraphyPatternProps {
  isDark: boolean;
}

export default function CalligraphyPattern({ isDark }: CalligraphyPatternProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  /* ── Desktop: JS event delegation for hover drawing effect ──── */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Only on hover-capable devices (real pointer, not touch)
    const mq = window.matchMedia("(hover: hover)");
    if (!mq.matches) return;

    let activeGlyph: Element | null = null;

    const setAccent = (glyph: Element | null, revealed: boolean) => {
      if (!glyph) return;
      const accent = glyph.querySelector<SVGPathElement>(".cal-accent");
      if (accent) {
        accent.style.clipPath = revealed ? "inset(0)" : "inset(0 0 0 100%)";
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      // Only react when the mouse lands on a base path
      if (!target.classList.contains("cal-base")) return;

      const glyph = target.closest(".cal-glyph");
      if (!glyph || glyph === activeGlyph) return;

      // Retract previous glyph
      setAccent(activeGlyph, false);
      activeGlyph = glyph;
      // Reveal current glyph (CSS transition handles the animation)
      setAccent(glyph, true);
    };

    const onMouseLeave = () => {
      setAccent(activeGlyph, false);
      activeGlyph = null;
    };

    svg.addEventListener("mouseover", onMouseOver);
    svg.addEventListener("mouseleave", onMouseLeave);

    return () => {
      svg.removeEventListener("mouseover", onMouseOver);
      svg.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  /* ── Mobile: random "drawing" pulses ─────────────────────────── */
  const animateRandom = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const allAccents = svg.querySelectorAll<SVGPathElement>(".cal-accent");
    if (allAccents.length === 0) return;

    const count = Math.random() > 0.5 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * allAccents.length);
      const el = allAccents[idx];
      if (el.classList.contains("cal-drawing") || el.classList.contains("cal-undrawing")) continue;

      el.classList.add("cal-drawing");

      setTimeout(() => {
        el.classList.remove("cal-drawing");
        el.classList.add("cal-undrawing");
        setTimeout(() => {
          el.classList.remove("cal-undrawing");
        }, 600);
      }, 1400);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    if (!mq.matches) return;

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

  const baseFill = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

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
                  {/* Base: always-visible faint texture, receives mouseover */}
                  <path
                    className="cal-base"
                    d={d}
                    transform={PATH_TRANSFORM}
                    fill={baseFill}
                    style={{ pointerEvents: "visiblePainted" }}
                  />
                  {/* Accent: green, animated by JS hover + mobile random pulse */}
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
