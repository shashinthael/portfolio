# Domain names and Cloudflare Pages limits

Type: research
Status: resolved
Blocked by: none
Map: [../map.md](../map.md)

## Question

What facts does the domain decision depend on, and what limits does Cloudflare Pages set for a 3D site? Use current sources (late 2026) and Cloudflare's own documentation where possible.

1. **Domains:** are these available, and at what first-year and renewal price on Cloudflare Registrar or another reputable registrar? `shashintha.dev`, `edirisooriya.dev`, `shashintha.com`, `shashinthaedirisooriya.com`, `shashintha.co.uk`, and one or two close alternatives if those are taken. Note any TLD quirks (for example, `.dev` requires HTTPS through HSTS preload) and whether `.co.uk` has UK-presence rules.
2. **Cloudflare Pages limits** that matter for 3D assets: maximum file size, maximum number of files, build time limits on the free plan, and how custom domains and redirects (from a `pages.dev` address or another domain) are set up.
3. **Framework support:** how Cloudflare Pages (or Workers static assets, if that's now the recommended path) handles a static Astro build and a static-export Next.js build. Note anything that's deprecated or recommended against as of late 2026.

Write findings, with sources and dates, to `research/domain-and-hosting.md`, and summarise them in an `## Answer` section on this ticket. Mark third-party figures as unverified.

## Answer

Checked on 2026-11-22. Full findings and sources are in [research/domain-and-hosting.md](../research/domain-and-hosting.md).

- **Availability:** `shashintha.dev`, `edirisooriya.dev`, `shashintha.com`, `shashinthaedirisooriya.com` and `shashintha.co.uk` are all unregistered. I checked each one against its registry's RDAP server, and against WHOIS for `.com` and `.co.uk`. `edirisooriya.com` is **taken** (registered 2024, expires 2027). Alternatives such as `shashintha.uk`, `shashinthaedirisooriya.dev` and `shashintha.io` are also free. RDAP can't show premium or reserved pricing, so confirm the price at checkout.
- **Price per year (USD):** `.dev` about $8 for the first year, then about $12. `.com` about $10–12. `.co.uk` and `.uk` about $5–6. The Cloudflare figures are third-party and **unverified**. Porkbun's own API gives prices within about $1 of them.
- **TLD quirks:** `.dev` is on the HSTS preload list, so it only loads over HTTPS. Cloudflare's automatic certificate covers this. `.co.uk` has no UK-presence rule, but the name and address must be real and checkable. Domains bought at Cloudflare Registrar must use Cloudflare nameservers.
- **Hosting limits (free plan):** 25 MiB per file, 20,000 files, 20-minute build timeout, and 1 build at a time. These are the same on Pages and on Workers static assets. Requests for static assets are free and unlimited.
- **Custom domains and redirects:** an apex domain needs a Cloudflare zone. To redirect `*.pages.dev` to it, use a Bulk Redirect. On Workers, set `workers_dev = false` instead. To redirect a second domain, use a 301 Single Redirect on a proxied zone (10 rules per zone on the free plan).
- **Surprise:** Cloudflare's Pages docs now say "Start new projects with Workers." Pages is not deprecated, but the spec should choose between Pages and Workers static assets.
- **Frameworks:** a static Astro build needs no adapter (`assets.directory = "./dist"`). Astro 6 and 7 need Node 22.12 or later. For Next.js, Cloudflare recommends **vinext**. A static `output: "export"` build still deploys as plain files (the Pages preset uses output folder `out`). `next-on-pages` is no longer mentioned in Cloudflare's docs, so don't use it.
