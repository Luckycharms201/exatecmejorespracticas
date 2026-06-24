import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import Placeholder from "../ui/Placeholder";

/**
 * Slide de video. Marco 16:9. Si el placeholder ya trae `src`, reproduce el
 * video real (autoplay al entrar, vía Placeholder); si no, muestra el marcador
 * animado (botón de play latiendo) para señalar dónde irá el reproductor.
 * Entrada: kicker + marco con scale/blur-in.
 */
export default function SlideVideo({ slide }) {
  const ph = slide.placeholders?.[0];
  const hasVideo = Boolean(ph?.src);

  const scope = useSlideTimeline((tl) => {
    tl.from(".video-kicker", { opacity: 0, y: 14, duration: 0.6 }).from(
      ".video-frame",
      { opacity: 0, scale: 0.92, filter: "blur(14px)", duration: 0.9 },
      "-=0.3"
    );
    if (!hasVideo) {
      tl.to(".video-pulse", {
        scale: 1.12,
        opacity: 0.55,
        duration: 1.1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  });

  return (
    <div
      ref={scope}
      className="flex h-full w-full flex-col items-center justify-center gap-6"
    >
      <p className="video-kicker text-accent text-xs font-semibold tracking-[0.4em] uppercase">
        {slide.title}
      </p>

      {hasVideo ? (
        <div className="video-frame aspect-video w-full max-w-4xl">
          <Placeholder
            kind="video"
            src={ph.src}
            note={ph.note}
            className="h-full w-full"
            fullscreen
          />
        </div>
      ) : (
        <div className="video-frame relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-blue-700 bg-blue-900/50">
          {/* retícula sutil */}
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-blue-700) 1px, transparent 1px), linear-gradient(90deg, var(--color-blue-700) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* botón de play */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <span className="video-pulse bg-accent/20 ring-accent/50 absolute inset-0 rounded-full ring-1" />
              <span className="bg-accent text-bg-deep relative flex h-16 w-16 items-center justify-center rounded-full pl-1 text-2xl">
                ▶
              </span>
            </div>
            {ph && (
              <span className="text-text-dim text-xs tracking-widest">
                VIDEO #{ph.n} · {ph.note}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
