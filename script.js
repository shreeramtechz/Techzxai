/* ==========================================================================
   Techzx AI Hub — script.js
   Handles: theme switching, navigation, rendering cards from data.js,
   search, filters, favorites/likes (saved in localStorage), modals, forms.
   ========================================================================== */

/* ---------------- THEME SWITCHER ---------------- */
(function initTheme() {
  const saved = localStorage.getItem("techzx-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("techzx-theme", next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  document.querySelectorAll(".theme-toggle").forEach(btn => {
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
  });
}

/* ---------------- LOCAL STORAGE HELPERS (favorites / likes / bookmarks) ---------------- */
function getStore(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch (e) { return []; }
}
function toggleStoreItem(key, id) {
  let list = getStore(key);
  if (list.includes(id)) list = list.filter(item => item !== id);
  else list.push(id);
  localStorage.setItem(key, JSON.stringify(list));
  return list.includes(id);
}
function isInStore(key, id) { return getStore(key).includes(id); }

/* ---------------- TOAST ---------------- */
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------------- NAVBAR / MOBILE MENU ---------------- */
function initNav() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });
  }

  // Mark active nav link based on current page
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  updateThemeIcon(document.documentElement.getAttribute("data-theme"));
  document.querySelectorAll(".theme-toggle").forEach(btn => btn.addEventListener("click", toggleTheme));
}

/* ---------------- SEARCH OVERLAY (global, searches tools + prompts + wallpapers) ---------------- */
function initGlobalSearch() {
  const openBtns = document.querySelectorAll(".search-trigger");
  const overlay = document.querySelector(".search-overlay");
  if (!overlay) return;
  const input = overlay.querySelector("input");
  const resultsBox = overlay.querySelector(".search-results");
  const closeBtn = overlay.querySelector(".search-close");

  openBtns.forEach(btn => btn.addEventListener("click", () => {
    overlay.classList.add("open");
    setTimeout(() => input.focus(), 100);
  }));
  closeBtn && closeBtn.addEventListener("click", () => overlay.classList.remove("open"));
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("open"); });

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { resultsBox.innerHTML = ""; return; }
    const data = window.TechzxData;
    const toolMatches = data.aiTools.filter(t => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)).slice(0, 4);
    const promptMatches = data.prompts.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 4);
    const wallMatches = data.wallpapers.filter(w => w.title.toLowerCase().includes(q) || w.category.toLowerCase().includes(q)).slice(0, 4);

    let html = "";
    toolMatches.forEach(t => html += searchResultRow(t.name, "Tool", "ai-tools.html"));
    promptMatches.forEach(p => html += searchResultRow(p.title, "Prompt", "prompts.html"));
    wallMatches.forEach(w => html += searchResultRow(w.title, "Wallpaper", "wallpapers.html"));

    resultsBox.innerHTML = html || `<p style="padding:0.75rem;">No results for "${escapeHtml(q)}"</p>`;
  });
}
function searchResultRow(title, tag, link) {
  return `<a class="search-result-item" href="${link}">
    <span>${escapeHtml(title)}</span>
    <span class="search-result-tag">${tag}</span>
  </a>`;
}

/* ---------------- ESCAPE HTML (basic safety for injected text) ---------------- */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------------- STAR RATING RENDER ---------------- */
function renderStars(rating) {
  const full = Math.round(rating);
  let stars = "";
  for (let i = 0; i < 5; i++) stars += i < full ? "★" : "☆";
  return stars;
}

/* =========================================================================
   AI TOOLS — render, filter, search, favorite
   ========================================================================= */
let currentToolCategory = "All";
let toolSearchQuery = "";

function renderToolCard(tool) {
  const isFav = isInStore("techzx-fav-tools", tool.id);
  return `
  <div class="card tool-card fade-in" data-id="${tool.id}">
    <div class="tool-top">
      <div class="tool-icon">${tool.image}</div>
      <button class="btn-icon fav-btn ${isFav ? "active" : ""}" data-action="fav-tool" data-id="${tool.id}" aria-label="Favorite">
        ${isFav ? "❤️" : "🤍"}
      </button>
    </div>
    <span class="tool-category-tag">${tool.category}</span>
    <h3>${escapeHtml(tool.name)}</h3>
    <p>${escapeHtml(tool.description)}</p>
    <div class="tool-features">
      ${tool.features.slice(0, 3).map(f => `<span>${escapeHtml(f)}</span>`).join("")}
    </div>
    <div class="tool-footer">
      <span class="tool-price">${escapeHtml(tool.pricing)}</span>
      <span class="tool-rating">⭐ ${tool.rating}</span>
    </div>
    <div class="tool-actions">
      <a class="btn btn-primary btn-block btn-sm" href="${tool.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
    </div>
  </div>`;
}

function renderToolsGrid(containerId, list) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<div class="empty-state">😕 No tools found. Try a different search or category.</div>`;
    return;
  }
  el.innerHTML = list.map(renderToolCard).join("");
}

function filterAndRenderTools() {
  const data = window.TechzxData.aiTools;
  let filtered = data;
  if (currentToolCategory !== "All") filtered = filtered.filter(t => t.category === currentToolCategory);
  if (toolSearchQuery) {
    const q = toolSearchQuery.toLowerCase();
    filtered = filtered.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  }
  renderToolsGrid("toolsGrid", filtered);
}

function initToolsPage() {
  const grid = document.getElementById("toolsGrid");
  if (!grid) return;

  // Render category chips
  const chipBar = document.getElementById("toolFilterBar");
  if (chipBar) {
    chipBar.innerHTML = window.TechzxData.toolCategories.map(cat =>
      `<button class="filter-chip ${cat === "All" ? "active" : ""}" data-cat="${cat}">${cat}</button>`
    ).join("");
    chipBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-chip");
      if (!btn) return;
      chipBar.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      currentToolCategory = btn.dataset.cat;
      filterAndRenderTools();
    });
  }

  const searchInput = document.getElementById("toolSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      toolSearchQuery = searchInput.value.trim();
      filterAndRenderTools();
    });
  }

  filterAndRenderTools();

  grid.addEventListener("click", (e) => {
    const favBtn = e.target.closest("[data-action='fav-tool']");
    if (favBtn) {
      const active = toggleStoreItem("techzx-fav-tools", favBtn.dataset.id);
      favBtn.classList.toggle("active", active);
      favBtn.textContent = active ? "❤️" : "🤍";
      showToast(active ? "Added to favorites" : "Removed from favorites");
    }
  });
}

/* =========================================================================
   PROMPT LIBRARY — render, filter, search, copy, share, bookmark
   ========================================================================= */
let currentPromptCategory = "All";
let promptSearchQuery = "";

function renderPromptCard(p) {
  const isBookmarked = isInStore("techzx-bookmark-prompts", p.id);
  return `
  <div class="card prompt-card fade-in" data-id="${p.id}">
    <span class="prompt-cat">${p.category}</span>
    <h3>${escapeHtml(p.title)}</h3>
    <p>${escapeHtml(p.description)}</p>
    <div class="prompt-text">${escapeHtml(p.text)}</div>
    <div class="prompt-actions">
      <button class="btn btn-primary btn-sm" data-action="copy-prompt" data-id="${p.id}">📋 Copy</button>
      <button class="btn btn-outline btn-icon" data-action="share-prompt" data-id="${p.id}" aria-label="Share">🔗</button>
      <button class="btn btn-outline btn-icon ${isBookmarked ? "active" : ""}" data-action="bookmark-prompt" data-id="${p.id}" aria-label="Bookmark">
        ${isBookmarked ? "🔖" : "📑"}
      </button>
    </div>
  </div>`;
}

function renderPromptsGrid(containerId, list) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<div class="empty-state">😕 No prompts found. Try a different search or category.</div>`;
    return;
  }
  el.innerHTML = list.map(renderPromptCard).join("");
}

function filterAndRenderPrompts() {
  const data = window.TechzxData.prompts;
  let filtered = data;
  if (currentPromptCategory !== "All") filtered = filtered.filter(p => p.category === currentPromptCategory);
  if (promptSearchQuery) {
    const q = promptSearchQuery.toLowerCase();
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  renderPromptsGrid("promptsGrid", filtered);
}

function initPromptsPage() {
  const grid = document.getElementById("promptsGrid");
  if (!grid) return;

  const chipBar = document.getElementById("promptFilterBar");
  if (chipBar) {
    chipBar.innerHTML = window.TechzxData.promptCategories.map(cat =>
      `<button class="filter-chip ${cat === "All" ? "active" : ""}" data-cat="${cat}">${cat}</button>`
    ).join("");
    chipBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-chip");
      if (!btn) return;
      chipBar.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      currentPromptCategory = btn.dataset.cat;
      filterAndRenderPrompts();
    });
  }

  const searchInput = document.getElementById("promptSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      promptSearchQuery = searchInput.value.trim();
      filterAndRenderPrompts();
    });
  }

  filterAndRenderPrompts();

  grid.addEventListener("click", (e) => {
    const copyBtn = e.target.closest("[data-action='copy-prompt']");
    const shareBtn = e.target.closest("[data-action='share-prompt']");
    const bookmarkBtn = e.target.closest("[data-action='bookmark-prompt']");

    if (copyBtn) {
      const prompt = window.TechzxData.prompts.find(p => p.id === copyBtn.dataset.id);
      if (prompt) {
        copyTextToClipboard(prompt.text);
        showToast("Prompt copied to clipboard!");
      }
    }
    if (shareBtn) {
      const prompt = window.TechzxData.prompts.find(p => p.id === shareBtn.dataset.id);
      if (prompt) {
        const shareText = `${prompt.title}\n\n${prompt.text}\n\nvia Techzx AI Hub`;
        if (navigator.share) {
          navigator.share({ title: prompt.title, text: shareText }).catch(() => {});
        } else {
          copyTextToClipboard(shareText);
          showToast("Share text copied to clipboard!");
        }
      }
    }
    if (bookmarkBtn) {
      const active = toggleStoreItem("techzx-bookmark-prompts", bookmarkBtn.dataset.id);
      bookmarkBtn.classList.toggle("active", active);
      bookmarkBtn.textContent = active ? "🔖" : "📑";
      showToast(active ? "Bookmarked!" : "Bookmark removed");
    }
  });
}

function copyTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}
function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  document.body.removeChild(ta);
}

/* =========================================================================
   WALLPAPERS — masonry render, filter, search, like, preview modal, download
   ========================================================================= */
let currentWallCategory = "All";
let wallSearchQuery = "";

function renderWallCard(w) {
  const isLiked = isInStore("techzx-liked-walls", w.id);
  return `
  <div class="wall-card fade-in" data-id="${w.id}">
    <img src="${w.image}" alt="${escapeHtml(w.title)} wallpaper" loading="lazy">
    <div class="wall-overlay">
      <h4>${escapeHtml(w.title)}</h4>
      <div class="wall-meta">
        <span style="color:#fff;font-size:0.75rem;">${w.category}</span>
        <button data-action="like-wall" data-id="${w.id}" aria-label="Like">${isLiked ? "❤️" : "🤍"}</button>
      </div>
    </div>
  </div>`;
}

function renderWallsGrid(list) {
  const el = document.getElementById("wallpaperGrid");
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<div class="empty-state">😕 No wallpapers found. Try a different search or category.</div>`;
    return;
  }
  el.innerHTML = list.map(renderWallCard).join("");
}

function filterAndRenderWalls() {
  const data = window.TechzxData.wallpapers;
  let filtered = data;
  if (currentWallCategory !== "All") filtered = filtered.filter(w => w.category === currentWallCategory);
  if (wallSearchQuery) {
    const q = wallSearchQuery.toLowerCase();
    filtered = filtered.filter(w => w.title.toLowerCase().includes(q) || w.category.toLowerCase().includes(q));
  }
  renderWallsGrid(filtered);
}

function initWallpapersPage() {
  const grid = document.getElementById("wallpaperGrid");
  if (!grid) return;

  const chipBar = document.getElementById("wallFilterBar");
  if (chipBar) {
    chipBar.innerHTML = window.TechzxData.wallpaperCategories.map(cat =>
      `<button class="filter-chip ${cat === "All" ? "active" : ""}" data-cat="${cat}">${cat}</button>`
    ).join("");
    chipBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-chip");
      if (!btn) return;
      chipBar.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      currentWallCategory = btn.dataset.cat;
      filterAndRenderWalls();
    });
  }

  const searchInput = document.getElementById("wallSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      wallSearchQuery = searchInput.value.trim();
      filterAndRenderWalls();
    });
  }

  filterAndRenderWalls();

  grid.addEventListener("click", (e) => {
    const likeBtn = e.target.closest("[data-action='like-wall']");
    if (likeBtn) {
      e.stopPropagation();
      const active = toggleStoreItem("techzx-liked-walls", likeBtn.dataset.id);
      likeBtn.textContent = active ? "❤️" : "🤍";
      showToast(active ? "Added to liked wallpapers" : "Removed from liked");
      return;
    }
    const card = e.target.closest(".wall-card");
    if (card) openWallModal(card.dataset.id);
  });

  initWallModal();
}

function openWallModal(id) {
  const w = window.TechzxData.wallpapers.find(x => x.id === id);
  if (!w) return;
  const overlay = document.querySelector(".modal-overlay");
  if (!overlay) return;
  overlay.querySelector(".modal-img").src = w.image;
  overlay.querySelector(".modal-img").alt = w.title + " wallpaper preview";
  overlay.querySelector(".modal-title").textContent = w.title;
  overlay.querySelector(".modal-cat").textContent = w.category;
  overlay.querySelector(".modal-download").href = w.image;
  overlay.querySelector(".modal-download").setAttribute("download", w.title.replace(/\s+/g, "-").toLowerCase() + ".jpg");
  overlay.classList.add("open");
}

function initWallModal() {
  const overlay = document.querySelector(".modal-overlay");
  if (!overlay) return;
  const closeBtn = overlay.querySelector(".modal-close");
  closeBtn && closeBtn.addEventListener("click", () => overlay.classList.remove("open"));
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("open"); });
}

/* =========================================================================
   HOMEPAGE — render featured tools, trending prompts, popular wallpapers, articles
   ========================================================================= */
function initHomepage() {
  const featuredTools = document.getElementById("featuredToolsRow");
  if (featuredTools) {
    const top = [...window.TechzxData.aiTools].sort((a, b) => b.rating - a.rating).slice(0, 8);
    featuredTools.innerHTML = top.map(renderToolCard).join("");
  }

  const trendingPrompts = document.getElementById("trendingPromptsRow");
  if (trendingPrompts) {
    const top = [...window.TechzxData.prompts].sort((a, b) => b.likes - a.likes).slice(0, 6);
    trendingPrompts.innerHTML = top.map(renderPromptCard).join("");
  }

  const popularWalls = document.getElementById("popularWallsRow");
  if (popularWalls) {
    const top = [...window.TechzxData.wallpapers].sort((a, b) => b.likes - a.likes).slice(0, 8);
    popularWalls.innerHTML = top.map(renderWallCard).join("");
  }

  const articlesGrid = document.getElementById("articlesGrid");
  if (articlesGrid) {
    articlesGrid.innerHTML = window.TechzxData.articles.map(a => `
      <div class="card article-card fade-in">
        <div class="article-emoji">${a.image}</div>
        <h3>${escapeHtml(a.title)}</h3>
        <p>${escapeHtml(a.excerpt)}</p>
        <span class="article-date">${formatDate(a.date)}</span>
      </div>
    `).join("");
  }

  // Hero search redirects to AI tools page with query
  const heroForm = document.getElementById("heroSearchForm");
  if (heroForm) {
    heroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = document.getElementById("heroSearchInput").value.trim();
      window.location.href = "ai-tools.html" + (q ? `?q=${encodeURIComponent(q)}` : "");
    });
  }

  // Bind interactions for cards rendered on homepage (fav/copy/share/bookmark/like)
  document.addEventListener("click", homepageDelegatedClicks);

  // Hero stat counters
  const stats = document.querySelectorAll("[data-counter]");
  stats.forEach(stat => {
    const target = parseInt(stat.dataset.counter, 10);
    animateCounter(stat, target);
  });
}

function homepageDelegatedClicks(e) {
  const favBtn = e.target.closest("[data-action='fav-tool']");
  const copyBtn = e.target.closest("[data-action='copy-prompt']");
  const bookmarkBtn = e.target.closest("[data-action='bookmark-prompt']");
  const likeBtn = e.target.closest("[data-action='like-wall']");

  if (favBtn && document.getElementById("featuredToolsRow")) {
    const active = toggleStoreItem("techzx-fav-tools", favBtn.dataset.id);
    favBtn.classList.toggle("active", active);
    favBtn.textContent = active ? "❤️" : "🤍";
    showToast(active ? "Added to favorites" : "Removed from favorites");
  }
  if (copyBtn && document.getElementById("trendingPromptsRow")) {
    const prompt = window.TechzxData.prompts.find(p => p.id === copyBtn.dataset.id);
    if (prompt) { copyTextToClipboard(prompt.text); showToast("Prompt copied to clipboard!"); }
  }
  if (likeBtn && document.getElementById("popularWallsRow")) {
    const active = toggleStoreItem("techzx-liked-walls", likeBtn.dataset.id);
    likeBtn.textContent = active ? "❤️" : "🤍";
    showToast(active ? "Added to liked wallpapers" : "Removed from liked");
  }
}

function animateCounter(el, target) {
  let count = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  const interval = setInterval(() => {
    count += step;
    if (count >= target) { count = target; clearInterval(interval); }
    el.textContent = count.toLocaleString();
  }, 25);
}

function formatDate(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/* =========================================================================
   STUDENT RESOURCES PAGE
   ========================================================================= */
function initResourcesPage() {
  const container = document.getElementById("resourceTabs");
  if (!container) return;

  const tabs = [
    { key: "notes", label: "📝 Notes" },
    { key: "formulaSheets", label: "📐 Formula Sheets" },
    { key: "studyTools", label: "🧰 Study Tools" },
    { key: "productivity", label: "🚀 Productivity" }
  ];

  container.innerHTML = tabs.map((t, i) =>
    `<button class="filter-chip ${i === 0 ? "active" : ""}" data-key="${t.key}">${t.label}</button>`
  ).join("");

  function renderList(key) {
    const list = window.TechzxData.studentResources[key] || [];
    const listEl = document.getElementById("resourceList");
    listEl.innerHTML = list.map(item => `
      <div class="resource-item">
        <div class="res-left">
          <div class="res-icon">📄</div>
          <div>
            <h4>${escapeHtml(item.title)}</h4>
            <span>${item.type}</span>
          </div>
        </div>
        <a class="btn btn-outline btn-sm" href="${item.link}">Open</a>
      </div>
    `).join("");
  }

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-chip");
    if (!btn) return;
    container.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    renderList(btn.dataset.key);
  });

  renderList("notes");
}

/* =========================================================================
   CONTACT FORM
   Submits to Formspree (https://formspree.io) so messages arrive by email.
   The form's `action` attribute in contact.html points to the Formspree
   endpoint. We intercept submit so we can show our own success message
   instead of redirecting the user to Formspree's page.
   ========================================================================= */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    if (!name || !email || !message) return;

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        document.getElementById("contactSuccess").classList.add("show");
        form.reset();
        setTimeout(() => document.getElementById("contactSuccess").classList.remove("show"), 5000);
      } else {
        showToast("Something went wrong. Please try again.");
      }
    } catch (err) {
      showToast("Network error — please check your connection and try again.");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* =========================================================================
   NEWSLETTER FORM (footer + homepage section)
   Submits to a separate Formspree endpoint so subscriber emails land in
   your inbox. Every .newsletter-form on every page posts to the same
   endpoint, defined as NEWSLETTER_ENDPOINT below.
   ========================================================================= */
const NEWSLETTER_ENDPOINT = "https://formspree.io/f/mbdvrakd";

function initNewsletterForms() {
  document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (!input || !input.value.trim()) return;
      const submitBtn = form.querySelector("button[type='submit']");
      const originalText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.textContent = "..."; submitBtn.disabled = true; }

      try {
        const response = await fetch(NEWSLETTER_ENDPOINT, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (response.ok) {
          showToast("Subscribed! Thanks for joining 🎉");
          form.reset();
        } else {
          showToast("Something went wrong. Please try again.");
        }
      } catch (err) {
        showToast("Network error — please check your connection and try again.");
      } finally {
        if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
      }
    });
  });
}

/* =========================================================================
   READ URL QUERY PARAM (for hero search redirect → ai-tools.html?q=...)
   ========================================================================= */
function applyQueryParamSearch(inputId, applyFn) {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  if (q) {
    const input = document.getElementById(inputId);
    if (input) { input.value = q; applyFn(q); }
  }
}

/* ---------------- PWA: register service worker ---------------- */
function initServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch(() => {
        /* Fails silently if hosted somewhere that blocks SW (e.g. file://) */
      });
    });
  }
}

/* ---------------- INIT ON PAGE LOAD ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initGlobalSearch();
  initHomepage();
  initToolsPage();
  initPromptsPage();
  initWallpapersPage();
  initResourcesPage();
  initContactForm();
  initNewsletterForms();
  initServiceWorker();

  // Apply ?q= search param if present (from hero search redirect)
  if (document.getElementById("toolSearchInput")) {
    applyQueryParamSearch("toolSearchInput", (q) => { toolSearchQuery = q; filterAndRenderTools(); });
  }
});
