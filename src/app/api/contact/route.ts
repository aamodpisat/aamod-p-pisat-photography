import { NextRequest, NextResponse } from 'next/server';

// Generate unique inquiry ID
function generateInquiryId(): string {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `INQ-${year}-${timestamp}${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin');
    if (origin && (!URL.canParse(origin) || new URL(origin).host !== request.headers.get('host'))) {
      return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
    }
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
      return NextResponse.json({ error: 'JSON required' }, { status: 415 });
    }

    const maxBodyBytes = 16_384;
    if (Number(request.headers.get('content-length')) > maxBodyBytes) {
      return NextResponse.json({ error: 'Inquiry is too large' }, { status: 413 });
    }
    const reader = request.body?.getReader();
    if (!reader) return NextResponse.json({ error: 'Invalid inquiry' }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let bodyBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bodyBytes += value.byteLength;
      if (bodyBytes > maxBodyBytes) {
        await reader.cancel();
        return NextResponse.json({ error: 'Inquiry is too large' }, { status: 413 });
      }
      chunks.push(value);
    }
    const rawBody = new TextDecoder().decode(Buffer.concat(chunks));
    let body: Record<string, unknown>;
    try { body = JSON.parse(rawBody); }
    catch { return NextResponse.json({ error: 'Invalid inquiry' }, { status: 400 }); }
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid inquiry' }, { status: 400 });
    }
    
    const limits: Record<string, number> = { name: 120, email: 254, phone: 40, eventDate: 40, eventType: 120, location: 200, howDidYouHear: 120, message: 4000 };
    for (const [field, limit] of Object.entries(limits)) {
      const value = body[field];
      if (value !== undefined && (typeof value !== 'string' || value.length > limit)) {
        return NextResponse.json({ error: `Invalid ${field}` }, { status: 400 });
      }
    }
    const {
      name, email, phone, eventDate, eventType, location, howDidYouHear, message,
    } = body as Record<string, string>;
    if (!name?.trim() || !email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'A name and valid email are required' },
        { status: 400 }
      );
    }

    // Generate inquiry ID
    const inquiryId = generateInquiryId();
    const submittedAt = new Date().toISOString();

    // Contentstack Management API configuration
    const managementToken = process.env.CONTENTSTACK_MANAGEMENT_TOKEN;
    const apiKey = process.env.CONTENTSTACK_API_KEY;
    const environment = process.env.CONTENTSTACK_ENVIRONMENT || 'development';
    
    if (!managementToken || !apiKey) {
      console.error('Missing Contentstack credentials for form submission');
      // Still return success to user
      return NextResponse.json({
        success: true,
        inquiryId,
        message: 'Thank you for your inquiry! We will get back to you soon.',
      });
    }

    // Determine API base URL based on region
    const region = process.env.CONTENTSTACK_REGION || 'us';
    const baseUrl = region === 'eu' 
      ? 'https://eu-api.contentstack.io'
      : 'https://api.contentstack.io';

    // Create entry in Contentstack
    const entryData = {
      entry: {
        title: `${inquiryId} - ${name}`,
        inquiry_id: inquiryId,
        client_name: name,
        email: email,
        phone: phone || '',
        event_date: eventDate || '',
        event_type: eventType || '',
        location: location || '',
        referral_source: howDidYouHear || '',
        message: message || '',
        status: 'New',
        submitted_at: submittedAt,
      },
    };

    const response = await fetch(
      `${baseUrl}/v3/content_types/contact_submission/entries?locale=en-us`,
      {
        method: 'POST',
        headers: {
          'api_key': apiKey,
          'authorization': managementToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Contentstack API error:', errorData);
      // Still return success to user
      return NextResponse.json({
        success: true,
        inquiryId,
        message: 'Thank you for your inquiry! We will get back to you soon.',
      });
    }

    // Publish the entry to trigger automation
    const entryResponse = await response.json();
    const entryUid = entryResponse.entry.uid;

    await fetch(
      `${baseUrl}/v3/content_types/contact_submission/entries/${entryUid}/publish`,
      {
        method: 'POST',
        headers: {
          'api_key': apiKey,
          'authorization': managementToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entry: {
            environments: [environment],
            locales: ['en-us'],
          },
        }),
      }
    );

    return NextResponse.json({
      success: true,
      inquiryId,
      message: 'Thank you for your inquiry! We will get back to you soon.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

