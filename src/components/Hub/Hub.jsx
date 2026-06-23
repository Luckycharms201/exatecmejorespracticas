import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { GROUPS, META } from "../../data/presentation";
import { nodePosition } from "./hubLayout";

/**
 * Hub central — constelación de grupos (radios de la rueda).
 * Un núcleo central se conecta por líneas a los 3 nodos-grupo,
 * comunicando visualmente que todas las secciones forman un sistema.
 *
 * `active` (= view === "hub") dispara la entrada animada cada vez que
 * volvemos al hub: líneas que se dibujan + nodos con stagger blur-in.
 */
export default function Hub({
  active,
  focusedGroupIndex,
  onFocus,
  onEnter,
  onPresentLive,
}) {
  const rootRef = useRef(null);
  const nodes = GROUPS.map((g) => ({ ...g, pos: nodePosition(g.hub.angle) }));

  useLayoutEffect(() => {
    if (!active) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hub-core", { scale: 0.6, opacity: 0, duration: 0.6 })
        .from(
          ".hub-line",
          { scaleX: 0, opacity: 0, duration: 0.6, stagger: 0.08 },
          "-=0.3"
        )
        .from(
          ".hub-node",
          {
            opacity: 0,
            scale: 0.8,
            y: 24,
            filter: "blur(12px)",
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.35"
        );
    }, rootRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <div ref={rootRef} className="relative h-full w-full overflow-hidden">
      {/* título superior */}
      <header className="absolute inset-x-0 top-12 z-20 text-center">
        <p className="text-text-dim text-xs tracking-[0.5em] uppercase">
          {META.subtitle}
        </p>
        <h1 className="text-text mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          {META.title}
        </h1>
      </header>

      {/* líneas núcleo → nodos */}
      <svg
        className="absolute inset-0 z-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {nodes.map((n) => (
          <line
            key={n.id}
            className="hub-line"
            x1="50"
            y1="50"
            x2={n.pos.x}
            y2={n.pos.y}
            stroke="var(--color-blue-700)"
            strokeWidth="0.25"
            vectorEffect="non-scaling-stroke"
            style={{ transformOrigin: "50% 50%" }}
          />
        ))}
      </svg>

      {/* núcleo central */}
      <div
        className="hub-core absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style={{ left: "50%", top: "50%" }}
      >
        <div className="bg-blue-500/20 ring-blue-500/40 flex h-24 w-24 items-center justify-center rounded-full ring-1">
          <div className="bg-accent/20 ring-accent/60 h-12 w-12 rounded-full ring-1" />
        </div>
      </div>

      {/* nodos-grupo */}
      {nodes.map((group, i) => {
        const focused = i === focusedGroupIndex;
        return (
          <button
            key={group.id}
            className="hub-node absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${group.pos.x}%`, top: `${group.pos.y}%` }}
            onMouseEnter={() => onFocus(i)}
            onFocus={() => onFocus(i)}
            onClick={() => onEnter(group.id)}
          >
            <div
              className={[
                "flex w-[230px] flex-col items-start gap-1.5 rounded-2xl border px-6 py-5 text-left backdrop-blur-sm transition-all duration-300",
                focused
                  ? "border-accent bg-blue-900 scale-105 shadow-[0_0_40px_-8px_var(--color-accent)]"
                  : "border-blue-700 bg-blue-900/50",
              ].join(" ")}
            >
              <span
                className={
                  focused
                    ? "text-accent text-[10px] font-semibold tracking-[0.3em] uppercase"
                    : "text-text-dim text-[10px] font-semibold tracking-[0.3em] uppercase"
                }
              >
                {group.short}
              </span>
              <span className="text-text text-lg leading-tight font-bold">
                {group.name}
              </span>
              <span className="text-text-dim text-xs">
                {group.slides.length}{" "}
                {group.slides.length === 1 ? "escena" : "escenas"}
              </span>
            </div>
          </button>
        );
      })}

      {/* opción LIVE + pista de teclado */}
      <div className="absolute inset-x-0 bottom-9 z-20 flex flex-col items-center gap-3">
        <button
          onClick={onPresentLive}
          className="border-accent/50 bg-accent/10 text-accent hover:bg-accent/20 flex items-center gap-2 rounded-full border px-6 py-2.5 text-xs font-semibold tracking-[0.25em] uppercase backdrop-blur-sm transition"
        >
          <span className="bg-accent h-2 w-2 animate-pulse rounded-full" />
          Live · Presentar en vivo
        </button>
        <p className="text-text-dim text-xs tracking-[0.2em]">
          ← → ELEGIR · ENTER ENTRAR · F PANTALLA COMPLETA
        </p>
      </div>
    </div>
  );
}
