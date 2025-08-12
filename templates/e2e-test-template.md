# E2E Test Template

> Purpose: Provide a consistent, high-quality structure for planning and executing end-to-end tests.

## Overview
- System/Feature under test:
- Primary user journey:
- Environments: [Dev | Staging | Prod]
- Test type: [Smoke | Regression | Happy-path | Critical-path]

## Preconditions
- Test data available: [Yes/No]
- User roles/permissions:
- Required integrations active (APIs, 3rd-party):
- Feature flags/toggles:

## Test Scenarios
Describe high-level scenarios to cover the end-to-end flow.

1. Scenario: [Happy path checkout]
   - Objective: [Ensure a user can purchase an item]
   - Preconditions: [User logged in, item in stock]
   - Success Criteria: [Order created, payment captured]

2. Scenario: [...]

## Detailed Steps (Example: Playwright)
```ts
import { test, expect } from '@playwright/test';

test.describe('Checkout E2E', () => {
  test('Happy path', async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
    await page.click('text=Sign in');
    await page.fill('#email', process.env.USER_EMAIL!);
    await page.fill('#password', process.env.USER_PASSWORD!);
    await page.click('text=Login');

    await page.click('[data-test="add-to-cart"]');
    await page.click('[data-test="cart"]');
    await page.click('[data-test="checkout"]');

    await expect(page.getByText('Thank you for your order')).toBeVisible();
  });
});
```

## Data and Fixtures
- Seed data script/location:
- Test users and roles:
- Mock/stub strategy (if any):

## Assertions
- UI assertions:
- API/DB side-effects:
- Analytics/telemetry events:

## Non-Functional Considerations
- Performance SLAs (TTFB, LCP):
- Accessibility checks:
- Cross-browser/device coverage:

## Risks and Mitigations
- Risk:
- Mitigation:

## References
- Related TRD: 
- Related tickets: 
