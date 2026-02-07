# 🎯 UX Debt Detector V4 - Professional Edition

> Get transparent UX debt scores with practitioner notes and specific actions. Know exactly what to fix and why it matters.

## ✨ Features

- **3-Layer Transparent Scoring** - Deterministic checks + Heuristic evaluation + Industry patterns
- **Practitioner Notes** - Real experience from shipping products
- **Specific Actions** - Copy-paste ready tasks for your team
- **Financial Impact Analysis** - See what UX debt costs you in revenue
- **Visual Reports** - Score breakdowns, charts, and professional PDFs
- **Export Everything** - Download PDFs and CSVs

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ux-debt-detector-v4

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 📁 Project Structure

```
ux-debt-detector-v4/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts          # Main analysis API
│   │   ├── generate-pdf/route.ts     # PDF export
│   │   └── generate-csv/route.ts     # CSV export
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page
├── components/
│   ├── sections/
│   │   ├── hero.tsx                  # Hero section
│   │   ├── features.tsx              # Features grid
│   │   ├── analyzer.tsx              # Analysis form
│   │   ├── results.tsx               # Results display
│   │   ├── pricing.tsx               # Pricing tiers
│   │   └── footer.tsx                # Footer
│   └── ui/
│       ├── button.tsx                # Button component
│       ├── card.tsx                  # Card component
│       ├── input.tsx                 # Input component
│       └── label.tsx                 # Label component
├── lib/
│   ├── analysis-engine.ts            # V4 Analysis logic
│   ├── pdf-generator.ts              # PDF generation
│   └── utils.ts                      # Utility functions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Charts**: Recharts
- **PDF**: jsPDF

## 📊 How It Works

1. **User Input**: Product URL, industry, and stage
2. **3-Layer Analysis**:
   - Deterministic Checks (23 automated rules)
   - Heuristic Evaluation (Nielsen's 10 principles)
   - Industry Pattern Matching (SaaS/E-commerce/etc.)
3. **Score Calculation**: Weighted average across 5 categories
4. **Issue Generation**: Practitioner notes + specific actions
5. **Export Options**: Professional PDF + CSV for project management

## 🎨 Customization

### Update Branding

Edit `app/globals.css` to change colors:

```css
:root {
  --primary: 217.2 91.2% 59.8%;  /* Purple */
  --accent: 217.2 32.6% 17.5%;   /* Pink */
}
```

### Modify Analysis Logic

Edit `lib/analysis-engine.ts` to adjust:
- Scoring weights
- Issue detection
- Financial calculations
- Practitioner notes

### Add More Industries

In `components/sections/analyzer.tsx`, add to the industry dropdown:

```tsx
<option value="your-industry">Your Industry</option>
```

Then update `lib/analysis-engine.ts` to handle industry-specific patterns.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

That's it! Vercel auto-deploys from main branch.

### Environment Variables

No environment variables needed for basic functionality.

Optional (for future features):
```bash
# .env.local
LIGHTHOUSE_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here  # For GPT-4 Vision
```

## 📈 Analytics & Monitoring

Add analytics in `app/layout.tsx`:

```tsx
import Script from 'next/script'

<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
```

## 🧪 Testing

Run the development server and test:

1. **Form Validation**
   - Try invalid URLs
   - Leave fields empty
   - Submit valid data

2. **Analysis Results**
   - Check all sections render
   - Verify charts display
   - Test PDF/CSV downloads

3. **Responsive Design**
   - Test on mobile (375px)
   - Test on tablet (768px)
   - Test on desktop (1920px)

## 🐛 Troubleshooting

### "Module not found" errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
npm run build
```

Fix any type errors that appear.

### Charts not rendering

Make sure Recharts is installed:
```bash
npm install recharts
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)

## 🎯 Roadmap

- [ ] Lighthouse integration for real performance data
- [ ] GPT-4 Vision for screenshot analysis
- [ ] User authentication
- [ ] Payment integration (Stripe)
- [ ] Email delivery
- [ ] SaaS subscription plans

## 💰 Monetization

This is a complete, production-ready application. You can:

1. **Sell Reports** ($147-$2,497 per audit)
2. **SaaS Model** ($197-$497/month)
3. **Consulting Services** (implementation support)

## 📝 License

MIT License - feel free to use this for commercial projects!

## 🙏 Credits

Built with love using Next.js, Tailwind, and TypeScript.

---

**Questions?** Open an issue or reach out!

**Ready to launch?** Follow the deployment guide below! 👇
