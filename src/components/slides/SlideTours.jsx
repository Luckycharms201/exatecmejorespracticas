import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";
import Placeholder from "../ui/Placeholder";
import { HighlightText } from "../ui/Highlight";

/**
 * Slide 3 · Tours — layout editorial asimétrico:
 * dos bloques (Identidad / Nueva logística) con foto + texto,
 * el segundo desfasado verticalmente para dar ritmo.
 */
export default function SlideTours({ slide }) {
  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".sh-title", { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 }, "-=0.2")
      .from(
        ".tour-block",
        {
          opacity: 0,
          y: 50,
          filter: "blur(12px)",
          duration: 0.8,
          stagger: 0.18,
        },
        "-=0.3"
      );
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-8 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      <div className="grid flex-1 grid-cols-1 items-start gap-8 md:grid-cols-2">
        {slide.sections.map((sec, i) => (
          <div key={sec.heading} className="tour-block flex flex-col gap-4">
            <Placeholder
              n={slide.placeholders[i]?.n}
              note={slide.placeholders[i]?.note}
              src={slide.placeholders[i]?.src}
              alt={slide.placeholders[i]?.alt}
              className="aspect-[3/2] w-full"
            />
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-accent tabular text-sm font-bold">
                  0{i + 1}
                </span>
                <h3 className="text-text text-2xl font-bold">{sec.heading}</h3>
              </div>
              <p className="text-text-dim mt-2 leading-relaxed">
                <HighlightText text={sec.body} words={sec.keywords ?? []} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
