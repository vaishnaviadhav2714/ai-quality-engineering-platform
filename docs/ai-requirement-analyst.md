# AI Requirement Analyst

## Purpose

The AI Requirement Analyst analyzes software requirements from a quality engineering perspective.

It identifies:

- Functional requirements
- Edge cases
- Potential risks
- Missing or unclear requirements

The goal is to help QA engineers understand a requirement before test planning and automation begin.

## Architecture

The Requirement Analyst follows this flow:

Requirement
↓
Requirement Analyst
↓
AI Provider
↓
Ollama / qwen3:1.7b
↓
JSON Parsing
↓
Zod Validation
↓
Structured Requirement Analysis

If the AI provider fails or returns invalid output:

Requirement
↓
AI Provider Failure
↓
Deterministic Fallback
↓
Safe Requirement Analysis Result

## AI Provider Abstraction

The Requirement Analyst does not directly depend on Ollama.

It depends on the `AIProvider` interface.

This allows the AI provider to be replaced later without changing the Requirement Analyst logic.

Example:

```text
RequirementAnalyst
       ↓
   AIProvider
       ↓
 ┌───────────────┐
 │ Ollama        │
 │ Future API    │
 │ Other Model   │
 └───────────────┘
```
