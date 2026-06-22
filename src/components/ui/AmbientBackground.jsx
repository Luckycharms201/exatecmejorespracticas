/**
 * Fondo ambiental: degradados radiales sutiles que dan profundidad
 * y acabado broadcast, sin competir con el contenido.
 */
export default function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -left-1/4 -top-1/4 h-[80%] w-[60%] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-blue-700) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-1/3 right-0 h-[70%] w-[55%] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-blue-500) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
