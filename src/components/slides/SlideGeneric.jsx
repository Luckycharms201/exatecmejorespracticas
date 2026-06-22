/**
 * Renderizador genérico provisional (Checkpoint 1).
 * Muestra título, tipo y placeholders para validar la navegación.
 * En los checkpoints siguientes cada `type` tendrá su propio componente
 * con su timeline GSAP.
 */
export default function SlideGeneric({ slide }) {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-6 text-center">
      <span className="text-accent text-xs tracking-[0.35em] uppercase">
        {slide.type}
      </span>
      <h2 className="text-text text-4xl font-extrabold tracking-tight">
        {slide.title}
      </h2>

      {slide.kicker && <p className="text-text-dim">{slide.kicker}</p>}

      {slide.sections?.length > 0 && (
        <ul className="text-text-dim flex flex-wrap justify-center gap-3 text-sm">
          {slide.sections.map((s) => (
            <li
              key={s.heading}
              className="border-blue-700 rounded-full border px-4 py-1"
            >
              {s.heading}
            </li>
          ))}
        </ul>
      )}

      {slide.placeholders?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {slide.placeholders.map((p) => (
            <div
              key={p.n}
              className="border-blue-700 text-text-dim flex h-28 w-44 flex-col items-center justify-center rounded-lg border border-dashed text-xs"
            >
              <span className="text-accent font-bold">
                {p.kind === "video" ? "▶" : "▦"} #{p.n}
              </span>
              <span className="mt-1 px-2 text-center">{p.note}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
