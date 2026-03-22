# MG-CRO — Maintenance-Gated Correlation & Remediation Orchestrator

> A closed-loop, maintenance-aware incident decisioning and auto-remediation architecture.  
> **Team:** Code Blooded · AINNOVATE Ideathon · Kyndryl 2025

---

## Live Site

Deploy to GitHub Pages by pushing this repository and enabling Pages in Settings → Pages → Source: `main` branch, `/ (root)`.

---

## Project Structure

```
mgcro-site/
├── index.html          # Main single-page website
├── assets/
│   ├── style.css       # All styles (dark theme, responsive)
│   └── main.js         # Interactivity, tech stack renderer, scroll reveal
└── README.md
```

## Sections

| Section | Content |
|---------|---------|
| Hero | Project overview, key metrics |
| 01 · Problem | ITIL gaps, measurable impact stats |
| 02 · Solution | Five agentic layers, risk autonomy matrix |
| 03 · Architecture | Before/After comparison, end-to-end event flow |
| 04 · Tech Stack | All 37 technologies across 7 layers — expandable with descriptions |
| 05 · Roadmap | Phase 1–5 implementation plan with KPIs |
| 06 · Team | Team members and mentor |

## Tech Stack Covered

- **Input Sources:** Netcool/OmniBus, Prometheus, VMware vCenter, SSH Poller, WMI/PowerShell, Kubernetes API, Azure Backup
- **Transport:** Apache Kafka, Consumer Groups, Webhook Fallback, Pydantic, SSE Streaming
- **Orchestration:** LangGraph, LangChain, LangSmith, Supervisor Agent, Conditional Edge Routing, Maintenance Gate
- **AI / LLM:** OpenAI GPT-4o, BGE Embeddings, RAG Pipeline, ML Risk Classifier, Correlation Agent, Priority Agent, Runbook Selector
- **Data Layer:** Neo4j, Weaviate, Redis, ChromaDB, CMDB, HashiCorp Vault
- **Execution:** Ansible Tower, NEXT API, Dry-Run Gate, Syntax Validator, FastAPI, WebSocket Dashboard, Kyndryl SSO
- **Output:** ServiceNow REST, OTel Traces, Prometheus Metrics, Grafana, MS Teams Adaptive Card, Problem Mgmt Feedback Loop

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `mgcro`)
2. Push all files in this folder to the `main` branch
3. Go to **Settings → Pages**
4. Set Source to: `Deploy from a branch` → `main` → `/ (root)`
5. Click Save — your site will be live at `https://<username>.github.io/mgcro/`

## Team

| Name | Role | Email |
|------|------|-------|
| Shankar S S | Team Leader | shankarss@kyndryl.com |
| Sanjay B | Team Member | sanjay.b@kyndryl.com |
| Mothesh M | Team Member | mothesh.m@kyndryl.com |
| Gokul Sekar | Team Member | gokulsekar@kyndryl.com |
| Sanjay Naresh | Team Member | sanjaynaresh@kyndryl.com |
| Charan Pujari | Mentor | Charan.Pujari@kyndryl.com |

---

*Kyndryl Confidential · © Kyndryl, Inc. 2025*
