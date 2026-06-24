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

/* ---------------- Journey LDG (manejado como slides separadas) ----------------
 * El recorrido se compone de slides reales en la secuencia: una slide de
 * "línea del tiempo" (roadmap) que resalta el punto en turno, seguida de las
 * slides-popup de ese punto. Así la navegación es la lineal de siempre.
 */
const JOURNEY_POINTS = [
  { title: "Convocatoria / Nominación", sub: "Se abre la convocatoria y la comunidad nomina a sus candidatos." },
  { title: "Validación de Perfil", sub: "Se revisa el perfil de los nominados que cumplen requisitos." },
  { title: "Sesión Informativa", sub: "Los seleccionados conocen el alcance del programa." },
  { title: "Carta de Compromiso", sub: "Firman su compromiso como Líderes de Generación." },
  { title: "Ceremonia de Bienvenida", sub: "Evento donde se nombra a los nuevos líderes de generación." },
  { title: "Eventos de PST", sub: "Participan en los eventos Por Siempre Tec." },
  { title: "Seguimiento", sub: "Reuniones anuales de líderes de generación." },
];

const JOURNEY_RESULTS = [
  { period: "Ago–Dic 2024", lideres: 29, participacion: 17 },
  { period: "Feb–Jun 2025", lideres: 90, participacion: 33 },
  { period: "Ago–Dic 2025", lideres: 52, participacion: 42 },
];

const JOURNEY_PST = {
  heading: "¿Cómo colabora EXATEC y LDG en los eventos de Por Siempre Tec?",
  events: [
    {
      name: "Patada del Éxito",
      items: [{ who: "LDG", what: "Entrega de foto de Generación a Director de Carrera" }],
    },
    {
      name: "Ceremonia de Luz",
      items: [
        { who: "LDG", what: "Depositan cartas a la Cápsula del Tiempo" },
        { who: "EXATEC", what: "Speech · Video de Reflexión" },
      ],
    },
  ],
};

const JOURNEY_KICKER = "El camino del Líder de Generación";
// slide de línea del tiempo resaltando el punto `i`
const journeyRoadmap = (i) => ({
  id: `ldg-roadmap-${i + 1}`,
  type: "journey",
  kicker: JOURNEY_KICKER,
  title: "Journey LDG",
  points: JOURNEY_POINTS,
  results: JOURNEY_RESULTS,
  highlight: i,
});
const journeyPopup = (id, fields) => ({ id, type: "journeyPopup", ...fields });

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
        placeholders: [{ n: 1, kind: "video", note: "Video RAC (egresados)", src: "/media/ractec.mp4" }],
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
        id: "rac-gafetes",
        type: "gafetes",
        title: "Gafetes",
        kicker: "Registro · Regreso a Casa",
        // emparejados por color: frente (nombre + rol) y reverso (QR)
        badges: [
          { label: "55 Aniversario", front: "/media/gafete-azul-frente.webp", back: "/media/gafete-azul-reverso.webp" },
          { label: "Líder de Generación", front: "/media/gafete-teal-frente.webp", back: "/media/gafete-teal-reverso.webp" },
          { label: "Staff", front: "/media/gafete-rosa-frente.webp", back: "/media/gafete-rosa-reverso.webp" },
          { label: "Acompañante", front: "/media/gafete-gris-frente.webp", back: "/media/gafete-gris-reverso.webp" },
        ],
      },
      {
        id: "rac-gafetes-qr",
        type: "embed",
        title: "Del gafete a tu celular",
        kicker: "Gafetes · Regreso a Casa",
        lead: "El QR al reverso del gafete abre la experiencia digital del evento.",
        body: "Una página con todos los enlaces clave en la mano del asistente.",
        urlLabel: "raclinks.pages.dev",
        url: "https://raclinks.pages.dev/",
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
      {
        id: "rac-retos",
        type: "retos",
        title: "Retos RAC",
        kicker: "Regreso a Casa",
        items: [
          {
            lead: "Asignación personalizada de mesas",
            body: "Llamadas 1 a 1 para definir la integración de mesas por generación, considerando preferencias de ubicación e integrantes.",
          },
          {
            lead: "Personalización manual de gafetes",
            body: "Elaboración de gafetes con información personalizada (nombre, número de mesa y número de tour).",
          },
          {
            lead: "Convocatoria y asistencia al evento",
            body: "Requiere una estrategia de difusión multicanal (WhatsApp, LinkedIn, correo, radio, redes sociales y pauta digital) para impulsar la participación.",
          },
          {
            lead: "Alta inversión y carga operativa",
            body: "Gran demanda de inversión y horas de trabajo para la planeación y ejecución del evento.",
          },
          {
            lead: "Gestión simultánea de eventos",
            body: "4 eventos de Regreso a Casa en 1 semestre, más eventos y actividades EXATEC adicionales.",
          },
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
        logo: "/brand/logo-exatec-blanco.webp",
        logoAlt: "EXATEC",
      },
      {
        id: "agr-lista",
        type: "agrupacionesList",
        kicker: "Agrupaciones",
        count: 14,
        label: "agrupaciones EXATEC en Monterrey",
        names: [
          "Asociación EXATEC Contaduría Pública",
          "Asociación EXATEC Ingeniería Industrial",
          "Asociación EXATEC Relaciones Internacionales",
          "Asociación EXATEC Arquitectura",
          "Asociación EXATEC Mujeres Empresarias y Ejecutivas",
          "Club EXATEC en el Arte",
          "Club EXATEC Profesionistas",
          "Club EXATEC Empresarial Monterrey",
          "Club EXATEC Running Monterrey",
          "Club EXATEC Ciclismo",
          "Club EXATEC Básquetbol",
          "Club EXATEC Futbol Americano",
          "Club EXATEC Natación",
          "Fraternidad Ricardo R Guajardo",
        ],
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
        type: "videoTrio",
        title: "Video · Testimonios",
        // 3 videos verticales en simultáneo (izq→der). El central lleva sonido
        // y no se loopea; los laterales corren muteados en loop.
        videos: [
          { src: "/media/testimonio1.mp4", loop: true, muted: true },
          { src: "/media/testimonio2.mp4", loop: false, muted: false },
          { src: "/media/testimonio3.mp4", loop: true, muted: true },
        ],
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
            photo: { n: 1, note: "Torneo de Tochito", src: "/media/tochito.webp", alt: "Torneo de Tochito" },
            stats: [
              { value: 56, label: "Equipos inscritos" },
              { value: 670, label: "Niños participando" },
              { value: 76, label: "Papás EXATEC" },
            ],
          },
          {
            name: "Golf",
            raised: 500000,
            photo: { n: 2, note: "Torneo de Golf", src: "/media/golf.webp", alt: "Torneo de Golf" },
            stats: [{ value: 120, label: "Participantes" }],
          },
        ],
      },
      {
        id: "agr-video-tochito",
        type: "video",
        title: "Video · Torneo de Tochito",
        placeholders: [{ n: 1, kind: "video", note: "Video torneo tochito", src: "/media/tochito.mp4" }],
      },
      {
        id: "agr-monto",
        type: "monto",
        title: "Generosidad - Total Recaudado por Asociaciones",
        kicker: "Impacto de la comunidad",
        total: 890142,
        // ordenado de mayor a menor: el acento (fila 0) resalta el dominante
        breakdown: [
          { name: "EXATEC Blue Open", amount: 516800 },
          { name: "Borregos Flag Cup", amount: 186200 },
          { name: "EXATEC Wealth Strategy", amount: 90000 },
          { name: "Arte, Cultura y Conexión", amount: 70000 },
          { name: "Otros", amount: 27142 },
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
        id: "ldg-portada",
        type: "cover",
        title: "Líderes de Generación",
        kicker: "Mejores Prácticas · Monterrey",
        logo: "/brand/logo-ldg-blanco.webp",
        logoAlt: "Líderes de Generación",
      },
      // PUNTO 1 — popup doble (video vertical + texto → video horizontal)
      journeyRoadmap(0),
      journeyPopup("ldg-p1a", { point: JOURNEY_POINTS[0], pointN: 1, media: "video-vertical", text: true, src: "/media/campana_ldg.mp4" }),
      journeyPopup("ldg-p1b", { media: "video-horizontal", src: "/media/ldg_pst.mp4" }),
      // PUNTO 2 — sólo highlight (la línea con el nodo resaltado)
      journeyRoadmap(1),
      // PUNTO 3 — popup (video vertical + texto)
      journeyRoadmap(2),
      journeyPopup("ldg-p3", { point: JOURNEY_POINTS[2], pointN: 3, media: "video-vertical", text: true, src: "/media/sesion.mp4" }),
      // PUNTO 4 — sólo highlight
      journeyRoadmap(3),
      // PUNTO 5 — popup (video vertical + texto)
      journeyRoadmap(4),
      journeyPopup("ldg-p5", { point: JOURNEY_POINTS[4], pointN: 5, media: "video-vertical", text: true }),
      // PUNTO 6 — popup triple (video h → pst → video h)
      journeyRoadmap(5),
      journeyPopup("ldg-p6a", { media: "video-horizontal", src: "/media/PSTrecap.mp4" }),
      journeyPopup("ldg-p6b", { media: "pst", pst: JOURNEY_PST }),
      journeyPopup("ldg-p6c", { media: "video-horizontal", src: "/media/videopau.mp4" }),
      // PUNTO 7 — popup (foto horizontal + texto)
      journeyRoadmap(6),
      journeyPopup("ldg-p7", { point: JOURNEY_POINTS[6], pointN: 7, media: "photo-horizontal", text: true, src: "/media/seguimiento.webp" }),
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
