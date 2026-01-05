# Shivam Narthanalayam - Project Context for Claude

## 🎯 Project Overview
**Website:** https://shivamnarthanalayam.com
**Purpose:** Bharatanatyam Dance Academy website with AI chatbot for lead generation
**Owner:** Shruthi Sekar (Teacher), Shivam Vijay Balaji (Developer)
**Contact:** +91-9600025105, shivam@narthanalayam.in

---

## 🏗️ Tech Stack
- **Framework:** SvelteKit v2.49.1 (TypeScript, Svelte 5.45.6)
- **Styling:** Tailwind CSS 4.1.18
- **Build Tool:** Vite 7.2.6
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenAI GPT-4 API
- **Email:** Resend (API key placeholder - not configured)
- **Deployment:** Docker on Hostinger VPS
- **Web Server:** Nginx (reverse proxy to Docker)

---

## 📁 Project Structure

```
shivamnarthanalayam/
├── src/
│   ├── routes/
│   │   ├── api/
│   │   │   ├── chatbot/+server.ts      # AI chatbot API endpoint
│   │   │   └── contact/+server.ts      # Contact form API endpoint
│   │   ├── +layout.svelte              # Global layout (includes ChatBot)
│   │   ├── +page.svelte                # Home page
│   │   ├── about/
│   │   ├── classes/
│   │   ├── contact/
│   │   └── gallery/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ChatBot.svelte          # AI chatbot widget (CRITICAL)
│   │   │   ├── ContactForm.svelte      # Contact form
│   │   │   ├── WhatsAppButton.svelte
│   │   │   └── layout/ + sections/
│   │   └── utils/
│   │       ├── supabase.ts             # Database operations (CRITICAL)
│   │       ├── openai.ts               # OpenAI integration
│   │       ├── email.ts                # Resend email service
│   │       └── validation.ts
│   └── app.css                         # Global styles
├── supabase/
│   └── migrations/
│       ├── 001_create_contacts_table.sql
│       ├── 002_create_enquiries_table.sql  # Main table for leads
│       └── 003_add_enquiries_policies.sql   # RLS policies
├── Dockerfile                          # Multi-stage Docker build
├── docker-compose.yml                  # Docker Compose config
├── .env                                # Environment variables (CRITICAL)
├── package.json
├── svelte.config.js
└── tsconfig.json
```

---

## 🗄️ Database Schema (Supabase)

### Table: `enquiries` (Main lead table)
```sql
- id (UUID, auto-generated)
- name (TEXT, required, 2-100 chars)
- email (TEXT, required, email format)
- phone (TEXT, optional, 10-20 chars)
- message (TEXT, optional, max 1000 chars)
- preferred_class_type (TEXT, optional, "offline" or "online")
- source (TEXT, 'chatbot' or 'contact_form')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

Indexes: created_at, email, source
RLS: Enabled (public INSERT, authenticated SELECT/UPDATE)
```

### Table: `contacts` (Legacy, still used by contact page)
```sql
- id (UUID, auto-generated)
- name (TEXT, required)
- email (TEXT, required)
- message (TEXT, required)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## 🔐 Environment Variables

**Location:** `D:\Shivam Narthanalayam\shivamnarthanalayam\.env`

**CRITICAL - All Required:**
```env
# Supabase (PUBLIC - available at build time)
PUBLIC_SUPABASE_URL=https://xwezofnczncozhxjbijr.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...RsDilT-B7P... (see .env file)

# OpenAI (PRIVATE - server-side only)
OPENAI_API_KEY=sk-proj-XXXXXXXX... (see .env file)

# Resend Email (PRIVATE - placeholder, not configured)
RESEND_API_KEY=re_your-resend-api-key-here (see .env file)
ADMIN_EMAIL=shivam@narthanalayam.in

# Site Config (PUBLIC)
PUBLIC_SITE_URL=https://shivamnarthanalayam.com
PUBLIC_SITE_NAME=Shivam Narthanalayam
PUBLIC_PHONE=+91-9600025105
PUBLIC_EMAIL=shivam@narthanalayam.in

**NOTE:** Full API keys are in the `.env` file (NOT committed to Git for security)
```

**⚠️ IMPORTANT:**
- `PUBLIC_*` vars must be available at BUILD TIME (Docker ARG + ENV)
- Private vars (OPENAI_API_KEY, etc.) also need BUILD TIME access for SvelteKit static imports
- See Dockerfile and docker-compose.yml for how these are passed

---

## 💻 Local Development

**Prerequisites:**
- Node.js 20+
- npm

**Setup:**
```bash
cd "D:\Shivam Narthanalayam\shivamnarthanalayam"
npm install
npm run dev
```

**Dev Server:** http://localhost:5173

**Build:**
```bash
npm run build
npm run preview  # Test production build locally
```

**Type Check:**
```bash
npm run check
```

---

## 🐳 Docker Deployment (Hostinger)

### Server Details
- **Host:** Hostinger VPS (srv1170791)
- **Server Path:** `/var/www/shivam_narthanalayam`
- **SSH Access:** `ssh root@srv1170791` (credentials not stored here)
- **Web Server:** Nginx (proxies to Docker container)
- **Container Port:** 3000
- **Nginx Config:** `/etc/nginx/sites-available/shivamnarthanalayam`

### Deployment Process (Step-by-Step)

**1. Local Changes:**
```bash
# Make code changes locally
cd "D:\Shivam Narthanalayam\shivamnarthanalayam"

# Test locally
npm run dev

# Commit and push
git add .
git commit -m "Description of changes"
git push origin main
```

**2. Server Deployment (SSH):**
```bash
# SSH into server
ssh root@srv1170791

# Navigate to project
cd /var/www/shivam_narthanalayam

# Pull latest code
git pull origin main

# Rebuild and restart Docker containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Verify
docker-compose ps
docker-compose logs --tail=100

# Exit SSH
exit
```

**One-Liner for Server Deployment:**
```bash
cd /var/www/shivam_narthanalayam && git pull origin main && docker-compose down && docker-compose build --no-cache && docker-compose up -d && docker-compose ps
```

### Nginx Configuration
**File:** `/etc/nginx/sites-available/shivamnarthanalayam`

**Key Config:**
```nginx
location / {
    proxy_pass http://localhost:3000;  # Must match Docker port
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

**Reload Nginx After Changes:**
```bash
nginx -t && systemctl reload nginx
```

---

## 🚨 Critical Fixes & Known Issues

### Fixed Issues (Jan 2026)
1. ✅ **Supabase Environment Variables:** Changed from `$env/dynamic/public` to `$env/static/public` in `supabase.ts`
2. ✅ **Docker Build Failures:** Added all env vars (public + private) as ARG and ENV in Dockerfile
3. ✅ **Empty Phone Validation:** Convert empty strings to `undefined` in both chatbot and contact APIs
4. ✅ **Form Validation:** Added comprehensive client-side validation with error messages
5. ✅ **Input Focus:** Chatbot input auto-focuses and refocuses after message send
6. ✅ **Nginx Port Mismatch:** Changed from 3001 to 3000

### Important Notes
- **Email Notifications:** Resend API not configured (placeholder key), emails won't send but app works
- **Environment Variables:** MUST be present on server in `.env` file at `/var/www/shivam_narthanalayam/.env`
- **Docker Build:** Requires ALL env vars (public + private) at build time, not just runtime
- **Phone Field:** Optional but if provided must be 10-20 chars, only numbers/+/-/()/spaces

---

## 🔑 Key Files to Check First

When debugging issues, check these files first:

1. **`src/lib/utils/supabase.ts`** - Database connection and operations
2. **`src/lib/components/ChatBot.svelte`** - Chatbot UI and validation
3. **`src/routes/api/chatbot/+server.ts`** - Chatbot backend API
4. **`Dockerfile`** - Docker build configuration (env vars!)
5. **`docker-compose.yml`** - Docker runtime config (env vars!)
6. **`.env`** - All environment variables (LOCAL)
7. **Server `.env`** at `/var/www/shivam_narthanalayam/.env` (PRODUCTION)

---

## 📊 Common Commands Quick Reference

### Local Development
```bash
npm run dev           # Start dev server (port 5173)
npm run build         # Build for production
npm run check         # TypeScript type checking
```

### Git Operations
```bash
git status            # Check changes
git add .             # Stage all changes
git commit -m "msg"   # Commit changes
git push origin main  # Push to GitHub
git log -1            # Show latest commit
```

### Docker (Server)
```bash
docker-compose ps                    # List containers
docker-compose logs --tail=100       # View logs
docker-compose down                  # Stop containers
docker-compose build --no-cache      # Rebuild image
docker-compose up -d                 # Start in background
docker exec -it <container> bash     # Shell into container
```

### Server Management
```bash
systemctl status nginx    # Check nginx status
nginx -t                  # Test nginx config
systemctl reload nginx    # Reload nginx
curl http://localhost:3000  # Test Docker app locally
```

---

## 🎓 Academy Information (for AI Chatbot)

**Teacher:** Shruthi Sekar
- 10+ years training, 5 years teaching
- Pandanallur Bani (Kalakshetra style)
- Abhinaya Rani Award 2006

**Classes:**
- **Offline Group Classes:** Mon/Wed or Tue/Thu, 4:30-6:30 PM, ₹800/month + ₹1000 admission
- **Online 1-to-1:** Flexible schedule, ₹1000/month (8 classes)
- **Location:** Little Millennium Play School, Pudur, Chennai 600053
- **Free Demo Class Available**

**Contact:**
- Phone/WhatsApp: +91-9600025105
- Email: shivam@narthanalayam.in

---

## 🔗 Important Links

- **Website:** https://shivamnarthanalayam.com
- **GitHub Repo:** https://github.com/shyamvijaybalaji/shivam_narthanalayam
- **Supabase Dashboard:** https://supabase.com/dashboard (Project: xwezofnczncozhxjbijr)
- **Hostinger Panel:** https://hpanel.hostinger.com

---

## 📝 Development Workflow Summary

1. **Make Changes Locally:** Edit code on Windows machine
2. **Test Locally:** `npm run dev` on localhost:5173
3. **Commit & Push:** Git commit and push to GitHub main branch
4. **Deploy to Server:** SSH → Pull → Docker rebuild → Verify
5. **Verify Production:** Test https://shivamnarthanalayam.com
6. **Check Database:** Verify data in Supabase dashboard

---

## ⚠️ BEFORE STARTING ANY WORK

**Always check:**
1. ✅ Local repo is up to date: `git pull origin main`
2. ✅ `.env` file exists and has all variables
3. ✅ Dependencies installed: `npm install`
4. ✅ Server is accessible (if deploying)
5. ✅ Current git branch is `main`

**Never:**
- ❌ Commit `.env` file to Git
- ❌ Share API keys publicly
- ❌ Deploy without testing locally first
- ❌ Modify server files directly (always use Git)

---

**Last Updated:** January 5, 2026
**Status:** ✅ Production Live and Fully Functional
**Version:** v1.0.0 (Post-Chatbot Integration)
