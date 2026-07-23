/* ============================================================
   TMNT Arcade — Devlog · lógica del sitio
   Sin dependencias externas. Renderiza devlog + builds y maneja
   filtros, contadores y tamaños de ROM.
   ============================================================ */

/* ---- CONFIG: editá esto ---- */
const CONFIG = {
  // Poné la URL de tu repo de GitHub. Si lo dejás vacío, los enlaces
  // "GitHub / Repositorio" se ocultan solos.
  repoUrl: "https://github.com/valenzuelagustavo/TMNT-ARCADE-MEGADRIVE-PORT"   
};

/* ---------- Mini Markdown (subconjunto) ---------- */
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function mdInline(s) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (m, c) => { codes.push(c); return "@@CODE" + (codes.length - 1) + "@@"; });
  s = escapeHtml(s);
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  s = s.replace(/@@CODE(\d+)@@/g, (m, i) => "<code>" + escapeHtml(codes[i]) + "</code>");
  return s;
}
function renderMarkdown(md) {
  const lines = md.trim().split("\n");
  let html = "", para = [], quote = [];
  const flushPara = () => { if (para.length) { html += "<p>" + mdInline(para.join(" ")) + "</p>"; para = []; } };
  const flushQuote = () => { if (quote.length) { html += "<blockquote>" + mdInline(quote.join(" ")) + "</blockquote>"; quote = []; } };
  for (const raw of lines) {
    const line = raw.trim();
    if (line === "") { flushPara(); flushQuote(); continue; }
    if (line.startsWith(">")) { flushPara(); quote.push(line.replace(/^>\s?/, "")); continue; }
    flushQuote(); para.push(line);
  }
  flushPara(); flushQuote();
  return html;
}

/* ---------- Fechas ---------- */
const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
function fmtDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/* ---------- Devlog ---------- */
let activeFilter = "Todo";

function renderFilters() {
  const box = document.getElementById("filters");
  const cats = ["Todo", ...(window.DEVLOG_CATEGORIES || [])];
  box.innerHTML = cats.map(c =>
    `<button class="fbtn${c === activeFilter ? " active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
  box.querySelectorAll(".fbtn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.cat;
      renderFilters();
      renderTimeline();
    });
  });
}

// Carpeta donde viven las capturas / gifs del devlog.
const MEDIA_DIR = "assets/images/devlog/";

/* Render de capturas/gifs de una entrada. La imagen se muestra por
   defecto; si el archivo todavía no existe (404), el onerror la oculta
   y marca el slot como vacío para mostrar el PLACEHOLDER (borde
   punteado + nombre del archivo esperado). Así se pueden dejar huecos y
   subir los archivos después sin tocar el código. */
function renderMedia(media) {
  if (!media || !media.length) return "";
  const shots = media.map(m => {
    const file = escapeHtml(m.src || "");
    const cap = escapeHtml(m.caption || "");
    const capAttr = cap.replace(/"/g, "&quot;");   // seguro dentro de alt="..."
    return `<figure class="shot" data-file="${file}">
      <img src="${MEDIA_DIR}${encodeURIComponent(m.src || "")}" alt="${capAttr}"
           onerror="this.style.display='none';this.closest('.shot').classList.add('is-empty');">
      <div class="shot-ph" aria-hidden="true">
        <span class="ph-icon">▣</span>
        <span class="ph-label">captura pendiente</span>
        <span class="ph-file">${file}</span>
      </div>
      ${cap ? `<figcaption>${cap}</figcaption>` : ""}
    </figure>`;
  }).join("");
  return `<div class="entry-media">${shots}</div>`;
}

function renderTimeline() {
  const tl = document.getElementById("timeline");
  const entries = [...(window.DEVLOG || [])].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const shown = entries.filter(e => activeFilter === "Todo" || (e.tags || []).includes(activeFilter));
  if (!shown.length) { tl.innerHTML = `<p style="color:var(--ink-dim)">Nada en esta categoría todavía.</p>`; return; }
  tl.innerHTML = shown.map(e => {
    const tags = (e.tags || []).map(t => `<span class="tag" data-t="${t}">${t}</span>`).join("");
    const part = e.part ? `<span class="entry-part">· ${e.part}</span>` : "";
    return `<article class="entry">
      <div class="entry-card">
        <div class="entry-meta"><span class="entry-date">${fmtDate(e.date)}</span>${part}</div>
        <h3 class="entry-title">${escapeHtml(e.title)}</h3>
        <div class="entry-tags">${tags}</div>
        <div class="entry-body">${renderMarkdown(e.body)}</div>
        ${renderMedia(e.media)}
      </div>
    </article>`;
  }).join("");
}

/* ---------- Builds ---------- */
function humanSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  const u = ["B", "KB", "MB"]; let i = 0, n = bytes;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return (i === 0 ? n : n.toFixed(n < 10 ? 1 : 0)) + " " + u[i];
}
function renderBuilds() {
  const box = document.getElementById("builds");
  const builds = window.BUILDS || [];
  box.innerHTML = builds.map((b, idx) => {
    const soon = b.status === "soon" || !b.file;
    const hl = (b.highlights || []).map(h => `<span>${escapeHtml(h)}</span>`).join("");
    const dateTxt = b.date ? fmtDate(b.date) : "en desarrollo";
    const btn = soon
      ? `<span class="dl disabled">Próximamente</span>`
      : `<a class="dl" href="roms/${encodeURIComponent(b.file)}" download>▸ Descargar</a>`;
    const size = soon ? "" : `<span class="build-size" data-size-for="${idx}">${b.size || "…"}</span>`;
    return `<div class="build${soon ? " soon" : ""}">
      <div class="build-top">
        <span class="build-ver">${escapeHtml(b.version)}</span>
        <span class="build-date">${dateTxt}</span>
      </div>
      ${b.codename ? `<div class="build-name">${escapeHtml(b.codename)}</div>` : ""}
      <p class="build-notes">${escapeHtml(b.notes || "")}</p>
      ${hl ? `<div class="build-hl">${hl}</div>` : ""}
      <div class="build-foot">${size}${btn}</div>
    </div>`;
  }).join("");

  // Tamaños automáticos vía HEAD cuando no se especificó "size".
  builds.forEach((b, idx) => {
    if (b.status === "soon" || !b.file || b.size) return;
    const el = box.querySelector(`[data-size-for="${idx}"]`);
    fetch(`roms/${encodeURIComponent(b.file)}`, { method: "HEAD" })
      .then(r => { const len = r.headers.get("content-length"); if (el && len) el.textContent = humanSize(+len); })
      .catch(() => { if (el) el.textContent = ""; });
  });
}

/* ---------- Contadores del strip de stats ---------- */
function animateCounters() {
  const nums = document.querySelectorAll(".stat-num[data-count]");
  const io = new IntersectionObserver((ents) => {
    ents.forEach(ent => {
      if (!ent.isIntersecting) return;
      const el = ent.target; io.unobserve(el);
      const target = +el.dataset.count, suffix = el.dataset.suffix || "";
      const dur = 900, t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const val = Math.round(target * (1 - Math.pow(1 - p, 3)));
        el.textContent = suffix + val.toLocaleString("es");
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  nums.forEach(n => io.observe(n));
}

/* ---------- Repo links ---------- */
function wireRepoLinks() {
  const links = document.querySelectorAll("[data-repo-link]");
  if (CONFIG.repoUrl) {
    links.forEach(a => a.href = CONFIG.repoUrl);
  } else {
    links.forEach(a => a.remove());
  }
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderTimeline();
  renderBuilds();
  animateCounters();
  wireRepoLinks();
});
