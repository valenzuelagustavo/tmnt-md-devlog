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
    date: "2026-08-01",
    part: "",
    title: "Say your prayers turtles!",
    tags: ["Gameplay", "Arte", "Scenes", "Boss"],
    media: [
      { src: "nuevo_lvl.gif", caption: "Nueva escena del level" },
      { src: "drill_capsule.gif", caption: "La drill capsule aparece" },
      { src: "flash_light_boss.gif", caption: "Efecto flash mide el HP del boss" },
    ],
    body: `

**Hubo muchisimo avance estos días**

Estoy por empezar a estudiar y ya se huele en el aire la falta de tiempo, eso me obligo a meteerle pata estos días al proyecto. Siguiendo impulsos y planes inconexos agregue nuevas animaciones para el Foot Soldier Violeta, nuevo comportamiento para el naranja, una nueva fase en el nivel y la aparición de Rocoso (Rocksteady) para darle un cierre al nivel. 
Falta pulir el comportamiento del boss. Repensar algunos temas graficos. La drill capsule llevo al limite los graficos que se pueden mostrar en pantalla y me hizo experimentar los primeros parpadeos serios. 

**Nuevos efectos de sonido**

Encontre el audio con los que son presumiblemente todos los voice over y sonidos del juego. Tuve que pasarlos a  \`.wav\` de 8 bits para que pudieran ser agregados. Aún me falta agregar varios, pero los pocos que agregue le suman un bonito detalle al juego. 

**Efecto flash**

El efecto flash que se ve cuando le falta poca vida a Rocoso es el mismo que utilizaba al principio con los Foot soldiers. Al utilizar la \`PAL3\` y esta ser la misma que utiliza el texto del HUD estos tambien titilan. Eso se va a solucionar cuando reemplace los números por sprites.

**Problemas que tengo que arreglar**

Varios problemas vengo pateando y se suman algunos nuevos. Los detallo acá para recordarlos. 

-Comportamiento del latigo del robot. Cuando atrapa al player depende la distancia hay errores graficos.
-Bloqueo de camara en la parte con los dos ascensores. Se puede seguir avanzando y eso activa al robot. Puede traer problemas. (Note que en el arcade también y es posible saltearse al robot de esa manera).
-Perdida de visibilidad de sprites en la salida del drill capsule. No se bien como puedo ahorrar VRAM acá. Espero se me ocurra algo.
-Puerta de la drill capsule no se muestra cerrada. Tengo que extender la duracion del ultimo frame de animación.
-Prioridad de la drill capsule. Se dibuja sobre el humo del techo del nivel y debe quedar atras.
-Comportamiento de Rocoso. Por ahora tiene una IA muy deficiente y básica.
-Ajuste de Hitboxes general. Alta prioridad Rocoso.

No se si voy a tener tiempo de avanzar estas semanas que siguen. Hasta entonces para los que lean.
`
  },
    {
    date: "2026-07-27",
    part: "",
    title: "Spawneo de enemigos y detalles graficos",
    tags: ["Gameplay", "Arte"],
    media: [
      { src: "2026-07-27_efecto_fuego.gif", caption: "Efecto de fuego en puertas" },
      { src: "2026-07-27_fire_ascensor.gif", caption: "Efecto de fuego en ascensores" },
    ],
    body: `
## 27 de julio — Animación de paleta en detalles del fuego

**Animación en paleta**

Se implemento una pequeña animación de los colores de la paleta que utilizaba para el fuego. Basicamente se intercambian los colores de ciertos indices para crear un efecto de animación. En el nivel se aplica a todo lo que sea fuego. A su vez agregue sprites decorativos a lo largo del nivel (detras de las puertas y dentro de los ascensores). Gracias a esto se comienza a sentir que es un edificio en llamas. 

**La camara ahora se frena en puntos clave**

Ya tenemos zonas del nivel definidas en las que la camara no deja al jugador avanzar hasta que elimine a los enemigos. También defini cuantos y desde donde entran los enemigos. Queda terminar de ripear animaciones de los \`foot soldiers\` para que pueda pulir su comportamiento al completo. 

**La bola de hierro ya tiene sonido**

La bola de hierro que cae por la escalera ya tiene sonido. Se utiliza un sample .wav en el CH3.

**Se ajustaron hitbox**

Se ajustaron los hitbox individuales de cada tortuga segun su arma, asi Donatello es el que más alcance tiene y Raphael el que menos. Más adelante tambien voy a modificar el daño que hace cada uno. Quizá sea alejarme un poco del arcade pero ya que es imposible hacer una conversion 1:1...

**Se elimino el parpadeo blanco cuando golpeas a un enemigo** u
Hasta ahora cuando golpeabas un enemigo hacia un flash blanco. Se elimino ya que requeria la \`PAL3\` y ahora esa paleta esta siendo usada por el \`foot soldier\` naranja y proximamente por el blanco.
`
  },
    {
    date: "2026-07-26",
    part: "",
    title: "Esferas que caén, robot mejorado, scroll del fuego",
    tags: ["Audio", "Gameplay", "Arte", "Optimización"],
    media: [
      { src: "2026-07-26_ball_path.png", caption: "Primer path calculado de la bola" },
      { src: "2026-07-26_Ball_stairs.gif", caption: "La bola cayendo por las escaleras" },
      { src: "2026-07-26_robot_whip.gif", caption: "El robot y su molesto latigo" }
    ],
    body: `
## 26 de julio — Scroll del fuego, la bola de hierro y ajustes del robot

Sesión de pulido sobre el nivel 1: hacer que el fuego por fin scrollee, un
obstáculo nuevo (la esfera de metal que baja por la escalera) y dos arreglos al
robot del látigo. (Entre medio de esta entrada y la anterior el proyecto ya
sumó el **robot del látigo** como mini-jefe del final —máquina de estados propia
con patrulla, láser a distancia y agarre con electrocución— y la **cutscene
final** SCENE_ENDING; quedan mencionados acá al pasar, su desarrollo no está
documentado en detalle en este diario.)

**El fuego ahora scrollea con el mundo (parallax por tile).**

- Hasta acá el fuego estaba clavado a la pantalla: \`BG_A\` tenía el scroll H fijo
  en 0. En el arcade el fuego es parte del mundo y se desplaza al avanzar. Pero
  BG_A también lleva el HUD (franja superior), así que no se puede scrollear el
  plano entero sin arrastrar el HUD.
- **Solución:** scroll horizontal **por tile** (VDP_setScrollingMode(\`HSCROLL_TILE\`,
  \`VSCROLL_PLANE\`)). Las filas del HUD (0-3) quedan en scroll 0 y las 8 filas de la
  banda del fuego se desplazan solas. Como el modo de scroll H es **global a los
  dos planos**, bgUpdate() ahora también alimenta la tabla completa de \`BG_B\`
  (28 filas al mismo -cameraX) en vez de un solo VDP_setHorizontalScroll.
- La celda del fuego (64px) se repite en todo el plano circular (512px = 8×64),
  así que el scroll envuelve sin costura. Parallax tuneable con FIRE_SCROLL_NUM/
  DEN (1/2 = deriva suave, 1/1 = anclado al mundo). clearScene() vuelve a
  \`HSCROLL_PLANE\` para no romper el scroll de las otras escenas.

**Bola de hierro: obstáculo que baja rebotando por la escalera.**

- Sprite nuevo \`iron_ball\` (32×32, 2 frames girando) que aparece cada ~3s en lo
  alto de la escalera del nivel y baja rebotando en diagonal hasta salir por
  abajo. Si toca a una tortuga le resta 1 barra (vía damagePlayer, con sus
  i-frames → un solo golpe por pasada); si toca a un foot soldier, lo aplasta.
- **Coordenadas** como el resto del motor: \`x\` de mundo (anclada al mundo,
  scrollea con la cámara), y = línea de contacto (misma escala que la lane/
  pies) que desciende, y z = altura del rebote (offset visual sobre un
  "escalón" en z=0, mismo concepto que el jumpZ del jugador). Colisión por
  profundidad (\`|feetY - y|\`) + X, ignorando z. Profundidad del Y-sorting = y.
- **La paleta fue el detalle fino.** El PNG venía indexado en grises genéricos
  (índices 11-15), pero en la paleta REAL de las tortugas (\`PAL1\`) esos slots son
  lavanda/rojo/magenta → la bola habría salido de colores. \`PAL1\` sí tiene grises,
  pero en los índices 1/4/10/13. Se re-indexó el PNG a esos slots por cercanía de
  brillo (quedan 4 tonos en vez de 5) y se le puso la paleta de las tortugas.
- **Primera versión spawneaba en X random**; comparando contra el GIF del arcade
  se corrigió: la bola SIEMPRE baja por la escalera. Se midió sobre
  bg01_completa.png que la escalera ocupa mundo X ≈ 508-620, y trackeando la
  esfera en el GIF cuadro a cuadro se confirmó que nace arriba y rueda en
  **diagonal a la derecha**. Ahora spawnea en X de mundo fija (IRON_BALL_STAIRS_X),
  con deriva diagonal (IRON_BALL_ROLL) y sólo cuando el alto de la escalera está
  en pantalla. Cadencia por IRON_BALL_PERIOD.
- Toda la lógica vive en scenes.c (funciones ironBall* estáticas, misma casa
  que el fuego y el HUD). \`SPR_initEx\` subió a 620 por los 16 tiles de la bola.

**Robot del látigo: frame de electrocución por distancia + más velocidad.**

- **Bug del frame congelado:** al atrapar a la tortuga, el látigo electrificado no
  quedaba a la longitud correcta. El cálculo escalaba con la cantidad de frames
  del *throw* pero lo aplicaba a la anim de *electro* (otra cantidad de frames →
  índice fuera de rango) y medía la distancia con el borde del sprite en vez del
  centro. Se reemplazó por un helper \`robotElectroFrame()\` que usa el throwFrame
  con el que **realmente enganchó** (= la distancia exacta robot→player en ese
  instante) escalado al \`numFrame\` REAL de la anim de electro, y se recalcula en
  cada alternancia A↔B por si difieren.
- **Más velocidad:** movimiento \`ROBOT_SPEED\` 2→3 (patrulla + alineado en Y);
  animaciones auto (aparición, giro, caminata, windup, láser) bajando el time
  del sprite robot_whip de 8 a 6; látigo (lanzar/recoger, a mano)
  \`ROBOT_THROW_TICKS\` 5→3; y \`ROBOT_LASER_FIRE_DELAY\` 12→8 para que el rayo salga
  antes y calce dentro de la anim ya acelerada.

**Regla nueva de la casa:** un sprite que "comparte la paleta de X" (PAL1/PAL2/…)
tiene que estar indexado sobre los índices REALES de esa paleta, no sobre una
paleta de grises cualquiera. Antes de dibujarlo con TILE_ATTR(PALx,...) hay que
verificar los slots contra la paleta destino — no alcanza con que "sean grises".
`
  },
  {
    date: "2026-07-24",
    part: "",
    title: "Sprites, sprites, sprites y más sprites",
    tags: [ "Arte"],
    media: [
      { src: "2026-07-24_original.png", caption: "La imagen original con más de 50 colores." },
      { src: "2026-07-24_dos paletas.png", caption: "La imagen con dos paletas. 30 colores en total."}
    ],
    body: `
La noche de ayer y hoy por la mañana estuve trabajando en ripear animaciones del foot soldier morado. También hice un rip de la imagen del final del level, cuando Shredder rapta a April. Fue interesante de trabajar ya que \`SWAPPRITE\` (mi app para trabajar con paletas de color) no me dio el resultado que esperaba. Al final termine componiendo la imagen con dos paletas y el resultado creo es bastante bueno. Hice el de las cuatro tortugas juntas y es el que va a quedar por ahora, aunque planeo que la tortuga que se muestre sea la elegida por el jugador (o las dos si se juega de a dos).

Esa imagen ya está incluida en el código. Surgio un problema ya que primero cargaba la del plano B y luego la del A. La diferencia de carga hacia que el resultado sea feo. Lo solucione haciendo un fade desde negro. Asi aunque el plano A tarde un poco más no importa porque queda oculto en esa pantalla negra y el jugador ve la pantalla completa. 
`
  },
    {
    date: "2026-07-23",
    part: "",
    title: "Trabajando con el sprite del robot",
    tags: [ "Arte"],
    media: [
      { src: "2026-07-23_ride.gif", caption: "La animación de desplazamiento." },
      { src: "2026-07-23_swapprite.png", caption: "Interfaz de Swapprite."}
    ],
    body: `
Trabajando en la animacón del sprite del robot que sale del suelo al final del nivel. Pensando en si va a dar la VRAM.

**ASEPRITE & SWAPPRITE al rescate.** Como en todo el proyecto, trabajo los \`SPRITES\`con ASEPRITE. Luego utilizo una app propia \`SWAPPRITE\` para reemplazar la paleta original (comunmente de muchos más colores) por alguna de las que ya tengo definidas para este nivel. En este caso voy a utilizar la misma de los Foot Soldiers ya que es la que mejor se adapto a los colores del enemigo. Si quiero poner variantes de colores en los Foot Soldiers voy a tener que hacer uso de la \`PAL3\` que me estaba reservando. En este momento esa paleta la estoy usando para el parpadeo de los enemigos al ser golpeados, pero creo que puedo implementar algo para sortear ese efecto de otra manera. Hablando de este enemigo en cuestión, trae un par de ataques que van a ser un quebradero de cabeza. El latigo que atrapa a las tortus y las electrocuta y el disparo del rayo laser (el primer proyectil del juego). Tengo dos ideas en la cabeza para lidiar con el latigo. Una es directamente usar el sprite ancho y que todo el latigo quepa en la animación y la otra es utilizar dos sprites, siendo el latigo extendido algo que spawnea unicamente cuando el robot hace la animación de lanzar el latigo. Ya iba a tener que utilizar esto para lanzar el rayo laser... También tengo que ripear directo del rom de arcade las animaciones de las tortugas siendo electrocutadas ya que en los ripeos que encontre en internet no estaban. Bueno, eso es todo por esta entrada. Van a ser días de mucha edición de pixeles y poco codigo.
`
  },
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
      { src: "2026-07-21_hud.gif", caption: "HUD en acción: barra de vida, vidas y puntaje" }
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
    media: [
      { src: "2026-07-16_primer_footsoldier.gif", caption: "Primer footsoldier." }
    ],
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
      { src: "2026-07-15 fuente arcade.gif", caption: "El título de la Escena 1 apareciendo letra por letra con la fuente del arcade" }
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
    media: [
      { src: "2026-06-30_mike.gif", caption: "Animaciones para Mike" },
      { src: "2026-06-30_raph.gif", caption: "Animaciones para Raph" }
    ],
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
    media: [
      { src: "2026-04-05_rocksteady_intro.gif", caption: "Intro con Rocksteady como protagonista." }
    ],
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
        media: [
      { src: "2026-02-01_intento_intro.gif", caption: "Primer intento de crear el selector de personajes." },
      { src: "2026-02-01_intento_definitivo.gif", caption: "Selector de personajes definitivo." }
    ],
    body: `
Antes de que existiera el repo, el proyecto arrancó como una serie de prototipos sueltos en SGDK. De esta época sobreviven los assets más viejos: el logo de TMNT y la pantalla de selección de personaje (retratos en escala de grises que se "encienden" al seleccionar, el cursor con forma de tortuga, la sheet de caras del HUD), la música de selección convertida a VGM desde el arcade, y las primeras pruebas de concepto del nivel 1: \`bg_test.png\` y \`firetest.png\`.

Ya desde el principio la idea fue que la Escena 1 — el departamento en llamas donde está atrapada April — tuviera el fuego animado en primer plano como protagonista.
`
  }
];
