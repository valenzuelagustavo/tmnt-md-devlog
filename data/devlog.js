/*
 * DEVLOG — Port TMNT: The Arcade Game (Sega Mega Drive / SGDK)
 * ------------------------------------------------------------------
 * Para agregar una entrada nueva: copiá un bloque, ponelo ARRIBA de
 * todo (el sitio ordena por fecha, más nuevo primero igual) y escribí
 * el cuerpo en Markdown normal. Las categorias disponibles estan en
 * el array CATEGORIES de abajo; usá las mismas para que los filtros
 * funcionen.
 */

window.DEVLOG_CATEGORIES = ["Motor", "Gameplay", "Arte", "Audio", "Optimización", "Infra"];

window.DEVLOG = [
  {
    date: "2026-07-22",
    part: "",
    title: "Voz de arranque, globo de diálogo y puertas que escupen enemigos",
    tags: ["Audio", "Gameplay", "Arte", "Optimización"],
    media: [
      { src: "2026-07-22_voice_over.gif", caption: "Voice over + globo \"Attack!!\" al arrancar el nivel" },
      { src: "2026-07-22_foot_soldier_door.gif", caption: "Un foot soldier rompe la puerta y entra al combate" },
      { src: "2026-07-22_explosion.gif", caption: "Muerte del foot soldier con explosión" }
    ],
    body: `
Sesión larga con tres frentes: darle voz al arranque del nivel, ampliar al foot soldier, y convertir las puertas del fondo en puntos de spawn.

**Voice over + globo "Attack!!".** El grito va como sample **PCM del driver XGM2** (recurso \`WAV attack_vo\`, resampleado a 13.3 kHz y alineado a 256 bytes), disparado con \`XGM2_playPCMEx\` en el canal PCM 2 con prioridad 15 — así suena por encima de la música del nivel (canal 1) sin que ésta lo pise. El **globo** (\`attack_bubble\`, 64x32) comparte la paleta de las tortugas (PAL1), va en posición fija de pantalla (independiente de jugador y cámara) y cicla aparecer → fijo → parpadeo → desaparecer, todo por tiempo. Se dispara TODO apenas arranca el nivel; de paso, el jugador ahora nace a 5 tiles del borde izquierdo y el primer foot soldier ya queda visible pegado al borde derecho, entrando hacia el player.

> **Lección a los golpes:** al principio no se escuchaba nada. No era el canal ni el código: el WAV venía grabado bajísimo (pico al 22%, RMS ~4.5% de la escala). En el DAC de 8 bits y con la música arriba, un sample flojo es lisa y llanamente inaudible. Se normalizó con compresión + makeup a ~24% RMS y apareció. **Regla nueva:** preparar los WAV (normalizar/comprimir) y verificar la AMPLITUD, no sólo el formato.

**Sheet ampliado + muerte con explosión.** El spritesheet del foot soldier pasó de 5 a **8 animaciones** (grilla 5x8, frames 104x104): además de idle / walk / patada / uppercut / walk-up, ahora hay **explosión**, **golpe directo** y **rotura de puerta**. rescomp detecta las filas solo — no hubo que tocar \`enemies.res\`. Al morir, el foot soldier reproduce \`ANIM_EXPLODE\` (una vez, sin loop) en vez de quedarse en idle, y se saltea el flash blanco en el golpe fatal para que se vean los colores de la explosión. El directo se sumó a la rotación de ataques al azar (misma duración e hitbox que el uppercut).

**Puertas como spawn points.** \`door_lvl_1\` (40x80) se dibuja sobre cada uno de los 3 huecos de puerta abierta del fondo (centros de mundo **429, 718, 846**, medidos sobre \`bg01_completa.png\`), compartiendo la paleta del **fondo** (PAL0) reindexada — cero líneas de paleta. **Trigger por cercanía:** cuando el player pasa, la puerta queda "armada"; en cuanto hay cupo de activos (\`MAX_ACTIVE_ENEMIES\`) se remueve el sprite y aparece un foot soldier que la ROMPE con \`ANIM_BREAK_DOOR\` (arrancando desde el 2do frame) antes de volverse un enemigo normal. Nuevo estado \`ENEMY_STATE_SPAWNING\`: sin IA ni colisión mientras rompe. Los sprites de puerta se crean/sueltan según visibilidad; peor caso en 2 jugadores medido en **~544 de 600 tiles** de sprite — entra sin tocar el presupuesto de \`SPR_initEx\`.
`
  },
  {
    date: "2026-07-20",
    part: "noche · cont.",
    title: "Ajustes del KO, escena de Game Over y bug de scroll",
    tags: ["Gameplay", "Motor"],
    body: `
Tres correcciones tras probar el HUD y la muerte.

**Frame exacto del KO.** La pose de tortuga tirada es el frame 11 (la "12a") de \`ANIM_HIT_BEHIND_2\`. Antes se reproducía la animación entera (loop off) y, como los 12 frames a FAST 7 tardan ~84 frames pero el KO dura 70, la tortuga revivía ANTES de llegar a la pose. Ahora se salta DIRECTO al frame 11 con la auto-animación apagada (\`SPR_setAutoAnimation(FALSE)\` + \`SPR_setAnimAndFrame\`) y se congela ahí; al revivir se reactiva la auto-animación.

**Escena de Game Over.** Nueva \`SCENE_GAME_OVER\` (\`showGameOver\` en \`scenes.c\`, caso en \`main.c\`). Muestra "GAME OVER" en blanco sobre negro (fuente por defecto, blanco puesto en el índice 15 de PAL0), espera ~4s o START, y reinicia desde el logo de SEGA. El nivel ahora sale a esta escena en vez de ir directo a SEGA.

**Bug de scroll heredado.** Al reiniciar tras un game over, el logo TMNT del menú aparecía corrido a la derecha. Causa: \`clearScene()\` limpiaba los planos pero NO reseteaba el scroll, y el nivel deja BG_B en \`-cameraX\`. Se agregó el reset de scroll H/V de ambos planos en \`clearScene()\`.
`
  },
  {
    date: "2026-07-20",
    part: "noche",
    title: "Contenido del HUD: barra de vida, vidas y puntaje",
    tags: ["Gameplay", "Motor"],
    media: [
      { src: "2026-07-21_hud.png", caption: "HUD en acción: barra de vida, vidas y puntaje" }
    ],
    body: `
Se llenó el marco del HUD con sus tres indicadores, estilo arcade, sin tocar el tamaño del marco: todo entra en el \`hud_1p.png\`/\`hud_2p.png\` original (72x32), en las 2 filas de tiles de interior útil.

**Distribución compacta (como el arcade).** Fila superior = "1UP" (pintado en el arte) + PUNTAJE alineado a la derecha; fila inferior = VIDAS a la izquierda + BARRA a la derecha. Nada pisa el fondo del nivel: todo queda en la franja negra superior. (Un primer intento agrandó el marco a 72x48, pero quedó demasiado alto; se volvió al 72x32 achicando la barra.)

**Barra de vida (\`hp_bar.png\`, 11 frames de 32x8).** Frame 0 = 10 barras, frame 10 = 0 barras. El arte original era 32x16; se recortó por script a 32x8 (una fila de tiles) aprovechando que los segmentos son columnas uniformes, para que quepa junto al puntaje en las 2 filas del marco. Comparte la paleta de las tortugas (PAL1). Se dibuja como **TILES en BG_A** (prioridad alta, igual que el marco), NO como sprite: no gasta presupuesto de \`SPR_initEx\` ni pelea con el layering sprite/plano. Un frame (4x1 = 4 tiles) vive en VRAM por jugador y, al recibir un golpe, se pisa con el frame siguiente vía DMA — la misma técnica de streaming que el fuego. En \`.res\` va \`NONE NONE\` para indexar cada frame directo desde ROM (\`frame N -> tile N*4\`).

**Vida / vidas / puntaje en el jugador.** \`Player\` ganó \`health\` (0..10, arranca lleno), \`lives\` (arranca en 3) y \`score\`. Cada golpe de un foot soldier resta una barra (\`damagePlayer\`); al vaciarse se pierde una vida y la barra se recarga. Matar un foot soldier suma 1 al puntaje del jugador que lo remató (se detecta la transición a \`ENEMY_STATE_DEAD\` en el bucle de colisiones de \`scenes.c\`).

**Vidas y puntaje como TEXTO.** Fuente por defecto (\`VDP_drawText\`) sobre BG_A. Se dibujan en **PAL3** aprovechando que la paleta "flash" es blanco puro en todos sus índices → texto blanco sin gastar una línea propia. El HUD cachea lo último dibujado y solo reescribe VRAM cuando algo cambia.

**Knockout al perder una vida.** Cuando se agota la barra, la tortuga entra en \`STATE_KO\` y muestra el último frame de \`ANIM_HIT_BEHIND_2\` (la pose tirada) durante \`PLAYER_KO_FRAMES\` (~1.2s) antes de revivir. Al revivir se recarga la barra y arranca la invulnerabilidad de respawn.

**Parpadeo sólo al revivir.** Se separó la invulnerabilidad "lógica" (\`invincible\`, sin efecto visual) del parpadeo (\`blinkTimer\`). Un golpe normal ya NO hace parpadear al sprite (queda visible durante sus i-frames); el parpadeo clásico quedó reservado para el respawn tras perder una vida.

**Game over.** Al llegar a 0 vidas se muestra la pose de knockeado y recién ahí se corta el nivel (\`isPlayerGameOver\` devuelve el flag \`gameOver\`, que se activa al final del KO).
`
  },
  {
    date: "2026-07-19",
    part: "noche · cont.",
    title: "Pared diagonal del final del nivel",
    tags: ["Gameplay", "Motor"],
    body: `
Comparando contra el arcade original apareció un bug de colisión: al final del nivel hay un hueco de escalera / * fire escape * dibujado en el fondo ** en perspectiva ** (diagonal), pero el límite de movimiento era una línea vertical recta.Resultado: en las lanes de atrás(más cerca del fondo) el personaje podía caminar "sobre" la pared dibujada, quedando parado en el aire encima de la estructura.

** Solución:** se midió el borde sólido real directamente sobre \`bg01_completa.png\` (un script en Python que detecta dónde el color de piso deja de ser piso). Dio un punto de referencia en cada extremo de la lane — X≈1308 en la lane del fondo (Y=142) y X≈1352 en la del frente (Y=200) — y con esos dos puntos se **interpola linealmente** el tope de X real según la profundidad de cada personaje, en vez de un límite fijo.

Se aplicó tanto al jugador (\`levelEndWallX\` en \`player.c\`) como a los foot soldiers (\`enemyMaxX\` en \`enemy.c\`): persecución, lunge del kick, knockback y separación de grupo. Ya nadie cruza la pared, en ninguna lane.
`
  },
  {
    date: "2026-07-19",
    part: "noche",
    title: "Movilidad en el aire y piso más amplio",
    tags: ["Gameplay", "Motor"],
    body: `
Ajuste fino de fidelidad al arcade, a partir de revisar el original.

**Salto con movimiento en Y.** En el arcade, saltando la tortuga se puede seguir reposicionando también en profundidad (arriba/abajo), no solo en X. Antes el salto solo dejaba mover X porque la física usaba directamente \`p->y\` para simular el arco vertical. El refactor separó la altura del salto a un campo nuevo, **\`jumpZ\`** (offset puramente visual que se resta al dibujar), dejando \`p->y\` libre para representar siempre la lane real de profundidad, igual en el aire que caminando.

Efecto colateral bueno: el Y-sorting (\`SPR_setDepth\`) y el alcance del jump kick quedaron más simples y correctos — ya no hace falta ningún caso especial para el estado de salto.

**Piso más ancho.** Los límites de la lane (\`BOUND_LANE_TOP/BOTTOM\`) se ampliaron 1 tile (8 px) en cada extremo → 142/200, replicando el ajuste en \`ENEMY_LANE_TOP/BOTTOM\` para no dejar franjas de la vereda sin cobertura de la IA.
`
  },
  {
    date: "2026-07-19",
    part: "tarde",
    title: "Recalibración del salto y el especial",
    tags: ["Gameplay"],
    media: [
      { src: "2026-07-19_jump-kick.gif", caption: "Jump kick con ímpetu y el saltito del especial" }
    ],
    body: `
Sesión de *game feel* sobre el control de las tortugas.

**Salto por fases.** La animación ya no corre sola: se apaga la auto-animación del sprite (\`SPR_setAutoAnimation\`) y los frames se eligen a mano según la física — frame 0 en la subida, loop en el ápice y la caída, y el último frame recién ~2 frames antes de tocar el suelo (predicho con la velocidad actual).

**Jump kick con dos variantes.** Golpe solo = vuelo normal; golpe + dirección en X = la tortuga viaja sola con ímpetu a 4 px/frame (el doble del control aéreo normal), trayectoria comprometida, llega bastante más lejos.

**Botón A remapeado al ESPECIAL.** Ahora A y B+C ejecutan el especial, que mata foot soldiers de un solo golpe. Pendiente: cuando exista el sistema de HP, el especial debe restar vida al jugador, como en el arcade.

**Saltito visual del especial.** Mientras dura la animación el sprite se dibuja \`PLAYER_SPECIAL_LIFT\` (8 px) más arriba. Es un offset puramente de *render*: la \`p->y\` lógica no se toca.
`
  },
  {
    date: "2026-07-18",
    part: "18–19 jul",
    title: "De demo técnica a juego jugable",
    tags: ["Gameplay"],
    media: [
      { src: "2026-07-19_combat.gif", caption: "Oleada de foot soldiers con IA de grupo y combos" }
    ],
    body: `
Tanda grande de *game feel*, en fases.

**Daño enemigo → tortuga.** Hitbox activa solo durante la ventana real del golpe, un golpe por swing, y reacción del jugador según de dónde vino (HIT de frente alternados, HIT_BEHIND por la espalda), knockback de ~20 px, 45 frames de invulnerabilidad con parpadeo, y esquive aéreo (saltando no te pegan).

**Agresividad.** Cada enemigo tiene cooldown personal entre ataques (60–91 frames, con azar), cupo global de 2 atacantes simultáneos (el resto rodea a distancia en un anillo de espera de ~72 px, el *circling* clásico del género), distancia de frenado y separación de a pares.

**Targeting en 2P.** El bug de que "ignoran al player 2" venía de re-elegir al más cercano cada frame. Ahora cada enemigo tiene un target asignado al spawnear y re-evalúa cada 32 frames con histéresis de 48 px.

**Hitbox de las tortugas y combos.** Se corrigió que la ventana de golpe se medía desde el borde del frame (pegaba "arriba", no adelante): ahora se mide desde el centro con 64 px de alcance frontal. Y el combo B-B-B ahora usa buffer de input + ventana de enlace de 20 frames, en vez de exigir el frame exacto de fin de animación.

**Spawner por oleadas.** Cada punto del nivel manda una oleada (3 en el primero, 4 en el resto) con lanes de profundidad variadas, naciendo fuera de pantalla por ambos flancos ya persiguiendo. Total del nivel: **23 foot soldiers**.

Además: pantalla de créditos SGDK bilingüe ES/EN, cámara con dead-zone y tope por jugador rezagado en 2P, y los marcos del HUD (\`hud_1p\`/\`hud_2p\`) dibujados en BG_A con prioridad alta.
`
  },
  {
    date: "2026-07-18",
    part: "",
    title: "El fuego, el sheet nuevo del foot soldier y la VRAM",
    tags: ["Optimización", "Arte", "Gameplay"],
    media: [
      { src: "2026-07-18_fire.gif", caption: "Fuego en primer plano por streaming de tiles" }
    ],
    body: `
Sesión intensa. Entra el spritesheet definitivo del foot soldier (grilla 5×5 de 104×104, la misma que las tortugas) y el fuego del primer plano. Tres batallas técnicas.

**1. El fuego por scroll no entraba en VRAM.** El plan clásico era dibujar la tira de 8 frames y correr el scroll de BG_A. Pero midiendo el asset real: ~400 tiles de fuego + ~495 del fondo + ~540 de sprites = ~1550 tiles sobre ~1400 disponibles. No entraba ni en 1 jugador.

> **Solución final: animación por streaming de tiles.** Un solo frame (64 tiles) vive en VRAM, el tilemap lo repite a lo ancho de la pantalla, y cada 8 frames de juego se pisa con el siguiente vía cola DMA (2 KB por paso). Bonus: todas las celdas de fuego quedan en fase y el scroll de BG_A queda libre para el HUD.

**2. El build que "no cambiaba nada".** Los fuentes nuevos no estaban donde el makefile los tomaba. Y al arreglarlo apareció un bug fantasma: rescomp (Java) lee los \`.res\` con charset Cp1252, y una "Í" en un comentario UTF-8 tiraba \`Input length = 1\`. **Regla desde entonces: comentarios de los \`.res\` siempre en ASCII.**

**3. Presupuesto de sprites.** El default de \`SPR_init()\` (420 tiles) no alcanza para 2 tortugas + 4 foot soldiers grandes → \`SPR_initEx(600)\`. De acá salió el tope de diseño: **máximo 4 foot soldiers simultáneos**.

Con el sheet nuevo, la IA se completó: movimiento vertical para alinearse en profundidad, ataques kick y uppercut al azar, walk_up al subir y flip según dirección real.
`
  },
  {
    date: "2026-07-16",
    part: "16–17 jul",
    title: "Primeros enemigos",
    tags: ["Gameplay", "Optimización"],
    body: `
Primer foot soldier (sheet provisional de 7×8 tiles, solo idle y caminata) con IA básica de patrulla / persecución / ataque y spawns por trigger de cámara.

**Flash blanco al recibir golpe.** En vez de parpadear la visibilidad (que se notaba poco), el sprite cambia su atributo de paleta a una línea PAL3 cargada toda en blanco — **cero DMA por golpe**.

Se fijó también el mapa de paletas del nivel: PAL0 fondo, PAL1 tortugas (las 4 comparten paleta unificada), PAL2 enemigos, PAL3 flash.
`
  },
  {
    date: "2026-07-15",
    part: "",
    title: "Fuente arcade y streaming del fondo",
    tags: ["Motor", "Optimización", "Arte", "Audio"],
    media: [
      { src: "2026-07-15_scroll.gif", caption: "Scroll del nivel por ventana circular de columnas" }
    ],
    body: `
**Fuente del arcade** ripeada y adaptada (ASCII 32..126) para el título del nivel: *"SCENE 1 — FIRE! WE GOTTA GET APRIL OUT!!"* apareciendo letra por letra (typewriter con skip por START). Lección: la fuente se exporta con \`TILESET ... NONE NONE\` porque la deduplicación de rescomp rompe el mapeo 1:1 entre carácter ASCII y tile.

**Streaming de columnas del fondo.** Como el nivel (1376 px) no entra en ningún plano, el tileset completo (~495 tiles únicos) se carga una sola vez a VRAM y el plano BG_B funciona como **ventana circular de 64 columnas**: a medida que la cámara avanza se dibujan columnas nuevas por el borde derecho pisando las que salieron por el izquierdo. Como el beat-em-up nunca retrocede, solo hay que revelar hacia adelante. El tilemap va sin comprimir (\`NONE\`) para indexarlo directo desde ROM.

Además: selección de 1 o 2 jugadores, cámara con dead-zone, y **XGM2** como driver de audio (permite control de volumen — la música del nivel saturaba y se bajó al 40%).
`
  },
  {
    date: "2026-06-30",
    part: "",
    title: "Los assets definitivos",
    tags: ["Arte"],
    body: `
Día grande de arte. Las cuatro tortugas quedan en spritesheets de grilla 13×13 tiles (frames de **104×104 px**, 18 animaciones cada una: idle, patada, combo de 3 golpes, salto, patada en salto, caminatas, especial, hits de frente y de espalda, levantarse, agarrado).

Y el fondo completo del nivel 1 queda armado: **1376×224 px**, más ancho que cualquier plano que la Mega Drive pueda dibujar. Ese ancho forzó una de las técnicas centrales del proyecto (ver la entrada del 15/07).
`
  },
  {
    date: "2026-06-26",
    part: "26–27 jun",
    title: "Selección de personaje y módulo del jugador",
    tags: ["Gameplay", "Motor"],
    body: `
La selección de personaje pasa de maqueta a funcionar de verdad: el sprite de la tortuga elegida se muestra en pantalla.

**Refactor importante.** El código del jugador se separa en un módulo propio (\`player.c/h\`) con máquina de estados para las animaciones (IDLE, WALKING, ATTACKING, JUMPING, HURT, GRABBED). El diseño es **multi-instancia desde el día uno** — todas las funciones reciben un \`Player*\` — pensando en el modo de 2 jugadores.
`
  },
  {
    date: "2026-06-25",
    part: "",
    title: "Nace el repositorio",
    tags: ["Infra"],
    body: `
Primer commit y README. El proyecto se formaliza: estructura estándar de SGDK (\`src/\`, \`res/\`, \`out/\`), licencia de proyecto fan no comercial, y créditos a Konami, a Stéphane Dallongeville (SGDK) y a la comunidad de preservación.
`
  },
  {
    date: "2026-04-15",
    part: "abril–mayo 2026",
    title: "Se retoma: intro y arquitectura de escenas",
    tags: ["Motor", "Arte", "Audio"],
    body: `
Después de una pausa larga, el proyecto se retomó con dos frentes.

**Intro estilo arcade.** El logo de SEGA no podía ser estático: Rocksteady entra corriendo y lo choca, con efecto de sonido de golpe y música de intro en VGM.

**Máquina de estados de escenas** (\`scenes.h\`). Cada pantalla del juego es una función \`showXxx()\` que devuelve el \`SceneId\` siguiente, y \`main.c\` es un simple switch que va encadenando escenas. Esta decisión temprana resultó clave: agregar pantallas nuevas después fue siempre trivial.

También de esta época: la música del nivel 1 (\`fire_v3.vgm\`) y la configuración del emulador Gens.
`
  },
  {
    date: "2025-02-01",
    part: "febrero 2025",
    title: "Los primeros experimentos",
    tags: ["Arte", "Audio"],
    body: `
Antes de que existiera el repo, el proyecto arrancó como una serie de prototipos sueltos en SGDK. De esta época sobreviven los assets más viejos: el logo de TMNT y la pantalla de selección de personaje (retratos en escala de grises que se "encienden" al seleccionar, el cursor con forma de tortuga, la sheet de caras del HUD), la música de selección convertida a VGM desde el arcade, y las primeras pruebas de concepto del nivel 1: \`bg_test.png\` y \`firetest.png\`.

Ya desde el principio la idea fue que la Escena 1 — el departamento en llamas donde está atrapada April — tuviera el fuego animado en primer plano como protagonista.
`
  }
];
