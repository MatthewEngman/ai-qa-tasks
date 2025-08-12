# Performance Test Template

> Purpose: Define clear, repeatable performance testing plans and SLAs.

## Scope

- System/Feature under test:
- User journeys of interest:
- Workload model: [Open | Closed]
- Target environment: [Dev | Staging | Prod]

## Objectives and SLAs

- Response time (P50/P95/P99):
- Throughput (RPS/Users):
- Error rate (%):
- Resource utilization (CPU/RAM):

## Test Types

- Smoke/Baseline
- Load (steady)
- Stress (find breaking point)
- Spike (sudden bursts)
- Soak (long duration)

## Tools

- Suggested: k6, JMeter, Gatling, Locust
- Script repo/path:

## Data and Variability

- Input data distributions:
- Cache warm-up strategy:
- Test data lifecycle/cleanup:

## Scenarios (Example: k6)

```js
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 50 },
    { duration: '3m', target: 50 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<400'],
  },
};

export default function () {
  http.get(`${__ENV.BASE_URL}/health`);
  sleep(1);
}
```

## Metrics and Observability

- App metrics to capture:
- Infra metrics to capture:
- Traces/logs dashboards:

## Risks and Mitigations

- Bottleneck candidates:
- Rollback/abort criteria:

## Reporting

- Summary table with SLAs vs actuals
- Graphs of latency percentiles, throughput, errors
- Recommendations and follow-ups
