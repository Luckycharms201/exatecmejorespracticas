/**
 * Resalta palabras clave dentro de un bloque de texto.
 *
 *  <Highlight>palabra</Highlight>                → resalta inline
 *  <Highlight variant="box">dato</Highlight>     → chip con fondo acento
 *  <HighlightText text="..." words={["a","b"]} /> → auto-resalta en un párrafo
 *
 * La clase `hl` permite que la timeline de la slide anime los resaltados.
 */
export default function Highlight({ children, variant = "text", className = "" }) {
  if (variant === "box") {
    return (
      <span
        className={`hl bg-accent/15 text-accent rounded-md px-1.5 py-0.5 font-semibold ${className}`}
      >
        {children}
      </span>
    );
  }
  return (
    <span className={`hl text-accent font-semibold ${className}`}>
      {children}
    </span>
  );
}

export function HighlightText({ text, words = [], variant = "text", className = "" }) {
  if (!words.length) return <span className={className}>{text}</span>;

  // construye un regex que captura cualquiera de las palabras (case-insensitive)
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        words.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
          <Highlight key={i} variant={variant}>
            {part}
          </Highlight>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
