import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";
import CountUp from "../dataviz/CountUp";
import IMessageThread from "../dataviz/iMessageThread";

/**
 * Slide 7 · NPS · Regreso a Casa — pantalla de DATO duro.
 * Énfasis: la MEJORÍA de 2024 → 2025 (promedio 44.7 → 64.8, +20.1 pts).
 * Izquierda: héroe del salto + comparativo por segmento de generación
 * (2025 en acento, 2024 atenuado). Derecha: comentarios reales tipo iMessage.
 */

function SegmentGroup({ data, accent, className = "" }) {
  return (
    <div className={`nps-group flex flex-col gap-2 ${className}`}>
      <div className="flex items-baseline justify-between">
        <span
          className={[
            "text-xs font-bold tracking-[0.3em] uppercase",
            accent ? "text-accent" : "text-text-dim",
          ].join(" ")}
        >
          {data.year}
        </span>
        <span className="text-text-dim text-[11px]">
          Promedio{" "}
          <span className={accent ? "text-accent font-bold" : "font-bold"}>
            {data.average}
          </span>
        </span>
      </div>

      {data.segments.map((s) => (
        <div key={s.label} className="nps-row flex items-center gap-3">
          <span className="text-text-dim w-24 shrink-0 text-[11px]">
            {s.label}
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-blue-900">
            <div
              className={[
                "nps-fill h-full rounded-full",
                accent ? "bg-accent" : "bg-blue-500",
              ].join(" ")}
              style={{ width: `${s.value}%` }}
            />
          </div>
          <span
            className={[
              "tabular w-7 shrink-0 text-right text-sm font-bold",
              accent ? "text-accent" : "text-text-dim",
            ].join(" ")}
          >
            {s.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SlideNPS({ slide }) {
  const years = slide.years ?? [];
  const y2024 = years[0];
  const y2025 = years[1];
  const delta = +(y2025.average - y2024.average).toFixed(1); // +20.1
  const deltaPct = Math.round((delta / y2024.average) * 100); // +45

  const comments = (slide.comments ?? []).map((text) => ({
    from: "them",
    text,
  }));

  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(
        ".sh-title",
        { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 },
        "-=0.2"
      )
      .from(".nps-prev", { opacity: 0, x: -16, duration: 0.5 }, "-=0.1")
      .from(".nps-hero", { opacity: 0, scale: 0.9, duration: 0.7 }, "-=0.2")
      .from(
        ".nps-delta",
        { opacity: 0, y: 12, scale: 0.8, duration: 0.6, ease: "back.out(2)" },
        "-=0.3"
      )
      .from(
        ".nps-group",
        { opacity: 0, y: 16, duration: 0.5, stagger: 0.15 },
        "-=0.2"
      )
      .from(
        ".nps-fill",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        },
        "<"
      );
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-5 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      <div className="grid flex-1 grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
        {/* métricas */}
        <div className="flex flex-col justify-center gap-7">
          {/* héroe: el salto de promedio 2024 → 2025 */}
          <div>
            <span className="text-text-dim text-xs tracking-[0.3em] uppercase">
              NPS Promedio
            </span>
            <div className="mt-2 flex items-end gap-5">
              {/* 2024 */}
              <div className="nps-prev flex flex-col leading-none">
                <span className="text-text-dim text-[11px] tracking-[0.25em] uppercase">
                  {y2024.year}
                </span>
                <span className="tabular text-text-dim mt-1 text-4xl font-black">
                  {y2024.average}
                </span>
              </div>

              {/* flecha de mejora */}
              <svg
                className="mb-2 shrink-0"
                width="40"
                height="36"
                viewBox="0 0 40 36"
                fill="none"
              >
                <path
                  d="M3 30 L30 9"
                  stroke="var(--color-accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M19 7 L32 6 L31 19"
                  stroke="var(--color-accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>

              {/* 2025 */}
              <div className="nps-hero flex flex-col leading-none">
                <span className="text-accent text-[11px] tracking-[0.25em] uppercase">
                  {y2025.year}
                </span>
                <div className="text-accent mt-1 text-8xl font-black leading-none">
                  <CountUp value={y2025.average} decimals={1} duration={2} />
                </div>
              </div>

              {/* delta */}
              <div className="nps-delta border-accent/40 bg-accent/10 mb-3 shrink-0 rounded-full border px-3 py-1.5">
                <span className="text-accent text-sm font-bold">
                  +{delta} pts
                </span>
                <span className="text-text-dim ml-1 text-xs">+{deltaPct}%</span>
              </div>
            </div>
            <span className="text-text-dim mt-2 block text-sm">
              de satisfacción de la comunidad
            </span>
          </div>

          {/* comparativo por segmento de generación */}
          <div className="flex flex-col gap-5">
            <SegmentGroup data={y2024} accent={false} />
            <SegmentGroup data={y2025} accent />
          </div>
        </div>

        {/* comentarios iMessage */}
        <div className="flex flex-col justify-center">
          <span className="text-text-dim mb-4 text-xs tracking-[0.3em] uppercase">
            Lo que dijo la comunidad
          </span>
          <IMessageThread messages={comments} delay={0.6} />
        </div>
      </div>
    </div>
  );
}
