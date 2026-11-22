# SEO, sharing and analytics

Type: grilling
Status: resolved
Blocked by: 08
Map: [../map.md](../map.md)

## Question

Once the domain is chosen in [Domain, and what happens to the old portfolio](08-domain-and-old-portfolio.md), decide:

1. **Page title and meta description.**
2. **The Open Graph and Twitter share image.** What it shows and how it's made, for example drawn at build time as Zeylan's are. It should look right when the link is pasted into LinkedIn, Slack or WhatsApp.
3. **Structured data.** A `Person` entry with name, job title and `sameAs` links to LinkedIn and GitHub. The canonical URL, `robots.txt` and the sitemap.
4. **Analytics.** Whether to measure visits at all. If so, Cloudflare Web Analytics (no cookies, no consent banner) or nothing, and what the numbers would be used for.

## Answer

Resolved 2026-11-22 with him. He accepted every recommendation.

1. **Title:** "Shashintha Edirisooriya · Full Stack Developer · London".
   **Meta description:** "Full stack developer in London working across .NET microservices, React and Azure, and helping my team experiment with agentic AI. UK right to work. Projects, experience and CV."
   `<html lang="en-GB">`.
2. **Share image:** 1200 × 630 PNG, drawn at build time with resvg from the same data, the same approach as Zeylan's `src/pages/og/[slug].png.ts`. It shows:
   - a Porcelain background
   - the name in Cormorant, with the italic gold surname
   - "Full Stack Developer · AI & LLM Applications"
   - a gold rule
   - a still Stack diagram (from the SVG fallback)
   - "shashintha.dev"

   It's used for both `og:image` and `twitter:image` (`summary_large_image`).
3. **Search basics:**
   - **Structured data:** a JSON-LD `Person` with name, jobTitle "Full Stack Developer", worksFor Albhadreen, alumniOf the University of Hertfordshire and the University of Wolverhampton, address London, url, and sameAs LinkedIn and GitHub. No phone and no email.
   - **Indexing:** canonical `https://shashintha.dev/`, `@astrojs/sitemap`, and a `robots.txt` that allows everything and points to the sitemap.
   - **Preview address:** the `workers.dev` preview sends `X-Robots-Tag: noindex`.
   - **Icons:** an SVG "S·E" monogram favicon and an `apple-touch-icon`.
4. **Analytics:** Cloudflare Web Analytics (cookieless, no consent banner), with the beacon deferred and outside the first-party JavaScript budget. The footer note reads "No cookies. Simple visit counts by Cloudflare Web Analytics."
