# PLAN MAESTRO — Portfolio de Eduardo Moreno (EduuMR)

> Documento de planificación completo. Sirve como contexto para Claude Code (Sonnet/Opus).
> Regla de oro: **no se pica nada que no esté en este documento**. Si surge una idea nueva, se anota en §13 y se decide después.

---

## 1. Estrategia y posicionamiento

**Objetivo único de la página:** que un recruiter o cliente potencial, en menos de 60 segundos, entienda que Eduardo no hace "proyectos de clase" sino **productos en producción**, y tenga un botón claro para contactar.

**Audiencia:** recruiters técnicos y no técnicos de empresas españolas (prioridad: Cádiz/Sevilla/remoto), y potenciales clientes freelance.

**Posicionamiento frente a la competencia directa (compañeros de promoción):**

| | Sergio (terminal retro) | Jesús (sci-fi cyan) | Eduardo |
|---|---|---|---|
| Punto fuerte | Simplicidad indexable | Casos de estudio + acabado | **Producto real con marca (Emite)** |
| Punto débil | Detalles rotos, TFG sin marca | Invisible para Google, copy hueco | — (evitamos ambos) |
| Color de acento | Verde terminal | Cian | **Champán/dorado #E8C96D** |

**La tesis del portfolio:** "Construyo productos que facturan." Doble sentido intencionado: facturan porque Emite es un SaaS de facturación, y facturan porque son productos serios en producción. Todo el diseño y el copy refuerzan esta tesis.

**Decisiones ya cerradas (no reabrir):**
1. Arquitectura: HTML/CSS/JS estático puro. Sin frameworks, sin build step obligatorio.
2. Hosting: GitHub Pages gratuito → `https://eduumr73.github.io` (repo `EduuMR73/EduuMR73.github.io`).
3. Identidad: **Opción C** — base heredada de Emite (Carbón + Champán + Plus Jakarta Sans), SIN el logo ✦ ni el claim de Emite. El ✦ y "Emite. Cobra. Crece." solo aparecen DENTRO de la ficha del proyecto Emite.
4. Idioma: **solo español en v1**. Versión EN es v2 (ver §12).
5. **Sin pantalla de bienvenida/splash** (evaluada y descartada el 11/06/2026: añade fricción, copy sin información, rompe el SEO del H1). En su lugar: **animación de entrada orquestada del hero** (ver §10, fase F6). No reabrir.

---

## 2. Identidad visual — Design tokens

### 2.1 Color

```css
:root {
  /* Base (heredada de Emite, misma familia) */
  --bg-base:       #161616;  /* fondo general, un punto más profundo que el sidebar de Emite */
  --bg-surface:    #1E1E1E;  /* tarjetas y superficies (= carbón Emite) */
  --bg-elevated:   #262626;  /* hover de tarjetas, chips */
  --border:        #2E2E2E;  /* hairlines */
  --border-strong: #3D3D3D;

  /* Texto */
  --text-primary:  #F2F0EB;  /* blanco cálido, no #fff puro */
  --text-secondary:#A8A49C;  /* gris cálido para metadatos */
  --text-muted:    #6E6A63;

  /* Acento (la firma) */
  --accent:        #E8C96D;  /* champán — SOLO para: enlaces, CTA, números clave, subrayados, focus */
  --accent-dark:   #C9A84C;  /* hover de CTA */
  --accent-glow:   rgba(232, 201, 109, 0.12); /* halos sutiles, fondos de chip activo */

  /* Semánticos (uso mínimo) */
  --positive:      #4ADE80;  /* solo el badge "Disponible" y estados "En producción" */
}
```

**Reglas de uso del champán (importante para que no se devalúe):**
- Máximo ~10% de la superficie visible en cualquier viewport. Es un metal precioso, no pintura.
- Nunca como fondo de secciones grandes. Sí como: texto de enlaces, borde/relleno del CTA principal, cifras destacadas, subrayado del hero, marcador activo de navegación.
- El verde `--positive` se reserva para significar "vivo/en producción" (coherente con la regla de Emite de no usar champán para estados financieros positivos — aquí tampoco se mezcla acento de marca con semántica de estado).

### 2.2 Tipografía

| Rol | Fuente | Uso |
|---|---|---|
| Display + cuerpo | **Plus Jakarta Sans** (400, 500, 700, 800) | Títulos, párrafos, navegación |
| Datos/utilidad | **JetBrains Mono** (400, 500) | Cifras, etiquetas de sección, códigos de proyecto, tech chips, metadatos |

- Carga: Google Fonts con `preconnect` + `font-display: swap`. Solo los pesos listados (6 ficheros máx.).
- Escala tipográfica (desktop / móvil):
  - `--fs-hero: clamp(2.6rem, 7vw, 4.8rem)` peso 800, tracking -0.02em
  - `--fs-h2: clamp(1.8rem, 4vw, 2.6rem)` peso 700
  - `--fs-h3: 1.25rem` peso 700
  - `--fs-body: 1.0625rem` (17px) line-height 1.65
  - `--fs-small: 0.875rem`
  - `--fs-label: 0.75rem` mono, uppercase, letter-spacing 0.12em
- Cifras siempre en JetBrains Mono con `font-variant-numeric: tabular-nums`.

### 2.3 Firma visual (el elemento memorable)

**Concepto: "estética de documento fiscal".** El portfolio de alguien que ha construido un SaaS de facturación con cumplimiento Verifactu adopta, de forma sutil, el lenguaje visual de una factura bien hecha:

1. **Códigos de referencia en mono** en cada proyecto, como numeración de factura: `REF: PRJ-2026-001` (Emite), `PRJ-2026-002` (Hamparo), `PRJ-2025-003` (Pokédex), `PRJ-2026-004` (Super Basket League). Sustituye al genérico "01/02/03": aquí la numeración codifica año + orden, como una serie de facturación real.
2. **Hairlines horizontales** (`--border`, 1px) separando bloques, como las líneas de un albarán. Sin sombras difusas, sin glassmorphism.
3. **Bloque "total"** al final de la sección de proyectos: una línea estilo suma de factura — `TOTAL · 4 productos · 3 plataformas · 1 en producción` — con la cifra en champán.
4. **Etiquetas de sección** en mono uppercase con numeración fiscal: `// 01 · PROYECTOS`, `// 02 · TRAYECTORIA`...

Esto es lo que el visitante recordará ("el portfolio-factura dorado") y conecta directamente con la tesis. Todo lo demás se mantiene quieto y disciplinado.

### 2.4 Espaciado, radios, motion

- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px (variables `--sp-*`).
- Border-radius: `8px` superficies, `999px` chips y badges. Nada de radios mixtos.
- Contenedor: `max-width: 1100px`, padding lateral `24px` (móvil) / `48px` (desktop).
- Motion: transiciones `180ms ease-out` en hover; reveals de scroll `450ms` con `translateY(16px) → 0` + fade. **Todo dentro de `@media (prefers-reduced-motion: no-preference)`.**
- Entrada del hero: secuencia orquestada única al cargar (especificación exacta en F6, §10). Principio: el contenido es legible desde el primer frame; la animación es progresiva, nunca una cortina ni un bloqueo.

---

## 3. Arquitectura técnica

### 3.1 Estructura de archivos

```
EduuMR73.github.io/
├── index.html              # one-page, todo el contenido
├── css/
│   └── styles.css          # un único CSS, organizado por secciones con comentarios
├── js/
│   └── main.js             # vanilla JS, < 8 KB sin minificar
├── assets/
│   ├── img/
│   │   ├── og-image.png        # 1200×630, generada con la paleta (ver §8)
│   │   ├── emite-cover.webp    # captura hero de Emite
│   │   ├── emite-1..3.webp     # capturas secundarias (dashboard, factura, móvil)
│   │   ├── hamparo-cover.webp
│   │   ├── pokedex-cover.webp
│   │   ├── sbl-cover.webp
│   │   └── eduardo.webp        # foto opcional (decidir, ver §13)
│   ├── video/
│   │   ├── emite-demo.mp4      # ≤ 8 MB, H.264, 1080p máx, sin audio o audio opcional
│   │   └── sbl-demo.mp4        # ≤ 8 MB
│   └── cv/
│       └── CV-Eduardo-Moreno.pdf   # versión SIN foto (la web ya da contexto; menos scraping)
├── favicon.svg             # monograma "EM" en champán sobre carbón (NO el ✦ de Emite)
├── robots.txt
├── sitemap.xml
└── README.md
```

### 3.2 Reglas de implementación (para Claude Code)

> ⚠️ **Este repo NO es Emite.** No aplican las convenciones de Emite (nada de Ionic, ViewEncapsulation, companyService, environment.apiUrl...). Es HTML/CSS/JS plano. Lo único heredado son los tokens de §2.

- HTML semántico: `<header> <main> <section> <article> <footer>`, un solo `<h1>`.
- CSS: custom properties para todos los tokens; mobile-first; sin preprocesadores; sin `!important`.
- JS: solo tres responsabilidades — (1) IntersectionObserver para reveals y count-up, (2) navegación activa por scroll, (3) play/pause perezoso de vídeos. Nada de librerías.
- Imágenes: WebP, `loading="lazy"` (excepto la primera visible), `width`/`height` explícitos para evitar CLS.
- Vídeos: `<video preload="none" poster="..." controls muted playsinline>` self-hosted. Nada de iframes de YouTube/Vimeo (peso, cookies, branding ajeno — error de Jesús con Vimeo).
- Commits en español, formato `feat(seccion): descripción` / `fix(seccion): descripción`.

### 3.3 Lecciones de los compañeros codificadas como reglas

| Error observado | Regla en este proyecto |
|---|---|
| Sergio: contadores que muestran "0" si el JS no dispara | Los valores finales van **escritos en el HTML**; el JS solo anima desde 0 hasta el valor ya presente. Sin JS, se ve el número correcto. |
| Sergio: link "PLAY STORE" muerto (`#`) | Prohibido publicar enlaces a `#`. Si algo no existe, no se enseña. |
| Sergio: TFG llamado "MI_TFG" | Emite se presenta como producto con nombre, claim y métricas. La palabra "TFG" aparece solo como metadato secundario. |
| Jesús: SPA invisible para Google y LinkedIn | HTML estático + meta/OG completos (§8). |
| Jesús: copy de hero grandilocuente y vacío | Regla de copy: **cada frase debe contener al menos un dato verificable** (tecnología, cifra, nombre de producto). Prohibidas las palabras: disruptivo, apasionado, vanguardia, fusionar, sinergia. |
| Jesús: "COORDENADAS 0°00'00.0"" (decoración rota) | Ningún elemento decorativo dinámico. Si no aporta información real, no entra. |
| Jesús: "Master en CSS · 20 H · Udemy" junto al título oficial | Jerarquía de credenciales en 2 niveles visuales: titulaciones oficiales ≠ certificaciones/cursos (§5.5). |
| Jesús: títulos truncados con "…" | Los textos se escriben para el espacio disponible; QA incluye revisión de overflow en 360px. |
| Ambos: sin email ni CV | Email visible + CV descargable en PDF (§5.6). |

---

## 4. Mapa de la página (one-page con anclas)

```
┌──────────────────────────────────────────────────┐
│ NAV fija (logo "EM" · Proyectos · Trayectoria ·  │
│           Stack · [Contacto → CTA champán])      │
├──────────────────────────────────────────────────┤
│ HERO            // badge "Disponible" + tesis    │
├──────────────────────────────────────────────────┤
│ // 01 · PROYECTO DESTACADO  → Emite (case study) │
├──────────────────────────────────────────────────┤
│ // 02 · MÁS PROYECTOS → Hamparo · SBL · Pokédex  │
│         + línea "TOTAL" (firma visual)           │
├──────────────────────────────────────────────────┤
│ // 03 · TRAYECTORIA → experiencia + formación    │
├──────────────────────────────────────────────────┤
│ // 04 · STACK → 4 grupos, sin inflar             │
├──────────────────────────────────────────────────┤
│ // 05 · CONTACTO → email + CV + GitHub/LinkedIn  │
├──────────────────────────────────────────────────┤
│ FOOTER mínimo                                    │
└──────────────────────────────────────────────────┘
```

Orden razonado: los proyectos van ANTES que la bio. Un recruiter decide con el trabajo, no con la historia. Sergio y Jesús abren con "sobre mí"; nosotros abrimos con producto.

---

## 5. Contenido y copy, sección por sección

> El copy de abajo es definitivo salvo los `[PLACEHOLDER]`. Claude Code lo copia literal.

### 5.0 Navegación

- Izquierda: monograma `EM` (texto, Plus Jakarta 800, champán).
- Centro/derecha: `Proyectos · Trayectoria · Stack` + botón `Contacto` (fondo champán, texto `#1a1000`).
- Fija con fondo `--bg-base` al 85% + blur ligero al hacer scroll. En móvil: solo logo + botón Contacto (sin menú hamburguesa: la página es un scroll, no hace falta).

### 5.1 Hero

```
[badge verde] ● Disponible para trabajar

[eyebrow mono]  DESARROLLADOR FULL-STACK · CÁDIZ, ESPAÑA

[H1]            Construyo productos
                que facturan.        ← "facturan" con subrayado champán

[párrafo]       Soy Eduardo Moreno, desarrollador multiplataforma (DAM).
                He creado Emite, una plataforma SaaS de facturación para
                autónomos y pymes españolas: Angular, NestJS y PostgreSQL,
                con Stripe, Open Banking y cumplimiento Verifactu.
                En producción y con app Android.

[CTAs]          [ Ver Emite ↓ ]  (champán)    [ Descargar CV ]  (ghost)

[stats]         11 módulos      249 tests       4 proyectos
                en producción   automatizados   3 plataformas
```

- Las 3 stats en JetBrains Mono, valores en champán, **escritos en HTML** (regla §3.3).
- Alternativa de H1 si en revisión el doble sentido no convence: `Productos reales, en producción.` — pero la opción A es la primera elección: es la tesis.

### 5.2 // 01 · Proyecto destacado: Emite

Layout: tarjeta grande a doble columna (60/40). Izquierda: media (vídeo demo con poster, debajo 2-3 capturas pequeñas). Derecha: ficha tipo caso de estudio (formato robado de Jesús, mejorado).

```
[label mono]   REF: PRJ-2026-001 · WEB + ANDROID · ✦ EMITE
[H3 grande]    Emite — Facturación para autónomos y pymes
[claim]        "Emite. Cobra. Crece."

ROL                    AÑO          ESTADO
Diseño, desarrollo     2026         ● En producción
y despliegue (solo)

[descripción]
Plataforma SaaS multiempresa de facturación adaptada a la normativa
española. Cubre el ciclo completo: presupuesto → factura → cobro →
impuestos, con facturas rectificativas, recurrentes y proformas.

[bloque "Lo difícil" — 4 bullets con dato]
· Cumplimiento Verifactu (RD 1007/2023) con encadenamiento SHA-256
  de registros de facturación.
· Conciliación bancaria vía Open Banking (PSD2) con Tink.
· Lectura automática de gastos por OCR con visión de IA (Claude Vision).
· Suscripciones y pagos con Stripe; arquitectura multi-tenant.

[métricas en mono]
11 módulos · 249 tests unitarios · APK Android · Deploy en Render (UE)

TECH STACK (chips mono)
Angular · Ionic · Capacitor · NestJS · PostgreSQL · Prisma · Stripe ·
Tink · Firebase Auth · AWS S3 · Resend

[CTAs]  [ ● Ver demo en vivo ]   [ ▶ Vídeo (90 s) ]
[nota mono pequeña] Código privado: producto comercial con credenciales
                    en producción. Demo disponible en la web.
```

- La nota de "código privado" convierte una carencia (no hay repo público) en señal de seriedad.
- `[ Ver demo en vivo ]` → `[PLACEHOLDER: URL pública del frontend de Emite en Render]`.
- El ✦ y el claim aparecen aquí y SOLO aquí.

### 5.3 // 02 · Más proyectos

Grid de 3 tarjetas iguales (1 columna en móvil). Misma anatomía reducida: REF + nombre + una frase de problema + 3-4 datos + chips + enlaces.

**Hamparo — `REF: PRJ-2026-002 · ANDROID`**
> App Android nativa construida con arquitectura limpia de referencia: MVVM con inyección de dependencias.
> Datos: Kotlin · Jetpack Compose · Hilt · Retrofit · Room.
> Enlaces: `[ Repositorio ]` → github.com/EduuMR73/[PLACEHOLDER repo hamparo]

**Super Basket League — `REF: PRJ-2026-003 · JUEGO`**
> Juego de baloncesto arcade 2D con motor de físicas propio.
> Datos: 4 modos de juego · 12 personajes · 3 equipos temáticos · récords persistentes en JSON.
> Chips: Python 3.12 · Pygame.
> Enlaces: `[ Repositorio ]` → github.com/EduuMR73/super-basket-league · `[ ▶ Vídeo ]` (sbl-demo.mp4)

**Pokédex Interactiva — `REF: PRJ-2025-004 · ANDROID`**
> Cliente de API REST con UI declarativa y estado reactivo.
> Datos: Jetpack Compose · MVVM · StateFlow · Coil · SharedPreferences.
> Enlaces: `[ Repositorio ]` → github.com/EduuMR73/[PLACEHOLDER repo pokédex]

**Cierre de sección (firma):**
```
────────────────────────────────────────────────
TOTAL ······· 4 productos · 3 plataformas · 1 en producción
```

### 5.4 // 03 · Trayectoria

Dos columnas (apiladas en móvil): EXPERIENCIA | FORMACIÓN. Timeline con hairlines, fechas en mono.

**EXPERIENCIA** (solo lo relevante para IT; lo demás vive en el CV):
1. **La Tosta Marketing y Web** — Prácticas FCT · feb–may 2026
   Desarrollo web con WordPress, SEO técnico e integración de herramientas de IA en flujos de trabajo reales de agencia.
2. **Ayuntamiento de Arcos de la Frontera** — abr–may 2025
   Diseño y estructuración de bases de datos para la administración local.
3. Línea breve final en `--text-secondary`: *Además: 4 años de experiencia laboral previa en administración y eventos — el contexto de negocio detrás de Emite.* ← esto convierte el pasado no-IT en un activo, sin darle espacio de timeline.

**FORMACIÓN** (nivel 1 — titulaciones oficiales):
1. **Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)** — IES Rafael Alberti · 2024–2026 · *TFG: Emite (ver arriba)*
2. **Técnico Superior en Administración y Finanzas** — [PLACEHOLDER centro · años]

**CERTIFICACIONES** (nivel 2 — visualmente más pequeño, chips o lista compacta; jamás mezclado con lo anterior):
- Ciberseguridad — BIG School · 2026
- SEO para IA — BIG School · 2026
- Agentes de IA — BIG School · 2026
- Cursos homologados — CSIF

### 5.5 // 04 · Stack

4 grupos, **máximo ~7 ítems por grupo** (regla anti-inflado: si no podrías responder preguntas de entrevista sobre ello, fuera).

- **Frontend:** Angular · TypeScript · Ionic · Capacitor · HTML/CSS
- **Backend:** NestJS · Node.js · PostgreSQL · Prisma · REST APIs
- **Android:** Kotlin · Jetpack Compose · MVVM · Hilt · Room
- **Herramientas e integraciones:** Git · Stripe · Firebase · AWS S3 · Docker [PLACEHOLDER: confirmar si lo dominas o se quita] · IA aplicada (OCR, agentes)

Presentación: chips mono sobre `--bg-surface`, sin barras de progreso ni porcentajes (mienten siempre), sin iconos de colores ajenos a la paleta.

### 5.6 // 05 · Contacto

```
[H2]      ¿Hablamos?
[párrafo] Busco mi primera posición como desarrollador full-stack o
          multiplataforma. Si encaja, respondo rápido.

[email grande, champán, mono]   [PLACEHOLDER: email]   ← mailto + botón copiar
[fila]   [ Descargar CV (PDF) ]  [ GitHub ]  [ LinkedIn ]
```

- El email se muestra como texto plano clicable + icono de copiar (JS: `navigator.clipboard`). Sin formularios: un formulario sin backend en GitHub Pages es otra promesa rota.
- CV: el PDF **sin foto** (`assets/cv/CV-Eduardo-Moreno.pdf`).

### 5.7 Footer

```
EM · Eduardo Moreno — Hecho a mano con HTML, CSS y JS. Sin frameworks: no hacían falta.
© 2026 · [GitHub] [LinkedIn]
```

La frase del footer es el último guiño de criterio técnico.

---

## 6. Responsive

- Breakpoints: `360px` (mínimo soportado), `768px`, `1024px`.
- Hero: stats pasan de fila a columna 3×1 en < 480px.
- Emite case study: doble columna → apilado (media arriba, ficha abajo) en < 900px.
- Grid de proyectos: 3 → 1 columnas.
- Trayectoria: 2 → 1 columnas.
- QA obligatorio en 360px: ningún texto truncado con ellipsis, ningún overflow horizontal (lección Jesús).

## 7. Accesibilidad (suelo de calidad, no opcional)

- Contraste AA: texto cuerpo `#F2F0EB` sobre `#161616` ✅; champán `#E8C96D` solo en texto ≥ 18px o elementos no textuales; verificar todo con contrast checker en QA.
- `:focus-visible` con outline champán 2px en TODOS los interactivos.
- `prefers-reduced-motion: reduce` → desactiva reveals, count-up (muestra valor directo) y autoplay.
- `alt` descriptivo en todas las imágenes; `aria-label` en botones de icono.
- Landmarks: `header / nav / main / footer`; skip-link "Saltar al contenido".
- HTML `lang="es"`.

## 8. SEO y compartibilidad (donde enterramos a la competencia)

```html
<title>Eduardo Moreno — Desarrollador Full-Stack · Creador de Emite</title>
<meta name="description" content="Desarrollador multiplataforma (DAM) en Cádiz.
Creador de Emite, SaaS de facturación con Verifactu, Stripe y Open Banking.
Angular, NestJS, PostgreSQL, Kotlin.">
<link rel="canonical" href="https://eduumr73.github.io/">

<meta property="og:type" content="website">
<meta property="og:title" content="Eduardo Moreno — Construyo productos que facturan">
<meta property="og:description" content="Full-stack: Angular · NestJS · PostgreSQL · Kotlin. Creador de Emite, SaaS de facturación en producción.">
<meta property="og:image" content="https://eduumr73.github.io/assets/img/og-image.png">
<meta property="og:url" content="https://eduumr73.github.io/">
<meta property="og:locale" content="es_ES">
<meta name="twitter:card" content="summary_large_image">
```

- **og-image.png (1200×630):** fondo carbón, "Eduardo Moreno" en Plus Jakarta 800 blanco, "Construyo productos que facturan." con *facturan* en champán, monograma EM. Se genera como HTML→captura o SVG→PNG en la fase F7.
- **JSON-LD** `Person` (name, jobTitle "Full-Stack Developer", url, sameAs: GitHub + LinkedIn) + `SoftwareApplication` para Emite.
- `robots.txt` (allow all + sitemap) y `sitemap.xml` (una URL).
- Tras publicar: dar de alta en Google Search Console y pedir indexación (manual, lo hace Eduardo).

## 9. Performance (presupuesto)

| Recurso | Presupuesto |
|---|---|
| HTML | ≤ 40 KB |
| CSS | ≤ 30 KB |
| JS | ≤ 8 KB |
| Fuentes | ≤ 6 ficheros woff2 |
| Imágenes above-the-fold | ≤ 200 KB total |
| Cada vídeo | ≤ 8 MB, `preload="none"` + poster |
| **Lighthouse (móvil)** | **Performance ≥ 95 · A11y ≥ 95 · SEO = 100** |

## 10. Plan de ejecución por fases (para Claude Code)

> Convención: una fase = una sesión = un commit (o pocos). Cada fase tiene criterios de aceptación; no se pasa a la siguiente sin cumplirlos. Pasar este documento completo como contexto en cada sesión.

**F0 — Repo y esqueleto** ·
Crear repo `EduuMR73.github.io`, estructura de §3.1, `index.html` con las 7 secciones vacías y landmarks, `styles.css` con TODOS los tokens de §2, fuentes conectadas, favicon SVG.
✅ Acepta: la página despliega en GitHub Pages, fondo carbón, fuentes cargan, HTML valida (W3C).

**F1 — Nav + Hero** ·
Implementar §5.0 y §5.1 completos, incluyendo stats con valores en HTML y count-up progresivo.
✅ Acepta: hero idéntico al copy del plan; con JS desactivado las stats muestran los valores correctos; responsive 360px OK.

**F2 — Caso de estudio Emite** ·
Implementar §5.2 con poster del vídeo (el mp4 puede llegar después), capturas WebP, chips, CTAs.
✅ Acepta: layout 60/40 → apilado en 900px; ningún enlace a `#` (si falta la URL de demo, el botón no se renderiza todavía).

**F3 — Grid de proyectos + línea TOTAL** · §5.3.
✅ Acepta: 3 tarjetas consistentes, línea TOTAL con estilo factura, enlaces a repos reales verificados.

**F4 — Trayectoria + Stack** · §5.4 y §5.5.
✅ Acepta: jerarquía visual clara titulaciones vs certificaciones; máx. 7 chips por grupo.

**F5 — Contacto + Footer** · §5.6 y §5.7, botón copiar email con feedback ("Copiado ✓").
✅ Acepta: mailto funciona, clipboard funciona, CV descarga.

**F6 — Motion + pulido** ·
Reveals con IntersectionObserver, nav activa por scroll, hovers, `prefers-reduced-motion`.
**Animación de entrada del hero (secuencia única al cargar, duración total ≈ 1,2 s):**
1. `t=0ms` — badge "● Disponible para trabajar": fade + rise (`translateY(8px) → 0`, 300ms)
2. `t=200ms` — línea 1 del H1 ("Construyo productos"): fade + rise (`translateY(16px) → 0`, 400ms)
3. `t=350ms` — línea 2 del H1 ("que facturan."): igual que la línea 1
4. `t=600ms` — subrayado champán de "facturan": se dibuja de izquierda a derecha (`scaleX(0) → 1`, transform-origin left, 350ms ease-out)
5. `t=700ms` — párrafo + CTAs: fade + rise (400ms)
6. `t=850ms` — stats: fade + arranca el count-up (≈ 600ms)
Implementación: CSS animations con `animation-delay` (sin JS salvo el count-up). Estado inicial oculto SOLO dentro de `prefers-reduced-motion: no-preference`: sin JS y/o con reduced-motion, todo visible y estático desde el primer frame.
✅ Acepta: con reduced-motion activado no hay ninguna animación y el hero se ve completo de inmediato; con JS desactivado las stats muestran sus valores; nada parpadea (sin FOUC); la secuencia solo ocurre una vez por carga, no al volver a hacer scroll arriba.

**F7 — SEO + OG + JSON-LD** · §8 completo, generar og-image.png, robots, sitemap.
✅ Acepta: la URL pegada en https://www.opengraph.xyz (o similar) muestra preview correcta con imagen.

**F8 — QA final** · Checklist §11 completa + Lighthouse.
✅ Acepta: presupuestos de §9 cumplidos.

**Prompt tipo para cada sesión de Claude Code:**
```
ÁMBITO: portfolio estático (repo EduuMR73.github.io). NO es Emite:
HTML/CSS/JS plano, sin frameworks.
Contexto: lee PLAN_PORTFOLIO.md completo (está en la raíz del repo).
Tarea: ejecuta la fase F[n] exactamente como define el plan, §[x].
No improvises copy ni colores: todo está en el documento.
Al terminar: verifica los criterios de aceptación de la fase y lista
cualquier desviación antes de commitear. Commit en español: feat(...)
```

## 11. Checklist QA pre-publicación

- [ ] Cero enlaces a `#` o rotos (verificar los 4 repos + demo + CV + mailto)
- [ ] Cero textos truncados con "…" en 360 / 768 / 1024 / 1440
- [ ] Sin overflow horizontal en 360px
- [ ] Stats correctas sin JS (desactivar JS y mirar)
- [ ] Lighthouse móvil: P ≥ 95 · A11y ≥ 95 · SEO 100
- [ ] Preview OG correcta (opengraph.xyz) y al compartir en LinkedIn
- [ ] Contraste AA verificado en todos los pares color/fondo
- [ ] `prefers-reduced-motion` respetado
- [ ] Vídeos: `preload="none"`, poster visible, ≤ 8 MB
- [ ] Favicon visible en pestaña
- [ ] HTML validado (validator.w3.org)
- [ ] Probado en Chrome, Firefox y un Android real (el tuyo)
- [ ] Search Console: propiedad verificada + sitemap enviado
- [ ] Leído el copy completo en voz alta una vez (caza erratas)

## 12. Fuera de alcance v1 (lista cerrada para no dispersarse)

- Versión EN (v2: duplicar `index.html` → `/en/` + `hreflang`)
- Blog / artículos
- Dark/light toggle (la web ES oscura; es identidad, no preferencia)
- Formulario de contacto con backend
- Dominio propio (si algún día se compra, GitHub Pages lo soporta con CNAME sin tocar nada)
- Analytics (si se quiere más adelante: Plausible/GoatCounter, nunca GA4 por peso y cookies)

## 13. Pendientes que dependen de Eduardo (bloqueantes marcados)

| # | Ítem | Bloquea fase |
|---|---|---|
| 1 | **Email público de contacto** (¿crear uno tipo eduardo.moreno.dev@gmail.com o usar el personal?) | F5 ⛔ |
| 2 | **URL pública del frontend de Emite** en Render (la demo en vivo) | F2 ⛔ |
| 3 | Exportar vídeos Clipchamp a mp4 H.264 ≤ 8 MB (Emite ~90s, SBL ~30-60s) + elegir frame de poster | F2/F3 |
| 4 | 3-4 capturas de Emite en buena resolución (dashboard, factura, vista móvil) → convertir a WebP | F2 |
| 5 | Confirmar nombres exactos de los repos de Hamparo y Pokédex | F3 |
| 6 | Centro y años del título de Administración y Finanzas | F4 |
| 7 | ¿Docker se queda en el stack o se quita? | F4 |
| 8 | ¿Foto personal en la web? (recomendación: no en v1 — el CV con foto ya existe para quien la pida; reabrir en v2) | — |
| 9 | URLs exactas de LinkedIn | F5 |

---
*Última actualización: 11/06/2026 · Documento vivo: las decisiones nuevas se añaden aquí, nunca se improvisan en el código.*
