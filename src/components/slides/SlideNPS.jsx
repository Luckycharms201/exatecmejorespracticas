import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";
import CountUp from "../dataviz/CountUp";
import IMessageThread from "../dataviz/iMessageThread";

/**
 * Slide 6 · NPS · Regreso a Casa — pantalla de DATO duro.
 * Izquierda: NPS de la última edición (count-up gigante) + tendencia
 * por edición en barras. Derecha: comentarios reales estilo iMessage.
 */
export default function SlideNPS({ slide }) {
  const editions = slide.editions ?? [];
  const latest = editions[editions.length - 1];

  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".sh-title", { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 }, "-=0.2")
      .from(".nps-hero", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.2")
      .from(
        ".nps-row",
        { opacity: 0, x: -24, duration: 0.5, stagger: 0.12 },
        "-=0.3"
      )
      .from(
        ".nps-fill",
        { scaleX: 0, transformOrigin: "left center", duration: 0.9, stagger: 0.12, ease: "power3.out" },
        "<"
      );
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-6 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      <div className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* métricas */}
        <div className="flex flex-col justify-center gap-8">
          <div className="nps-hero">
            <span className="text-text-dim text-xs tracking-[0.3em] uppercase">
              NPS · {latest?.name}
            </span>
            <div className="text-accent mt-1 text-8xl font-black leading-none">
              <CountUp value={latest?.nps ?? 0} duration={2} />
            </div>
            <span className="text-text-dim mt-2 block text-sm">
              de satisfacción de la comunidad
            </span>
          </div>

          {/* tendencia por edición */}
          <div className="flex flex-col gap-3">
            {editions.map((e, i) => {
              const isLatest = i === editions.length - 1;
              return (
                <div key={e.name} className="nps-row flex items-center gap-3">
                  <span className="text-text-dim w-20 shrink-0 text-xs">
                    {e.name}
                  </span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-blue-900">
                    <div
                      className={[
                        "nps-fill h-full rounded-full",
                        isLatest ? "bg-accent" : "bg-blue-500",
                      ].join(" ")}
                      style={{ width: `${e.nps}%` }}
                    />
                  </div>
                  <span
                    className={[
                      "tabular w-8 shrink-0 text-right text-sm font-bold",
                      isLatest ? "text-accent" : "text-text-dim",
                    ].join(" ")}
                  >
                    {e.nps}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* comentarios iMessage */}
        <div className="flex flex-col justify-center">
          <span className="text-text-dim mb-4 text-xs tracking-[0.3em] uppercase">
            Lo que dijo la comunidad
          </span>
          <IMessageThread messages={slide.comments ?? []} delay={0.6} />
        </div>
      </div>
    </div>
  );
}
