# Content and structure: what a Reader sees, in what order

Type: grilling
Status: resolved
Blocked by: 01
Map: [../map.md](../map.md)

## Question

**Start with the three checks the project inventory left unanswered** (see [Project inventory](01-project-inventory.md)): has the old ngrok token been revoked, where does the Docker and Azure version of AXD-Fraud live, and where is the Market Price Forecasting code? The answers decide how those two projects can be shown.

Then, using the project inventory ([research/project-inventory.md](../research/project-inventory.md)), decide:

1. **Above the fold:** what passes the Scan test in the first screen, on a phone and on a desktop (name, headline, current role, stack, right to work, CV download, links).
2. **Sections and order:** for example experience, Featured projects, Archive, education, skills and contact, and whether it's one page or one page plus project pages.
3. **Featured and Archive:** which projects go in each, in what order, and in one line each, why. AXD-Fraud and Zeylan lead the Featured list unless the inventory says otherwise. The inventory suggests Edirisooriya Stores belongs in it too. How a private repo is shown (a live link, screenshots, or making it public) also needs settling. How a project without a live demo yet is shown.
4. **Track balance:** how one page serves both the Full Stack and the AI/LLM tracks without reading like two people.
5. **Wording:** whether the Portfolio's text uses the CV and LinkedIn copy-pack wording as it is, or is rewritten for the web, still under the claim rules.

## Answer

Resolved 2026-11-22 with him, in two rounds. He accepted every recommendation.

**Open checks from the inventory**
- ngrok token: **revoked** (he confirmed).
- Docker and Azure for AXD-Fraud, and the Market Price Forecasting code: **still unconfirmed**. Until he says where they live, the Portfolio describes AXD-Fraud as "Flask API and React dashboard" with **no Azure or Docker claim**, and shows Market Price Forecasting as text only, with no link.

**First screen (Scan test)**
- The hero is shortened, so the whole **Fact strip** shows in the first screen on desktop. It has five facts: **Now · Stack · Based · Right to work · Education**. Education reads "MSc Software Engineering (Merit) · BSc First Class".
- On a phone, one compact line under the name: "Albhadreen · London · UK right to work to Nov 2028 · MSc, BSc First Class".
- The hero keeps the eyebrow role, the name, a short lede, "Download CV" and "Get in touch", with the Stack 3D on the right.

**Sections, in order (one page):** Hero (Stack 3D) → Fact strip → Experience → Featured projects (Gallery 3D, with an HTML write-up for each) → Archive (only if non-empty) → Education → Skills → Contact sign-off.

**Experience:** Albhadreen, then Innovio, with the CV's bullets copied word for word. The agentic AI line stays experimental. No screenshots of Albhadreen work. Kivorana appears only as a project.

**Featured, in order:**
1. **AXD-Fraud**: leads the AI track (F1 0.82, SHAP, drift detection).
2. **Edirisooriya Stores**: the deepest full-stack work. It's named and its shop described **only with the shop owner's OK**, and called "in use" only if it is. Screenshots come from demo mode only, never real data.
3. **Zeylan**: live, with 3D, tests and CI/CD.
4. **Kivorana**: live, and his own studio. The chat demo is described as a scripted demo.

The Gallery has **4 panels**.

**Archive:** the Physio Clinic booking system and the Android chat app, **only once their code is public with a README**. Until then there's no Archive section. DashboardnewUi, company_portfolio and B-132 stay off the site.

**Private repos and demos**
- Zeylan becomes public, after removing his personal email from its README.
- Kivorana and Edirisooriya Stores stay private, shown through live links or screenshots.
- No "coming soon" labels. Live links are added only once they work, for example AXD-Fraud after the hosting planned for about 2026-12-06.

**Education** (rows styled like the projects, with no logos and no certificates or transcripts)
- **MSc Software Engineering**, with a gold **Merit** label. University of Hertfordshire, Jan 2025 – May 2026. The CV's modules line, then "Dissertation: AXD-Fraud", linking to its project.
- **BSc (Hons) Software Engineering**, with a gold **First Class** label. University of Wolverhampton, 2021 – 2024. "Final-year project: Market Price Forecasting Platform", linking only if the code is found.

**Skills:** the CV's six skill groups, word for word.

**Contact:** email, LinkedIn, GitHub and the CV PDF. **No phone number** on the public site.

**Both tracks on one page:** one headline ("Full Stack Developer · AI & LLM Applications"). Full-stack evidence comes from Experience. AI evidence comes from AXD-Fraud, the experimental agentic AI line and the "Azure OpenAI (experimental)" node in the Stack 3D. No track switcher.

**Wording:**
- Experience, Education and Skills use the CV's wording word for word.
- Project write-ups are plain, natural web copy in the cover-letter tone. Every claim traces to the CV or to the project's repo.

**Pre-launch checklist for the build effort (his to do):**
- get the shop owner's OK for Edirisooriya Stores
- clean Zeylan's README, then make the repo public
- optionally, publish the Physio Clinic and chat app code with READMEs
- confirm where the Docker/Azure AXD-Fraud and Market Price Forecasting versions live
