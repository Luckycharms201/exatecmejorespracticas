import { SLIDE_COMPONENTS, SlideGeneric } from "../slides/slideRegistry";
import LiveProgressBar from "./LiveProgressBar";

/**
 * Escenario del MODO LIVE (presentar en vivo).
 *
 * Recorrido lineal 1→N sin volver al hub. Chrome propio y minimal:
 * barra de progreso segmentada (avance por slide), contador y pista de
 * teclado. La portada de arranque (`liveIntro`) es la primera slide.
 */
export default function LiveStage({ slide, liveN, total, isFullscreen, onExit }) {
  if (!slide) return null;
  const SlideComponent = SLIDE_COMPONENTS[slide.type] ?? SlideGeneric;
  const isIntro = slide.type === "liveIntro";

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* barra superior: salir + área + contador */}
      <div className="flex items-center justify-between px-10 pt-7">
        <button
          onClick={onExit}
          className="text-text-dim hover:text-accent text-xs tracking-[0.25em] uppercase transition"
        >
          Esc · Salir
        </button>
        <span className="text-text-dim text-xs tracking-[0.25em] uppercase">
          {isIntro ? "En vivo" : slide.groupName}
        </span>
        <span className="text-text-dim tabular text-xs tracking-[0.25em] uppercase">
          {String(liveN).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* contenido de la slide */}
      <div className="relative flex flex-1 items-center justify-center px-10 py-6">
        <SlideComponent key={slide.id} slide={slide} />
      </div>

      {/* barra de progreso segmentada + pista de teclado */}
      <div className="flex flex-col gap-2.5 px-10 pb-6">
        <LiveProgressBar liveN={liveN} />
        <p className="text-text-dim text-center text-[10px] tracking-[0.25em] uppercase">
          ← → NAVEGAR · F {isFullscreen ? "SALIR DE" : ""} PANTALLA COMPLETA · ESC SALIR
        </p>
      </div>
    </div>
  );
}
