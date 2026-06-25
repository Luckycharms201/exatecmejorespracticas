import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import SlideHeading from "../ui/SlideHeading";

/**
 * Slide-embed: muestra una página web dentro de un mockup de teléfono (formato
 * móvil vertical) vía iframe, para demostrar la experiencia del usuario sin
 * salir de la presentación. A la izquierda, una nota breve.
 * Pseudo-popup: se inserta como slide lineal (como los del journey).
 */
export default function SlideEmbed({ slide }) {
  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".sh-title", { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 }, "-=0.2")
      .from(".emb-note", { opacity: 0, x: -24, duration: 0.6, stagger: 0.12 }, "-=0.2")
      .from(".emb-phone", { opacity: 0, y: 40, scale: 0.92, duration: 0.8, ease: "power3.out" }, "-=0.4");
  });

  return (
    <div ref={scope} className="flex h-full w-full flex-col gap-4 py-2">
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      <div className="flex min-h-0 flex-1 items-center justify-center gap-16">
        {/* nota */}
        <div className="max-w-md">
          {slide.lead && (
            <p className="emb-note text-text text-2xl font-semibold leading-snug">
              {slide.lead}
            </p>
          )}
          {slide.body && (
            <p className="emb-note text-text-dim mt-4 text-lg leading-relaxed">
              {slide.body}
            </p>
          )}
          {slide.qr ? (
            <div className="emb-note mt-7 flex items-center gap-5">
              <img
                src={slide.qr}
                alt="Código QR a la página del evento"
                className="h-36 w-36 shrink-0"
              />
              <div className="flex flex-col items-start gap-3">
                <p className="text-text text-lg font-bold tracking-wide">
                  Escanéame
                </p>
                {slide.urlLabel && (
                  <span className="border-blue-700 text-accent inline-block rounded-full border px-5 py-2 text-sm tracking-wide">
                    {slide.urlLabel}
                  </span>
                )}
              </div>
            </div>
          ) : (
            slide.urlLabel && (
              <span className="emb-note border-blue-700 text-accent mt-6 inline-block rounded-full border px-5 py-2 text-sm tracking-wide">
                {slide.urlLabel}
              </span>
            )
          )}
        </div>

        {/* mockup de teléfono con la página embebida. El iframe se renderiza a
            ancho móvil real (380px) y el teléfono completo se escala con CSS
            para caber en la slide; el contenedor exterior toma el tamaño ya
            escalado para no desbordar el layout. */}
        <PhoneFrame url={slide.url} title={slide.title} />
      </div>
    </div>
  );
}

function PhoneFrame({ url, title }) {
  const W = 380;
  const H = 800;
  const SCALE = 0.66;
  return (
    <div
      className="emb-phone shrink-0"
      style={{ width: W * SCALE, height: H * SCALE }}
    >
      <div
        className="relative rounded-[3rem] border-[14px] border-black bg-black shadow-2xl"
        style={{ width: W, height: H, transform: `scale(${SCALE})`, transformOrigin: "top left" }}
      >
        {/* notch */}
        <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-black" />
        <iframe
          src={url}
          title={title}
          className="h-full w-full rounded-[1.7rem] bg-white"
          loading="eager"
        />
      </div>
    </div>
  );
}
