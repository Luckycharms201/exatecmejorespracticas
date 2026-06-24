import SlideHeading from "../ui/SlideHeading";
import CountUp from "../dataviz/CountUp";

/**
 * Slide · Journey LDG — línea del tiempo (roadmap) del Líder de Generación.
 * Camino horizontal con hitos numerados; `highlight` (índice) resalta el punto
 * en turno (nodo más grande + glow). Render ESTÁTICO (sin animación de entrada)
 * para que círculos, títulos y subtítulos se vean siempre.
 */
export default function SlideJourney({ slide }) {
  const points = slide.points ?? [];
  const results = slide.results ?? [];
  const highlight = slide.highlight ?? -1;

  return (
    <div className="jp-fade flex h-full w-full flex-col gap-6 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      {/* roadmap */}
      <div className="relative flex flex-1 items-center">
        <div className="relative flex w-full items-center justify-between">
          <div className="bg-blue-500 absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full" />

          {points.map((p, i) => {
            const above = i % 2 === 0;
            const active = i === highlight;
            return (
              <div key={i} className="relative flex flex-1 flex-col items-center">
                <div
                  className={[
                    "absolute w-36 text-center transition-all duration-300",
                    above ? "bottom-1/2 mb-10" : "top-1/2 mt-10",
                  ].join(" ")}
                >
                  <p
                    className={[
                      "text-sm font-bold leading-tight transition-colors",
                      active ? "text-accent" : "text-text",
                    ].join(" ")}
                  >
                    {p.title}
                  </p>
                  <p className="text-text-dim mt-1 text-xs leading-snug">{p.sub}</p>
                </div>

                <div
                  className="relative z-10 transition-transform duration-300"
                  style={{ transform: active ? "scale(1.35)" : "scale(1)" }}
                >
                  <div
                    className="bg-bg-deep ring-accent text-accent flex h-12 w-12 items-center justify-center rounded-full font-bold ring-2"
                    style={{ boxShadow: active ? "0 0 26px 4px var(--color-accent)" : "none" }}
                  >
                    {i + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* resultados */}
      <div className="border-blue-700 grid grid-cols-3 gap-4 border-t pt-5">
        {results.map((r, i) => (
          <div key={i} className="flex items-baseline gap-3">
            <div className="text-accent text-4xl font-black leading-none">
              <CountUp value={r.participacion} suffix="%" duration={1.6} delay={0.2 + i * 0.12} />
            </div>
            <div className="flex flex-col">
              <span className="text-text text-sm font-semibold">{r.period}</span>
              <span className="text-text-dim text-xs">{r.lideres} líderes electos</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
