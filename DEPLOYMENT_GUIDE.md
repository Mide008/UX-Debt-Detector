# 🚀 Complete Deployment Guide

## Table of Contents

1. [Local Development](#local-development)
2. [Push to GitHub](#push-to-github)
3. [Deploy to Vercel](#deploy-to-vercel)
4. [Custom Domain Setup](#custom-domain-setup)
5. [Post-Deployment](#post-deployment)

---

## Local Development

### Step 1: Install Dependencies

```bash
cd ux-debt-detector-v4
npm install
```

Expected output:
```
added 423 packages in 45s
```

### Step 2: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

You should see:
- Hero section with animated gradient
- Features grid
- Analyzer form
- Pricing section
- Footer

### Step 3: Test the Analyzer

1. Scroll to "Analyze Your Product"
2. Fill in the form:
   - Product URL: `https://linear.app`
   - Industry: `SaaS`
   - Stage: `Series B`
3. Click "Analyze My Product"
4. Wait 2-3 seconds
5. Verify results display with:
   - Score breakdown (bar chart)
   - Scoring methodology
   - Financial impact
   - Top blockers with practitioner notes
   - Quick wins
   - Roadmap

### Step 4: Test Exports

1. After analysis completes
2. Click "Download PDF"
   - PDF should download
   - Open to verify all sections
3. Click "Export CSV"
   - CSV should download
   - Open in Excel to verify data

### Step 5: Check Responsive Design

1. Open Chrome DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Test these sizes:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

---

## Push to GitHub

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `ux-debt-detector`
3. Description: `Professional UX debt analysis tool`
4. Choose: **Public** (or Private if you prefer)
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Initialize Git (if not already done)

```bash
cd ux-debt-detector-v4

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - UX Debt Detector V4"
```

### Step 3: Connect to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/ux-debt-detector.git

# Verify remote
git remote -v
```

Should show:
```
origin  https://github.com/YOUR_USERNAME/ux-debt-detector.git (fetch)
origin  https://github.com/YOUR_USERNAME/ux-debt-detector.git (push)
```

### Step 4: Push to GitHub

```bash
# Push to main branch
git push -u origin main
```

If you get an error about `master` vs `main`:
```bash
git branch -M main
git push -u origin main
```

### Step 5: Verify on GitHub

1. Visit `https://github.com/YOUR_USERNAME/ux-debt-detector`
2. You should see all your files
3. README.md should display on the homepage

---

## Deploy to Vercel

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### Step 2: Import Project

1. Click "Add New..."
2. Select "Project"
3. Find your repository: `ux-debt-detector`
4. Click "Import"

### Step 3: Configure Project

Vercel will auto-detect Next.js. You should see:

```
Framework Preset: Next.js
Build Command: next build
Output Directory: (leave empty)
Install Command: npm install
```

**DO NOT CHANGE THESE**. Just click "Deploy".

### Step 4: Wait for Deployment

You'll see:
```
Building...
▲ Initializing build
▲ Installing dependencies
▲ Building application
▲ Deployment Ready
```

This takes 2-3 minutes.

### Step 5: Visit Your Site

Vercel will give you a URL like:
```
https://ux-debt-detector-abc123.vercel.app
```

Click it to see your live site!

### Step 6: Test Live Site

1. Fill out the analyzer form
2. Submit analysis
3. Verify results display
4. Download PDF (should work)
5. Download CSV (should work)
6. Test on mobile device

---

## Custom Domain Setup

### Option A: Use Vercel Domain (Free)

Your site is already live at:
```
https://ux-debt-detector-abc123.vercel.app
```

You can customize the subdomain:
1. Go to Vercel dashboard
2. Click your project
3. Go to "Settings" → "Domains"
4. Edit the Vercel domain

### Option B: Use Custom Domain

#### Step 1: Buy a Domain

From providers like:
- Namecheap (~$10/year)
- Google Domains (~$12/year)
- GoDaddy (~$15/year)

Good domain ideas:
- `uxdebtdetector.com`
- `uxdebt.io`
- `analyzeuxdebt.com`

#### Step 2: Add Domain to Vercel

1. Vercel Dashboard → Your Project
2. Settings → Domains
3. Click "Add"
4. Enter your domain: `yourdomain.com`
5. Click "Add"

#### Step 3: Configure DNS

Vercel will show you DNS records to add:

**For Namecheap:**
1. Log in to Namecheap
2. Domain List → Manage
3. Advanced DNS
4. Add these records:

```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic

Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

**For other providers**, follow Vercel's instructions.

#### Step 4: Wait for DNS Propagation

- Usually takes 5-30 minutes
- Can take up to 48 hours
- Check status at [whatsmydns.net](https://whatsmydns.net)

#### Step 5: Enable HTTPS

Vercel automatically provisions SSL certificate.

Wait 5 minutes, then visit:
```
https://yourdomain.com
```

Should show your site with 🔒 lock icon!

---

## Post-Deployment

### Set Up Analytics

#### Google Analytics (Free)

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (like `G-XXXXXXXXXX`)
3. Add to `app/layout.tsx`:

```tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

4. Commit and push:
```bash
git add .
git commit -m "Add Google Analytics"
git push
```

Vercel auto-deploys in ~2 minutes.

### Monitor Performance

#### Vercel Analytics (Free)

1. Vercel Dashboard → Your Project
2. Analytics tab
3. Enable Vercel Analytics
4. See real-time visitors, page views, etc.

#### Sentry Error Tracking (Optional)

1. Create account at [sentry.io](https://sentry.io)
2. Install SDK:
```bash
npm install @sentry/nextjs
```

3. Initialize:
```bash
npx @sentry/wizard@latest -i nextjs
```

Follow prompts.

### Set Up Email Notifications

For form submissions or analysis completions:

1. Use [Resend](https://resend.com) (free tier: 3K emails/month)
2. Install:
```bash
npm install resend
```

3. Create `app/api/notify/route.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, productUrl } = await request.json();
  
  await resend.emails.send({
    from: 'onboarding@yourdomain.com',
    to: email,
    subject: 'Your UX Debt Report is Ready!',
    html: '<p>Thanks for using UX Debt Detector...</p>'
  });
  
  return Response.json({ success: true });
}
```

4. Add API key to Vercel:
   - Settings → Environment Variables
   - Add `RESEND_API_KEY`
   - Redeploy

---

## Continuous Deployment

Every time you push to GitHub, Vercel auto-deploys:

```bash
# Make changes to your code
git add .
git commit -m "Update feature X"
git push

# Vercel automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys to production
# 4. Updates your live site
```

---

## Troubleshooting

### Build Fails on Vercel

**Error**: `Type error: Cannot find module`

**Fix**: Check all imports use correct paths:
```typescript
// Correct
import { Button } from "@/components/ui/button"

// Wrong
import { Button } from "../components/ui/button"
```

### Site Loads But Features Don't Work

**Error**: API routes returning 404

**Fix**: API routes must be in `app/api/` directory. Check:
```
app/api/analyze/route.ts
app/api/generate-pdf/route.ts
app/api/generate-csv/route.ts
```

### PDF Download Fails in Production

**Error**: `jsPDF is not defined`

**Fix**: Check `lib/pdf-generator.ts` imports:
```typescript
import { jsPDF } from 'jspdf';  // Correct
// NOT: import jsPDF from 'jspdf';
```

### Recharts Not Rendering

**Error**: Blank chart area

**Fix**: Ensure Recharts is in dependencies:
```bash
npm install recharts
git add package.json package-lock.json
git commit -m "Add recharts dependency"
git push
```

---

## Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] No API keys in code
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CSP headers (optional, for advanced users)
- [ ] Rate limiting on API routes (optional)

---

## Performance Optimization

### Image Optimization

Use Next.js Image component:
```tsx
import Image from 'next/image'

<Image src="/logo.png" width={200} height={50} alt="Logo" />
```

### Font Optimization

Already using Google Fonts with `next/font`. No action needed.

### Bundle Size

Check bundle size:
```bash
npm run build
```

Look for "First Load JS shared by all" - should be < 100kB.

---

## Cost Breakdown

### Free Tier (for first 100+ customers)

- **Vercel**: Free for hobby projects
  - Unlimited deployments
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Edge functions

- **Total Monthly Cost**: $0

### Paid Tier (after growth)

- **Vercel Pro**: $20/month
  - 1TB bandwidth
  - Priority support
  - Advanced analytics

- **Domain**: $10-15/year

- **Email (Resend)**: $20/month
  - 100K emails/month

- **Total**: ~$35-40/month

---

## What's Next?

1. ✅ **Launch MVP** (you're here!)
2. Share on:
   - Product Hunt
   - Indie Hackers
   - Twitter/X
   - Reddit (r/SaaS, r/entrepreneur)

3. Get first 10 users
4. Collect feedback
5. Iterate on features
6. Add payment (Stripe)
7. Scale to $10K MRR

---

## Support

- **Documentation**: See README.md
- **Issues**: GitHub Issues
- **Community**: (add Discord/Slack link)

---

**Congratulations! Your app is now LIVE! 🎉**

Visit your site and share it with the world!
