---
name: api-route-builder
description: Scaffold Next.js API routes with validation, error handling, and proper TypeScript types.
version: 2.0.1
author: Agency Core Team
tags:
  - nextjs
  - api
  - typescript
  - validation
installCommand: npx contexta install api-route-builder
---

# API Route Builder

Create Next.js API routes with built-in validation using Zod.

## Features

- **Request Validation** - Zod schema validation for body, query, params
- **Type-safe Responses** - Typed API responses with proper status codes
- **Error Handling** - Standardized error response format
- **Rate Limiting** - Optional rate limiting middleware
- **Authentication** - JWT/session validation helpers

## Usage

```
Create a POST /api/users endpoint that creates a new user with email and password validation
```

## Example Output

```typescript
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreateUserSchema.parse(body);
    
    const user = await createUser(validated);
    
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Configuration

Supports customization via `.contexta/api-route.json`:

```json
{
  "validation": "zod",
  "errorFormat": "standard",
  "rateLimit": {
    "enabled": true,
    "requests": 100,
    "window": "1m"
  }
}
```
