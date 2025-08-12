# Sample Test Strategy

> A concise strategy for testing a new web feature end-to-end.

## Context
- Feature: Checkout flow v2
- Risks: Payment gateway errors, cart state inconsistencies
- Constraints: Release in 2 weeks, limited staging data

## Test Scope
- In scope: Web UI, payment API, order service
- Out of scope: Mobile app, legacy coupons

## Approach
- Unit: Component logic with Jest/Vitest
- API: Contract tests with Pact + integration tests (Supertest)
- E2E: Critical-path journeys with Playwright
- Non-functional: Performance smoke with k6, accessibility with axe

## Test Levels and Ownership
- Unit: Devs (CI required)
- API: Devs/QE (PR and nightly)
- E2E: QE (smoke on PR, full suite nightly)

## Environments
- Dev: branch deployments
- Staging: nightly full tests
- Prod: canary + synthetic checks

## Tooling
- CI: GitHub Actions
- Reporting: Allure or HTML reports
- Observability: Logs + traces correlated with test runs

## Entry/Exit Criteria
- Entry: Feature behind flag, stable APIs
- Exit: P95 latency < 400ms, <1% test flakiness over 3 runs, zero Sev1 bugs

## Test Data
- Synthetic user pool, seeded orders
- Mock payment sandbox accounts

## Risks and Mitigations
- Flaky E2E: use test IDs, network mocking where safe
- Data coupling: isolated tenants per run

## References
- TRD: `examples/sample-trd-example.md`
