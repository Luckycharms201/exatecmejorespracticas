import CountUp from "../dataviz/CountUp";
import DotGrid from "../dataviz/DotGrid";
import ZoomScale from "../dataviz/ZoomScale";
import IMessageThread from "../dataviz/iMessageThread";
import { HighlightText } from "../ui/Highlight";

/**
 * Laboratorio temporal de primitivas de dato (solo dev, ruta #lab).
 * Sirve para revisar las animaciones aisladas. Se elimina en el pulido.
 */
export default function DataLab() {
  return (
    <div className="h-full w-full overflow-y-auto px-10 py-12">
      <h2 className="text-text mb-10 text-2xl font-bold tracking-tight">
        Lab · Primitivas de dato
      </h2>

      <div className="grid gap-12 lg:grid-cols-2">
        <Card title="CountUp">
          <span className="text-accent text-7xl font-black">
            <CountUp value={3480} duration={2.2} />
          </span>
          <span className="text-text-dim mt-2 block text-sm">asistentes</span>
        </Card>

        <Card title="CountUp · moneda">
          <span className="text-accent text-6xl font-black">
            <CountUp value={1250000} prefix="$" suffix=" MXN" duration={2.4} />
          </span>
          <span className="text-text-dim mt-2 block text-sm">recaudado</span>
        </Card>

        <Card title="DotGrid · 3 de cada 100">
          <DotGrid value={3} total={100} columns={20} />
        </Card>

        <Card title="DotGrid · 18%">
          <DotGrid value={18} total={100} columns={20} />
        </Card>

        <Card title="ZoomScale · global → local" full>
          <ZoomScale
            steps={[
              { value: 360000, label: "EXATEC en el mundo", caption: "Red global de egresados" },
              { value: 95000, label: "En Monterrey", caption: "Comunidad local" },
              { value: 3480, label: "En el evento", caption: "Regreso a Casa 2025" },
            ]}
          />
        </Card>

        <Card title="iMessageThread · NPS">
          <IMessageThread
            messages={[
              { from: "them", text: "Me encantó volver al campus 🥹", time: "RAC 2024" },
              { from: "me", text: "¿Lo recomendarías? (NPS)" },
              { from: "them", text: "¡Totalmente! 10/10, ya quiero el del próximo año." },
            ]}
          />
        </Card>

        <Card title="Highlight · keywords" full>
          <p className="text-text text-2xl leading-relaxed">
            <HighlightText
              text="El Regreso a Casa reunió a miles de egresados en una sola noche, con un NPS récord y comentarios memorables."
              words={["miles de egresados", "NPS récord"]}
            />
          </p>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children, full }) {
  return (
    <div
      className={[
        "border-blue-700 bg-blue-900/30 rounded-2xl border p-8",
        full ? "lg:col-span-2" : "",
      ].join(" ")}
    >
      <p className="text-text-dim mb-6 text-xs tracking-[0.3em] uppercase">
        {title}
      </p>
      <div className="flex min-h-[120px] flex-col items-start justify-center">
        {children}
      </div>
    </div>
  );
}
