---
name: bug-fix
description: Systematic approach to diagnosing and fixing bugs.
estimatedTime: 30-90 minutes
difficulty: intermediate
---

# Bug Fix Workflow

Systematic approach to identifying, fixing, and preventing bugs.

## Prerequisites

- Bug report with reproduction steps
- Access to relevant logs/errors
- Understanding of expected behavior

## Steps

### 1. Reproduce the Bug
**Time: 10-20 minutes**

Before fixing, confirm you can reproduce:

1. Follow the exact reproduction steps
2. Note the environment (browser, OS, etc.)
3. Check if it's consistent or intermittent
4. Identify the minimal reproduction case

If can't reproduce:
- Ask for more details
- Check different environments
- Review recent changes in that area

### 2. Understand Root Cause
**Time: 15-30 minutes**

Use **@code-reviewer** agent:

```
@code-reviewer Help me debug this issue:
[Describe symptoms, error messages, and what you've tried]
```

Investigation techniques:
- Add logging/debugging
- Check git blame for recent changes
- Review related test cases
- Check for similar reported issues

### 3. Write a Failing Test
**Time: 10 minutes**

**IMPORTANT**: Write a test that fails due to the bug BEFORE fixing.

```
Create a test case that reproduces [bug description]
```

This ensures:
- You understand the bug correctly
- The fix actually works
- The bug won't regress

### 4. Implement the Fix
**Time: 15-30 minutes**

Guidelines:
- Make the minimal change needed
- Don't refactor unrelated code
- Consider side effects
- Check if fix applies elsewhere

Use appropriate agent:
- **@frontend-developer** for UI bugs
- **@backend-developer** for API bugs

### 5. Verify the Fix
**Time: 10 minutes**

Checklist:
- [ ] Failing test now passes
- [ ] All other tests still pass
- [ ] Manual testing confirms fix
- [ ] No new warnings/errors
- [ ] Performance not degraded

### 6. Document
**Time: 5 minutes**

In your PR description:
- What was the bug?
- What caused it?
- How did you fix it?
- How to prevent similar bugs?

### 7. Code Review
**Time: 15 minutes**

Self-review checklist:
- [ ] Fix is minimal and focused
- [ ] Test coverage added
- [ ] No unrelated changes
- [ ] Clean git history

## Bug Prevention

After the fix, consider:
- Can we add a linting rule?
- Should we add type safety?
- Do we need more testing in this area?
- Should this be documented?
