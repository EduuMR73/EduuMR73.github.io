# ✦ Portfolio — Eduardo Moreno

**[→ Ver en vivo: eduumr73.github.io](https://eduumr73.github.io)**

Portfolio personal de desarrollador full-stack. Una sola página, construida a mano con **HTML, CSS y JavaScript vanilla** — sin frameworks, sin librerías, sin dependencias. No necesitaba más.

> *"Construyo productos que facturan."*

## ✨ Qué hay dentro

- **Caso de estudio de [Emite](https://emite-app.onrender.com)** — SaaS de facturación en producción: 11 módulos, 249 tests unitarios, cumplimiento Verifactu.
- **Grid de proyectos** con demos en vídeo (patrón fachada: imagen + play, el vídeo solo se descarga si lo pides) y lightbox con `<dialog>` nativo.
- **Identidad propia:** paleta Carbón + Champán, tipografías Plus Jakarta Sans y JetBrains Mono, y una estética de documento fiscal — cada proyecto con su `REF:` como una serie de facturación.
- **SEO completo:** Open Graph, JSON-LD, sitemap y robots.
- **Accesibilidad:** contraste AA, navegación por teclado, `prefers-reduced-motion` respetado.

## 📊 Lighthouse (móvil, throttling 4G lento)

| Performance | Accessibility | SEO |
|:-----------:|:-------------:|:---:|
| **95** | **100** | **100** |

## 🛠️ Stack

- **HTML5** semántico
- **CSS3** — custom properties, grid y flexbox, cero `!important`
- **JavaScript vanilla** — fachadas de vídeo, lightbox, animación de stats
- **GitHub Pages** — hosting y despliegue

## 📂 Estructura

```
├── index.html          # Toda la página
├── css/
│   └── styles.css      # Estilos completos
├── js/
│   └── main.js         # Interacciones
├── assets/
│   ├── img/            # Posters, miniaturas y covers (WebP)
│   ├── video/          # Demos comprimidas (≤ 8 MB, faststart)
│   └── cv/             # CV descargable (PDF)
├── sitemap.xml
└── robots.txt
```

## 🚀 Ejecutarlo en local

No hay build, no hay `npm install`. Clona y abre:

```
git clone https://github.com/EduuMR73/EduuMR73.github.io.git
cd EduuMR73.github.io
# Abre index.html en el navegador, o sirve la carpeta:
python -m http.server 8000
```

## 👤 Autor

**Eduardo Moreno Rodríguez** — Desarrollador Full-Stack · Técnico Superior DAM.

GitHub: [@EduuMR73](https://github.com/EduuMR73) · LinkedIn: [/in/eduumr73](https://www.linkedin.com/in/eduumr73) · Web: [eduumr73.github.io](https://eduumr73.github.io)
