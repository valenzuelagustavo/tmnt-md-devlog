# TMNT 1989 Arcade a Mega Drive - Devlog 🐢🎮🍕

![TMNT Banner](https://via.placeholder.com/800x200/228B22/FFFFFF?text=TMNT+1989+Arcade+-+Mega+Drive+Devlog)

Este repositorio contiene el código fuente de la página web oficial del **Devlog** dedicado a documentar el desarrollo del port del clásico arcade *Teenage Mutant Ninja Turtles* (Konami, 1989) para la consola Sega Mega Drive / Genesis.

## 📖 Sobre el Proyecto

El objetivo de este proyecto web es compartir actualizaciones, artículos técnicos y avances del desarrollo del port no oficial del arcade de las Tortugas Ninja para la consola de 16 bits de Sega. 

El sitio web servirá como un diario de desarrollo donde se explicarán los desafíos técnicos de adaptar un juego de arcade a las limitaciones del hardware de Mega Drive, incluyendo:
- Gestión de paletas de colores (VDP).
- Manejo de sprites y límite de tiles en pantalla.
- Rutinas en ensamblador Motorola 68000 y el uso de SGDK.
- Adaptación del sonido a los chips YM2612 y SN76489.

## ✨ Características del Sitio Web

- **Artículos Técnicos (Deep Dives):** Explicaciones detalladas sobre cómo se logró emular o adaptar la lógica del arcade original.
- **Galería Multimedia:** Capturas de pantalla, GIFs y videos mostrando el progreso del juego funcionando en emuladores y hardware real.
- **Roadmap / Estado del Proyecto:** Una línea de tiempo interactiva con los hitos alcanzados (niveles completados, jefes programados, etc.).
- **Newsletter:** Suscripción para recibir notificaciones de nuevas actualizaciones del port.
- **Diseño Retro:** Interfaz de usuario inspirada en los años 90 y los menús de Mega Drive (scanlines, tipografías pixeladas, colores vibrantes).

## 🛠️ Stack Tecnológico (Web)

El sitio web está construido utilizando tecnologías modernas pero con un enfoque en la velocidad y la accesibilidad:

- **Framework:** [Astro](https://astro.build/) / [Next.js] (Elige tu favorito para generación de sitios estáticos).
- **Estilos:** Tailwind CSS con temas personalizados retro.
- **Tipografía:** Fuentes pixel art alojadas localmente.
- **Hosting:** Vercel / GitHub Pages.

## 🚀 Instalación y Despliegue Local

Si deseas correr este sitio web de devlog en tu entorno local para modificarlo o contribuir:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/tmnt-megadrive-devlog.git
   cd tmnt-megadrive-devlog
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. Abre `http://localhost:3000` en tu navegador para ver la página en vivo.

## 📝 Estructura de Contenidos (Markdown)

Los posts del devlog se gestionan de forma estática utilizando archivos Markdown (`.md` / `.mdx`). Para agregar una nueva entrada al devlog, simplemente crea un archivo en la carpeta `src/content/devlog/`:

```markdown
---
title: "Adaptando la paleta de colores de April O'Neil"
date: 2026-08-25
author: "Dev"
tags: ["VDP", "Gráficos", "SGDK"]
---
Contenido del post aquí...
```

## 🤝 Contribuciones

Este repositorio es para la **página web del devlog**. Si deseas contribuir al código fuente del port del juego (C/Assembly), por favor dirígete al repositorio principal del juego [enlace al repo del juego]. 

Para mejoras en el sitio web (correcciones de estilo, traducciones o accesibilidad), los *Pull Requests* son bienvenidos.

## 📜 Licencia

El código fuente de este sitio web está bajo la licencia [MIT](LICENSE). 
*Nota: Teenage Mutant Ninja Turtles es propiedad de Viacom/Nickelodeon. El juego original de 1989 fue desarrollado por Konami. Este es un proyecto de fans sin fines de lucro (Fan-game/Port) y no está afiliado con las empresas mencionadas.*

---
**Cowabunga!** 🍕🐢