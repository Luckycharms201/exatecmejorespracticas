import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";
import Placeholder from "../ui/Placeholder";
import CountUp from "../dataviz/CountUp";

/**
 * Slide 10 · Torneos — contenido aún por ampliar (slide.pending).
 * Muestra disciplinas como chips, numeralia base y fotos, con una nota
 * discreta de que llegará más información.
 */
export default function SlideTorneos({ slide }) {
  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".sh-title", { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 }, "-=0.2")
      .from(".trn-chip", { opacity: 0, y: 16, duration: 0.4, stagger: 0.08 }, "-=0.3")
      .from(".trn-stat", { opacity: 0, scale: 0.9, duration: 0.5, stagger: 0.12 }, "-=0.2")
      .from(".trn-photo", { opacity: 0, scale: 0.94, filter: "blur(12px)", duration: 0.8, stagger: 0.14 }, "-=0.4");
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-8 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* izquierda: disciplinas + numeralia */}
        <div className="flex flex-col justify-center gap-8">
          <div className="flex flex-wrap gap-3">
            {slide.disciplines?.map((d) => (
              <span
                key={d}
                className="trn-chip border-blue-700 bg-blue-900/50 text-text rounded-full border px-4 py-2 text-sm font-medium"
              >
                {d}
              </span>
            ))}
          </div>

          <div className="flex gap-6">
            {slide.stats?.map((s, i) => (
              <div key={i} className="trn-stat">
                <div className="text-accent text-6xl font-black leading-none">
                  <CountUp value={s.value} duration={1.8} delay={0.3 + i * 0.15} />
                </div>
                <span className="text-text-dim mt-2 block text-sm">{s.label}</span>
              </div>
            ))}
          </div>

          {slide.pending && (
            <span className="text-text-dim/70 text-xs tracking-wide italic">
              + Más información próximamente
            </span>
          )}
        </div>

        {/* derecha: fotos */}
        <div className="grid grid-cols-2 gap-4">
          {slide.placeholders?.map((p) => (
            <Placeholder
              key={p.n}
              n={p.n}
              note={p.note}
              className="trn-photo min-h-[200px]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
