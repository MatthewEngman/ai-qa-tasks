# API Test Template

Use this template as a starting point for comprehensive API testing. Customize the sections based on your specific API requirements and testing framework.

## API Information

**API Name**: [API Name]  
**Base URL**: [https://api.example.com/v1]  
**Authentication**: [Bearer Token / API Key / OAuth2 / Basic Auth]  
**Documentation**: [Link to API documentation]  
**Version**: [v1.0]  

## Test Framework Setup

```javascript
// Example using Jest + Supertest
import request from 'supertest';
import { app } from '../app';

// Setup and teardown
beforeAll(async () => {
  // Database setup, authentication, etc.
});

afterAll(async () => {
  // Cleanup
});

beforeEach(async () => {
  // Test data setup
});

afterEach(async () => {
  // Test data cleanup
});
```

## Authentication Tests

### Test Valid Authentication
```javascript
describe('Authentication', () => {
  it('should authenticate with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'validPassword123'
      })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    expect(response.body.token).toBeTruthy();
  });

  it('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongPassword'
      })
      .expect(401);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Invalid credentials');
  });
});
```

## CRUD Operations Tests

### GET Requests
```javascript
describe('GET /api/[resource]', () => {
  it('should return all [resources] with valid authentication', async () => {
    const response = await request(app)
      .get('/api/[resource]')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('should return specific [resource] by id', async () => {
    const response = await request(app)
      .get(`/api/[resource]/${validResourceId}`)
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', validResourceId);
    expect(response.body).toHaveProperty('[required-field]');
  });

  it('should return 404 for non-existent [resource]', async () => {
    const response = await request(app)
      .get('/api/[resource]/999999')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(404);

    expect(response.body).toHaveProperty('error');
  });

  it('should return 401 without authentication', async () => {
    await request(app)
      .get('/api/[resource]')
      .expect(401);
  });
});
```

### POST Requests
```javascript
describe('POST /api/[resource]', () => {
  const validResourceData = {
    [field1]: '[valid-value]',
    [field2]: '[valid-value]',
    [field3]: '[valid-value]'
  };

  it('should create [resource] with valid data', async () => {
    const response = await request(app)
      .post('/api/[resource]')
      .set('Authorization', `Bearer ${validToken}`)
      .send(validResourceData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.[field1]).toBe(validResourceData.[field1]);
    expect(response.body).toHaveProperty('createdAt');
  });

  it('should return 400 for missing required fields', async () => {
    const invalidData = { [field1]: '[valid-value]' }; // Missing required fields

    const response = await request(app)
      .post('/api/[resource]')
      .set('Authorization', `Bearer ${validToken}`)
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toContain('[required-field] is required');
  });

  it('should return 400 for invalid data types', async () => {
    const invalidData = {
      ...validResourceData,
      [numberField]: 'not-a-number'
    };

    const response = await request(app)
      .post('/api/[resource]')
      .set('Authorization', `Bearer ${validToken}`)
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('errors');
  });
});
```

### PUT/PATCH Requests
```javascript
describe('PUT /api/[resource]/:id', () => {
  let resourceId;

  beforeEach(async () => {
    // Create a resource to update
    const createResponse = await request(app)
      .post('/api/[resource]')
      .set('Authorization', `Bearer ${validToken}`)
      .send(validResourceData);
    resourceId = createResponse.body.id;
  });

  it('should update [resource] with valid data', async () => {
    const updateData = {
      [field1]: '[updated-value]',
      [field2]: '[updated-value]'
    };

    const response = await request(app)
      .put(`/api/[resource]/${resourceId}`)
      .set('Authorization', `Bearer ${validToken}`)
      .send(updateData)
      .expect(200);

    expect(response.body.[field1]).toBe(updateData.[field1]);
    expect(response.body).toHaveProperty('updatedAt');
  });

  it('should return 404 for non-existent [resource]', async () => {
    await request(app)
      .put('/api/[resource]/999999')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ [field1]: '[value]' })
      .expect(404);
  });
});
```

### DELETE Requests
```javascript
describe('DELETE /api/[resource]/:id', () => {
  let resourceId;

  beforeEach(async () => {
    // Create a resource to delete
    const createResponse = await request(app)
      .post('/api/[resource]')
      .set('Authorization', `Bearer ${validToken}`)
      .send(validResourceData);
    resourceId = createResponse.body.id;
  });

  it('should delete [resource] successfully', async () => {
    await request(app)
      .delete(`/api/[resource]/${resourceId}`)
      .set('Authorization', `Bearer ${validToken}`)
      .expect(204);

    // Verify resource is deleted
    await request(app)
      .get(`/api/[resource]/${resourceId}`)
      .set('Authorization', `Bearer ${validToken}`)
      .expect(404);
  });

  it('should return 404 for non-existent [resource]', async () => {
    await request(app)
      .delete('/api/[resource]/999999')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(404);
  });
});
```

## Data Validation Tests

### Input Validation
```javascript
describe('Input Validation', () => {
  const testCases = [
    {
      description: 'should reject empty [field]',
      data: { ...validResourceData, [field]: '' },
      expectedError: '[field] cannot be empty'
    },
    {
      description: 'should reject [field] that is too long',
      data: { ...validResourceData, [field]: 'a'.repeat(256) },
      expectedError: '[field] must be less than 255 characters'
    },
    {
      description: 'should reject invalid email format',
      data: { ...validResourceData, email: 'invalid-email' },
      expectedError: 'Invalid email format'
    },
    {
      description: 'should reject negative numbers',
      data: { ...validResourceData, [numberField]: -1 },
      expectedError: '[numberField] must be positive'
    }
  ];

  testCases.forEach(({ description, data, expectedError }) => {
    it(description, async () => {
      const response = await request(app)
        .post('/api/[resource]')
        .set('Authorization', `Bearer ${validToken}`)
        .send(data)
        .expect(400);

      expect(response.body.errors).toContain(expectedError);
    });
  });
});
```

## Error Handling Tests

### HTTP Status Codes
```javascript
describe('Error Handling', () => {
  it('should return 500 for server errors', async () => {
    // Mock a server error condition
    jest.spyOn(DatabaseService, 'find').mockRejectedValue(new Error('Database connection failed'));

    const response = await request(app)
      .get('/api/[resource]')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(500);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Internal server error');
  });

  it('should return 403 for insufficient permissions', async () => {
    const response = await request(app)
      .delete(`/api/[resource]/${resourceId}`)
      .set('Authorization', `Bearer ${readOnlyToken}`)
      .expect(403);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Insufficient permissions');
  });
});
```

## Performance Tests

### Response Time Tests
```javascript
describe('Performance', () => {
  it('should respond within acceptable time limits', async () => {
    const startTime = Date.now();
    
    await request(app)
      .get('/api/[resource]')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200);
    
    const responseTime = Date.now() - startTime;
    expect(responseTime).toBeLessThan(500); // 500ms threshold
  });

  it('should handle concurrent requests', async () => {
    const requests = Array.from({ length: 10 }, () =>
      request(app)
        .get('/api/[resource]')
        .set('Authorization', `Bearer ${validToken}`)
    );

    const responses = await Promise.all(requests);
    
    responses.forEach(response => {
      expect(response.status).toBe(200);
    });
  });
});
```

## Security Tests

### SQL Injection Prevention
```javascript
describe('Security', () => {
  it('should prevent SQL injection in query parameters', async () => {
    const maliciousQuery = "1'; DROP TABLE users; --";
    
    const response = await request(app)
      .get(`/api/[resource]?id=${encodeURIComponent(maliciousQuery)}`)
      .set('Authorization', `Bearer ${validToken}`)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('should prevent XSS in input fields', async () => {
    const xssPayload = '<script>alert("xss")</script>';
    
    const response = await request(app)
      .post('/api/[resource]')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ ...validResourceData, [textField]: xssPayload })
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });
});
```

## Rate Limiting Tests

```javascript
describe('Rate Limiting', () => {
  it('should enforce rate limits', async () => {
    const requests = Array.from({ length: 101 }, () =>
      request(app)
        .get('/api/[resource]')
        .set('Authorization', `Bearer ${validToken}`)
    );

    const responses = await Promise.allSettled(requests);
    
    const rateLimitedResponses = responses.filter(
      result => result.status === 'fulfilled' && result.value.status === 429
    );
    
    expect(rateLimitedResponses.length).toBeGreaterThan(0);
  });
});
```

## Pagination Tests

```javascript
describe('Pagination', () => {
  it('should return paginated results', async () => {
    const response = await request(app)
      .get('/api/[resource]?page=1&limit=10')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('pagination');
    expect(response.body.pagination).toHaveProperty('page', 1);
    expect(response.body.pagination).toHaveProperty('limit', 10);
    expect(response.body.data.length).toBeLessThanOrEqual(10);
  });

  it('should handle invalid pagination parameters', async () => {
    const response = await request(app)
      .get('/api/[resource]?page=-1&limit=0')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });
});
```

## Test Data Utilities

```javascript
// Utility functions for test data management
export const TestDataFactory = {
  create[Resource]: (overrides = {}) => ({
    [field1]: '[default-value]',
    [field2]: '[default-value]',
    [field3]: '[default-value]',
    ...overrides
  }),

  createMultiple[Resources]: (count, overrides = {}) => 
    Array.from({ length: count }, (_, index) => 
      TestDataFactory.create[Resource]({ 
        [field1]: `[value]-${index}`,
        ...overrides 
      })
    ),

  createInvalid[Resource]: (invalidField) => {
    const data = TestDataFactory.create[Resource]();
    switch (invalidField) {
      case '[field1]':
        data.[field1] = null;
        break;
      case '[field2]':
        data.[field2] = '';
        break;
      default:
        delete data.[invalidField];
    }
    return data;
  }
};
```

## Usage Instructions

1. **Replace Placeholders**: Update all `[resource]`, `[field]`, and `[value]` placeholders with your actual API details
2. **Customize Authentication**: Adapt the authentication setup to match your API's auth method
3. **Add Specific Validations**: Include any business-specific validation rules
4. **Configure Test Environment**: Set up test database and external service mocks
5. **Add Performance Thresholds**: Set appropriate response time and load expectations
6. **Include Security Tests**: Add tests specific to your security requirements

This template provides a comprehensive foundation for API testing that can be adapted to any REST API testing scenario.