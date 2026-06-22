/**
 * Placeholder de medio numerado — marca dónde irá una foto o video.
 * El número (#n) permite referirlo después ("la foto #2 va aquí").
 * `kind`: "image" | "video".
 */
export default function Placeholder({ n, kind = "image", note, className = "" }) {
  const isVideo = kind === "video";
  return (
    <div
      className={[
        "group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed",
        "border-blue-700 bg-blue-900/40 text-text-dim",
        className,
      ].join(" ")}
    >
      {/* retícula sutil de fondo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-blue-700) 1px, transparent 1px), linear-gradient(90deg, var(--color-blue-700) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <span
          className={[
            "flex items-center justify-center rounded-full",
            isVideo
              ? "bg-accent/15 ring-accent/50 h-14 w-14 ring-1"
              : "bg-blue-500/15 ring-blue-500/40 h-11 w-11 ring-1",
          ].join(" ")}
        >
          <span className={isVideo ? "text-accent text-xl" : "text-blue-500 text-lg"}>
            {isVideo ? "▶" : "▦"}
          </span>
        </span>
        {n != null && (
          <span className="text-accent text-xs font-bold tracking-widest">
            #{n}
          </span>
        )}
        {note && <span className="max-w-[18ch] text-xs leading-tight">{note}</span>}
      </div>
    </div>
  );
}
