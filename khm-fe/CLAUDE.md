# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**KHM (Kigali Hot Market)** is a React 18 + Vite + TypeScript e-commerce frontend for an online marketplace. It has two main areas: a customer-facing storefront and an admin dashboard.

## Commands

```bash
npm run dev        # Start dev server (port 4173)
npm run build      # Production build
npm run build:dev  # Dev mode build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

No test runner is configured in this project.

## Environment

Copy `.env.example` to `.env`. The only required variable is:
```
VITE_BASE_URL=<backend API base URL>
```

## Architecture

### Routing (`src/utils/Providers/RoutesProvider.tsx`)

Three route groups:
- `/` — public customer routes (Home, Products, Cart, Checkout, About, Profile)
- `/dashboard` — admin routes, protected by `AdminRoute` (requires ADMIN role)
- `/auth` — login and password reset

`AdminRoute` component checks `react-auth-kit` auth state and user role before rendering.

### State Management

- **Authentication**: `react-auth-kit` with cookie-based token storage. Raw user data also stored in `localStorage` as `userData` JSON, token as `accessToken`.
- **Shopping Cart**: React Context (`src/contexts/CartContext.tsx`) with `localStorage` persistence. Manages items, quantities, and totals.
- **Server State**: TanStack React Query v4. Query keys are centralized in `src/utils/constants/queryKeys.ts` — always use these constants instead of inline strings.

### API Layer (`src/apis/`)

- `api.ts` — Axios instance configured with the base URL from `VITE_BASE_URL`, auto-attaches `Authorization` header from `localStorage`, handles 401 by redirecting to home.
- Individual service files: `auth.ts`, `product.ts`, `order.ts`, `delivery.ts`, `users.ts`, `payment.ts`, `profile.ts`.

### Components

- `src/components/ui/` — Shadcn/ui primitives (Radix UI-based). Do not modify these manually; regenerate via the Shadcn CLI if needed.
- `src/admin/` — Admin dashboard layout, sidebar, and page components.
- `src/pages/` — Customer-facing page components.
- `src/components/` — Shared components organized by domain (product, order, delivery, users, profile, navigation).

### Forms

React Hook Form + Zod. Validation schemas live in `src/utils/schemas/`. Always use `@hookform/resolvers/zod` for integration.

### Permissions (`src/constants/permissions.ts`)

Role/permission constants used by `HasPermission`, `HasPermissions`, and `HasPermissionGroup` helpers in `src/helpers/`.

## Key Conventions

- **Path aliases**: `@` maps to `src/`, `@/app` maps to `src/app/`. Use these for all internal imports.
- **Styling**: Tailwind CSS with CSS custom properties (HSL variables) for theming. Dark mode uses the `class` strategy. Admin uses Ant Design tables; customer UI uses Shadcn/Radix.
- **Toasts**: `react-hot-toast` is the primary toast library; `sonner` and `notiflix` are also present for specific use cases.
- **TypeScript**: `noImplicitAny` is disabled. Type definitions for domain models (User, Product, Order, etc.) are in `src/types/`.

## Deployment

The app deploys to Vercel. `vercel.json` has an SPA catch-all rewrite. `deploy.sh` builds with pnpm and copies `dist/` to the parent directory.
