/**
 * Chrome común a todas las slides cuando estamos en una sección:
 * indicador de grupo, progreso global y pista para volver al hub.
 * El contenido específico de cada slide se inyecta como children.
 */
export default function SlideShell({ slide, currentN, total, onBack, children }) {
  return (
    <div className="relative flex h-full w-full flex-col">
      {/* barra superior */}
      <div className="flex items-center justify-between px-10 pt-7">
        <button
          onClick={onBack}
          className="text-text-dim hover:text-accent text-xs tracking-[0.25em] uppercase transition"
        >
          ← Hub · {slide.groupName}
        </button>
        <span className="text-text-dim tabular text-xs tracking-[0.25em] uppercase">
          {String(currentN).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* contenido de la slide */}
      <div className="relative flex flex-1 items-center justify-center px-10 py-6">
        {children}
      </div>

      {/* barra de progreso */}
      <div className="bg-blue-900 h-1 w-full">
        <div
          className="bg-accent h-full transition-[width] duration-500"
          style={{ width: `${(currentN / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
