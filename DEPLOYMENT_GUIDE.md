# Deployment Guide - Shivam Narthanalayam Website

Complete step-by-step guide to deploy your website to Vercel with Supabase backend.

## Prerequisites Checklist

- [ ] GitHub account
- [ ] Vercel account (sign up at [vercel.com](https://vercel.com))
- [ ] Supabase account (sign up at [supabase.com](https://supabase.com))
- [ ] Domain registrar access (for shivamnarthanalayam.com)
- [ ] All code changes committed to Git

---

## Part 1: Set Up Supabase (15 minutes)

### Step 1: Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in:
   - **Name**: shivamnarthanalayam
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Select closest to your target audience
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup to complete

### Step 2: Create Database Table

1. In your Supabase project, click **"SQL Editor"** in left sidebar
2. Click **"New query"**
3. Copy and paste the SQL from `supabase/migrations/001_create_contacts_table.sql`
4. Click **"Run"** (or press Ctrl+Enter)
5. Verify success message appears

### Step 3: Get API Credentials

1. Click **"Project Settings"** (gear icon in left sidebar)
2. Click **"API"** in settings menu
3. Copy these values (you'll need them later):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Long string starting with `eyJ...`

**IMPORTANT**: Keep these credentials secure!

### Step 4: Test Database (Optional)

1. Click **"Table Editor"** in left sidebar
2. Select **"contacts"** table
3. Click **"Insert row"**
4. Add test data:
   - name: Test User
   - email: test@example.com
   - message: Testing the contact form
5. Click **"Save"**
6. Verify row appears in table

---

## Part 2: Push Code to GitHub (5 minutes)

### If you haven't initialized Git yet:

```bash
cd shivamnarthanalayam
git init
git add .
git commit -m "Initial commit: SvelteKit landing page"
```

### Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **"New repository"**
3. Name: `shivamnarthanalayam-website`
4. Make it **Private** (recommended) or Public
5. **Don't** initialize with README (we already have one)
6. Click **"Create repository"**

### Push Code

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/shivamnarthanalayam-website.git

# Push code
git branch -M main
git push -u origin main
```

---

## Part 3: Deploy to Vercel (10 minutes)

### Step 1: Import Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import"** next to your GitHub repository
4. If you don't see it, click **"Adjust GitHub App Permissions"** and grant access

### Step 2: Configure Project

Vercel will auto-detect SvelteKit. Verify these settings:

- **Framework Preset**: SvelteKit
- **Root Directory**: ./
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.svelte-kit` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 3: Add Environment Variables

Click **"Environment Variables"** section and add:

| Name | Value |
|------|-------|
| `PUBLIC_SUPABASE_URL` | Your Supabase Project URL from Step 1.3 |
| `PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key from Step 1.3 |

**Important**:
- Click the toggle to make these available in all environments (Production, Preview, Development)
- Double-check for typos!

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll see: ✅ **Deployment ready**
4. Click **"Visit"** to see your site!

Your site is now live at: `https://your-project-name.vercel.app`

---

## Part 4: Connect Custom Domain (15 minutes)

### Step 1: Add Domain in Vercel

1. In Vercel dashboard, go to your project
2. Click **"Settings"** tab
3. Click **"Domains"** in left sidebar
4. Enter: `shivamnarthanalayam.com`
5. Click **"Add"**

### Step 2: Add www Subdomain

1. Also add: `www.shivamnarthanalayam.com`
2. Click **"Add"**
3. Set redirect from www to non-www (or vice versa)

### Step 3: Configure DNS

Vercel will show you DNS records to add. Copy these values:

**For Root Domain (shivamnarthanalayam.com):**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

**For www Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### Step 4: Update DNS at Your Domain Registrar

**Instructions vary by registrar. Here are common ones:**

#### GoDaddy:
1. Log in to GoDaddy
2. Go to **My Products** → **Domains**
3. Click **DNS** next to your domain
4. Add the A record and CNAME record shown above
5. Save changes

#### Namecheap:
1. Log in to Namecheap
2. Click **Domain List** → **Manage** next to your domain
3. Click **Advanced DNS** tab
4. Add records as shown above
5. Save changes

#### Cloudflare:
1. Log in to Cloudflare
2. Select your domain
3. Go to **DNS** tab
4. Add A and CNAME records
5. **Important**: Set proxy status to "DNS only" (grey cloud)
6. Save changes

#### Others:
Look for "DNS Management", "DNS Records", or "Name Servers" section.

### Step 5: Verify DNS Propagation

1. Wait 5-60 minutes for DNS to propagate
2. Check status at: [dnschecker.org](https://dnschecker.org)
3. Enter: `shivamnarthanalayam.com`
4. Look for green checkmarks globally

### Step 6: SSL Certificate

Vercel automatically provisions SSL certificates!

1. In Vercel **Domains** settings
2. Wait for: ✅ **Valid Configuration**
3. Status will change from "Pending" to "Active"
4. Visit: `https://shivamnarthanalayam.com` (with https!)

---

## Part 5: Test Everything (10 minutes)

### Test Checklist

- [ ] Visit https://shivamnarthanalayam.com
- [ ] Check all sections load: Hero, About, Experience, Projects, Contact
- [ ] Test navigation (smooth scroll)
- [ ] Test on mobile (use Chrome DevTools)
- [ ] Fill out contact form with test data
- [ ] Check Supabase Table Editor for new submission
- [ ] Verify form shows success message
- [ ] Test 404 page (visit /random-page)
- [ ] Check page speed: [PageSpeed Insights](https://pagespeed.web.dev/)

### Check Contact Form

1. Fill out the contact form on your live site
2. Submit it
3. Go to Supabase Dashboard → Table Editor → contacts
4. Verify your submission appears!

---

## Part 6: Monitoring & Analytics (Optional)

### Add Vercel Analytics

1. In Vercel project → **Analytics** tab
2. Click **Enable Analytics**
3. View visitors, page views, and performance

### Add Google Analytics (Optional)

1. Get GA4 tracking ID
2. Add to `src/routes/+layout.svelte`:

```svelte
<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</svelte:head>
```

---

## Ongoing Maintenance

### Updating Content

1. Make changes to your code locally
2. Test with `npm run dev`
3. Commit changes:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
4. Vercel automatically deploys! (2-3 minutes)

### View Contact Submissions

1. Log in to Supabase
2. Go to Table Editor → contacts
3. View all submissions sorted by date

### Custom Email Notifications (Optional)

**Option 1: Supabase Database Webhooks**
1. Supabase → Database → Webhooks
2. Trigger on INSERT to contacts table
3. Send to Zapier/Make.com → Email

**Option 2: Edge Function**
Create a Supabase Edge Function to send emails via Resend API.

---

## Troubleshooting

### Domain not working

- **Check DNS**: Use [dnschecker.org](https://dnschecker.org)
- **Wait**: DNS can take up to 48 hours (usually 1-2 hours)
- **Verify records**: Double-check A and CNAME records match exactly
- **Check Vercel**: Domain status should be "Active" not "Pending"

### Contact form not working

1. **Check environment variables** in Vercel:
   - Settings → Environment Variables
   - Verify PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are correct
2. **Check browser console** (F12) for errors
3. **Verify Supabase table** exists and has RLS policies
4. **Test Supabase connection**:
   - Try manual insert in Supabase Table Editor
5. **Redeploy**: Sometimes environment variable changes need a redeploy

### Build fails

1. Check build logs in Vercel
2. Common issues:
   - Missing dependencies: `npm install` locally
   - TypeScript errors: `npm run check`
   - Environment variables: Verify they're set in Vercel
3. Fix errors and push again

### 500 Internal Server Error

- Check Vercel Functions logs
- Verify environment variables are set
- Check Supabase credentials

---

## Security Best Practices

- ✅ Never commit `.env` file (it's in .gitignore)
- ✅ Use environment variables for all secrets
- ✅ Enable RLS (Row Level Security) on Supabase tables
- ✅ Keep dependencies updated: `npm update`
- ✅ Use strong Supabase database password
- ✅ Don't share API keys publicly

---

## Cost Breakdown

| Service | Free Tier | Estimated Cost |
|---------|-----------|----------------|
| Vercel | 100GB bandwidth/month | **$0/month** (hobby plan) |
| Supabase | 500MB database, 2GB storage | **$0/month** (free tier) |
| Domain | N/A | **$10-15/year** |
| **Total** | | **~$1.25/month** |

Both Vercel and Supabase have generous free tiers perfect for landing pages!

---

## Next Steps

1. [ ] Add real images to `/static/images/`
2. [ ] Update content with actual information
3. [ ] Customize colors in `tailwind.config.js`
4. [ ] Set up email notifications for contact form
5. [ ] Add blog section (optional)
6. [ ] Set up Google Analytics
7. [ ] Submit sitemap to Google Search Console

---

## Support

If you encounter issues:

1. Check Vercel build logs
2. Check browser console (F12)
3. Check Supabase logs
4. Contact: hello@shivamnarthanalayam.com

**Useful Links:**
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)

---

## Congratulations! 🎉

Your website is now live at **https://shivamnarthanalayam.com**!

Share it with the world! 🚀
