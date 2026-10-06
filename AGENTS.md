# AGENTS.md

Welcome to **ARCFiction Remastered** (`arcfiction-w-auth`). This document serves as the architectural and development guide for human developers and AI agents working on this repository.

---

## 🎨 Design System & Color Palette

The project features a sleek, cinematic dark theme with high-contrast crimson/red accents.

### Core Color Palette

| Color Token | Hex / Value | Tailwind Equivalent | Usage & Role |
| :--- | :--- | :--- | :--- |
| **`customgray`** | `#1a171e` | `bg-customgray` | Header background, navbar overlays, and bottom mobile navigation |
| **Background Dark** | `#09090b` | `from-zinc-950` | Primary page background gradient start |
| **Background Secondary** | `#18181b` | `to-zinc-900` | Primary page background gradient end & modal backgrounds |
| **Primary Accent / Red** | `#dc2626` / `#ef4444` | `text-red-600` / `bg-red-600` | Buttons ("Watch Now"), ratings badges, favorite icons, NProgress bar |
| **Glow Accent** | `#b91c1c` | `shadow-red-600` | NProgress loading bar shadow & hover borders |
| **Secondary Accent / Blue** | `#3b82f6` / `#60a5fa` | `text-blue-500` / `text-blue-400` | Genre tags, metadata status badges |
| **Text Primary** | `#ffffff` | `text-white` | Active titles, headings, high-priority labels |
| **Text Secondary** | `#cbd5e1` / `#94a3b8` | `text-slate-300` / `text-gray-400` | Overviews, descriptions, muted navigation items |
| **Skeleton & Borders** | `#27272a` / `#3f3f46` | `bg-zinc-800/60` / `border-zinc-700/30` | Shimmer skeleton cards, card borders, and dividers |

---

## 🏗️ Architecture & Technology Stack

* **Framework**: Next.js 14 (`Pages Router`)
* **Language**: TypeScript 5
* **UI & Styling**: React 18, TailwindCSS 3.4, PostCSS, `@next/font/google` (Roboto)
* **Image Optimization**: Next.js `<Image />` backed by native `sharp`
* **Data Fetching & Cache**:
  * **Server-side**: Centralized Axios client (`lib/tmdb.ts`) with parallelized `Promise.all` and HTTP `Cache-Control` (`s-maxage=3600, stale-while-revalidate=86400`).
  * **Client-side**: SWR (`swr`) with internal API routes.
* **Authentication**: NextAuth.js (`next-auth`) with JWT session strategy and Credentials / GitHub / Google providers.
* **Database & ORM**: MongoDB Atlas accessed through Prisma ORM (`@prisma/client` v6).
* **Feedback & Notifications**: `nprogress` (top progress indicator) and `react-hot-toast`.

---

## 📁 Directory Structure

```text
├── components/          # Reusable UI components (MovieCard, MediaDetailed, SkeletonCard, etc.)
│   └── index.ts         # Central component exports
├── hooks/               # Custom React hooks (useCurrentUser, useFavorites)
│   └── index.ts         # Central hook exports
├── lib/                 # Core utilities and singletons
│   ├── fetcher.ts       # Generic fetcher for SWR
│   ├── prismadb.ts      # Global PrismaClient singleton
│   ├── serverAuth.ts    # Server-side authentication helper
│   └── tmdb.ts          # Centralized TMDB API client & image helpers
├── pages/
│   ├── _app.tsx         # Root app layout, NProgress listeners, global styles
│   ├── _document.tsx    # HTML document customization
│   ├── index.tsx        # Homepage (Trending, Popular, Top Rated)
│   ├── movies.tsx       # Movies catalogue
│   ├── tvshows.tsx      # TV Shows catalogue
│   ├── mylist.tsx       # User's favorited titles
│   ├── auth.tsx         # Login and registration page
│   ├── movie/[id].tsx   # Movie details page
│   ├── tvshow/[id].tsx  # TV Show details page
│   └── api/
│       ├── auth/        # NextAuth handler ([...nextauth].ts)
│       ├── current.ts   # Current authenticated user endpoint
│       ├── favorites.ts # Get user's favorites
│       ├── markasfavorite.ts   # Add title to favorites
│       ├── unmarkasfavorite.ts # Remove title from favorites
│       ├── register.ts  # Account registration with bcrypt
│       └── videos.ts    # Server-side trailer video proxy
├── prisma/
│   └── schema.prisma    # Prisma schema for MongoDB (User, Media, Account, Session)
├── public/              # Static assets and images
├── styles/
│   └── globals.css      # Tailwind base + NProgress custom glow styles
└── types.d.ts           # Shared TypeScript interfaces (Media, MediaDetails, Video, etc.)
```

---

## 🔑 Environment Variables (`.env`)

```env
# MongoDB & Prisma
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.xxxxxx.mongodb.net/arcfiction?retryWrites=true&w=majority"

# NextAuth Secret & JWT
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_JWT_SECRET="your-jwt-secret-here"

# TMDB API
TMDB_API_KEY="your_tmdb_api_key"
NEXT_PUBLIC_API_KEY="your_tmdb_api_key"

# Optional OAuth Providers
GITHUB_ID=""
GITHUB_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

---

## 🛠️ Developer Rules & Best Practices

1. **Always use `lib/tmdb.ts` for TMDB operations**:
   * Do **not** concatenate raw TMDB URL strings manually.
   * Use typed helper methods: `getMovieDetails`, `getTvShowDetails`, `getTrending`, `getTopRated`, `getDiscover`, `getVideos`.
2. **Image Resolution**:
   * Always use `getTmdbImageUrl(path, size)` from `lib/tmdb.ts` to ensure safe fallbacks and avoid broken URLs when posters/backdrops are null.
3. **Keep Client Routes Leading with Slashes**:
   * Always use leading slashes in SWR and Axios paths (e.g. `useSWR('/api/current', ...)` instead of `'api/current'`).
4. **Visual Loading Feedback**:
   * When fetching client-side data, provide visual loading feedback via `<SkeletonCard />` or `<SkeletonCollection />` rather than raw text.
5. **Database Queries**:
   * Use `prismadb` from `lib/prismadb.ts`.
   * After modifying `prisma/schema.prisma`, run `npx prisma db push` and `npx prisma generate`.

---

## ⚡ Useful Commands

| Task | Command |
| :--- | :--- |
| **Start Development Server** | `npm run dev` |
| **Build for Production** | `npm run build` |
| **Start Production Server** | `npm start` |
| **Push Schema to MongoDB** | `npx prisma db push` |
| **Generate Prisma Client** | `npx prisma generate` |
| **Run Linter** | `npm run lint` |
