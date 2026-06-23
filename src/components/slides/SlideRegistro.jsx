import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";
import Placeholder from "../ui/Placeholder";

/**
 * Slide 5 · Sistema de Registro y Logística — flujo de 3 pasos
 * (Registro → Gafetes → Acomodo) con conectores que se trazan,
 * comunicando que es un proceso encadenado.
 */
export default function SlideRegistro({ slide }) {
  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".sh-title", { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 }, "-=0.2")
      .from(
        ".step-card",
        { opacity: 0, y: 50, filter: "blur(12px)", duration: 0.7, stagger: 0.2 },
        "-=0.3"
      )
      .from(
        ".step-link",
        { scaleX: 0, opacity: 0, duration: 0.4, stagger: 0.2, ease: "power2.out" },
        "-=0.9"
      );
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-8 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      <div className="flex flex-1 flex-col items-stretch gap-4 md:flex-row md:items-center">
        {slide.sections.map((sec, i) => (
          <div key={sec.heading} className="flex flex-1 items-center gap-4">
            <div className="step-card flex flex-1 flex-col gap-3 rounded-2xl border border-blue-700 bg-blue-900/40 p-5">
              <div className="flex items-center gap-3">
                <span className="bg-accent/15 text-accent ring-accent/40 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ring-1">
                  {sec.step}
                </span>
                <h3 className="text-text text-xl font-bold">{sec.heading}</h3>
              </div>
              <Placeholder
                n={slide.placeholders[i]?.n}
                note={slide.placeholders[i]?.note}
                src={slide.placeholders[i]?.src}
                alt={slide.placeholders[i]?.alt}
                className="min-h-[130px] flex-1"
              />
              <p className="text-text-dim text-sm leading-snug">{sec.body}</p>
            </div>

            {/* conector hacia el siguiente paso */}
            {i < slide.sections.length - 1 && (
              <div className="step-link hidden h-[2px] w-8 origin-left bg-blue-500 md:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
