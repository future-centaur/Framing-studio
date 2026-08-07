# Custom Framing Studio (Hollow & Hale)

This is a premium custom framing website built with Next.js (App Router), TypeScript, Prisma, and Postgres. It supports client uploads, live visual frame compositing, dynamic KES pricing, and three checkout paths:
1. **Direct Path**: Normal clients ordering directly.
2. **Referral Path**: Photographers sharing referral links and earning commission.
3. **Resale Path**: Photographers buying wholesale for client resale at a discount.

All structural UI elements incorporate a physical "rabbet groove" motif.

---

## Netlify Deployment Guide

To deploy this project to Netlify:

### 1. Prerequisites
- A **PostgreSQL** database (e.g., via Neon, Supabase, AWS RDS, or Aiven).
- A **Netlify** account.

### 2. Configure Netlify Site & Environment Variables
Add these environment variables in your Netlify site settings (**Site Configuration > Environment variables**):

- `DATABASE_URL`: Your PostgreSQL connection string.
- `SESSION_SECRET`: A secure random string for signing photographer sessions.
- `ADMIN_SECRET`: Secret key to access config and metric tools.
- `NEXT_PUBLIC_SITE_URL`: Your production Netlify URL (e.g., `https://your-studio.netlify.app`).
- `DARAJA_MOCK`: Set to `true` to test checkout flow with mock STK pushes. Set to `false` for production Daraja integrations.
- `DARAJA_CONSUMER_KEY` / `DARAJA_CONSUMER_SECRET` / `DARAJA_SHORTCODE` / `DARAJA_PASSKEY` / `DARAJA_CALLBACK_URL`: Required if `DARAJA_MOCK=false`.

### 3. Netlify Blobs setup
Netlify Blobs is configured automatically by the project. 
Ensure you have the Netlify Blobs feature enabled for your site. The app will read the token and configuration from the environment automatically at build time.

### 4. Build Configuration
Set up your build settings in Netlify:
- **Build command**: `npx prisma generate && next build`
- **Publish directory**: `.next`

### 5. Database Initialization
Before first launch, run migrations to set up your schema and seed catalog items:
```bash
# Push schema changes to your database
npx prisma db push

# Seed the default catalog items and Hollow & Hale branding
npm run db:seed
```
---

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

3. Spin up a local Postgres database, configure `.env.local` based on `.env.example`, then sync database:
   ```bash
   npx prisma db push
   npm run db:seed
   ```

4. Run local server:
   ```bash
   npm run dev
   ```