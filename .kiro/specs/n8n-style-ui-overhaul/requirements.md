# Requirements Document

## Introduction

This feature is a UI/UX overhaul of the CargoSignal public/marketing pages to replicate the visual style and interaction quality of n8n.io. The overhaul targets only the UI layer (React/Next.js + Tailwind CSS) of the public-facing pages: landing page, about, services, pricing, contact, blog, quote, and tracking. The dashboard, authentication pages, APIs, routing, and business logic are explicitly out of scope. The result must be a dark-themed, high-contrast, orange-accented design system with smooth Framer Motion animations, reusable components, and zero regressions in existing functionality.

## Glossary

- **Marketing_Pages**: The set of public-facing Next.js pages: `/`, `/about`, `/services`, `/pricing`, `/contact`, `/blog`, `/quote`, `/tracking` (public).
- **Design_System**: The shared set of CSS custom properties, Tailwind tokens, and component primitives that define the visual language (colors, typography, spacing, radius, shadows).
- **Navbar**: The fixed top navigation component rendered on all Marketing_Pages (`src/components/layout/Navbar.tsx`).
- **Footer**: The bottom navigation component rendered on all Marketing_Pages (`src/components/layout/Footer.tsx`).
- **Section_Wrapper**: A reusable layout component that enforces consistent vertical padding and max-width constraints across page sections.
- **AnimatedSection**: A reusable Framer Motion wrapper that applies fade-in and upward-translate entrance animations triggered by scroll visibility.
- **Card**: The existing `src/components/ui/Card.tsx` primitive, extended to support dark-theme variants.
- **Button**: The existing `src/components/ui/Button.tsx` primitive, extended with new dark-theme and accent variants.
- **Badge**: The existing `src/components/ui/Badge.tsx` primitive used for labels and category tags.
- **Framer_Motion**: The `framer-motion` npm package used for declarative animations.
- **IntersectionObserver**: The browser API (or Framer Motion's `whileInView`) used to trigger scroll-based animations.
- **cn()**: The class-merging utility from `@/lib/utils` combining `clsx` and `tailwind-merge`.
- **Dashboard**: The protected application area under `/dashboard` — explicitly excluded from this overhaul.

---

## Requirements

### Requirement 1: Design System Tokens

**User Story:** As a developer, I want a centralized dark-theme design system defined in `globals.css`, so that all Marketing_Pages share consistent colors, typography, spacing, and radius without duplicating values.

#### Acceptance Criteria

1. THE Design_System SHALL define a near-black base background token (`#0f0f0f` or equivalent) as `--color-marketing-bg`.
2. THE Design_System SHALL define an orange primary accent token (`#ff6d00` or equivalent) as `--color-marketing-accent`.
3. THE Design_System SHALL define high-contrast foreground tokens for primary text (`#ffffff`) and secondary text (`#a1a1aa` or equivalent).
4. THE Design_System SHALL define border-radius tokens of 8px (`--radius-ui`) and 12px (`--radius-card`) consistent with existing token names.
5. THE Design_System SHALL define subtle shadow tokens that do not produce heavy drop shadows.
6. WHEN the Design_System tokens are changed, THE Marketing_Pages SHALL reflect the change without requiring per-component edits.
7. THE Design_System SHALL NOT modify any tokens consumed by Dashboard components.

---

### Requirement 2: Sticky Navbar with Scroll Transition

**User Story:** As a visitor, I want a minimal sticky navbar that transitions from transparent to a solid dark background on scroll, so that the page feels modern and the content is always accessible.

#### Acceptance Criteria

1. THE Navbar SHALL be fixed to the top of the viewport on all Marketing_Pages.
2. WHEN the page scroll position is 0px, THE Navbar SHALL render with a transparent background.
3. WHEN the page scroll position exceeds 20px, THE Navbar SHALL transition to a solid dark background (`#0f0f0f` or equivalent) with a backdrop blur effect within 300ms.
4. THE Navbar SHALL display the CargoSignal logo, navigation links, a "Log in" link, and a "Get Started" CTA button.
5. WHEN a navigation link matches the current route, THE Navbar SHALL apply the marketing accent color to that link.
6. THE Navbar SHALL render a hamburger menu on viewports narrower than 1024px.
7. WHEN the hamburger menu is open, THE Navbar SHALL display all navigation links in a full-width dark dropdown panel.
8. THE Navbar SHALL NOT affect the Dashboard layout or `DashboardLayout.tsx`.

---

### Requirement 3: Reusable Section_Wrapper Component

**User Story:** As a developer, I want a reusable Section_Wrapper component, so that all page sections maintain consistent vertical rhythm and max-width without duplicating layout classes.

#### Acceptance Criteria

1. THE Section_Wrapper SHALL accept a `className` prop for per-section background overrides.
2. THE Section_Wrapper SHALL apply a consistent vertical padding of at least 96px (py-24) by default.
3. THE Section_Wrapper SHALL constrain inner content to a max-width of 1280px and center it horizontally.
4. THE Section_Wrapper SHALL accept an optional `dark` boolean prop that applies the dark background token when true.
5. WHERE the `dark` prop is true, THE Section_Wrapper SHALL apply the `--color-marketing-bg` background and white foreground text.

---

### Requirement 4: Reusable AnimatedSection Component

**User Story:** As a developer, I want a reusable AnimatedSection component using Framer Motion, so that scroll-triggered entrance animations are applied consistently without duplicating animation logic.

#### Acceptance Criteria

1. THE AnimatedSection SHALL use Framer Motion's `whileInView` to trigger animations when the element enters the viewport.
2. THE AnimatedSection SHALL apply a fade-in (opacity 0 → 1) and upward translate (y: 24px → 0) entrance animation.
3. THE AnimatedSection SHALL use an animation duration between 0.3s and 0.6s.
4. THE AnimatedSection SHALL trigger the animation once per page load (not re-trigger on scroll out).
5. THE AnimatedSection SHALL accept a `delay` prop (number, seconds) to support staggered children.
6. THE AnimatedSection SHALL accept a `className` prop for layout customization.
7. THE AnimatedSection SHALL NOT use heavy parallax effects, scroll hijacking, or complex animation timelines.
8. IF Framer_Motion is not available in the bundle, THEN THE AnimatedSection SHALL render children without animation rather than throwing an error.

---

### Requirement 5: Button Component Dark-Theme Variants

**User Story:** As a developer, I want the Button component to support dark-theme and accent variants, so that CTAs on dark backgrounds are visually consistent with the new design system.

#### Acceptance Criteria

1. THE Button SHALL support an `accent` variant that applies the `--color-marketing-accent` background with white text.
2. THE Button SHALL support a `dark-outline` variant that applies a transparent background with a white border and white text.
3. WHEN a Button is hovered, THE Button SHALL apply a subtle scale transform of 1.02 within 200ms.
4. THE Button SHALL NOT break existing `primary`, `secondary`, `ghost`, and `outline` variants used by Dashboard components.

---

### Requirement 6: Landing Page Hero Section

**User Story:** As a visitor, I want a visually striking hero section on the landing page, so that I immediately understand CargoSignal's value proposition and can take action.

#### Acceptance Criteria

1. THE Landing_Page hero section SHALL use the dark base background (`--color-marketing-bg`).
2. THE Landing_Page hero section SHALL display a headline, subheadline, and at least two CTA buttons.
3. THE Landing_Page hero section SHALL apply the AnimatedSection entrance animation to the headline and CTA group.
4. THE Landing_Page hero section SHALL include the Quick Quote form as a visually distinct card on the right column on desktop.
5. WHEN the viewport is narrower than 768px, THE Landing_Page hero section SHALL stack the headline column and Quick Quote form vertically.
6. THE Landing_Page hero section SHALL NOT introduce layout shift during animation.

---

### Requirement 7: Landing Page Stats / Social Proof Section

**User Story:** As a visitor, I want to see key statistics (shipments, countries, clients, partners) displayed prominently, so that I can quickly assess CargoSignal's scale and credibility.

#### Acceptance Criteria

1. THE Stats_Section SHALL display at least four metrics with a numeric value and a label.
2. THE Stats_Section SHALL use AnimatedSection with staggered delays for each stat card.
3. WHEN a stat card is hovered, THE Card SHALL apply a subtle elevation effect (box-shadow increase) within 200ms.
4. THE Stats_Section SHALL be responsive, displaying 2 columns on mobile and 4 columns on desktop.

---

### Requirement 8: Landing Page Features / Services Section (Zig-Zag Layout)

**User Story:** As a visitor, I want to see CargoSignal's core services presented in an alternating zig-zag layout, so that each service feels distinct and the page has visual rhythm.

#### Acceptance Criteria

1. THE Features_Section SHALL display service cards in a grid of 3 columns on desktop and 1 column on mobile.
2. THE Features_Section SHALL apply AnimatedSection entrance animations to each service card with a staggered delay.
3. WHEN a service card is hovered, THE Card SHALL apply a border color change to the accent color and a subtle shadow increase.
4. THE Features_Section SHALL use the Section_Wrapper component for layout.

---

### Requirement 9: Landing Page Integrations / Industries Section

**User Story:** As a visitor, I want to see which industries CargoSignal serves, so that I can confirm the platform is relevant to my sector.

#### Acceptance Criteria

1. THE Industries_Section SHALL display at least six industry tiles with an icon and label.
2. THE Industries_Section SHALL use a dark background via the Section_Wrapper `dark` prop.
3. THE Industries_Section SHALL apply AnimatedSection entrance animations.
4. WHEN an industry tile is hovered, THE tile SHALL apply a background color transition to a lighter dark shade within 200ms.

---

### Requirement 10: Landing Page CTA Footer Section

**User Story:** As a visitor who has scrolled to the bottom of the landing page, I want a compelling call-to-action section, so that I am prompted to sign up or contact sales.

#### Acceptance Criteria

1. THE CTA_Section SHALL display a headline, supporting copy, and at least two action buttons.
2. THE CTA_Section SHALL use the dark base background.
3. THE CTA_Section SHALL apply AnimatedSection entrance animation to the headline and button group.
4. THE CTA_Section SHALL use the Section_Wrapper component for layout.

---

### Requirement 11: Footer Dark-Theme Overhaul

**User Story:** As a visitor, I want the Footer to match the dark design system, so that the page feels cohesive from top to bottom.

#### Acceptance Criteria

1. THE Footer SHALL use the dark base background (`--color-marketing-bg`).
2. THE Footer SHALL display the logo, quick links, support links, and newsletter subscription form.
3. WHEN a footer link is hovered, THE link SHALL transition to the accent color within 200ms.
4. WHEN the social icon buttons are hovered, THE icons SHALL transition to the accent color within 200ms.
5. THE Footer SHALL be responsive, stacking columns vertically on mobile.

---

### Requirement 12: Scroll Behavior and Performance

**User Story:** As a visitor, I want smooth, jank-free scrolling and fast page loads, so that the experience feels premium and professional.

#### Acceptance Criteria

1. THE Marketing_Pages SHALL use native smooth scroll behavior (`scroll-behavior: smooth`).
2. THE Marketing_Pages SHALL lazy-load images using the Next.js `Image` component with `loading="lazy"` or equivalent.
3. THE AnimatedSection SHALL use `viewport={{ once: true }}` to prevent re-triggering animations on scroll-out.
4. THE Marketing_Pages SHALL NOT introduce layout shift (CLS) caused by animation initial states.
5. WHEN animations are running, THE Marketing_Pages SHALL NOT cause unnecessary React re-renders outside the animated component tree.
6. THE animation duration for all micro-interactions SHALL be between 0.2s and 0.6s.

---

### Requirement 13: Micro-Interactions

**User Story:** As a visitor, I want subtle micro-interactions on interactive elements, so that the UI feels responsive and polished.

#### Acceptance Criteria

1. WHEN a Button is hovered, THE Button SHALL scale to 1.02 within 200ms using a CSS transition.
2. WHEN a Card is hovered, THE Card SHALL increase its box-shadow elevation within 200ms using a CSS transition.
3. WHEN a navigation link is hovered, THE link SHALL transition its color to the accent color within 200ms.
4. THE micro-interactions SHALL NOT use JavaScript-driven animation loops that could cause infinite re-renders.

---

### Requirement 14: Responsiveness

**User Story:** As a visitor on any device, I want the Marketing_Pages to display correctly and be fully usable, so that I can access CargoSignal's information regardless of screen size.

#### Acceptance Criteria

1. THE Marketing_Pages SHALL follow a mobile-first responsive approach using Tailwind CSS breakpoints.
2. WHEN the viewport is narrower than 768px, THE Marketing_Pages SHALL stack multi-column sections into a single column.
3. THE Navbar SHALL display a hamburger menu on viewports narrower than 1024px.
4. THE Section_Wrapper SHALL apply consistent horizontal padding across all breakpoints (px-6 minimum).
5. THE Marketing_Pages SHALL NOT produce horizontal scroll overflow on any standard viewport width.

---

### Requirement 15: No Regression on Dashboard and Auth Pages

**User Story:** As a developer, I want the UI overhaul to be strictly isolated to Marketing_Pages, so that the dashboard, auth, and superadmin pages are not affected.

#### Acceptance Criteria

1. THE overhaul SHALL NOT modify any files under `src/app/dashboard/`, `src/app/superadmin/`, `src/app/login/`, `src/app/register/`, or `src/app/onboarding/`.
2. THE overhaul SHALL NOT modify `DashboardLayout.tsx`, `SuperAdminLayout.tsx`, `Sidebar.tsx`, or `Header.tsx`.
3. WHEN new Design_System tokens are added to `globals.css`, THE existing `--color-brand-primary`, `--color-brand-accent`, `--color-brand-secondary`, and all other existing tokens SHALL remain unchanged.
4. THE Button component changes SHALL be additive only — new variants SHALL be added without modifying existing variant styles.
5. THE Card component changes SHALL be additive only — new props SHALL be added without modifying existing default styles.
6. WHEN the production build is run (`npm run build`), THE build SHALL complete without TypeScript errors or ESLint errors.
