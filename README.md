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

### 1. Set up Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

### 2. Set up the database
1. In your Supabase dashboard, go to the SQL Editor
2. Run the SQL from `supabase-schema.sql` to create tables, policies, and triggers
3. This will set up:
   - User profiles with roles
   - Services offered by professionals
   - Availability schedules
   - Booking requests
   - Reviews and ratings

### 3. Install and run
```bash
npm install
npm run dev
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
- City search is restricted to Rome only.
