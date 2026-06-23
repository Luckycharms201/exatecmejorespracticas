import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";
import CountUp from "../dataviz/CountUp";

/**
 * Slide · Torneos — disciplinas (chips) + tarjeta por torneo con su monto
 * recaudado (héroe) y numeralia. Tochito y Golf con datos reales.
 */
export default function SlideTorneos({ slide }) {
  const tournaments = slide.tournaments ?? [];

  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".sh-title", { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 }, "-=0.2")
      .from(".trn-chip", { opacity: 0, y: 16, duration: 0.4, stagger: 0.08 }, "-=0.3")
      .from(
        ".trn-card",
        { opacity: 0, y: 40, filter: "blur(12px)", duration: 0.8, stagger: 0.18 },
        "-=0.2"
      );
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-7 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      {/* disciplinas */}
      <div className="flex flex-wrap gap-3">
        {slide.disciplines?.map((d) => (
          <span
            key={d}
            className="trn-chip border-blue-700 bg-blue-900/50 text-text rounded-full border px-5 py-2 text-sm font-medium"
          >
            {d}
          </span>
        ))}
      </div>

      {/* tarjetas por torneo */}
      <div className="grid flex-1 grid-cols-1 items-stretch gap-8 md:grid-cols-2">
        {tournaments.map((t, ti) => (
          <div
            key={t.name}
            className="trn-card flex flex-col gap-6 rounded-2xl border border-blue-700 bg-blue-900/40 p-8"
          >
            <div>
              <span className="text-accent text-[11px] font-semibold tracking-[0.3em] uppercase">
                Torneo
              </span>
              <h3 className="text-text mt-1 text-4xl font-black">{t.name}</h3>
            </div>

            <div>
              <span className="text-text-dim text-xs tracking-[0.3em] uppercase">
                Recaudado
              </span>
              <div className="text-accent mt-1 text-6xl font-black leading-none">
                <CountUp value={t.raised} prefix="$" duration={2} delay={0.4 + ti * 0.2} />
              </div>
            </div>

            <div className="mt-auto flex flex-wrap gap-x-10 gap-y-5">
              {t.stats?.map((s, i) => (
                <div key={i}>
                  <div className="text-text text-4xl font-black leading-none">
                    <CountUp value={s.value} duration={1.6} delay={0.6 + i * 0.12} />
                  </div>
                  <span className="text-text-dim mt-1.5 block text-sm">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
