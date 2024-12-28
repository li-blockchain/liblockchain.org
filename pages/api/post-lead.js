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
    
    const success = await postToDiscord(message);
    
    if (success) {
      res.status(200).json({ status: 'success' });
    } else {
      res.status(500).json({ error: 'Failed to post to Discord' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(400).json({ error: 'Invalid request data' });
  }
}
export default handler;
