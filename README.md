# Landing Page + Admin Dashboard

A minimal Next.js + Supabase system with a public landing page and an admin dashboard.

---

## Folder Structure

```
landing-page-app/
├── app/
│   ├── layout.tsx          # Root HTML shell
│   ├── page.tsx            # Public landing page (/)
│   └── dashboard/
│       └── page.tsx        # Admin dashboard (/dashboard)
├── lib/
│   └── supabase.ts         # Shared Supabase client + types
├── supabase-setup.sql      # Run once in Supabase SQL Editor
├── .env.local.example      # Copy → .env.local and fill in values
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## Step 1 — Supabase Setup

1. Go to [supabase.com](https://supabase.com) → create a free project.
2. In your project go to **SQL Editor → New Query**.
3. Paste the contents of `supabase-setup.sql` and click **Run**.
4. Go to **Project Settings → API**.
   - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Step 2 — Environment Variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 3 — Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open:
- **Landing page** → http://localhost:3000
- **Admin dashboard** → http://localhost:3000/dashboard

---

## How It Works

| Route | Description |
|---|---|
| `/` | Server component — fetches the row from Supabase and renders it. Updates every 60s in production (ISR). |
| `/dashboard` | Client component — loads current values, lets you edit and save back to Supabase. |

### Data flow

```
Supabase DB (landing_page_settings)
        ↑  write              ↓  read
  /dashboard            / (landing page)
```

Both pages share the **same single row** in the table. Edit in the dashboard → refresh the landing page → content updated.

---

## Production Notes

- **Authentication**: The dashboard has no login (MVP). Before going public, add Supabase Auth or protect `/dashboard` with middleware.
- **RLS policies**: The SQL sets permissive policies. Tighten them once you add auth.
- **Deploy**: Works on Vercel out of the box — add the two env vars in the Vercel dashboard.
