# MANUAL DEPLOYMENT GUIDE

## Prerequisites
Git must be installed. If not:
- Download: https://git-scm.com/download/win
- OR use GitHub Desktop: https://desktop.github.com/

## Step-by-Step Deployment

### Option 1: Command Line (PowerShell/Git Bash)

```powershell
# 1. Navigate to project
cd C:\Users\gamin\.gemini\antigravity\scratch\cat-agentic-engine

# 2. Initialize Git
git init

# 3. Stage all files
git add .

# 4. Create initial commit
git commit -m "feat: Core Design Lock v2.0 - DO CRACK Platform"

# 5. Rename branch to main
git branch -M main

# 6. Add remote repository
git remote add origin https://github.com/sandeepksp-prog/CATPREP.git

# 7. Push to GitHub
git push -u origin main --force
```

### Option 2: GitHub Desktop (Easiest)

1. Open GitHub Desktop
2. File → Add Local Repository
3. Choose: `C:\Users\gamin\.gemini\antigravity\scratch\cat-agentic-engine`
4. Create commit: "Core Design Lock v2.0"
5. Publish repository to: `sandeepksp-prog/CATPREP`

## Verifying Upload

Visit: https://github.com/sandeepksp-prog/CATPREP

You should see:
- README.md with badges
- backend/ folder
- frontend/ folder
- start_engine.py

## Next: Vercel Deployment (Frontend Only)

```bash
cd frontend
npm install
npm run build

# Then deploy 'dist' folder to Vercel
```

---

**Note**: The `.gitignore` file will exclude node_modules and sensitive files automatically.
