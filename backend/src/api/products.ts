import express from 'express';
import axios from 'axios';
import { Parser } from 'json2csv';

const router = express.Router();

// Получаем значения из переменных окружения
const ECWID_STORE_ID = process.env.ECWID_STORE_ID!;
const ECWID_TOKEN = process.env.ECWID_TOKEN!;

const ECWID_API_BASE = `https://app.ecwid.com/api/v3/${ECWID_STORE_ID}`;

// Получить список последних товаров (Ecwid по умолчанию сортирует или отдаёт последние созданные)
router.get('/recent', async (req, res) => {
  const limit = req.query.limit || 5;
  const url = `${ECWID_API_BASE}/products?limit=${limit}`;

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${ECWID_TOKEN}` },
    });
    res.json(response.data);
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.errorMessage ||
      error?.response?.data?.message ||
      error?.message ||
      'Unknown Ecwid API error';
    console.error('Ecwid API error (recent):', errorMsg);
    res.status(500).json({ items: [], error: errorMsg });
  }
});

// Экспорт выбранных товаров в CSV (оставляем авторизацию через header)
router.post('/export', async (req, res) => {
  const { productIds } = req.body;
  const param = productIds ? `productId=${productIds.join(',')}` : '';
  const url = `${ECWID_API_BASE}/products?${param}`;
  try {
    const resp = await axios.get(url, {
      headers: { Authorization: `Bearer ${ECWID_TOKEN}` },
    });
    const parser = new Parser();
    const csv = parser.parse(resp.data.items);
    res.attachment('ecwid_products.csv');
    res.send(csv);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Export error' });
  }
});

export default router;
