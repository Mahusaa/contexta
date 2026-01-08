---
name: jest-test-writer
description: Generate comprehensive Jest test suites with mocking, coverage, and snapshot testing.
version: 2.3.0
author: Agency Core Team
tags:
  - jest
  - testing
  - mocking
  - coverage
installCommand: npx contexta install jest-test-writer
---

# Jest Test Writer

Generate comprehensive test suites with proper mocking and coverage.

## Features

- **Unit Test Generation** - Tests for functions, classes, components
- **Mock Factory** - Auto-generate mocks for dependencies
- **Snapshot Testing** - Component snapshot tests
- **Coverage Targets** - Aim for 80%+ coverage
- **Test Organization** - Proper describe/it structure

## Usage

```
Write tests for the UserService class including createUser, getUser, and updateUser methods
```

## Example Output

```typescript
import { UserService } from './user.service';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      const userData = { email: 'test@example.com', name: 'Test User' };
      const expectedUser = { id: '1', ...userData };
      
      (prisma.user.create as jest.Mock).mockResolvedValue(expectedUser);

      const result = await service.createUser(userData);

      expect(prisma.user.create).toHaveBeenCalledWith({ data: userData });
      expect(result).toEqual(expectedUser);
    });

    it('should throw on invalid email', async () => {
      const userData = { email: 'invalid', name: 'Test' };

      await expect(service.createUser(userData)).rejects.toThrow('Invalid email');
    });
  });

  describe('getUser', () => {
    it('should return user by id', async () => {
      const user = { id: '1', email: 'test@example.com' };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

      const result = await service.getUser('1');

      expect(result).toEqual(user);
    });

    it('should return null for non-existent user', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.getUser('999');

      expect(result).toBeNull();
    });
  });
});
```

## Testing Patterns

- **Arrange-Act-Assert** structure
- **Isolation** - Each test is independent
- **Descriptive names** - Tests as documentation
- **Edge cases** - Error paths and boundaries
