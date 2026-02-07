#!/bin/bash

# 🚀 UX Debt Detector V4 - Automated Installation Script
# Run this in your terminal to install everything automatically

echo "🎯 UX Debt Detector V4 - Automated Installer"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Please install Node.js from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Create project directory
PROJECT_NAME="ux-debt-detector-v4"
echo "📁 Creating project directory: $PROJECT_NAME"

if [ -d "$PROJECT_NAME" ]; then
    echo "⚠️  Directory already exists. Do you want to delete it? (y/n)"
    read -r response
    if [ "$response" = "y" ]; then
        rm -rf "$PROJECT_NAME"
        echo "🗑️  Removed existing directory"
    else
        echo "❌ Installation cancelled"
        exit 1
    fi
fi

mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME" || exit

echo "✅ Created directory"
echo ""

# Create directory structure
echo "📂 Creating directory structure..."
mkdir -p app/api/analyze
mkdir -p app/api/generate-pdf
mkdir -p app/api/generate-csv
mkdir -p components/ui
mkdir -p components/sections
mkdir -p lib
mkdir -p public

echo "✅ Directory structure created"
echo ""

# Create package.json
echo "📦 Creating package.json..."
cat > package.json << 'EOF'
{
  "name": "ux-debt-detector",
  "version": "4.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.51.4",
    "zod": "^3.23.8",
    "@hookform/resolvers": "^3.3.4",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0",
    "framer-motion": "^11.2.6",
    "lucide-react": "^0.379.0",
    "jspdf": "^2.5.1",
    "recharts": "^2.12.7",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20.12.12",
    "@types/react": "^18.3.2",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.5",
    "tailwindcss": "^3.4.3",
    "postcss": "^8.4.38",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.3"
  }
}
EOF

echo "✅ package.json created"
echo ""

# Install dependencies
echo "📥 Installing dependencies (this may take 1-2 minutes)..."
npm install --silent

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo ""

# Create all configuration files
echo "⚙️  Creating configuration files..."

# tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {"@/*": ["./*"]}
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = nextConfig
EOF

# tailwind.config.ts
cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {"2xl": "1400px"},
    },
    extend: {
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
EOF

# postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# .eslintrc.json
cat > .eslintrc.json << 'EOF'
{
  "extends": "next/core-web-vitals"
}
EOF

# .gitignore
cat > .gitignore << 'EOF'
node_modules
/.next/
/out/
.DS_Store
*.pem
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env*.local
.env
.vercel
*.tsbuildinfo
next-env.d.ts
EOF

echo "✅ Configuration files created"
echo ""

echo "🎉 Installation Complete!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Open VS Code in this directory:"
echo "   code ."
echo ""
echo "2. Download all component files from the chat"
echo "   (I'll provide download links next)"
echo ""
echo "3. Run the development server:"
echo "   npm run dev"
echo ""
echo "4. Visit: http://localhost:3000"
echo ""
echo "=============================================="
echo "✨ Your UX Debt Detector V4 is ready!"
echo "=============================================="
