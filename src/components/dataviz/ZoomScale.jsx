import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Narrativa de escala con ZOOM progresivo (global → local).
 * En vez de mostrar cifras sueltas, "viaja" de una escala a otra:
 * cada paso entra desde grande+desenfocado, su número hace count-up,
 * sostiene, y retrocede mientras el siguiente se acerca.
 *
 * props.steps: [{ value, label, caption, prefix, suffix, decimals, separator }]
 */
export default function ZoomScale({ steps = [], className = "" }) {
  const ref = useRef(null);
  const numRefs = useRef([]);

  const fmt = (s, n) => {
    const fixed = Number(n).toFixed(s.decimals ?? 0);
    const [int, dec] = fixed.split(".");
    const sep = s.separator ?? ",";
    const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    return (s.prefix ?? "") + (dec ? `${withSep}.${dec}` : withSep) + (s.suffix ?? "");
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray(".zs-step");
      gsap.set(blocks, { autoAlpha: 0, scale: 1.4, filter: "blur(16px)" });

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        const last = steps.length - 1;
        gsap.set(blocks[last], { autoAlpha: 1, scale: 1, filter: "blur(0px)" });
        if (numRefs.current[last])
          numRefs.current[last].textContent = fmt(steps[last], steps[last].value);
        gsap.set(".zs-dot", { backgroundColor: "var(--color-accent)" });
        return;
      }

      const tl = gsap.timeline();
      steps.forEach((step, i) => {
        const block = blocks[i];
        const numEl = numRefs.current[i];
        const proxy = { v: 0 };

        tl.set(block, { zIndex: 10 + i });
        tl.to(block, {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        });
        tl.to(
          proxy,
          {
            v: step.value,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              if (numEl) numEl.textContent = fmt(step, proxy.v);
            },
          },
          "<"
        );
        tl.to(`.zs-dot-${i}`, { scale: 1.4, opacity: 1, duration: 0.3 }, "<");

        if (i < steps.length - 1) {
          tl.to(block, {
            autoAlpha: 0,
            scale: 0.55,
            filter: "blur(10px)",
            duration: 0.6,
            ease: "power3.in",
            delay: 1.1,
          });
        }
      });
    }, ref);
    return () => ctx.revert();
  }, [steps]);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center ${className}`}
    >
      {/* pila de pasos (solo uno visible a la vez) */}
      <div className="relative flex h-64 w-full items-center justify-center">
        {steps.map((step, i) => (
          <div
            key={i}
            className="zs-step absolute flex flex-col items-center gap-3 text-center"
          >
            <span className="text-text-dim text-xs font-semibold tracking-[0.4em] uppercase">
              {step.label}
            </span>
            <span
              ref={(el) => (numRefs.current[i] = el)}
              className="tabular text-accent text-7xl font-black tracking-tight md:text-8xl"
            >
              0
            </span>
            {step.caption && (
              <span className="text-text-dim max-w-sm text-sm">
                {step.caption}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* indicador de pasos */}
      <div className="mt-6 flex items-center gap-2">
        {steps.map((_, i) => (
          <span
            key={i}
            className={`zs-dot zs-dot-${i} bg-blue-700 h-2 w-2 rounded-full opacity-50`}
          />
        ))}
      </div>
    </div>
  );
}
