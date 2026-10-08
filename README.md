# AI-Powered Quality Engineering Platform

## What is this?

This project is an **AI-assisted Quality Engineering platform** that brings together test automation, API testing, security, performance, accessibility, and AI into one quality workflow.

The idea is simple:

> **Instead of only running tests, the platform collects quality signals from different testing tools, analyzes the results, and uses AI to help the QA/SDET team understand what went wrong, what is risky, and what should be investigated next.**

I built this project to demonstrate how a modern **SDET / Quality Engineer** can use AI to improve the software testing lifecycle without replacing traditional automation and engineering practices.

---

## Why I Built This

Modern QA is no longer only about writing UI test scripts.

A Quality Engineer may need to work with:

- UI and API automation
- CI/CD pipelines
- Security testing
- Performance testing
- Accessibility
- Failure investigation
- Test reliability
- Quality metrics
- AI-assisted testing

This project brings these areas together into a single workflow and demonstrates how they can work together in a realistic engineering environment.

---

## How It Works

The platform follows a simplified software quality lifecycle:

```text
Requirement
    ↓
AI Requirement Analysis
    ↓
AI Test Planning
    ↓
Human Review
    ↓
Test Automation
    ↓
CI/CD
    ↓
Test Results
    ↓
Quality Engine
    ↓
Security + Performance + Accessibility
    ↓
AI Quality Analysis
    ↓
Quality Dashboard
    ↓
Release Decision Support
```

The important part is that **AI is not treated as the source of truth**.

Testing tools produce the actual evidence. The Quality Engine organizes that evidence, and AI helps interpret it.

---

## What the Platform Can Do

### Test Automation

- Web automation using Playwright and TypeScript
- API automation
- Authentication testing
- Product, search, cart, and checkout scenarios
- Cross-browser testing
- Functional and regression testing

### Quality Engineering

- Test result aggregation
- Quality scoring
- Quality gates
- Reliability analysis
- Failure analysis
- Risk analysis
- Quality intelligence

### AI-Assisted Testing

AI is used to assist with:

- Requirement analysis
- Test planning
- Test generation
- Failure investigation
- Quality analysis
- Recommended next actions

The project uses a local **Qwen3 model through Ollama**.

### Security

- OWASP ZAP
- Semgrep

Security findings are included in the overall quality assessment instead of being treated as a completely separate activity.

### Performance

- k6 performance testing
- API response and failure monitoring
- Basic load validation

### Accessibility

- axe-core accessibility testing
- Accessibility findings included in quality analysis

### Workflow Automation

- n8n orchestration
- MCP-based tool integration
- GitHub Actions CI/CD

---

## AI + Quality Engineering

One of the main ideas behind this project is the separation between **evidence and AI reasoning**.

```text
Playwright / API / ZAP / Semgrep / k6 / axe
                    ↓
             Quality Engine
                    ↓
                MCP Tools
                    ↓
             n8n Workflow
                    ↓
             AI Analysis
                    ↓
       Quality Insights & Actions
```

For example, if a security scan reports warning-level findings and an accessibility scan detects a critical violation, the platform can provide those results to the AI.

The AI can then summarize the situation and recommend what the team should investigate.

This makes AI a **decision-support tool for the QA team**, rather than allowing AI to invent test results or make unsupported release decisions.

---

## MCP Integration

The project includes an MCP HTTP server that exposes Quality Engineering capabilities as controlled tools.

The current tools include:

- `get_quality_snapshot`
- `get_quality_risks`
- `get_quality_intelligence`
- `get_quality_area`
- `analyze_quality`

This allows tools such as n8n to retrieve structured quality information without directly depending on the internal implementation of the Quality Engine.

---

## n8n Workflow

The n8n workflow demonstrates how the different components can be connected into an automated quality workflow.

```text
Webhook
   ↓
Get Quality Snapshot
   ↓
Get Quality Risks
   ↓
Get Quality Intelligence
   ↓
Prepare Quality Context
   ↓
AI Analysis
   ↓
Quality Recommendation
```

This demonstrates the practical use of **AI + MCP + workflow orchestration** in a QA/SDET workflow.

---

## Example Quality Result

The project has been tested against **OWASP Juice Shop**.

One representative quality snapshot contained:

| Quality Area  | Result  |
| ------------- | ------- |
| Automation    | Passed  |
| Security      | Warning |
| Performance   | Passed  |
| Accessibility | Failed  |

The test environment identified:

- 8 warning-level OWASP ZAP findings
- 1 critical accessibility violation from axe-core
- 0% performance request failures in the tested k6 scenario

The AI then converted these results into a short summary, identified the key risk, and suggested remediation actions.

These are **demonstration results from the test environment**, not universal production release thresholds.

---

## Technology Stack

| Area             | Technology                         |
| ---------------- | ---------------------------------- |
| Language         | TypeScript                         |
| Runtime          | Node.js 20                         |
| UI Automation    | Playwright                         |
| API Testing      | Playwright API                     |
| AI Model         | Qwen3                              |
| Local AI Runtime | Ollama                             |
| AI Framework     | LangChain                          |
| AI Evaluation    | Promptfoo                          |
| Workflow         | n8n                                |
| Tool Integration | MCP                                |
| Quality Engine   | TypeScript / Node.js               |
| Dashboard        | Next.js                            |
| Database         | PostgreSQL                         |
| Performance      | k6                                 |
| Security         | OWASP ZAP, Semgrep                 |
| Accessibility    | axe-core                           |
| CI/CD            | GitHub Actions                     |
| Containers       | Docker                             |
| Reporting        | Playwright HTML, JSON, Allure      |
| Visual Testing   | Playwright Visual, Applitools Eyes |

---

## Application Under Test

The platform uses **OWASP Juice Shop** as the demonstration application.

Rather than creating hundreds of repetitive tests, the project focuses on a smaller set of meaningful scenarios covering important user and API flows.

Examples include:

- Login and authentication
- Product search
- Product details
- Cart
- Checkout
- API flows
- Accessibility
- Security
- Performance

---

## AI Guardrails

AI is intentionally controlled within the platform.

The system follows these principles:

- AI works from available test evidence.
- AI must not invent test results or measurements.
- AI should clearly state when evidence is insufficient.
- AI cannot remove test assertions.
- AI cannot change expected application behavior.
- AI cannot hide or skip failures.
- AI does not independently approve a release.
- Deterministic testing tools remain the source of quality evidence.
- Human review remains part of important quality decisions.

---

## Project Structure

```text
ai-quality-engineering-platform/
│
├── ai-engine/
├── automation/
│   ├── api/
│   ├── performance/
│   └── web/
│
├── dashboard/
├── docs/
├── mcp/
├── quality-engine/
├── .github/
│   └── workflows/
│
├── ARCHITECTURE.md
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Running the Project

### Prerequisites

- Node.js 20+
- npm
- Docker
- Ollama
- Git

### Install dependencies

```bash
npm install
```

### Start OWASP Juice Shop

```bash
docker run -d --name juice-shop -p 3000:3000 bkimminich/juice-shop:latest
```

### Start the Quality Engine

```bash
npx.cmd tsx quality-engine/api/server.ts
```

### Start the MCP server

```bash
npx.cmd tsx mcp/http-server.ts
```

### Validate TypeScript

```bash
npx.cmd tsc --noEmit
```

### Run Playwright tests

```bash
npx.cmd playwright test
```

---

## What This Project Demonstrates

This project demonstrates practical experience across the modern Quality Engineering lifecycle:

**SDET → Test Automation → API Testing → CI/CD → Security → Performance → Accessibility → AI → MCP → Workflow Automation → Quality Intelligence**

The main focus is not simply using AI to generate test scripts.

The goal is to demonstrate how **AI can be safely integrated into the broader QA engineering lifecycle to help engineers analyze quality information and make better decisions.**

---

## Project Status

The core platform has been implemented and integrated across the major Quality Engineering areas.

The project is designed as a **practical SDET / Quality Engineering demonstration project**, using OWASP Juice Shop as the application under test.

It is not intended to represent a production deployment of OWASP Juice Shop itself.
