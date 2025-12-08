# Aamod P. Pisat Photography

A cinematic, fine-art photography portfolio website built with **Next.js 14** and **Contentstack** as the headless CMS.

## ✨ Features

- **Cinematic Design** - Elegant, film-inspired aesthetic with smooth animations
- **Contentstack Integration** - Headless CMS for easy content management
- **Responsive** - Beautiful on all devices from mobile to desktop
- **Performance Optimized** - Static site generation with Next.js Image optimization
- **SEO Ready** - Proper metadata, Open Graph tags, and semantic HTML

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Contentstack](https://www.contentstack.com/) | Headless CMS |

## 📁 Project Structure

```
aamod-photography-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/
│   │   ├── contact/
│   │   ├── faq/
│   │   ├── films/
│   │   ├── how-it-works/
│   │   ├── info/
│   │   ├── journal/
│   │   ├── portfolio/
│   │   ├── services/
│   │   ├── testimonials/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/             # Header, Footer, Layout
│   │   ├── sections/           # Page sections (Hero, FeaturedWork, etc.)
│   │   ├── ui/                 # Reusable UI components
│   │   └── index.ts
│   ├── lib/
│   │   ├── contentstack.ts     # Contentstack API client
│   │   ├── sampleData.ts       # Sample data for development
│   │   └── types.ts            # TypeScript interfaces
│   └── styles/
│       └── globals.css         # Global styles & Tailwind
├── public/
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Contentstack account (optional for development)

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
   CONTENTSTACK_API_KEY=your_api_key_here
   CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
   CONTENTSTACK_ENVIRONMENT=production
   CONTENTSTACK_REGION=us
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📝 Contentstack Content Types

The following Content Types should be created in Contentstack:

### 1. `portfolio_item`
| Field | Type | Description |
|-------|------|-------------|
| title | Text | Gallery/project title |
| description | Rich Text | Project description |
| category | Text | Category (Weddings, Elopements, etc.) |
| featured_image | Asset | Main image |
| gallery_images | Assets | Additional images |
| location | Text | Location of shoot |
| date | Date | Date of shoot |
| is_featured | Boolean | Show on homepage |

### 2. `testimonial`
| Field | Type | Description |
|-------|------|-------------|
| client_name | Text | Client name |
| client_title | Text | Location/event type |
| review_text | Rich Text | The testimonial |
| event_type | Text | Type of event |
| rating | Number | Rating (1-5) |

### 3. `blog_post`
| Field | Type | Description |
|-------|------|-------------|
| title | Text | Post title |
| slug | Text | URL slug |
| excerpt | Text | Short summary |
| body | Rich Text | Full content |
| featured_image | Asset | Cover image |
| author | Text | Author name |
| publish_date | Date | Publication date |
| category | Text | Post category |

### 4. `service_package`
| Field | Type | Description |
|-------|------|-------------|
| name | Text | Package name |
| description | Text | Package description |
| price | Text | Starting price |
| features | JSON | List of features |
| duration | Text | Coverage duration |
| is_popular | Boolean | Mark as popular |

### 5. `site_config`
| Field | Type | Description |
|-------|------|-------------|
| site_title | Text | Site title |
| tagline | Text | Main tagline |
| about_text | Rich Text | About section content |
| social_links | JSON | Social media URLs |
| contact_email | Text | Contact email |

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

## 🔗 Connecting Contentstack

1. Create a Contentstack account at [contentstack.com](https://www.contentstack.com)
2. Create a new Stack
3. Create the Content Types listed above
4. Generate Delivery Token (Settings → Tokens)
5. Add credentials to `.env.local`
6. Update pages to fetch from Contentstack instead of sample data

Example - Replace sample data with API calls:
```typescript
// Before (sample data)
const portfolioItems = samplePortfolioItems;

// After (Contentstack)
const portfolioItems = await getPortfolioItems();
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The site can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted

## 📄 License

This project is private and proprietary to Aamod P. Pisat Photography.

---

**Brand:** Aamod P. Pisat Photography  
**Tagline:** *"Capturing the real emotions..."*

