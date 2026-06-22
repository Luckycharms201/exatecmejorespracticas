import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";
import CountUp from "../dataviz/CountUp";

/**
 * Slide 13 · Journey LDG — roadmap del Líder de Generación.
 * Camino horizontal con hitos numerados conectados por una línea que se
 * traza; las etiquetas alternan arriba/abajo. Al pie, el crecimiento de
 * participación por periodo. (Adaptado del Canva de LDG.)
 */
export default function SlideJourney({ slide }) {
  const steps = slide.steps ?? [];
  const results = slide.results ?? [];

  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".sh-title", { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 }, "-=0.2")
      .from(".journey-line", { scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "power3.inOut" }, "-=0.2")
      .from(".journey-node", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.12, ease: "back.out(2)" }, "-=0.9")
      .from(".journey-label", { opacity: 0, y: 14, duration: 0.45, stagger: 0.12 }, "-=0.8")
      .from(".journey-result", { opacity: 0, y: 20, duration: 0.5, stagger: 0.12 }, "-=0.3");
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-6 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      {/* roadmap */}
      <div className="relative flex flex-1 items-center">
        <div className="relative flex w-full items-center justify-between">
          {/* línea base */}
          <div className="journey-line bg-blue-500 absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full" />

          {steps.map((s, i) => {
            const above = i % 2 === 0;
            return (
              <div
                key={i}
                className="relative flex flex-1 flex-col items-center"
              >
                {/* etiqueta */}
                <div
                  className={[
                    "journey-label absolute w-36 text-center",
                    above ? "bottom-1/2 mb-8" : "top-1/2 mt-8",
                  ].join(" ")}
                >
                  <p className="text-text text-sm font-bold leading-tight">
                    {s.title}
                  </p>
                  <p className="text-text-dim mt-1 text-xs leading-snug">
                    {s.desc}
                  </p>
                </div>

                {/* hito */}
                <div className="journey-node bg-bg-deep ring-accent text-accent relative z-10 flex h-12 w-12 items-center justify-center rounded-full ring-2 font-bold">
                  {i + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* resultados: crecimiento de participación */}
      <div className="border-blue-700 grid grid-cols-3 gap-4 border-t pt-5">
        {results.map((r, i) => (
          <div key={i} className="journey-result flex items-baseline gap-3">
            <div className="text-accent text-4xl font-black leading-none">
              <CountUp value={r.participacion} suffix="%" duration={1.6} delay={0.2 + i * 0.12} />
            </div>
            <div className="flex flex-col">
              <span className="text-text text-sm font-semibold">{r.period}</span>
              <span className="text-text-dim text-xs">
                {r.lideres} líderes electos
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
