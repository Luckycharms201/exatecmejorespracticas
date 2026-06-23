import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import Placeholder from "../ui/Placeholder";

/**
 * Slide-popup del Journey LDG. Tarjeta centrada con layout consistente:
 * título + subtítulo grandes a la izquierda y media a la derecha; o media a
 * pantalla (video horizontal); o el slide de PST (estilo pst.png).
 */
export default function SlideJourneyPopup({ slide }) {
  const scope = useSlideTimeline((tl) => {
    tl.from(".jp-card", { opacity: 0, scale: 0.96, y: 16, duration: 0.5, ease: "power3.out" });
  });

  return (
    <div ref={scope} className="flex h-full w-full items-center justify-center py-2">
      <div className="jp-card border-blue-700 bg-blue-900/40 flex h-full w-full flex-col rounded-3xl border p-9 shadow-2xl">
        <div className="min-h-0 flex-1">
          <PopupBody slide={slide} />
        </div>
      </div>
    </div>
  );
}

function PopupBody({ slide }) {
  if (slide.media === "pst") return <PstContent pst={slide.pst} />;

  // video horizontal sin texto: llena la tarjeta
  if (!slide.text) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="aspect-video max-h-full w-full">
          <Placeholder kind="video" src={slide.src} className="h-full w-full" />
        </div>
      </div>
    );
  }

  const point = slide.point ?? {};
  const media =
    slide.media === "photo-horizontal" ? (
      <div className="aspect-video w-full">
        <Placeholder kind="image" src={slide.src} className="h-full w-full" />
      </div>
    ) : (
      <div className="aspect-[9/16] h-full">
        <Placeholder kind="video" src={slide.src} className="h-full w-full" />
      </div>
    );

  return (
    <div className="flex h-full w-full items-center gap-12">
      <div className="min-w-0 flex-1">
        <span className="text-accent text-xs font-semibold tracking-[0.35em] uppercase">
          Punto {String(slide.pointN).padStart(2, "0")}
        </span>
        <h2 className="text-text mt-3 text-5xl leading-tight font-black">{point.title}</h2>
        <p className="text-text-dim mt-5 text-xl leading-relaxed">{point.sub}</p>
      </div>
      <div className="flex h-full w-[44%] shrink-0 items-center justify-center">{media}</div>
    </div>
  );
}

function PstContent({ pst }) {
  if (!pst) return null;
  return (
    <div className="flex h-full w-full flex-col justify-center gap-8">
      <h2 className="text-text text-center text-3xl leading-tight font-bold">{pst.heading}</h2>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        {pst.events.map((ev) => (
          <div key={ev.name} className="flex items-center gap-8">
            <div className="flex h-20 w-64 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 px-4 text-center text-lg font-black text-white uppercase shadow-[0_0_30px_-8px_var(--color-blue-500)]">
              {ev.name}
            </div>
            <div className="flex flex-col gap-2">
              {ev.items.map((it, k) => (
                <div key={k} className="leading-snug">
                  <span className="text-accent text-sm font-bold tracking-wide uppercase">
                    {it.who}
                  </span>
                  <span className="text-text ml-3">{it.what}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
