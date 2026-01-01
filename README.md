# Shivam Narthanalayam - Bharatanatyam Dance Academy Website

A modern, production-ready website for Shivam Narthanalayam, a Bharatanatyam dance academy in Chennai, featuring AI-powered chatbot, WhatsApp integration, and traditional design aesthetics.

## 🎭 Features

- **Modern Design**: Maroon and brown color scheme with gold accents, traditional motifs
- **5 Main Pages**: Home, About, Classes, Gallery, Contact
- **AI Chatbot**: GPT-4 powered assistant for answering student queries
- **WhatsApp Integration**: Floating button for instant messaging
- **Contact Form**: With email notifications and Supabase storage
- **Responsive**: Mobile-first design, works on all devices
- **SEO Optimized**: Meta tags, structured data, semantic HTML

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) v2
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Database**: [Supabase](https://supabase.com/)
- **AI**: [OpenAI](https://platform.openai.com/) GPT-4
- **Email**: [Resend](https://resend.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- OpenAI API key
- Resend API key
- Vercel account for deployment (optional)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:

```env
# Supabase
PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here

# Resend
RESEND_API_KEY=re_your-resend-api-key-here

# Email
ADMIN_EMAIL=shivam@narthanalayam.in

# Site
PUBLIC_SITE_URL=https://shivamnarthanalayam.com
PUBLIC_SITE_NAME=Shivam Narthanalayam

# Contact
PUBLIC_PHONE=+91-9600025105
PUBLIC_EMAIL=shivam@narthanalayam.in
```

### 3. Set Up Supabase Database

Go to your Supabase dashboard → SQL Editor and run:

```sql
-- Create enquiries table
CREATE TABLE enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  preferred_class_type TEXT,
  source TEXT DEFAULT 'contact_form',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for contact form submissions)
CREATE POLICY "Allow public inserts" ON enquiries
  FOR INSERT WITH CHECK (true);

-- Allow authenticated reads (for admin dashboard, if needed later)
CREATE POLICY "Allow authenticated reads" ON enquiries
  FOR SELECT USING (auth.role() = 'authenticated');
```

### 4. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it to your `.env` file

### 5. Get Resend API Key

1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Create a new API key
3. Add it to your `.env` file
4. Verify your domain (or use Resend's test domain for development)

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the website.

## 📝 Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run check      # Run TypeScript type checking
```

## 🎨 Customization

### Update Colors

Edit `src/app.css` and modify the `@theme` section:

```css
@theme {
  --color-primary-600: #800020;    /* Maroon */
  --color-secondary-600: #654321;   /* Brown */
  --color-accent-500: #FFD700;      /* Gold */
  /* ... */
}
```

### Update Content

- **Home Page**: `src/routes/+page.svelte`
- **About Page**: `src/routes/about/+page.svelte`
- **Classes Page**: `src/routes/classes/+page.svelte`
- **Gallery Page**: `src/routes/gallery/+page.svelte`
- **Contact Page**: `src/routes/contact/+page.svelte`

### Update Chatbot Responses

Edit the system prompt in `src/lib/utils/openai.ts` to customize chatbot behavior.

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Shivam Narthanalayam website"
git branch -M main
git remote add origin https://github.com/yourusername/shivamnarthanalayam.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will auto-detect SvelteKit

### 3. Add Environment Variables

In Vercel project settings, add all environment variables from your `.env` file:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `ADMIN_EMAIL`
- `PUBLIC_SITE_URL`
- `PUBLIC_SITE_NAME`
- `PUBLIC_PHONE`
- `PUBLIC_EMAIL`

### 4. Deploy

Click "Deploy" - Vercel will build and deploy automatically.

### 5. Custom Domain

1. Go to Vercel project → Settings → Domains
2. Add `shivamnarthanalayam.com`
3. Configure DNS at your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

SSL certificate is automatic via Vercel.

## 📱 Features Breakdown

### AI Chatbot

- Powered by OpenAI GPT-4
- Answers 10 common questions about classes
- Collects lead information when user shows interest
- Sends email notification to admin
- Stores conversation in Supabase

### WhatsApp Integration

- Floating button (bottom-left)
- Pre-filled message for quick contact
- Pulse animation for visibility
- Mobile responsive

### Contact Form

- Client-side validation
- Stores in Supabase
- Sends email notification via Resend
- Success/error feedback
- Supports preferred class type selection

## 🎯 SEO

The website includes:

- Semantic HTML
- Meta descriptions
- Open Graph tags
- Structured data (to be added for local business)
- Sitemap (auto-generated by SvelteKit)
- Keywords optimization

## 📊 Analytics (Optional)

To add Google Analytics:

1. Get tracking ID from Google Analytics
2. Add to `src/routes/+layout.svelte`:

```html
<svelte:head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</svelte:head>
```

## 🐛 Troubleshooting

### Build Errors

If you see TypeScript errors, run:
```bash
npm run check
```

### Environment Variables Not Loading

Make sure `.env` file is in the root directory and not committed to Git.

### Chatbot Not Working

1. Verify OpenAI API key is correct
2. Check API key has sufficient credits
3. Check browser console for errors

### Email Not Sending

1. Verify Resend API key
2. Check domain verification in Resend dashboard
3. Check spam folder

## 📧 Support

For issues or questions:

- **Email**: shivam@narthanalayam.in
- **Phone**: +91-9600025105

## 📄 License

Copyright © 2026 Shivam Narthanalayam. All rights reserved.

---

**Built with ❤️ using SvelteKit**
