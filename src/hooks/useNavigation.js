import { useCallback, useEffect, useState } from "react";
import {
  GROUPS,
  SEQUENCE,
  TOTAL_SLIDES,
  LIVE_SEQUENCE,
  LIVE_TOTAL,
  firstSlideOfGroup,
} from "../data/presentation";

/**
 * Estado central de navegación.
 *
 *  view === "hub"      → constelación de grupos; `focusedGroupIndex` marca
 *                        el nodo resaltado para navegación con teclado.
 *  view === "section"  → entras por un grupo; `currentN` es el nº global (1..N).
 *  view === "live"     → PRESENTACIÓN EN VIVO: recorrido lineal sin hub que
 *                        arranca en una portada de título; `liveN` (1..LIVE_TOTAL).
 *
 * Teclado:
 *   Hub      ← →  mueven el foco · Enter entra al grupo
 *   Sección  ← →  recorren 1..N · Esc vuelve al hub
 *   Live     ← →  recorren la presentación · Esc sale
 *   En todo momento: F alterna pantalla completa.
 */
export function useNavigation() {
  const [view, setView] = useState("hub");
  const [currentN, setCurrentN] = useState(1);
  const [liveN, setLiveN] = useState(1);
  const [focusedGroupIndex, setFocusedGroupIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(
    () => !!document.fullscreenElement
  );

  const current =
    view === "live"
      ? LIVE_SEQUENCE[liveN - 1] ?? null
      : SEQUENCE[currentN - 1] ?? null;

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

  // arranca la presentación en vivo desde la portada de título.
  const startLive = useCallback(() => {
    setLiveN(1);
    setView("live");
  }, []);

  const exitLive = useCallback(() => {
    setView("hub");
  }, []);

  const next = useCallback(() => {
    if (view === "live") {
      setLiveN((n) => Math.min(n + 1, LIVE_TOTAL));
    } else {
      setCurrentN((n) => Math.min(n + 1, TOTAL_SLIDES));
    }
  }, [view]);

  const prev = useCallback(() => {
    if (view === "live") {
      setLiveN((n) => Math.max(n - 1, 1));
    } else {
      setCurrentN((n) => Math.max(n - 1, 1));
    }
  }, [view]);

  const focusNextGroup = useCallback(() => {
    setFocusedGroupIndex((i) => (i + 1) % GROUPS.length);
  }, []);

  const focusPrevGroup = useCallback(() => {
    setFocusedGroupIndex((i) => (i - 1 + GROUPS.length) % GROUPS.length);
  }, []);

  // pantalla completa (tecla F) — útil sobre todo al presentar en vivo.
  const toggleFullscreen = useCallback(() => {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      // F → pantalla completa, en cualquier vista
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

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

      // view === "section" | "live": recorrido lineal con flechas
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
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
          if (view === "live") exitLive();
          else goToHub();
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
    exitLive,
    enterFocusedGroup,
    focusNextGroup,
    focusPrevGroup,
    toggleFullscreen,
  ]);

  return {
    view,
    current,
    currentN,
    liveN,
    total: TOTAL_SLIDES,
    liveTotal: LIVE_TOTAL,
    isFullscreen,
    focusedGroupIndex,
    enterGroup,
    goToHub,
    startLive,
    exitLive,
    next,
    prev,
    toggleFullscreen,
    setFocusedGroupIndex,
  };
}
