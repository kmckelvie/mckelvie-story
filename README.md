# The McKelvie Story

A public-record website documenting our family's experience after toxic mold contamination in our newly-built Drees home.

**Live site:** https://www.mckelviestory.com

## Tech

Plain static HTML/CSS/JS. No build step, no framework. Designed for GitHub Pages.

## Local preview

```bash
# Any static server works. Easiest options:
python3 -m http.server 8000
# or
npx serve .
```

Then visit http://localhost:8000

## Deploying to GitHub Pages

### One-time setup

1. **Create a new GitHub repo** (e.g. `mckelvie-story`). Public.
2. **Upload these files** (`index.html`, `styles.css`, `script.js`, `CNAME`) to the repo root.
   - Easiest path: drag-and-drop into github.com via the "uploading an existing file" link, OR use GitHub Desktop.
3. **Enable Pages**: Repo → Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / root → Save.
4. **Point your domain at GitHub Pages**:
   - In your DNS provider (where mckelviestory.com is registered), add these **A records** for `@`:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - And a **CNAME record** for `www` pointing to `<your-github-username>.github.io`
5. **Verify the custom domain** in the GitHub Pages settings; check "Enforce HTTPS".
6. **Switch Squarespace off** once GitHub Pages is fully live (so it doesn't keep charging you).

DNS propagation can take a few hours. HTTPS provisioning on GitHub's side takes another ~15 minutes after the domain verifies.

## Editing later

- All copy lives in `index.html`. Search for any phrase you see on the page; it's right there.
- Colors and type are CSS variables at the top of `styles.css` — change `--accent`, `--bg`, etc. and the whole site updates.
- To add a gallery photo: copy any `<figure class="gal-item" data-cat="...">` block in `index.html`, paste it next to the others, and swap the image URL + caption. Valid categories: `discovery`, `home`, `health`, `displacement`, `documentation`.

## What's on the page

- **Hero** — Lede, primary CTAs, key statistics
- **The Story** — Narrative with dropcap and pullquote
- **Timeline** — Six dated milestones
- **Photo Gallery** — Filterable by chapter, click-to-zoom lightbox, keyboard navigation
- **For Press** — One-paragraph summary, key facts table, contact CTA
- **For Other Families** — Four-step guide with linked resources
- **Contact** — Email form (currently uses `mailto:` — swap for Formspree, Basin, or Netlify Forms when ready)

## To swap the contact form to a real service (recommended)

Right now the form is a `mailto:` link, which works but is clunky. For a real form, sign up for one of these (all free tiers, no backend needed):

- **Formspree** — change `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">` and remove the `enctype` attribute
- **Basin** — similar swap
- **Netlify Forms** — only works if you also host on Netlify (alternative to GitHub Pages)
