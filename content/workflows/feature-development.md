---
name: feature-development
description: End-to-end workflow for developing new features from planning to deployment.
estimatedTime: 2-4 hours
difficulty: intermediate
---

# Feature Development Workflow

Complete workflow for implementing a new feature from requirements to deployment.

## Prerequisites

- Feature requirements documented
- Design mockups (if UI feature)
- Branch created from main

## Steps

### 1. Requirements Analysis
**Time: 15-30 minutes**

Use the **@code-reviewer** agent to analyze requirements:

```
@code-reviewer Review the feature requirements and identify potential edge cases, security concerns, and technical constraints.
```

Checklist:
- [ ] Requirements are clear and testable
- [ ] Edge cases identified
- [ ] Security implications reviewed
- [ ] Performance requirements defined

### 2. Technical Design
**Time: 30-60 minutes**

Create a brief technical design:
- Data model changes
- API endpoints needed
- Component structure
- State management approach

### 3. Implementation
**Time: 1-2 hours**

Use appropriate agents:
- **@frontend-developer** for UI components
- **@backend-developer** for API endpoints
- Use **react-component-generator** skill for components
- Use **api-route-builder** skill for endpoints

### 4. Testing
**Time: 30-45 minutes**

Use **jest-test-writer** skill:

```
Write unit tests for [component/function] covering happy path and error cases
```

Coverage targets:
- Unit tests: 80%+
- Integration tests for API endpoints
- E2E test for critical path

### 5. Code Review
**Time: 15-30 minutes**

Self-review with **@code-reviewer**:

```
@code-reviewer Review this PR for best practices, security, and performance
```

### 6. Documentation
**Time: 15 minutes**

Update:
- [ ] README if needed
- [ ] API documentation
- [ ] Component storybook
- [ ] Changelog entry

## Definition of Done

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Performance acceptable
- [ ] Deployed to staging
