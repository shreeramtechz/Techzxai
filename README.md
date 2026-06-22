# Techzx AI Hub

A complete, mobile-first, SEO-optimized website with an AI Tools Directory, Prompt Library, Wallpaper Downloads, and Student Resources. Pure HTML/CSS/JS — no backend, no build step, no npm install needed.

## 📁 File Structure

```
techzx-ai-hub/
├── index.html              → Homepage
├── ai-tools.html            → AI Tools Directory
├── prompts.html              → Prompt Library
├── wallpapers.html           → Wallpaper Downloads
├── resources.html            → Student Resources
├── about.html                → About page
├── contact.html              → Contact form
├── privacy.html              → Privacy Policy
├── terms.html                → Terms & Conditions
├── styles.css                 → All site styling (dark/light theme, responsive)
├── script.js                  → All interactivity (search, filters, theme, modals)
├── data.js                    → All content data (20 tools, 20 prompts, 20 wallpapers)
├── admin-guide.js             → Template showing how to add new content (not loaded by site)
├── manifest.json              → PWA install config
├── service-worker.js          → Offline support / caching
├── sitemap.xml                → SEO sitemap
├── robots.txt                 → SEO crawler rules
└── assets/
    ├── icons/                  → Place your app icons here (see below)
    └── images/                 → Place your OG image / extra images here
```

## ⚠️ Before You Go Live — 3 Things to Replace

1. **WhatsApp number / phone number** — search `about.html` for `+91 XXXXX XXXXX` and replace with your real number.
2. **Domain in meta tags** — search all HTML files for `techzxaihub.example.com` and replace with your real domain (also update `sitemap.xml` and `robots.txt`).
3. **App icons** — add real PNG icons at:
   - `assets/icons/icon-192.png` (192×192)
   - `assets/icons/icon-512.png` (512×512)
   - `assets/icons/icon-maskable-192.png` and `icon-maskable-512.png` (with safe padding)
   - `assets/images/og-cover.jpg` (1200×630, used when your link is shared on social media)
   You can generate these for free at https://realfavicongenerator.net or https://www.canva.com

## 🚀 Deploy on GitHub Pages (Free)

1. Create a free GitHub account at https://github.com if you don't have one.
2. Create a new repository (e.g. `techzx-ai-hub`) — make it **Public**.
3. On the repo page, click **"Add file" → "Upload files"**.
4. Upload **all files and folders** from this project (drag and drop works on mobile too).
5. Scroll down, click **"Commit changes"**.
6. Go to **Settings → Pages** (left sidebar).
7. Under "Build and deployment", set **Source: Deploy from a branch**, **Branch: main**, folder: `/ (root)`. Click **Save**.
8. Wait 1–2 minutes. Your site will be live at:
   `https://your-username.github.io/techzx-ai-hub/`
9. Update the domain in your meta tags (see above) to match this URL, then re-upload those files.

## 🚀 Deploy on Netlify (Free, Easiest from Mobile)

1. Go to https://app.netlify.com and sign up free (Gmail signup works).
2. Once logged in, look for **"Add new site" → "Deploy manually"**.
3. You'll see a drag-and-drop box. On mobile, tap it to browse and select your project folder as a **.zip file** (zip all the files first), or drag the whole unzipped folder if using desktop.
4. Netlify uploads and deploys instantly — you'll get a free URL like:
   `https://random-name-123.netlify.app`
5. Optional: go to **Site settings → Change site name** to pick a custom subdomain like `techzx-ai-hub.netlify.app`.
6. Update the domain in your meta tags to match, then re-deploy by dragging the updated zip again.

## 🔧 How to Add New Content (No Coding Needed)

All website content lives in **`data.js`**. To add a new AI tool, prompt, wallpaper, or category:

1. Open `data.js` in any text editor (even the GitHub web editor — click the pencil icon on the file).
2. Find the relevant array (`aiTools`, `prompts`, `wallpapers`, `studentResources`).
3. Copy an existing entry, paste it at the end of the array, and edit the values.
4. Save / commit the change — your live site updates automatically.

See **`admin-guide.js`** for copy-paste templates and full instructions for each content type.

## ✅ What's Already Built In

- **Dark/Light mode** — auto-detects system preference, remembers your choice.
- **Fully responsive** — mobile-first design, works from small phones to desktops.
- **Search** — global search overlay (navbar) + dedicated search on each directory page.
- **Filters** — category chips on AI Tools, Prompts, and Wallpapers pages.
- **Favorites / Bookmarks / Likes** — saved in the browser's local storage, no login needed.
- **Copy & Share prompts** — one-tap copy to clipboard, native share sheet on mobile.
- **Wallpaper preview modal** — tap any wallpaper to preview and download.
- **Newsletter & Contact forms** — work without a backend (stored locally); ready to connect to a real backend later (e.g. Formspree, Firebase) when you want actual email delivery.
- **PWA support** — installable on phones, works offline once visited (via service worker).
- **SEO** — meta tags, Open Graph tags, Twitter cards, JSON-LD schema, sitemap.xml, robots.txt.
- **Lazy-loaded images** — wallpaper images use `loading="lazy"` for faster page loads.

## 🔌 Connecting Real Forms Later (Optional)

The contact and newsletter forms currently save data only in the visitor's browser (not sent anywhere). When you're ready to actually receive these messages by email, the easiest free options are:
- **Formspree** (https://formspree.io) — add their endpoint to the form's `action` attribute, no backend code needed.
- **Netlify Forms** — if hosting on Netlify, just add `data-netlify="true"` to the `<form>` tag and Netlify handles the rest for free.

## 📱 Tested For

- Mobile Chrome / Safari (primary target)
- Tablet and desktop browsers (responsive breakpoints included)
- Offline use after first visit (PWA service worker)

---
Built for Techzx AI Hub. Edit freely — it's your project from here.
