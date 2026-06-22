/* ==========================================================================
   Techzx AI Hub — admin-guide.js
   FUTURE-READY ADMIN STRUCTURE (no backend required for now)
   --------------------------------------------------------------------------
   This file is NOT loaded by the website. It's a copy-paste template that
   shows you exactly how to add new AI Tools, Prompts, Wallpapers, or
   Categories by editing data.js directly. Think of this as your "Admin
   Panel" for now — when you're ready to add a real backend/admin dashboard
   (e.g. with Firebase or a Node.js API), this same data shape can be reused.
   ========================================================================== */

/* -----------------------------------------------------------
   1. HOW TO ADD A NEW AI TOOL
   Open data.js → find the `aiTools` array → add a new object
   like this at the end of the array (before the closing `];`):
----------------------------------------------------------- */
const newToolExample = {
  id: "tool-21",                  // must be unique — increase the number
  name: "Tool Name Here",
  category: "Writing AI",         // must match one of toolCategories in data.js
  description: "Short 1-2 line description of what the tool does.",
  features: ["Feature 1", "Feature 2", "Feature 3"],
  pricing: "Free / From $X per month",
  website: "https://example.com",
  rating: 4.5,                    // out of 5
  image: "🤖"                     // any emoji, used as the tool's icon
};

/* -----------------------------------------------------------
   2. HOW TO ADD A NEW PROMPT
   Open data.js → find the `prompts` array → add a new object:
----------------------------------------------------------- */
const newPromptExample = {
  id: "prompt-21",                // must be unique
  title: "Prompt Title Here",
  category: "Study",              // must match one of promptCategories in data.js
  description: "One-line description of what this prompt helps with.",
  text: "The actual prompt text the user will copy and paste into an AI tool.",
  likes: 0
};

/* -----------------------------------------------------------
   3. HOW TO ADD A NEW WALLPAPER
   Open data.js → find the `wallpapers` array → add a new object:
   Tip: replace the `image` URL with your own hosted image link
   (e.g. upload to Imgur, GitHub, or your hosting provider) once
   you have real wallpapers ready.
----------------------------------------------------------- */
const newWallpaperExample = {
  id: "wall-21",                  // must be unique
  title: "Wallpaper Title",
  category: "Anime",              // must match one of wallpaperCategories in data.js
  image: "https://your-image-host.com/your-wallpaper.jpg",
  likes: 0
};

/* -----------------------------------------------------------
   4. HOW TO ADD A NEW CATEGORY
   Open data.js → find `toolCategories`, `promptCategories`, or
   `wallpaperCategories` → add your new category name to the array.
   Example:
   const toolCategories = ["All", "Writing AI", ..., "Your New Category"];
   The filter chips on each page are generated automatically from
   these arrays — no other code changes needed.
----------------------------------------------------------- */

/* -----------------------------------------------------------
   5. HOW TO ADD A NEW STUDENT RESOURCE
   Open data.js → find `studentResources` → pick the right section
   (notes, formulaSheets, studyTools, productivity) → add:
----------------------------------------------------------- */
const newResourceExample = {
  id: "note-4",
  title: "Resource Title",
  type: "PDF",                    // or "Tool", "Link", etc.
  link: "https://your-file-link.com/file.pdf"
};

/* -----------------------------------------------------------
   6. FUTURE BACKEND UPGRADE PATH (optional, for later)
   When you're ready to stop manually editing data.js, you can:
   - Move these arrays into a Firebase Firestore database (free tier).
   - Build a simple admin login page (Firebase Auth).
   - Replace `window.TechzxData` in script.js with a fetch() call
     to your Firestore collection, keeping the SAME object shape
     shown above so the rest of the website code doesn't need to change.
----------------------------------------------------------- */
