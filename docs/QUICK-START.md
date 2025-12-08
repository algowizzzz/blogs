# Quick Start: Pre-Launch Setup

## 🚀 Critical Features Implemented

✅ **RSS Feed** - Available at `/rss`
✅ **404 Page** - Custom not-found page
✅ **Canonical URLs** - Added to all posts
✅ **Security Headers** - Configured in `next.config.js`
✅ **Analytics Ready** - Component created (needs GA ID)

---

## 📋 Setup Steps

### 1. Google Analytics (5 minutes)

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create account → Create property → Get Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Redeploy - Analytics will start tracking automatically

**What it tracks:**
- Page views (automatic)
- Course CTA clicks (automatic)
- User sessions, bounce rate, etc.

---

### 2. Google Search Console (10 minutes)

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → Enter your domain
3. Verify ownership:
   - **DNS method** (recommended): Add TXT record to your domain
   - **HTML file**: Download file, add to `public/` folder
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`
5. Wait 24-48 hours for indexing

**Monitor:**
- Index coverage (should see all posts)
- Search performance (after some traffic)
- Core Web Vitals

---

### 3. Test Everything

**RSS Feed:**
```bash
curl https://yourdomain.com/rss
# Or visit in browser
```

**404 Page:**
```bash
# Visit any non-existent URL
https://yourdomain.com/this-does-not-exist
```

**Canonical URLs:**
```bash
# View page source, look for:
# <link rel="canonical" href="...">
```

**Security Headers:**
- Visit [securityheaders.com](https://securityheaders.com)
- Enter your domain
- Should see A or A+ rating

---

## 🎯 Next Steps (Optional but Recommended)

### Related Posts
- Increases engagement
- Reduces bounce rate
- See `docs/implementation-guide.md` for code

### Breadcrumbs
- Better navigation
- SEO benefit
- See `docs/implementation-guide.md` for code

### Image Optimization
- Currently using regular `<img>` tags
- Can upgrade to Next.js `Image` component
- See `docs/implementation-guide.md` for code

### Error Tracking (Sentry)
- Catch errors before users report
- Free tier available
- See `docs/implementation-guide.md` for setup

---

## 📊 Success Metrics

After 1 week, check:

**Google Analytics:**
- Daily visitors
- Bounce rate (target: < 60%)
- Average session duration (target: > 2 min)
- Pages per session (target: > 2)

**Google Search Console:**
- Indexed pages count
- Search impressions
- Average position
- Click-through rate

---

## 🔧 Troubleshooting

**Analytics not working?**
- Check `NEXT_PUBLIC_GA_ID` is set in Vercel
- Verify it starts with `G-`
- Check browser console for errors
- Use GA4 DebugView to test

**RSS feed not validating?**
- Check [validator.w3.org/feed](https://validator.w3.org/feed)
- Ensure all posts have `published_at` dates
- Check for special characters in titles/excerpts

**Search Console not indexing?**
- Wait 24-48 hours after sitemap submission
- Check for crawl errors
- Ensure `robots.txt` allows crawling
- Verify sitemap is accessible

---

## 📝 Environment Variables Checklist

Make sure these are set in Vercel:

```
✅ GHOST_API_URL
✅ GHOST_CONTENT_KEY
✅ GHOST_ADMIN_URL (if using publish script)
✅ GHOST_ADMIN_API_KEY (if using publish script)
✅ NEXT_PUBLIC_SITE_URL
⏳ NEXT_PUBLIC_GA_ID (add this)
```

---

## 🎉 You're Ready!

Once you've:
1. ✅ Set up Google Analytics
2. ✅ Set up Google Search Console
3. ✅ Tested RSS feed
4. ✅ Tested 404 page

**You're ready to start publishing content!**

The technical foundation is solid. Focus on:
- Quality content
- Consistent publishing schedule
- Keyword research
- Building backlinks
- Social media promotion

