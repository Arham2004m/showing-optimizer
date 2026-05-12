# Showing Optimizer - Project Rules

## Tech Stack & Architecture
- Framework: Next.js App Router ONLY. Do not use the Pages router (`pages/` directory).
- Language: TypeScript strictly. Avoid `any` types.
- Styling: Tailwind CSS ONLY. Do not create separate CSS files or use CSS modules unless explicitly asked.
- Backend: Use Next.js Server Actions for mutations and Route Handlers for external API webhooks. NO custom Express/Node server.
- Database: Supabase via `@supabase/supabase-js`. Use Server Components for data fetching. Use Client Components only for interactivity/maps. Read `SUPABASE_SCHEMA.md` for table structures.
- Maps: Use `@react-google-maps/api` for all map visualizations.
- File Structure: Keep UI components in `/components`, server actions in `/app/actions`, types in `/types`.

## Security & Environment
- Never expose Supabase Service Role keys to the frontend.
- All environment variables must be accessed via `process.env.NEXT_PUBLIC_...` or `process.env...` for server-side.

## Deployment Workflow
- Git is our deployment pipeline. When I ask you to "deploy" or "push", it means: stage changes, commit with a descriptive message, and push to the `main` branch.
- Vercel is connected to GitHub and will auto-deploy from the `main` branch. Do not attempt to use Vercel CLI.
