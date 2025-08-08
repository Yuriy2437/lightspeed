export default async function handler(req, res) {
  const STORE_ID = process.env.ECWID_STORE_ID;
  const TOKEN = process.env.ECWID_TOKEN;

  // Фолбэк товары (на случай ошибок API Ecwid)
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

  const limit = Number(req.query.limit) || 5;

  if (!STORE_ID || !TOKEN) {
    console.warn('⚠️ STORE_ID или TOKEN не заданы! Используем fallback.');
    res.status(200).json({ items: fallbackProducts.slice(0, limit) });
    return;
  }

  try {
    const url = `https://app.ecwid.com/api/v3/${STORE_ID}/products?token=${TOKEN}&sortBy=DATE_CREATED_DESC&limit=${limit}`;
    const apiRes = await fetch(url);
    if (!apiRes.ok) throw new Error(`Ошибка API Ecwid: ${apiRes.status}`);
    const data = await apiRes.json();

    if (!Array.isArray(data.items) || data.items.length === 0) {
      console.warn('⚠️ API вернуло пусто, подставляем fallback');
      return res.status(200).json({ items: fallbackProducts.slice(0, limit) });
    }

    res.status(200).json({ items: data.items });
  } catch (error) {
    console.error('Ошибка получения данных Ecwid:', error);
    res.status(200).json({ items: fallbackProducts.slice(0, limit) });
  }
}
