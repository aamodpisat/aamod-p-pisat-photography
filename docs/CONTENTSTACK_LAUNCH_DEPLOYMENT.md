# Deploying to Contentstack Launch

This guide walks you through deploying your Next.js photography website to **Contentstack Launch** - Contentstack's integrated hosting service.

---

## Prerequisites

Before you begin, ensure you have:

1. ✅ A Contentstack account with an active Stack
2. ✅ Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. ✅ All Content Types created and populated in Contentstack
4. ✅ Environment variables ready

---

## Step 1: Push Your Code to Git

If you haven't already, push your code to a Git repository:

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for Contentstack Launch deployment"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/your-username/aamod-photography.git

# Push
git push -u origin main
```

---

## Step 2: Access Contentstack Launch

1. Log in to your [Contentstack account](https://app.contentstack.com)
2. Navigate to your **Stack**
3. In the left sidebar, click on **Launch** (under "Deployment")
4. If this is your first time, click **Get Started**

---

## Step 3: Create a New Project

1. Click **+ New Project**
2. Select your **Git Provider**:
   - GitHub
   - GitLab
   - Bitbucket

3. **Authorize Contentstack** to access your repositories (first time only)

4. **Select your repository** from the list

5. **Configure the project**:

   | Setting | Value |
   |---------|-------|
   | **Project Name** | `aamod-photography` |
   | **Branch** | `main` (or your default branch) |
   | **Framework** | `Next.js` (auto-detected) |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `.next` |
   | **Install Command** | `npm install` |
   | **Node Version** | `18.x` or `20.x` |

---

## Step 4: Configure Environment Variables

Click on **Environment Variables** and add the following:

### Required Variables

| Variable | Description |
|----------|-------------|
| `CONTENTSTACK_API_KEY` | Your Stack's API Key |
| `CONTENTSTACK_DELIVERY_TOKEN` | Delivery Token for your environment |
| `CONTENTSTACK_ENVIRONMENT` | `production` or your environment name |
| `CONTENTSTACK_REGION` | `us` or `eu` (based on your stack region) |
| `CONTENTSTACK_MANAGEMENT_TOKEN` | Management Token (for contact form) |
| `NEXT_PUBLIC_SITE_URL` | Your Launch URL (update after first deploy) |

### How to Get These Values

1. **API Key**: 
   - Go to Settings → Stack → API Credentials
   - Copy the API Key

2. **Delivery Token**:
   - Go to Settings → Tokens → Delivery Tokens
   - Create or copy existing token for your environment

3. **Management Token** (for contact form):
   - Go to Settings → Tokens → Management Tokens
   - Create a new token with "Write" access to Entries
   - Scope it to `contact_submission` content type for security

4. **Environment**:
   - Usually `production` or `development`

5. **Region**:
   - `us` for North America stack
   - `eu` for European stack

---

## Step 5: Deploy

1. Click **Deploy** to start your first deployment
2. Watch the build logs for any errors
3. Once complete, you'll get a URL like: `https://aamod-photography-xxxxx.contentstack.app`

---

## Step 6: Update Site URL

After your first deployment:

1. Copy your Launch URL
2. Go back to **Environment Variables**
3. Update `NEXT_PUBLIC_SITE_URL` with your actual Launch URL
4. Trigger a **Redeploy**

---

## Step 7: Configure Custom Domain (Optional)

To use your own domain (e.g., `www.aamodphotography.com`):

1. In your Launch project, go to **Settings** → **Domains**
2. Click **Add Custom Domain**
3. Enter your domain name
4. Add the provided DNS records to your domain registrar:

   ```
   Type: CNAME
   Name: www (or @)
   Value: [provided-value].contentstack.app
   ```

5. Wait for DNS propagation (up to 48 hours)
6. SSL certificate will be automatically provisioned

---

## Step 8: Set Up Automatic Deployments

Contentstack Launch automatically deploys when:

### On Git Push
- Every push to your selected branch triggers a new deployment

### On Content Publish (Webhooks)
Set up webhooks to redeploy when content changes:

1. Go to **Settings** → **Webhooks** in your Stack
2. Click **+ New Webhook**
3. Configure:

   | Setting | Value |
   |---------|-------|
   | **Name** | `Trigger Launch Redeploy` |
   | **URL** | Your Launch deploy hook URL |
   | **Triggers** | Entry Published, Entry Unpublished |
   | **Content Types** | Select relevant types or "All" |

4. Find your deploy hook URL in Launch: **Settings** → **Deploy Hooks**

---

## Step 9: Enable Preview (Optional)

For Live Preview with Contentstack:

1. In Launch, go to **Settings** → **Preview**
2. Enable Live Preview
3. In your Contentstack Stack:
   - Go to Settings → Live Preview
   - Add your Launch URL as a preview environment

---

## Troubleshooting

### Build Fails

**Check build logs for errors:**
- Missing environment variables
- TypeScript errors
- Missing dependencies

**Common fixes:**
```bash
# Clear cache and rebuild locally
rm -rf .next node_modules
npm install
npm run build
```

### Images Not Loading

Ensure `next.config.js` has all required image domains:
```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.contentstack.io' },
    { protocol: 'https', hostname: '**.unsplash.com' },
    { protocol: 'https', hostname: 'img.youtube.com' },
  ],
},
```

### Contact Form Not Working

1. Verify `CONTENTSTACK_MANAGEMENT_TOKEN` is set
2. Check the token has write permissions
3. Ensure `contact_submission` content type exists

### Environment Variables Not Working

1. Redeploy after adding/changing variables
2. Use `NEXT_PUBLIC_` prefix for client-side variables
3. Check for typos in variable names

---

## Build Optimization

For faster builds and better performance:

### 1. Add to `next.config.js`:
```javascript
const nextConfig = {
  // ... existing config
  
  // Optimize for production
  swcMinify: true,
  
  // Reduce build size
  modularizeImports: {
    'framer-motion': {
      transform: 'framer-motion/{{member}}',
    },
  },
};
```

### 2. Use ISR for dynamic pages:
```typescript
// Already configured in your pages
export const revalidate = 3600; // Revalidate every hour
```

---

## Deployment Checklist

Before going live, verify:

- [ ] All environment variables are set
- [ ] Content Types are created in Contentstack
- [ ] Content is published (not just saved)
- [ ] Images are uploaded and published
- [ ] Contact form submission works
- [ ] Email automations are configured
- [ ] Custom domain DNS is configured (if using)
- [ ] SSL certificate is active
- [ ] All pages load correctly
- [ ] Mobile responsiveness works
- [ ] Forms submit successfully

---

## Useful Commands

```bash
# Test build locally before deploying
npm run build

# Check for TypeScript errors
npm run lint

# Preview production build
npm run build && npm run start
```

---

## Support

- [Contentstack Launch Documentation](https://www.contentstack.com/docs/developers/launch/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Contentstack Support](https://www.contentstack.com/support/)

---

**Your site will be live at:** `https://[project-name].contentstack.app`

Or your custom domain once configured! 🎉




