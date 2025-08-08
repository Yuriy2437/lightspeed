export default async function handler(req, res) {
  const STORE_ID = process.env.ECWID_STORE_ID;
  const TOKEN = process.env.ECWID_TOKEN;
  const limitRaw = req.query.limit;
  const limit = limitRaw && !isNaN(Number(limitRaw)) ? Number(limitRaw) : 5;

  if (!STORE_ID || !TOKEN) {
    return res
      .status(500)
      .json({ error: 'ECWID_STORE_ID or ECWID_TOKEN is missing' });
  }

  const url = `https://app.ecwid.com/api/v3/${STORE_ID}/products?sortBy=DATE_CREATED_DESC&limit=${limit}`;
  console.log('Request URL:', url);
  console.log(
    'Authorization header:',
    TOKEN ? TOKEN.substring(0, 8) + '...' : 'undefined'
  );

  try {
    const apiRes = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      throw new Error(`Ecwid API status ${apiRes.status}: ${errText}`);
    }
    const data = await apiRes.json();
    res.status(200).json({ items: data.items || [] });
  } catch (error) {
    console.error('Fetch Ecwid error:', error);
    res.status(500).json({ error: 'Failed to fetch Ecwid products' });
  }
}
