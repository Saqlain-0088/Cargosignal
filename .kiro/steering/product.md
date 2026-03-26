# CargoSignal - Product Overview

CargoSignal is a multi-tenant SaaS platform for intelligent supply chain visibility. It enables logistics companies and their customers to monitor global shipments in real-time, manage containers, track customs clearance, handle alerts, and analyze logistics costs.

## Key Modules

- **Dashboard** - KPI overview, shipment map, performance charts, subscription usage
- **Shipments** - Create, view, and track individual shipments
- **Containers** - Monitor container status, location, temperature/humidity
- **Tracking** - Real-time shipment tracking by ID
- **Alerts** - Delay, customs, temperature, and route deviation notifications
- **Customs** - Customs event timeline and status tracking
- **Costs** - Logistics cost breakdown by category (freight, customs, insurance, storage)
- **Analytics** - Performance reporting
- **Billing** - Subscription plan management and usage limits
- **Settings** - User and role management

## User Roles

- **Administrator** - Full access
- **Logistics Manager** - Manage shipments, containers, alerts
- **Billing** - Access costs and invoices
- **Viewer** - Read-only access

## Multi-Tenancy

The platform supports multiple company tenants (`CompanyTenant`), each with their own users, shipments, and subscription plans. A separate **Superadmin** portal exists for platform-level management of companies and users.

## Auth Flow

Users register → onboarding (company setup) → dashboard. Auth state is stored in `localStorage` under the key `cargosignal_user`. Currently uses mock auth; Prisma/PostgreSQL schema is in place for real implementation.
