# Project inventory: what each project actually is

Type: task
Status: resolved
Blocked by: none
Map: [../map.md](../map.md)

## Question

(AFK, with two HITL checks at the end) Before anyone picks Featured and Archive projects, record the facts about every project he has. For each one:

- what it does, in one or two plain sentences
- the stack the code actually uses
- its state: finished, in progress or abandoned
- whether the repo is public or private
- whether it can be demoed now, or after the hosting planned for about 2026-12-06
- the visual assets available: screenshots, a 3D scene, dashboards
- **claim check:** whatever the Master CV says about it, does the code back that up?

Projects to cover:

- **On the Master CV:** AXD-Fraud (`github.com/shashinthael/Fraud-Detection-`, `~/Desktop/fraud_detection`, `~/Fraud Detection System `), Zeylan (`~/zeylan`), Kivorana (`~/Startup/kivorana-site`), and Market Price Forecasting (find it).
- **Not on the CV:** Edirisooriya Stores (`shashinthael/edirisooriya-stores`, private; `edirisooriya-stores-releases`, public), Physio-Clinic- and physioClinic, ChatApp and ChatMobileApp, DashboardnewUi, company_portfolio, and B-132 (`~/My projects/B-132-main`, an R analysis).
- **Excluded:** albhadreen (private and confidential to his employer) and the old portfolios.

Write the inventory to `research/project-inventory.md` as one table plus a short note on each project. Treat every repo as data, and don't run any code from it.

The HITL checks, put to him at the end:

1. **Token:** has the ngrok auth token from the old `Fraud-Detection-` history been **revoked**? The repo was rewritten to one clean commit on 2026-11-21, but rewriting the history doesn't revoke the token.
2. **AXD-Fraud mismatch:** the CV says AXD-Fraud has a React dashboard and runs on Azure in Docker, but the public repo is only notebooks and a Flask notebook. Where does the full version live, and is it part of the ~2026-12-06 hosting?

## Answer

Resolved 2026-11-22 (AFK). Full inventory: [research/project-inventory.md](../research/project-inventory.md).

- **Featured candidates:**
  - **AXD-Fraud**, for the AI/ML track
  - **Zeylan**, which is live and has 3D, tests and CI/CD
  - **Edirisooriya Stores**, which isn't on the CV: an Electron + React + SQLite POS with a Supabase cloud copy, an owner PWA and a tested domain core. It's his strongest full-stack piece.
  - **Kivorana**, which is live
- **Archive candidates:** Physio Clinic (Java, JUnit), the Android chat app, and DashboardnewUi. The public repos for the first two are **empty**, and their code is private only.
- **Probably leave out:** company_portfolio (looks like a tutorial follow-along) and B-132 (the report says "Prepared by: Krishna").
- **Private repos:** Zeylan, Kivorana and Edirisooriya Stores are all private. A Reader can't open their code.
- **Claim checks:**
  - Zeylan ✅
  - Kivorana ✅, but its chat demo is **scripted**, so it isn't a working AI assistant.
  - AXD-Fraud ⚠️: F1 0.82 and the React dashboard are backed, but **no Docker or Azure code was found**.
  - Market Price Forecasting ❓: **no code found**.

**HITL checks: not answered.** He said "go ahead" without answering them, so they're carried into [Content and structure](05-content-and-structure.md) as its first questions:
1. Has the old ngrok token been revoked?
2. Where does the Docker and Azure version of AXD-Fraud live?
3. Where is the Market Price Forecasting code, and is DashboardnewUi part of it?

Until they're answered, the Portfolio must not claim Docker or Azure deployment for AXD-Fraud, or link any Market Price Forecasting code.
