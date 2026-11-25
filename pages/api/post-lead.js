// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const config = {
  api: {
    bodyParser: true,
  },
};

// Each integration returns { ok, detail } instead of throwing, so a failure in
// one destination never prevents the other from running or short-circuits the
// whole submission. `detail` is a short, non-sensitive reason for logs/diagnostics.
async function postToDiscord(message) {
  const webhookUrl = process.env.DISCORD_LEAD_CHANNEL;
  if (!webhookUrl) {
    return { ok: false, detail: 'DISCORD_LEAD_CHANNEL not configured' };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        // Submitted text is untrusted: never let it ping @everyone, roles or users.
        allowed_mentions: { parse: [] }
      })
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.error('Discord webhook error:', response.status, body);
      return { ok: false, detail: `Discord HTTP ${response.status}` };
    }

    return { ok: true };
  } catch (error) {
    console.error('Error posting to Discord:', error);
    return { ok: false, detail: `Discord request failed: ${error.message}` };
  }
}

async function postToNotion(data) {
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    return { ok: false, detail: 'NOTION_API_KEY / NOTION_DATABASE_ID not configured' };
  }

  const email = data.properties?.Email?.email || '';
  const services = data.properties?.['Services interested in']?.multi_select || [];
  const servicesText = services.map(s => s.name).join(', ');

  try {
    const response = await fetch(`https://api.notion.com/v1/pages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        parent: {
          type: "database_id",
          database_id: NOTION_DATABASE_ID
        },
        properties: {
          "Email": {
            type: "email",
            email
          },
          "Project description": {
            type: "rich_text",
            rich_text: [{
              type: "text",
              text: {
                content: servicesText
              }
            }]
          }
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Notion API error details:', response.status, errorData);
      return { ok: false, detail: `Notion HTTP ${response.status}: ${errorData.message || 'unknown'}` };
    }

    return { ok: true };
  } catch (error) {
    console.error('Error posting to Notion:', error);
    return { ok: false, detail: `Notion request failed: ${error.message}` };
  }
}


// The endpoint is public and unauthenticated, and whatever it accepts is posted
// into the partners' Discord channel and Notion database. Bound and normalise
// every field so it cannot be used to inject arbitrary content there.
const EMAIL_RE = /^[^\s@<>()\[\]\\,;:"]+@[^\s@<>()\[\]\\,;:"]+\.[^\s@<>()\[\]\\,;:"]{2,}$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_SERVICES = 10;
const MAX_SERVICE_LENGTH = 100;

function cleanEmail(value) {
  if (typeof value !== 'string') return null;
  const email = value.trim();
  if (email.length === 0 || email.length > MAX_EMAIL_LENGTH) return null;
  return EMAIL_RE.test(email) ? email : null;
}

function cleanServices(value) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, MAX_SERVICES)
    .map((s) => (typeof s?.name === 'string' ? s.name : ''))
    // Drop control characters and anything that renders as markup or a link.
    .map((name) => name.replace(/[\u0000-\u001f\u007f<>@`*_~|\[\]()\\]/g, '').replace(/\w+:\/\//g, '').trim().slice(0, MAX_SERVICE_LENGTH))
    .filter(Boolean)
    .map((name) => ({ name }));
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const properties = req.body?.data?.properties;
  if (!properties?.Email?.email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  const email = cleanEmail(properties.Email.email);
  if (!email) {
    return res.status(400).json({ error: 'A valid email is required' });
  }

  const services = cleanServices(properties['Services interested in']?.multi_select);
  const servicesText = services.length > 0
    ? services.map(s => s.name).join(', ')
    : 'No services selected';

  const message = `🚨 New Contact Form Submission 🚨 \nEmail: ${email}\nServices Interested In: ${servicesText}`;

  // Run both destinations independently — a failure in one must not block the other.
  const [discord, notion] = await Promise.all([
    postToDiscord(message),
    postToNotion({
      properties: {
        Email: { email },
        'Services interested in': { multi_select: services },
      },
    }),
  ]);

  const diagnostics = { discord, notion };

  // The lead is captured as long as it reached at least one destination.
  // Failure details are logged server-side only, never returned to the client.
  if (!discord.ok && !notion.ok) {
    console.error('Lead capture failed on all destinations:', diagnostics);
    return res.status(502).json({ error: 'Failed to save contact submission' });
  }

  if (!discord.ok || !notion.ok) {
    // Partial success — lead is safe, but flag the degraded destination in logs.
    console.warn('Lead captured with a degraded destination:', diagnostics);
  }

  res.status(200).json({ status: 'success' });
}
export default handler;
