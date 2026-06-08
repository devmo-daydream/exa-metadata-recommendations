# Exa — Title Tag & Meta Description Recommendations

Self-contained static site that displays the metadata audit + recommendations for Exa.ai's core marketing pages, with per-card review (Approve / Request edits / Comment) that persists to Supabase.

Built by [daydream](https://withdaydream.com) for Exa.

## What's in this repo

| File | Purpose |
|---|---|
| `index.html` | The whole site — HTML + CSS + JS + data in one file |
| `vercel.json` | Vercel config (clean URLs) |
| `.gitignore` | Ignore local junk |
| `README.md` | This file |

That's it. No build step, no node_modules, no Python — just a static file.

## Local preview

Open `index.html` in any browser. That's the entire dev loop.

## Deploy to Vercel

This repo is wired to deploy on push.

1. Push to GitHub: `git push`
2. Vercel auto-builds and deploys (no build command needed; it serves `index.html` directly).

To set up the Vercel connection the first time:
1. In Vercel dashboard → **Add New → Project**
2. Pick this GitHub repo
3. **Framework Preset:** Other
4. **Build Command:** *(leave empty)*
5. **Output Directory:** *(leave empty — root)*
6. Click **Deploy**

## Updating recommendations

The 22 pages of data live in the `var DATA = [...]` array near the bottom of `index.html`. Each entry has:
- `slug`, `tier`, `name`, `url`, `primaryKw`, `primarySrc` (`KWR` or `Inferred`)
- `currentTitle`, `currentDesc` (live state)
- `recTitleA`, `recTitleB`, `recDescA`, `recDescB` (drafts)
- `note` (rationale shown in the Notes block)

Edit the array, save, push. Vercel redeploys automatically.

## Supabase

The site reads + writes to a single Supabase table (`keyword_reviews`) so review state persists across users and sessions.

- **Project:** namespaced by `DELIVERABLE = 'exa-metadata'` at the top of the script block
- **Table schema:** see `schema.sql` in the original Evotrex handoff bundle (it's the same table)
- **Key in the HTML:** the `SUPA_KEY` constant is the **anon (publishable) key** — it's designed to be shipped to browsers. Row-Level Security on the Supabase table controls what it can do.

If you need to migrate to a different Supabase project, change `SUPA_URL` and `SUPA_KEY` near the top of the `<script>` block.

## Companion files (not in the repo)

The audit MD, recommendations MD, and Screaming Frog CSVs live in the daydream client folder, not here. This repo is intentionally lean — only what Vercel needs to serve the site.
