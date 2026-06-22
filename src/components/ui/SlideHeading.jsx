/**
 * Encabezado consistente para las slides de contenido (no portadas).
 * Alineado a la izquierda, estilo editorial/broadcast.
 * Clases `.sh-kicker` y `.sh-title` para que la timeline de la slide
 * las anime.
 */
export default function SlideHeading({ kicker, title, className = "" }) {
  return (
    <div className={className}>
      {kicker && (
        <p className="sh-kicker text-accent text-xs font-semibold tracking-[0.4em] uppercase">
          {kicker}
        </p>
      )}
      <h2 className="sh-title text-text mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
