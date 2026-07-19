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
    version: "v0.2.0",
    codename: "HUD & HP",
    date: "",
    status: "soon",
    file: "",
    size: "",
    notes: "En desarrollo: sistema de HP y barra de vida, animación de muerte del foot soldier y alcance/daño por tortuga.",
    highlights: ["Barra de vida", "Muerte enemiga", "Stats por personaje"]
  }
];
