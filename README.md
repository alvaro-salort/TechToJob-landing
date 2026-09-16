# TechToJob — Landing Page Oficial (Torneo #2)

> **TechToJob no es un tablón de anuncios, es una comunidad.**  
> En un portal de empleo mandas el CV y desapareces entre cientos. Aquí estás dentro, construyes cosas, y te conocen antes de que haya una vacante.

Landing page oficial desarrollada para el **Torneo #2 de TechToJob** bajo la premisa de unir a desarrolladores y empresas tech en un entorno directo, sin filtros ATS automáticos ni promesas falsas.

---

## 🎨 Identidad Visual y Estilo Halftone

- **Estética Halftone**: Texturas sutiles de semitono impreso y matriz de puntos digital que aportan carácter editorial tech sin sobrecargar. Diseñado para ser inmediatamente legible tanto para desarrolladores como para recruiters y perfiles no-tech.
- **Paleta oficial**:
  - `#2f3436` (Charcoal oscuro / Base principal)
  - `#84c0bf` (Teal suave / Acento y botones)
  - `#ffffff` (Blanco)
  - *Cumplimiento estricto de accesibilidad WCAG AA*: el verde `#84c0bf` nunca se utiliza como texto pequeño sobre fondo blanco; se reserva para botones con texto oscuro `#2f3436`, insignias y acentos estructurales.
- **Tipografía oficial**: [Sora (Google Fonts)](https://fonts.google.com/specimen/Sora) con pesos 400, 600 y 700 optimizada con `next/font/google`.

---

## 🖐️ Animación Hero

El Hero incorpora una animación scroll-driven nativa

- Conforme el usuario hace scroll hacia el hero, las manos se desplazan con suavidad hacia el centro encuadrando y señalando directamente al botón principal de **Entrar a la comunidad en Discord**.
- Implementado mediante `requestAnimationFrame` y transformaciones CSS por hardware para garantizar 60fps/120fps tanto en escritorio como en móviles.

---

## 🧩 Secciones Desarrolladas

1. **Header / Navbar**: Logotipo oficial de TechToJob en SVG, navegación por anclas semánticas y botón de acción directa a Discord.
2. **Hero**: Propuesta de valor en 3 segundos, un único `<h1>` semántico, subtítulo directo y el botón central enmarcado por las manos interactivas.
3. **Cómo funciona**: Los 4 pasos del recorrido (Entras al Discord → Construyes y colaboras → Te ven en acción → Surge el contacto directo).
4. **Para Talento**: Garantías sin filtros automáticos, espacio para juniors y seniors, 100% gratuito para candidatos y maqueta visual de tarjeta de perfil técnico.
5. **Para Empresas**: Evaluación práctica antes de contratar, observación de proyectos reales y feedback directo de tech leads.
6. **Torneos**: Retos técnicos comunitarios abiertos con criterios públicos (con mención destacada al propio Torneo #2).
7. **Networking & Comunidad**: Canales especializados por disciplina (frontend, backend, ui/ux, mobile) y ofertas compartidas internamente.
8. **Testimonios**: 5 tarjetas con perfiles verificables, rol, empresa y enlace al perfil de LinkedIn.
9. **Noticias**: 3 artículos de actualidad maquetados con fecha, categoría y resumen.
10. **Newsletter**: Franja de suscripción pre-footer con valor concreto, periodicidad semanal (lunes), sin spam y botón descriptivo.
11. **Cierre**: Último pitch antes del footer invitando a unirse al servidor.
12. **Footer**: Enlaces organizados en 4 columnas (Talento, Empresas, Comunidad, Legal), redes sociales verificadas y créditos legales.

---

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components y Client Components aislados).
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (estricto).
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) con clases de diseño táctil y sombras duras de estilo cómic/print.
- **Iconografía**: [@tabler/icons-react](https://tabler.io/icons) (iconos limpios y ligeros).
- **Organización del código**:
  - Código, nombres de componentes, variables y funciones en **Inglés**.
  - Textos de la web completamente desacoplados en `messages/es.json` para facilitar la internacionalización inmediata.

---

## 🔍 SEO y Rendimiento

- Metadata API de Next.js (`title.template: %s | TechToJob`, `metadataBase`, `canonical`, `viewport`).
- Open Graph y Twitter Cards completas con tarjeta 1200×630.
- Schema estructurado JSON-LD de tipo `Organization`.
- Semántica HTML limpia: un único `<h1>`, jerarquía estricta `<h2>` y `<h3>`, elementos `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`.
- Textos alternativos descriptivos en todas las imágenes.


---

## 📜 Licencias y Fuentes de Recursos

- **Tipografía**: [Sora](https://fonts.google.com/specimen/Sora) (SIL Open Font License 1.1).
- **Iconografía**: [Tabler Icons](https://github.com/tabler/tabler-icons) (MIT License, libre para uso comercial).
- **Logos e Ilustraciones de Manos**: Facilitados oficialmente por la organización de TechToJob para el Torneo #2.