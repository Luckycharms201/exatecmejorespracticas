import Placeholder from "../ui/Placeholder";

/**
 * Slide-popup del Journey LDG. Tarjeta CONTENIDA (no a pantalla completa) que
 * se abre con animación, vendiendo que es un popup sobre la línea. Layout
 * consistente: título + subtítulo grandes a la izquierda y media a la derecha;
 * o media centrada (video horizontal); o el slide de PST (estilo pst.png).
 * El media se dimensiona por ALTURA para no desbordar la página.
 */
export default function SlideJourneyPopup({ slide }) {
  return (
    <div className="flex h-full w-full items-center justify-center py-2">
      <div className="jp-pop border-blue-700 bg-blue-900/40 flex h-[88%] w-[88%] flex-col rounded-3xl border p-8 shadow-2xl">
        <div className="min-h-0 flex-1">
          <PopupBody slide={slide} />
        </div>
      </div>
    </div>
  );
}

function PopupBody({ slide }) {
  if (slide.media === "pst") return <PstContent pst={slide.pst} />;

  // video horizontal sin texto: centrado, dimensionado por altura (no desborda)
  if (!slide.text) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="aspect-video h-full max-w-full">
          <Placeholder
            kind="video"
            src={slide.src}
            className="h-full w-full"
            fullscreen
          />
        </div>
      </div>
    );
  }

  const point = slide.point ?? {};
  const isPhoto = slide.media === "photo-horizontal";
  const media = isPhoto ? (
    <div className="aspect-video w-full">
      <Placeholder kind="image" src={slide.src} className="h-full w-full" />
    </div>
  ) : (
    // video vertical 9:16, dimensionado por altura
    <div className="aspect-[9/16] h-full">
      <Placeholder kind="video" src={slide.src} className="h-full w-full" />
    </div>
  );

  return (
    <div className="flex h-full w-full items-center justify-center gap-14">
      <div className="min-w-0 max-w-xl">
        <span className="text-accent text-xs font-semibold tracking-[0.35em] uppercase">
          Punto {String(slide.pointN).padStart(2, "0")}
        </span>
        <h2 className="text-text mt-3 text-5xl leading-tight font-black">{point.title}</h2>
        <p className="text-text-dim mt-4 text-lg leading-relaxed">{point.sub}</p>

        {slide.agenda && (
          <ul className="mt-5 flex flex-col gap-1.5">
            {slide.agenda.map((a, i) => (
              <li key={i} className="flex items-baseline gap-3 text-sm leading-snug">
                <span className="text-accent tabular w-12 shrink-0 text-right font-semibold">
                  {a.time}
                </span>
                <span className="text-text">
                  {a.item}
                  {a.by && <span className="text-text-dim"> · por {a.by}</span>}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div
        className={[
          "flex h-full shrink-0 items-center justify-center",
          isPhoto ? "w-[52%]" : "w-[32%]",
        ].join(" ")}
      >
        {media}
      </div>
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
            <div className="flex h-28 w-72 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 px-4 text-center shadow-[0_0_30px_-8px_var(--color-blue-500)]">
              {ev.logo ? (
                <EventLogo logo={ev.logo} />
              ) : (
                <span className="text-lg font-black uppercase text-white">{ev.name}</span>
              )}
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

/**
 * Logo de evento PST recreado con tipografía: palabra(s) principal(es) en sans
 * condensada pesada (Anton) y un conector en script (Pacifico) acento,
 * superpuesto entre líneas — al estilo de los logos oficiales.
 */
function EventLogo({ logo }) {
  const ANTON = { fontFamily: "Anton, system-ui, sans-serif" };
  return (
    <div className="flex flex-col items-center leading-[0.9] text-white">
      <span style={ANTON} className="text-3xl tracking-wide">
        {logo.top}
      </span>
      {logo.script && (
        <span
          style={{
            fontFamily: "Pacifico, cursive",
            transform: "translateX(-30px) rotate(-6deg)",
          }}
          className="text-accent my-0.5 text-xl leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
        >
          {logo.script}
        </span>
      )}
      {logo.bottom && (
        <span style={ANTON} className="text-3xl tracking-wide">
          {logo.bottom}
        </span>
      )}
    </div>
  );
}
