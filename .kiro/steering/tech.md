# Tech Stack

## Framework & Runtime
- **Next.js 16** (App Router) with **React 19**
- **TypeScript 5** — strict mode enabled
- Target: ES2017, module resolution: bundler

## Styling
- **Tailwind CSS v4** with `@tailwindcss/postcss`
- Utility merging via `clsx` + `tailwind-merge` (use the `cn()` helper from `@/lib/utils`)
- Custom design tokens used in classnames: `bg-brand-primary`, `bg-brand-secondary`, `bg-brand-accent`, `rounded-ui`, `shadow-premium`, `shadow-card-hover`, `p-base`

## Database
- **PostgreSQL** via **Prisma 7** ORM
- Prisma client generated to `src/generated/prisma/`
- Singleton client in `src/lib/prisma.ts` (safe for Next.js hot reload)
- Adapter: `@prisma/adapter-pg`

## Key Libraries
- `lucide-react` — icons
- `recharts` — charts (AreaChart, etc.)
- `mapbox-gl` + `react-map-gl` — shipment map
- `date-fns` — date formatting
- `tailwind-merge` + `clsx` — class merging

## Common Commands

```bash
# Development
npm run dev

# Production build (runs prisma generate first)
npm run build

# Start production server
npm start

# Lint
npm run lint

# Generate Prisma client manually
npx prisma generate

# Run a migration
npx prisma migrate dev --name <migration-name>

# Open Prisma Studio
npx prisma studio
```

## Environment
- `DATABASE_URL` — PostgreSQL connection string (required, see `.env`)
