import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigation } from "./hooks/useNavigation";
import { GROUPS, SEQUENCE, LIVE_SEQUENCE } from "./data/presentation";
import { nodePosition } from "./components/Hub/hubLayout";
import Hub from "./components/Hub/Hub";
import Stage from "./components/Stage/Stage";
import LiveStage from "./components/Stage/LiveStage";
import FitStage from "./components/Stage/FitStage";
import AmbientBackground from "./components/ui/AmbientBackground";
import DataLab from "./components/dev/DataLab";

export default function App() {
  // ruta temporal de desarrollo: #lab muestra el laboratorio de primitivas
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const nav = useNavigation();
  const hubRef = useRef(null);
  const stageRef = useRef(null);
  const liveRef = useRef(null);
  const prevView = useRef(nav.view);

  // mantén el grupo actual accesible dentro del efecto de transición
  const groupIndex = nav.current?.groupIndex ?? nav.focusedGroupIndex;

  // cada capa renderiza su propia slide de forma estable, así no parpadea
  // contenido equivocado durante los fundidos entre vistas.
  const sectionSlide = SEQUENCE[nav.currentN - 1] ?? null;
  const liveSlide = LIVE_SEQUENCE[nav.liveN - 1] ?? null;

  useLayoutEffect(() => {
    const hub = hubRef.current;
    const stage = stageRef.current;
    const live = liveRef.current;
    if (!hub || !stage || !live) return;

    const angle = GROUPS[groupIndex]?.hub.angle ?? -90;
    const { x, y } = nodePosition(angle);
    const origin = `${x}% ${y}%`;

    // primer render: fija el estado inicial de cada capa sin animar
    if (prevView.current === nav.view) {
      gsap.set(hub, {
        autoAlpha: nav.view === "hub" ? 1 : 0,
        scale: nav.view === "section" ? 2.8 : 1,
      });
      gsap.set(stage, {
        autoAlpha: nav.view === "section" ? 1 : 0,
        scale: nav.view === "section" ? 1 : 1.08,
      });
      gsap.set(live, { autoAlpha: nav.view === "live" ? 1 : 0, scale: 1 });
      return;
    }

    const to = nav.view;
    const from = prevView.current;

    if (to === "live") {
      // ENTRADA AL MODO LIVE: fundido + leve acercamiento
      gsap.to([hub, stage], { autoAlpha: 0, duration: 0.4, ease: "power2.in" });
      gsap.fromTo(
        live,
        { autoAlpha: 0, scale: 1.05 },
        { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power3.out" }
      );
    } else if (from === "live") {
      // SALIDA DEL MODO LIVE
      gsap.to(live, { autoAlpha: 0, duration: 0.35, ease: "power2.in" });
      const target = to === "section" ? stage : hub;
      gsap.fromTo(
        target,
        { autoAlpha: 0, scale: 1.05 },
        { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }
      );
    } else if (to === "section") {
      // HUB → SECCIÓN: la cámara hace zoom hacia el nodo del grupo
      gsap.set(hub, { transformOrigin: origin });
      const tl = gsap.timeline();
      tl.to(hub, { scale: 2.8, autoAlpha: 0, duration: 0.85, ease: "power3.in" })
        .fromTo(
          stage,
          { autoAlpha: 0, scale: 1.08 },
          { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power3.out" },
          "-=0.45"
        );
    } else {
      // SECCIÓN → HUB: zoom de vuelta saliendo del mismo nodo
      gsap.set(hub, { transformOrigin: origin });
      const tl = gsap.timeline();
      tl.to(stage, { autoAlpha: 0, scale: 1.08, duration: 0.5, ease: "power2.in" })
        .fromTo(
          hub,
          { autoAlpha: 0, scale: 2.8 },
          { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.25"
        );
    }

    prevView.current = nav.view;
  }, [nav.view, groupIndex]);

  if (hash === "#lab") {
    return (
      <main className="bg-bg-deep h-full w-full">
        <DataLab />
      </main>
    );
  }

  return (
    <FitStage>
      <main className="bg-bg-deep absolute inset-0 overflow-hidden">
        <AmbientBackground />

        {/* capa HUB */}
        <div
          ref={hubRef}
          className="absolute inset-0"
          style={{ pointerEvents: nav.view === "hub" ? "auto" : "none" }}
        >
          <Hub
            active={nav.view === "hub"}
            focusedGroupIndex={nav.focusedGroupIndex}
            onFocus={nav.setFocusedGroupIndex}
            onEnter={nav.enterGroup}
            onPresentLive={nav.startLive}
          />
        </div>

        {/* capa SECCIÓN */}
        <div
          ref={stageRef}
          className="absolute inset-0"
          style={{ pointerEvents: nav.view === "section" ? "auto" : "none" }}
        >
          <Stage
            slide={sectionSlide}
            currentN={nav.currentN}
            total={nav.total}
            onBack={nav.goToHub}
          />
        </div>

        {/* capa LIVE */}
        <div
          ref={liveRef}
          className="absolute inset-0"
          style={{ pointerEvents: nav.view === "live" ? "auto" : "none" }}
        >
          <LiveStage
            slide={liveSlide}
            liveN={nav.liveN}
            total={nav.liveTotal}
            isFullscreen={nav.isFullscreen}
            onExit={nav.exitLive}
          />
        </div>
      </main>
    </FitStage>
  );
}
