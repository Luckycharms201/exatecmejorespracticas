import SlideShell from "./SlideShell";
import { SLIDE_COMPONENTS, SlideGeneric } from "../slides/slideRegistry";

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
