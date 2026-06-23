import SlideGeneric from "./SlideGeneric";
import SlideCover from "./SlideCover";
import SlideVideo from "./SlideVideo";
import SlideTours from "./SlideTours";
import SlideIdentidad from "./SlideIdentidad";
import SlideRegistro from "./SlideRegistro";
import SlideNPS from "./SlideNPS";
import SlideTalleres from "./SlideTalleres";
import SlideTorneos from "./SlideTorneos";
import SlideMonto from "./SlideMonto";
import SlideJourney from "./SlideJourney";
import SlideJourneyPopup from "./SlideJourneyPopup";
import SlideLiveIntro from "./SlideLiveIntro";

/**
 * Registro tipo → componente de slide. Fuente única para <Stage> y <LiveStage>.
 * Los tipos sin componente propio caen en el renderizador genérico.
 */
export const SLIDE_COMPONENTS = {
  cover: SlideCover,
  video: SlideVideo,
  tours: SlideTours,
  identidad: SlideIdentidad,
  registro: SlideRegistro,
  nps: SlideNPS,
  talleres: SlideTalleres,
  torneos: SlideTorneos,
  monto: SlideMonto,
  journey: SlideJourney,
  journeyPopup: SlideJourneyPopup,
  liveIntro: SlideLiveIntro,
};

export { SlideGeneric };
