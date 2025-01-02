// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export const config = {
  api: {
    bodyParser: true,
  },
};

async function postToDiscord(message) {
  const webhookUrl = process.env.DISCORD_LEAD_CHANNEL;
  
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
      throw new Error(`Discord API error: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error posting to Discord:', error);
    return false;
  }
}

async function postToNotion(data) {
  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

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
            email: data.properties.Email.email
          },
          "Project description": {
            type: "rich_text",
            rich_text: [{
              type: "text",
              text: {
                content: data.properties["Services interested in"].multi_select[0].name
              }
            }]
          }
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Notion API error details:', errorData);
      throw new Error(`Notion API error: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error posting to Notion:', error);
    return false;
  }
}


async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data } = req.body;
    const { properties } = data;
    
    // Format the properties into a readable message
    const email = properties.Email?.email || 'No email provided';
    const services = properties['Services interested in']?.multi_select || [];
    const servicesText = services.length > 0 
      ? services.map(s => s.name).join(', ')
      : 'No services selected';

    const message = `🚨 New Contact Form Submission 🚨 \nEmail: ${email}\nServices Interested In: ${servicesText}`;
    
    const discordSuccess = await postToDiscord(message);
    const notionSuccess = await postToNotion(data);

    if (!discordSuccess || !notionSuccess) {
      console.error('Failed to post to services:', {
        discord: discordSuccess,
        notion: notionSuccess
      });
      return res.status(500).json({ 
        error: 'Failed to save contact submission'
      });
    }

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}
export default handler;
