# Google Analytics Setup - Complete ✅

## Your Measurement ID
```
G-WHGJ1LV35B
```

## ✅ Local Setup (Done)
Added to `.env.local`:
```
NEXT_PUBLIC_GA_ID=G-WHGJ1LV35B
```

## 🔴 Vercel Setup (Required)

### Steps:
1. Go to [vercel.com](https://vercel.com) → Your project
2. Settings → Environment Variables
3. Add new variable:
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-WHGJ1LV35B`
   - **Environment**: Production, Preview, Development (select all)
4. **Redeploy** your site (or wait for next deployment)

### After Deployment:
1. Visit your live site
2. Open browser DevTools → Network tab
3. Look for requests to `googletagmanager.com` - you should see them!
4. Check Google Analytics → Realtime → You should see yourself as a visitor

## ✅ What's Already Implemented

The Analytics component matches Google's official snippet exactly:

**Google's Code:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-WHGJ1LV35B"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-WHGJ1LV35B');
</script>
```

**Our Implementation:**
- ✅ Uses Next.js `Script` component (better performance)
- ✅ Loads asynchronously (`strategy="afterInteractive"`)
- ✅ Same `gtag` configuration
- ✅ **Bonus**: Automatically tracks page views on route changes
- ✅ **Bonus**: Tracks course CTA clicks automatically

## 🎯 What Gets Tracked Automatically

1. **Page Views** - Every page visit
2. **Course CTA Clicks** - When users click "View Course →" buttons
3. **User Sessions** - Bounce rate, session duration
4. **Traffic Sources** - Where visitors come from
5. **Device/Browser Info** - Mobile vs desktop, etc.

## 📊 View Your Data

1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your property
3. Check **Realtime** → See current visitors
4. Check **Reports** → See historical data (after 24-48 hours)

## 🔍 Testing

### Local Test:
```bash
npm run dev
# Visit http://localhost:3000
# Check browser console - should see no errors
# Check Network tab - should see gtag requests
```

### Production Test:
1. After Vercel deployment, visit your live site
2. Open DevTools → Network tab
3. Filter by "gtag" or "googletagmanager"
4. You should see requests being made
5. Check GA4 Realtime view - you should appear as a visitor

## 🐛 Troubleshooting

**Not seeing data?**
- Wait 24-48 hours for data to appear in reports (Realtime works immediately)
- Check Vercel environment variable is set correctly
- Check browser console for errors
- Verify ad blockers aren't blocking GA (try incognito mode)

**Want to test events?**
- Click a course CTA button
- Check GA4 → Realtime → Events
- Should see `course_cta_click` event

## ✅ Status

- ✅ Analytics component created
- ✅ Local env variable set
- ⏳ **Next**: Add to Vercel and redeploy

