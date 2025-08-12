# Troubleshooting Guide

> Common issues and quick fixes when running tests or CI.

## CI Failures
- Markdown lint errors: run `markdownlint "**/*.md"` locally; see `.markdownlint.json` if present
- Broken links: re-run locally with `markdown-link-check`; add exceptions to `.github/markdown-link-check-config.json`
- Spell check: update `.github/typos.toml` or use dictionary overrides

## E2E Flakiness
- Use `data-test` selectors
- Wait for network idle or specific events
- Debounce animations and toasts in assertions

## API Test Issues
- Ensure env vars are set (`BASE_URL`, tokens)
- Reset DB between runs; use isolated tenants

## Performance Test Hiccups
- Validate environment parity with prod (TLS, caches)
- Warm up before measuring

## Local Setup
- Node version mismatch: use `.nvmrc` / setup-node action
- Missing Docker: install and ensure it’s running for integration tests

## Getting Help
- Open an issue with logs and minimal repro
- Tag maintainers and include environment details
