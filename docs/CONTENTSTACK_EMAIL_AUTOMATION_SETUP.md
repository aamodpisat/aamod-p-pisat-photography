# Contentstack Email Automation Setup

This guide explains how to set up automated email notifications when a contact form is submitted.

## Overview

When a user submits the contact form:
1. Form data is sent to `/api/contact` endpoint
2. API creates an entry in `contact_submission` content type
3. Contentstack Automation triggers on entry publish
4. Two emails are sent:
   - **Notification to you** (photographer)
   - **Confirmation to client** (with inquiry ID)

---

## Step 1: Import the Schema

1. Go to **Contentstack → Content Models**
2. Click **Import Content Type**
3. Upload `schemas/contact_submission.json`

---

## Step 2: Add Environment Variables

Add these to your `.env.local`:

```env
# Required for form submissions
CONTENTSTACK_MANAGEMENT_TOKEN=your_management_token
```

To get your Management Token:
1. Go to **Settings → Tokens → Management Tokens**
2. Click **Add Token**
3. Name: "Form Submissions"
4. Permissions: 
   - Content Types: `contact_submission` - Read & Write
   - Entries: Create & Publish
5. Copy the token

---

## Step 3: Create Automation - Notification to Photographer

1. Go to **Automate → Automations**
2. Click **+ New Automation**
3. Configure:

### Trigger
- **Event**: Entry Published
- **Content Type**: Contact Submission
- **Conditions**: None (trigger on all)

### Action: Send Email
- **To**: `your-email@example.com`
- **Subject**: `🔔 New Inquiry: {{entry.inquiry_id}} - {{entry.client_name}}`
- **Body**: Copy content from `email-templates/notification-to-photographer.html`

### Available Variables
```
{{entry.inquiry_id}}
{{entry.client_name}}
{{entry.email}}
{{entry.phone}}
{{entry.event_type}}
{{entry.event_date}}
{{entry.location}}
{{entry.referral_source}}
{{entry.message}}
{{entry.submitted_at}}
{{entry.status}}
```

---

## Step 4: Create Automation - Confirmation to Client

1. Click **+ New Automation**
2. Configure:

### Trigger
- **Event**: Entry Published
- **Content Type**: Contact Submission

### Action: Send Email
- **To**: `{{entry.email}}`  ← Dynamic client email
- **Subject**: `Thank You for Your Inquiry - {{entry.inquiry_id}} | Aamod P. Pisat Photography`
- **Body**: Copy content from `email-templates/confirmation-to-client.html`

---

## Step 5: Contact Form (Already Updated!)

The `ContactForm.tsx` component has already been updated to:
- Submit to `/api/contact` endpoint
- Display the inquiry reference number on success
- Show error messages if submission fails

The API route `src/app/api/contact/route.ts`:
- Generates unique inquiry ID (e.g., `INQ-2024-ABC123`)
- Creates entry in Contentstack
- Publishes entry (which triggers the automation)

---

## Email Templates

### Template Variables (Handlebars Syntax)

| Variable | Description |
|----------|-------------|
| `{{entry.inquiry_id}}` | Unique reference number (e.g., INQ-2024-ABC123) |
| `{{entry.client_name}}` | Client's full name |
| `{{entry.email}}` | Client's email address |
| `{{entry.phone}}` | Client's phone number |
| `{{entry.event_type}}` | Type of event (Wedding, Pre-wedding, etc.) |
| `{{entry.event_date}}` | Preferred event date |
| `{{entry.location}}` | Event location |
| `{{entry.referral_source}}` | How they heard about you |
| `{{entry.message}}` | Client's message |
| `{{entry.submitted_at}}` | Submission timestamp |
| `{{entry.status}}` | Inquiry status (New, Contacted, etc.) |

---

## Testing

1. Submit a test form on your website
2. Check Contentstack → Entries → Contact Submission
3. Verify you received the notification email
4. Verify the test email received the confirmation

---

## Troubleshooting

### Emails not sending?
- Check Automation is **Active** (toggle on)
- Verify email addresses are correct
- Check Automation logs for errors

### Entry not created?
- Verify Management Token has correct permissions
- Check API route console logs
- Ensure `contact_submission` content type exists

### Variables not rendering?
- Use exact field UIDs: `{{entry.field_uid}}`
- Check for typos in template
- Verify entry has data in those fields

---

## Customizing Email Templates

The email templates in `email-templates/` folder use:
- Inline CSS (required for email compatibility)
- Table-based layout (best email client support)
- Brand colors: `#1a1a1a` (dark), `#d4b896` (gold), `#f5f0e8` (cream)

To customize:
1. Edit the HTML files
2. Copy updated content to Contentstack Automation
3. Test with a sample submission

---

## Security Notes

- Management Token should be kept secret (server-side only)
- API route validates required fields
- Rate limiting recommended for production
- Consider adding CAPTCHA for spam protection

