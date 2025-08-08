export default async function handler(req: any, res: any) {
  try {
    const STORE_ID = process.env.ECWID_STORE_ID;
    const TOKEN = process.env.ECWID_TOKEN;
    if (!STORE_ID || !TOKEN) {
      res.status(500).json({ error: 'API credentials not set' });
      return;
    }
    const limit = req.query.limit || 5;
    const url = `https://app.ecwid.com/api/v3/${STORE_ID}/products?token=${TOKEN}&sortBy=DATE_CREATED_DESC&limit=${limit}`;
    const apiRes = await fetch(url);
    if (!apiRes.ok) {
      res
        .status(apiRes.status)
        .json({ error: 'Ecwid API failed', status: apiRes.status });
      return;
    }
    const data = await apiRes.json();
    if (!Array.isArray(data.items)) {
      res
        .status(500)
        .json({ error: 'Ecwid API returned invalid response', data });
      return;
    }
    res.status(200).json({ items: data.items });
  } catch (e) {
    console.error('products/recent crashed:', e);
    res.status(500).json({ error: String(e) });
  }
}
