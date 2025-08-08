export default async function handler(req, res) {
  const STORE_ID = process.env.ECWID_STORE_ID;
  const TOKEN = process.env.ECWID_TOKEN;
  const limit = Number(req.query.limit) || 5;

  const fallbackProducts = [
    {
      id: '1',
      name: 'Apple',
      sku: 'A001',
      price: 3.54,
      currency: 'USD',
      imageUrl: '',
    },
    {
      id: '2',
      name: 'Orange',
      sku: 'O222',
      price: 1.6,
      currency: 'USD',
      imageUrl: '',
    },
    {
      id: '3',
      name: 'Peach',
      sku: 'P333',
      price: 2.13,
      currency: 'USD',
      imageUrl: '',
    },
    {
      id: '4',
      name: 'Banana',
      sku: 'B444',
      price: 1.99,
      currency: 'USD',
      imageUrl: '',
    },
    {
      id: '5',
      name: 'Avocado',
      sku: 'A055',
      price: 2.4,
      currency: 'USD',
      imageUrl: '',
    },
  ];

  if (!STORE_ID || !TOKEN) {
    return res.status(200).json({ items: fallbackProducts.slice(0, limit) });
  }

  try {
    const url = `https://app.ecwid.com/api/v3/${STORE_ID}/products?sortBy=DATE_CREATED_DESC&limit=${limit}`;
    const apiRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (!apiRes.ok) throw new Error('Ecwid API Error: ' + apiRes.status);
    const data = await apiRes.json();
    if (!Array.isArray(data.items) || data.items.length === 0) {
      return res.status(200).json({ items: fallbackProducts.slice(0, limit) });
    }
    res.status(200).json({ items: data.items });
  } catch (error) {
    console.error('Ecwid API fetch error:', error);
    res.status(200).json({ items: fallbackProducts.slice(0, limit) });
  }
}
