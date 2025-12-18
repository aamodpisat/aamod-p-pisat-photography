# Contentstack Live Preview Setup Guide

This guide explains how to set up Contentstack Live Preview for real-time content editing.

## Prerequisites

1. Contentstack stack with content types and entries
2. Delivery Token (for published content)
3. Preview Token (for Live Preview)

## Step 1: Create Preview Token in Contentstack

1. Go to **Settings** → **Tokens** → **Preview Tokens**
2. Click **Add Token**
3. Enter a name (e.g., "Development Preview")
4. Select the environment (e.g., "development")
5. Copy the generated preview token

## Step 2: Configure Environment Variables

Add these variables to your `.env.local` file:

```bash
# ===========================================
# Contentstack Configuration
# ===========================================

# API credentials (server-side)
CONTENTSTACK_API_KEY=your_api_key_here
CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
CONTENTSTACK_ENVIRONMENT=development
CONTENTSTACK_REGION=us

# API credentials (client-side - required for Live Preview)
NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_api_key_here
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token_here
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=development
NEXT_PUBLIC_CONTENTSTACK_REGION=us

# ===========================================
# Live Preview Configuration
# ===========================================

# Enable Live Preview (set to 'true' to enable)
NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW=true

# Preview Token - from Step 1
NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN=your_preview_token_here
```

## Step 3: Install Required Packages

Run the following command:

```bash
npm install @contentstack/live-preview-utils contentstack
```

## Step 4: Configure Live Preview Website in Contentstack

1. Go to **Settings** → **Live Preview**
2. Click **Enable Live Preview**
3. Enter your website URL:
   - Development: `http://localhost:3000`
   - Production: Your production URL
4. Save the configuration

## Step 5: Test Live Preview

1. Start your development server: `npm run dev`
2. Open Contentstack and navigate to any entry
3. Click the **Live Preview** button (eye icon)
4. Your website should load in the preview panel
5. Edit content and see changes in real-time!

## How It Works

### Architecture

```
┌─────────────────────┐      ┌────────────────────┐
│   Contentstack CMS  │      │   Your Next.js App │
│                     │      │                    │
│  ┌───────────────┐  │      │  ┌──────────────┐  │
│  │  Entry Editor │◄─┼──────┼──┤ LivePreview  │  │
│  └───────────────┘  │      │  │  Provider    │  │
│                     │      │  └──────────────┘  │
│  ┌───────────────┐  │      │         │         │
│  │ Live Preview  │──┼──────┼────────►│         │
│  │    SDK        │  │      │         ▼         │
│  └───────────────┘  │      │  ┌──────────────┐  │
│                     │      │  │   Content    │  │
│  ┌───────────────┐  │      │  │  Components  │  │
│  │ Preview Token │──┼──────┼──►              │  │
│  └───────────────┘  │      │  └──────────────┘  │
└─────────────────────┘      └────────────────────┘
```

### Key Components

1. **LivePreviewProvider** (`src/components/LivePreviewProvider.tsx`)
   - Initializes the Live Preview SDK on the client
   - Listens for content changes
   - Triggers Next.js router refresh to update server components

2. **Contentstack Service** (`src/lib/contentstack.ts`)
   - Configured with Live Preview options
   - Fetches preview content when in preview mode

3. **Live Preview Utils** (`src/lib/contentstack-live-preview.ts`)
   - Helper functions for editable fields
   - Data attributes for visual editing

## Visual Editing (Optional)

To enable visual editing indicators (click-to-edit):

### Add data-cslp Attributes

Use the `editableProps` helper in your components:

```tsx
import { editableProps } from '@/lib/contentstack-live-preview';

function HeroBanner({ data }) {
  return (
    <div>
      <h1 {...editableProps('hero_banner', data.uid, 'title')}>
        {data.title}
      </h1>
      <p {...editableProps('hero_banner', data.uid, 'subtitle')}>
        {data.subtitle}
      </p>
    </div>
  );
}
```

This adds `data-cslp` attributes that Contentstack uses to:
- Highlight editable fields on hover
- Open the field editor when clicked
- Show field-level editing indicators

## Troubleshooting

### Live Preview not working?

1. **Check environment variables**: Ensure `NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW=true`
2. **Verify Preview Token**: Make sure the preview token is correct
3. **Check browser console**: Look for initialization messages
4. **CORS issues**: Ensure your domain is whitelisted in Contentstack

### Content not updating?

1. Check if entries are published (Live Preview shows draft content)
2. Verify the entry's environment matches your configuration
3. Check browser network tab for API calls

### Preview indicator not showing?

The "Live Preview" badge only appears when:
- `NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW=true`
- The page is loaded inside Contentstack's preview iframe

## Production Considerations

1. **Disable Live Preview in production** (for performance):
   ```bash
   NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW=false
   ```

2. **Or enable only for preview URLs**:
   - Keep Live Preview disabled by default
   - Enable via query parameter: `?live_preview=true`

## Region-specific Hosts

The SDK automatically configures the correct hosts based on your region:

| Region | Preview Host |
|--------|-------------|
| US | `rest-preview.contentstack.com` |
| EU | `eu-rest-preview.contentstack.com` |
| Azure NA | `azure-na-rest-preview.contentstack.com` |
| Azure EU | `azure-eu-rest-preview.contentstack.com` |

