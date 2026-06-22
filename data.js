/* ==========================================================================
   Techzx AI Hub — data.js
   Central data store. Replace/extend these arrays to add new content.
   No backend needed — everything is plain JS objects/arrays.
   ========================================================================== */

/* ---------------- AI TOOLS (20) ---------------- */
const aiTools = [
  {
    id: "tool-1",
    name: "ChatGPT",
    category: "Writing AI",
    description: "Conversational AI for writing, brainstorming, coding help, and general Q&A.",
    features: ["Natural conversations", "Code assistance", "Long-form writing", "Custom GPTs"],
    pricing: "Free / $20 per month (Plus)",
    website: "https://chat.openai.com",
    rating: 4.8,
    image: "🤖"
  },
  {
    id: "tool-2",
    name: "Midjourney",
    category: "Image AI",
    description: "High-quality AI image generator known for artistic, cinematic visuals.",
    features: ["Photorealistic art", "Style presets", "Discord based", "Upscaling"],
    pricing: "From $10 per month",
    website: "https://www.midjourney.com",
    rating: 4.7,
    image: "🎨"
  },
  {
    id: "tool-3",
    name: "Runway",
    category: "Video AI",
    description: "AI video generation and editing suite for creators and filmmakers.",
    features: ["Text-to-video", "Green screen AI", "Motion brush", "Video editing"],
    pricing: "Free / From $15 per month",
    website: "https://runwayml.com",
    rating: 4.5,
    image: "🎬"
  },
  {
    id: "tool-4",
    name: "GitHub Copilot",
    category: "Coding AI",
    description: "AI pair programmer that autocompletes code directly inside your editor.",
    features: ["Inline suggestions", "Multi-language", "Chat mode", "IDE integration"],
    pricing: "From $10 per month",
    website: "https://github.com/features/copilot",
    rating: 4.6,
    image: "💻"
  },
  {
    id: "tool-5",
    name: "Notion AI",
    category: "Productivity AI",
    description: "AI assistant built into Notion for notes, docs, summaries, and planning.",
    features: ["Summarize notes", "Auto-fill docs", "Translation", "Action items"],
    pricing: "From $8 per month",
    website: "https://www.notion.so/product/ai",
    rating: 4.4,
    image: "🗂️"
  },
  {
    id: "tool-6",
    name: "Socratic by Google",
    category: "Study AI",
    description: "Snap a photo of a homework question and get step-by-step explanations.",
    features: ["Photo-based Q&A", "Subject coverage", "Visual explanations", "Free"],
    pricing: "Free",
    website: "https://socratic.org",
    rating: 4.3,
    image: "📘"
  },
  {
    id: "tool-7",
    name: "Claude",
    category: "Writing AI",
    description: "AI assistant by Anthropic, great for long documents, reasoning, and coding.",
    features: ["Large context window", "Document analysis", "Coding help", "Artifacts"],
    pricing: "Free / From $20 per month",
    website: "https://claude.ai",
    rating: 4.8,
    image: "✨"
  },
  {
    id: "tool-8",
    name: "DALL·E 3",
    category: "Image AI",
    description: "OpenAI's image generator, integrated into ChatGPT for prompt-based art.",
    features: ["Text-to-image", "Style control", "ChatGPT integration", "Inpainting"],
    pricing: "Included with ChatGPT Plus",
    website: "https://openai.com/dall-e-3",
    rating: 4.5,
    image: "🖼️"
  },
  {
    id: "tool-9",
    name: "Pika",
    category: "Video AI",
    description: "Easy text-to-video and image-to-video AI generator for short clips.",
    features: ["Text-to-video", "Image animation", "Style effects", "Fast rendering"],
    pricing: "Free / From $10 per month",
    website: "https://pika.art",
    rating: 4.2,
    image: "📹"
  },
  {
    id: "tool-10",
    name: "Cursor",
    category: "Coding AI",
    description: "AI-first code editor built for fast, assisted software development.",
    features: ["AI code edits", "Chat with codebase", "Autocomplete", "Built on VS Code"],
    pricing: "Free / From $20 per month",
    website: "https://cursor.sh",
    rating: 4.7,
    image: "🧠"
  },
  {
    id: "tool-11",
    name: "Todoist AI",
    category: "Productivity AI",
    description: "Smart task manager with AI-assisted task suggestions and scheduling.",
    features: ["Smart scheduling", "Natural language input", "Cross-platform", "Reminders"],
    pricing: "Free / From $4 per month",
    website: "https://todoist.com",
    rating: 4.4,
    image: "✅"
  },
  {
    id: "tool-12",
    name: "Quizlet AI",
    category: "Study AI",
    description: "AI-powered flashcards and study sets with practice tests and explanations.",
    features: ["Flashcards", "Practice tests", "AI explanations", "Study modes"],
    pricing: "Free / From $7.99 per month",
    website: "https://quizlet.com",
    rating: 4.5,
    image: "🎓"
  },
  {
    id: "tool-13",
    name: "Grammarly",
    category: "Writing AI",
    description: "AI writing assistant for grammar, tone, clarity, and plagiarism checks.",
    features: ["Grammar check", "Tone detection", "Plagiarism check", "Browser extension"],
    pricing: "Free / From $12 per month",
    website: "https://grammarly.com",
    rating: 4.6,
    image: "✍️"
  },
  {
    id: "tool-14",
    name: "Leonardo AI",
    category: "Image AI",
    description: "AI art generator with fine-tuned models for game assets and concept art.",
    features: ["Custom models", "Game assets", "Real-time canvas", "Upscaler"],
    pricing: "Free / From $10 per month",
    website: "https://leonardo.ai",
    rating: 4.5,
    image: "🎭"
  },
  {
    id: "tool-15",
    name: "CapCut",
    category: "Video AI",
    description: "Mobile-friendly video editor with AI-powered effects and auto captions.",
    features: ["Auto captions", "AI effects", "Templates", "Mobile-first"],
    pricing: "Free / Pro from $7.99 per month",
    website: "https://www.capcut.com",
    rating: 4.6,
    image: "🎞️"
  },
  {
    id: "tool-16",
    name: "Replit AI",
    category: "Coding AI",
    description: "Cloud-based coding environment with built-in AI for building and debugging apps.",
    features: ["Cloud IDE", "AI code generation", "Instant hosting", "Multiplayer coding"],
    pricing: "Free / From $20 per month",
    website: "https://replit.com",
    rating: 4.4,
    image: "⚙️"
  },
  {
    id: "tool-17",
    name: "Motion",
    category: "Productivity AI",
    description: "AI calendar and project planner that auto-schedules your tasks and meetings.",
    features: ["Auto-scheduling", "Project planning", "Calendar sync", "Smart reminders"],
    pricing: "From $19 per month",
    website: "https://usemotion.com",
    rating: 4.3,
    image: "📅"
  },
  {
    id: "tool-18",
    name: "Photomath",
    category: "Study AI",
    description: "Scan math problems with your camera and get instant step-by-step solutions.",
    features: ["Camera scan", "Step-by-step solving", "Graphing", "Multiple methods"],
    pricing: "Free / Plus from $9.99 per month",
    website: "https://photomath.com",
    rating: 4.7,
    image: "🧮"
  },
  {
    id: "tool-19",
    name: "Jasper",
    category: "Writing AI",
    description: "AI content generator built for marketing teams and brand-consistent copy.",
    features: ["Brand voice", "Marketing templates", "SEO mode", "Team collaboration"],
    pricing: "From $39 per month",
    website: "https://www.jasper.ai",
    rating: 4.3,
    image: "📝"
  },
  {
    id: "tool-20",
    name: "Otter.ai",
    category: "Productivity AI",
    description: "AI meeting assistant that transcribes, summarizes, and captures action items.",
    features: ["Live transcription", "Meeting summaries", "Speaker detection", "Search transcripts"],
    pricing: "Free / From $10 per month",
    website: "https://otter.ai",
    rating: 4.4,
    image: "🎙️"
  }
];

/* ---------------- PROMPT LIBRARY (20) ---------------- */
const prompts = [
  {
    id: "prompt-1",
    title: "Exam Revision Planner",
    category: "Study",
    description: "Create a personalised revision timetable.",
    text: "Act as a study planner. I have an exam on [subject] in [number] days. Create a day-by-day revision timetable covering all major topics, with daily time blocks and short revision tasks.",
    likes: 132
  },
  {
    id: "prompt-2",
    title: "Simplify a Concept",
    category: "Study",
    description: "Turn a hard topic into a simple explanation.",
    text: "Explain [topic] to me like I'm a beginner. Use a simple real-life analogy, then give a short technical explanation, and finish with 2 practice questions.",
    likes: 98
  },
  {
    id: "prompt-3",
    title: "Business Plan Outline",
    category: "Business",
    description: "Generate a structured one-page business plan.",
    text: "Act as a business consultant. Create a one-page business plan outline for a [type of business] targeting [target audience], including value proposition, revenue model, and first 3 action steps.",
    likes: 156
  },
  {
    id: "prompt-4",
    title: "Cold Email for Investors",
    category: "Business",
    description: "Draft a short, persuasive investor outreach email.",
    text: "Write a concise cold email to a potential investor introducing my startup [startup name], which solves [problem] for [target audience]. Keep it under 150 words and end with a clear call to action.",
    likes: 87
  },
  {
    id: "prompt-5",
    title: "Instagram Caption Generator",
    category: "Social Media",
    description: "Create catchy captions with hashtags.",
    text: "Write 5 Instagram captions for a post about [topic/photo description]. Make them short, engaging, and include 10 relevant hashtags at the end.",
    likes: 210
  },
  {
    id: "prompt-6",
    title: "Content Calendar Generator",
    category: "Social Media",
    description: "Plan a week of social media content.",
    text: "Create a 7-day social media content calendar for a [niche] brand on Instagram. Include post idea, caption hook, and best posting time for each day.",
    likes: 144
  },
  {
    id: "prompt-7",
    title: "Debug My Code",
    category: "Coding",
    description: "Get clear explanations for code errors.",
    text: "Here is my [language] code: [paste code]. It throws this error: [error message]. Explain what is causing it in simple terms and give me the corrected code.",
    likes: 189
  },
  {
    id: "prompt-8",
    title: "Code Explainer",
    category: "Coding",
    description: "Understand unfamiliar code line by line.",
    text: "Explain the following code line by line as if teaching a beginner: [paste code]. Also tell me what this code is used for in real projects.",
    likes: 121
  },
  {
    id: "prompt-9",
    title: "Daily Productivity Schedule",
    category: "Productivity",
    description: "Build a balanced daily schedule.",
    text: "Create a productive daily schedule for someone who wakes up at [time] and sleeps at [time], balancing [list tasks/goals] with breaks and exercise.",
    likes: 167
  },
  {
    id: "prompt-10",
    title: "Eisenhower Task Sorter",
    category: "Productivity",
    description: "Prioritise your to-do list instantly.",
    text: "Here is my to-do list: [list tasks]. Sort these into an Eisenhower Matrix (Urgent/Important quadrants) and tell me what to do first.",
    likes: 93
  },
  {
    id: "prompt-11",
    title: "Blog Post Outline",
    category: "Content Creation",
    description: "Generate a structured blog post skeleton.",
    text: "Create a detailed blog post outline on [topic] for [target audience], including an SEO-friendly title, introduction hook, 5 subheadings, and a conclusion with a call to action.",
    likes: 178
  },
  {
    id: "prompt-12",
    title: "YouTube Script Writer",
    category: "Content Creation",
    description: "Draft a full short-form video script.",
    text: "Write a 60-second YouTube Shorts script about [topic]. Include a strong hook in the first 3 seconds, main content, and a call to action at the end.",
    likes: 203
  },
  {
    id: "prompt-13",
    title: "Formula Sheet Maker",
    category: "Study",
    description: "Summarise key formulas for fast revision.",
    text: "Create a compact formula sheet for [subject/chapter] suitable for last-minute revision. Group formulas by topic and add a one-line use-case for each.",
    likes: 145
  },
  {
    id: "prompt-14",
    title: "Mock Interview Questions",
    category: "Business",
    description: "Prepare for a job or internship interview.",
    text: "Act as an interviewer for a [job role] position. Ask me 5 realistic interview questions one at a time, and give feedback on my answers.",
    likes: 112
  },
  {
    id: "prompt-15",
    title: "Hashtag Research",
    category: "Social Media",
    description: "Find trending and niche hashtags.",
    text: "Generate a list of 20 hashtags for [niche/topic] content, split into 3 categories: high-reach, medium-reach, and niche-specific.",
    likes: 99
  },
  {
    id: "prompt-16",
    title: "Regex Builder",
    category: "Coding",
    description: "Get a working regex with explanation.",
    text: "Write a regular expression that matches [describe pattern, e.g. valid email addresses]. Explain each part of the regex in simple terms.",
    likes: 76
  },
  {
    id: "prompt-17",
    title: "Weekly Goal Tracker",
    category: "Productivity",
    description: "Break big goals into weekly action steps.",
    text: "I want to achieve [goal] in [timeframe]. Break it down into weekly milestones with 3 actionable tasks per week.",
    likes: 134
  },
  {
    id: "prompt-18",
    title: "Short Story Generator",
    category: "Content Creation",
    description: "Generate a creative short story from a prompt.",
    text: "Write a 300-word short story in the [genre] genre involving a character who [situation/twist]. Make the ending unexpected.",
    likes: 158
  },
  {
    id: "prompt-19",
    title: "Memory Trick Generator",
    category: "Study",
    description: "Create mnemonics for hard-to-remember lists.",
    text: "Create a fun mnemonic or memory trick to remember this list in order: [list items]. Keep it short and easy to recall.",
    likes: 122
  },
  {
    id: "prompt-20",
    title: "Pitch Deck Bullet Points",
    category: "Business",
    description: "Draft key talking points for each pitch deck slide.",
    text: "Create bullet points for a 10-slide pitch deck for [startup idea], covering problem, solution, market size, business model, traction, and team slides.",
    likes: 141
  }
];

/* ---------------- WALLPAPERS (20) ----------------
   image: using free placeholder service (picsum/placeholder) with
   seeded queries so each wallpaper looks distinct. Replace `image`
   with your own hosted images before going live. */
const wallpapers = [
  { id: "wall-1", title: "Hanuman Devotion", category: "Hanuman", image: "https://picsum.photos/seed/hanuman1/500/800", likes: 320 },
  { id: "wall-2", title: "Hanuman Strength", category: "Hanuman", image: "https://picsum.photos/seed/hanuman2/500/700", likes: 287 },
  { id: "wall-3", title: "Bajrangbali Glow", category: "Hanuman", image: "https://picsum.photos/seed/hanuman3/500/900", likes: 410 },
  { id: "wall-4", title: "Anime Sunset Hero", category: "Anime", image: "https://picsum.photos/seed/anime1/500/750", likes: 502 },
  { id: "wall-5", title: "Anime City Nights", category: "Anime", image: "https://picsum.photos/seed/anime2/500/820", likes: 388 },
  { id: "wall-6", title: "Anime Warrior", category: "Anime", image: "https://picsum.photos/seed/anime3/500/700", likes: 276 },
  { id: "wall-7", title: "Anime Girl Aesthetic", category: "Anime", image: "https://picsum.photos/seed/anime4/500/850", likes: 455 },
  { id: "wall-8", title: "Misty Mountains", category: "Nature", image: "https://picsum.photos/seed/nature1/500/800", likes: 312 },
  { id: "wall-9", title: "Forest Path", category: "Nature", image: "https://picsum.photos/seed/nature2/500/750", likes: 268 },
  { id: "wall-10", title: "Ocean Waves", category: "Nature", image: "https://picsum.photos/seed/nature3/500/700", likes: 341 },
  { id: "wall-11", title: "Golden Sunset Field", category: "Nature", image: "https://picsum.photos/seed/nature4/500/820", likes: 299 },
  { id: "wall-12", title: "Sports Car Speed", category: "Cars", image: "https://picsum.photos/seed/cars1/500/700", likes: 378 },
  { id: "wall-13", title: "Night Drive Supercar", category: "Cars", image: "https://picsum.photos/seed/cars2/500/800", likes: 421 },
  { id: "wall-14", title: "Classic Muscle Car", category: "Cars", image: "https://picsum.photos/seed/cars3/500/750", likes: 256 },
  { id: "wall-15", title: "Minimal Black Texture", category: "Black Aesthetic", image: "https://picsum.photos/seed/black1/500/800", likes: 233 },
  { id: "wall-16", title: "Dark Smoke Aesthetic", category: "Black Aesthetic", image: "https://picsum.photos/seed/black2/500/850", likes: 289 },
  { id: "wall-17", title: "Matte Black Pattern", category: "Black Aesthetic", image: "https://picsum.photos/seed/black3/500/700", likes: 198 },
  { id: "wall-18", title: "Discipline Quote", category: "Quotes", image: "https://picsum.photos/seed/quote1/500/750", likes: 367 },
  { id: "wall-19", title: "Hustle Mindset Quote", category: "Quotes", image: "https://picsum.photos/seed/quote2/500/800", likes: 412 },
  { id: "wall-20", title: "Success Motivation Quote", category: "Quotes", image: "https://picsum.photos/seed/quote3/500/820", likes: 350 }
];

/* ---------------- STUDENT RESOURCES ---------------- */
const studentResources = {
  notes: [
    { id: "note-1", title: "Class 12 Physics Notes (Full Syllabus)", type: "PDF", link: "#" },
    { id: "note-2", title: "Organic Chemistry Quick Notes", type: "PDF", link: "#" },
    { id: "note-3", title: "Mathematics Formula Compilation", type: "PDF", link: "#" }
  ],
  formulaSheets: [
    { id: "formula-1", title: "JEE Physics Formula Sheet", type: "PDF", link: "#" },
    { id: "formula-2", title: "JEE Chemistry Formula Sheet", type: "PDF", link: "#" },
    { id: "formula-3", title: "NEET Biology Quick Reference", type: "PDF", link: "#" }
  ],
  studyTools: [
    { id: "stool-1", title: "Pomodoro Timer", type: "Tool", link: "#" },
    { id: "stool-2", title: "Flashcard Maker", type: "Tool", link: "#" },
    { id: "stool-3", title: "Study Streak Tracker", type: "Tool", link: "#" }
  ],
  productivity: [
    { id: "prod-1", title: "Weekly Planner Template", type: "PDF", link: "#" },
    { id: "prod-2", title: "Habit Tracker Template", type: "PDF", link: "#" },
    { id: "prod-3", title: "Goal Setting Worksheet", type: "PDF", link: "#" }
  ]
};

/* ---------------- CATEGORY LISTS (used for filter buttons) ---------------- */
const toolCategories = ["All", "Writing AI", "Image AI", "Video AI", "Coding AI", "Study AI", "Productivity AI"];
const promptCategories = ["All", "Study", "Business", "Social Media", "Coding", "Productivity", "Content Creation"];
const wallpaperCategories = ["All", "Hanuman", "Anime", "Nature", "Cars", "Black Aesthetic", "Quotes"];

/* ---------------- LATEST ARTICLES (for homepage section) ---------------- */
const articles = [
  {
    id: "article-1",
    title: "10 AI Tools Every Student Should Try in 2026",
    excerpt: "From note summarizers to math solvers, here are the AI tools that actually save you study time.",
    date: "2026-06-10",
    image: "📚"
  },
  {
    id: "article-2",
    title: "How to Write Better AI Prompts: A Beginner's Guide",
    excerpt: "Learn the simple structure behind prompts that get you sharper, more useful AI responses.",
    date: "2026-06-05",
    image: "💡"
  },
  {
    id: "article-3",
    title: "Top 5 Free AI Image Generators Compared",
    excerpt: "We compare quality, speed, and free limits across the most popular AI art generators.",
    date: "2026-05-28",
    image: "🖌️"
  }
];

/* Expose to global scope for use in script.js (no modules, kept simple for beginners) */
window.TechzxData = {
  aiTools,
  prompts,
  wallpapers,
  studentResources,
  toolCategories,
  promptCategories,
  wallpaperCategories,
  articles
};
