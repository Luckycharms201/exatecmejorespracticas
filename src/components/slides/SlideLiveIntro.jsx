import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import { META } from "../../data/presentation";

/**
 * Portada de arranque del MODO LIVE. Es la primera slide que se ve al entrar
 * a la presentación en vivo: kicker, título grande y pista de avance.
 */
export default function SlideLiveIntro({ slide }) {
  const words = (slide.title ?? META.title).split(" ");

  const scope = useSlideTimeline((tl) => {
    tl.from(".intro-kicker", { opacity: 0, y: 12, duration: 0.6 })
      .from(
        ".intro-word",
        {
          opacity: 0,
          y: 70,
          filter: "blur(18px)",
          duration: 1,
          stagger: 0.13,
          ease: "power4.out",
        },
        "-=0.2"
      )
      .from(
        ".intro-rule",
        { scaleX: 0, opacity: 0, duration: 0.9, ease: "power3.inOut" },
        "-=0.55"
      );
  });

  return (
    <div
      ref={scope}
      className="flex h-full w-full flex-col items-center justify-center gap-9 text-center"
    >
      <p className="intro-kicker text-accent text-sm font-semibold tracking-[0.5em] uppercase">
        {slide.kicker ?? META.subtitle}
      </p>

      <h1 className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-7xl font-black tracking-tight md:text-8xl">
        {words.map((w, i) => (
          <span key={i} className="intro-word inline-block">
            {w}
          </span>
        ))}
      </h1>

      <div
        className="intro-rule bg-accent h-[3px] w-48 origin-center rounded-full"
        style={{ boxShadow: "0 0 24px -2px var(--color-accent)" }}
      />
    </div>
  );
}
