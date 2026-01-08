---
name: react-component-generator
description: Generate type-safe React components with proper TypeScript interfaces, styling, and test files.
version: 1.2.0
author: Agency Core Team
tags:
  - react
  - typescript
  - components
installCommand: npx contexta install react-component-generator
---

# React Component Generator

Generate React components with TypeScript, proper props interfaces, and accompanying test files.

## Usage

Ask your AI assistant to create a component:

```
Create a Button component with primary and secondary variants
```

## Features

- **TypeScript Props Interface** - Fully typed component props
- **Styling Options** - Tailwind CSS or styled-components
- **Test File Generation** - Jest + React Testing Library
- **Storybook Stories** - Optional story file generation
- **Accessibility** - ARIA attributes and keyboard navigation

## Example Output

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick,
  disabled 
}: ButtonProps) {
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

## Configuration

Create a `.contexta/react-component.json` to customize:

```json
{
  "styling": "tailwind",
  "testFramework": "vitest",
  "storybook": true,
  "componentDir": "src/components"
}
```
