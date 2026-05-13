# CareLink

A React + Vite MVP marketplace for healthcare and wellness services. The app uses TailwindCSS for styling, React Router for navigation, Zustand for state, and Supabase for backend integration.

## Features
- Email/password authentication
- Role-based experience for clients, professionals, and associations
- Search and filtering for healthcare professionals
- Professional profile pages with services, availability, and reviews
- Booking request flow with pending/accepted/rejected status
- Responsive mobile-first design

## Getting started
1. Copy `.env.example` to `.env` and configure your Supabase credentials.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project structure
- `src/components` — reusable UI components
- `src/pages` — route pages
- `src/layouts` — page layouts and wrappers
- `src/services` — Supabase and mock data access
- `src/store` — Zustand global state
- `src/types` — shared TypeScript types
- `src/lib` — Supabase client and example seed data
- `src/styles` — Tailwind CSS styles

## Notes
- The app uses mock seed data when Supabase is not configured.
- No payments, prescriptions, or medical records are implemented.
