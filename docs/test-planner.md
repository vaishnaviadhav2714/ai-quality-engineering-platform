# AI Test Planner

## Purpose

The AI Test Planner converts analyzed software requirements into a structured test plan.

It uses the requirement analysis produced by the Requirement Analyst and sends that information to an AI provider.

The current provider is Ollama running the local `qwen3:1.7b` model.

## Workflow

```text
Requirement
    ↓
Requirement Analyst
    ↓
Requirement Analysis
    ↓
Test Planner
    ↓
AI Provider
    ↓
Structured JSON
    ↓
Zod Validation
    ↓
Human Review
    ↓
Approved Test Plan
```
