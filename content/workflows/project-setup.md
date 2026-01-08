---
name: project-setup
description: Initialize a new project with proper structure, tooling, and configuration.
estimatedTime: 1-2 hours
difficulty: beginner
---

# Project Setup Workflow

Set up a new project with consistent tooling and best practices.

## Prerequisites

- Project requirements defined
- Tech stack decided
- Repository created

## Steps

### 1. Initialize Project
**Time: 10 minutes**

For Next.js:
```bash
npx create-next-app@latest ./
# Options: TypeScript, ESLint, Tailwind, App Router
```

For other frameworks, use appropriate CLI.

### 2. Configure Tooling
**Time: 15 minutes**

**ESLint & Prettier**
```bash
npm install -D prettier eslint-config-prettier
```

Create `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

**Husky & lint-staged**
```bash
npm install -D husky lint-staged
npx husky init
```

### 3. Set Up Testing
**Time: 15 minutes**

Use **@test-engineer** agent:

```
@test-engineer Set up Jest with React Testing Library for a Next.js project
```

Configure:
- Jest configuration
- Test utilities
- Mock setup

### 4. Database Setup
**Time: 15 minutes**

If using Prisma:
```bash
npm install prisma @prisma/client
npx prisma init
```

Use **prisma-schema-generator** skill for initial schema.

### 5. Environment Configuration
**Time: 10 minutes**

Create `.env.example`:
```env
DATABASE_URL=
NEXT_PUBLIC_API_URL=
JWT_SECRET=
```

Set up:
- [ ] Local `.env` file
- [ ] CI/CD environment variables
- [ ] Staging/production environments

### 6. CI/CD Pipeline
**Time: 20 minutes**

Use **@devops-engineer** agent:

```
@devops-engineer Create a GitHub Actions workflow for:
- Linting on PR
- Tests on PR
- Preview deployment
- Production deployment on main
```

### 7. Documentation
**Time: 15 minutes**

Create:
- [ ] README.md with setup instructions
- [ ] CONTRIBUTING.md for team guidelines
- [ ] Architecture decision records (ADR)

### 8. First Commit
**Time: 5 minutes**

```bash
git add .
git commit -m "Initial project setup"
git push origin main
```

## Project Checklist

- [ ] Framework initialized
- [ ] TypeScript configured
- [ ] Linting and formatting set up
- [ ] Pre-commit hooks working
- [ ] Testing framework ready
- [ ] Database configured
- [ ] Environment variables documented
- [ ] CI/CD pipeline active
- [ ] README is helpful
