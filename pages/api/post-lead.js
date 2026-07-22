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
        content: message
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


async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const properties = req.body?.data?.properties;
  const email = properties?.Email?.email;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const services = properties['Services interested in']?.multi_select || [];
  const servicesText = services.length > 0
    ? services.map(s => s.name).join(', ')
    : 'No services selected';

  const message = `🚨 New Contact Form Submission 🚨 \nEmail: ${email}\nServices Interested In: ${servicesText}`;

  // Run both destinations independently — a failure in one must not block the other.
  const [discord, notion] = await Promise.all([
    postToDiscord(message),
    postToNotion(req.body.data),
  ]);

  const diagnostics = { discord, notion };

  // The lead is captured as long as it reached at least one destination.
  if (!discord.ok && !notion.ok) {
    console.error('Lead capture failed on all destinations:', diagnostics);
    return res.status(502).json({ error: 'Failed to save contact submission', diagnostics });
  }

  if (!discord.ok || !notion.ok) {
    // Partial success — lead is safe, but flag the degraded destination in logs.
    console.warn('Lead captured with a degraded destination:', diagnostics);
  }

  res.status(200).json({ status: 'success', diagnostics });
}
export default handler;
