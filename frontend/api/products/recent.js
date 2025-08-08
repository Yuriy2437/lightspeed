export default async function handler(req, res) {
  const STORE_ID = process.env.ECWID_STORE_ID;
  const TOKEN = process.env.ECWID_TOKEN;
  const limit = Number(req.query.limit) || 5;

  if (!STORE_ID || !TOKEN) {
    return res
      .status(500)
      .json({ error: 'ECWID_STORE_ID or ECWID_TOKEN is missing' });
  }

  try {
    const url = `https://app.ecwid.com/api/v3/${STORE_ID}/products?sortBy=DATE_CREATED_DESC&limit=${limit}`;
    const apiRes = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!apiRes.ok) throw new Error('Ecwid API status ' + apiRes.status);
    const data = await apiRes.json();

    res.status(200).json({ items: data.items || [] });
  } catch (error) {
    console.error('Fetch Ecwid error:', error);
    res.status(500).json({ error: 'Failed to fetch Ecwid products' });
  }
}
