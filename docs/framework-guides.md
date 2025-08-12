# Framework-Specific Implementation Guides

This guide provides specific examples and best practices for implementing AI QA Tasks with popular testing frameworks and tech stacks.

## 🔧 Frontend Frameworks

### React + Jest + Testing Library

#### Setup Context for AI
```
Tech Stack Context:
- React 18 with TypeScript
- Jest + React Testing Library for component testing
- Cypress for E2E testing
- React Hook Form for form handling
- React Query for API state management
- Styled Components for styling

Testing Standards:
- 90% component test coverage
- Accessibility testing with jest-axe
- User interaction testing (not implementation details)
- Mock external dependencies
```

#### Component Testing Template
```javascript
// Use with @implement-test-task.md
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

import { UserRegistrationForm } from './UserRegistrationForm';
import { theme } from '../theme';

expect.extend(toHaveNoViolations);

const renderWithProviders = (component) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('UserRegistrationForm', () => {
  const mockOnSubmit = jest.fn();
  
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('should be accessible', async () => {
    const { container } = renderWithProviders(
      <UserRegistrationForm onSubmit={mockOnSubmit} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle form submission with valid data', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(<UserRegistrationForm onSubmit={mockOnSubmit} />);
    
    // Fill form fields
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'SecurePass123!');
    await user.type(screen.getByLabelText(/confirm password/i), 'SecurePass123!');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /register/i }));
    
    // Verify submission
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'SecurePass123!'
      });
    });
  });
});
```

### Vue 3 + Vitest + Vue Testing Library

#### Setup Context for AI
```
Tech Stack Context:
- Vue 3 with Composition API and TypeScript
- Vitest for unit testing
- Vue Testing Library for component testing
- Playwright for E2E testing
- Pinia for state management
- Vite for build tooling

Testing Standards:
- 85% component test coverage
- Test component behavior, not implementation
- Mock Pinia stores for isolated testing
- Test accessibility with @testing-library/jest-dom
```

#### Component Testing Template
```javascript
// Use with @implement-test-task.md
import { render, screen, fireEvent } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import { describe, it, expect, vi } from 'vitest';
import UserRegistration from './UserRegistration.vue';

describe('UserRegistration', () => {
  const renderComponent = (props = {}) => {
    return render(UserRegistration, {
      props,
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    });
  };

  it('should validate email format', async () => {
    renderComponent();
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /register/i });
    
    await fireEvent.update(emailInput, 'invalid-email');
    await fireEvent.click(submitButton);
    
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
  });
});
```

### Angular + Jasmine + Testing Library

#### Setup Context for AI
```
Tech Stack Context:
- Angular 16 with TypeScript
- Jasmine + Karma for unit testing
- Angular Testing Library for component testing
- Protractor/WebDriver for E2E testing
- NgRx for state management
- Angular Material for UI components

Testing Standards:
- 90% code coverage
- Test components in isolation with mocked dependencies
- Test reactive forms validation
- Test NgRx effects and reducers separately
```

## 🛠️ Backend Frameworks

### Node.js + Express + Jest + Supertest

#### Setup Context for AI
```
Tech Stack Context:
- Node.js 18 with TypeScript
- Express.js REST API
- PostgreSQL with TypeORM
- Jest + Supertest for testing
- JWT authentication
- Docker for containerization

Testing Standards:
- 85% API endpoint coverage
- Integration tests with test database
- Mock external services
- Test authentication and authorization
- Performance testing with autocannon
```

#### API Testing Template
```javascript
// Use with @implement-test-task.md
import request from 'supertest';
import { app } from '../app';
import { AppDataSource } from '../database/connection';
import { User } from '../entities/User';
import { generateTestToken } from '../utils/testHelpers';

describe('User Registration API', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(User).clear();
  });

  describe('POST /api/auth/register', () => {
    const validUserData = {
      email: 'test@example.com',
      password: 'SecurePass123!',
      firstName: 'John',
      lastName: 'Doe'
    };

    it('should register user with valid data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserData)
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(String),
        email: validUserData.email,
        firstName: validUserData.firstName,
        lastName: validUserData.lastName
      });
      expect(response.body).not.toHaveProperty('password');
    });

    it('should prevent duplicate email registration', async () => {
      // Create first user
      await request(app)
        .post('/api/auth/register')
        .send(validUserData)
        .expect(201);

      // Attempt to register with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUserData)
        .expect(409);

      expect(response.body.error).toContain('Email already exists');
    });
  });
});
```

### Python + FastAPI + Pytest

#### Setup Context for AI
```
Tech Stack Context:
- Python 3.11 with FastAPI
- SQLAlchemy ORM with PostgreSQL
- Pytest for testing
- Pydantic for data validation
- JWT authentication with python-jose
- Docker for containerization

Testing Standards:
- 90% test coverage
- Async test support with pytest-asyncio
- Database integration tests with test containers
- Mock external API calls
- Parameterized tests for input validation
```

#### API Testing Template
```python
# Use with @implement-test-task.md
import pytest
from httpx import AsyncClient
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.main import app
from app.database import get_db_session
from app.models.user import User
from tests.conftest import override_get_db, test_db_session

app.dependency_overrides[get_db_session] = override_get_db

@pytest.mark.asyncio
class TestUserRegistration:
    
    async def test_register_user_success(
        self, 
        async_client: AsyncClient, 
        test_db_session: AsyncSession
    ):
        user_data = {
            "email": "test@example.com",
            "password": "SecurePass123!",
            "first_name": "John",
            "last_name": "Doe"
        }
        
        response = await async_client.post("/api/auth/register", json=user_data)
        
        assert response.status_code == 201
        assert response.json()["email"] == user_data["email"]
        assert "password" not in response.json()
        
        # Verify user was created in database
        db_user = await test_db_session.get(User, response.json()["id"])
        assert db_user is not None
        assert db_user.email == user_data["email"]

    @pytest.mark.parametrize("invalid_email", [
        "invalid-email",
        "@domain.com",
        "user@",
        ""
    ])
    async def test_register_invalid_email(
        self, 
        async_client: AsyncClient, 
        invalid_email: str
    ):
        user_data = {
            "email": invalid_email,
            "password": "SecurePass123!",
            "first_name": "John",
            "last_name": "Doe"
        }
        
        response = await async_client.post("/api/auth/register", json=user_data)
        
        assert response.status_code == 422
        assert "email" in response.json()["detail"][0]["loc"]
```

## 📱 Mobile Testing

### React Native + Jest + Detox

#### Setup Context for AI
```
Tech Stack Context:
- React Native 0.72 with TypeScript
- Jest for unit testing
- Detox for E2E testing
- React Native Testing Library
- Redux Toolkit for state management
- Expo for development workflow

Testing Standards:
- 80% component test coverage
- E2E tests for critical user flows
- Test on iOS and Android simulators
- Mock native modules
- Accessibility testing with screen readers
```

### Flutter + Dart Test

#### Setup Context for AI
```
Tech Stack Context:
- Flutter 3.10 with Dart
- flutter_test for unit and widget testing
- integration_test for E2E testing
- Provider for state management
- Dio for HTTP requests

Testing Standards:
- 85% code coverage
- Widget tests for UI components
- Integration tests for user flows
- Mock HTTP requests
- Test on multiple screen sizes
```

## 🔄 Full-Stack Integration

### Next.js + Prisma + Playwright

#### Setup Context for AI
```
Tech Stack Context:
- Next.js 13 with App Router and TypeScript
- Prisma ORM with PostgreSQL
- NextAuth.js for authentication
- Jest for unit testing
- Playwright for E2E testing
- Tailwind CSS for styling

Testing Standards:
- 85% coverage for API routes and components
- Database integration tests with test containers
- E2E tests covering complete user journeys
- Visual regression testing
- Performance testing with Lighthouse CI
```

#### Full-Stack Testing Template
```javascript
// API Route Testing
// tests/api/auth/register.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/auth/register';
import { prismaMock } from '../../__mocks__/prisma';

jest.mock('../../../lib/prisma', () => ({
  __esModule: true,
  default: prismaMock,
}));

describe('/api/auth/register', () => {
  it('should register a new user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'SecurePass123!'
      },
    });

    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      createdAt: new Date(),
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toMatchObject({
      user: { id: '1', email: 'test@example.com' }
    });
  });
});

// E2E Testing with Playwright
// tests/e2e/registration.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Registration Flow', () => {
  test('should complete registration successfully', async ({ page }) => {
    await page.goto('/register');
    
    await page.fill('[data-testid="email-input"]', 'newuser@example.com');
    await page.fill('[data-testid="password-input"]', 'SecurePass123!');
    await page.fill('[data-testid="confirm-password-input"]', 'SecurePass123!');
    
    await page.click('[data-testid="register-button"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="welcome-message"]'))
      .toContainText('Welcome');
  });
});
```

## 🎯 Testing Strategy by Framework

### SPA Frameworks (React, Vue, Angular)
- **Unit Tests**: Components, hooks/composables, utilities
- **Integration Tests**: Component interactions, form submissions
- **E2E Tests**: Complete user flows, cross-browser compatibility
- **Accessibility Tests**: WCAG compliance, screen reader testing

### API Frameworks (Express, FastAPI, Django)
- **Unit Tests**: Business logic, utilities, middleware
- **Integration Tests**: Database operations, external API calls
- **API Tests**: Endpoint functionality, authentication, validation
- **Performance Tests**: Load testing, response times

### Full-Stack Frameworks (Next.js, Nuxt, SvelteKit)
- **Unit Tests**: API routes, server functions, components
- **Integration Tests**: Database operations, API integrations
- **E2E Tests**: Complete application flows
- **Performance Tests**: Core Web Vitals, SSR performance

## 💡 Framework-Specific AI Prompts

### For React Projects
```
When implementing React tests, focus on:
- Testing user behavior, not implementation details
- Using screen queries that match how users interact
- Testing accessibility with jest-axe
- Mocking external dependencies (APIs, modules)
- Testing error boundaries and loading states
```

### For API Projects
```
When implementing API tests, focus on:
- Testing all HTTP methods and status codes
- Validating request/response schemas
- Testing authentication and authorization
- Testing rate limiting and error handling
- Integration testing with real database
```

### For E2E Tests
```
When implementing E2E tests, focus on:
- Testing critical user journeys end-to-end
- Using data-testid attributes for reliable selectors
- Testing across multiple browsers and devices
- Including visual regression testing
- Testing performance and accessibility
```

## 🔍 Debugging Common Issues

### Flaky Tests
```javascript
// Use retry logic and better waits
await waitFor(() => {
  expect(screen.getByText('Expected text')).toBeInTheDocument();
}, { timeout: 5000 });

// Use deterministic test data
const testUser = {
  id: 'test-user-123',
  email: 'test@example.com',
  createdAt: new Date('2023-01-01T00:00:00Z')
};
```

### Slow Test Suites
```javascript
// Parallel test execution
// jest.config.js
module.exports = {
  maxWorkers: '50%',
  testTimeout: 10000,
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};

// Efficient test data cleanup
afterEach(async () => {
  await db.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
});
```

## 📚 Best Practices by Framework

1. **Always include framework context** when using AI QA Tasks
2. **Specify your testing tools and versions** for accurate code generation
3. **Include your quality standards** (coverage, performance, accessibility)
4. **Mention any constraints** (CI/CD, deployment, team skills)
5. **Use framework-specific patterns** provided in these guides
6. **Adapt generated code** to match your team's conventions

This guide ensures you get the most relevant and actionable testing guidance for your specific technology stack!