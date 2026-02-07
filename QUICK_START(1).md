# ⚡ Quick Start Guide - 10 Minutes to Launch

## 🎯 Goal
Get your UX Debt Detector running locally, then deploy to production.

## ✅ Prerequisites
- Node.js 18+ installed ([download here](https://nodejs.org))
- GitHub account
- 10 minutes of your time

---

## 📥 Step 1: Get the Code (1 min)

```bash
# Navigate to project directory
cd ux-debt-detector-v4

# Verify you have all files
ls -la
```

You should see:
- `app/` directory
- `components/` directory
- `lib/` directory  
- `package.json`
- `README.md`

---

## 📦 Step 2: Install Dependencies (2 min)

```bash
npm install
```

Wait for:
```
added 423 packages in 45s
```

---

## 🚀 Step 3: Run Locally (1 min)

```bash
npm run dev
```

You'll see:
```
▲ Next.js 14.2.3
- Local: http://localhost:3000
✓ Ready in 2.3s
```

**Open browser**: `http://localhost:3000`

---

## ✅ Step 4: Test It Works (2 min)

### Test the Analyzer:

1. Scroll to "Analyze Your Product"
2. Fill in:
   - URL: `https://linear.app`
   - Industry: `SaaS`
   - Stage: `Series B`
3. Click "Analyze My Product"
4. Wait 2 seconds
5. ✅ **Success if you see**:
   - Score breakdown with chart
   - Financial impact details
   - Issues with practitioner notes

### Test Exports:

1. Click "Download PDF" → PDF should download
2. Click "Export CSV" → CSV should download
3. ✅ **Success if both files download**

---

## 🌐 Step 5: Push to GitHub (2 min)

### Create Repository:
1. Go to [github.com/new](https://github.com/new)
2. Name: `ux-debt-detector`
3. Public or Private (your choice)
4. **Don't** initialize with README
5. Click "Create repository"

### Push Code:

```bash
# Initialize git (if needed)
git init

# Add files
git add .

# Commit
git commit -m "Initial commit - UX Debt Detector V4"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ux-debt-detector.git

# Push
git branch -M main
git push -u origin main
```

✅ **Success**: Visit GitHub repo and see your files

---

## 🚀 Step 6: Deploy to Vercel (2 min)

### Deploy:

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Select your repo: `ux-debt-detector`
5. Click "Deploy" (don't change any settings)

### Wait for Build:
```
⠋ Building...
⠙ Building...
⠹ Building...
✓ Deployment Ready!
```

### Visit Live Site:
Click the URL Vercel gives you (like `https://ux-debt-detector-abc.vercel.app`)

✅ **Success**: Your site is live!

---

## 🎉 You're Done!

Your app is now:
- ✅ Running locally
- ✅ On GitHub
- ✅ Deployed to production
- ✅ Accessible worldwide

---

## 🔄 Making Changes

```bash
# 1. Edit code
# 2. Test locally
npm run dev

# 3. Push to GitHub
git add .
git commit -m "Your change"
git push

# 4. Vercel auto-deploys in ~2 minutes
```

---

## 🐛 Troubleshooting

### "Cannot find module" error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Build fails on Vercel
- Check Vercel build logs
- Ensure all files pushed to GitHub
- Check `package.json` dependencies

### API routes return 404
- Verify files in `app/api/` directory
- Check file names: `route.ts` not `route.tsx`

---

## 📚 Next Steps

1. **Read Full Guides**:
   - `README.md` - Features & customization
   - `DEPLOYMENT_GUIDE.md` - Advanced deployment

2. **Customize**:
   - Update colors in `app/globals.css`
   - Modify analysis in `lib/analysis-engine.ts`
   - Add your branding

3. **Launch**:
   - Share on social media
   - Post on Product Hunt
   - Get your first users!

---

## 💪 You've Got This!

Your UX Debt Detector is production-ready and live.

Now go get some users! 🚀

---

**Questions?** Check:
- `README.md` for features
- `DEPLOYMENT_GUIDE.md` for detailed deployment
- GitHub Issues for help
