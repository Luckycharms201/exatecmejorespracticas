import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";
import Placeholder from "../ui/Placeholder";

/**
 * Slide 4 · Identidad del Evento — tres tarjetas verticales muy visuales
 * (Vestimenta / Photo Ops / Estolas). La foto domina la tarjeta y el
 * texto vive sobre un degradado al pie.
 */
export default function SlideIdentidad({ slide }) {
  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".sh-title", { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 }, "-=0.2")
      .from(
        ".id-card",
        {
          opacity: 0,
          y: 60,
          scale: 0.94,
          filter: "blur(12px)",
          duration: 0.8,
          stagger: 0.16,
          ease: "power3.out",
        },
        "-=0.3"
      );
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-8 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
        {slide.sections.map((sec, i) => (
          <div
            key={sec.heading}
            className="id-card relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl"
          >
            <Placeholder
              n={slide.placeholders[i]?.n}
              note={slide.placeholders[i]?.note}
              src={slide.placeholders[i]?.src}
              alt={slide.placeholders[i]?.alt}
              className="absolute inset-0 h-full w-full rounded-2xl"
            />
            {/* degradado + texto al pie */}
            <div className="relative mt-auto bg-gradient-to-t from-bg-deep via-bg-deep/85 to-transparent p-5 pt-16">
              <span className="text-accent text-[10px] font-semibold tracking-[0.3em] uppercase">
                {sec.sub}
              </span>
              <h3 className="text-text mt-1 text-2xl font-bold">{sec.heading}</h3>
              <p className="text-text-dim mt-1 text-sm leading-snug">
                {sec.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
