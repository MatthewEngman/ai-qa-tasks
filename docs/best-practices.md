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

## Commit Standards for Test Code

### Conventional Commit Format
Use structured commit messages that provide context and traceability:

```bash
test(scope): brief description

- Detailed change 1
- Detailed change 2
- Coverage/metrics information
- Task or requirement reference
```

### Commit Types for Test Code
- `test(scope)`: New test implementation
- `refactor(test)`: Test code refactoring without changing behavior
- `fix(test)`: Fixing broken or flaky tests
- `chore(test)`: Test infrastructure, configuration, or tooling updates
- `docs(test)`: Test documentation updates

### Scope Examples
- `test(auth)`: Authentication tests
- `test(api)`: API tests
- `test(e2e)`: End-to-end tests
- `test(perf)`: Performance tests
- `test(security)`: Security tests
- `test(a11y)`: Accessibility tests

### Quality Gates Before Commit
1. **Run full test suite**: Ensure no regressions (`npm test`, `pytest`, etc.)
2. **Verify coverage**: Check coverage meets project thresholds
3. **Run linters**: Execute code quality checks (`npm run lint`, `pylint`, etc.)
4. **Clean up**: Remove debug code, commented sections, `.only()`, `.skip()`
5. **Stage selectively**: Only stage test-related files
6. **Commit with context**: Use conventional format with detailed body

### Example Commits

**Unit Tests:**
```bash
git commit -m "test(checkout): add unit tests for cart calculation" \
  -m "- Tests price calculation with discounts and taxes" \
  -m "- Tests quantity validation and limits" \
  -m "- Achieves 92% line coverage, 88% branch coverage" \
  -m "- Implements UNIT-H-003 from test strategy"
```

**Integration Tests:**
```bash
git commit -m "test(payment): add integration tests for payment gateway" \
  -m "- Tests successful payment processing flow" \
  -m "- Tests payment failure and retry logic" \
  -m "- Uses Testcontainers for database isolation" \
  -m "- Implements INT-C-006 from test strategy"
```

**E2E Tests:**
```bash
git commit -m "test(e2e): add user registration flow tests" \
  -m "- Tests complete registration with email verification" \
  -m "- Tests form validation and error messages" \
  -m "- Uses Playwright with Page Object Model" \
  -m "- Implements E2E-C-002 from test strategy"
```

**Test Fixes:**
```bash
git commit -m "fix(test): resolve flaky authentication test" \
  -m "- Replace sleep with proper event waiting" \
  -m "- Add retry logic for network requests" \
  -m "- Fixes intermittent failures in CI"
```

### Pre-Push Checklist
- [ ] All tests pass locally
- [ ] Coverage thresholds met
- [ ] Linters pass
- [ ] Debug code removed
- [ ] Commit message follows convention
- [ ] Changes rebased on latest main/develop
