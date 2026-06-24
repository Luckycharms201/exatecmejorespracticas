import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import CountUp from "../dataviz/CountUp";

/**
 * Slide-numeralia de agrupaciones: número grande (count-up) a la izquierda y
 * la lista de nombres a la derecha en dos columnas (flujo vertical), con viñeta
 * acento (sin numerar). Entrada: número, etiqueta y nombres con stagger.
 */
export default function SlideAgrupacionesList({ slide }) {
  const names = slide.names ?? [];

  const scope = useSlideTimeline((tl) => {
    tl.from(".agl-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".agl-num", { opacity: 0, scale: 0.8, duration: 0.7, ease: "back.out(1.6)" }, "-=0.2")
      .from(".agl-label", { opacity: 0, y: 14, duration: 0.5 }, "-=0.3")
      .from(".agl-name", { opacity: 0, x: -20, duration: 0.45, stagger: 0.06 }, "-=0.2");
  });

  return (
    <div ref={scope} className="flex h-full w-full items-center gap-14 py-2">
      {/* número grande */}
      <div className="shrink-0">
        <p className="agl-kicker text-accent text-xs font-semibold tracking-[0.4em] uppercase">
          {slide.kicker}
        </p>
        <div className="agl-num text-accent text-[11rem] font-black leading-none">
          <CountUp value={slide.count ?? names.length} duration={1.6} delay={0.2} />
        </div>
        <p className="agl-label text-text-dim mt-2 max-w-[14ch] text-xl leading-snug">
          {slide.label}
        </p>
      </div>

      {/* nombres en dos columnas */}
      <div className="min-w-0 flex-1 columns-2 gap-10">
        {names.map((n, i) => (
          <div
            key={i}
            className="agl-name mb-3.5 flex items-start gap-3 break-inside-avoid"
          >
            <span className="bg-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
            <span className="text-text text-lg leading-snug">{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
