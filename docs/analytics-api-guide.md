# Google Analytics API & CLI Access Guide

## Available APIs

### 1. Google Analytics Data API (GA4)
**Purpose**: Read analytics data (reports, metrics, dimensions)

**Use Cases**:
- Get page views, sessions, bounce rate
- Export data to your own dashboard
- Build custom reports
- Automate reporting

### 2. Google Analytics Admin API
**Purpose**: Manage GA4 properties, accounts, data streams

**Use Cases**:
- Create/manage properties programmatically
- Manage data streams
- Configure settings

### 3. Google Analytics Reporting API (Universal Analytics - Deprecated)
**Note**: Universal Analytics is deprecated. Use GA4 Data API instead.

---

## Setup: Google Analytics Data API

### Step 1: Enable API in Google Cloud

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create/Select a project
3. Enable **Google Analytics Data API**:
   - APIs & Services → Enable APIs
   - Search "Google Analytics Data API"
   - Click "Enable"

### Step 2: Create Service Account

1. APIs & Services → Credentials
2. Create Credentials → Service Account
3. Name it (e.g., "analytics-reader")
4. Grant role: **Viewer** (read-only access)
5. Click "Done"

### Step 3: Create Key

1. Click on the service account
2. Keys tab → Add Key → Create new key
3. Choose **JSON**
4. Download the JSON file (keep it secret!)

### Step 4: Grant Access in GA4

1. Go to [analytics.google.com](https://analytics.google.com)
2. Admin → Property Access Management
3. Add users → Enter service account email (from JSON file)
4. Role: **Viewer**

### Step 5: Get Property ID

1. GA4 → Admin → Property Settings
2. Copy **Property ID** (format: `123456789`)

---

## Installation

```bash
npm install @google-analytics/data
```

---

## Basic Usage Examples

### Example 1: Get Page Views (Last 7 Days)

**File**: `scripts/getAnalytics.ts`

```typescript
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import * as path from 'path';
import { config } from 'dotenv';

config({ path: path.join(process.cwd(), '.env.local') });

// Initialize client
const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: path.join(process.cwd(), 'ga-service-account.json'), // Path to your JSON key
  // OR use environment variable:
  // credentials: JSON.parse(process.env.GA_SERVICE_ACCOUNT_JSON || '{}'),
});

const PROPERTY_ID = process.env.GA_PROPERTY_ID || 'YOUR_PROPERTY_ID';

async function getPageViews() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews',
        },
      ],
    });

    console.log('Page Views (Last 7 Days):');
    response.rows?.forEach((row) => {
      const path = row.dimensionValues?.[0]?.value || 'unknown';
      const views = row.metricValues?.[0]?.value || '0';
      console.log(`${path}: ${views} views`);
    });

    // Total views
    const totalViews = response.rows?.reduce((sum, row) => {
      return sum + parseInt(row.metricValues?.[0]?.value || '0', 10);
    }, 0);
    console.log(`\nTotal: ${totalViews} views`);
  } catch (error) {
    console.error('Error fetching analytics:', error);
  }
}

getPageViews();
```

### Example 2: Get Real-time Active Users

```typescript
async function getRealtimeUsers() {
  try {
    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${PROPERTY_ID}`,
      dimensions: [
        {
          name: 'country',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });

    console.log('Real-time Active Users:', response.rows?.[0]?.metricValues?.[0]?.value || '0');
  } catch (error) {
    console.error('Error fetching realtime data:', error);
  }
}
```

### Example 3: Get Top Pages

```typescript
async function getTopPages(days: number = 30) {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: `${days}daysAgo`,
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'pagePath',
        },
        {
          name: 'pageTitle',
        },
      ],
      metrics: [
        {
          name: 'screenPageViews',
        },
        {
          name: 'averageSessionDuration',
        },
      ],
      orderBys: [
        {
          metric: {
            metricName: 'screenPageViews',
          },
          desc: true,
        },
      ],
      limit: 10,
    });

    console.log(`\nTop 10 Pages (Last ${days} days):`);
    response.rows?.forEach((row, index) => {
      const path = row.dimensionValues?.[0]?.value || 'unknown';
      const title = row.dimensionValues?.[1]?.value || 'unknown';
      const views = row.metricValues?.[0]?.value || '0';
      const duration = row.metricValues?.[1]?.value || '0';
      console.log(`${index + 1}. ${title}`);
      console.log(`   Path: ${path}`);
      console.log(`   Views: ${views} | Avg Duration: ${Math.round(parseFloat(duration))}s\n`);
    });
  } catch (error) {
    console.error('Error fetching top pages:', error);
  }
}
```

### Example 4: Get Course CTA Click Events

```typescript
async function getCTAClicks() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'eventName',
        },
        {
          name: 'customEvent:course_id', // Custom dimension for course_id
        },
      ],
      metrics: [
        {
          name: 'eventCount',
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            matchType: 'EXACT',
            value: 'course_cta_click',
          },
        },
      },
    });

    console.log('Course CTA Clicks (Last 30 Days):');
    response.rows?.forEach((row) => {
      const courseId = row.dimensionValues?.[1]?.value || 'unknown';
      const clicks = row.metricValues?.[0]?.value || '0';
      console.log(`${courseId}: ${clicks} clicks`);
    });
  } catch (error) {
    console.error('Error fetching CTA clicks:', error);
  }
}
```

---

## CLI Tool Setup

### Option 1: Create NPM Scripts

**File**: `package.json`

```json
{
  "scripts": {
    "analytics:views": "tsx scripts/analytics/getPageViews.ts",
    "analytics:realtime": "tsx scripts/analytics/getRealtime.ts",
    "analytics:top-pages": "tsx scripts/analytics/getTopPages.ts",
    "analytics:cta-clicks": "tsx scripts/analytics/getCTAClicks.ts"
  }
}
```

**Usage**:
```bash
npm run analytics:views
npm run analytics:realtime
npm run analytics:top-pages
npm run analytics:cta-clicks
```

### Option 2: Use Google Analytics CLI (gapi)

There's a community CLI tool, but it's easier to build your own with the examples above.

---

## Environment Variables

Add to `.env.local`:

```env
GA_PROPERTY_ID=123456789
GA_SERVICE_ACCOUNT_JSON={"type":"service_account",...}  # Optional: inline JSON
```

**OR** store the service account JSON file:
- Path: `ga-service-account.json` (add to `.gitignore`!)
- Reference in code: `keyFilename: path.join(process.cwd(), 'ga-service-account.json')`

---

## Security Best Practices

1. **Never commit service account JSON to git**
   - Add to `.gitignore`: `ga-service-account.json`
   - Use environment variables or secure secret storage

2. **Use least privilege**
   - Service account should only have **Viewer** role

3. **Rotate keys regularly**
   - Google Cloud → Service Accounts → Keys → Rotate

4. **For production**:
   - Use Vercel Environment Variables
   - Or use Google Cloud Secret Manager

---

## Common Metrics & Dimensions

### Metrics (What you measure)
- `screenPageViews` - Page views
- `activeUsers` - Active users
- `sessions` - Sessions
- `bounceRate` - Bounce rate
- `averageSessionDuration` - Avg session time
- `eventCount` - Event count
- `conversions` - Conversions

### Dimensions (How you segment)
- `pagePath` - URL path
- `pageTitle` - Page title
- `country` - Country
- `city` - City
- `deviceCategory` - Device type
- `sessionSource` - Traffic source
- `eventName` - Event name

---

## Advanced: Custom Dashboard API

You can build a custom dashboard that calls the API:

```typescript
// app/api/analytics/route.ts
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export async function GET() {
  // Initialize client
  const client = new BetaAnalyticsDataClient({
    keyFilename: process.env.GA_KEY_FILE,
  });

  const [response] = await client.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    metrics: [{ name: 'screenPageViews' }],
  });

  return Response.json({
    views: response.rows?.[0]?.metricValues?.[0]?.value || '0',
  });
}
```

Then call from your frontend:
```typescript
const response = await fetch('/api/analytics');
const data = await response.json();
console.log('Page views:', data.views);
```

---

## Troubleshooting

**Error: "Permission denied"**
- Check service account has Viewer role in GA4
- Verify property ID is correct

**Error: "API not enabled"**
- Enable Google Analytics Data API in Google Cloud Console

**Error: "Invalid credentials"**
- Verify JSON key file path
- Check JSON file is valid

---

## Resources

- [GA4 Data API Docs](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Node.js Client Library](https://github.com/googleapis/google-api-nodejs-client)
- [API Explorer](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport)

