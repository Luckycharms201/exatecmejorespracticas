import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SEQUENCE, TOTAL_SLIDES } from "../../data/presentation";

/**
 * Eje de presentación lineal — riel-guía para presentar EN VIVO.
 *
 * Es un "eje Y" inclinado en 3D (efecto tempered glass / gradient) sobrepuesto
 * a la izquierda del escenario. Muestra la secuencia completa 1→N como nodos
 * sobre una espina; un playhead avanza conforme cambias de slide y el panel
 * superior (título + foto + área) se actualiza, marcando con un pulso cada
 * cambio de ÁREA (grupo). No compite con el contenido: vive en el margen.
 */

// Un color por área (familia azul→cian) para distinguir grupos en la espina.
const GROUP_COLORS = ["#2d6be0", "#1fb8c4", "#7b8cff"];

// Geometría de la espina (en px del canvas base 1440×810).
const SPINE_TOP = 196;
const SPINE_H = 468;
const yOf = (i) => SPINE_TOP + (SPINE_H * i) / (TOTAL_SLIDES - 1);

export default function PresentationAxis({ currentN, onJump }) {
  const rootRef = useRef(null);
  const prevGroup = useRef(SEQUENCE[currentN - 1]?.groupIndex);

  const current = SEQUENCE[currentN - 1];
  const groupColor = GROUP_COLORS[current?.groupIndex % GROUP_COLORS.length];
  const y = yOf(currentN - 1);

  // Mueve el playhead + el relleno de progreso al cambiar de slide; al cambiar
  // de área, pulsa el encabezado y refresca el título con un crossfade suave.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".axis-playhead", { top: y, duration: 0.6, ease: "power3.out" });
      gsap.to(".axis-fill", {
        height: y - SPINE_TOP,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".axis-head",
        { opacity: 0, y: 10, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }
      );

      const changedArea = prevGroup.current !== current?.groupIndex;
      if (changedArea) {
        gsap.fromTo(
          ".axis-panel",
          { boxShadow: `0 0 0px 0px ${groupColor}00` },
          {
            boxShadow: `0 0 46px -6px ${groupColor}cc`,
            duration: 0.45,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          }
        );
        gsap.fromTo(
          ".axis-area-tag",
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }
        );
      }
      prevGroup.current = current?.groupIndex;
    }, rootRef);
    return () => ctx.revert();
  }, [currentN, y, groupColor, current?.groupIndex]);

  return (
    // perspectiva en el contenedor; el plano interior se inclina en 3D.
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[420px]"
      style={{ perspective: "1500px" }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: "rotateX(7deg) rotateY(23deg) rotateZ(-3deg)",
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
        }}
      >
        {/* placa de cristal (tempered glass + gradient) */}
        <div
          className="axis-panel absolute left-8 top-24 h-[600px] w-[300px] rounded-[28px] border"
          style={{
            background:
              "linear-gradient(155deg, rgba(45,107,224,0.16) 0%, rgba(12,26,58,0.55) 48%, rgba(6,11,28,0.32) 100%)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderColor: "rgba(234,240,255,0.14)",
            boxShadow:
              "0 30px 80px -30px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.16)",
          }}
        >
          {/* brillo diagonal del vidrio */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px] opacity-60"
            style={{
              background:
                "linear-gradient(125deg, rgba(255,255,255,0.20) 0%, transparent 32%)",
            }}
          />
        </div>

        {/* encabezado: foto + título + área del slide actual */}
        <div className="axis-head absolute left-14 top-[136px] w-[252px]">
          <div className="flex items-center gap-4">
            {/* foto circular (placeholder hasta tener activos) */}
            <div
              className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border"
              style={{
                borderColor: groupColor,
                background: `radial-gradient(circle at 35% 30%, ${groupColor}55, rgba(6,11,28,0.9))`,
                boxShadow: `0 0 28px -6px ${groupColor}`,
              }}
            >
              <span className="text-text tabular text-lg font-black">
                {String(currentN).padStart(2, "0")}
              </span>
            </div>
            <div className="min-w-0">
              <span
                className="axis-area-tag inline-block rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-[0.25em] uppercase"
                style={{ background: `${groupColor}26`, color: groupColor }}
              >
                {current?.groupName}
              </span>
              <h3 className="text-text mt-1.5 text-base leading-tight font-bold">
                {current?.title}
              </h3>
            </div>
          </div>
        </div>

        {/* espina + nodos */}
        <div className="absolute inset-0">
          {/* riel base */}
          <div
            className="absolute w-[3px] rounded-full"
            style={{
              left: 50,
              top: SPINE_TOP,
              height: SPINE_H,
              background: "rgba(138,155,196,0.25)",
            }}
          />
          {/* relleno de progreso */}
          <div
            className="axis-fill absolute w-[3px] rounded-full"
            style={{
              left: 50,
              top: SPINE_TOP,
              height: 0,
              background: "linear-gradient(180deg, #46e5ff, #2d6be0)",
              boxShadow: "0 0 16px -2px #46e5ff",
            }}
          />

          {/* nodos por slide */}
          {SEQUENCE.map((s, i) => {
            const active = i === currentN - 1;
            const done = i < currentN - 1;
            const c = GROUP_COLORS[s.groupIndex % GROUP_COLORS.length];
            const firstOfGroup =
              i === 0 || SEQUENCE[i - 1].groupIndex !== s.groupIndex;
            return (
              <div key={s.id}>
                {/* etiqueta de área en el primer nodo del grupo */}
                {firstOfGroup && (
                  <span
                    className="absolute text-[8px] font-semibold tracking-[0.2em] uppercase"
                    style={{
                      left: 70,
                      top: yOf(i) - 6,
                      color: c,
                      opacity: 0.85,
                    }}
                  >
                    {s.groupName}
                  </span>
                )}
                <button
                  onClick={() => onJump?.(i + 1)}
                  className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-200 hover:scale-150"
                  style={{
                    left: 51,
                    top: yOf(i),
                    width: active ? 16 : 10,
                    height: active ? 16 : 10,
                    background: active ? "#46e5ff" : done ? c : "rgba(138,155,196,0.35)",
                    boxShadow: active ? "0 0 20px 2px #46e5ff" : "none",
                    border: active ? "2px solid #eaf0ff" : "none",
                  }}
                  aria-label={`Ir a ${s.title}`}
                />
              </div>
            );
          })}

          {/* playhead luminoso que avanza */}
          <div
            className="axis-playhead pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: 51, top: yOf(currentN - 1) }}
          >
            <div
              className="h-7 w-7 animate-pulse rounded-full"
              style={{
                background: "radial-gradient(circle, #46e5ff66, transparent 70%)",
              }}
            />
          </div>
        </div>

        {/* dirección diagonal del avance + leyenda */}
        <div
          className="absolute left-12 flex items-center gap-2"
          style={{ top: SPINE_TOP + SPINE_H + 34 }}
        >
          <svg width="78" height="26" viewBox="0 0 78 26" fill="none">
            <path
              d="M2 6 L62 20"
              stroke="#8a9bc4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M52 12 L66 21 L50 24"
              stroke="#8a9bc4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="text-text-dim text-[9px] leading-tight tracking-[0.15em] uppercase">
            Avanza al
            <br />
            cambiar de área
          </span>
        </div>
      </div>
    </div>
  );
}
