import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";
import Placeholder from "../ui/Placeholder";
import CountUp from "../dataviz/CountUp";

/**
 * Slide 8 · Talleres (con Educación Continua) — fotos + numeralia.
 * Izquierda: par de fotos. Derecha: rejilla 2×2 de cifras con count-up.
 */
export default function SlideTalleres({ slide }) {
  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".sh-title", { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 }, "-=0.2")
      .from(".tll-photo", { opacity: 0, scale: 0.94, filter: "blur(12px)", duration: 0.8, stagger: 0.14 }, "-=0.3")
      .from(".tll-stat", { opacity: 0, y: 30, duration: 0.6, stagger: 0.12 }, "-=0.5");
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-8 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-8 lg:grid-cols-2 lg:grid-rows-1">
        {/* fotos — frames horizontales apilados; la imagen va en absoluto
            (object-cover) para que se recorte y no estire el frame */}
        <div className="flex min-h-0 flex-col gap-4">
          {slide.placeholders.map((p) => (
            <div
              key={p.n}
              className="tll-photo relative min-h-0 w-full flex-1 overflow-hidden rounded-xl"
            >
              <Placeholder
                n={p.n}
                note={p.note}
                src={p.src}
                alt={p.alt}
                className="absolute inset-0 h-full w-full"
              />
            </div>
          ))}
        </div>

        {/* numeralia */}
        <div className="grid grid-cols-2 gap-5">
          {slide.stats.map((s, i) => (
            <div
              key={i}
              className="tll-stat flex flex-col justify-center rounded-2xl border border-blue-700 bg-blue-900/40 p-6"
            >
              <div className="text-accent text-5xl font-black leading-none">
                <CountUp
                  value={s.value}
                  suffix={s.suffix ?? ""}
                  prefix={s.prefix ?? ""}
                  duration={1.8}
                  delay={0.3 + i * 0.12}
                />
              </div>
              <span className="text-text-dim mt-2 text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
