import { useCallback, useEffect, useState } from "react";
import {
  GROUPS,
  SEQUENCE,
  TOTAL_SLIDES,
  firstSlideOfGroup,
} from "../data/presentation";

/**
 * Estado central de navegación hub-and-spoke.
 *
 *  view === "hub"      → constelación de grupos; `focusedGroupIndex` marca
 *                        el nodo resaltado para navegación con teclado.
 *  view === "section"  → recorrido lineal; `currentN` es el nº global (1..N).
 *
 * Teclado:
 *   Hub      ← →  mueven el foco entre grupos · Enter entra al grupo
 *   Sección  ← →  avanzan/retroceden la secuencia global · Esc vuelve al hub
 */
export function useNavigation() {
  const [view, setView] = useState("hub");
  const [currentN, setCurrentN] = useState(1);
  const [focusedGroupIndex, setFocusedGroupIndex] = useState(0);

  const current = SEQUENCE[currentN - 1] ?? null;

  const enterGroup = useCallback((groupId) => {
    const first = firstSlideOfGroup(groupId);
    if (!first) return;
    setCurrentN(first.n);
    setView("section");
  }, []);

  const enterFocusedGroup = useCallback(() => {
    const group = GROUPS[focusedGroupIndex];
    if (group) enterGroup(group.id);
  }, [focusedGroupIndex, enterGroup]);

  const goToHub = useCallback(() => {
    // al volver, deja el foco sobre el grupo que estábamos viendo
    const cur = SEQUENCE[currentN - 1];
    if (cur) setFocusedGroupIndex(cur.groupIndex);
    setView("hub");
  }, [currentN]);

  const next = useCallback(() => {
    setCurrentN((n) => Math.min(n + 1, TOTAL_SLIDES));
  }, []);

  const prev = useCallback(() => {
    setCurrentN((n) => Math.max(n - 1, 1));
  }, []);

  const focusNextGroup = useCallback(() => {
    setFocusedGroupIndex((i) => (i + 1) % GROUPS.length);
  }, []);

  const focusPrevGroup = useCallback(() => {
    setFocusedGroupIndex((i) => (i - 1 + GROUPS.length) % GROUPS.length);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (view === "hub") {
        switch (e.key) {
          case "ArrowRight":
          case "ArrowDown":
            e.preventDefault();
            focusNextGroup();
            break;
          case "ArrowLeft":
          case "ArrowUp":
            e.preventDefault();
            focusPrevGroup();
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            enterFocusedGroup();
            break;
          default:
            break;
        }
        return;
      }
      // view === "section"
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Escape":
          e.preventDefault();
          goToHub();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    view,
    next,
    prev,
    goToHub,
    enterFocusedGroup,
    focusNextGroup,
    focusPrevGroup,
  ]);

  return {
    view,
    current,
    currentN,
    total: TOTAL_SLIDES,
    focusedGroupIndex,
    enterGroup,
    goToHub,
    next,
    prev,
    setFocusedGroupIndex,
  };
}
