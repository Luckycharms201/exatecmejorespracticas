# Mejores Prácticas Monterrey · EXATEC 360

Presentación web interactiva **hub-and-spoke** (no es un slideshow lineal): un hub
central tipo constelación del que salen las secciones. Construida con **React + Vite +
GSAP + Tailwind v4**.

## Correr en local

```bash
npm install
npm run dev      # http://localhost:5173
```

- `npm run build` — bundle de producción en `dist/`
- `npm run preview` — sirve el build localmente
- `#lab` — laboratorio temporal de primitivas de dato (ej. `localhost:5173/#lab`)

## Navegación

Dos modos coexisten:

- **Hub (exploración):** `← →` mueven el foco entre grupos · `Enter` entra al grupo
  (zoom de cámara) · `P` (o el botón **▶ Presentar en vivo**) arranca el modo lineal.
- **Modo lineal (presentar en vivo):** recorrido de corrido 1→13 sin volver al hub.
  Un **eje diagonal de cristal** (efecto tempered glass/gradient, inclinado en 3D) se
  sobrepone a la izquierda como guía: muestra la secuencia completa, un *playhead* que
  avanza y el título/foto/área del slide actual, con un pulso cada vez que cambia de
  área. Clic en un nodo del eje salta a ese slide. `Esc` sale al hub.
- **Sección (entrando por un grupo):** `← →` recorren la secuencia global 1→13 ·
  `Esc` vuelve al hub.
- Click y hover también funcionan.

## Estructura

```
src/
  data/presentation.js   ← ÚNICA fuente de verdad (grupos → slides → datos)
  hooks/                 ← useNavigation, useSlideTimeline
  components/
    Hub/                 ← constelación + geometría orbital
    Stage/               ← FitStage (escala 16:9), Stage, SlideShell
    slides/              ← un componente por tipo de slide
    dataviz/             ← CountUp, DotGrid, ZoomScale, iMessageThread
    ui/                  ← Placeholder, Highlight, SlideHeading, AmbientBackground
    dev/DataLab.jsx      ← preview de primitivas (#lab), se puede borrar
```

13 slides en 3 grupos: **Regreso a Casa** (1–6), **Agrupaciones** (7–12),
**Líderes de Generación** (13).

## Contenido pendiente de reemplazar

Todo vive en `src/data/presentation.js` (busca los comentarios `PLACEHOLDER`):

- **Videos** (slides 2, 9, 11): marcos `VIDEO #n` por reemplazar.
- **Fotos**: cada `Placeholder` tiene un `#n` y una nota.
- **Slide 6 · NPS**: valores `editions[]` y `comments[]` reales.
- **Slide 8 · Talleres** y **12 · Monto**: numeralia/montos reales.
- **Slide 10 · Torneos**: pendiente de ampliar (`pending: true`).

## Deploy a Cloudflare Pages

**Opción A — conectar el repo (recomendado, auto-deploy en cada push):**
en Cloudflare Pages crea un proyecto desde este repo con:

- Build command: `npm run build`
- Build output directory: `dist`

**Opción B — subida directa:**

```bash
npm run deploy   # build + wrangler pages deploy dist
```

(Requiere estar autenticado en Wrangler: `npx wrangler login`.)
