import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";

/**
 * Slide de retos (lista editorial). Encabezado + lista vertical de retos,
 * cada uno con índice acento, frase guía en negritas y descripción.
 * Entrada: kicker/título y luego las filas con stagger.
 */
export default function SlideRetos({ slide }) {
  const items = slide.items ?? [];

  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(
        ".sh-title",
        { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 },
        "-=0.2"
      )
      .from(
        ".reto-row",
        { opacity: 0, x: -28, duration: 0.55, stagger: 0.12 },
        "-=0.3"
      );
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-6 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3">
        {items.map((it, i) => (
          <div
            key={i}
            className="reto-row flex items-start gap-5 rounded-2xl border border-blue-700 bg-blue-900/40 px-6 py-4"
          >
            <span className="text-accent shrink-0 text-2xl font-black leading-none tabular">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p className="text-text text-lg font-bold leading-tight">
                {it.lead}
              </p>
              <p className="text-text-dim mt-1 text-sm leading-snug">
                {it.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
