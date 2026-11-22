# Domain names and Cloudflare hosting limits

Research for [issues/02-domain-and-hosting-facts.md](../issues/02-domain-and-hosting-facts.md). All checks and page reads were done on **2026-11-22**. The "updated" date after each Cloudflare source is the page's own `dateModified` value.

## Summary

- Every name on the shortlist is unregistered except `edirisooriya.com`, which has been registered since 2024-04-15 and runs to 2027-04-15.
- `.dev` costs about $8 for the first year and about $12 a year after that. `.com` is about $10–12 a year, and `.co.uk` and `.uk` about $5–6 a year.
- `.dev` only works over HTTPS, because the whole TLD is on the HSTS preload list. Cloudflare handles this for you. `.co.uk` has no UK-presence rule, but Nominet expects your name and address to be real and checkable.
- **The surprise: Cloudflare now tells new projects to use Workers (static assets), not Pages.** Pages is not deprecated and has no end date, but the Pages docs home page says "Start new projects with Workers."
- For 3D assets, the limit that matters is the same on both products: **25 MiB per file** and **20,000 files** on the free plan. Builds time out after **20 minutes**.
- A static Astro build needs no adapter on either product. For Next.js, Cloudflare now recommends **vinext** (not OpenNext, and not `next-on-pages`). A plain `output: "export"` build still deploys as static files.

## 1. Domains

### How availability was checked

I queried the registry's own RDAP server for each TLD with `curl`. A 404 means the registry has no record of the name, so it is not registered. I also queried through the `rdap.org` bootstrap, and used `whois` for `.com` and `.co.uk` as a second check. The results matched.

- `.dev`: `https://pubapi.registry.google/rdap/domain/<name>` (Google Registry)
- `.com`: `https://rdap.verisign.com/com/v1/domain/<name>` (Verisign)
- `.uk` / `.co.uk`: `https://rdap.nominet.uk/uk/domain/<name>` (Nominet), plus `whois -h whois.nic.uk`, which said: "No match for "shashintha.co.uk". This domain name has not been registered."
- Others (`.io`, `.me`): `https://rdap.org/domain/<name>`

**Caveat:** RDAP only shows whether a name is registered. It does not show whether the registry has reserved a name or charges a premium price for it. None of these names looks like a premium name, but check the price in the registrar's search before buying.

### Results (2026-11-22)

| Domain | Status | How checked |
|---|---|---|
| `shashintha.dev` | Available (not registered) | Google Registry RDAP 404 |
| `edirisooriya.dev` | Available | Google Registry RDAP 404 |
| `shashintha.com` | Available | Verisign RDAP 404; whois "No match" |
| `shashinthaedirisooriya.com` | Available | Verisign RDAP 404 |
| `shashintha.co.uk` | Available | Nominet RDAP 404; Nominet whois "not been registered" |
| `edirisooriya.com` | **Taken**: registered 2024-04-15, expires 2027-04-15, client transfer/delete locks set | Verisign RDAP 200 |
| `shashinthaedirisooriya.dev` (alternative) | Available | Google Registry RDAP 404 |
| `shashintha.uk` (alternative) | Available | Nominet RDAP 404 |
| `shashinthae.dev`, `sedirisooriya.dev` (alternatives) | Available | rdap.org 404 |
| `shashintha.io`, `shashintha.me` (alternatives) | Available | rdap.org 404 |

Note that `edirisooriya.com` belongs to someone else, so a surname-only `.com` is not possible. Who owns it is not shown and was not looked up.

### Prices (USD, per year)

Cloudflare Registrar charges at cost: "you pay the registry and ICANN list price with no markup" ([Registrar FAQ](https://developers.cloudflare.com/registrar/faq/), updated 2026-08-03). Cloudflare's own pages do not list per-TLD prices outside the logged-in search, so the Cloudflare column below comes from a third-party site and is **unverified**. Porkbun's figures come from Porkbun's own public pricing API, so they are first-party for Porkbun.

| TLD | Cloudflare first year / renewal (**unverified**, cfdomainpricing.com, run by NameBeta, "updated 2026-11-22") | Porkbun first year / renewal (Porkbun API `pricing/get`, 2026-11-22) |
|---|---|---|
| `.dev` | $8.20 / $12.20 | $8.75 / $12.87 |
| `.com` | $10.46 / $10.46 | $11.81 / $11.81 |
| `.co.uk` | $5.30 / $5.30 | $5.66 / $5.66 |
| `.uk` | $5.30 / $5.30 | $5.66 / $5.66 |
| `.io` | $32.00 / $50.00 | $28.12 / $51.80 |
| `.me` | $16.56 / $16.56 | $17.27 / $17.27 |

The two registrars are within about a dollar of each other, which suggests the Cloudflare figures are about right. Confirm the real price in the Cloudflare dashboard search before buying. `.io` costs a lot more than the others and gets more expensive after the first year.

### Cloudflare Registrar rules that matter

- Supports `.com`, `.dev`, `.uk`, `.co.uk`, `.io` and `.me` ([TLD policies](https://www.cloudflare.com/tld-policies/), read 2026-11-22).
- "All domains on Cloudflare Registrar use Cloudflare nameservers." You cannot point a domain registered there at another DNS host ([Registrar FAQ](https://developers.cloudflare.com/registrar/faq/)).
- You can register for up to 10 years. Auto-renew runs about 30 days before expiry, and "All renewals are final", so there are no refunds (same FAQ).
- Names with accented or non-Latin characters (IDNs) are not supported ([Registrar TLDs](https://developers.cloudflare.com/registrar/top-level-domains/), updated 2026-05-15). This does not affect the names above.

### TLD quirks

- **`.dev`:** "The .dev domain is included on the HSTS preload list, making HTTPS required on all connections without extra setup." Browsers "will only load .dev sites over a secure HTTPS connection", and "Your site needs an SSL certificate before it will load." Anyone can register one ([Google Registry .dev page](https://www.registry.google/domains/dev/), read 2026-11-22). In practice this costs nothing extra, because Cloudflare issues the certificate automatically.
- **`.co.uk` / `.uk`:** There is no UK-presence rule. Nominet has registrant types for non-UK individuals (`FIND`) and non-UK companies ([Nominet field definitions](https://registrars.nominet.uk/document/field-definitions-and-registrant-types/)). Registrars must be able to check the registrant's name and address, using things like billing records, a utility bill or ID ([Nominet: how registrars validate data](https://registrars.nominet.uk/uk-namespace/data-quality-policy/how-can-registrars-validate-data/)). Use your real name and address. The old rule that overseas registrants of second-level `.uk` names needed a UK "address for service" seems to have been dropped. That comes from a search snippet of a Nominet registrar page I could not open (nominet.uk returned 403), and GoDaddy's page still mentions the old rule, so treat it as **unverified**. It does not matter for someone living in the UK.
- Nominet's WHOIS banner says: "WHOIS service for .UK will cease on 9th of February 2027", with RDAP replacing it. This is only relevant to tooling.

## 2. Hosting limits for 3D assets

### Cloudflare Pages ([Pages limits](https://developers.cloudflare.com/pages/platform/limits/), updated 2026-11-19)

| Limit | Free plan |
|---|---|
| Max size of one file | **25 MiB** |
| Max files per site | **20,000** (100,000 on paid plans, with `PAGES_WRANGLER_MAJOR_VERSION=4`) |
| Build timeout | **20 minutes** |
| Builds per month | 500 |
| Concurrent builds | 1 per account |
| Custom domains per project | 100 |
| `_redirects` | 2,000 static + 100 dynamic (2,100 total) |
| `_headers` | 100 rules, 2,000 characters per header |
| Deployments kept | 30 days, plus the latest 100 and the current production deployment |

### Workers static assets (the path Cloudflare now recommends)

- **Same file limits:** 20,000 files per version on Free (100,000 on Paid, which needs Wrangler 4.34.0 or later), and **25 MiB** per file. `_redirects` and `_headers` limits are the same as Pages, plus 1,000 characters per redirect rule ([Workers limits](https://developers.cloudflare.com/workers/platform/limits/), updated 2026-11-19).
- "Requests to static assets are free and unlimited" ([Billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), updated 2026-11-12). The 100,000 requests a day free limit applies to Worker script calls, and a purely static site makes none.
- **Workers Builds on Free:** 3,000 build minutes a month, 1 concurrent build, a **20-minute** timeout, 2 vCPU, 8 GB of memory and 20 GB of disk ([Workers Builds limits](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/), updated 2026-10-28).

**What this means for 3D:** keep each GLB, HDR, texture or Draco/KTX2 file under 25 MiB. A larger file has to be split up or hosted elsewhere, for example on R2. The file-count and build-time limits are very unlikely to be a problem for a portfolio.

### Custom domains and redirects

**Pages** ([Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), updated 2026-11-11):
- In the dashboard: Workers & Pages, then your project, then **Custom domains**, then **Set up a domain**.
- An **apex domain** (`shashintha.dev`) must be a Cloudflare zone using Cloudflare nameservers. This happens automatically if you buy the domain at Cloudflare Registrar. Cloudflare then creates the record.
- A **subdomain** can sit on outside DNS with a CNAME to `<project>.pages.dev`. Add the domain in the Pages dashboard first, or you may get a 522 error.
- **Redirecting `<project>.pages.dev` to the custom domain:** use an account-level **Bulk Redirect** (same page). The free plan allows 15 Bulk Redirect rules, 5 lists and 10,000 URL redirects across lists ([URL forwarding availability](https://developers.cloudflare.com/rules/url-forwarding/), updated 2026-08-14).

**Workers** ([Workers custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), updated 2026-11-12):
- Go to Settings, then Domains & Routes, then Add, then Custom Domain. You can also do it in Wrangler with `"custom_domain": true`. The zone must be on Cloudflare. The DNS record and certificate are created automatically.
- Workers cannot use domains whose nameservers are not on Cloudflare. Pages can, but only for subdomains ([Pages to Workers migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/), updated 2026-11-12). This does not matter if the domain is bought at Cloudflare.
- To turn off the `workers.dev` address, set `workers_dev = false` and redeploy. Preview and version URLs keep working ([workers.dev docs](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/), updated 2026-11-06). Unlike Pages, you don't need a Bulk Redirect.

**Redirecting a second domain** (for example `shashintha.com` to `shashintha.dev`):
- Add the second domain as its own Cloudflare zone.
- Create a **Single Redirect** rule matching `http*://shashintha.com/*` with target `https://shashintha.dev/${2}`, status 301, and query string preserved ([example](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-different-hostname/), updated 2026-05-05).
- "Single Redirects require that the incoming traffic for the hostname ... is proxied by Cloudflare", so the zone needs a proxied DNS record ([create a redirect](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/), updated 2026-05-05).
- The free plan allows 10 Single Redirect rules per zone.

## 3. Framework support

### Pages or Workers?

- The Pages docs home page has a banner: "Start new projects with Workers. Workers supports most Pages use cases and offers a broader feature set" ([Pages overview](https://developers.cloudflare.com/pages/), updated 2026-08-25). No deprecation or end date is given, and Pages is still "Available on all plans."
- The migration guide makes no statement about deprecation. For a static site, here is how Pages features map to Workers:
  - `_redirects` and `_headers` work the same way.
  - Git deploys go through **Workers Builds**, which has fewer preview-build controls than Pages.
  - Preview URLs need a `previews` block in the Wrangler config.
  - Workers needs an explicit `not_found_handling` setting (`"404-page"` or `"single-page-application"`). Pages works this out from `404.html` and `index.html`.

  Source: the [migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/) and [static assets](https://developers.cloudflare.com/workers/static-assets/), both updated 2026-11-12.
- The map has already settled on "Hosting is Cloudflare Pages." This still works and costs nothing. But Cloudflare's current advice for a new project is Workers static assets, which has the same limits and the same cost (free) for a static site. **The spec should decide which one to use.**

### Static Astro

- On Workers, "if you use Astro only as a static site generator", you "do not need the Astro Cloudflare adapter." Use a `wrangler.jsonc` with `"assets": { "directory": "./dist" }` and no `main` key, then run `npx astro build` and `npx wrangler deploy` ([Astro on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/), updated 2026-11-05).
- Astro 6.x and 7.x need **Node.js 22.12.0 or later** (same page).
- On Pages, a static Astro build is the usual framework preset (build command `astro build`, output `dist`). I did not re-read the Pages Astro guide for this ticket.

### Static-export Next.js

- "Cloudflare recommends **vinext** as the default way to run Next.js applications on Cloudflare Workers." OpenNext is now only for existing OpenNext apps that "cannot yet migrate to vinext." vinext supports `output: "export"`, deployed with `npx @vinext/cloudflare deploy` ([Next.js on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/), updated 2026-11-05).
- On Pages, use the "Next.js (Static HTML Export)" preset: build command `npx next build`, output directory `out` ([Static Next.js on Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/), updated 2026-08-25). The Pages Next.js page says "Cloudflare recommends vinext on Workers for full-stack Next.js applications."
- `@cloudflare/next-on-pages` is no longer mentioned on any current Cloudflare Next.js page, which suggests Cloudflare has moved away from it. No page I read calls it deprecated in so many words, so treat "deprecated" as **unverified**. Don't use it either way.
- A static export is just files, so in principle it could also go on Workers static assets with `assets.directory = "./out"`, the same as Astro. Cloudflare's Next.js page doesn't show this exact setup.

## Sources (all read 2026-11-22)

- Cloudflare Pages limits: https://developers.cloudflare.com/pages/platform/limits/
- Cloudflare Pages overview: https://developers.cloudflare.com/pages/
- Pages custom domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Static Next.js on Pages: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
- Next.js on Pages: https://developers.cloudflare.com/pages/framework-guides/nextjs/
- Workers static assets: https://developers.cloudflare.com/workers/static-assets/
- Workers static assets billing: https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
- Workers limits: https://developers.cloudflare.com/workers/platform/limits/
- Workers Builds limits: https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/
- Migrate from Pages to Workers: https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
- Workers custom domains: https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
- workers.dev routing: https://developers.cloudflare.com/workers/configuration/routing/workers-dev/
- Astro on Workers: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- Next.js on Workers: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- URL forwarding availability: https://developers.cloudflare.com/rules/url-forwarding/
- Single Redirects example: https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-different-hostname/
- Single Redirects (dashboard): https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/
- Cloudflare Registrar product page: https://www.cloudflare.com/products/registrar/
- Cloudflare Registrar FAQ: https://developers.cloudflare.com/registrar/faq/
- Cloudflare Registrar TLDs: https://developers.cloudflare.com/registrar/top-level-domains/
- Cloudflare TLD policies: https://www.cloudflare.com/tld-policies/
- Google Registry .dev: https://www.registry.google/domains/dev/
- Nominet field definitions: https://registrars.nominet.uk/document/field-definitions-and-registrant-types/
- Nominet data validation: https://registrars.nominet.uk/uk-namespace/data-quality-policy/how-can-registrars-validate-data/
- Porkbun pricing API: `POST https://api.porkbun.com/api/json/v3/pricing/get`
- Cloudflare prices (**third-party, unverified**): https://cfdomainpricing.com/
- RDAP: Google Registry `pubapi.registry.google/rdap`, Verisign `rdap.verisign.com/com/v1`, Nominet `rdap.nominet.uk/uk`, and the `rdap.org` bootstrap
