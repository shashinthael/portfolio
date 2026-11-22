# The Signature moment

Type: prototype
Status: resolved
Blocked by: 04, 05, 06
Map: [../map.md](../map.md)

## Question

**Start by asking:** what didn't he like about the August portfolio attempts (`~/My projects/portfolio*`, `command-deck`)? This was asked while charting and is still unanswered. His answer steers everything below.

What is the one 3D interaction a Reader remembers, where does it sit on the page, and how does it degrade? It should come from his own work rather than generic decoration. Early ideas:

- his stack as a system you can fly through, like his microservices, CI and Azure pipeline
- a 3D workbench of the Featured projects
- the Sri Lanka to London journey (Zeylan already has a 3D island)

**Early input (2026-11-22):** while the Visual identity ticket was being resolved, he asked to see other 3D animations. Six options were prototyped in Maison Porcelain: `luxury.html?v=I&tone=porcelain&scene=…` (knot, liquid, stack, globe, gallery, particles). Start from his reaction to those.

Build 2–3 rough concepts in the chosen stack and visual identity, each with its fallback (no WebGL, reduced motion, a phone). He reacts to them in the browser. Link the prototypes from this ticket, and record the chosen concept, how it's triggered, what it shows, and how it falls back.

## Early prototype (2026-11-22)

[luxury.html?v=I&tone=porcelain&scene=…](../../../prototypes/visual-identity/luxury.html): six 3D options inside the chosen Maison Porcelain look. Switch between them with the "3D:" row in the bar.

- **knot**: gold knot with rings and dust.
- **liquid**: a rippling champagne-metal sphere with a halo ring.
- **stack**: his CV stack as a system of metal nodes with pulses running along the links (React · TypeScript → REST APIs → .NET microservices → SQL Server / Azure / Azure OpenAI (experimental), with GitHub Actions → Docker → Azure and App Insights).
- **globe**: a dotted porcelain globe with a gold arc and a moving dot from Colombo to London.
- **gallery**: Featured project panels on a ring that turns as you scroll.
- **particles**: graphite and gold grain that changes from a sphere to a helix to a field as you scroll.

## His preference (2026-11-22)

After trying the six options, he chose **Stack in the hero** and **Gallery for the projects section**. This ticket stays open, because it's still blocked by [Content and structure](05-content-and-structure.md) and [Tech stack](06-tech-stack.md). When it's worked, start from this preference instead of new concepts. What's left to settle:

1. **Stack nodes and labels.** They must match the final content and the claim rules. "Azure OpenAI" keeps its "experimental" wording.
2. **Gallery panels.** Four panels, in this order: AXD-Fraud, Edirisooriya Stores, Zeylan, Kivorana. No Archive panel. These are settled in Content and structure.
3. **Handover between the two.** How the hero's Stack gives way to the Gallery as the Reader scrolls.
4. **Fallbacks.** What each one shows with no WebGL, with reduced motion, and on a phone.
5. **Implementation.** How both are built in the chosen stack.

## Prototype (2026-11-22)

[prototypes/signature-moment/index.html](../../../prototypes/signature-moment/index.html) (throwaway). It's the decided look and content with both scenes in place. The bar at the bottom simulates Normal, No WebGL, Reduced motion and Phone.

## Answer

Resolved 2026-11-22 with him, in the [prototype](../../../prototypes/signature-moment/index.html). He accepted every recommendation. The opening question about the August attempts is no longer needed, because he chose directly from prototypes.

**Two 3D scenes, built separately.** Each has its own WebGL canvas, is hidden from screen readers (`aria-hidden`), renders only while on screen, and stops rendering when still.

**1. Stack (hero, right of the name)**
- **Caption:** "The stack I work in at Albhadreen".
- **Ten nodes,** all from the Master CV's Albhadreen stack line:
  - React · TypeScript
  - REST APIs
  - **.NET microservices** (the large central node)
  - SQL Server
  - Azure
  - **Azure OpenAI · AI Foundry (experimental)**
  - GitHub Actions
  - Docker
  - App Insights
  - xUnit · pytest
- Phones use short labels, for example "Azure OpenAI (exp.)".
- **Links** are curved hairlines with gold pulses running along them. They join front end → APIs → .NET, .NET to SQL, Azure and the AI node, CI → Docker → Azure, Azure → App Insights → .NET, and tests → CI and .NET.
- **Motion:** slow sway and pointer tilt. Hovering a node highlights its links and neighbours and fades the rest. As the hero scrolls away, the Stack drifts up and fades out (the handover to the projects).
- Champagne-metal spheres, as in the prototype.

**2. Gallery (Featured projects)**
- **Four panels** on a ring, in this order: AXD-Fraud, Edirisooriya Stores, Zeylan, Kivorana. Each panel shows the kind and year, the title in Cormorant, a gold rule, the stack in mono, and a 01–04 number. The front panel is opaque; the side panels fade back.
- **Desktop:** the section is about 4 viewports tall with a sticky viewer, so each scroll step brings the next project forward. The HTML write-up on the left crossfades to match and is announced politely to screen readers. There's also a 01/04 counter, Prev/Next buttons, and clicking a panel brings it forward.
- **Phone:** no pinning. Swipe the ring or tap Prev/Next. The canvas sits above the write-up.

**Fallbacks**
- **No WebGL** (or WebGL fails to start): the Stack becomes a still SVG diagram drawn from the same node and link data, and the Gallery becomes four HTML project cards with screenshots.
- **`prefers-reduced-motion`:** the Stack renders one still frame, and the Gallery snaps to the chosen panel with no turning.
- **Pause motion:** a button, always shown (WCAG 2.2.2).
- **Weak device:** if the 3D renders too slowly, it drops to the No-WebGL fallback. The threshold is set in [Performance and accessibility budget](09-performance-and-accessibility-budget.md).

**Data:** the nodes, links and project write-ups come from the same typed content files as the rest of the page, so the claim-rules test covers the 3D text too.
