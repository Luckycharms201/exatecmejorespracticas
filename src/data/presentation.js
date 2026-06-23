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
          {
            n: 1,
            kind: "image",
            note: "Tour — identidad",
            src: "/media/RAC3540-09.webp",
            alt: "Tour de identidad · Regreso a Casa",
          },
          {
            n: 2,
            kind: "image",
            note: "Tour — logística",
            src: "/media/logistica_tour.webp",
            alt: "Nueva logística de tours · Regreso a Casa",
          },
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
            heading: "Photo Opportunities",
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
          {
            n: 1,
            kind: "image",
            note: "Vestimenta",
            src: "/media/vestimenta_rac.webp",
            alt: "Vestimenta oficial · Regreso a Casa",
          },
          {
            n: 2,
            kind: "image",
            note: "Photo opportunity",
            src: "/media/photo_ops.webp",
            alt: "Photo ops · Regreso a Casa",
          },
          {
            n: 3,
            kind: "image",
            note: "Diseño de estolas",
            src: "/media/estola_diseno.webp",
            alt: "Diseño de estolas conmemorativas",
          },
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
          {
            n: 1,
            kind: "image",
            note: "Registro",
            src: "/media/registro.webp",
            alt: "Módulos de registro · Regreso a Casa",
          },
          {
            n: 2,
            kind: "image",
            note: "Gafetes",
            src: "/media/gafetes.webp",
            alt: "Gafetes y listones · Regreso a Casa",
          },
          {
            n: 3,
            kind: "image",
            note: "Acomodo de mesas",
            src: "/media/mesas.webp",
            alt: "Acomodo de mesas · cena de gala",
          },
        ],
      },
      {
        id: "rac-nps",
        type: "nps",
        title: "NPS · Regreso a Casa",
        kicker: "Satisfacción de la comunidad",
        // Comparativo año vs año: el promedio saltó de 44.7 a 64.8 (+20.1 pts).
        // Cada año se mide por segmento de generación (RAC).
        years: [
          {
            year: "2024",
            average: 44.7,
            segments: [
              { label: "RAC 5–15", value: 42 },
              { label: "RAC 20–35", value: 63 },
              { label: "RAC 40+", value: 29 },
            ],
          },
          {
            year: "2025",
            average: 64.8,
            segments: [
              { label: "RAC 5–15", value: 43 },
              { label: "RAC 20", value: 70 },
              { label: "RAC 25–30", value: 82 },
              { label: "RAC 35–40", value: 64 },
            ],
          },
        ],
        comments: [
          "Me encantó el reencuentro con mis compañeros y el tour por las nuevas instalaciones. Orgullosa de ser EXATEC.",
          "Me encantó cada detalle, desde la recepción, mensajes, cena de gala, desayuno, recorridos… pero especialmente la evolución del Tec en estos 40 años.",
          "Me gustó todo, especialmente que hayan mejorado la logística de la cena, con mesas asignadas. También que los mensajes fueran en el Luis Elizondo, breves, con apoyo audiovisual y muy poderosos. Me siento orgullosa del Tec y de mi generación.",
          "Impresionado con cómo ha cambiado el campus. La clase del recuerdo (Ing. José Antonio Fernández) estuvo de maravilla, aparte de que me causó un poco de nostalgia acordarme que alguna vez fue mi profesor.",
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
        stats: [
          { value: 3, label: "Talleres impartidos" },
          { value: 177, label: "Asistentes" },
          { value: 163990, prefix: "$", label: "Recaudado" },
          { value: 100, suffix: "%", label: "Asistencia" },
        ],
        placeholders: [
          { n: 1, kind: "image", note: "Taller", src: "/media/taller_1.webp", alt: "Taller · Educación Continua" },
          { n: 2, kind: "image", note: "Taller", src: "/media/taller_2.webp", alt: "Taller · Educación Continua" },
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
        disciplines: ["Tochito", "Padel", "Golf"],
        tournaments: [
          {
            name: "Tochito",
            raised: 186200,
            stats: [
              { value: 56, label: "Equipos inscritos" },
              { value: 670, label: "Niños participando" },
              { value: 76, label: "Papás EXATEC" },
            ],
          },
          {
            name: "Golf",
            raised: 500000,
            stats: [{ value: 120, label: "Participantes" }],
          },
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
        total: 846200,
        // ordenado de mayor a menor: el acento (fila 0) resalta el dominante
        breakdown: [
          { name: "EXATEC Blue Open", amount: 500000 },
          { name: "Borregos Flag Cup", amount: 186200 },
          { name: "EXATEC Wealth Strategy", amount: 90000 },
          { name: "Arte, Cultura y Conexión", amount: 70000 },
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

/**
 * MODO LIVE — presentación en vivo.
 * Slide de título que arranca el recorrido + la secuencia completa detrás.
 * `groupIndex: -1` marca la portada (no pertenece a ningún área).
 */
export const LIVE_INTRO = {
  id: "live-intro",
  type: "liveIntro",
  title: META.title,
  kicker: META.subtitle,
  groupName: "Inicio",
  groupIndex: -1,
};

export const LIVE_SEQUENCE = [LIVE_INTRO, ...SEQUENCE].map((item, i) => ({
  ...item,
  liveN: i + 1,
}));

export const LIVE_TOTAL = LIVE_SEQUENCE.length;
