# Capturas y gifs del devlog

Dejá acá las imágenes que aparecen en las entradas del devlog. Cada entrada
declara sus archivos en el campo `media` de `data/devlog.js`. Mientras el
archivo no exista, el sitio muestra un placeholder punteado con el nombre
esperado; apenas subís el archivo con **ese nombre exacto**, la imagen
aparece sola (no hay que tocar código).

## Archivos que el sitio ya está esperando

| Archivo                        | Entrada del devlog                          |
|--------------------------------|---------------------------------------------|
| `2026-07-22_voice_over.gif`        | Voz de arranque + globo "Attack!!"      |
| `2026-07-22_foot_soldier_door.gif` | Foot soldier rompiendo la puerta        |
| `2026-07-22_explosion.gif`         | Muerte del foot soldier con explosión   |
| `2026-07-21_hud.png`           | HUD: barra de vida, vidas y puntaje         |
| `2026-07-19_jump-kick.gif`     | Jump kick y el saltito del especial         |
| `2026-07-19_combat.gif`        | Oleada de foot soldiers, IA de grupo        |
| `2026-07-18_fire.gif`          | Fuego por streaming de tiles                |
| `2026-07-15_scroll.gif`        | Scroll del nivel (ventana circular)         |

## Cómo agregar o cambiar un slot

En `data/devlog.js`, dentro de la entrada, sumá o editá el array `media`:

```js
media: [
  { src: "mi-captura.gif", caption: "Texto que va debajo de la imagen" }
],
```

- `src`  → nombre del archivo dentro de esta carpeta.
- `caption` → epígrafe (opcional).

Si no querés un slot, borrá ese objeto del array (o el campo `media` entero).

## Consejos para los gifs

- Tamaño de captura nativo de la Mega Drive: 320×224 (o 256×224). Mantener esa
  proporción hace que el pixel-art se vea nítido (el CSS usa
  `image-rendering: pixelated`).
- Para que pesen poco: recortá a la zona de acción, 2–4 segundos, ~12–15 fps.
- PNG para pantallas fijas (HUD, menús), GIF para animaciones.
