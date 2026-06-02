# Venuja Himath Ranasinghe — Portfolio

Dark Intelligence themed personal portfolio for a Data Science undergraduate.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- API routes (contact form backend)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### If the page looks unstyled (white background, 404 in console)

This usually means an old dev server is still running on port 3000 with a stale cache.

1. Stop **all** terminals running `npm run dev` (close them or press Ctrl+C).
2. Run a fresh dev server:

```bash
npm run dev:fresh
```

3. Open **only** the URL shown in the terminal (usually `http://localhost:3000`).

## Contact form backend

The site does not need a separate server. Next.js API routes handle the contact form at `POST /api/contact`.

1. Copy `.env.example` to `.env.local`
2. Add **either** Resend **or** SMTP credentials (see `.env.example`)
3. Restart the dev server

**Resend (easiest on Vercel):** Sign up at [resend.com](https://resend.com), create an API key, and set `RESEND_API_KEY` + `CONTACT_TO_EMAIL` in Vercel environment variables.

**Gmail SMTP:** Use an [App Password](https://support.google.com/accounts/answer/185833) and set `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, etc.

Check status: `GET /api/contact` returns `{ emailConfigured: true/false }`.

## Deploy on Vercel

1. Push this folder to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add environment variables from `.env.example` (required for contact form emails)
4. Deploy

## 3D hero robot (Tripo AI)

Your Tripo model: [futuristic robot on Tripo Studio](https://studio.tripo3d.ai/3d-model/30796b22-265b-4fa0-8b10-8c4ae8841579)

Tripo links require login — the site cannot pull the file automatically. Export it once:

```bash
npm run setup-robot
```

Follow the steps, save the download as **`public/robot.glb`**, then:

```bash
npm run dev:fresh
```

If Tripo gives you a direct GLB URL:

```bash
node scripts/import-tripo-robot.mjs "https://your-download-url/model.glb"
```

## Customize

- **Content**: Edit `lib/data.ts`
- **CV**: Replace `public/cv.pdf` with your resume
- **GitHub / LinkedIn**: Update URLs in `lib/data.ts`
- **Profile photo**: Replace the VR placeholder in `components/sections/About.tsx`

## Project structure

```
app/                → layout, page, globals
app/api/contact/    → contact form API (backend)
components/         → sections, ui, layout
lib/                → data, validation, email, rate limit
public/             → static assets (cv.pdf, images)
```
