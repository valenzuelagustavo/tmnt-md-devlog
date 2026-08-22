/*
 * DEVLOG — TMNT: The Arcade Game port (Sega Mega Drive / SGDK) — ENGLISH
 * ------------------------------------------------------------------
 * Mantainer notes in Spanish on purpose: data/devlog.js (ES) is the
 * canonical file with authoring instructions. Translate "title",
 * "part", "tags", media captions and "body" here; keep "date" and
 * media "src" identical to the ES file so filters and images match.
 */

window.DEVLOG_CATEGORIES = ["Engine", "Gameplay", "Art", "Audio", "Optimization", "Infra"];

window.DEVLOG = [
    {
    date: "2026-08-09",
    part: "",
    title: "We've got music!",
    tags: ["Music", "Art", "Audio", "Intro"],
    media: [
      { src: "devlog_2026-08-09 231242.gif", caption: "New music collaborator! SANSENPAI35!" },
      { src: "devlog_2026-08-09 231417.gif", caption: "First intro attempts" },
      { src: "devlog_2026-08-09 231555.gif", caption: "New HUD details and Hurry! sign" },
    ],
    body: `

**WE'VE GOT MUSIC!!**

Sansenpai35 joined the development and will contribute the port's music. In record time he pulled off a tremendous job with his version of the level 1 theme Fire! ... He has a YouTube channel and I invite everyone who enjoys Master System / Mega Drive chiptunes and other audio wonders to drop by, subscribe, leave some likes and kind comments — he deserves them!

His channel is: https://www.youtube.com/@sansenpai3556

**First intro attempts**

The intro is giving me more headaches than I expected. I tried composing it from the rips but plane handling gave me lots of trouble... So I went with scrolling the whole image but it kept glitching. Then I split the image into 4 chunks but the glitches remained. As a last resort (and how it stands for now) I split the image into 5 chunks of 304x512 each except the last one at 304x408 px, loaded them with a 224 px overlap so no hard cut would be "noticeable" between \`images\`... Unfortunately it still gave me some graphic glitches at the seams. Technically there shouldn't be any because I believe I'm within the tile budget... But well... I added a white flash to see if it disguised those glitches, and yes, it hides them... but I'm not happy. At the moment I can't think of another way to approach it. Leaving it as a TODO.

**Hurry! sign added and HUD details**

The HUD now has a \`Sprite\` with the chosen turtle's portrait. Also added the Hurry! sign for when the player stands still without advancing the camera for 6 seconds. It shares its \`palette\` with the turtles (like the rest of the HUD).

**Continue and turtle select**

Now when you die you can continue the run up to 3 times and pick another turtle. In two-player mode those continues are shared. You can't pick the same turtle as the other player.

**To-do and future plans**

Still to do: nail down Rocksteady's behavior and his hitbox.
Try to finish the intro — it's the request that came up every single time I shared the project.

As a future plan, I intend to add new selectable characters with a twist. If you input a certain combination on the players-count select screen and choose 1P, I plan to make Slash playable. And if you do the same combination but choose two players, I plan to enable Casey Jones and Raphael (with a new look). That, of course, way into the future.

Before wrapping up, there's a new ROM available with everything mentioned above. Enjoy the music!!
`
  },
  {
    date: "2026-08-01",
    part: "",
    title: "Say your prayers turtles!",
    tags: ["Gameplay", "Art", "Scenes", "Boss"],
    media: [
      { src: "nuevo_lvl.gif", caption: "New scene of the level" },
      { src: "drill_capsule.gif", caption: "The drill capsule appears" },
      { src: "flash_light_boss.gif", caption: "Flash effect measures the boss HP" },
    ],
    body: `

**There was a huge amount of progress these days**

I'm about to start studying and you can smell the lack of time in the air, which forced me to speed up on the project these days. Following impulses and loose plans I added new animations for the Purple Foot Soldier, new behavior for the orange one, a new phase in the level and the appearance of Rocoso (Rocksteady) to give the level a proper close.
The boss's behavior still needs polish. Some graphic topics need rethinking. The drill capsule pushed what fits on screen to the limit and gave me the first serious flicker.

**New sound effects**

I found what are presumably all the voice overs and sounds of the game. I had to convert them to 8-bit \`.wav\` so they could be added. Several are still missing, but the few I added add a nice touch to the game.

**Flash effect**

The flash effect seen when Rocoso is low on health is the same one I used at first with the foot soldiers. Since it uses \`PAL3\`, and that palette is also used by the HUD text, the text flickers too. This will be fixed once I replace the numbers with sprites.

**Problems I have to fix**

Several issues I've been kicking around plus some new ones. Listing them here to remember.

-Robot whip behavior. When it catches the player there are graphic glitches depending on distance.
-Camera lock in the section with the two elevators. You can keep advancing, which triggers the robot. It may cause problems. (I noticed the arcade has this too, and it's possible to skip the robot that way).
-Sprite visibility loss when exiting the drill capsule. Not sure how I can save VRAM here. Hope something comes to mind.
-Drill capsule door doesn't show closed. I have to extend the duration of the last animation frame.
-Drill capsule priority. It draws over the smoke from the level's ceiling and should stay behind.
-Rocoso behavior. For now he has a very poor, basic AI.
-General hitbox tuning. High priority for Rocoso.

Not sure I'll have time to make progress these coming weeks. Until then, to whoever reads.
`
  },
    {
    date: "2026-07-27",
    part: "",
    title: "Enemy spawning and graphic details",
    tags: ["Gameplay", "Art"],
    media: [
      { src: "2026-07-27_efecto_fuego.gif", caption: "Fire effect on doors" },
      { src: "2026-07-27_fire_ascensor.gif", caption: "Fire effect on elevators" },
    ],
    body: `
## July 27 — Palette animation on fire details

**Palette animation**

A small color animation was implemented on the palette used for fire. Basically certain indices swap their colors around to create an animated effect. In the level it applies to anything that is fire. On top of that I added decorative sprites along the level (behind doors and inside elevators). Thanks to this it actually starts feeling like a building on fire.

**The camera now locks at key points**

We now have defined zones in the level where the camera won't let the player advance until all enemies are eliminated. I also defined how many enemies spawn and from where. Remaining: finish ripping the \`foot soldiers\` animations so I can fully polish their behavior.

**The iron ball has sound now**

The iron ball rolling down the stairs has sound now. A .wav sample plays on CH3.

**Hitboxes adjusted**

Each turtle's individual hitbox was tuned to its weapon, so Donatello is the one with the longest reach and Raphael the shortest. Later on I'll also change each one's damage output. Maybe that drifts a bit from the arcade, but since a 1:1 conversion is impossible...

**White flash removed when hitting an enemy**
Until now hitting an enemy triggered a white flash. Removed since it required \`PAL3\`, and that palette is now being used by the orange \`foot soldier\` and soon by the white one.
`
  },
    {
    date: "2026-07-26",
    part: "",
    title: "Falling spheres, improved robot, fire scroll",
    tags: ["Audio", "Gameplay", "Art", "Optimization"],
    media: [
      { src: "2026-07-26_ball_path.png", caption: "First calculated path of the ball" },
      { src: "2026-07-26_Ball_stairs.gif", caption: "The ball falling down the stairs" },
      { src: "2026-07-26_robot_whip.gif", caption: "The robot and its annoying whip" }
    ],
    body: `
## July 26 — Fire scroll, the iron ball and robot tweaks

Polish session on level 1: making the fire finally scroll, a new obstacle (the metal sphere rolling down the stairs) and two fixes to the whip robot. (In between this entry and the previous one the project also gained the **whip robot** as an end-of-level mini-boss —its own state machine with patrol, ranged laser and grabbing electrocution— and the final **cutscene** SCENE_ENDING; mentioned here in passing, their development isn't documented in detail in this diary.)

**The fire now scrolls with the world (per-tile parallax).**

- Until now the fire was glued to the screen: \`BG_A\` had H scroll fixed at 0. In the arcade the fire is part of the world and moves as you advance. But BG_A also carries the HUD (top strip), so the whole plane can't scroll without dragging the HUD along.
- **Solution:** horizontal scroll **per tile** (VDP_setScrollingMode(\`HSCROLL_TILE\`,
  \`VSCROLL_PLANE\`)). The HUD rows (0-3) stay at scroll 0 and the 8 rows of the fire band move on their own. Since H scroll mode is **global to both planes**, bgUpdate() now also feeds BG_B's whole table (28 rows at -cameraX) instead of a single VDP_setHorizontalScroll.
- The fire cell (64px) repeats across the whole circular plane (512px = 8×64), so scroll wraps seamlessly. Parallax tuneable via FIRE_SCROLL_NUM/DEN (1/2 = soft drift, 1/1 = anchored to the world). clearScene() restores \`HSCROLL_PLANE\` so the other scenes' scrolling doesn't break.

**Iron ball: obstacle bouncing down the stairs.**

- New sprite \`iron_ball\` (32×32, 2 spinning frames) appearing every ~3s at the top of the level stairs, bouncing down diagonally until exiting at the bottom. If it touches a turtle it takes away 1 bar (via damagePlayer, with i-frames → a single hit per pass); if it touches a foot soldier, it crushes it.
- **Coordinates** like the rest of the engine: world \`x\` (anchored to the world, scrolls with the camera), y = contact line (same scale as lane/feet) descending, z = bounce height (visual offset over a "step" at z=0, same concept as the player jumpZ). Depth collision (\`|feetY - y|\`) + X, ignoring z. Y-sorting depth = y.
- **The palette was the fine detail.** The PNG came indexed in generic greys (indices 11-15), but in the REAL turtle palette (\`PAL1\`) those slots are lavender/red/magenta → the ball would have come out colorful. \`PAL1\` does have greys, at indices 1/4/10/13. The PNG was re-indexed to those slots by brightness proximity (4 tones left instead of 5) and given the turtle palette.
- **First version spawned at random X**; comparing against the arcade GIF fixed it: the ball ALWAYS comes down the stairs. Measuring bg01_completa.png showed the stairs occupy world X ≈ 508-620, and tracking the sphere frame by frame in the GIF confirmed it spawns up top and rolls **diagonally right**. Now it spawns at a fixed world X (IRON_BALL_STAIRS_X), with diagonal drift (IRON_BALL_ROLL) and only while the top of the stairs is on screen. Cadence set by IRON_BALL_PERIOD.
- All logic lives in scenes.c (static ironBall* functions, same home as the fire and HUD). \`SPR_initEx\` went up to 620 due to the ball's 16 tiles.

**Whip robot: electrocution frame by distance + more speed.**

- **Frozen-frame bug:** when catching the turtle, the electrified whip didn't stay at the correct length. The calculation scaled with the number of frames of the *throw* anim but applied it to the *electro* anim (different frame count → index out of range) and measured distance from the sprite edge instead of the center. Replaced by a \`robotElectroFrame()\` helper using the throwFrame it **actually hooked with** (= the exact robot→player distance at that instant) scaled to the electro anim's REAL \`numFrame\`, recomputed at each A↔B alternation in case they differ.
- **More speed:** \`ROBOT_SPEED\` movement 2→3 (patrol + Y alignment); auto animations (appearance, spin, walk, windup, laser) lowering the robot_whip sprite time from 8 to 6; whip (throw/retract, hand-animated) \`ROBOT_THROW_TICKS\` 5→3; and \`ROBOT_LASER_FIRE_DELAY\` 12→8 so the beam fires earlier and fits within the already sped-up anim.

**New house rule:** a sprite that "shares X's palette" (PAL1/PAL2/…) must be indexed against the REAL indices of that palette, not against any grey palette. Before drawing it with TILE_ATTR(PALx,...) verify the slots against the destination palette — "being grey" isn't enough.
`
  },
  {
    date: "2026-07-24",
    part: "",
    title: "Sprites, sprites, sprites and more sprites",
    tags: [ "Art"],
    media: [
      { src: "2026-07-24_original.png", caption: "The original image, over 50 colors." },
      { src: "2026-07-24_dos paletas.png", caption: "The image with two palettes. 30 colors total."}
    ],
    body: `
Last night and this morning I worked on ripping the purple foot soldier animations. Also did a rip of the end-of-level image, when Shredder kidnaps April. It was interesting to work on since \`SWAPPRITE\` (my app for handling color palettes) didn't give me the result I expected. In the end I composed the image with two palettes and I think the result is quite good. Did the one with all four turtles together and that's the one staying for now, though I plan for the displayed turtle to be the player's choice (or both if playing 2P).

That image is already included in the code. One problem came up: I first loaded the plane B version and then plane A's. The loading gap made the result look bad. Solved it with a fade from black. So even though plane A takes a bit longer it doesn't matter because it stays hidden behind that black screen and the player sees the full picture.
`
  },
    {
    date: "2026-07-23",
    part: "",
    title: "Working on the robot sprite",
    tags: [ "Art"],
    media: [
      { src: "2026-07-23_ride.gif", caption: "The movement animation." },
      { src: "2026-07-23_swapprite.png", caption: "Swapprite interface."}
    ],
    body: `
Working on the animation of the robot sprite that rises from the floor at the end of the level. Wondering whether VRAM will be enough.

**ASEPRITE & SWAPPRITE to the rescue.** Like everywhere in this project, I handle \`SPRITES\` with ASEPRITE. Then I use my own app, \`SWAPPRITE\`, to replace the original palette (usually with many more colors) with one of the palettes already defined for this level. Here I'll use the Foot Soldiers' palette since it adapted best to the enemy's colors. If I want color variants of the Foot Soldiers I'll need to use \`PAL3\`, which I had been reserving. Right now that palette is being used for the enemies' hit flash, but I think I can implement something to get around that effect another way. Speaking of this enemy, it brings a couple of attacks that will be a real headache: the whip that catches the turtles and electrocutes them, and the laser ray shot (the game's first projectile). I have two ideas in my head for dealing with the whip. One is to use the wide sprite directly and fit the whole whip into the animation; the other is to use two sprites, the extended whip being something that only spawns when the robot plays its whip-throwing animation. I'd have needed this anyway to shoot the laser ray... I also have to rip straight from the arcade ROM the animations of the turtles being electrocuted, since the rips I found online didn't include them. Well, that's all for this entry. Days of heavy pixel editing and little code ahead.
`
  },
  {
    date: "2026-07-22",
    part: "",
    title: "Level-start voice over, speech bubble and doors that spit out enemies",
    tags: ["Audio", "Gameplay", "Art", "Optimization"],
    media: [
      { src: "2026-07-22_voice_over.gif", caption: 'Voice over + "Attack!!" bubble as the level starts' },
      { src: "2026-07-22_foot_soldier_door.gif", caption: "A foot soldier breaks through the door and joins the fight" },
      { src: "2026-07-22_explosion.gif", caption: "Foot soldier death with explosion" }
    ],
    body: `
Long session with three fronts: voicing the level start, extending the foot soldier, and turning the background doors into spawn points.

**Voice over + "Attack!!" bubble.** The shout goes in as an **XGM2 driver PCM sample** (\`WAV attack_vo\` resource, resampled to 13.3 kHz and aligned to 256 bytes), fired with \`XGM2_playPCMEx\` on PCM channel 2 at priority 15 — so it plays over the level music (channel 1) without getting stepped on. The **bubble** (\`attack_bubble\`, 64x32) shares the turtles' palette (PAL1), sits at a fixed screen position (independent of player and camera) and cycles appear → hold → blink → disappear, all time-based. EVERYTHING fires the moment the level starts; meanwhile, the player now spawns 5 tiles from the left edge and the first foot soldier is already visible hugging the right edge, moving toward the player.

> **Lesson learned the hard way:** at first nothing could be heard. It wasn't the channel or the code: the WAV was recorded very low (peak at 22%, RMS ~4.5% of full scale). On an 8-bit DAC with music playing on top, a weak sample is flat-out inaudible. Normalized with compression + makeup to ~24% RMS and it appeared. **New rule:** prepare WAVs (normalize/compress) and check AMPLITUDE, not just format.

**Extended sheet + death by explosion.** The foot soldier spritesheet went from 5 to **8 animations** (5x8 grid, 104x104 frames): besides idle / walk / kick / uppercut / walk-up, there's now **explosion**, **direct punch** and **door break**. rescomp detects the rows on its own — no need to touch \`enemies.res\`. On death, the foot soldier plays \`ANIM_EXPLODE\` (once, no loop) instead of staying on idle, and skips the white flash on the fatal blow so the explosion colors can be seen. The direct punch joined the random attack rotation (same duration and hitbox as the uppercut).

**Doors as spawn points.** \`door_lvl_1\` (40x80) draws over each of the 3 open door gaps in the background (world centers **429, 718, 846**, measured on \`bg01_completa.png\`), sharing the re-indexed **background** palette (PAL0) — zero palette lines. **Proximity trigger:** when the player passes, the door gets "armed"; as soon as there's room among active enemies (\`MAX_ACTIVE_ENEMIES\`) the door sprite is removed and a foot soldier appears BREAKING through with \`ANIM_BREAK_DOOR\` (starting from the 2nd frame) before becoming a regular enemy. New state \`ENEMY_STATE_SPAWNING\`: no AI nor collision while breaking. Door sprites are created/released based on visibility; worst case measured in 2-player mode at **~544 of 600 tiles** — fits without touching the \`SPR_initEx\` budget.
`
  },
  {
    date: "2026-07-20",
    part: "night · cont.",
    title: "KO tweaks, Game Over scene and a scroll bug",
    tags: ["Gameplay", "Engine"],
    body: `
Three fixes after testing the HUD and death.

**Exact KO frame.** The turtle lying-down pose is frame 11 (the "12th") of \`ANIM_HIT_BEHIND_2\`. Before, the whole animation played out (loop off) and, since 12 frames at FAST 7 take ~84 frames but the KO lasts 70, the turtle revived BEFORE reaching the pose. Now we jump DIRECTLY to frame 11 with auto-animation off (\`SPR_setAutoAnimation(FALSE)\` + \`SPR_setAnimAndFrame\`) and freeze there; on reviving, auto-animation turns back on.

**Game Over scene.** New \`SCENE_GAME_OVER\` (\`showGameOver\` in \`scenes.c\`, case in \`main.c\`). Shows "GAME OVER" in white on black (default font, white placed at index 15 of PAL0), waits ~4s or START, and restarts from the SEGA logo. The level now exits to this scene instead of going straight to SEGA.

**Inherited scroll bug.** When restarting after a game over, the menu's TMNT logo appeared shifted to the right. Cause: \`clearScene()\` cleared the planes but did NOT reset the scroll, and the level leaves BG_B at \`-cameraX\`. Scroll H/V reset for both planes was added to \`clearScene()\`.
`
  },
  {
    date: "2026-07-20",
    part: "night",
    title: "HUD content: health bar, lives and score",
    tags: ["Gameplay", "Engine"],
    media: [
      { src: "2026-07-21_hud.gif", caption: "HUD in action: health bar, lives and score" }
    ],
    body: `
The HUD frame got filled with its three indicators, arcade style, without touching the frame size: everything fits inside the original \`hud_1p.png\`/\`hud_2p.png\` (72x32), within the 2 rows of usable interior tiles.

**Compact layout (like the arcade).** Top row = "1UP" (painted into the art) + SCORE right-aligned; bottom row = LIVES on the left + BAR on the right. Nothing steps on the level background: everything stays in the top black strip. (A first attempt enlarged the frame to 72x48, but it was too tall; back to 72x32 by shrinking the bar.)

**Health bar (\`hp_bar.png\`, 11 frames of 32x8).** Frame 0 = 10 bars, frame 10 = 0 bars. Original art was 32x16; cropped by script to 32x8 (one tile row) taking advantage of the segments being uniform columns, so it fits next to the score in the frame's 2 rows. Shares the turtles' palette (PAL1). Drawn as TILES on BG_A (high priority, same as the frame), NOT as a sprite: it doesn't spend \`SPR_initEx\` budget or fight sprite/plane layering. One frame (4x1 = 4 tiles) lives in VRAM per player and, on hit, gets overwritten with the next frame via DMA — the same streaming technique as the fire. In the \`.res\` it goes \`NONE NONE\` to index each frame directly from ROM (\`frame N -> tile N*4\`).

**Health / lives / score on the player.** \`Player\` gained \`health\` (0..10, starts full), \`lives\` (starts at 3) and \`score\`. Each foot soldier hit removes one bar (\`damagePlayer\`); when empty a life is lost and the bar refills. Killing a foot soldier adds 1 point to the killing player's score (the transition to \`ENEMY_STATE_DEAD\` is detected in the collision loop in \`scenes.c\`).

**Lives and score as TEXT.** Default font (\`VDP_drawText\`) on BG_A. Drawn on **PAL3**, exploiting that the "flash" palette is pure white across all indices → white text without spending a palette line of its own. The HUD caches what was last drawn and only rewrites VRAM when something changes.

**Knockout on losing a life.** When the bar empties, the turtle enters \`STATE_KO\` and shows the last frame of \`ANIM_HIT_BEHIND_2\` (the lying pose) during \`PLAYER_KO_FRAMES\` (~1.2s) before reviving. On revive the bar refills and respawn invulnerability kicks in.

**Blinking only on revive.** "Logical" invulnerability (\`invincible\`, no visual effect) got separated from blinking (\`blinkTimer\`). A regular hit NO LONGER makes the sprite blink (it stays visible during its i-frames); the classic blink is reserved for respawning after losing a life.

**Game over.** At 0 lives the knocked-out pose shows and only then does the level cut off (\`isPlayerGameOver\` returns flag \`gameOver\`, raised at the end of the KO).
`
  },
  {
    date: "2026-07-19",
    part: "night · cont.",
    title: "Diagonal wall at the end of the level",
    tags: ["Gameplay", "Engine"],
    body: `
Comparing against the original arcade surfaced a collision bug: at the end of the level there's a stairwell / *fire escape* drawn in the background **in perspective** (diagonal), but the movement limit was a straight vertical line.Result: in the back lanes (closer to the background) the character could walk "over" the drawn wall, ending up standing in mid-air on top of the structure.

** Fix:** the real solid edge was measured directly on \`bg01_completa.png\` (a Python script detecting where floor color stops being floor). Gave a reference point at each end of the lane — X≈1308 in the back lane (Y=142) and X≈1352 in the front one (Y=200) — and with those two points the real X cap is **linearly interpolated** according to each character's depth, instead of a fixed limit.

Applied to both the player (\`levelEndWallX\` in \`player.c\`) and the foot soldiers (\`enemyMaxX\` in \`enemy.c\`): chase, kick lunge, knockback and group separation. Nobody crosses the wall anymore, in any lane.
`
  },
  {
    date: "2026-07-19",
    part: "night",
    title: "Air mobility and a wider floor",
    tags: ["Gameplay", "Engine"],
    body: `
Fine-tuning arcade fidelity, starting from reviewing the original.

**Jump with Y-axis movement.** In the arcade, jumping lets the turtle keep repositioning in depth too (up/down), not just X. Before, jumping only allowed X movement because physics used \`p->y\` directly to simulate the vertical arc. The refactor moved jump height into a new field, **\`jumpZ\`** (a purely visual offset subtracted when drawing), freeing \`p->y\` to always represent the real depth lane, the same in the air as walking.

Good side effect: Y-sorting (\`SPR_setDepth\`) and jump-kick reach became simpler and more correct — no special case needed for the jump state anymore.

**Wider floor.** The lane bounds (\`BOUND_LANE_TOP/BOTTOM\`) were widened 1 tile (8 px) at each end → 142/200, mirroring the tweak in \`ENEMY_LANE_TOP/BOTTOM\` so no sidewalk strips are left uncovered by the AI.
`
  },
  {
    date: "2026-07-19",
    part: "afternoon",
    title: "Recalibrating the jump and the special",
    tags: ["Gameplay"],
    media: [
      { src: "2026-07-19_jump-kick.gif", caption: "Jump kick with momentum and the special's little hop" }
    ],
    body: `
*Game feel* session on turtle controls.

**Phased jump.** The animation no longer runs on its own: sprite auto-animation gets turned off (\`SPR_setAutoAnimation\`) and frames are picked by hand according to physics — frame 0 going up, looping at apex and fall, and the last frame only ~2 frames before touching ground (predicted with current velocity).

**Jump kick with two variants.** Punch alone = normal flight; punch + X direction = the turtle travels on its own with momentum at 4 px/frame (double the normal air control), committed trajectory, reaches much farther.

**Button A remapped to the SPECIAL.** Now A and B+C trigger the special, which kills foot soldiers in a single hit. Pending: once the HP system exists, the special must cost the player health, like in the arcade.

**Special's visual hop.** While the animation lasts, the sprite is drawn \`PLAYER_SPECIAL_LIFT\` (8 px) higher. Purely a *render* offset: the logical \`p->y\` is untouched.
`
  },
  {
    date: "2026-07-18",
    part: "Jul 18–19",
    title: "From tech demo to playable game",
    tags: ["Gameplay"],
    media: [
      { src: "2026-07-19_combat.gif", caption: "Wave of foot soldiers with group AI and combos" }
    ],
    body: `
Big batch of *game feel*, in phases.

**Enemy damage → turtle.** Hitbox active only during the strike's real window, one hit per swing, and player reaction depends on where it came from (alternating front HITs, HIT_BEHIND from behind), ~20 px knockback, 45 invulnerability frames with blinking, and aerial dodge (jumping means you don't get hit).

**Aggressiveness.** Each enemy has its own cooldown between attacks (60–91 frames, randomized), a global cap of 2 simultaneous attackers (the rest surround from a distance in a ~72 px waiting ring, the genre's classic *circling*), stopping distance and pairwise separation.

**Targeting in 2P.** The "they ignore player 2" bug came from re-picking the closest target every frame. Now each enemy gets a target assigned at spawn and re-evaluates every 32 frames with 48 px hysteresis.

**Turtle hitbox and combos.** Fixed that the strike window was measured from the frame edge (hitting "above", not forward): now measured from center with 64 px frontal reach. And the B-B-B combo now uses input buffering + a 20-frame link window, instead of requiring the exact last frame of the animation.

**Wave spawner.** Each spot of the level sends a wave (3 in the first, 4 in the rest) with varied depth lanes, spawning off-screen from both flanks already chasing. Level total: **23 foot soldiers**.

Also: bilingual ES/EN SGDK credits screen, camera with dead-zone and lagging-player cap in 2P, and the HUD frames (\`hud_1p\`/\`hud_2p\`) drawn on BG_A with high priority.
`
  },
  {
    date: "2026-07-18",
    part: "",
    title: "The fire, the foot soldier's new sheet and VRAM",
    tags: ["Optimization", "Art", "Gameplay"],
    media: [
      { src: "2026-07-18_fire.gif", caption: "Foreground fire via tile streaming" }
    ],
    body: `
Intense session. In come the definitive foot soldier spritesheet (5×5 grid of 104×104, the same as the turtles) and the foreground fire. Three technical battles.

**1. Scroll-based fire wouldn't fit in VRAM.** The classic plan was drawing the 8-frame strip and running BG_A scroll. But measuring the real assets: ~400 tiles of fire + ~495 of background + ~540 of sprites = ~1550 tiles over ~1400 available. Didn't fit even in 1-player mode.

> **Final solution: tile-streaming animation.** A single frame (64 tiles) lives in VRAM, the tilemap repeats it across the width of the screen, and every 8 game frames it's overwritten with the next one via DMA queue (2 KB per step). Bonus: all fire cells stay in sync and BG_A scroll stays free for the HUD.

**2. The build that "changed nothing".** The new sources weren't where the makefile picked them up. And fixing that surfaced a ghost bug: rescomp (Java) reads \`.res\` files with charset Cp1252, and an "Í" in a UTF-8 comment threw \`Input length = 1\`. **Rule ever since: comments in \`.res\` files always ASCII.**

**3. Sprite budget.** \`SPR_init()\` default (420 tiles) doesn't cover 2 turtles + 4 large foot soldiers → \`SPR_initEx(600)\`. From here came the design cap: **maximum 4 foot soldiers simultaneously**.

With the new sheet, the AI got completed: vertical movement to align in depth, random kick and uppercut attacks, walk_up when climbing and flip based on actual facing direction.
`
  },
  {
    date: "2026-07-16",
    part: "Jul 16–17",
    title: "First enemies",
    tags: ["Gameplay", "Optimization"],
    media: [
      { src: "2026-07-16_primer_footsoldier.gif", caption: "First foot soldier." }
    ],
    body: `
First foot soldier (provisional 7×8-tile sheet, idle and walk only) with basic patrol/chase/attack AI and camera-triggered spawns.

**White flash when hit.** Instead of blinking visibility (barely noticeable), the sprite swaps its palette attribute to a PAL3 line loaded all-white — **zero DMA per hit**.

The level's palette map was also locked in: PAL0 background, PAL1 turtles (all 4 share a unified palette), PAL2 enemies, PAL3 flash.
`
  },
  {
    date: "2026-07-15",
    part: "",
    title: "Arcade font and background streaming",
    tags: ["Engine", "Optimization", "Art", "Audio"],
    media: [
      { src: "2026-07-15 fuente arcade.gif", caption: "Scene 1's title appearing letter by letter with the arcade font" }
    ],
    body: `
**Arcade font** ripped and adapted (ASCII 32..126) for the level title: *"SCENE 1 — FIRE! WE GOTTA GET APRIL OUT!!"* appearing letter by letter (typewriter with START skip). Lesson: export the font with \`TILESET ... NONE NONE\` because rescomp dedup breaks the 1:1 mapping between ASCII character and tile.

**Background column streaming.** Since the level (1376 px) fits in no plane, the complete tileset (~495 unique tiles) loads once to VRAM and plane BG_B works as a **circular 64-column window**: as the camera advances, new columns are drawn at the right edge overwriting the ones leaving at the left. Since a beat-em-up never scrolls back, only forward reveals are needed. Tilemap uncompressed (\`NONE\`) to index it straight from ROM.

Also: 1 or 2 player selection, camera with dead-zone, and **XGM2** as audio driver (allows volume control — level music clipped and was lowered to 40%).
`
  },
  {
    date: "2026-06-30",
    part: "",
    title: "The definitive assets",
    tags: ["Art"],
    media: [
      { src: "2026-06-30_mike.gif", caption: "Animations for Mike" },
      { src: "2026-06-30_raph.gif", caption: "Animations for Raph" }
    ],
    body: `
Big art day. All four turtles land on spritesheets with a 13×13-tile grid (**104×104 px** frames, 18 animations each: idle, kick, 3-hit combo, jump, jump kick, walks, special, front and back hits, getting up, grabbed).

And the complete level 1 background comes together: **1376×224 px**, wider than any plane the Mega Drive can draw. That width forced one of the central techniques of the project (see the 07/15 entry).
`
  },
  {
    date: "2026-06-26",
    part: "Jun 26–27",
    title: "Character select and player module",
    tags: ["Gameplay", "Engine"],
    body: `
Character select goes from mockup to actually working: the chosen turtle's sprite shows up on screen.

**Major refactor.** Player code splits into its own module (\`player.c/h\`) with a state machine for animations (IDLE, WALKING, ATTACKING, JUMPING, HURT, GRABBED). Design is **multi-instance from day one** — all functions receive a \`Player*\` — with 2-player mode in mind.
`
  },
  {
    date: "2026-06-25",
    part: "",
    title: "The repository is born",
    tags: ["Infra"],
    body: `
First commit and README. The project formalizes: standard SGDK structure (\`src/\`, \`res/\`, \`out/\`), non-commercial fan project license, and credits to Konami, Stéphane Dallongeville (SGDK) and the preservation community.
`
  },
  {
    date: "2026-04-15",
    part: "April–May 2026",
    title: "Back on track: intro and scene architecture",
    tags: ["Engine", "Art", "Audio"],
    media: [
      { src: "2026-04-05_rocksteady_intro.gif", caption: "Intro starring Rocksteady." }
    ],
    body: `
After a long pause, the project resumed on two fronts.

**Arcade-style intro.** The SEGA logo couldn't be static: Rocksteady runs in and crashes into it, with a hit sound effect and intro music in VGM.

**Scene state machine** (\`scenes.h\`). Every screen of the game is a \`showXxx()\` function returning the next \`SceneId\`, and \`main.c\` is a simple switch chaining scenes together. This early decision proved key: adding new screens afterwards was always trivial.

Also from this era: the level 1 music (\`fire_v3.vgm\`) and the Gens emulator setup.
`
  },
  {
    date: "2025-02-01",
    part: "February 2025",
    title: "The first experiments",
    tags: ["Art", "Audio"],
        media: [
      { src: "2026-02-01_intento_intro.gif", caption: "First attempt at creating the character select." },
      { src: "2026-02-01_intento_definitivo.gif", caption: "Definitive character select." }
    ],
    body: `
Before the repo existed, the project started as a series of loose prototypes in SGDK. From this era survive the oldest assets: the TMNT logo and the character select screen (grayscale portraits that "light up" when selected, the turtle-shaped cursor, the HUD faces sheet), the select music converted to VGM from the arcade, and the first proof-of-concept tests of level 1: \`bg_test.png\` and \`firetest.png\`.

From the very beginning the idea was for Scene 1 — the burning apartment where April is trapped — to have foreground animated fire as the protagonist.
`
  }
];
