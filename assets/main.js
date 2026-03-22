// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.problem-stat, .gap-card, .agent-card, .phase-card, .team-card, .arch-before, .arch-after, .stack-layer, .itil-gaps, .risk-table-wrap, .flow-section'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal', 'visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ===== TECH STACK DATA =====
const stackData = [
  {
    id: 'input',
    icon: '↓',
    iconBg: '#FAECE7',
    iconColor: '#993C1D',
    title: 'Input Sources',
    pills: [
      'Netcool / OmniBus',
      'Prometheus / Alertmanager',
      'VMware vCenter',
      'SSH Poller (Linux/Host)',
      'WMI / PowerShell (Windows)',
      'Kubernetes API / AKS',
      'Azure Backup'
    ],
    descriptions: {
      'Netcool / OmniBus': 'Primary event bus. Aggregates all monitoring tool alerts, deduplicates exact-match events, enriches with CI context, and streams to Kafka.',
      'Prometheus / Alertmanager': 'Cloud-native metrics collection for Kubernetes and Linux hosts. Alertmanager groups, deduplicates, and routes firing rules.',
      'VMware vCenter': 'Virtualisation management plane. Monitors VM health, datastore capacity, host CPU/memory, HA cluster state.',
      'SSH Poller (Linux/Host)': 'Actively connects to Linux/Unix hosts to run diagnostic commands — disk usage, inode count, running services, memory pressure.',
      'WMI / PowerShell (Windows)': 'Native Windows telemetry API and remote execution. Surfaces service states, event log entries, disk/memory pressure.',
      'Kubernetes API / AKS': 'Full cluster state — pod health, node conditions, deployment rollout, PVC binding, etcd leader election.',
      'Azure Backup': 'Backup job status, failure reasons, protected item health. Failed jobs violate RPO/RTO SLAs.'
    }
  },
  {
    id: 'transport',
    icon: '⇄',
    iconBg: '#FAEEDA',
    iconColor: '#854F0B',
    title: 'Transport',
    pills: [
      'Apache Kafka (Event Stream)',
      'Consumer Group',
      'Webhook Fallback',
      'Pydantic Schemas (Validation)',
      'SSE Streaming (Dashboard)'
    ],
    descriptions: {
      'Apache Kafka (Event Stream)': 'Distributed, append-only log. The spine between OmniBus and the AI agent. Decouples ingestion speed from processing speed — events queue in Kafka if the agent is slow, never dropped.',
      'Consumer Group': 'Multiple LangGraph agent instances consuming the same topic. Each partition assigned to one consumer — horizontal scale and fault tolerance.',
      'Webhook Fallback': 'HTTP POST path for monitoring tools that lack Kafka producer libraries. Also serves as the manual alert trigger for testing.',
      'Pydantic Schemas (Validation)': 'Every event entering the system — from Kafka or webhook — is parsed against a typed schema. Garbage-in is architecturally blocked.',
      'SSE Streaming (Dashboard)': 'Server-Sent Events push live agent decisions to the operations UI in real time as each LangGraph node executes.'
    }
  },
  {
    id: 'orchestration',
    icon: '+',
    iconBg: '#E1F5EE',
    iconColor: '#085041',
    title: 'Orchestration',
    pills: [
      'LangGraph (Agent Graph)',
      'LangChain',
      'LangSmith (Tracing)',
      'Supervisor Agent',
      'Conditional Edge Routing',
      'Maintenance Gate Node'
    ],
    descriptions: {
      'LangGraph (Agent Graph)': 'Stateful multi-agent graph. Five agents as a directed graph with typed state, conditional edges, and human-in-the-loop pause points. The core orchestration engine.',
      'LangChain': 'Underlying toolkit providing LLM wrappers, tool definitions (CMDBLookup, WeaviateSearch, AnsibleDryRun, SNOWCreate), prompt templates, and function-calling protocol handling.',
      'LangSmith (Tracing)': 'Captures every LLM call, tool invocation, prompt, and token count in a hierarchical trace. The compliance audit record — every incident run is fully replayable.',
      'Supervisor Agent': 'Meta-orchestration for Phase 4+. Coordinates parallel specialist agents (Linux, Windows, K8s, Network), handles failures, enforces AI Constitution rules.',
      'Conditional Edge Routing': 'Risk classification output drives routing: Low → DryRunGate → AutoExecute. High → DiagnoseOnly → EscalateWithContext. Logic lives in the graph, not agent code.',
      'Maintenance Gate Node': 'Very first node in the LangGraph. Queries CMDB change management — if the CI has an active approved window, the alert is suppressed with audit-only log. Zero tickets created.'
    }
  },
  {
    id: 'ai',
    icon: '+',
    iconBg: '#E6F1FB',
    iconColor: '#0C447C',
    title: 'AI / LLM',
    pills: [
      'OpenAI GPT-4o',
      'bge-large-en-v1.5 (Embeddings)',
      'RAG Pipeline',
      'Risk Classifier (ML)',
      'Correlation Agent',
      'Priority Agent',
      'Runbook Selector Agent'
    ],
    descriptions: {
      'OpenAI GPT-4o': 'Handles novel alert patterns the ML classifier hasn\'t seen, generates root-cause ticket narratives, and orchestrates tool calls in the Supervisor Agent. NOT used for known alert types — those go through the faster ML classifier.',
      'bge-large-en-v1.5 (Embeddings)': 'Sentence transformer encoding alert profiles into 1024-dimensional vectors. Retrieval-optimised, runs locally at near-zero cost. Powers the Weaviate runbook search.',
      'RAG Pipeline': 'Alert profile → BGE encode → Weaviate ANN search (top-3 runbooks) → inject into LLM prompt → model selects with confidence score. Confidence < 0.65 triggers escalation. Hallucinated playbooks are architecturally blocked.',
      'Risk Classifier (ML)': 'Gradient-boosted or lightweight NN trained on historical alert data. Takes structured features, outputs Low/Medium/High/Critical with confidence. Microsecond inference — handles the majority of alerts.',
      'Correlation Agent': 'Combines Redis TTL cache (same CI+AlertKey = same parent), Neo4j graph traversal (downstream blast radius), and time-window proximity to collapse N alerts into 1 root cause event.',
      'Priority Agent': 'Sets autonomy level based on risk score + CI criticality + business hours + recent change history. Same alert type gets different treatment based on context — dev server vs prod database.',
      'Runbook Selector Agent': 'Takes RAG top-3 candidates, makes final selection, injects client-specific CMDB variables, validates against the pre-approved allow-list, runs Syntax Validator. Bridge between intelligence and action.'
    }
  },
  {
    id: 'data',
    icon: '◎',
    iconBg: '#EEEDFE',
    iconColor: '#534AB7',
    title: 'Data Layer',
    pills: [
      'Neo4j (CI Topology Graph)',
      'Weaviate (Runbook Vector DB)',
      'Redis TTL Cache (Corr. Window)',
      'Chroma DB (Learning Store)',
      'CMDB (Client Context)',
      'HashiCorp Vault (Secrets)'
    ],
    descriptions: {
      'Neo4j (CI Topology Graph)': 'Live infrastructure topology as a graph. Nodes = CIs, edges = dependencies. When an alert fires on node A, Cypher traversal finds all upstream (root cause candidates) and downstream (blast radius) CIs in milliseconds.',
      'Weaviate (Runbook Vector DB)': 'Every Ansible playbook indexed as a semantic vector embedding. ANN search retrieves the top-3 most semantically similar runbooks to the alert profile. Sub-millisecond retrieval across the full playbook library.',
      'Redis TTL Cache (Corr. Window)': 'Nanosecond-latency in-memory store. Key = "nodeID:alertKey", TTL = 10 min. Alert #1 creates the parent. Alerts 2–40 hit the same key → same parent. TTL expires → fresh incident window.',
      'Chroma DB (Learning Store)': 'Accumulates post-incident learnings as vectors. Future similar alerts retrieve these records via RAG, gradually improving decisions. Closes the ITIL CSI loop — the Problem Management feedback loop.',
      'CMDB (Client Context)': 'Queried at Maintenance Gate (change window check) and Runbook Selector (variable injection: OS, service name, log path, restart command). Every action MG-CRO takes is CMDB-enriched.',
      'HashiCorp Vault (Secrets)': 'All API keys (Ansible Tower, ServiceNow, OpenAI, CMDB) stored encrypted with short-lived dynamic tokens. Token expires after the job completes. Full credential access audit log.'
    }
  },
  {
    id: 'execution',
    icon: '▶',
    iconBg: '#E1F5EE',
    iconColor: '#085041',
    title: 'Execution',
    pills: [
      'Ansible Tower',
      'NEXT API',
      'Dry-Run Gate (--check mode)',
      'Syntax Validator',
      'FastAPI (Internal Gateway)',
      'WebSocket Dashboard',
      'Kyndryl SSO'
    ],
    descriptions: {
      'Ansible Tower': 'The only entity that executes changes on infrastructure. AI agent calls Tower REST API to launch pre-defined, version-controlled, idempotent job templates. The allow-list of templates is the hard autonomy boundary.',
      'NEXT API': 'Kyndryl\'s internal runbook execution adapter. Sits between LangGraph and Ansible Tower — handles Tower API auth, job launch, polling loop, and returns structured result objects the agent can parse.',
      'Dry-Run Gate (--check mode)': 'Ansible --check mode runs every playbook in simulation first. Predicts changes without making them. Fail → halt + escalate with failure details. Pass → live execution. Runs for every risk level, no exceptions.',
      'Syntax Validator': 'Static analysis of assembled playbook YAML before Ansible Tower. Block-list catches: rm -rf with broad paths, DROP TABLE, direct /etc/passwd writes, reboot without safety conditions. Blocked = OTel security event.',
      'FastAPI (Internal Gateway)': 'REST API surface for: webhook alert intake (POST /alerts), SSE dashboard stream (GET /stream), human approval (POST /approve/{id}), Kyndryl SSO middleware. All external touchpoints to MG-CRO go through here.',
      'WebSocket Dashboard': 'Real-time operations UI. Surfaces live agent decisions via SSE. For Medium+ risk approval: shows root cause, blast radius, playbook, dry-run result, and a one-click Approve/Reject button.',
      'Kyndryl SSO': 'OIDC/SAML auth gating the dashboard and approval endpoints. Extracts role (L2/L3/admin) to check approval authority. Approver identity (name + employee ID) written to immutable audit log.'
    }
  },
  {
    id: 'output',
    icon: '✓',
    iconBg: '#EAF3DE',
    iconColor: '#3B6D11',
    title: 'Output',
    pills: [
      'ServiceNow REST (ITSM)',
      'OTel Traces (Audit)',
      'Prometheus Metrics',
      'Grafana Dashboard',
      'MS Teams Adaptive Card',
      'Problem Mgmt Feedback Loop'
    ],
    descriptions: {
      'ServiceNow REST (ITSM)': 'Every ticket MG-CRO creates contains: root cause CI, correlated alert count, blast radius, playbook used, dry-run result, execution outcome, resolution confirmation. Single parent ticket. Auto-closed on success. Direct team assignment on escalation.',
      'OTel Traces (Audit)': 'OpenTelemetry spans capture every agent node, tool call, Ansible job, and approval as an immutable trace. 15–20 nested spans per incident. Exported to Grafana Tempo. The compliance audit record.',
      'Prometheus Metrics': 'Exposes /metrics endpoint scraped by Prometheus. Key metrics: alert_intake_total, correlation_group_size, risk_distribution, dry_run_pass_rate, auto_resolution_rate, mttr_seconds_histogram. Powers the KPI Dashboard.',
      'Grafana Dashboard': 'Unified ops view connecting Prometheus (metrics), Tempo (traces), Loki (logs). Key panels: auto-resolution rate by alert family, MTTR trend, dry-run failure rate, Phase KPI scorecard. Used in client SLA reviews.',
      'MS Teams Adaptive Card': 'Rich interactive Teams message for Medium+ risk approval. Contains: alert summary, root cause, blast radius, playbook, dry-run result, estimated impact. Approve/Reject buttons POST to FastAPI /approve. LangGraph waits via checkpoint.',
      'Problem Mgmt Feedback Loop': 'Every resolved incident writes a learning record to ChromaDB. Human overrides captured as corrections. ML classifier retraining pipeline updated. Weaviate runbook queue updated. ITIL CSI loop closed — repeat failures reduce over time.'
    }
  }
];

// Render tech stack
const stackContainer = document.getElementById('stackLayers');

stackData.forEach((layer) => {
  const div = document.createElement('div');
  div.className = 'stack-layer reveal';
  div.innerHTML = `
    <div class="sl-header" onclick="toggleLayer(this)">
      <div class="sl-icon" style="background:${layer.iconBg};color:${layer.iconColor}">${layer.icon}</div>
      <div class="sl-title">${layer.title}</div>
      <div class="sl-count">${layer.pills.length} technologies</div>
      <div class="sl-chevron">▾</div>
    </div>
    <div class="sl-body">
      <div class="sl-pills">
        ${layer.pills.map(p => {
          const desc = layer.descriptions[p] || '';
          return `<div class="sl-pill" title="${desc}" style="cursor:help">${p}</div>`;
        }).join('')}
      </div>
      <div class="sl-descs" style="margin-top:1.25rem;display:flex;flex-direction:column;gap:.75rem">
        ${layer.pills.map(p => {
          const desc = layer.descriptions[p] || '';
          return `<div style="display:flex;gap:12px;align-items:flex-start">
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--accent);background:var(--accent-dim);padding:2px 8px;border-radius:4px;white-space:nowrap;flex-shrink:0;margin-top:2px">${p.split(' ')[0]}</span>
            <div>
              <div style="font-size:12px;font-weight:500;color:var(--text);margin-bottom:2px">${p}</div>
              <div style="font-size:12px;color:var(--text2);line-height:1.6">${desc}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  `;
  stackContainer.appendChild(div);
  observer.observe(div);
});

function toggleLayer(header) {
  const layer = header.parentElement;
  layer.classList.toggle('open');
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--accent)'
      : '';
  });
});
