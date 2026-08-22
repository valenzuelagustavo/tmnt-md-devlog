/*
 * DEVLOG — TMNT: The Arcade Game port (Sega Mega Drive / SGDK) — PORTUGUÊS (BR)
 * ------------------------------------------------------------------
 * Notas para o mantenedor em espanhol de propósito: data/devlog.js (ES)
 * é o arquivo canônico com as instruções de autoria. Traduza "title",
 * "part", "tags", legendas de mídia e "body" aqui; mantenha "date" e
 * media "src" idênticos ao arquivo ES para que filtros e imagens casem.
 */

window.DEVLOG_CATEGORIES = ["Motor", "Gameplay", "Arte", "Áudio", "Otimização", "Infra"];

window.DEVLOG = [
    {
    date: "2026-08-09",
    part: "",
    title: "Temos música!",
    tags: ["Música", "Arte", "Áudio", "Intro"],
    media: [
      { src: "devlog_2026-08-09 231242.gif", caption: "Novo colaborador musical! SANSENPAI35!" },
      { src: "devlog_2026-08-09 231417.gif", caption: "Primeiras tentativas de intro" },
      { src: "devlog_2026-08-09 231555.gif", caption: "Novos detalhes no HUD e placa de Hurry!" },
    ],
    body: `

**TEMOS MÚSICA!!**

O Sansenpai35 entrou no desenvolvimento e vai contribuir com a música do port. Em tempo recorde ele mandou um trabalho tremendo com a versão do tema da fase 1 Fire! ... Ele tem canal no YouTube e convido todo mundo que curte chiptunes de Master System, Mega Drive e demais maravilhas sonoras a passar por lá, deixar uma inscrição, uns bons likes e comentários boa onda — ele merece!

O canal dele é: https://www.youtube.com/@sansenpai3556

**Primeiras tentativas de intro**

A intro está me dando mais dor de cabeça do que eu pensava. Tentei montá-la com os rips mas o manejo dos planos me deu muitos problemas... Optei então por fazer um scroll da imagem completa mas não parava de dar glitch. Optei então por dividir a imagem em 4 chunks mas os glitches continuaram. Como última medida (e é como ficou por enquanto) dividi a imagem em 5 chunks de 304x512 cada, exceto o último de 304x408 px, e carreguei com overlap de 224 px para que nenhum corte brusco ficasse "visível" entre as \`imagens\`... Infelizmente ainda dava alguns problemas gráficos nos cortes. Tecnicamente não deveria, porque acredito que estou dentro do limite de tiles... Mas enfim... adicionei um flash branco para ver se disfarçava esses erros gráficos, e sim, eles ficam escondidos... mas não estou satisfeito. No momento não vejo maneira de encarar isso. Deixarei como um TODO.

**Placa de Hurry! adicionada e detalhes no HUD**

Agora o HUD tem um \`Sprite\` com o retrato da tartaruga escolhida. Também adicionei a placa de Hurry! para quando o jogador fica parado sem avançar a câmera por 6 segundos. Compartilha \`paleta\` com as tartarugas (como o resto do HUD).

**Continue e seleção de tartaruga**

Agora quando você morre pode continuar a partida até 3 vezes e escolher outra tartaruga. Jogando com dois, esses continues são compartilhados. Não dá para escolher a mesma tartaruga do outro player.

**Coisas a fazer e planos para o futuro**

Falta definir bem o comportamento do Rocksteady e sua hitbox.
Tentar terminar a intro, é um pedido que se repetiu sempre que compartilhei o projeto.

Como plano futuro, pretendo adicionar personagens novos para escolher, mas com um truque. Se na tela de seleção de quantidade de players uma certa combinação for digitada e escolher jogar sozinho, pretendo fazer do Slash um personagem jogável. Se fizer a mesma combinação mas escolher dois jogadores, pretendo liberar Casey Jones e Raphael (com novo visual). Isso, claro, bem no futuro.

Antes de fechar, há uma ROM nova disponível com tudo o que foi mencionado. Aproveitem a música!!
`
  },
  {
    date: "2026-08-01",
    part: "",
    title: "Say your prayers turtles!",
    tags: ["Gameplay", "Arte", "Cenas", "Chefe"],
    media: [
      { src: "nuevo_lvl.gif", caption: "Nova cena da fase" },
      { src: "drill_capsule.gif", caption: "A drill capsule aparece" },
      { src: "flash_light_boss.gif", caption: "Efeito flash mede o HP do chefe" },
    ],
    body: `

**Houve avanço demais esses dias**

Estou prestes a começar a estudar e já se sente no ar a falta de tempo, isso me obrigou a acelerar no projeto esses dias. Seguindo impulsos e planos desconexos adicionei novas animações para o Foot Soldier roxo, novo comportamento para o laranja, uma nova etapa na fase e a aparição do Rocoso (Rocksteady) para dar um fechamento à fase.
Falta polir o comportamento do boss. Repensar algumas questões gráficas. A drill capsule levou ao limite os gráficos que dá para mostrar na tela e me fez experimentar as primeiras piscadas sérias.

**Novos efeitos sonoros**

Encontrei os áudios que são presumivelmente todos os voice overs e sons do jogo. Tive que convertê-los para \`.wav\` de 8 bits para que pudessem ser adicionados. Ainda faltam vários, mas os poucos que adicionei dão um detalhe bonito ao jogo.

**Efeito flash**

O efeito flash que aparece quando falta pouca vida ao Rocoso é o mesmo que eu usava no começo com os foot soldiers. Ao usar a \`PAL3\`, e essa ser a mesma paleta do texto do HUD, eles também piscam. Isso será resolvido quando substituir os números por sprites.

**Problemas que preciso arrumar**

Vários problemas venho empurrando e alguns novos se somam. Detalho aqui para lembrar.

-Comportamento do chicote do robô. Quando agarra o player, dependendo da distância, há erros gráficos.
-Travamento de câmera na parte dos dois elevadores. Dá para seguir avançando e isso ativa o robô. Pode trazer problemas. (Notei que no arcade também acontece e é possível pular o robô desse jeito).
-Perda de visibilidade de sprites na saída da drill capsule. Não sei bem como economizar VRAM aqui. Espero ter alguma ideia.
-A porta da drill capsule não aparece fechada. Preciso estender a duração do último frame da animação.
-Prioridade da drill capsule. Ela é desenhada sobre a fumaça do teto da fase e deveria ficar atrás.
-Comportamento do Rocoso. Por enquanto tem uma IA bem deficiente e básica.
-Ajuste geral de hitboxes. Alta prioridade pro Rocoso.

Não sei se terei tempo de avançar nas semanas que vêm. Até lá, pra quem ler.
`
  },
    {
    date: "2026-07-27",
    part: "",
    title: "Spawn de inimigos e detalhes gráficos",
    tags: ["Gameplay", "Arte"],
    media: [
      { src: "2026-07-27_efecto_fuego.gif", caption: "Efeito de fogo nas portas" },
      { src: "2026-07-27_fire_ascensor.gif", caption: "Efeito de fogo nos elevadores" },
    ],
    body: `
## 27 de julho — Animação de paleta nos detalhes do fogo

**Animação de paleta**

Implementou-se uma pequena animação das cores da paleta usada no fogo. Basicamente trocam-se as cores de certos índices para criar um efeito de animação. Na fase aplica-se a tudo que for fogo. Além disso adicionei sprites decorativos pela fase (atrás das portas e dentro dos elevadores). Graças a isso começa-se a sentir que é um prédio em chamas.

**A câmera agora trava em pontos-chave**

Já temos zonas da fase definidas nas quais a câmera não deixa o jogador avançar até eliminar os inimigos. Também defini quantos e de onde entram os inimigos. Falta terminar de ripar as animações dos \`foot soldiers\` para poder polir completamente seu comportamento.

**A bola de ferro já tem som**

A bola de ferro que cai pela escada já tem som. Usa-se um sample .wav no CH3.

**Hitboxes ajustadas**

As hitboxes individuais de cada tartaruga foram ajustadas conforme sua arma, assim Donatello é o que tem mais alcance e Raphael o que menos. Mais adiante vou mudar também o dano de cada um. Talvez seja me afastar um pouco do arcade, mas já que é impossível fazer uma conversão 1:1...

**Piscada branca removida ao bater num inimigo**
Até agora, ao bater num inimigo havia um flash branco. Removido porque exigia a \`PAL3\`, e essa paleta agora está sendo usada pelo \`foot soldier\` laranja e em breve pelo branco.
`
  },
    {
    date: "2026-07-26",
    part: "",
    title: "Esferas que caem, robô melhorado, scroll do fogo",
    tags: ["Áudio", "Gameplay", "Arte", "Otimização"],
    media: [
      { src: "2026-07-26_ball_path.png", caption: "Primeiro path calculado da bola" },
      { src: "2026-07-26_Ball_stairs.gif", caption: "A bola caindo pela escada" },
      { src: "2026-07-26_robot_whip.gif", caption: "O robô e seu chicote irritante" }
    ],
    body: `
## 26 de julho — Scroll do fogo, a bola de ferro e ajustes do robô

Sessão de polimento na fase 1: fazer o fogo finalmente scrollear, um obstáculo novo (a esfera de metal que desce pela escada) e dois consertos no robô do chicote. (Entre esta entrada e a anterior o projeto ganhou o **robô do chicote** como mini-chefe do final —máquina de estados própria com patrulha, laser à distância e agarrão com eletrocussão— e a **cutscene** final SCENE_ENDING; ficam citados aqui de passagem, seu desenvolvimento não está documentado em detalhe neste diário.)

**O fogo agora scrollea com o mundo (parallax por tile).**

- Até aqui o fogo estava pregado na tela: \`BG_A\` tinha scroll H fixo em 0. No arcade o fogo é parte do mundo e se desloca conforme se avança. Mas o BG_A também leva o HUD (faixa superior), então não se pode scrollear o plano inteiro sem arrastar o HUD junto.
- **Solução:** scroll horizontal **por tile** (VDP_setScrollingMode(\`HSCROLL_TILE\`,
  \`VSCROLL_PLANE\`)). As linhas do HUD (0-3) ficam em scroll 0 e as 8 linhas da faixa do fogo se deslocam sozinhas. Como o modo de scroll H é **global aos dois planos**, o bgUpdate() agora também alimenta a tabela completa do \`BG_B\` (28 linhas no mesmo -cameraX) em vez de um único VDP_setHorizontalScroll.
- A célula do fogo (64px) repete-se pelo plano circular inteiro (512px = 8×64), então o scroll envolve sem costura. Parallax ajustável via FIRE_SCROLL_NUM/DEN (1/2 = deriva suave, 1/1 = ancorado ao mundo). clearScene() volta a \`HSCROLL_PLANE\` para não quebrar o scroll das outras cenas.

**Bola de ferro: obstáculo que desce quicando pela escada.**

- Sprite novo \`iron_ball\` (32×32, 2 frames girando) que aparece a cada ~3s no alto da escada da fase e desce quicando na diagonal até sair por baixo. Se toca numa tartaruga tira 1 barra (via damagePlayer, com seus i-frames → um só golpe por passada); se toca num foot soldier, o esmaga.
- **Coordenadas** como o resto do motor: \`x\` de mundo (ancorada ao mundo, scrollea com a câmera), y = linha de contato (mesma escala da lane/pés) que desce, z = altura do quique (offset visual sobre um "degrau" em z=0, mesmo conceito do jumpZ do jogador). Colisão por profundidade (\`|feetY - y|\`) + X, ignorando z. Profundidade do Y-sorting = y.
- **A paleta foi o detalhe fino.** O PNG veio indexado em cinzas genéricos (índices 11-15), mas na paleta REAL das tartarugas (\`PAL1\`) esses slots são lavanda/vermelho/magenta → a bola teria saído colorida. \`PAL1\` tem cinzas sim, nos índices 1/4/10/13. Re-indexou-se o PNG para esses slots por proximidade de brilho (ficam 4 tons em vez de 5) e colocou-se a paleta das tartarugas.
- **A primeira versão spawnava em X aleatório**; comparando com o GIF do arcade corrigiu-se: a bola SEMPRE desce pela escada. Mediu-se no bg01_completa.png que a escada ocupa o mundo X ≈ 508-620, e rastreando a esfera quadro a quadro no GIF confirmou-se que ela nasce no alto e rola em **diagonal para a direita**. Agora spawna em X de mundo fixo (IRON_BALL_STAIRS_X), com deriva diagonal (IRON_BALL_ROLL) e só quando o alto da escada está na tela. Cadência via IRON_BALL_PERIOD.
- Toda a lógica vive em scenes.c (funções ironBall* estáticas, mesma casa do fogo e do HUD). \`SPR_initEx\` subiu para 620 pelos 16 tiles da bola.

**Robô do chicote: frame de eletrocussão por distância + mais velocidade.**

- **Bug do frame congelado:** ao pegar a tartaruga, o chicote eletrocutado não ficava no comprimento correto. O cálculo escalava com a quantidade de frames do *throw* mas aplicava na anim de *electro* (outra quantidade de frames → índice fora do intervalo) e media a distância pela borda do sprite em vez do centro. Substituiu-se por um helper \`robotElectroFrame()\` que usa o throwFrame com o qual **realmente enganchou** (= a distância exata robô→player naquele instante) escalado ao \`numFrame\` REAL da anim de electro, recalculado a cada alternância A↔B caso difiram.
- **Mais velocidade:** movimento \`ROBOT_SPEED\` 2→3 (patrulha + alinhado em Y); animações auto (aparição, giro, caminhada, windup, laser) baixando o time do sprite robot_whip de 8 para 6; chicote (lançar/recolher, na mão) \`ROBOT_THROW_TICKS\` 5→3; e \`ROBOT_LASER_FIRE_DELAY\` 12→8 para o raio sair antes e caber na anim já acelerada.

**Regra nova da casa:** um sprite que "compartilha a paleta de X" (PAL1/PAL2/…) precisa estar indexado sobre os índices REAIS dessa paleta, não sobre qualquer paleta de cinzas. Antes de desenhá-lo com TILE_ATTR(PALx,...) é preciso verificar os slots contra a paleta destino — não basta "serem cinzas".
`
  },
  {
    date: "2026-07-24",
    part: "",
    title: "Sprites, sprites, sprites e mais sprites",
    tags: [ "Arte"],
    media: [
      { src: "2026-07-24_original.png", caption: "A imagem original com mais de 50 cores." },
      { src: "2026-07-24_dos paletas.png", caption: "A imagem com duas paletas. 30 cores no total."}
    ],
    body: `
A noite de ontem e a manhã de hoje foram de ripar animações do foot soldier roxo. Também fiz um rip da imagem do final da fase, quando Shredder sequestra a April. Foi interessante trabalhar porque o \`SWAPPRITE\` (meu app para trabalhar paletas de cor) não deu o resultado que esperava. No fim terminei compondo a imagem com duas paletas e o resultado, creio, é bastante bom. Fiz a das quatro tartarugas juntas e é essa que vai ficar por ora, embora planeje que a tartaruga exibida seja a escolhida pelo jogador (ou as duas, se jogar de a dois).

Essa imagem já está incluída no código. Surgiu um problema porque primeiro carregava a do plano B e depois a do A. A diferença de carga fazia o resultado ficar feio. Resolvi fazendo um fade a partir do preto. Assim, mesmo que o plano A demore um pouco mais, não importa, porque fica oculto nessa tela preta e o jogador vê a tela completa.
`
  },
    {
    date: "2026-07-23",
    part: "",
    title: "Trabalhando no sprite do robô",
    tags: [ "Arte"],
    media: [
      { src: "2026-07-23_ride.gif", caption: "A animação de deslocamento." },
      { src: "2026-07-23_swapprite.png", caption: "Interface do Swapprite."}
    ],
    body: `
Trabalhando na animação do sprite do robô que sai do chão no final da fase. Pensando se a VRAM vai dar.

**ASEPRITE & SWAPPRITE ao resgate.** Como em todo o projeto, trabajo os \`SPRITES\` com ASEPRITE. Depois uso um app próprio, \`SWAPPRITE\`, para substituir a paleta original (comumente com muito mais cores) por alguma das que já tenho definidas para esta fase. Neste caso vou usar a mesma dos Foot Soldiers, pois é a que melhor se adaptou às cores do inimigo. Se quiser colocar variantes de cor nos Foot Soldiers vou precisar usar a \`PAL3\` que estava reservando. Neste momento essa paleta está sendo usada para a piscada dos inimigos ao serem golpeados, mas creio que posso implementar algo para contornar esse efeito de outra forma. Falando nesse inimigo, ele traz um par de ataques que vão ser uma dor de cabeça: o chicote que agarra as tartarugas e as eletrocuta, e o disparo do raio laser (o primeiro projétil do jogo). Tenho duas ideias na cabeça para lidar com o chicote. Uma é usar direto o sprite largo e caber todo o chicote na animação; a outra é usar dois sprites, sendo o chicote estendido algo que spawna somente quando o robô faz a animação de lançá-lo. Eu já ia precisar disso para lançar o raio laser... Também tenho que ripar direto da ROM de arcade as animações das tartarugas sendo eletrocutadas, já que nos rips que encontrei na internet elas não estavam. Bom, é isso nesta entrada. Vão ser dias de muita edição de pixels e pouco código.
`
  },
  {
    date: "2026-07-22",
    part: "",
    title: "Voz de abertura, balão de diálogo e portas que cospem inimigos",
    tags: ["Áudio", "Gameplay", "Arte", "Otimização"],
    media: [
      { src: "2026-07-22_voice_over.gif", caption: 'Voice over + balão "Attack!!" na abertura da fase' },
      { src: "2026-07-22_foot_soldier_door.gif", caption: "Um foot soldier quebra a porta e entra no combate" },
      { src: "2026-07-22_explosion.gif", caption: "Morte do foot soldier com explosão" }
    ],
    body: `
Sessão longa com três frentes: dar voz à abertura da fase, ampliar o foot soldier e transformar as portas do fundo em pontos de spawn.

**Voice over + balão "Attack!!".** O grito entra como sample **PCM do driver XGM2** (recurso \`WAV attack_vo\`, reamostrado a 13.3 kHz e alinhado a 256 bytes), disparado com \`XGM2_playPCMEx\` no canal PCM 2 com prioridade 15 — assim soa acima da música da fase (canal 1) sem que ela o pise. O **balão** (\`attack_bubble\`, 64x32) compartilha a paleta das tartarugas (PAL1), fica em posição fixa de tela (independente de jogador e câmera) e cicla aparecer → parado → piscar → sumir, tudo por tempo. Dispara TUDO assim que a fase começa; de quebra, o jogador agora nasce a 5 tiles da borda esquerda e o primeiro foot soldier já fica visível colado na borda direita, entrando na direção do player.

> **Lição na porrada:** no começo não se ouvia nada. Não era o canal nem o código: o WAV vinha gravado baixíssimo (pico a 22%, RMS ~4.5% da escala). No DAC de 8 bits e com a música por cima, sample fraco é simplesmente inaudível. Normalizou-se com compressão + makeup a ~24% RMS e ele apareceu. **Regra nova:** preparar os WAVs (normalizar/comprimir) e verificar a AMPLITUDE, não só o formato.

**Sheet ampliado + morte com explosão.** O spritesheet do foot soldier passou de 5 para **8 animações** (grade 5x8, frames 104x104): além de idle / walk / chute / uppercut / walk-up, agora há **explosão**, **golpe direto** e **quebra de porta**. O rescomp detecta as linhas sozinho — não precisou mexer em \`enemies.res\`. Ao morrer, o foot soldier reproduz \`ANIM_EXPLODE\` (uma vez, sem loop) em vez de ficar no idle, e pula o flash branco no golpe fatal para que as cores da explosão apareçam. O golpe direto entrou na rotação de ataques aleatórios (mesma duração e hitbox do uppercut).

**Portas como spawn points.** \`door_lvl_1\` (40x80) desenha-se sobre cada um dos 3 vãos de porta aberta do fundo (centros de mundo **429, 718, 846**, medidos no \`bg01_completa.png\`), compartilhando a paleta do **fundo** (PAL0) reindexada — zero linhas de paleta. **Gatilho por proximidade:** quando o player passa, a porta fica "armada"; assim que há vaga entre os ativos (\`MAX_ACTIVE_ENEMIES\`) remove-se o sprite da porta e aparece um foot soldier que a QUEBRA com \`ANIM_BREAK_DOOR\` (começando do 2º frame) antes de virar um inimigo normal. Novo estado \`ENEMY_STATE_SPAWNING\`: sem IA nem colisão enquanto quebra. Os sprites de porta criam-se/soltam-se conforme a visibilidade; pior caso em 2 jogadores medido em **~544 de 600 tiles** — cabe sem tocar o orçamento do \`SPR_initEx\`.
`
  },
  {
    date: "2026-07-20",
    part: "noite · cont.",
    title: "Ajustes do KO, cena de Game Over e bug de scroll",
    tags: ["Gameplay", "Motor"],
    body: `
Três correções depois de testar o HUD e a morte.

**Frame exato do KO.** A pose da tartaruga caída é o frame 11 (a "12ª") de \`ANIM_HIT_BEHIND_2\`. Antes rodava a animação inteira (loop off) e, como os 12 frames em FAST 7 levam ~84 frames mas o KO dura 70, a tartaruga revivia ANTES de chegar à pose. Agora salta-se DIRETO ao frame 11 com a auto-animação desligada (\`SPR_setAutoAnimation(FALSE)\` + \`SPR_setAnimAndFrame\`) e congela ali; ao reviver, religa-se a auto-animação.

**Cena de Game Over.** Nova \`SCENE_GAME_OVER\` (\`showGameOver\` em \`scenes.c\`, caso em \`main.c\`). Mostra "GAME OVER" em branco sobre preto (fonte padrão, branco posto no índice 15 da PAL0), espera ~4s ou START, e reinicia desde o logo da SEGA. A fase agora sai para essa cena em vez de ir direto para a SEGA.

**Bug de scroll herdado.** Ao reiniciar depois de um game over, o logo TMNT do menu aparecia deslocado à direita. Causa: o \`clearScene()\` limpava os planos mas NÃO resetava o scroll, e a fase deixa BG_B em \`-cameraX\`. Adicionou-se o reset de scroll H/V dos dois planos no \`clearScene()\`.
`
  },
  {
    date: "2026-07-20",
    part: "noite",
    title: "Conteúdo do HUD: barra de vida, vidas e pontuação",
    tags: ["Gameplay", "Motor"],
    media: [
      { src: "2026-07-21_hud.gif", caption: "HUD em ação: barra de vida, vidas e pontuação" }
    ],
    body: `
O marco do HUD foi preenchido com seus três indicadores, estilo arcade, sem mexer no tamanho do marco: tudo cabe no \`hud_1p.png\`/\`hud_2p.png\` original (72x32), nas 2 fileiras de tiles de interior útil.

**Distribuição compacta (como no arcade).** Fileira superior = "1UP" (pintado na arte) + PONTUAÇÃO alinhada à direita; fileira inferior = VIDAS à esquerda + BARRA à direita. Nada pisa o fundo da fase: tudo fica na faixa preta superior. (Uma primeira tentativa aumentou o marco para 72x48, mas ficou alto demais; voltou-se ao 72x32 encurtando a barra.)

**Barra de vida (\`hp_bar.png\`, 11 frames de 32x8).** Frame 0 = 10 barras, frame 10 = 0 barras. A arte original era 32x16; recortou-se por script para 32x8 (uma fileira de tiles) aproveitando que os segmentos são colunas uniformes, para caber junto à pontuação nas 2 fileiras do marco. Compartilha a paleta das tartarugas (PAL1). Desenha-se como TILES no BG_A (prioridade alta, igual ao marco), NÃO como sprite: não gasta orçamento do \`SPR_initEx\` nem briga com o layering sprite/plano. Um frame (4x1 = 4 tiles) vive na VRAM por jogador e, ao levar um golpe, sobrepõe-se com o frame seguinte via DMA — a mesma técnica de streaming do fogo. No \`.res\` vai \`NONE NONE\` para indexar cada frame direto da ROM (\`frame N -> tile N*4\`).

**Vida / vidas / pontuação no jogador.** O \`Player\` ganhou \`health\` (0..10, começa cheio), \`lives\` (começa em 3) e \`score\`. Cada golpe de um foot soldier tira uma barra (\`damagePlayer\`); ao esvaziar perde-se uma vida e a barra recarrega. Matar um foot soldier soma 1 à pontuação do jogador que rematou (detecta-se a transição para \`ENEMY_STATE_DEAD\` no loop de colisões de \`scenes.c\`).

**Vidas e pontuação como TEXTO.** Fonte padrão (\`VDP_drawText\`) sobre o BG_A. Desenham-se em PAL3 aproveitando que a paleta "flash" é branco puro em todos os índices → texto branco sem gastar uma linha própria. O HUD faz cache do que desenhou por último e só reescreve VRAM quando algo muda.

**Knockout ao perder uma vida.** Quando a barra esvazia, a tartaruga entra em \`STATE_KO\` e mostra o último frame de \`ANIM_HIT_BEHIND_2\` (pose caída) durante \`PLAYER_KO_FRAMES\` (~1.2s) antes de reviver. Ao reviver recarrega a barra e começa a invulnerabilidade de respawn.

**Piscar só ao reviver.** Separou-se a invulnerabilidade "lógica" (\`invincible\`, sem efeito visual) da piscada (\`blinkTimer\`). Um golpe normal NÃO faz mais o sprite piscar (fica visível durante seus i-frames); a piscada clássica ficou reservada ao respawn após perder uma vida.

**Game over.** Ao chegar a 0 vidas mostra-se a pose de nocauteado e só então a fase corta (\`isPlayerGameOver\` devolve a flag \`gameOver\`, ativada ao fim do KO).
`
  },
  {
    date: "2026-07-19",
    part: "noite · cont.",
    title: "Parede diagonal do final da fase",
    tags: ["Gameplay", "Motor"],
    body: `
Comparando com o arcade original surgiu um bug de colisão: no final da fase há um vão de escada / *fire escape* desenhado no fundo **em perspectiva** (diagonal), mas o limite de movimento era uma linha vertical reta.Resultado: nas lanes de trás (mais perto do fundo) o personagem podia andar "sobre" a parede desenhada, ficando parado no ar em cima da estrutura.

** Solução:** mediu-se a borda sólida real diretamente no \`bg01_completa.png\` (um script em Python que detecta onde a cor de piso deixa de ser piso). Deu um ponto de referência em cada extremo da lane — X≈1308 na lane do fundo (Y=142) e X≈1352 na da frente (Y=200) — e com esses dois pontos interpola-se **linearmente** o teto de X real conforme a profundidade de cada personagem, em vez de um limite fixo.

Aplicou-se tanto ao jogador (\`levelEndWallX\` em \`player.c\`) quanto aos foot soldiers (\`enemyMaxX\` em \`enemy.c\`): perseguição, lunge do chute, knockback e separação de grupo. Ninguém cruza mais a parede, em nenhuma lane.
`
  },
  {
    date: "2026-07-19",
    part: "noite",
    title: "Mobilidade no ar e piso mais amplo",
    tags: ["Gameplay", "Motor"],
    body: `
Ajuste fino de fidelidade ao arcade, a partir de revisar o original.

**Salto com movimento em Y.** No arcade, saltando a tartaruga continua podendo se reposicionar também em profundidade (cima/baixo), não só em X. Antes o salto só deixava mover X porque a física usava diretamente \`p->y\` para simular o arco vertical. O refactor separou a altura do salto num campo novo, **\`jumpZ\`** (offset puramente visual subtraído ao desenhar), deixando \`p->y\` livre para representar sempre a lane real de profundidade, igual no ar que caminhando.

Efeito colateral bom: o Y-sorting (\`SPR_setDepth\`) e o alcance do jump kick ficaram mais simples e corretos — não precisa mais de nenhum caso especial para o estado de salto.

**Piso mais amplo.** Os limites da lane (\`BOUND_LANE_TOP/BOTTOM\`) ampliaram-se 1 tile (8 px) em cada extremo → 142/200, replicando o ajuste em \`ENEMY_LANE_TOP/BOTTOM\` para não deixar faixas da calçada sem cobertura da IA.
`
  },
  {
    date: "2026-07-19",
    part: "tarde",
    title: "Recalibração do salto e do especial",
    tags: ["Gameplay"],
    media: [
      { src: "2026-07-19_jump-kick.gif", caption: "Jump kick com ímpeto e o pulinho do especial" }
    ],
    body: `
Sessão de *game feel* sobre o controle das tartarugas.

**Salto por fases.** A animação não corre mais sozinha: desliga-se a auto-animação do sprite (\`SPR_setAutoAnimation\`) e os frames são escolhidos na mão conforme a física — frame 0 na subida, loop no ápice e na queda, e o último frame só ~2 frames antes de tocar o chão (previsto com a velocidade atual).

**Jump kick com duas variantes.** Golpe só = voo normal; golpe + direção em X = a tartaruga viaja sozinha com ímpeto a 4 px/frame (o dobro do controle aéreo normal), trajetória comprometida, chega bem mais longe.

**Botão A remapeado para o ESPECIAL.** Agora A e B+C executam o especial, que mata foot soldiers de um golpe só. Pendente: quando existir o sistema de HP, o especial deve tirar vida do jogador, como no arcade.

**Pulinho visual do especial.** Enquanto dura a animação o sprite desenha-se \`PLAYER_SPECIAL_LIFT\` (8 px) mais acima. É offset puramente de *render*: o \`p->y\` lógico não se toca.
`
  },
  {
    date: "2026-07-18",
    part: "18–19 jul",
    title: "De demo técnica a jogo jogável",
    tags: ["Gameplay"],
    media: [
      { src: "2026-07-19_combat.gif", caption: "Onda de foot soldiers com IA de grupo e combos" }
    ],
    body: `
Leva grande de *game feel*, em fases.

**Dano do inimigo → tartaruga.** Hitbox ativa só durante a janela real do golpe, um golpe por swing, e reação do jogador conforme de onde veio (HIT de frente alternados, HIT_BEHIND pelas costas), knockback de ~20 px, 45 frames de invulnerabilidade com piscada, e esquiva aérea (pulando não te acertam).

**Agressividade.** Cada inimigo tem cooldown próprio entre ataques (60–91 frames, com azar), cupo global de 2 atacantes simultâneos (o resto cerca à distância num anel de espera de ~72 px, o *circling* clássico do gênero), distância de frenagem e separação aos pares.

**Targeting em 2P.** O bug de que "ignoram o player 2" vinha de reescolher o mais próximo a cada frame. Agora cada inimigo recebe um target ao spawnar e reavalia a cada 32 frames com histerese de 48 px.

**Hitbox das tartarugas e combos.** Corrigiu-se que a janela de golpe media-se da borda do frame (acertava "em cima", não para frente): agora mede-se do centro com 64 px de alcance frontal. E o combo B-B-B agora usa buffer de input + janela de enlace de 20 frames, em vez de exigir o frame exato de fim de animação.

**Spawner por ondas.** Cada ponto da fase manda uma onda (3 na primeira, 4 nas demais) com lanes de profundidade variadas, nascendo fora da tela por ambos os flancos já perseguindo. Total da fase: **23 foot soldiers**.

Além disso: tela de créditos do SGDK bilíngue ES/EN, câmera com dead-zone e teto por jogador rezagado no 2P, e os marcos do HUD (\`hud_1p\`/\`hud_2p\`) desenhados no BG_A com prioridade alta.
`
  },
  {
    date: "2026-07-18",
    part: "",
    title: "O fogo, o sheet novo do foot soldier e a VRAM",
    tags: ["Otimização", "Arte", "Gameplay"],
    media: [
      { src: "2026-07-18_fire.gif", caption: "Fogo em primeiro plano por streaming de tiles" }
    ],
    body: `
Sessão intensa. Entram o spritesheet definitivo do foot soldier (grade 5×5 de 104×104, a mesma das tartarugas) e o fogo do primeiro plano. Três batalhas técnicas.

**1. O fogo por scroll não cabia na VRAM.** O plano clássico era desenhar a tira de 8 frames e rodar o scroll do BG_A. Mas medindo o asset real: ~400 tiles de fogo + ~495 do fundo + ~540 de sprites = ~1550 tiles sobre ~1400 disponíveis. Não cabia nem em 1 jogador.

> **Solução final: animação por streaming de tiles.** Um só frame (64 tiles) vive na VRAM, o tilemap repete-o por toda a largura da tela, e a cada 8 frames de jogo sobrepõe-se com o seguinte via fila DMA (2 KB por passo). Bônus: todas as células de fogo ficam em fase e o scroll do BG_A fica livre para o HUD.

**2. O build que "não mudava nada".** Os fontes novos não estavam onde o makefile os pegava. E ao arrumar isso apareceu um bug fantasma: o rescomp (Java) lê os \`.res\` com charset Cp1252, e um "Í" num comentário UTF-8 jogava \`Input length = 1\`. **Regra desde então: comentários dos \`.res\` sempre em ASCII.**

**3. Orçamento de sprites.** O default do \`SPR_init()\` (420 tiles) não cobre 2 tartarugas + 4 foot soldiers grandes → \`SPR_initEx(600)\`. Daqui saiu o teto de design: **máximo 4 foot soldiers simultâneos**.

Com o sheet novo, a IA completou-se: movimento vertical para alinhar em profundidade, ataques kick e uppercut ao azar, walk_up ao subir e flip conforme a direção real.
`
  },
  {
    date: "2026-07-16",
    part: "16–17 jul",
    title: "Primeiros inimigos",
    tags: ["Gameplay", "Otimização"],
    media: [
      { src: "2026-07-16_primer_footsoldier.gif", caption: "Primeiro foot soldier." }
    ],
    body: `
Primeiro foot soldier (sheet provisório de 7×8 tiles, só idle e caminhada) com IA básica de patrulha / perseguição / ataque e spawns por gatilho de câmera.

**Flash branco ao levar golpe.** Em vez de piscar a visibilidade (que se notava pouco), o sprite troca seu atributo de paleta por uma linha PAL3 carregada toda em branco — **zero DMA por golpe**.

Fixou-se também o mapa de paletas da fase: PAL0 fundo, PAL1 tartarugas (as 4 compartilham paleta unificada), PAL2 inimigos, PAL3 flash.
`
  },
  {
    date: "2026-07-15",
    part: "",
    title: "Fonte arcade e streaming do fundo",
    tags: ["Motor", "Otimização", "Arte", "Áudio"],
    media: [
      { src: "2026-07-15 fuente arcade.gif", caption: "O título da Scene 1 aparecendo letra por letra com a fonte do arcade" }
    ],
    body: `
**Fonte do arcade** ripada e adaptada (ASCII 32..126) para o título da fase: *"SCENE 1 — FIRE! WE GOTTA GET APRIL OUT!!"* aparecendo letra por letra (typewriter com skip por START). Lição: exporta-se a fonte com \`TILESET ... NONE NONE\` porque a deduplicação do rescomp quebra o mapeamento 1:1 entre caractere ASCII e tile.

**Streaming de colunas do fundo.** Como a fase (1376 px) não cabe em nenhum plano, o tileset completo (~495 tiles únicos) carrega-se uma única vez para a VRAM e o plano BG_B funciona como **janela circular de 64 colunas**: conforme a câmera avança, desenham-se colunas novas pela borda direita pisando as que saem pela esquerda. Como o beat-em-up nunca retrocede, só é preciso revelar para frente. O tilemap vai sem compressão (\`NONE\`) para indexá-lo direto da ROM.

Além disso: seleção de 1 ou 2 jogadores, câmera com dead-zone, e **XGM2** como driver de áudio (permite controle de volume — a música da fase saturava e baixou-se ao 40%).
`
  },
  {
    date: "2026-06-30",
    part: "",
    title: "Os assets definitivos",
    tags: ["Arte"],
    media: [
      { src: "2026-06-30_mike.gif", caption: "Animações para o Mike" },
      { src: "2026-06-30_raph.gif", caption: "Animações para o Raph" }
    ],
    body: `
Dia grande de arte. As quatro tartarugas ficam em spritesheets de grade 13×13 tiles (frames de **104×104 px**, 18 animações cada: idle, chute, combo de 3 golpes, salto, chute no salto, caminhadas, especial, hits de frente e de costas, levantar-se, agarrada).

E o fundo completo da fase 1 fica armado: **1376×224 px**, mais largo que qualquer plano que o Mega Drive possa desenhar. Essa largura forçou uma das técnicas centrais do projeto (ver a entrada de 15/07).
`
  },
  {
    date: "2026-06-26",
    part: "26–27 jun",
    title: "Seleção de personagem e módulo do jogador",
    tags: ["Gameplay", "Motor"],
    body: `
A seleção de personagem passa de maquete a funcionar de verdade: o sprite da tartaruga escolhida aparece na tela.

**Refactor importante.** O código do jogador separa-se num módulo próprio (\`player.c/h\`) com máquina de estados para as animações (IDLE, WALKING, ATTACKING, JUMPING, HURT, GRABBED). O design é **multi-instância desde o dia um** — todas as funções recebem um \`Player*\` — pensando no modo de 2 jogadores.
`
  },
  {
    date: "2026-06-25",
    part: "",
    title: "Nasce o repositório",
    tags: ["Infra"],
    body: `
Primeiro commit e README. O projeto formaliza-se: estrutura padrão de SGDK (\`src/\`, \`res/\`, \`out/\`), licença de projeto fan não comercial, e créditos à Konami, a Stéphane Dallongeville (SGDK) e à comunidade de preservação.
`
  },
  {
    date: "2026-04-15",
    part: "abril–maio de 2026",
    title: "Retomando: intro e arquitetura de cenas",
    tags: ["Motor", "Arte", "Áudio"],
    media: [
      { src: "2026-04-05_rocksteady_intro.gif", caption: "Intro com Rocksteady como protagonista." }
    ],
    body: `
Depois de uma pausa longa, o projeto retomou-se com duas frentes.

**Intro estilo arcade.** O logo da SEGA não podia ser estático: Rocksteady entra correndo e choca contra ele, com efeito sonoro de golpe e música de intro em VGM.

**Máquina de estados de cenas** (\`scenes.h\`). Cada tela do jogo é uma função \`showXxx()\` que devolve o \`SceneId\` seguinte, e \`main.c\` é um simples switch que vai encadeando cenas. Essa decisão inicial mostrou-se chave: adicionar telas novas depois foi sempre trivial.

Também dessa época: a música da fase 1 (\`fire_v3.vgm\`) e a configuração do emulador Gens.
`
  },
  {
    date: "2025-02-01",
    part: "fevereiro de 2025",
    title: "Os primeiros experimentos",
    tags: ["Arte", "Áudio"],
        media: [
      { src: "2026-02-01_intento_intro.gif", caption: "Primeira tentativa de criar o seletor de personagens." },
      { src: "2026-02-01_intento_definitivo.gif", caption: "Seletor de personagens definitivo." }
    ],
    body: `
Antes de existir o repo, o projeto começou como uma série de protótipos soltos em SGDK. Dessa época sobrevivem os assets mais velhos: o logo do TMNT e a tela de seleção de personagem (retratos em escala de cinza que "se acendem" ao selecionar, o cursor em forma de tartaruga, a sheet de rostos do HUD), a música de seleção convertida para VGM desde o arcade, e os primeiros testes de conceito da fase 1: \`bg_test.png\` e \`firetest.png\`.

Já desde o princípio a ideia era que a Scene 1 — o apartamento em chamas onde April está presa — tivesse o fogo animado em primeiro plano como protagonista.
`
  }
];
