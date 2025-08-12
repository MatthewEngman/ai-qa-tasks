# Microservices Testing Example

> Patterns for validating a service in a distributed system.

## Target Service
- Service name:
- Dependencies: DB, Message bus, External APIs

## Contract Testing
- Provider states and example interactions
- Tool: Pact or Spring Cloud Contract
- CI gate: verify consumer contracts on PR

## Integration Testing
- Spin up dependencies via Docker Compose/Testcontainers
- Validate DB migrations and repo layer
- Verify message publish/consume semantics

## API Testing (Example: Supertest)
```ts
import request from 'supertest';
import { app } from '../src/app';

test('GET /health returns 200', async () => {
  await request(app).get('/health').expect(200);
});
```

## Messaging Testing (Example: Node + Testcontainers)
```ts
// Pseudo-code outline
// - Start Kafka/RabbitMQ container
// - Publish a message, assert consumer side-effects
```

## Resilience
- Timeouts, retries, circuit breakers
- Chaos experiments for dependency failure

## Observability
- Trace IDs propagated end-to-end
- Log/metric assertions during tests (e.g., span attr, error counts)

## Release Strategy
- Canary + shadow traffic
- Automated rollback conditions
