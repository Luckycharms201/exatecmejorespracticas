import { useEffect, useState } from "react";
import { useNavigation } from "./hooks/useNavigation";
import { NavContext } from "./hooks/navContext";
import { LIVE_SEQUENCE } from "./data/presentation";
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
  const liveSlide = LIVE_SEQUENCE[nav.liveN - 1] ?? null;

  if (hash === "#lab") {
    return (
      <main className="bg-bg-deep h-full w-full">
        <DataLab />
      </main>
    );
  }

  // El sitio arranca directo en la presentación (sin hub): la primera slide
  // es la portada del modo live.
  return (
    <NavContext.Provider value={nav}>
      <FitStage>
        <main className="bg-bg-deep absolute inset-0 overflow-hidden">
          <AmbientBackground />
          <div className="absolute inset-0">
            <LiveStage
              slide={liveSlide}
              liveN={nav.liveN}
              total={nav.liveTotal}
              isFullscreen={nav.isFullscreen}
            />
          </div>
        </main>
      </FitStage>
    </NavContext.Provider>
  );
}
