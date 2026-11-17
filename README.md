# Well Flabb Fitness Club - Krishna Nagar, Delhi

Official website and member portal for **Well Flabb Fitness Club**, a trainer-led gym in Chander Nagar, Krishna Nagar, East Delhi. Coached by Lead Trainer Rahul.

## 🚀 Features

* **Phone-First Architecture (390px Canvas):** Built and optimized for high-intent visitors coming from Google Maps on mobile.
* **Instant Free Trial Booking:** One-tap 3-step trial reservation linking directly to WhatsApp (+91 99996 36973).
* **Interactive Weight-Loss Calculator:** Sliders and steppers for age, gender, height, current weight, and target weight calculating live BMI, safe weekly loss range (0.5–1.0 kg/wk), and estimated timeline.
* **Trainer Spotlight:** Real floor coaching highlights for Coach Rahul, posture correction, and diet customization.
* **IST Batch Cards:** Tappable Morning & Evening batches with pre-filled WhatsApp routing.
* **Transparent Membership Plans:** Monthly, Quarterly (Most Popular), Half-Yearly, and Yearly options.
* **Real Google Reviews:** Verified quotes from Delhi members with 5.0 Google rating badge.
* **Mobile App Bar:** Sticky 64px bottom bar with safe-area insets (`Call` | `Free Trial` | `Directions`).
* **Staff `/admin` Portal:** Lead tracking, today's trials, 7-day expiration alerts, inactive member audits, and payment logging.
* **Vercel Deployment Ready:** Single-page application rewrites configured via `vercel.json`.

## 🛠️ Tech Stack

* **Framework:** React 19 + Vite + TypeScript
* **Styling:** Tailwind CSS v4 + Custom Design Tokens (Bebas Neue / Manrope)
* **Animation:** Motion (`motion/react`) + Lenis Smooth Scroll
* **Icons:** Lucide React
* **Backend / Database:** Supabase PostgreSQL + Row Level Security (RLS)
* **Automation:** n8n Workflows for WhatsApp Cloud API / Meta Templates

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/rohankanojia25/well-flabb-fitness.git
cd well-flabb-fitness

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🌐 Deploy to Vercel

1. Import the repository in [Vercel](https://vercel.com/new).
2. Framework Preset: **Vite**.
3. Set environment variables (optional):
   * `VITE_SUPABASE_URL`: `https://[your-project].supabase.co`
   * `VITE_SUPABASE_ANON_KEY`: `[your-anon-key]`
4. Click **Deploy**.
