import { useEffect, useRef } from "react";
import { useSlideTimeline } from "../../hooks/useSlideTimeline";

/**
 * Slide de testimonios: 3 videos verticales (9:16) en simultáneo, de izquierda
 * a derecha (1 → 3). El de en medio (índice 1) lleva sonido y NO se loopea;
 * los laterales corren muteados en loop como ambiente. Se dimensionan por
 * altura para no desbordar el canvas; el central se resalta con un anillo.
 *
 * Cada video se remonta por slide (key=slide.id en el Stage), así que arranca
 * desde el inicio cada vez que se entra. El autoplay con sonido del central
 * depende del gesto previo del usuario al navegar; si el navegador lo bloquea,
 * quedan los controles para reproducir.
 */
export default function SlideVideoTrio({ slide }) {
  const videos = slide.videos ?? [];
  const refs = useRef([]);

  const scope = useSlideTimeline((tl) => {
    tl.from(".trio-kicker", { opacity: 0, y: 14, duration: 0.6 }).from(
      ".trio-item",
      {
        opacity: 0,
        scale: 0.9,
        filter: "blur(12px)",
        duration: 0.7,
        stagger: 0.12,
      },
      "-=0.2"
    );
  });

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      el.muted = !!videos[i]?.muted;
      const p = el.play();
      if (p && p.catch) p.catch(() => {});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={scope}
      className="flex h-full w-full flex-col items-center justify-center gap-6"
    >
      <p className="trio-kicker text-accent text-xs font-semibold tracking-[0.4em] uppercase">
        {slide.title}
      </p>

      <div className="flex min-h-0 w-full flex-1 items-center justify-center gap-8">
        {videos.map((v, i) => {
          const isCenter = i === 1;
          return (
            <div
              key={v.src}
              style={{ height: 540, width: 304 }}
              className={[
                "trio-item relative shrink-0 overflow-hidden rounded-2xl border bg-black shadow-2xl",
                isCenter
                  ? "border-accent ring-accent/40 ring-2"
                  : "border-blue-700",
              ].join(" ")}
            >
              <video
                ref={(el) => (refs.current[i] = el)}
                src={v.src}
                autoPlay
                playsInline
                preload="auto"
                loop={!!v.loop}
                muted={!!v.muted}
                controls={isCenter}
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
