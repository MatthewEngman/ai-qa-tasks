# Testing Best Practices

> Practical standards for durable, scalable test suites.

## Principles
- Test the contract, not the implementation
- Prefer deterministic tests; isolate flakiness sources
- Shift-left: unit/contract tests catch most issues cheaply
- Make failures actionable: clear messages, artifacts, logs

## Structure
- Co-locate tests with code for unit/component
- Dedicated `tests/` for integration/e2e
- Use test IDs in UI to avoid brittle selectors

## Data
- Seed minimal fixtures; avoid global shared state
- Generate test data with factories/builders
- Clean up after tests; idempotent setups

## CI
- Run fast checks on PR (lint, unit)
- Gate merges on reliability metrics, not just pass/fail
- Parallelize suites; cache dependencies

## Flakiness
- Stabilize waits with events, not sleeps
- Mock only at clear boundaries; avoid over-mocking
- Record and quarantine flaky tests until fixed

## Security and Privacy
- Never commit secrets; use CI secrets
- Mask PII in logs and test artifacts

## Documentation
- Keep templates current; link examples from README
- Add troubleshooting tips near failing areas
