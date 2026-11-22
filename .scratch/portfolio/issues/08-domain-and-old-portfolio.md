# Domain, and what happens to the old portfolio

Type: grilling
Status: resolved
Blocked by: 02
Map: [../map.md](../map.md)

## Question

Using the domain research, decide:

1. Which domain the Portfolio lives on, or whether it starts on a `pages.dev` address.
2. Which repo name it uses on `github.com/shashinthael`, and whether that repo is public from day one, since a Reader may open it as Proof of skill.
3. What happens to the old portfolio repos (`myportfolio`, `myportfolio.github.io` and `company_portfolio`): delete, archive, or redirect. The GitHub audit already recommended deleting the duplicate `myportfolio`.
4. Where the Portfolio URL then needs adding: the Master CV header, the LinkedIn contact info and the GitHub profile. Record this as a follow-up for the CV effort, not as work in this map.
5. **Pages or Workers static assets.** The domain research found that Cloudflare now tells new projects to use Workers static assets rather than Pages. Pages isn't deprecated. Zeylan already runs on Workers. Choose one for the Portfolio, and note how `pages.dev`/`workers.dev` redirects to the custom domain.

## Answer

Resolved 2026-11-22 with him. He accepted every recommendation.

1. **Domain:** `shashintha.dev`, bought at **Cloudflare Registrar** in his existing Cloudflare account. Roughly $8 for the first year, then $12 a year; confirm the price at checkout. `.dev` is HTTPS-only by design.
2. **Hosting:** **Cloudflare Workers static assets** (the same as Zeylan, and Cloudflare's current recommendation), not Pages.
   - While it's being built, CI deploys to a `*.workers.dev` preview.
   - At launch, `shashintha.dev` is attached as a custom domain and `workers_dev = false` switches the preview address off, so there's only one public address.
3. **Repo:** `github.com/shashinthael/portfolio`, **public from day one**. The Cloudflare API token lives only in GitHub Actions secrets.
4. **Old repos:**
   - **`myportfolio`** (currently live at `shashinthael.github.io/myportfolio/` on GitHub Pages): at launch, replace its contents with one `index.html` that meta-refresh redirects to `https://shashintha.dev` and has a canonical link to it. Then archive the repo.
   - **`myportfolio.github.io`** (its Pages build fails): delete.
   - **`company_portfolio`** (private): leave as it is.
5. **Email on the site:** stays `shashinthael@gmail.com`, matching the CV. A domain email address is a possible later follow-up, outside this effort.
6. **Follow-ups after launch** (for the CV effort, not this map): add `shashintha.dev` to the Master CV header, the LinkedIn contact info and Featured section, the GitHub profile's website field, and the cover-letter template.
