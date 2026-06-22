import SlideShell from "./SlideShell";
import SlideGeneric from "../slides/SlideGeneric";
import SlideCover from "../slides/SlideCover";
import SlideVideo from "../slides/SlideVideo";
import SlideTours from "../slides/SlideTours";
import SlideIdentidad from "../slides/SlideIdentidad";
import SlideRegistro from "../slides/SlideRegistro";
import SlideNPS from "../slides/SlideNPS";
import SlideTalleres from "../slides/SlideTalleres";
import SlideTorneos from "../slides/SlideTorneos";
import SlideMonto from "../slides/SlideMonto";
import SlideJourney from "../slides/SlideJourney";

/**
 * Registro tipo → componente de slide.
 * Se irá completando por checkpoints; los tipos aún sin componente
 * propio caen en el renderizador genérico.
 */
const SLIDE_COMPONENTS = {
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
};

export default function Stage({ slide, currentN, total, onBack }) {
  if (!slide) return null;
  const SlideComponent = SLIDE_COMPONENTS[slide.type] ?? SlideGeneric;

  return (
    <SlideShell slide={slide} currentN={currentN} total={total} onBack={onBack}>
      {/* key = slide.id → remonta cada slide y reinicia su timeline limpia */}
      <SlideComponent key={slide.id} slide={slide} />
    </SlideShell>
  );
}
