# Sentry Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create Sentry Account
1. Go to [sentry.io](https://sentry.io)
2. Sign up (free tier available)
3. Create a new project
4. Select **Next.js** as platform

### Step 2: Get DSN
1. After creating project, you'll see your **DSN**
2. It looks like: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`
3. Copy it

### Step 3: Add to Environment Variables

**Local (.env.local)**:
```env
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

**Vercel**:
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add:
   - `SENTRY_DSN` = your DSN
   - `NEXT_PUBLIC_SENTRY_DSN` = your DSN (same value)

### Step 4: Run Sentry Wizard

```bash
npx @sentry/wizard@latest -i nextjs
```

When prompted:
- Sentry SaaS: **Yes**
- Already have account: **Yes**
- Login in browser when it opens
- Follow prompts

The wizard will:
- Create `sentry.client.config.ts`
- Create `sentry.server.config.ts`
- Create `sentry.edge.config.ts`
- Update `next.config.js`
- Add environment variables to `.env.local`

### Step 5: Test It

Create a test error page:

```typescript
// app/test-error/page.tsx
export default function TestError() {
  throw new Error("Test error for Sentry");
  return <div>This won't render</div>;
}
```

Visit `/test-error` - you should see the error in Sentry dashboard within seconds.

### Step 6: Deploy

After setup, commit and push. Sentry will automatically track errors in production.

---

## Manual Setup (If Wizard Fails)

If the wizard doesn't work, you can set it up manually:

1. Create the config files (see Sentry docs)
2. Add DSN to environment variables
3. Update `next.config.js` with Sentry webpack plugin

But the wizard is much easier - try that first!

---

## What Gets Tracked

- ✅ JavaScript errors
- ✅ Unhandled promise rejections
- ✅ API route errors
- ✅ Server-side errors
- ✅ Performance monitoring (optional)

---

## Free Tier Limits

- 5,000 errors/month
- 10,000 performance units/month
- Perfect for getting started!

