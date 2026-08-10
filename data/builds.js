/*
 * BUILDS / DESCARGAS — ROMs compiladas del port.
 * ------------------------------------------------------------------
 * Cómo publicar una build nueva:
 *   1. Copiá la .bin/.md compilada a la carpeta  web/roms/
 *   2. Agregá un bloque ACÁ ARRIBA (el más nuevo primero) con el
 *      nombre exacto del archivo en "file".
 *   3. Corré  ./deploy.sh  (o subí la carpeta a la rama gh-pages).
 *
 * "size" es opcional: si lo dejás vacío el sitio lo calcula solo al
 * cargar (hace un HEAD al archivo). "status" puede ser "available"
 * o "soon" (muestra el botón deshabilitado como "Próximamente").
 *
 * Los archivos de ejemplo de abajo son PLACEHOLDERS — reemplazalos
 * por tus builds reales.
 */

window.BUILDS = [
    {
    version: "v0.2.9",
    codename: "Música! Fire!",
    date: "2026-08-09",
    status: "available",
    file: "tmnt-md_v0.2.9.bin",
    size: "",
    notes: "Agregada musica definitiva del nivel 1 (Fire!). Intentos de intro.",
    highlights: ["Intro", "Música", "Graficos"]
    },
    {
    version: "v0.2.5",
    codename: "Rapto de April",
    date: "2026-08-01",
    status: "available",
    file: "tmnt-md_scene1_v0.2.5.bin",
    size: "",
    notes: "Aparición de Shredder y rapto de April. Voice over y globito de dialogo para Rocksteady.",
    highlights: ["Animaciones", "Shredder", "Graficos"]
    },
    {
    version: "v0.2.4",
    codename: "Nuevo nivel, Boss",
    date: "2026-07-28",
    status: "available",
    file: "tmnt-md_scene1_v0.2.4.bin",
    size: "",
    notes: "Nueva fase de la Scene 1 agregadas, Jefe de nivel. Nuevas animaciones.",
    highlights: ["Animaciones", "Fuego animado", "Sonidos", "Graficos"]
    },
    {
    version: "v0.2.3",
    codename: "Zonas definidas",
    date: "2026-07-26",
    status: "available",
    file: "tmnt-md_scene1_v0.2.3.bin",
    size: "",
    notes: "Zonas de spawneo definidas, detalles graficos, efectos de sonido.",
    highlights: ["Animaciones", "Fuego animado", "Sonidos", "Boss"]
    },
    {
    version: "v0.2.2",
    codename: "¡Escena Shredder!",
    date: "2026-07-25",
    status: "available",
    file: "tmnt-md_scene1_v0.2.2.bin",
    size: "",
    notes: "Nuevas animaciones, nuevo enemigo, escena de final del nivel.",
    highlights: ["Animaciones", "Puertas que se rompen", "Dos jugadores"]
    },
    {
    version: "v0.2.1",
    codename: "Más enemigos. Atraviesan puertas.",
    date: "2026-07-23",
    status: "available",
    file: "tmnt-md_scene1_v0.2.1.bin",
    size: "",
    notes: "Los enemigos atraviesan puertas y spawnean en el nivel.",
    highlights: ["Animaciones", "Puertas que se rompen", "Dos jugadores"]
    },
    {
    version: "v0.2.0",
    codename: "HUD & HP",
    date: "2026-07-20",
    status: "available",
    file: "tmnt-md_scene1_v0.2.0.bin",
    size: "",
    notes: "Sistema de HP y barra de vida, animación de muerte del foot soldier y alcance/daño por tortuga.",
    highlights: ["Barra de vida", "Muerte enemiga", "Stats por personaje"]
  },
  {
    version: "v0.1.0",
    codename: "Scene 1 — Fire!",
    date: "2026-07-19",
    status: "available",
    file: "tmnt-md_scene1_v0.1.0.bin",
    size: "",
    notes: "Primer nivel jugable completo: intro SEGA, selección de tortuga, Escena 1 con scroll y fuego animado, oleadas de foot soldiers con IA de grupo, combos y modo 2 jugadores cooperativo.",
    highlights: ["1P / 2P coop", "23 foot soldiers", "Fuego por streaming de tiles"]
  },
  {
    version: "v0.3.0",
    codename: "Nivel completo con musica",
    date: "",
    status: "soon",
    file: "",
    size: "",
    notes: "Proximamente: Animación completa de foot soldiers, ubicaciones de los enemigos acorde al arcade. Música.",
    highlights: ["1P / 2P coop", "Todos los foot soldiers", "Nivel completo"]
  },

];
