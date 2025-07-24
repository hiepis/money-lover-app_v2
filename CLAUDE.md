# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Personal Expense Tracker v1** - a simple, privacy-focused web application for tracking daily expenses. The project is currently in the planning/documentation phase with no code implementation yet.

### Key Project Characteristics
- **Single-page React application** with Vite build tool
- **Local storage only** - no backend, no cloud sync, no user accounts
- **Mobile-first responsive design** for quick expense entry
- **Privacy-focused** - all data stays on the user's device
- **Offline-capable by design** - works without internet connection

## Architecture Overview

### Planned Technical Stack
- **Frontend**: React 18 + Vite + React Router v6
- **Styling**: CSS Modules + Tailwind CSS
- **State Management**: React useState/useContext (no external state libraries)
- **Storage**: Browser localStorage (JSON format)
- **Build Tool**: Vite for fast development and optimized builds
- **Code Quality**: ESLint + Prettier

### Core Modules (Planned)
1. **Expense Management** - CRUD operations for expenses
2. **Category Management** - Manage spending categories
3. **Data Storage** - localStorage interface and data persistence
4. **Summary & Calculations** - Daily/monthly totals and calculations
5. **UI Components** - Reusable React components

## Development Commands

Since this project hasn't been implemented yet, the standard React + Vite commands will apply once created:

```bash
# Project initialization (when ready to implement)
npm create vite@latest money-lover-app -- --template react
cd money-lover-app
npm install

# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code quality (when configured)
npm run lint         # Run ESLint
npm run format       # Run Prettier
npm test            # Run tests (Jest + React Testing Library)
```

## Project Structure (Planned)

```
src/
├── components/       # Reusable UI components
├── modules/         # Feature modules (expenses, categories, etc.)
├── utils/           # Utility functions (storage, validation, calculations)
├── hooks/           # Custom React hooks
└── styles/          # Global styles and CSS modules
```

## Key Design Principles

### Core User Flow
The app is designed around a **10-second expense entry** workflow:
1. Open app → Clean interface
2. Enter amount → Type spending amount
3. Select category → Choose from predefined/custom categories  
4. Tap "Add" → Expense saved immediately
5. See confirmation → Expense visible in today's list

### Default Categories
- Food & Dining, Transportation, Shopping, Entertainment
- Bills & Utilities, Healthcare, Other

### Data Structure
- All data stored in browser localStorage as JSON
- No server-side persistence or user accounts
- Manual export/import for data backup (future feature)

## Development Guidelines

### Component Architecture
- Build independently testable modules
- Use React functional components with hooks
- Implement proper prop validation
- Follow responsive design patterns

### Data Management
- All state changes must persist to localStorage immediately
- Implement proper error handling for storage operations
- Design data structure for easy future cloud migration
- Monitor localStorage usage and implement cleanup strategies

### Performance Considerations
- Optimize for mobile performance
- Implement code splitting for larger features
- Use React.memo for expensive calculations
- Consider virtualization for large expense lists

## Current Status

This repository contains **planning and documentation only**:
- `docs/1-pdc.md` - Product Description Concept
- `docs/2-plan.md` - Detailed Implementation Plan
- `template/` - Development templates and workflows

**No code has been implemented yet.** The project is ready for implementation following the architecture outlined in the planning documents.

## Testing Strategy

When implemented, testing should include:
- **Unit tests**: Jest + React Testing Library for components
- **Integration tests**: Complete user workflow testing
- **Cross-browser testing**: Chrome, Firefox, Safari, Edge
- **Responsive testing**: Mobile, tablet, desktop viewports
- **localStorage testing**: Mock browser storage for consistent tests

## Deployment

Planned deployment on static hosting platforms:
- Netlify, Vercel, or GitHub Pages
- Static file hosting (no server required)
- Automatic HTTPS and CDN
- Environment-agnostic build output