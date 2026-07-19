# Devlog web — TMNT Arcade (Port Mega Drive)

Sitio estático para documentar el desarrollo del port y publicar las ROMs
compiladas. Pensado para **GitHub Pages**. Sin build step, sin dependencias:
son HTML/CSS/JS planos.

```
web/
├─ index.html            
├─ assets/
│  ├─ css/style.css      ← estética arcade / CRT
│  └─ js/app.js          ← render del devlog + descargas 
├─ data/
│  ├─ devlog.js          ← LAS ENTRADAS DEL DEVLOG 
│  └─ builds.js          ← LAS ROMs PUBLICADAS 
├─ roms/                 ← acá van los .bin/.md compilados
├─ deploy.sh            ← publica a la rama gh-pages
└─ README.md
```

## Ver la web localmente

Abrir `index.html` directo en el navegador funciona (los datos se cargan como
`<script>`, no por `fetch`, así que no hay problemas de CORS). Si querés que el
cálculo automático del tamaño de las ROMs funcione igual que en producción,
levantá un server chico:

```bash
cd web
python3 -m http.server 8000
# -> http://localhost:8000
```

## Agregar una entrada al devlog

Editá `data/devlog.js` y agregá un bloque **arriba de todo** (igual el sitio
ordena por fecha, más nueva primero):

```js
{
  date: "2026-07-25",        // AAAA-MM-DD (se usa para ordenar)
  part: "tarde",             // opcional: sub-etiqueta ("noche", "16–17 jul", etc.)
  title: "Título de la sesión",
  tags: ["Gameplay", "Optimización"],   // usá las categorías de DEVLOG_CATEGORIES
  body: `
Texto en **Markdown**: soporta \`código\`, **negrita**, *cursiva*,
párrafos separados por línea en blanco y > citas destacadas.
`
}
```

Categorías disponibles (para los filtros): **Motor, Gameplay, Arte, Audio,
Optimización, Infra**. Si querés otra, agregala al array `DEVLOG_CATEGORIES`.

## Publicar una build (ROM)

1. Copiá la ROM compilada a `roms/` (p. ej. `tmnt-md_scene1_v0.2.0.bin`).
2. Agregá un bloque en `data/builds.js` con el nombre exacto del archivo:

```js
{
  version: "v0.2.0",
  codename: "HUD & HP",
  date: "2026-08-10",
  status: "available",             // "available" | "soon"
  file: "tmnt-md_scene1_v0.2.0.bin",
  size: "",                        // vacío = lo calcula solo (HEAD al archivo)
  notes: "Qué trae esta build.",
  highlights: ["Barra de vida", "Muerte enemiga"]
}
```

> El `.bin` de ejemplo que viene en `roms/` es un **placeholder** — borralo
> cuando subas builds reales.

## Deploy a GitHub Pages (respetando el `.gitignore`)

La idea es que `web/` **no** ensucie tu repo de código (ni con el sitio ni con
las ROMs), así que va en `.gitignore` de `main` y se publica aparte en la rama
`gh-pages`.

1. Copiá esta carpeta `web/` a la raíz de tu repo del juego.
2. Agregá al `.gitignore` de la raíz:

   ```gitignore
   # Sitio del devlog (se publica aparte a la rama gh-pages)
   /web/
   ```

3. En `assets/js/app.js`, poné tu repo en `CONFIG.repoUrl`.
4. Publicá:

   ```bash
   cd web
   ./deploy.sh
   ```

   El script copia el sitio a un temporal, arma un commit limpio y hace
   force-push a la rama `gh-pages`. Como `web/` está ignorado en `main`, esto
   funciona igual (no depende de que la carpeta esté trackeada).

5. En GitHub: **Settings → Pages → Source = rama `gh-pages` (/root)**. La URL
   queda en `https://<usuario>.github.io/<repo>/`.

### Alternativa: sin gitignore, con GitHub Actions

Si en algún momento preferís trackear `web/` en `main` y no correr el script a
mano, se puede usar un workflow de Actions que despliegue la carpeta a Pages en
cada push. Avisá y lo agrego (`.github/workflows/pages.yml`). Con el enfoque
actual (carpeta ignorada) el camino correcto es `deploy.sh`.
"# DevLog-TMNT_Port_Megadrive" 
