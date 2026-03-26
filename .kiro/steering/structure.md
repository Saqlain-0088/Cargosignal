# Project Structure

## Root Layout

```
src/
  app/          # Next.js App Router pages
  components/   # Reusable React components
  context/      # React context providers
  lib/          # Shared utilities and singletons
  mock/         # Mock data (used in place of real API calls currently)
  types/        # Shared TypeScript types
  generated/    # Auto-generated Prisma client (do not edit manually)
prisma/
  schema.prisma # Database schema
```

## App Router Structure (`src/app/`)

Pages follow Next.js App Router conventions (`page.tsx`, `layout.tsx`).

```
app/
  page.tsx                  # Landing/marketing page
  layout.tsx                # Root layout (wraps AuthProvider)
  login/                    # Auth pages
  register/
  onboarding/               # Post-registration company setup
  dashboard/                # Main app (protected)
    page.tsx                # Overview/KPI dashboard
    shipments/
      page.tsx              # Shipment list
      new/page.tsx          # Create shipment
      [id]/page.tsx         # Shipment detail
    tracking/[id]/          # Real-time tracking
    containers/
    alerts/
    customs/
    costs/
    analytics/
    billing/
    settings/
    ports/
  superadmin/               # Platform admin portal (separate layout)
    login/
    companies/
    users/
    analytics/
  blog/
  about/
  contact/
  pricing/
  services/
  quote/
  tracking/                 # Public tracking page
  api/                      # API routes
```

## Components (`src/components/`)

```
components/
  ui/               # Primitive UI components (Button, Card, Badge, Input, Label, Modal, Table)
  layout/           # Layout shells
    DashboardLayout.tsx     # Main app shell with sidebar
    SuperAdminLayout.tsx    # Superadmin shell
    Sidebar.tsx
    Header.tsx
    Navbar.tsx              # Marketing/public nav
    Footer.tsx
  dashboard/
    ShipmentMap.tsx         # Mapbox-powered shipment map
  ProtectedRoute.tsx        # Auth guard component
```

## Conventions

- All client components must have `"use client"` at the top
- Use `@/` path alias for all imports (maps to `src/`)
- Types live in `src/types/index.ts` — add shared types there
- Mock data lives in `src/mock/index.ts` — import from `@/mock`
- Use `cn()` from `@/lib/utils` for all conditional className merging
- Prisma singleton is imported from `@/lib/prisma` (server-side only)
- Auth state is accessed via `useAuth()` from `@/context/AuthContext`
- Route protection uses `<ProtectedRoute>` wrapper or `useAuth()` hook with redirect

## Data Flow (Current State)

Most pages consume data from `src/mock/index.ts` directly. The Prisma schema and DB are set up but API routes are minimal. New features should use API routes (`src/app/api/`) backed by Prisma for real data.
