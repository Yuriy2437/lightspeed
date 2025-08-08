export default async function handler(req: any, res: any) {
  const STORE_ID = process.env.ECWID_STORE_ID
  const TOKEN = process.env.ECWID_TOKEN

  if (!STORE_ID || !TOKEN) {
    res.status(500).json({ error: 'API credentials not found' })
    return
  }

  const limit = req.query.limit || 5
  const url = `https://app.ecwid.com/api/v3/${STORE_ID}/products?token=${TOKEN}&sortBy=DATE_CREATED_DESC&limit=${limit}`

  try {
    const apiRes = await fetch(url)
    const data = await apiRes.json()
    // data.items — массив товаров
    res.status(200).json({
      items: Array.isArray(data.items) ? data.items : []
    })
  } catch (e) {
    res.status(500).json({ error: 'Failed to load Ecwid products', details: String(e) })
  }
}
