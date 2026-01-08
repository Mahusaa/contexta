---
name: code-review
description: Comprehensive code review workflow for pull requests.
estimatedTime: 30-60 minutes
difficulty: beginner
---

# Code Review Workflow

Systematic approach to reviewing pull requests for quality and correctness.

## Prerequisites

- PR is ready for review (not draft)
- CI checks are passing
- PR description is complete

## Steps

### 1. Context Review
**Time: 5 minutes**

Understand what the PR aims to achieve:
- Read the PR description
- Check linked issues/tickets
- Understand the scope of changes

### 2. Automated Analysis
**Time: 5 minutes**

Use **@code-reviewer** for initial analysis:

```
@code-reviewer Analyze this PR for:
1. Potential bugs or logic errors
2. Security vulnerabilities
3. Performance concerns
4. Code style issues
```

### 3. File-by-File Review
**Time: 15-30 minutes**

Review each file focusing on:

**Logic & Correctness**
- Does the code do what it's supposed to?
- Are edge cases handled?
- Are error cases handled properly?

**Security**
- Input validation present?
- SQL injection prevention?
- XSS prevention in frontend code?
- Sensitive data exposure?

**Performance**
- N+1 query problems?
- Unnecessary re-renders?
- Large bundle imports?

**Maintainability**
- Code is readable and clear?
- Functions are appropriately sized?
- Good naming conventions?

### 4. Testing Review
**Time: 5-10 minutes**

Check test quality:
- Tests cover new functionality
- Tests cover error cases
- Tests are deterministic
- Mocking is appropriate

### 5. Write Feedback
**Time: 10 minutes**

Structure your feedback:

```markdown
## Summary
[Overall assessment]

## Critical (Must Fix)
- [Issue 1]
- [Issue 2]

## Suggestions
- [Nice to have 1]
- [Nice to have 2]

## Praise
- [Good practice observed]
```

### 6. Follow Up
**Time: As needed**

- Respond to author questions
- Re-review after fixes
- Approve when ready

## Review Checklist

- [ ] Code is correct and complete
- [ ] Tests are adequate
- [ ] No security vulnerabilities
- [ ] Performance is acceptable
- [ ] Code style is consistent
- [ ] Documentation is updated
