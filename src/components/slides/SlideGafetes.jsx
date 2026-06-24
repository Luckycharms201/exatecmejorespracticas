import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";

/**
 * Slide de gafetes (pseudo-3D). Fila de tarjetas con perspectiva que giran en
 * loop frente↔reverso (CSS), una por color/rol. El reverso lleva el QR.
 * Entrada GSAP: encabezado + tarjetas con stagger; el giro corre aparte (CSS).
 */
export default function SlideGafetes({ slide }) {
  const badges = slide.badges ?? [];

  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".sh-title", { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 }, "-=0.2")
      .from(
        ".gafete-item",
        { opacity: 0, y: 40, scale: 0.9, duration: 0.7, stagger: 0.12, ease: "power3.out" },
        "-=0.2"
      );
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-6 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      <div className="flex min-h-0 flex-1 items-center justify-center gap-10">
        {badges.map((b, i) => (
          <div key={i} className="gafete-item flex flex-col items-center gap-4">
            <div style={{ perspective: 1200, width: 248, height: 344 }}>
              <div
                className="gafete-card relative h-full w-full"
                style={{ animationDelay: `${i * 0.9}s` }}
              >
                <img
                  src={b.front}
                  alt={`Gafete ${b.label} · frente`}
                  className="gafete-face absolute inset-0 h-full w-full rounded-2xl object-contain shadow-2xl"
                />
                <img
                  src={b.back}
                  alt={`Gafete ${b.label} · reverso`}
                  className="gafete-face gafete-back absolute inset-0 h-full w-full rounded-2xl object-contain shadow-2xl"
                />
              </div>
            </div>
            <span className="text-text-dim text-sm tracking-wide">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
