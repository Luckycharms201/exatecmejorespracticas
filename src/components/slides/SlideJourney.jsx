import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useSlideTimeline } from "../../hooks/useSlideTimeline";
import { useNav } from "../../hooks/navContext";
import SlideHeading from "../ui/SlideHeading";
import Placeholder from "../ui/Placeholder";
import CountUp from "../dataviz/CountUp";

/**
 * Slide · Journey LDG — recorrido INTERACTIVO.
 *
 * Al llegar a la slide, cada avance (flecha →, espacio o clic) pasa por cada
 * punto del journey; ← retrocede (y sale de la slide si estás al inicio).
 *   · puntos con `popup` abren una ventana emergente (1, 2 o 3 sub-slides);
 *   · puntos con `highlight` sólo resaltan el nodo (más grande + glow).
 * Mientras la slide está activa, toma el control de la navegación (navLock).
 */
export default function SlideJourney({ slide }) {
  const points = useMemo(() => slide.points ?? [], [slide.points]);
  const results = slide.results ?? [];
  const nav = useNav();

  // secuencia plana de "paradas". Tras los sub-slides de un popup se inserta
  // una parada con el popup CERRADO (sólo la línea, con el punto resaltado),
  // así al pasar de punto se vuelve a ver el journey antes del siguiente.
  const stops = useMemo(() => {
    const arr = [{ point: -1, sub: null, popup: false }];
    points.forEach((p, i) => {
      if (p.popup) {
        p.popup.slides.forEach((_, j) => arr.push({ point: i, sub: j, popup: true }));
        arr.push({ point: i, sub: null, popup: false }); // popup cerrado
      } else {
        arr.push({ point: i, sub: null, popup: false }); // highlight
      }
    });
    return arr;
  }, [points]);

  const [ci, setCi] = useState(0);
  const cur = stops[ci];
  const activePoint = cur.point;
  const activePopup = cur.popup
    ? { point: points[activePoint], sub: cur.sub, index: activePoint }
    : null;

  const forward = () => setCi((c) => Math.min(c + 1, stops.length - 1));
  const back = () =>
    setCi((c) => {
      if (c <= 0) {
        nav?.prev(); // al inicio, salir a la slide anterior
        return 0;
      }
      return c - 1;
    });

  // tomar el control de la navegación mientras la slide esté montada
  useEffect(() => {
    nav?.setNavLock(true);
    return () => nav?.setNavLock(false);
  }, [nav]);

  // teclado propio (las flechas globales están bloqueadas por navLock)
  useEffect(() => {
    const onKey = (e) => {
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          forward();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          back();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops.length, nav]);

  // animación de entrada de la slide
  const scope = useSlideTimeline((tl) => {
    tl.from(".sh-kicker", { opacity: 0, y: 12, duration: 0.5 })
      .from(".sh-title", { opacity: 0, y: 24, filter: "blur(10px)", duration: 0.7 }, "-=0.2")
      .from(".journey-line", { scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "power3.inOut" }, "-=0.2")
      .from(".journey-node", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(2)" }, "-=0.9")
      .from(".journey-label", { opacity: 0, y: 14, duration: 0.45, stagger: 0.1 }, "-=0.8")
      .from(".journey-result", { opacity: 0, y: 20, duration: 0.5, stagger: 0.12 }, "-=0.3");
  });

  // pop-in del popup al cambiar de parada
  const popupRef = useRef(null);
  useLayoutEffect(() => {
    if (popupRef.current)
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, scale: 0.96, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
  }, [ci]);

  return (
    <div
      ref={scope}
      onClick={forward}
      className="relative flex h-full w-full cursor-pointer flex-col gap-6 py-2"
    >
      <SlideHeading kicker={slide.kicker} title={slide.title} />

      {/* roadmap */}
      <div className="relative flex flex-1 items-center">
        <div className="relative flex w-full items-center justify-between">
          <div className="journey-line bg-blue-500 absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full" />

          {points.map((p, i) => {
            const above = i % 2 === 0;
            const active = i === activePoint;
            return (
              <div key={i} className="relative flex flex-1 flex-col items-center">
                <div
                  className={[
                    "journey-label absolute w-36 text-center transition-all duration-300",
                    above ? "bottom-1/2 mb-10" : "top-1/2 mt-10",
                  ].join(" ")}
                >
                  <p
                    className={[
                      "text-sm font-bold leading-tight transition-colors",
                      active ? "text-accent" : "text-text",
                    ].join(" ")}
                  >
                    {p.title}
                  </p>
                  <p className="text-text-dim mt-1 text-xs leading-snug">{p.sub}</p>
                </div>

                {/* nodo (la escala activa va en el wrapper para no chocar con
                    el transform que deja la animación de entrada en .journey-node) */}
                <div
                  className="relative z-10 transition-transform duration-300"
                  style={{ transform: active ? "scale(1.35)" : "scale(1)" }}
                >
                  <div
                    className="journey-node bg-bg-deep ring-accent text-accent flex h-12 w-12 items-center justify-center rounded-full font-bold ring-2"
                    style={{
                      boxShadow: active ? "0 0 26px 4px var(--color-accent)" : "none",
                    }}
                  >
                    {i + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* resultados */}
      <div className="border-blue-700 grid grid-cols-3 gap-4 border-t pt-5">
        {results.map((r, i) => (
          <div key={i} className="journey-result flex items-baseline gap-3">
            <div className="text-accent text-4xl font-black leading-none">
              <CountUp value={r.participacion} suffix="%" duration={1.6} delay={0.2 + i * 0.12} />
            </div>
            <div className="flex flex-col">
              <span className="text-text text-sm font-semibold">{r.period}</span>
              <span className="text-text-dim text-xs">{r.lideres} líderes electos</span>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {activePopup && (
        <div className="absolute inset-0 z-40 flex items-center justify-center">
          <div className="bg-bg-deep/85 absolute inset-0 backdrop-blur-md" />
          <div
            ref={popupRef}
            className="border-blue-700 bg-blue-900/40 relative z-10 flex h-[82%] w-[86%] flex-col rounded-3xl border p-9 shadow-2xl backdrop-blur-xl"
          >
            <div className="min-h-0 flex-1">
              <PopupSlide point={activePopup.point} index={activePopup.index} sub={activePopup.sub} pst={slide.pst} />
            </div>

            {/* indicador de sub-slides + pista */}
            <div className="mt-5 flex items-center justify-between">
              <div className="flex gap-2">
                {activePopup.point.popup.slides.length > 1 &&
                  activePopup.point.popup.slides.map((_, j) => (
                    <span
                      key={j}
                      className={[
                        "h-1.5 rounded-full transition-all",
                        j === activePopup.sub ? "bg-accent w-6" : "bg-blue-700 w-3",
                      ].join(" ")}
                    />
                  ))}
              </div>
              <span className="text-text-dim text-[10px] tracking-[0.25em] uppercase">
                ← → · clic para avanzar
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- contenido de cada sub-slide del popup ---------- */

function PopupSlide({ point, index, sub, pst }) {
  const sl = point.popup.slides[sub];

  if (sl.media === "pst") return <PstContent pst={pst} />;

  // video horizontal sin texto: llena el popup
  if (!sl.text) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="aspect-video max-h-full w-full">
          <Placeholder kind="video" src={sl.src} className="h-full w-full" />
        </div>
      </div>
    );
  }

  // media del layout con texto (columna de ancho fijo a la derecha)
  const media =
    sl.media === "photo-horizontal" ? (
      <div className="aspect-video w-full">
        <Placeholder kind="image" src={sl.src} className="h-full w-full" />
      </div>
    ) : (
      // video vertical 9:16
      <div className="aspect-[9/16] h-full">
        <Placeholder kind="video" src={sl.src} className="h-full w-full" />
      </div>
    );

  // layout consistente: título + subtítulo grandes a la izquierda, media a la derecha
  return (
    <div className="flex h-full w-full items-center gap-12">
      <div className="min-w-0 flex-1">
        <span className="text-accent text-xs font-semibold tracking-[0.35em] uppercase">
          Punto {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-text mt-3 text-5xl leading-tight font-black">{point.title}</h2>
        <p className="text-text-dim mt-5 text-xl leading-relaxed">{point.sub}</p>
      </div>
      <div className="flex h-full w-[44%] shrink-0 items-center justify-center">
        {media}
      </div>
    </div>
  );
}

/* ---------- slide central del popup de PST (estilo pst.png) ---------- */

function PstContent({ pst }) {
  if (!pst) return null;
  return (
    <div className="flex h-full w-full flex-col justify-center gap-8">
      <h2 className="text-text text-center text-3xl leading-tight font-bold">
        {pst.heading}
      </h2>
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
