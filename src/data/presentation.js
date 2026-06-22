/**
 * ÚNICA FUENTE DE VERDAD de la presentación.
 *
 * Estructura: presentación → grupos (radios del hub) → slides.
 * Cada slide tiene un `type` que el <Stage> mapea a un componente.
 * Los contenidos visuales (fotos/videos) usan `placeholders` numerados
 * que se reemplazarán más adelante.
 *
 * El orden de `groups` (y de `slides` dentro de cada grupo) define la
 * secuencia global 1 → N que recorren las flechas ← →.
 */

export const META = {
  title: "Mejores Prácticas Monterrey",
  subtitle: "EXATEC 360",
  logo: "/brand/logo-rac-blanco.png",
};

export const GROUPS = [
  {
    id: "regreso",
    name: "Regreso a Casa",
    short: "RAC",
    // posición orbital en el hub (se afina en Checkpoint 2)
    hub: { angle: -90 },
    slides: [
      {
        id: "rac-portada",
        type: "cover",
        title: "Regreso a Casa",
        kicker: "Mejores Prácticas · Monterrey",
      },
      {
        id: "rac-video-viejitos",
        type: "video",
        title: "Video · Regreso a Casa",
        placeholders: [{ n: 1, kind: "video", note: "Video RAC (egresados)" }],
      },
      {
        id: "rac-tours",
        type: "tours",
        title: "Tours",
        kicker: "Regreso a Casa",
        sections: [
          {
            heading: "Identidad",
            // PLACEHOLDER — reemplazar con copy real
            body: "Recorridos que reconectan a los egresados con la esencia del campus: los espacios que marcaron su paso y la memoria viva del Tec.",
            keywords: ["esencia del campus", "memoria viva"],
          },
          {
            heading: "Nueva logística",
            body: "Rediseñamos rutas, horarios y puntos de encuentro para que cada tour fluya sin filas ni tiempos muertos.",
            keywords: ["sin filas", "rutas"],
          },
        ],
        placeholders: [
          { n: 1, kind: "image", note: "Tour — identidad" },
          { n: 2, kind: "image", note: "Tour — logística" },
        ],
      },
      {
        id: "rac-identidad",
        type: "identidad",
        title: "Identidad del Evento",
        kicker: "Regreso a Casa",
        sections: [
          {
            heading: "Vestimenta",
            sub: "Un código visual único",
            body: "Línea de prendas oficiales que unifica al evento y refuerza el orgullo EXATEC.",
          },
          {
            heading: "Photo Ops",
            sub: "Momentos para compartir",
            body: "Estaciones fotográficas diseñadas para volverse contenido en redes.",
          },
          {
            heading: "Estolas",
            sub: "Símbolo de pertenencia",
            body: "Diseño conmemorativo que distingue a cada generación de regreso.",
          },
        ],
        placeholders: [
          { n: 1, kind: "image", note: "Vestimenta" },
          { n: 2, kind: "image", note: "Photo opportunity" },
          { n: 3, kind: "image", note: "Diseño de estolas" },
        ],
      },
      {
        id: "rac-registro",
        type: "registro",
        title: "Sistema de Registro y Logística",
        kicker: "Regreso a Casa",
        // se presenta como un flujo de 3 pasos
        sections: [
          {
            heading: "Registro",
            step: "01",
            body: "Registro digital previo: check-in en segundos al llegar.",
          },
          {
            heading: "Gafetes",
            step: "02",
            body: "Impresión personalizada al instante con datos de generación.",
          },
          {
            heading: "Acomodo de mesas",
            step: "03",
            body: "Asignación inteligente para reencontrar a tu generación.",
          },
        ],
        placeholders: [
          { n: 1, kind: "image", note: "Registro" },
          { n: 2, kind: "image", note: "Gafetes" },
          { n: 3, kind: "image", note: "Acomodo de mesas" },
        ],
      },
      {
        id: "rac-nps",
        type: "nps",
        title: "NPS · Regreso a Casa",
        kicker: "Satisfacción de la comunidad",
        // PLACEHOLDER — reemplazar con NPS reales por edición
        editions: [
          { name: "RAC 2022", nps: 71 },
          { name: "RAC 2023", nps: 78 },
          { name: "RAC 2024", nps: 84 },
          { name: "RAC 2025", nps: 89 },
        ],
        // PLACEHOLDER — reemplazar con comentarios reales
        comments: [
          { from: "them", text: "Volver al campus después de años fue emocionante 🥹", time: "RAC 2024" },
          { from: "them", text: "La logística estuvo impecable, cero filas.", time: "RAC 2024" },
          { from: "them", text: "Ya aparté la fecha para el próximo. 10/10", time: "RAC 2025" },
          { from: "them", text: "Reencontrarme con mi generación no tiene precio.", time: "RAC 2025" },
        ],
      },
    ],
  },
  {
    id: "agrupaciones",
    name: "Agrupaciones",
    short: "AGR",
    hub: { angle: 150 },
    slides: [
      {
        id: "agr-portada",
        type: "cover",
        title: "Agrupaciones",
        kicker: "Mejores Prácticas · Monterrey",
      },
      {
        id: "agr-talleres",
        type: "talleres",
        title: "Talleres",
        kicker: "En colaboración con Educación Continua",
        // PLACEHOLDER — numeralia real pendiente
        stats: [
          { value: 24, label: "Talleres impartidos" },
          { value: 1180, label: "Asistentes" },
          { value: 92, suffix: "%", label: "Satisfacción" },
          { value: 8, label: "Áreas de conocimiento" },
        ],
        placeholders: [
          { n: 1, kind: "image", note: "Taller" },
          { n: 2, kind: "image", note: "Taller" },
        ],
      },
      {
        id: "agr-video-testimonios",
        type: "video",
        title: "Video · Testimonios",
        placeholders: [{ n: 1, kind: "video", note: "Video testimonios" }],
      },
      {
        id: "agr-torneos",
        type: "torneos",
        title: "Torneos",
        kicker: "Comunidad en movimiento",
        pending: true, // el usuario dará más info después
        // PLACEHOLDER — disciplinas y numeralia por definir
        disciplines: ["Tochito", "Fútbol", "Básquetbol", "Vóleibol"],
        stats: [
          { value: 16, label: "Equipos" },
          { value: 240, label: "Participantes" },
        ],
        placeholders: [
          { n: 1, kind: "image", note: "Torneos" },
          { n: 2, kind: "image", note: "Torneos" },
        ],
      },
      {
        id: "agr-video-tochito",
        type: "video",
        title: "Video · Torneo de Tochito",
        placeholders: [{ n: 1, kind: "video", note: "Video torneo tochito" }],
      },
      {
        id: "agr-monto",
        type: "monto",
        title: "Monto Recaudado en Eventos",
        kicker: "Impacto de la comunidad",
        // PLACEHOLDER — montos reales pendientes
        total: 1875000,
        breakdown: [
          { name: "Regreso a Casa", amount: 920000 },
          { name: "Talleres", amount: 410000 },
          { name: "Torneos", amount: 320000 },
          { name: "Otros eventos", amount: 225000 },
        ],
      },
    ],
  },
  {
    id: "lideres",
    name: "Líderes de Generación",
    short: "LDG",
    hub: { angle: 30 },
    slides: [
      {
        id: "ldg-journey",
        type: "journey",
        title: "Journey LDG",
        kicker: "El camino del Líder de Generación",
        // roadmap adaptado del Canva (copy refinable)
        steps: [
          { title: "Convocatoria / Nominación", desc: "Se abre la convocatoria y la comunidad nomina a sus candidatos." },
          { title: "Validación de Perfil", desc: "Se revisa el perfil de los nominados que cumplen requisitos." },
          { title: "Sesión Informativa", desc: "Los seleccionados conocen el alcance del programa." },
          { title: "Carta de Compromiso", desc: "Firman su compromiso como Líderes de Generación." },
          { title: "Eventos PST", desc: "Participan en los eventos Por Siempre Tec." },
          { title: "Desayuno de Bienvenida", desc: "Desayuno LdG: bienvenida oficial a la comunidad." },
        ],
        // resultados (crecimiento de participación en nominación)
        results: [
          { period: "Ago–Dic 2024", lideres: 29, participacion: 17 },
          { period: "Feb–Jun 2025", lideres: 90, participacion: 33 },
          { period: "Ago–Dic 2025", lideres: 52, participacion: 42 },
        ],
      },
    ],
  },
];

/**
 * Secuencia global aplanada (con numeración 1..N) para la navegación
 * lineal con flechas. Cada item conoce su grupo y su índice local.
 */
export const SEQUENCE = GROUPS.flatMap((group, groupIndex) =>
  group.slides.map((slide, slideIndex) => ({
    ...slide,
    groupId: group.id,
    groupName: group.name,
    groupIndex,
    slideIndex,
  }))
).map((item, i) => ({ ...item, n: i + 1 }));

export const TOTAL_SLIDES = SEQUENCE.length;

/** Helpers de navegación */
export const getGroup = (groupId) => GROUPS.find((g) => g.id === groupId);

export const firstSlideOfGroup = (groupId) =>
  SEQUENCE.find((s) => s.groupId === groupId);

export const slideAt = (n) => SEQUENCE[n - 1] ?? null;
