import { LIVE_SEQUENCE } from "../../data/presentation";

/**
 * Barra de progreso del modo Live: un segmento por slide. Los segmentos ya
 * vistos quedan llenos, el actual se resalta con acento y los pendientes
 * quedan tenues. Un pequeño espacio separa cada cambio de área.
 */
export default function LiveProgressBar({ liveN }) {
  return (
    <div className="flex w-full items-center gap-1.5">
      {LIVE_SEQUENCE.map((s, i) => {
        const n = i + 1;
        const done = n < liveN;
        const active = n === liveN;
        // separa visualmente al cambiar de área
        const newArea = i > 0 && LIVE_SEQUENCE[i - 1].groupIndex !== s.groupIndex;
        return (
          <div
            key={s.id}
            className="h-1.5 flex-1 overflow-hidden rounded-full"
            style={{
              marginLeft: newArea ? 10 : 0,
              background: "rgba(138,155,196,0.22)",
            }}
            title={s.title}
          >
            <div
              className="h-full rounded-full transition-[width,opacity] duration-500"
              style={{
                width: done || active ? "100%" : "0%",
                background: active
                  ? "var(--color-accent)"
                  : "var(--color-blue-500)",
                boxShadow: active ? "0 0 14px -1px var(--color-accent)" : "none",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
