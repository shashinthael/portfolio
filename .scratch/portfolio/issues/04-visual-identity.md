# Visual identity

Type: prototype
Status: resolved
Blocked by: none
Map: [../map.md](../map.md)

## Question

What does the Portfolio look like, apart from the 3D: colour, type, layout density, light or dark? Should it carry over the Master CV's identity (warm cream panel, teal `#2a7a72`, Helvetica + Georgia + Menlo, teal mono section labels), so the CV, the cover letters and the site look like one person? Or should it start fresh?

Build 2–3 rough style tiles as static HTML (a hero, one project card and a section label, on desktop and phone widths). One should extend the CV's identity, the others should take different directions. He reacts to them in the browser. Link the prototype from this ticket. The 3D gets settled later, in the Signature moment ticket.

## Prototype

[prototypes/visual-identity/index.html](../../../prototypes/visual-identity/index.html) (throwaway). Eight directions, switchable with `?variant=A`…`H`, plus `&w=phone` for a 390px frame:

- **A · Paper & Teal**: extends the CV's identity.
- **B · Blueprint**: a dark engineering console.
- **C · Swiss Poster**: huge type with one loud accent.
- **D · Spatial**: deep gradient and glass, built around a full-bleed 3D scene.
- **E · Bento**: light product-style tiles, with the facts each in their own tile.
- **F · Split**: identity and facts pinned on the left, work scrolling on the right (deep green and amber, Fraunces serif).
- **G · Neo-brutalist**: thick borders, hard shadows, playful yellow, pink and blue.
- **H · Journey**: warm earth tones, with a timeline spine from Colombo to London.

E–H were added on 2026-11-22 after he asked for more designs.

**Round 3 (2026-11-22), after he asked for "more luxury modern 3D animation":** [prototypes/visual-identity/luxury.html](../../../prototypes/visual-identity/luxury.html). Four luxury directions, each with a live three.js scene driven by the mouse and by scrolling, switchable with `?v=I|J|K|L`. All the facts stay in HTML. Motion respects reduced-motion settings and has a Pause button.

- **I · Maison**: noir and gold, with a gold liquid-metal knot inside orbiting rings and gold dust.
- **J · Atelier**: ivory, with pearl, glass and bronze forms floating around a Bodoni name.
- **K · Nocturne**: midnight, with 14,000 particles that change from a sphere to a double helix to a field as you scroll, and facts shown like film credits.
- **L · Gallery**: obsidian and emerald, with the projects as 3D panels on a ring that turns as you scroll.

**Round 4 (2026-11-22):** he liked **Maison** and asked for light colours. Maison now has tone chips in the switcher: `?v=I&tone=noir|ivory|porcelain|rose`. It's the same layout and animation in each, with the page colours, metal colour, rings, dust and lighting changed for each tone, plus a soft contact shadow on the light tones.

## Answer

Resolved 2026-11-22 with him, after four rounds of prototypes: [index.html](../../../prototypes/visual-identity/index.html) (A–H) and [luxury.html](../../../prototypes/visual-identity/luxury.html) (I–L plus the tones).

**The Portfolio's look is Maison in the Porcelain tone** (`luxury.html?v=I&tone=porcelain`):

- **Feel:** luxury and editorial. Clean cool white page (`#ffffff` → `#e6e6e3` radial), near-black text `#121212`, muted gold accent `#8a6d43`, secondary text `#6a6a6a`, hairline rules `#d9d9d6`. Gold is darkened for readable small text on white.
- **Type:**
  - Cormorant Garamond (light, with an italic gold surname) for the name and headings
  - Inter for body text and spaced-out uppercase labels
  - JetBrains Mono for stack lists
- **Layout:**
  - Fixed top bar with the nav split around an "S·E" monogram.
  - The hero sits at the bottom left: eyebrow role, the two-line name, a short lede, a solid "Download CV" button and an underlined "Get in touch" link.
  - The 3D sits on the right.
  - Below the hero, four ruled fact columns: Now, Stack, Based, Right to work.
  - Projects are editorial rows with roman numerals.
  - The page ends on a large italic sign-off.
- **One theme only:** no light/dark switch.
- **Motion:** text fades up on reveal, the 3D reacts to the mouse and to scrolling, a Pause control is shown, and reduced-motion settings are respected.

**Not decided here:** which 3D object or animation to use. In round 5 he asked to see other 3D animations, and those prototypes are an early input to [The Signature moment](07-signature-moment.md).
