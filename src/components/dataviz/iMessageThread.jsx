import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Hilo estilo iMessage para mostrar comentarios reales (NPS).
 * Burbujas: "them" (recibido, gris-azul, izquierda) y
 * "me" (enviado, azul, derecha). Entran con stagger tipo pop.
 *
 * props.messages: [{ from: "them" | "me", text, time }]
 */
export default function IMessageThread({ messages = [], delay = 0, className = "" }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;
      gsap.from(".imsg", {
        opacity: 0,
        y: 18,
        scale: 0.9,
        transformOrigin: "bottom center",
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.22,
        delay,
      });
    }, ref);
    return () => ctx.revert();
  }, [messages, delay]);

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-2.5 ${className}`}
    >
      {messages.map((m, i) => {
        const mine = m.from === "me";
        return (
          <div
            key={i}
            className={`flex ${mine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={[
                "imsg max-w-[78%] rounded-2xl px-4 py-2.5 text-[15px] leading-snug",
                mine
                  ? "bg-blue-500 text-white rounded-br-md"
                  : "bg-blue-900 text-text border border-blue-700 rounded-bl-md",
              ].join(" ")}
            >
              {m.text}
              {m.time && (
                <span
                  className={[
                    "mt-1 block text-[10px]",
                    mine ? "text-white/60" : "text-text-dim",
                  ].join(" ")}
                >
                  {m.time}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
