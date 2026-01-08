---
name: prisma-schema-generator
description: Design and generate Prisma schemas with relations, indexes, and migration scripts.
version: 1.5.0
author: Agency Core Team
tags:
  - prisma
  - database
  - orm
  - postgresql
installCommand: npx contexta install prisma-schema-generator
---

# Prisma Schema Generator

Generate Prisma schemas with proper relations, indexes, and optimizations.

## Features

- **Entity Modeling** - Define models with proper relations
- **Index Optimization** - Automatic index suggestions
- **Migration Generation** - Prisma migrate commands
- **Seed Data** - Generate seed scripts for development
- **Type Safety** - Full TypeScript integration

## Usage

```
Create a blog schema with User, Post, and Comment models with proper relations
```

## Example Output

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  comments  Comment[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
}

model Post {
  id        String    @id @default(cuid())
  title     String
  content   String?
  published Boolean   @default(false)
  author    User      @relation(fields: [authorId], references: [id])
  authorId  String
  comments  Comment[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  @@index([authorId])
  @@index([published, createdAt])
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId    String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())

  @@index([postId])
  @@index([authorId])
}
```

## Best Practices Applied

- CUID for distributed-safe IDs
- Proper cascade delete rules
- Optimized indexes for common queries
- Timestamps on all models
