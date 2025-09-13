# Contributing to Augusto Galego

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Issue Guidelines](#issue-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/augusto-galego.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js (v20 or higher)
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/augusto-galego.git
cd augusto-galego

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## Making Changes

### Before You Start

1. Check existing issues and pull requests to avoid duplicates
2. Create an issue to discuss major changes before implementing
3. Ensure your development environment is set up correctly

### Development Guidelines

- Follow the existing code style and patterns
- Write clean, readable, and maintainable code
- Add comments for complex logic
- Update documentation when necessary
- Write tests for new features and bug fixes

## Pull Request Process

1. **Create a descriptive branch name**
   - `feature/add-new-component`
   - `fix/resolve-navigation-bug`
   - `docs/update-readme`

2. **Make your changes**
   - Follow the coding standards
   - Test your changes thoroughly
   - Update documentation if needed

3. **Commit your changes**
   - Use conventional commit messages
   - Keep commits focused and atomic

4. **Push and create PR**
   - Push to your fork
   - Create a pull request with a clear title and description
   - Fill out the PR template completely

5. **Review process**
   - Address any feedback from reviewers
   - Keep your PR up to date with the main branch
   - Be responsive to comments and suggestions

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow functional programming patterns
- Use descriptive variable names
- Prefer `const` over `let`
- Use early returns for better readability
- Avoid `any` types - use proper typing

### React/Next.js

- Use functional components with hooks
- Prefer Server Components when possible
- Use `'use client'` directive only when necessary
- Implement proper error boundaries
- Follow React best practices for performance

### Styling

- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Use semantic HTML elements
- Ensure accessibility standards (WCAG 2.1)
- Test on multiple screen sizes

### File Organization

- Use kebab-case for file and directory names
- Use PascalCase for component names
- Group related files together
- Keep components small and focused

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples

```
feat: add dark mode toggle component
fix: resolve navigation menu overflow on mobile
docs: update installation instructions
style: format code with prettier
refactor: extract common utility functions
```

## Issue Guidelines

### Before Creating an Issue

- Search existing issues to avoid duplicates
- Check if the issue exists in the latest version
- Gather relevant information (browser, OS, steps to reproduce)

### Bug Reports

- Use the bug report template
- Provide clear steps to reproduce
- Include screenshots or videos if helpful
- Specify your environment details

### Feature Requests

- Use the feature request template
- Explain the problem you're trying to solve
- Describe your proposed solution
- Consider alternative approaches

## Questions and Support

- Check the documentation first
- Search existing issues and discussions
- Create a new issue with the question label
- Be specific and provide context

## Recognition

Contributors will be recognized in our README.md file. Thank you for helping make this project better!

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.
