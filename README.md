# Aamod P. Pisat Photography

A cinematic, fine-art photography portfolio website built with **Next.js 14** and **Contentstack** as the headless CMS.

## ✨ Features

- **Cinematic Design** - Elegant, film-inspired aesthetic with smooth animations
- **Contentstack Integration** - Full headless CMS for easy content management
- **Contact Form with Email Automation** - Form submissions saved to Contentstack with automated email notifications
- **Video Background Support** - Films page with video hero sections
- **Masonry Gallery** - Compact, responsive portfolio gallery with lightbox
- **Responsive** - Beautiful on all devices from mobile to desktop
- **Performance Optimized** - Static site generation with ISR (Incremental Static Regeneration)
- **SEO Ready** - Proper metadata, Open Graph tags, and semantic HTML
- **Live Preview** - Contentstack Live Preview support for real-time editing

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Contentstack](https://www.contentstack.com/) | Headless CMS |
| [React Portal](https://react.dev/reference/react-dom/createPortal) | Modal rendering |

## 📁 Project Structure

```
aamod-photography-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About page
│   │   ├── api/
│   │   │   └── contact/        # Contact form API endpoint
│   │   ├── contact/            # Contact page
│   │   ├── faq/                # FAQ page
│   │   ├── films/              # Films page with video backgrounds
│   │   ├── how-it-works/       # How it works page
│   │   ├── info/               # Info page
│   │   ├── journal/            # Blog/Journal page
│   │   ├── portfolio/          # Portfolio with masonry gallery
│   │   ├── services/           # Services/Packages page
│   │   ├── testimonials/       # Testimonials page
│   │   ├── layout.tsx          # Root layout with site config
│   │   └── page.tsx            # Homepage
│   ├── components/
│   │   ├── layout/             # Header, Footer, Layout
│   │   ├── sections/           # Page sections (Hero, ContactCTA, etc.)
│   │   ├── ui/                 # Reusable UI components
│   │   └── index.ts
│   ├── lib/
│   │   ├── contentstack.ts     # Contentstack API client & functions
│   │   ├── types.ts            # TypeScript interfaces
│   │   ├── richtext-renderer.tsx # Rich text field renderer
│   │   └── SiteConfigContext.tsx # Global site config context
│   └── styles/
│       └── globals.css         # Global styles & Tailwind
├── schemas/                    # Contentstack Content Type schemas
│   ├── contact_submission.json
│   ├── films_page.json
│   ├── portfolio_page.json
│   └── ...
├── email-templates/            # Email notification templates
│   ├── notification-to-photographer.html
│   └── confirmation-to-client.html
├── docs/                       # Documentation
│   └── CONTENTSTACK_EMAIL_AUTOMATION_SETUP.md
├── public/
│   └── videos/                 # Video files for hero sections
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Contentstack account with configured stack

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd aamod-photography-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file:
   ```env
   # Contentstack Delivery API
   CONTENTSTACK_API_KEY=your_api_key
   CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
   CONTENTSTACK_ENVIRONMENT=production
   CONTENTSTACK_REGION=us
   
   # Contentstack Management API (for contact form submissions)
   CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token
   
   # Site URL
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📝 Contentstack Content Types

All content is managed through Contentstack. Import schemas from the `/schemas` folder or create manually:

### Core Content Types

| Content Type | UID | Description |
|--------------|-----|-------------|
| Site Config | `site_config` | Global site settings, navigation, footer |
| Homepage | `homepage` | Homepage content with hero carousel, sections |
| About Page | `about_page` | About page with achievements, journey |
| Contact Page | `contact_page` | Contact form labels and settings |
| Films Page | `films_page` | Films with YouTube embeds |
| Portfolio Page | `portfolio_page` | Portfolio gallery with asset folder |

### Content Entries

| Content Type | UID | Description |
|--------------|-----|-------------|
| Portfolio Item | `portfolio_item` | Individual portfolio galleries |
| Testimonial | `testimonial` | Client testimonials with photos |
| Blog Post | `blog_post` | Journal/blog entries |
| Service Package | `service_package` | Pricing packages |
| Contact Submission | `contact_submission` | Form submissions (auto-created) |

### Key Schema Features

- **Asset Folder Integration**: Portfolio gallery pulls images from a Contentstack Asset Folder
- **Rich Text Support**: JSON RTE fields for formatted content
- **Grouped Fields**: Organized content structure for easy editing
- **Multiple Image Support**: Galleries with unlimited images

## 📧 Contact Form & Email Automation

The contact form system includes:

1. **API Route** (`/api/contact`) - Handles form submissions
2. **Contentstack Entry** - Saves submissions with unique inquiry ID
3. **Email Automation** - Triggered via Contentstack Automations

### Setting Up Email Notifications

See `docs/CONTENTSTACK_EMAIL_AUTOMATION_SETUP.md` for detailed instructions on:
- Creating the `contact_submission` content type
- Setting up Contentstack Automations
- Configuring email templates

### Email Templates

Located in `/email-templates/`:
- `notification-to-photographer.html` - Alert when form is submitted
- `confirmation-to-client.html` - Thank you email to submitter

## 🎨 Design System

### Colors

```css
/* Primary Palette */
--cream:     #FBF9F5    /* Background */
--charcoal:  #212121    /* Text */
--sepia:     #B08B5B    /* Accent */
```

### Typography

- **Headings:** Cormorant Garamond (serif)
- **Body:** Josefin Sans (sans-serif)
- **Accents:** Tangerine (script)

### Animations

All animations use Framer Motion with cinematic easing:
```js
ease: [0.77, 0, 0.175, 1]  // Cinematic bezier curve
```

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔄 Data Flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Contentstack  │────▶│   Next.js API    │────▶│   React Pages   │
│      CMS        │     │   (ISR/SSG)      │     │   (Components)  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                        │
        │                        │
        ▼                        ▼
┌─────────────────┐     ┌──────────────────┐
│   Automations   │     │   Contact Form   │
│   (Email)       │◀────│   Submissions    │
└─────────────────┘     └──────────────────┘
```

## 🌐 Deployment

### Contentstack Launch (Recommended)

For detailed instructions, see **[docs/CONTENTSTACK_LAUNCH_DEPLOYMENT.md](docs/CONTENTSTACK_LAUNCH_DEPLOYMENT.md)**

Quick steps:
1. Push code to GitHub/GitLab/Bitbucket
2. Go to your Stack → Launch → New Project
3. Connect your repository
4. Add environment variables
5. Deploy!

### Vercel (Alternative)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:
- `CONTENTSTACK_API_KEY`
- `CONTENTSTACK_DELIVERY_TOKEN`
- `CONTENTSTACK_MANAGEMENT_TOKEN`
- `CONTENTSTACK_ENVIRONMENT`
- `CONTENTSTACK_REGION`
- `NEXT_PUBLIC_SITE_URL`

### Other Platforms

The site can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted

## 🎬 Adding Video Backgrounds

For the Films page video hero:

1. Place your video in `public/videos/`
2. Update the `films_page` content type in Contentstack
3. Set `background_video_url` to `/videos/your-video.mp4`
4. Provide a fallback image for mobile/loading

## 📄 License

This project is private and proprietary to Aamod P. Pisat Photography.

---

**Brand:** Aamod P. Pisat Photography  
**Tagline:** *"Capturing the real emotions..."*
