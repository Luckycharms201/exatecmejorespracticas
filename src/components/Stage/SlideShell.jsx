import PresentationAxis from "./PresentationAxis";

/**
 * Chrome común a todas las slides cuando estamos en una sección:
 * indicador de grupo, progreso global y pista para volver al hub.
 * El contenido específico de cada slide se inyecta como children.
 *
 * En modo `linear` (presentación en vivo) se sobrepone el eje diagonal de
 * cristal como guía y el contenido se recorre un poco a la derecha para
 * dejarle aire.
 */
export default function SlideShell({
  slide,
  currentN,
  total,
  linear,
  onBack,
  onJump,
  children,
}) {
  return (
    <div className="relative flex h-full w-full flex-col">
      {/* eje diagonal de cristal (solo en modo lineal) */}
      {linear && <PresentationAxis currentN={currentN} onJump={onJump} />}

      {/* barra superior */}
      <div className="relative z-40 flex items-center justify-between px-10 pt-7">
        <button
          onClick={onBack}
          className="text-text-dim hover:text-accent text-xs tracking-[0.25em] uppercase transition"
        >
          {linear ? "Esc · Salir del modo lineal" : `← Hub · ${slide.groupName}`}
        </button>
        <span className="text-text-dim tabular text-xs tracking-[0.25em] uppercase">
          {String(currentN).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* contenido de la slide */}
      <div
        className={[
          "relative flex flex-1 items-center justify-center py-6",
          linear ? "pr-10 pl-[26rem]" : "px-10",
        ].join(" ")}
      >
        {children}
      </div>

      {/* barra de progreso */}
      <div className="bg-blue-900 relative z-40 h-1 w-full">
        <div
          className="bg-accent h-full transition-[width] duration-500"
          style={{ width: `${(currentN / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
