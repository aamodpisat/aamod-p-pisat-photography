# Contentstack Content Type Schemas

This document contains all the Content Type schemas needed for the Aamod P. Pisat Photography website. Create these in your Contentstack Stack.

---

## 1. Site Configuration (`site_config`)

**Purpose:** Global site settings, branding, navigation, and contact info.

### Fields

| Field Name | UID | Field Type | Required | Description |
|------------|-----|------------|----------|-------------|
| Title | `title` | Single Line Textbox | Yes | Internal title |
| Site Name | `site_name` | Single Line Textbox | Yes | "Aamod P. Pisat" |
| Site Subtitle | `site_subtitle` | Single Line Textbox | Yes | "Photography" |
| Tagline | `tagline` | Single Line Textbox | Yes | "Capturing the real emotions..." |
| Logo | `logo` | File | No | Site logo (optional) |
| Contact Email | `contact_email` | Single Line Textbox | Yes | hello@aamodphotography.com |
| Contact Phone | `contact_phone` | Single Line Textbox | No | Phone number |
| Contact Address | `contact_address` | Multi Line Textbox | No | Physical address |
| Instagram URL | `instagram_url` | Single Line Textbox | No | Instagram profile URL |
| Pinterest URL | `pinterest_url` | Single Line Textbox | No | Pinterest profile URL |
| Vimeo URL | `vimeo_url` | Single Line Textbox | No | Vimeo profile URL |
| Facebook URL | `facebook_url` | Single Line Textbox | No | Facebook profile URL |
| Footer Text | `footer_text` | Single Line Textbox | Yes | Copyright text |
| Primary Navigation | `primary_navigation` | Group (Multiple) | Yes | Left nav items |
| Secondary Navigation | `secondary_navigation` | Group (Multiple) | Yes | Right nav items |
| Footer Left Navigation | `footer_left_navigation` | Group (Multiple) | Yes | Footer left links |
| Footer Right Navigation | `footer_right_navigation` | Group (Multiple) | Yes | Footer right links |

### Navigation Item Group Structure
```
- label (Single Line Textbox) - Required
- href (Single Line Textbox) - Required
- children (Group - Multiple) - Optional
  - label (Single Line Textbox)
  - href (Single Line Textbox)
```

---

## 2. Hero Banner (`hero_banner`)

**Purpose:** Carousel slides for homepage hero section.

### Fields

| Field Name | UID | Field Type | Required | Description |
|------------|-----|------------|----------|-------------|
| Title | `title` | Single Line Textbox | Yes | Main headline |
| Subtitle | `subtitle` | Single Line Textbox | No | Secondary headline |
| Tagline | `tagline` | Single Line Textbox | No | Script-style tagline |
| Background Image | `image` | File | Yes | Full-screen background |
| CTA Text | `cta_text` | Single Line Textbox | No | Button text |
| CTA Link | `cta_link` | Single Line Textbox | No | Button URL |
| Order | `order` | Number | Yes | Display order (1, 2, 3...) |

---

## 3. Homepage (`homepage`)

**Purpose:** All homepage section content (titles, descriptions, CTAs).

### Fields

| Field Name | UID | Field Type | Required | Description |
|------------|-----|------------|----------|-------------|
| Title | `title` | Single Line Textbox | Yes | Internal title |
| **Portfolio Section** | | | | |
| Portfolio Subtitle | `portfolio_subtitle` | Single Line Textbox | Yes | "Portfolio" |
| Portfolio Title | `portfolio_title` | Single Line Textbox | Yes | "Raw, timeless, nostalgic, cinematic" |
| Portfolio Description | `portfolio_description` | Multi Line Textbox | Yes | Section description |
| Portfolio CTA Text | `portfolio_cta_text` | Single Line Textbox | Yes | "View Full Portfolio" |
| Portfolio CTA Link | `portfolio_cta_link` | Single Line Textbox | Yes | "/portfolio" |
| **About Section** | | | | |
| About Featured Label | `about_featured_label` | Single Line Textbox | Yes | "Featured In" |
| About Featured Brands | `about_featured_brands` | Single Line Textbox (Multiple) | No | ["Vogue", "Martha Stewart", "The Knot"] |
| About Title | `about_title` | Single Line Textbox | Yes | "I'm Aamod, the storyteller behind the lens." |
| About Description | `about_description` | Rich Text | Yes | About paragraphs |
| About Image | `about_image` | File | Yes | Photographer image |
| About CTA Text | `about_cta_text` | Single Line Textbox | Yes | "More About Me" |
| About CTA Link | `about_cta_link` | Single Line Textbox | Yes | "/about" |
| **Testimonials Section** | | | | |
| Testimonials Subtitle | `testimonials_subtitle` | Single Line Textbox | Yes | "Kind Words" |
| Testimonials Title | `testimonials_title` | Single Line Textbox | Yes | "What Our Clients Say" |
| Testimonials CTA Text | `testimonials_cta_text` | Single Line Textbox | Yes | "Read More Testimonials" |
| Testimonials CTA Link | `testimonials_cta_link` | Single Line Textbox | Yes | "/testimonials" |
| **Quick Links Section** | | | | |
| Quick Links Heading | `quick_links_heading` | Single Line Textbox | Yes | "Take a deeper dive..." |
| Quick Links | `quick_links` | Group (Multiple) | Yes | Quick link items |
| **Journal Section** | | | | |
| Journal Subtitle | `journal_subtitle` | Single Line Textbox | Yes | "Journal" |
| Journal Title | `journal_title` | Single Line Textbox | Yes | "Stories & Insights" |
| Journal Description | `journal_description` | Multi Line Textbox | Yes | Section description |
| Journal CTA Text | `journal_cta_text` | Single Line Textbox | Yes | "View All Posts" |
| Journal CTA Link | `journal_cta_link` | Single Line Textbox | Yes | "/journal" |
| **Contact CTA Section** | | | | |
| Contact CTA Title | `contact_cta_title` | Single Line Textbox | Yes | "Let's Create Something Beautiful" |
| Contact CTA Description | `contact_cta_description` | Multi Line Textbox | Yes | CTA description |
| Contact CTA Button Text | `contact_cta_button_text` | Single Line Textbox | Yes | "Get In Touch" |
| Contact CTA Button Link | `contact_cta_button_link` | Single Line Textbox | Yes | "/contact" |
| Contact CTA Background | `contact_cta_background` | File | Yes | Background image |

### Quick Link Group Structure
```
- title (Single Line Textbox) - Required
- description (Single Line Textbox) - Required
- href (Single Line Textbox) - Required
- image (File) - Required
```

---

## 4. Portfolio Item (`portfolio_item`)

**Purpose:** Individual portfolio/gallery items.

### Fields

| Field Name | UID | Field Type | Required | Description |
|------------|-----|------------|----------|-------------|
| Title | `title` | Single Line Textbox | Yes | "Sarah & James — Tuscany" |
| Description | `description` | Multi Line Textbox | No | Project description |
| Category | `category` | Single Line Textbox | Yes | "Weddings", "Elopements", etc. |
| Featured Image | `featured_image` | File | Yes | Main image |
| Gallery Images | `gallery_images` | File (Multiple) | No | Additional images |
| Location | `location` | Single Line Textbox | No | "Tuscany, Italy" |
| Date | `date` | Date | No | Event date |
| Is Featured | `is_featured` | Boolean | No | Show on homepage |
| URL | `url` | Single Line Textbox | No | Custom URL slug |

---

## 5. Testimonial (`testimonial`)

**Purpose:** Client reviews and testimonials.

### Fields

| Field Name | UID | Field Type | Required | Description |
|------------|-----|------------|----------|-------------|
| Client Name | `client_name` | Single Line Textbox | Yes | "Sarah & James" |
| Client Title | `client_title` | Single Line Textbox | No | "Tuscany, Italy" |
| Review Text | `review_text` | Multi Line Textbox | Yes | The testimonial text |
| Client Photo | `client_photo` | File | No | Client photo |
| Event Type | `event_type` | Single Line Textbox | No | "Wedding", "Elopement" |
| Rating | `rating` | Number | No | 1-5 star rating |

---

## 6. Blog Post (`blog_post`)

**Purpose:** Journal/blog articles.

### Fields

| Field Name | UID | Field Type | Required | Description |
|------------|-----|------------|----------|-------------|
| Title | `title` | Single Line Textbox | Yes | Post title |
| URL | `url` | Single Line Textbox | Yes | URL slug (e.g., "/art-of-golden-hour") |
| Excerpt | `excerpt` | Multi Line Textbox | No | Short summary |
| Body | `body` | Rich Text | Yes | Full article content |
| Featured Image | `featured_image` | File | No | Cover image |
| Author | `author` | Single Line Textbox | No | Author name |
| Publish Date | `publish_date` | Date | Yes | Publication date |
| Category | `category` | Single Line Textbox | No | Post category |

---

## Sample Entry Data

### Site Config Entry

```json
{
  "title": "Main Site Configuration",
  "site_name": "Aamod P. Pisat",
  "site_subtitle": "Photography",
  "tagline": "Capturing the real emotions...",
  "contact_email": "hello@aamodphotography.com",
  "footer_text": "© 2025 Aamod P. Pisat Photography | All Rights Reserved",
  "instagram_url": "https://instagram.com/aamodphotography",
  "pinterest_url": "https://pinterest.com/aamodphotography",
  "vimeo_url": "https://vimeo.com/aamodphotography",
  "primary_navigation": [
    { "label": "Portfolio", "href": "/portfolio" },
    { "label": "Films", "href": "/films" },
    { "label": "Testimonials", "href": "/testimonials" }
  ],
  "secondary_navigation": [
    { "label": "About", "href": "/about" },
    { "label": "Info", "href": "/info", "children": [
      { "label": "Services", "href": "/services" },
      { "label": "FAQ", "href": "/faq" }
    ]},
    { "label": "Journal", "href": "/journal" },
    { "label": "Contact", "href": "/contact" }
  ]
}
```

### Homepage Entry

```json
{
  "title": "Homepage Content",
  "portfolio_subtitle": "Portfolio",
  "portfolio_title": "Raw, timeless, nostalgic, cinematic",
  "portfolio_description": "Storytelling for kindred souls. My approach errs more on the cinematic, romantic side, all from a documentary perspective.",
  "portfolio_cta_text": "View Full Portfolio",
  "portfolio_cta_link": "/portfolio",
  "about_featured_label": "Featured In",
  "about_featured_brands": ["Vogue", "Martha Stewart", "The Knot"],
  "about_title": "I'm Aamod, the storyteller behind the lens.",
  "about_description": "<p>My approach to photography is deeply rooted in capturing authentic moments—the quiet glances, the unscripted laughter, the raw emotions that make your story uniquely yours.</p><p>Nothing brings me more joy than documenting your love story through photography and creating something timeless out of it—something tangible that you can frame on your wall and pass down for generations.</p>",
  "about_cta_text": "More About Me",
  "about_cta_link": "/about",
  "testimonials_subtitle": "Kind Words",
  "testimonials_title": "What Our Clients Say",
  "testimonials_cta_text": "Read More Testimonials",
  "testimonials_cta_link": "/testimonials",
  "quick_links_heading": "Take a deeper dive and learn more about the process of working with us.",
  "quick_links": [
    { "title": "Journal", "description": "Stories, tips & inspiration", "href": "/journal" },
    { "title": "Films", "description": "Cinematic wedding films", "href": "/films" },
    { "title": "Services", "description": "Our packages & pricing", "href": "/services" }
  ],
  "journal_subtitle": "Journal",
  "journal_title": "Stories & Insights",
  "journal_description": "Dive deeper into our world of photography, wedding planning tips, and behind-the-scenes stories.",
  "journal_cta_text": "View All Posts",
  "journal_cta_link": "/journal",
  "contact_cta_title": "Let's Create Something Beautiful",
  "contact_cta_description": "Ready to tell your story? I'd love to hear about your vision and explore how we can capture your most meaningful moments together.",
  "contact_cta_button_text": "Get In Touch",
  "contact_cta_button_link": "/contact"
}
```

---

## Setup Instructions

1. **Create Stack** in Contentstack
2. **Create Content Types** using the schemas above
3. **Create Entries** for each content type
4. **Publish** all entries to the `development` environment
5. **Generate Delivery Token** (Settings → Tokens → Delivery Tokens)
6. **Add Environment Variables** to your `.env.local`:
   ```
   CONTENTSTACK_API_KEY=your_api_key
   CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
   CONTENTSTACK_ENVIRONMENT=development
   CONTENTSTACK_REGION=us
   ```


