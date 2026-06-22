import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Cifra con count-up animado y easing NO lineal.
 * Pensada para los datos grandes (asistentes, monto, etc.).
 *
 * props:
 *   value        número final
 *   duration     seg (def 2)
 *   delay        seg antes de arrancar
 *   decimals     decimales (def 0)
 *   prefix/suffix texto alrededor (ej. "$", "%", " MXN")
 *   separator    separador de miles (def ",")
 *   ease         easing GSAP (def "power2.out")
 */
export default function CountUp({
  value,
  duration = 2,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  ease = "power2.out",
  className = "",
}) {
  const ref = useRef(null);

  const format = (n) => {
    const fixed = Number(n).toFixed(decimals);
    const [int, dec] = fixed.split(".");
    const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return prefix + (dec ? `${withSep}.${dec}` : withSep) + suffix;
  };

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      el.textContent = format(value);
      return;
    }

    const ctx = gsap.context(() => {
      const proxy = { v: 0 };
      el.textContent = format(0);
      gsap.to(proxy, {
        v: value,
        duration,
        delay,
        ease,
        onUpdate: () => {
          el.textContent = format(proxy.v);
        },
      });
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span ref={ref} className={`tabular ${className}`} />;
}
