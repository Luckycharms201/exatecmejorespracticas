import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Cuadrícula de puntos que vuelve TANGIBLE una proporción
 * (ideal para porcentajes pequeños: "3 de cada 100").
 *
 * props:
 *   value     puntos "encendidos"
 *   total     puntos totales (def 100)
 *   columns   columnas de la cuadrícula (def 20)
 *   delay     seg antes de arrancar
 */
export default function DotGrid({
  value,
  total = 100,
  columns = 20,
  delay = 0,
  className = "",
}) {
  const ref = useRef(null);
  const filled = Math.round(value);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      const tl = gsap.timeline({ delay });
      tl.from(".dot", {
        opacity: 0,
        scale: 0.3,
        duration: 0.5,
        ease: "power2.out",
        stagger: { each: 0.004, from: "start" },
      }).from(
        ".dot-on",
        {
          scale: 0.4,
          duration: 0.5,
          ease: "back.out(2.5)",
          stagger: 0.02,
        },
        "-=0.2"
      );
    }, ref);
    return () => ctx.revert();
  }, [value, total, delay]);

  return (
    <div
      ref={ref}
      className={`grid w-fit gap-1.5 ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const on = i < filled;
        return (
          <span
            key={i}
            className={[
              "dot aspect-square rounded-full",
              on
                ? "dot-on bg-accent"
                : "bg-blue-700/50",
            ].join(" ")}
            style={
              on
                ? { boxShadow: "0 0 8px -1px var(--color-accent)" }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
