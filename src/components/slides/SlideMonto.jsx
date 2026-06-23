import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";
import CountUp from "../dataviz/CountUp";

/**
 * Slide 12 · Monto Recaudado en Eventos — pantalla de DATO duro.
 * Hero: total recaudado en count-up gigante ($ MXN).
 * Desglose por evento en barras proporcionales con su monto.
 */
export default function SlideMonto({ slide }) {
  const breakdown = slide.breakdown ?? [];
  const max = Math.max(...breakdown.map((b) => b.amount), 1);

  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".sh-title", { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 }, "-=0.2")
      .from(".mto-hero", { opacity: 0, scale: 0.9, duration: 0.8 }, "-=0.2")
      .from(".mto-row", { opacity: 0, x: -24, duration: 0.5, stagger: 0.12 }, "-=0.3")
      .from(
        ".mto-fill",
        { scaleX: 0, transformOrigin: "left center", duration: 1, stagger: 0.12, ease: "power3.out" },
        "<"
      );
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-6 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      <div className="grid flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr]">
        {/* hero total */}
        <div className="mto-hero">
          <span className="text-text-dim text-sm tracking-[0.3em] uppercase">
            Total recaudado
          </span>
          <div className="text-accent mt-3 text-8xl font-black leading-[0.9] tracking-tight md:text-[9.5rem]">
            <CountUp value={slide.total} prefix="$" duration={2.4} />
          </div>
          <span className="text-text-dim mt-4 block text-xl font-medium">
            MXN
          </span>
        </div>

        {/* desglose por evento */}
        <div className="flex flex-col gap-5">
          {breakdown.map((b, i) => (
            <div key={b.name} className="mto-row">
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-text text-sm font-medium">{b.name}</span>
                <span className="text-text-dim tabular text-sm">
                  <CountUp value={b.amount} prefix="$" duration={1.8} delay={0.4 + i * 0.12} />
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-blue-900">
                <div
                  className={[
                    "mto-fill h-full rounded-full",
                    i === 0 ? "bg-accent" : "bg-blue-500",
                  ].join(" ")}
                  style={{ width: `${(b.amount / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
