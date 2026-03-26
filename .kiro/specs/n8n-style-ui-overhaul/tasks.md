# Implementation Plan: n8n-Style UI Overhaul

## Overview

This plan implements a dark-themed, orange-accented design system for CargoSignal's marketing pages, replicating the visual quality of n8n.io. The implementation is strictly additive and isolated to public-facing pages, with zero impact on dashboard, auth, or superadmin areas. All changes use Next.js 16 App Router, React 19, TypeScript 5 strict mode, Tailwind CSS v4, and Framer Motion for animations.

## Tasks

- [x] 1. Install dependencies and extend design system tokens
  - Install `framer-motion` package if not already present
  - Add marketing-specific CSS tokens to `src/app/globals.css` inside existing `@theme` block
  - Add smooth scroll behavior to `html` selector
  - Verify existing tokens remain unchanged
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 12.1_

- [x] 2. Create reusable layout primitives
  - [x] 2.1 Create `SectionWrapper` component in `src/components/marketing/SectionWrapper.tsx`
    - Accept `children`, `className`, `dark`, and `id` props
    - Apply consistent vertical padding (py-24) and max-width (max-w-7xl)
    - Apply marketing dark background and white text when `dark={true}`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 2.2 Write property test for `SectionWrapper` dark prop
    - **Property 4: SectionWrapper dark prop applies marketing tokens**
    - **Validates: Requirements 3.4, 3.5**

  - [x] 2.3 Create `AnimatedSection` component in `src/components/marketing/AnimatedSection.tsx`
    - Use Framer Motion `motion.div` with `whileInView` trigger
    - Apply fade-in (opacity 0→1) and upward translate (y: 24px→0)
    - Use duration between 0.3s and 0.6s
    - Accept `delay` prop for staggered animations
    - Use `viewport={{ once: true }}` to prevent re-triggering
    - Add error boundary fallback for missing framer-motion
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 12.3, 12.4_

  - [ ]* 2.4 Write property tests for `AnimatedSection`
    - **Property 5: AnimatedSection transition duration is within bounds**
    - **Property 6: AnimatedSection delay prop is forwarded**
    - **Validates: Requirements 4.3, 4.5, 12.6**

- [x] 3. Extend Button component with dark-theme variants
  - Add `accent` variant with marketing accent background and white text
  - Add `dark-outline` variant with transparent background, white border, white text
  - Add hover scale transform (1.02) with 200ms transition to both new variants
  - Extend `ButtonProps` variant union type to include new variants
  - Verify existing variants (`primary`, `secondary`, `ghost`, `outline`) remain unchanged
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 13.1_

- [ ]* 3.1 Write property tests for Button variants
  - **Property 7: Button accent variant applies correct classes**
  - **Property 8: Button dark-outline variant applies correct classes**
  - **Property 9: Existing Button variants are unchanged**
  - **Validates: Requirements 5.1, 5.2, 5.4, 15.4**

- [x] 4. Extend Card component with dark variant
  - Add `dark` boolean prop to `Card` component
  - Apply `bg-marketing-surface`, `border-marketing-border`, `text-marketing-fg` when `dark={true}`
  - Verify default rendering (without `dark` prop) remains unchanged
  - Add hover elevation effect (box-shadow increase) with 200ms transition
  - _Requirements: 15.5, 13.2_

- [ ]* 4.1 Write property test for Card dark variant
  - **Property 11: Default Card rendering is unchanged**
  - **Validates: Requirements 15.5**

- [x] 5. Overhaul Navbar with scroll transition
  - Update `src/components/layout/Navbar.tsx` with scroll-based background transition
  - Apply transparent background when scroll position ≤ 20px
  - Apply `bg-marketing-bg/95 backdrop-blur-md shadow-sm` when scroll position > 20px
  - Use 300ms transition duration
  - Update active link color to use `text-marketing-accent`
  - Update "Get Started" button to use new `accent` variant
  - Update mobile dropdown panel to use `bg-marketing-bg` and `border-marketing-border`
  - Verify hamburger menu functionality on viewports < 1024px
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 14.3_

- [ ]* 5.1 Write property tests for Navbar
  - **Property 1: Navbar scroll state applies correct background class**
  - **Property 2: Navbar active link accent**
  - **Property 3: Navbar mobile menu visibility**
  - **Validates: Requirements 2.2, 2.3, 2.5, 2.7**

- [x] 6. Overhaul Footer with dark theme
  - Update `src/components/layout/Footer.tsx` background to `bg-marketing-bg`
  - Update link hover color to `text-marketing-accent` with 200ms transition
  - Update social icon hover to `bg-marketing-accent` with 200ms transition
  - Update newsletter input background to `bg-marketing-surface`
  - Verify responsive stacking on mobile viewports
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 13.3, 14.2_

- [x] 7. Create marketing section components
  - [x] 7.1 Create `HeroSection` component in `src/components/marketing/HeroSection.tsx`
    - Use dark base background via `SectionWrapper` with `dark={true}`
    - Display headline, subheadline, two CTA buttons (using new `accent` variant)
    - Include Quick Quote form as a card on right column (desktop) or stacked (mobile)
    - Wrap headline and CTA group in `AnimatedSection`
    - Ensure no layout shift during animation
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 12.4, 14.2_

  - [x] 7.2 Create `StatsSection` component in `src/components/marketing/StatsSection.tsx`
    - Display 4 stat items (shipments, countries, clients, partners) with icon, value, label
    - Wrap each stat card in `AnimatedSection` with staggered delays (0.1s increments)
    - Apply hover elevation effect (box-shadow increase) with 200ms transition
    - Use 2-column grid on mobile, 4-column on desktop
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 13.2, 14.2_

  - [ ]* 7.3 Write property test for staggered delays
    - **Property 10: Staggered AnimatedSection delays are monotonically increasing**
    - **Validates: Requirements 7.2, 8.2**

  - [x] 7.4 Create `FeaturesSection` component in `src/components/marketing/FeaturesSection.tsx`
    - Display 6 service cards in 3-column grid (desktop) and 1-column (mobile)
    - Wrap each card in `AnimatedSection` with staggered delays
    - Apply hover border color change to accent and shadow increase with 200ms transition
    - Use `SectionWrapper` for layout
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 13.2, 13.3, 14.2_

  - [x] 7.5 Create `IndustriesSection` component in `src/components/marketing/IndustriesSection.tsx`
    - Display 6 industry tiles with icon and label
    - Use `SectionWrapper` with `dark={true}` for dark background
    - Wrap tiles in `AnimatedSection`
    - Apply hover background transition to lighter dark shade with 200ms transition
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 13.4, 14.2_

  - [x] 7.6 Create `CTASection` component in `src/components/marketing/CTASection.tsx`
    - Display headline, supporting copy, two action buttons
    - Use dark base background via `SectionWrapper` with `dark={true}`
    - Wrap headline and button group in `AnimatedSection`
    - Use new `accent` and `dark-outline` button variants
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 8. Checkpoint - Ensure all components render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Refactor landing page to use new section components
  - Update `src/app/page.tsx` to import and compose new section components
  - Replace inline hero JSX with `<HeroSection />`
  - Replace inline stats JSX with `<StatsSection />`
  - Replace inline services JSX with `<FeaturesSection />`
  - Replace inline industries JSX with `<IndustriesSection />`
  - Replace inline final CTA JSX with `<CTASection />`
  - Keep existing tracking banner, process steps, testimonials, and blog preview sections
  - Verify no horizontal scroll overflow on any viewport width
  - _Requirements: 6.1, 7.1, 8.1, 9.1, 10.1, 14.5_

- [x] 10. Implement responsive behavior and micro-interactions
  - Verify all sections stack to single column on viewports < 768px
  - Verify consistent horizontal padding (px-6 minimum) across all breakpoints
  - Verify all hover transitions use 200ms duration
  - Verify no JavaScript-driven animation loops
  - _Requirements: 12.6, 13.1, 13.2, 13.3, 13.4, 14.1, 14.2, 14.4_

- [x] 11. Performance and scroll optimization
  - Verify smooth scroll behavior is applied
  - Verify images use Next.js `Image` component with `loading="lazy"`
  - Verify `AnimatedSection` uses `viewport={{ once: true }}`
  - Verify no layout shift (CLS) from animation initial states
  - Verify animations don't cause unnecessary React re-renders
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [x] 12. Final checkpoint and regression testing
  - Run `npm run build` to verify no TypeScript or ESLint errors
  - Verify no files under `src/app/dashboard/`, `src/app/superadmin/`, `src/app/login/`, `src/app/register/`, or `src/app/onboarding/` were modified
  - Verify `DashboardLayout.tsx`, `SuperAdminLayout.tsx`, `Sidebar.tsx`, `Header.tsx` are unchanged
  - Verify existing design tokens in `globals.css` are unchanged
  - Verify Button and Card existing variants render identically to before
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- All changes are strictly additive to avoid regressions
- New components live in `src/components/marketing/` to maintain isolation
